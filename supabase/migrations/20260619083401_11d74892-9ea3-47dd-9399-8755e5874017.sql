
-- ============ ENUMS ============
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.admin_role AS ENUM ('super_admin', 'editor', 'viewer');

-- ============ admin_roles ============
CREATE TABLE public.admin_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.admin_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_roles TO authenticated;
GRANT ALL ON public.admin_roles TO service_role;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- ============ Security definer functions ============
CREATE OR REPLACE FUNCTION public.has_admin_role(_user_id uuid, _role public.admin_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id);
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id AND role = 'super_admin');
$$;

CREATE OR REPLACE FUNCTION public.get_admin_role(_user_id uuid)
RETURNS public.admin_role LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.admin_roles WHERE user_id = _user_id LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.admins_exist()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles);
$$;

CREATE OR REPLACE FUNCTION public.is_editor_or_above(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id AND role IN ('super_admin','editor'));
$$;

CREATE OR REPLACE FUNCTION public.generate_excerpt(_content text)
RETURNS text LANGUAGE plpgsql IMMUTABLE SET search_path = public AS $$
DECLARE
  trimmed text;
  cutoff int;
BEGIN
  IF _content IS NULL OR length(_content) = 0 THEN RETURN ''; END IF;
  IF length(_content) <= 150 THEN RETURN _content; END IF;
  trimmed := substring(_content from 1 for 150);
  cutoff := length(trimmed) - position(' ' in reverse(trimmed)) + 1;
  IF cutoff > 50 THEN
    RETURN substring(trimmed from 1 for cutoff - 1) || '…';
  ELSE
    RETURN trimmed || '…';
  END IF;
END;
$$;

-- ============ admin_roles policies (now functions exist) ============
CREATE POLICY "Users read own admin role" ON public.admin_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Super admins read all admin roles" ON public.admin_roles
  FOR SELECT TO authenticated USING (public.is_super_admin(auth.uid()));
CREATE POLICY "Super admins insert admin roles" ON public.admin_roles
  FOR INSERT TO authenticated WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Super admins update admin roles" ON public.admin_roles
  FOR UPDATE TO authenticated USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Super admins delete admin roles" ON public.admin_roles
  FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));
-- First-run claim: anyone signed in can self-insert a super_admin row when none exist yet
CREATE POLICY "First-run claim super admin" ON public.admin_roles
  FOR INSERT TO authenticated
  WITH CHECK (NOT public.admins_exist() AND auth.uid() = user_id AND role = 'super_admin');

-- ============ Migrate old user_roles -> admin_roles ============
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='user_roles') THEN
    INSERT INTO public.admin_roles (user_id, role)
    SELECT DISTINCT user_id, 'super_admin'::public.admin_role
    FROM public.user_roles
    WHERE role::text = 'admin'
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END$$;

DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;

-- ============ audit_logs ============
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid,
  target_name text,
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read audit logs" ON public.audit_logs
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE OR REPLACE FUNCTION public.log_audit_action(
  _action text, _target_type text, _target_id uuid, _target_name text, _details jsonb
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  INSERT INTO public.audit_logs (user_id, action, target_type, target_id, target_name, details)
  VALUES (auth.uid(), _action, _target_type, _target_id, _target_name, _details);
END;
$$;

-- ============ POEMS — upgrade existing table ============
ALTER TABLE public.poems
  ADD COLUMN IF NOT EXISTS excerpt text,
  ADD COLUMN IF NOT EXISTS date text,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS updated_by uuid,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS status public.content_status NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS published_at timestamptz,
  ADD COLUMN IF NOT EXISTS display_order int NOT NULL DEFAULT 0;

-- rename body -> content (only if body exists)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='poems' AND column_name='body') THEN
    ALTER TABLE public.poems RENAME COLUMN body TO content;
  END IF;
END $$;

-- backfill status + published_at from `published` boolean, then drop it
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='poems' AND column_name='published') THEN
    UPDATE public.poems SET status = CASE WHEN published THEN 'published'::public.content_status ELSE 'draft'::public.content_status END;
    UPDATE public.poems SET published_at = COALESCE(created_at, now()) WHERE published AND published_at IS NULL;
    ALTER TABLE public.poems DROP COLUMN published;
  END IF;
END $$;

-- existing poems has SELECT-to-anon policy; drop it and re-create the standard set
DROP POLICY IF EXISTS "Poems are viewable by everyone" ON public.poems;
DROP POLICY IF EXISTS "Admins can manage poems" ON public.poems;
DROP POLICY IF EXISTS "Public read published poems" ON public.poems;
GRANT SELECT ON public.poems TO anon;

CREATE POLICY "Public read published poems" ON public.poems
  FOR SELECT TO anon, authenticated USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "Admins read all poems" ON public.poems
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Editors insert poems" ON public.poems
  FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors update poems" ON public.poems
  FOR UPDATE TO authenticated USING (public.is_editor_or_above(auth.uid())) WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Super admins delete poems" ON public.poems
  FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));

