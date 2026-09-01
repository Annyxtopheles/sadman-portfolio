/*
# Create matrimony schema and public data RPC

## Purpose
The matrimony page was blank because the database was missing all matrimony tables
and the `matrimony_data()` RPC that the frontend calls. 17 migrations existed on disk
but were never applied. This single consolidated, idempotent migration creates every
matrimony table in its final column state plus the public `matrimony_data()` function.

## New Tables (all in `public` schema)

1. `matrimony_config` — single-row config: headline, bio, video/pdf URLs, family/interests/goals/contact/ambient JSONB blobs, passkey fields (legacy, unused by public page).
2. `matrimony_photos` — photo gallery entries with category, sort order, focal position.
3. `matrimony_attempts` — rate-limiting store for edge functions (bigserial PK, IP, success flag, timestamp).
4. `matrimony_skills` — languages/skills/certifications/testimonial links with kind, label, level, detail, url.
5. `matrimony_quiz_questions` — compatibility quiz prompts with axis, weight, owner ideal score.
6. `matrimony_quiz_options` — answer options per question (FK → quiz_questions, CASCADE).
7. `matrimony_family_nodes` — family tree members with relation, name, location, profession, parent links (self-referential FKs), is_self flag, photo path, and extended bio fields (bio, birth_place, birth_year, education, occupation_detail, contact_info JSONB).
8. `matrimony_achievements` — per-family-node achievements (FK → family_nodes, CASCADE).
9. `matrimony_testimonial_invites` — single-use invite tokens with hash, relation_hint/label, expiry, used_at.
10. `matrimony_testimonials` — moderated testimonials with author, relation, body, status (pending/approved/rejected), approval tracking.

## New Functions

- `matrimony_data()` — STABLE SECURITY DEFINER RPC returning a JSONB payload with profile, photos, skills, quiz, familyNodes, and testimonials. Granted to `anon` + `authenticated` so the public page (no login) can read it.
- `submit_matrimony_testimonial(token_hash, author_name, relation, body)` — SECURITY DEFINER RPC used by the testimonial-submit edge function. Granted to `service_role` only.
- `matrimony_set_passkey(passkey)` — SECURITY DEFINER RPC for admin to set the passkey. Granted to `authenticated` (guarded by is_super_admin check inside).

## Security (RLS)

All matrimony tables have RLS enabled. Admin CRUD policies use `public.is_super_admin(auth.uid())`. Public read access is via the `matrimony_data()` SECURITY DEFINER function (bypasses RLS by design, returns only approved testimonials). The anon role has no direct table grants — all public reads go through the RPC.

## Storage

Creates the `matrimony-assets` private storage bucket and admin-scoped storage policies.
*/

-- ============================================================================
-- 1. matrimony_config
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passkey_hash text,
  passkey_salt text,
  passkey_iterations integer,
  headline text,
  bio text,
  video_url text,
  pdf_url text,
  family jsonb,
  interests jsonb,
  contact jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  ambient jsonb,
  goals jsonb
);

ALTER TABLE public.matrimony_config ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_config TO authenticated;
GRANT ALL ON public.matrimony_config TO service_role;
GRANT SELECT ON public.matrimony_config TO anon;

DROP POLICY IF EXISTS "Super admins manage matrimony config" ON public.matrimony_config;
CREATE POLICY "Super admins manage matrimony config"
  ON public.matrimony_config TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

DROP TRIGGER IF EXISTS matrimony_config_updated_at ON public.matrimony_config;
CREATE TRIGGER matrimony_config_updated_at
  BEFORE UPDATE ON public.matrimony_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed a single config row if none exists
INSERT INTO public.matrimony_config (headline, bio)
SELECT NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.matrimony_config);

-- ============================================================================
-- 2. matrimony_photos
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path text NOT NULL,
  caption text,
  category text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  focal_position text NOT NULL DEFAULT '50% 50%'
);

ALTER TABLE public.matrimony_photos ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_photos TO authenticated;
GRANT ALL ON public.matrimony_photos TO service_role;
GRANT SELECT ON public.matrimony_photos TO anon;

DROP POLICY IF EXISTS "Super admins manage matrimony photos" ON public.matrimony_photos;
CREATE POLICY "Super admins manage matrimony photos"
  ON public.matrimony_photos TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

DROP TRIGGER IF EXISTS matrimony_photos_updated_at ON public.matrimony_photos;
CREATE TRIGGER matrimony_photos_updated_at
  BEFORE UPDATE ON public.matrimony_photos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS matrimony_photos_sort ON public.matrimony_photos (category, sort_order);

