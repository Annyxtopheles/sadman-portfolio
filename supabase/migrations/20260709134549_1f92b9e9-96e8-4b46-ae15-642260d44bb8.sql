-- Restored public schema from szk_260709.backup
SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

CREATE TYPE public.admin_role AS ENUM ('super_admin', 'editor', 'viewer');
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');

CREATE FUNCTION public.admins_exist() RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
    AS $$ SELECT EXISTS (SELECT 1 FROM public.admin_roles); $$;

CREATE TABLE public.admin_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.admin_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid
);

CREATE FUNCTION public.claim_first_super_admin() RETURNS public.admin_roles
    LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE _uid uuid := auth.uid(); _row public.admin_roles;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  PERFORM pg_advisory_xact_lock(hashtext('claim_first_super_admin'));
  IF EXISTS (SELECT 1 FROM public.admin_roles) THEN RAISE EXCEPTION 'super admin already claimed'; END IF;
  INSERT INTO public.admin_roles (user_id, role) VALUES (_uid, 'super_admin') RETURNING * INTO _row;
  RETURN _row;
END; $$;

CREATE FUNCTION public.generate_excerpt(_content text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE SET search_path TO 'public' AS $$
DECLARE trimmed text; cutoff int;
BEGIN
  IF _content IS NULL OR length(_content) = 0 THEN RETURN ''; END IF;
  IF length(_content) <= 150 THEN RETURN _content; END IF;
  trimmed := substring(_content from 1 for 150);
  cutoff := length(trimmed) - position(' ' in reverse(trimmed)) + 1;
  IF cutoff > 50 THEN RETURN substring(trimmed from 1 for cutoff - 1) || '…';
  ELSE RETURN trimmed || '…'; END IF;
END; $$;

CREATE FUNCTION public.get_admin_role(_user_id uuid) RETURNS public.admin_role
    LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT role FROM public.admin_roles WHERE user_id = _user_id AND _user_id = auth.uid() LIMIT 1;
$$;

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  RETURN new;
END; $$;

CREATE FUNCTION public.has_admin_role(_user_id uuid, _role public.admin_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE FUNCTION public.is_admin(_user_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id AND role = 'super_admin');
$$;

CREATE FUNCTION public.is_editor_or_above(_user_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id AND role IN ('super_admin','editor'));
$$;

CREATE FUNCTION public.is_super_admin(_user_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = _user_id AND role = 'super_admin');
$$;

CREATE FUNCTION public.log_audit_action(_action text, _target_type text, _target_id uuid, _target_name text, _details jsonb) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_editor_or_above(auth.uid()) THEN RAISE EXCEPTION 'not authorized'; END IF;
  INSERT INTO public.audit_logs (user_id, action, target_type, target_id, target_name, details)
  VALUES (auth.uid(), _action, _target_type, _target_id, _target_name, _details);
END; $$;

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Tables
CREATE TABLE public.anime_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL, title text NOT NULL, japanese_title text, studio text, year text,
    cover_url text, external_url text, external_source text,
    status public.content_status DEFAULT 'draft' NOT NULL,
    published_at timestamp with time zone, display_order integer DEFAULT 0 NOT NULL,
    deleted_at timestamp with time zone, created_by uuid, updated_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    featured_on_pastime boolean DEFAULT false NOT NULL,
    cover_focal_position text DEFAULT '50% 50%' NOT NULL
);

CREATE TABLE public.audit_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid, action text NOT NULL, target_type text NOT NULL,
    target_id uuid, target_name text, details jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.contact_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL, email text NOT NULL, message text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    read_at timestamp with time zone, archived_at timestamp with time zone, replied_at timestamp with time zone
);

CREATE TABLE public.design_works (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL, title text NOT NULL, category text, year text, description text,
    thumbnail_url text,
    status public.content_status DEFAULT 'draft' NOT NULL,
    published_at timestamp with time zone, display_order integer DEFAULT 0 NOT NULL,
    deleted_at timestamp with time zone, created_by uuid, updated_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.matrimony_family_nodes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    relation text NOT NULL, name text NOT NULL, location_label text,
    lat numeric, lng numeric, profession text, icon text, note text,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    mother_id uuid, father_id uuid, is_self boolean DEFAULT false NOT NULL, photo_path text
);

CREATE TABLE public.matrimony_achievements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    family_node_id uuid NOT NULL,
    title text DEFAULT '' NOT NULL, url text,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.matrimony_attempts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    ip text, success boolean NOT NULL,
    attempted_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.matrimony_config (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    passkey_hash text, passkey_salt text, passkey_iterations integer,
    headline text, bio text, video_url text, pdf_url text,
    family jsonb, interests jsonb, contact jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    ambient jsonb, goals jsonb
);

CREATE TABLE public.matrimony_photos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    image_path text NOT NULL, caption text, category text,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    focal_position text DEFAULT '50% 50%' NOT NULL
);

