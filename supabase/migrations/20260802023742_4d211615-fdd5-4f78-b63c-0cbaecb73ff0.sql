ALTER TABLE public.matrimony_family_nodes
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS birth_place text,
  ADD COLUMN IF NOT EXISTS birth_year integer,
  ADD COLUMN IF NOT EXISTS education text,
  ADD COLUMN IF NOT EXISTS occupation_detail text,
  ADD COLUMN IF NOT EXISTS contact_info jsonb;

CREATE OR REPLACE FUNCTION public.matrimony_data()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _cfg public.matrimony_config;
  _photos jsonb;
  _skills jsonb;
  _quiz jsonb;
  _family_nodes jsonb;
  _testimonials jsonb;
BEGIN
  SELECT * INTO _cfg FROM public.matrimony_config LIMIT 1;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', p.id, 'caption', p.caption, 'category', p.category, 'sort_order', p.sort_order,
    'url', p.image_path, 'focal_position', coalesce(p.focal_position, '50% 50%')
  ) ORDER BY p.category, p.sort_order), '[]'::jsonb)
  INTO _photos FROM public.matrimony_photos p;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', s.id, 'kind', s.kind, 'label', s.label, 'level', s.level,
    'detail', s.detail, 'url', s.url, 'sort_order', s.sort_order
  ) ORDER BY s.kind, s.sort_order), '[]'::jsonb)
  INTO _skills FROM public.matrimony_skills s;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', q.id, 'prompt', q.prompt, 'axis', q.axis, 'weight', q.weight,
    'sort_order', q.sort_order, 'owner_ideal_score', q.owner_ideal_score,
    'options', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'id', o.id, 'label', o.label, 'score', o.score, 'sort_order', o.sort_order
      ) ORDER BY o.sort_order)
      FROM public.matrimony_quiz_options o WHERE o.question_id = q.id
    ), '[]'::jsonb)
  ) ORDER BY q.sort_order), '[]'::jsonb)
  INTO _quiz FROM public.matrimony_quiz_questions q;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', n.id, 'relation', n.relation, 'name', n.name, 'location_label', n.location_label,
    'lat', n.lat, 'lng', n.lng, 'profession', n.profession, 'icon', n.icon, 'note', n.note,
    'sort_order', n.sort_order, 'mother_id', n.mother_id, 'father_id', n.father_id,
    'is_self', n.is_self, 'photoUrl', n.photo_path,
    'bio', n.bio, 'birth_place', n.birth_place, 'birth_year', n.birth_year,
    'education', n.education, 'occupation_detail', n.occupation_detail,
    'contact_info', n.contact_info,
    'achievements', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'id', a.id, 'title', a.title, 'url', a.url, 'sort_order', a.sort_order
      ) ORDER BY a.sort_order)
      FROM public.matrimony_achievements a WHERE a.family_node_id = n.id
    ), '[]'::jsonb)
  ) ORDER BY n.sort_order), '[]'::jsonb)
  INTO _family_nodes FROM public.matrimony_family_nodes n;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', t.id, 'author_name', t.author_name, 'relation', t.relation,
    'body', t.body, 'approved_at', t.approved_at
  ) ORDER BY t.approved_at DESC), '[]'::jsonb)
  INTO _testimonials FROM public.matrimony_testimonials t WHERE t.status = 'approved';

  RETURN jsonb_build_object(
    'profile', jsonb_build_object(
      'headline', _cfg.headline, 'bio', _cfg.bio, 'videoUrl', _cfg.video_url, 'pdfUrl', _cfg.pdf_url,
      'family', coalesce(_cfg.family, '{}'::jsonb),
      'interests', coalesce(_cfg.interests, '{}'::jsonb),
      'goals', coalesce(_cfg.goals, '{}'::jsonb),
      'contact', coalesce(_cfg.contact, '{}'::jsonb),
      'ambient', coalesce(_cfg.ambient, '{}'::jsonb),
      'updatedAt', _cfg.updated_at
    ),
    'photos', _photos, 'skills', _skills, 'quiz', _quiz,
    'familyNodes', _family_nodes, 'testimonials', _testimonials
  );
END;
$function$;