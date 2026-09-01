
-- 1) Storage RLS for event-images bucket
DROP POLICY IF EXISTS "event_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "event_images_editor_insert" ON storage.objects;
DROP POLICY IF EXISTS "event_images_editor_update" ON storage.objects;
DROP POLICY IF EXISTS "event_images_editor_delete" ON storage.objects;

CREATE POLICY "event_images_public_read"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');

CREATE POLICY "event_images_editor_insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'event-images' AND public.is_editor_or_above(auth.uid()));

CREATE POLICY "event_images_editor_update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'event-images' AND public.is_editor_or_above(auth.uid()))
WITH CHECK (bucket_id = 'event-images' AND public.is_editor_or_above(auth.uid()));

CREATE POLICY "event_images_editor_delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'event-images' AND public.is_editor_or_above(auth.uid()));

-- 2) Revoke EXECUTE on SECURITY DEFINER helpers from anon/authenticated/public.
-- These are internal helpers used by RLS policies and server flows; they don't
-- need to be callable from the Data API.
REVOKE EXECUTE ON FUNCTION public.is_super_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_admin_role(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_admin_role(uuid, public.admin_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_editor_or_above(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_excerpt(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Keep these callable by signed-in users — the admin UI needs them.
GRANT EXECUTE ON FUNCTION public.admins_exist() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_first_super_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_role(uuid) TO authenticated;