CREATE TABLE public.matrimony_quiz_questions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    prompt text NOT NULL, axis text, weight numeric DEFAULT 1 NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL, owner_ideal_score numeric,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.matrimony_quiz_options (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    question_id uuid NOT NULL,
    label text NOT NULL, score numeric NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.matrimony_skills (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    kind text NOT NULL, label text NOT NULL, level text, detail text, url text,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.matrimony_testimonial_invites (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    token_hash text NOT NULL, label text,
    created_by uuid, used_at timestamp with time zone,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.matrimony_testimonials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    invite_id uuid, author_name text NOT NULL, relation text NOT NULL,
    body text NOT NULL, status text DEFAULT 'pending' NOT NULL,
    approved_by uuid, approved_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.movies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL, title text NOT NULL, year text, director text,
    letterboxd_url text, poster_url text,
    status public.content_status DEFAULT 'draft' NOT NULL,
    published_at timestamp with time zone, display_order integer DEFAULT 0 NOT NULL,
    deleted_at timestamp with time zone, created_by uuid, updated_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    featured_on_pastime boolean DEFAULT false NOT NULL,
    cover_focal_position text DEFAULT '50% 50%' NOT NULL
);

CREATE TABLE public.music_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL, title text NOT NULL, artist text, album text,
    external_url text, external_source text, cover_url text,
    status public.content_status DEFAULT 'draft' NOT NULL,
    published_at timestamp with time zone, display_order integer DEFAULT 0 NOT NULL,
    deleted_at timestamp with time zone, created_by uuid, updated_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    featured_on_pastime boolean DEFAULT false NOT NULL,
    cover_focal_position text DEFAULT '50% 50%' NOT NULL
);

CREATE TABLE public.poems (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL, title text NOT NULL, content text NOT NULL,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    excerpt text, date date, tags text[], updated_by uuid,
    deleted_at timestamp with time zone,
    status public.content_status DEFAULT 'draft' NOT NULL,
    published_at timestamp with time zone,
    display_order integer DEFAULT 0 NOT NULL,
    cover_image_url text, display_timestamp timestamp with time zone
);

CREATE TABLE public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL, title text NOT NULL, excerpt text, body text NOT NULL,
    cover_image_url text, published boolean DEFAULT false NOT NULL,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    cover_focal_position text DEFAULT '50% 50%' NOT NULL
);

CREATE TABLE public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL, display_name text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.site_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL, value jsonb, asset_path text,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by uuid
);

CREATE FUNCTION public.submit_matrimony_testimonial(_token_hash text, _author_name text, _relation text, _body text) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE _invite public.matrimony_testimonial_invites; _id UUID;
BEGIN
  SELECT * INTO _invite FROM public.matrimony_testimonial_invites WHERE token_hash = _token_hash;
  IF _invite.id IS NULL THEN RAISE EXCEPTION 'invalid_token'; END IF;
  IF _invite.used_at IS NOT NULL THEN RAISE EXCEPTION 'used_token'; END IF;
  IF _invite.expires_at < now() THEN RAISE EXCEPTION 'expired_token'; END IF;
  IF length(coalesce(_author_name,'')) < 1 OR length(_author_name) > 120 THEN RAISE EXCEPTION 'invalid_author'; END IF;
  IF length(coalesce(_relation,'')) < 1 OR length(_relation) > 80 THEN RAISE EXCEPTION 'invalid_relation'; END IF;
  IF length(coalesce(_body,'')) < 10 OR length(_body) > 800 THEN RAISE EXCEPTION 'invalid_body'; END IF;
  INSERT INTO public.matrimony_testimonials (invite_id, author_name, relation, body, status)
  VALUES (_invite.id, _author_name, _relation, _body, 'pending') RETURNING id INTO _id;
  UPDATE public.matrimony_testimonial_invites SET used_at = now() WHERE id = _invite.id;
  RETURN _id;
END; $$;

