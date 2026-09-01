
CREATE POLICY "Super admins read matrimony assets"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()));

CREATE POLICY "Super admins upload matrimony assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()));

CREATE POLICY "Super admins update matrimony assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()));

CREATE POLICY "Super admins delete matrimony assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'matrimony-assets' AND public.is_super_admin(auth.uid()));
