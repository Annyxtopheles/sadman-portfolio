
-- contact_messages
DROP POLICY IF EXISTS "Anyone can send a message" ON public.contact_messages;
CREATE POLICY "Anyone can send a message"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND length(email) BETWEEN 3 AND 320 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND message IS NOT NULL AND length(message) BETWEEN 1 AND 5000
  );
CREATE POLICY "Admins read contact messages"
  ON public.contact_messages FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins delete contact messages"
  ON public.contact_messages FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

-- posts
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
CREATE POLICY "Public read published posts"
  ON public.posts FOR SELECT TO anon, authenticated
  USING (published = true);
CREATE POLICY "Editors read all posts"
  ON public.posts FOR SELECT TO authenticated
  USING (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors insert posts"
  ON public.posts FOR INSERT TO authenticated
  WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Editors update posts"
  ON public.posts FOR UPDATE TO authenticated
  USING (public.is_editor_or_above(auth.uid()))
  WITH CHECK (public.is_editor_or_above(auth.uid()));
CREATE POLICY "Super admins delete posts"
  ON public.posts FOR DELETE TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- admin_roles: kill the racy first-run INSERT policy; provide an RPC instead
DROP POLICY IF EXISTS "First-run claim super admin" ON public.admin_roles;

CREATE OR REPLACE FUNCTION public.claim_first_super_admin()
RETURNS public.admin_roles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _row public.admin_roles;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtext('claim_first_super_admin'));
  IF EXISTS (SELECT 1 FROM public.admin_roles) THEN
    RAISE EXCEPTION 'super admin already claimed';
  END IF;
  INSERT INTO public.admin_roles (user_id, role)
  VALUES (_uid, 'super_admin')
  RETURNING * INTO _row;
  RETURN _row;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_first_super_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_first_super_admin() TO authenticated;

-- Lock down SECURITY DEFINER helper functions
REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_super_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_editor_or_above(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_admin_role(uuid, public.admin_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_admin_role(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.admins_exist() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.generate_excerpt(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Re-grant only what the client actually calls
GRANT EXECUTE ON FUNCTION public.admins_exist() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_role(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_audit_action(text, text, uuid, text, jsonb) TO authenticated;