-- Primary keys and unique constraints
ALTER TABLE ONLY public.admin_roles ADD CONSTRAINT admin_roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.admin_roles ADD CONSTRAINT admin_roles_user_id_role_key UNIQUE (user_id, role);
ALTER TABLE ONLY public.anime_items ADD CONSTRAINT anime_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.anime_items ADD CONSTRAINT anime_items_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.audit_logs ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.contact_messages ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.design_works ADD CONSTRAINT design_works_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.design_works ADD CONSTRAINT design_works_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.matrimony_achievements ADD CONSTRAINT matrimony_achievements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_attempts ADD CONSTRAINT matrimony_attempts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_config ADD CONSTRAINT matrimony_config_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_family_nodes ADD CONSTRAINT matrimony_family_nodes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_photos ADD CONSTRAINT matrimony_photos_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_quiz_options ADD CONSTRAINT matrimony_quiz_options_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_quiz_questions ADD CONSTRAINT matrimony_quiz_questions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_skills ADD CONSTRAINT matrimony_skills_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_testimonial_invites ADD CONSTRAINT matrimony_testimonial_invites_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.matrimony_testimonial_invites ADD CONSTRAINT matrimony_testimonial_invites_token_hash_key UNIQUE (token_hash);
ALTER TABLE ONLY public.matrimony_testimonials ADD CONSTRAINT matrimony_testimonials_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.movies ADD CONSTRAINT movies_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.movies ADD CONSTRAINT movies_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.music_items ADD CONSTRAINT music_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.music_items ADD CONSTRAINT music_items_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.poems ADD CONSTRAINT poems_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.poems ADD CONSTRAINT poems_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.posts ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.posts ADD CONSTRAINT posts_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
ALTER TABLE ONLY public.site_settings ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.site_settings ADD CONSTRAINT site_settings_key_key UNIQUE (key);

-- Foreign keys
ALTER TABLE ONLY public.admin_roles ADD CONSTRAINT admin_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.matrimony_achievements ADD CONSTRAINT matrimony_achievements_family_node_id_fkey FOREIGN KEY (family_node_id) REFERENCES public.matrimony_family_nodes(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.matrimony_family_nodes ADD CONSTRAINT matrimony_family_nodes_father_id_fkey FOREIGN KEY (father_id) REFERENCES public.matrimony_family_nodes(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.matrimony_family_nodes ADD CONSTRAINT matrimony_family_nodes_mother_id_fkey FOREIGN KEY (mother_id) REFERENCES public.matrimony_family_nodes(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.matrimony_quiz_options ADD CONSTRAINT matrimony_quiz_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.matrimony_quiz_questions(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.matrimony_testimonial_invites ADD CONSTRAINT matrimony_testimonial_invites_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.matrimony_testimonials ADD CONSTRAINT matrimony_testimonials_approved_by_fkey FOREIGN KEY (approved_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.matrimony_testimonials ADD CONSTRAINT matrimony_testimonials_invite_id_fkey FOREIGN KEY (invite_id) REFERENCES public.matrimony_testimonial_invites(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.profiles ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_roles TO authenticated; GRANT ALL ON public.admin_roles TO service_role; GRANT SELECT ON public.admin_roles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.anime_items TO authenticated; GRANT ALL ON public.anime_items TO service_role; GRANT SELECT ON public.anime_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.audit_logs TO authenticated; GRANT ALL ON public.audit_logs TO service_role; GRANT SELECT ON public.audit_logs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated; GRANT ALL ON public.contact_messages TO service_role; GRANT SELECT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.design_works TO authenticated; GRANT ALL ON public.design_works TO service_role; GRANT SELECT ON public.design_works TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_achievements TO authenticated; GRANT ALL ON public.matrimony_achievements TO service_role; GRANT SELECT ON public.matrimony_achievements TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_attempts TO authenticated; GRANT ALL ON public.matrimony_attempts TO service_role; GRANT SELECT ON public.matrimony_attempts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_config TO authenticated; GRANT ALL ON public.matrimony_config TO service_role; GRANT SELECT ON public.matrimony_config TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_family_nodes TO authenticated; GRANT ALL ON public.matrimony_family_nodes TO service_role; GRANT SELECT ON public.matrimony_family_nodes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_photos TO authenticated; GRANT ALL ON public.matrimony_photos TO service_role; GRANT SELECT ON public.matrimony_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_quiz_options TO authenticated; GRANT ALL ON public.matrimony_quiz_options TO service_role; GRANT SELECT ON public.matrimony_quiz_options TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_quiz_questions TO authenticated; GRANT ALL ON public.matrimony_quiz_questions TO service_role; GRANT SELECT ON public.matrimony_quiz_questions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_skills TO authenticated; GRANT ALL ON public.matrimony_skills TO service_role; GRANT SELECT ON public.matrimony_skills TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_testimonial_invites TO authenticated; GRANT ALL ON public.matrimony_testimonial_invites TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_testimonials TO authenticated; GRANT ALL ON public.matrimony_testimonials TO service_role; GRANT SELECT ON public.matrimony_testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.movies TO authenticated; GRANT ALL ON public.movies TO service_role; GRANT SELECT ON public.movies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.music_items TO authenticated; GRANT ALL ON public.music_items TO service_role; GRANT SELECT ON public.music_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.poems TO authenticated; GRANT ALL ON public.poems TO service_role; GRANT SELECT ON public.poems TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated; GRANT ALL ON public.posts TO service_role; GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated; GRANT ALL ON public.profiles TO service_role; GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated; GRANT ALL ON public.site_settings TO service_role; GRANT SELECT ON public.site_settings TO anon;

-- Enable RLS
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anime_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_family_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_testimonial_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matrimony_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;