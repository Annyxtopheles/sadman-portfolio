
-- 1. Tighten is_admin to only recognize valid admin roles (admin/editor),
--    preventing future/unexpected role values from granting elevated access.
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin','editor')
  );
$$;

-- 2. Remove the overly permissive event-images storage SELECT policy.
--    The bucket is public, so direct object URLs continue to work; this only
--    removes storage-API enumeration of every object.
DROP POLICY IF EXISTS "Event images read by exact name" ON storage.objects;

-- 3. Lock down SECURITY DEFINER functions:
--    Revoke EXECUTE from PUBLIC and anon on every SD function. Only grant
--    EXECUTE to authenticated on functions that the app actually needs to
--    call (RLS helpers used in policies + admin RPCs). Trigger/utility
--    functions get no client-callable grants.

-- Trigger / internal-only functions: revoke from everyone but owner+service_role.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.generate_excerpt(text) FROM PUBLIC, anon, authenticated;

-- RLS helper functions: needed by policies executed as the caller role.
REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_super_admin(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_editor_or_above(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_admin_role(uuid, public.admin_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_editor_or_above(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_admin_role(uuid, public.admin_role) TO authenticated;

-- Admin RPCs called from the client by signed-in admins only.
REVOKE ALL ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_admin_role(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.claim_first_super_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admins_exist() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_role(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_first_super_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admins_exist() TO authenticated;
