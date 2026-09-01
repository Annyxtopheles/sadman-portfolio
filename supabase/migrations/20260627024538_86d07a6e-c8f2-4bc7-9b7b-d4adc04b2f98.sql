
-- 1. Lock down SECURITY DEFINER functions: revoke broad EXECUTE, grant only where needed
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_super_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_admin_role(uuid, public.admin_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_editor_or_above(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_excerpt(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_admin_role(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.claim_first_super_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.admins_exist() FROM PUBLIC, anon, authenticated;

-- Re-grant only the functions actually called from the client
GRANT EXECUTE ON FUNCTION public.admins_exist() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_first_super_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_role(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) TO authenticated;

-- 2. Storage: stop anonymous listing of event-images bucket (files still served via public CDN URLs)
DROP POLICY IF EXISTS "event_images_public_read" ON storage.objects;

-- 3. posts: flip default to draft-first
ALTER TABLE public.posts ALTER COLUMN published SET DEFAULT false;

-- 4. site_settings: hide updated_by from anonymous/authenticated reads via column-level grants
REVOKE SELECT ON public.site_settings FROM anon, authenticated;
GRANT SELECT (key, value, asset_path, updated_at) ON public.site_settings TO anon, authenticated;
-- Editors keep full access through their UPDATE/INSERT/DELETE policies; ensure write grants remain
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
