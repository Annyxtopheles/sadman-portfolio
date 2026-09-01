
-- matrimony_config: single-row config table
CREATE TABLE public.matrimony_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passkey_hash text,
  passkey_salt text,
  passkey_iterations integer NOT NULL DEFAULT 210000,
  headline text,
  bio text,
  video_url text,
  pdf_url text,
  family jsonb NOT NULL DEFAULT '{}'::jsonb,
  interests jsonb NOT NULL DEFAULT '{}'::jsonb,
  contact jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_config TO authenticated;
GRANT ALL ON public.matrimony_config TO service_role;

ALTER TABLE public.matrimony_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins manage matrimony config"
  ON public.matrimony_config FOR ALL
  TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

CREATE TRIGGER matrimony_config_updated_at
  BEFORE UPDATE ON public.matrimony_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- matrimony_photos
CREATE TABLE public.matrimony_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path text NOT NULL,
  caption text,
  category text NOT NULL DEFAULT 'portraits',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_photos TO authenticated;
GRANT ALL ON public.matrimony_photos TO service_role;

ALTER TABLE public.matrimony_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins manage matrimony photos"
  ON public.matrimony_photos FOR ALL
  TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

CREATE TRIGGER matrimony_photos_updated_at
  BEFORE UPDATE ON public.matrimony_photos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX matrimony_photos_sort ON public.matrimony_photos (category, sort_order);

-- matrimony_attempts: rate limiting store, only touched by edge functions
CREATE TABLE public.matrimony_attempts (
  id bigserial PRIMARY KEY,
  ip text NOT NULL,
  success boolean NOT NULL DEFAULT false,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.matrimony_attempts TO authenticated;
GRANT ALL ON public.matrimony_attempts TO service_role;

ALTER TABLE public.matrimony_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view matrimony attempts"
  ON public.matrimony_attempts FOR SELECT
  TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE INDEX matrimony_attempts_ip_time ON public.matrimony_attempts (ip, attempted_at DESC);

-- Seed a single config row so we always have exactly one
INSERT INTO public.matrimony_config (headline, bio) VALUES (NULL, NULL);
