-- Restrict get_admin_role to caller's own uid
CREATE OR REPLACE FUNCTION public.get_admin_role(_user_id uuid)
 RETURNS admin_role
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT role FROM public.admin_roles
  WHERE user_id = _user_id AND _user_id = auth.uid()
  LIMIT 1;
$function$;

-- Remove publicly-readable storage policy on private admin-assets bucket
DROP POLICY IF EXISTS "Public read admin-assets" ON storage.objects;

-- Restrict admin-assets reads to editors/admins
CREATE POLICY "Editors can read admin-assets"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'admin-assets' AND public.is_editor_or_above(auth.uid()));
