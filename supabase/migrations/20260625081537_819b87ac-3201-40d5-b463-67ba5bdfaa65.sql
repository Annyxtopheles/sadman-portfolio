
-- 1) Profiles: restrict SELECT to own row
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 2) site_settings: restrict columns exposed to anon/authenticated reads.
-- Keep RLS policy (public read still allowed) but limit which columns are selectable.
REVOKE SELECT ON public.site_settings FROM anon, authenticated;
GRANT SELECT (key, value, asset_path) ON public.site_settings TO anon, authenticated;
-- Editors/super_admins write via authenticated; ensure write grants remain
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

-- 3) is_admin should mean super_admin only (editors are handled by is_editor_or_above)
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_id = _user_id
      AND role = 'super_admin'
  );
$$;

-- 4) Lock down SECURITY DEFINER function execution.
-- Default: revoke EXECUTE from PUBLIC and anon on all our definer functions;
-- grant back to authenticated only where the function is meant to be invoked
-- (either as RPC from the client or inside an RLS policy evaluated as the
-- authenticated role).

-- Helpers used inside RLS policies → authenticated only
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_super_admin(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_super_admin(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_editor_or_above(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_editor_or_above(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_admin_role(uuid, public.admin_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_admin_role(uuid, public.admin_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_admin_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_role(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.claim_first_super_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_first_super_admin() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) TO authenticated;

-- admins_exist is needed by anon during first-run claim flow
REVOKE EXECUTE ON FUNCTION public.admins_exist() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admins_exist() TO anon, authenticated;

-- Trigger / utility functions: no direct callers, lock down completely
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_excerpt(text) FROM PUBLIC, anon, authenticated;