-- ============ Helper to apply standard policies to content tables ============
-- We'll just write them inline per table.

-- ============ design_works ============
CREATE TABLE public.design_works (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text,
  year text,
  description text,
  thumbnail_url text,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  display_order int NOT NULL DEFAULT 0,
  deleted_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.design_works TO authenticated;
GRANT SELECT ON public.design_works TO anon;
GRANT ALL ON public.design_works TO service_role;
ALTER TABLE public.design_works ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published design works" ON public.design_works
  FOR SELECT TO anon, authenticated USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "Admins read all design works" ON public.design_works
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Editors insert design works" ON public.design_works
  FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors update design works" ON public.design_works
  FOR UPDATE TO authenticated USING (public.is_editor_or_above(auth.uid())) WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Super admins delete design works" ON public.design_works
  FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));

-- Migrate from projects
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='projects') THEN
    INSERT INTO public.design_works (slug, title, category, year, description, thumbnail_url, status, published_at, display_order, created_at, updated_at, created_by)
    SELECT
      slug,
      title,
      CASE WHEN array_length(tags,1) > 0 THEN tags[1] ELSE NULL END,
      NULL,
      COALESCE(content, summary),
      cover_image_url,
      CASE WHEN published THEN 'published'::public.content_status ELSE 'draft'::public.content_status END,
      CASE WHEN published THEN created_at ELSE NULL END,
      COALESCE(sort_order, 0),
      created_at,
      updated_at,
      created_by
    FROM public.projects
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END $$;

DROP TABLE IF EXISTS public.projects CASCADE;

-- ============ movies ============
CREATE TABLE public.movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  year text,
  director text,
  letterboxd_url text,
  poster_url text,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  display_order int NOT NULL DEFAULT 0,
  deleted_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.movies TO authenticated;
GRANT SELECT ON public.movies TO anon;
GRANT ALL ON public.movies TO service_role;
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published movies" ON public.movies
  FOR SELECT TO anon, authenticated USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "Admins read all movies" ON public.movies
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Editors insert movies" ON public.movies
  FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors update movies" ON public.movies
  FOR UPDATE TO authenticated USING (public.is_editor_or_above(auth.uid())) WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Super admins delete movies" ON public.movies
  FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));

-- ============ anime_items ============
CREATE TABLE public.anime_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  japanese_title text,
  studio text,
  year text,
  cover_url text,
  external_url text,
  external_source text,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  display_order int NOT NULL DEFAULT 0,
  deleted_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.anime_items TO authenticated;
GRANT SELECT ON public.anime_items TO anon;
GRANT ALL ON public.anime_items TO service_role;
ALTER TABLE public.anime_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published anime" ON public.anime_items
  FOR SELECT TO anon, authenticated USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "Admins read all anime" ON public.anime_items
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Editors insert anime" ON public.anime_items
  FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors update anime" ON public.anime_items
  FOR UPDATE TO authenticated USING (public.is_editor_or_above(auth.uid())) WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Super admins delete anime" ON public.anime_items
  FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));

-- ============ music_items ============
CREATE TABLE public.music_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  artist text,
  album text,
  external_url text,
  external_source text,
  cover_url text,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  display_order int NOT NULL DEFAULT 0,
  deleted_at timestamptz,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.music_items TO authenticated;
GRANT SELECT ON public.music_items TO anon;
GRANT ALL ON public.music_items TO service_role;
ALTER TABLE public.music_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published music" ON public.music_items
  FOR SELECT TO anon, authenticated USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "Admins read all music" ON public.music_items
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Editors insert music" ON public.music_items
  FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors update music" ON public.music_items
  FOR UPDATE TO authenticated USING (public.is_editor_or_above(auth.uid())) WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Super admins delete music" ON public.music_items
  FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));

-- ============ site_settings ============
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  asset_path text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT SELECT ON public.site_settings TO anon;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Editors upsert site settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors update site settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.is_editor_or_above(auth.uid())) WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Super admins delete site settings" ON public.site_settings
  FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));

-- ============ updated_at triggers ============
CREATE TRIGGER trg_poems_updated BEFORE UPDATE ON public.poems
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_design_works_updated BEFORE UPDATE ON public.design_works
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_movies_updated BEFORE UPDATE ON public.movies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_anime_updated BEFORE UPDATE ON public.anime_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_music_updated BEFORE UPDATE ON public.music_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Storage policies for admin-assets ============
CREATE POLICY "Public read admin-assets" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'admin-assets');
CREATE POLICY "Editors upload admin-assets" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'admin-assets' AND public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors update admin-assets" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'admin-assets' AND public.is_editor_or_above(auth.uid())) WITH CHECK (bucket_id = 'admin-assets' AND public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors delete admin-assets" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'admin-assets' AND public.is_editor_or_above(auth.uid()));