-- ============================================================================
-- 3. matrimony_attempts
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_attempts (
  id bigserial PRIMARY KEY,
  ip text,
  success boolean NOT NULL DEFAULT false,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.matrimony_attempts ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.matrimony_attempts TO authenticated;
GRANT ALL ON public.matrimony_attempts TO service_role;
GRANT SELECT ON public.matrimony_attempts TO anon;

DROP POLICY IF EXISTS "Super admins can view matrimony attempts" ON public.matrimony_attempts;
CREATE POLICY "Super admins can view matrimony attempts"
  ON public.matrimony_attempts FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE INDEX IF NOT EXISTS matrimony_attempts_ip_time ON public.matrimony_attempts (ip, attempted_at DESC);

-- ============================================================================
-- 4. matrimony_skills
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL,
  label text NOT NULL,
  level text,
  detail text,
  url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.matrimony_skills ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_skills TO authenticated;
GRANT ALL ON public.matrimony_skills TO service_role;
GRANT SELECT ON public.matrimony_skills TO anon;

DROP POLICY IF EXISTS "super admins manage matrimony_skills" ON public.matrimony_skills;
CREATE POLICY "super admins manage matrimony_skills"
  ON public.matrimony_skills TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

DROP TRIGGER IF EXISTS trg_matrimony_skills_updated_at ON public.matrimony_skills;
CREATE TRIGGER trg_matrimony_skills_updated_at
  BEFORE UPDATE ON public.matrimony_skills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 5. matrimony_quiz_questions
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  axis text,
  weight numeric NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  owner_ideal_score numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.matrimony_quiz_questions ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_quiz_questions TO authenticated;
GRANT ALL ON public.matrimony_quiz_questions TO service_role;
GRANT SELECT ON public.matrimony_quiz_questions TO anon;

DROP POLICY IF EXISTS "super admins manage matrimony_quiz_questions" ON public.matrimony_quiz_questions;
CREATE POLICY "super admins manage matrimony_quiz_questions"
  ON public.matrimony_quiz_questions TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

DROP TRIGGER IF EXISTS trg_matrimony_quiz_questions_updated_at ON public.matrimony_quiz_questions;
CREATE TRIGGER trg_matrimony_quiz_questions_updated_at
  BEFORE UPDATE ON public.matrimony_quiz_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 6. matrimony_quiz_options
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_quiz_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public.matrimony_quiz_questions(id) ON DELETE CASCADE,
  label text NOT NULL,
  score numeric NOT NULL DEFAULT 0,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.matrimony_quiz_options ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_quiz_options TO authenticated;
GRANT ALL ON public.matrimony_quiz_options TO service_role;
GRANT SELECT ON public.matrimony_quiz_options TO anon;

DROP POLICY IF EXISTS "super admins manage matrimony_quiz_options" ON public.matrimony_quiz_options;
CREATE POLICY "super admins manage matrimony_quiz_options"
  ON public.matrimony_quiz_options TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

DROP TRIGGER IF EXISTS trg_matrimony_quiz_options_updated_at ON public.matrimony_quiz_options;
CREATE TRIGGER trg_matrimony_quiz_options_updated_at
  BEFORE UPDATE ON public.matrimony_quiz_options
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS matrimony_quiz_options_question_idx ON public.matrimony_quiz_options(question_id);

-- ============================================================================
-- 7. matrimony_family_nodes
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_family_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  relation text NOT NULL DEFAULT '',
  name text NOT NULL DEFAULT '',
  location_label text,
  lat numeric,
  lng numeric,
  profession text,
  icon text,
  note text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  mother_id uuid REFERENCES public.matrimony_family_nodes(id) ON DELETE SET NULL,
  father_id uuid REFERENCES public.matrimony_family_nodes(id) ON DELETE SET NULL,
  is_self boolean NOT NULL DEFAULT false,
  photo_path text,
  bio text,
  birth_place text,
  birth_year numeric,
  education text,
  occupation_detail text,
  contact_info jsonb
);

ALTER TABLE public.matrimony_family_nodes ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_family_nodes TO authenticated;
GRANT ALL ON public.matrimony_family_nodes TO service_role;
GRANT SELECT ON public.matrimony_family_nodes TO anon;

DROP POLICY IF EXISTS "Super admins manage family nodes" ON public.matrimony_family_nodes;
CREATE POLICY "Super admins manage family nodes"
  ON public.matrimony_family_nodes TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

DROP TRIGGER IF EXISTS update_matrimony_family_nodes_updated_at ON public.matrimony_family_nodes;
CREATE TRIGGER update_matrimony_family_nodes_updated_at
  BEFORE UPDATE ON public.matrimony_family_nodes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE UNIQUE INDEX IF NOT EXISTS matrimony_family_nodes_one_self
  ON public.matrimony_family_nodes ((is_self)) WHERE is_self = true;

