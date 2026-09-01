
-- Skills / languages / certifications / testimonial links
CREATE TABLE public.matrimony_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('language','skill','certification','testimonial_link')),
  label text NOT NULL,
  level int CHECK (level IS NULL OR (level >= 0 AND level <= 5)),
  detail text,
  url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_skills TO authenticated;
GRANT ALL ON public.matrimony_skills TO service_role;
ALTER TABLE public.matrimony_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "super admins manage matrimony_skills"
  ON public.matrimony_skills FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));
CREATE TRIGGER trg_matrimony_skills_updated_at
  BEFORE UPDATE ON public.matrimony_skills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Quiz questions
CREATE TABLE public.matrimony_quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  axis text NOT NULL,
  weight int NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  owner_ideal_score int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_quiz_questions TO authenticated;
GRANT ALL ON public.matrimony_quiz_questions TO service_role;
ALTER TABLE public.matrimony_quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "super admins manage matrimony_quiz_questions"
  ON public.matrimony_quiz_questions FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));
CREATE TRIGGER trg_matrimony_quiz_questions_updated_at
  BEFORE UPDATE ON public.matrimony_quiz_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Quiz options
CREATE TABLE public.matrimony_quiz_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public.matrimony_quiz_questions(id) ON DELETE CASCADE,
  label text NOT NULL,
  score int NOT NULL DEFAULT 0,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matrimony_quiz_options TO authenticated;
GRANT ALL ON public.matrimony_quiz_options TO service_role;
ALTER TABLE public.matrimony_quiz_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "super admins manage matrimony_quiz_options"
  ON public.matrimony_quiz_options FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));
CREATE TRIGGER trg_matrimony_quiz_options_updated_at
  BEFORE UPDATE ON public.matrimony_quiz_options
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX matrimony_quiz_options_question_idx ON public.matrimony_quiz_options(question_id);
