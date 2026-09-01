ALTER TABLE public.matrimony_family_nodes
  ADD COLUMN IF NOT EXISTS mother_id uuid REFERENCES public.matrimony_family_nodes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS father_id uuid REFERENCES public.matrimony_family_nodes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_self boolean NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS matrimony_family_nodes_one_self
  ON public.matrimony_family_nodes ((is_self)) WHERE is_self = true;