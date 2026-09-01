
REVOKE ALL ON FUNCTION public.submit_matrimony_testimonial(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.submit_matrimony_testimonial(TEXT, TEXT, TEXT, TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.submit_matrimony_testimonial(TEXT, TEXT, TEXT, TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.submit_matrimony_testimonial(TEXT, TEXT, TEXT, TEXT) TO service_role;