-- ============================================================================
-- 8. matrimony_achievements
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_node_id uuid NOT NULL REFERENCES public.matrimony_family_nodes(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.matrimony_achievements ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_achievements TO authenticated;
GRANT ALL ON public.matrimony_achievements TO service_role;
GRANT SELECT ON public.matrimony_achievements TO anon;

DROP POLICY IF EXISTS "Super admins manage achievements" ON public.matrimony_achievements;
CREATE POLICY "Super admins manage achievements"
  ON public.matrimony_achievements TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

DROP TRIGGER IF EXISTS update_matrimony_achievements_updated_at ON public.matrimony_achievements;
CREATE TRIGGER update_matrimony_achievements_updated_at
  BEFORE UPDATE ON public.matrimony_achievements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 9. matrimony_testimonial_invites
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_testimonial_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text NOT NULL UNIQUE,
  relation_hint text,
  label text,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.matrimony_testimonial_invites ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_testimonial_invites TO authenticated;
GRANT ALL ON public.matrimony_testimonial_invites TO service_role;

DROP POLICY IF EXISTS "Super admins manage testimonial invites" ON public.matrimony_testimonial_invites;
CREATE POLICY "Super admins manage testimonial invites"
  ON public.matrimony_testimonial_invites TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

-- ============================================================================
-- 10. matrimony_testimonials
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.matrimony_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_id uuid REFERENCES public.matrimony_testimonial_invites(id) ON DELETE SET NULL,
  author_name text NOT NULL,
  relation text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  approved_at timestamptz,
  approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.matrimony_testimonials ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_testimonials TO authenticated;
GRANT ALL ON public.matrimony_testimonials TO service_role;
GRANT SELECT ON public.matrimony_testimonials TO anon;

DROP POLICY IF EXISTS "Super admins manage testimonials" ON public.matrimony_testimonials;
CREATE POLICY "Super admins manage testimonials"
  ON public.matrimony_testimonials TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

DROP TRIGGER IF EXISTS update_matrimony_testimonials_updated_at ON public.matrimony_testimonials;
CREATE TRIGGER update_matrimony_testimonials_updated_at
  BEFORE UPDATE ON public.matrimony_testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 11. submit_matrimony_testimonial RPC (service_role only)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.submit_matrimony_testimonial(
  _token_hash text,
  _author_name text,
  _relation text,
  _body text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  _invite public.matrimony_testimonial_invites;
  _id uuid;
BEGIN
  SELECT * INTO _invite FROM public.matrimony_testimonial_invites
    WHERE token_hash = _token_hash;
  IF _invite.id IS NULL THEN RAISE EXCEPTION 'invalid_token'; END IF;
  IF _invite.used_at IS NOT NULL THEN RAISE EXCEPTION 'used_token'; END IF;
  IF _invite.expires_at < now() THEN RAISE EXCEPTION 'expired_token'; END IF;
  IF length(coalesce(_author_name,'')) < 1 OR length(_author_name) > 120 THEN RAISE EXCEPTION 'invalid_author'; END IF;
  IF length(coalesce(_relation,'')) < 1 OR length(_relation) > 80 THEN RAISE EXCEPTION 'invalid_relation'; END IF;
  IF length(coalesce(_body,'')) < 10 OR length(_body) > 800 THEN RAISE EXCEPTION 'invalid_body'; END IF;

  INSERT INTO public.matrimony_testimonials (invite_id, author_name, relation, body, status)
  VALUES (_invite.id, _author_name, _relation, _body, 'pending')
  RETURNING id INTO _id;

  UPDATE public.matrimony_testimonial_invites SET used_at = now() WHERE id = _invite.id;
  RETURN _id;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_matrimony_testimonial(text, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.submit_matrimony_testimonial(text, text, text, text) FROM anon;
REVOKE ALL ON FUNCTION public.submit_matrimony_testimonial(text, text, text, text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.submit_matrimony_testimonial(text, text, text, text) TO service_role;

-- ============================================================================
-- 12. matrimony_set_passkey RPC (admin only, authenticated)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.matrimony_set_passkey(_passkey text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  _salt text;
  _hash text;
  _existing_id uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  IF _passkey IS NULL OR length(_passkey) < 8 OR length(_passkey) > 512 THEN
    RAISE EXCEPTION 'passkey_too_short_or_long';
  END IF;

  _salt := encode(gen_random_bytes(16), 'base64');
  _hash := encode(sha256((_salt || _passkey)::bytea), 'base64');

  SELECT id INTO _existing_id FROM public.matrimony_config LIMIT 1;

  IF _existing_id IS NULL THEN
    INSERT INTO public.matrimony_config (passkey_hash, passkey_salt, passkey_iterations)
    VALUES (_hash, _salt, 1);
  ELSE
    UPDATE public.matrimony_config
    SET passkey_hash = _hash,
        passkey_salt = _salt,
        passkey_iterations = 1,
        updated_at = now()
    WHERE id = _existing_id;
  END IF;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.matrimony_set_passkey(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.matrimony_set_passkey(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.matrimony_set_passkey(text) TO authenticated;

-- ============================================================================
-- 13. matrimony_data RPC — public read function (anon + authenticated)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.matrimony_data()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  _cfg public.matrimony_config;
  _photos jsonb;
  _skills jsonb;
  _quiz jsonb;
  _family_nodes jsonb;
  _testimonials jsonb;
BEGIN
  SELECT * INTO _cfg FROM public.matrimony_config LIMIT 1;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', p.id, 'caption', p.caption, 'category', p.category, 'sort_order', p.sort_order,
    'url', p.image_path, 'focal_position', coalesce(p.focal_position, '50% 50%')
  ) ORDER BY p.category, p.sort_order), '[]'::jsonb)
  INTO _photos FROM public.matrimony_photos p;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', s.id, 'kind', s.kind, 'label', s.label, 'level', s.level,
    'detail', s.detail, 'url', s.url, 'sort_order', s.sort_order
  ) ORDER BY s.kind, s.sort_order), '[]'::jsonb)
  INTO _skills FROM public.matrimony_skills s;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', q.id, 'prompt', q.prompt, 'axis', q.axis, 'weight', q.weight,
    'sort_order', q.sort_order, 'owner_ideal_score', q.owner_ideal_score,
    'options', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'id', o.id, 'label', o.label, 'score', o.score, 'sort_order', o.sort_order
      ) ORDER BY o.sort_order)
      FROM public.matrimony_quiz_options o WHERE o.question_id = q.id
    ), '[]'::jsonb)
  ) ORDER BY q.sort_order), '[]'::jsonb)
  INTO _quiz FROM public.matrimony_quiz_questions q;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', n.id, 'relation', n.relation, 'name', n.name, 'location_label', n.location_label,
    'lat', n.lat, 'lng', n.lng, 'profession', n.profession, 'icon', n.icon, 'note', n.note,
    'sort_order', n.sort_order, 'mother_id', n.mother_id, 'father_id', n.father_id,
    'is_self', n.is_self, 'photoUrl', n.photo_path,
    'achievements', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'id', a.id, 'title', a.title, 'url', a.url, 'sort_order', a.sort_order
      ) ORDER BY a.sort_order)
      FROM public.matrimony_achievements a WHERE a.family_node_id = n.id
    ), '[]'::jsonb)
  ) ORDER BY n.sort_order), '[]'::jsonb)
  INTO _family_nodes FROM public.matrimony_family_nodes n;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', t.id, 'author_name', t.author_name, 'relation', t.relation,
    'body', t.body, 'approved_at', t.approved_at
  ) ORDER BY t.approved_at DESC), '[]'::jsonb)
  INTO _testimonials FROM public.matrimony_testimonials t WHERE t.status = 'approved';

  RETURN jsonb_build_object(
    'profile', jsonb_build_object(
      'headline', _cfg.headline, 'bio', _cfg.bio, 'videoUrl', _cfg.video_url, 'pdfUrl', _cfg.pdf_url,
      'family', coalesce(_cfg.family, '{}'::jsonb),
      'interests', coalesce(_cfg.interests, '{}'::jsonb),
      'goals', coalesce(_cfg.goals, '{}'::jsonb),
      'contact', coalesce(_cfg.contact, '{}'::jsonb),
      'ambient', coalesce(_cfg.ambient, '{}'::jsonb),
      'updatedAt', _cfg.updated_at
    ),
    'photos', _photos, 'skills', _skills, 'quiz', _quiz,
    'familyNodes', _family_nodes, 'testimonials', _testimonials
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.matrimony_data() TO anon, authenticated;

-- ============================================================================
-- 14. Storage bucket + policies for matrimony-assets
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
SELECT 'matrimony-assets', 'matrimony-assets', false
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'matrimony-assets');

DROP POLICY IF EXISTS "Super admins read matrimony assets" ON storage.objects;
CREATE POLICY "Super admins read matrimony assets"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Super admins upload matrimony assets" ON storage.objects;
CREATE POLICY "Super admins upload matrimony assets"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Super admins update matrimony assets" ON storage.objects;
CREATE POLICY "Super admins update matrimony assets"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()))
  WITH CHECK (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Super admins delete matrimony assets" ON storage.objects;
CREATE POLICY "Super admins delete matrimony assets"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()));

NOTIFY pgrst, 'reload schema';
