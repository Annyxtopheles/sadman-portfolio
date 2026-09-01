CREATE OR REPLACE FUNCTION public.log_audit_action(_action text, _target_type text, _target_id uuid, _target_name text, _details jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.is_editor_or_above(auth.uid()) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  INSERT INTO public.audit_logs (user_id, action, target_type, target_id, target_name, details)
  VALUES (auth.uid(), _action, _target_type, _target_id, _target_name, _details);
END;
$function$;