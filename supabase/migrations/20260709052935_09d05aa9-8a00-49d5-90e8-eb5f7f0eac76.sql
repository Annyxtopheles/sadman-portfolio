
-- 1) Family nodes
CREATE TABLE public.matrimony_family_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  relation TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  location_label TEXT,
  lat NUMERIC,
  lng NUMERIC,
  profession TEXT,
  icon TEXT,
  note TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_family_nodes TO authenticated;
GRANT ALL ON public.matrimony_family_nodes TO service_role;
ALTER TABLE public.matrimony_family_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super admins manage family nodes"
  ON public.matrimony_family_nodes FOR ALL
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));
CREATE TRIGGER update_matrimony_family_nodes_updated_at
  BEFORE UPDATE ON public.matrimony_family_nodes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2) Achievements per family node
CREATE TABLE public.matrimony_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_node_id UUID NOT NULL REFERENCES public.matrimony_family_nodes(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_achievements TO authenticated;
GRANT ALL ON public.matrimony_achievements TO service_role;
ALTER TABLE public.matrimony_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super admins manage achievements"
  ON public.matrimony_achievements FOR ALL
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));
CREATE TRIGGER update_matrimony_achievements_updated_at
  BEFORE UPDATE ON public.matrimony_achievements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3) Testimonial invites (single-use)
CREATE TABLE public.matrimony_testimonial_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT NOT NULL UNIQUE,
  relation_hint TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_testimonial_invites TO authenticated;
GRANT ALL ON public.matrimony_testimonial_invites TO service_role;
ALTER TABLE public.matrimony_testimonial_invites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super admins manage testimonial invites"
  ON public.matrimony_testimonial_invites FOR ALL
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

-- 4) Testimonials (moderated)
CREATE TABLE public.matrimony_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_id UUID REFERENCES public.matrimony_testimonial_invites(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  relation TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_testimonials TO authenticated;
GRANT ALL ON public.matrimony_testimonials TO service_role;
ALTER TABLE public.matrimony_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super admins manage testimonials"
  ON public.matrimony_testimonials FOR ALL
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));
CREATE TRIGGER update_matrimony_testimonials_updated_at
  BEFORE UPDATE ON public.matrimony_testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5) Secure submission RPC (called via service role from edge fn)
CREATE OR REPLACE FUNCTION public.submit_matrimony_testimonial(
  _token_hash TEXT,
  _author_name TEXT,
  _relation TEXT,
  _body TEXT
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _invite public.matrimony_testimonial_invites;
  _id UUID;
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
