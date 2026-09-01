ALTER TABLE public.poems
  ADD COLUMN IF NOT EXISTS cover_image_url text,
  ADD COLUMN IF NOT EXISTS display_timestamp text;

INSERT INTO public.site_settings (key, value)
VALUES ('poetry_viewer', '{"default_mode":"modern","show_toggle":true}'::jsonb)
ON CONFLICT (key) DO NOTHING;