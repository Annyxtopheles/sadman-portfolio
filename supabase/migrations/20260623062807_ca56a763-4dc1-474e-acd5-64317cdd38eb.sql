-- Re-grant EXECUTE on role-check predicates (called by RLS as caller role)
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_editor_or_above(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_admin_role(uuid, public.admin_role) TO authenticated;

-- Add featured_on_pastime flag to pastime tables
ALTER TABLE public.movies ADD COLUMN IF NOT EXISTS featured_on_pastime boolean NOT NULL DEFAULT false;
ALTER TABLE public.anime_items ADD COLUMN IF NOT EXISTS featured_on_pastime boolean NOT NULL DEFAULT false;
ALTER TABLE public.music_items ADD COLUMN IF NOT EXISTS featured_on_pastime boolean NOT NULL DEFAULT false;