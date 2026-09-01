
ALTER TABLE public.posts        DROP CONSTRAINT IF EXISTS posts_cover_focal_position_check;
ALTER TABLE public.movies       DROP CONSTRAINT IF EXISTS movies_cover_focal_position_check;
ALTER TABLE public.anime_items  DROP CONSTRAINT IF EXISTS anime_items_cover_focal_position_check;
ALTER TABLE public.music_items  DROP CONSTRAINT IF EXISTS music_items_cover_focal_position_check;

UPDATE public.posts        SET cover_focal_position = CASE cover_focal_position WHEN 'center' THEN '50% 50%' WHEN 'top' THEN '50% 0%' WHEN 'bottom' THEN '50% 100%' ELSE cover_focal_position END WHERE cover_focal_position IN ('center','top','bottom');
UPDATE public.movies       SET cover_focal_position = CASE cover_focal_position WHEN 'center' THEN '50% 50%' WHEN 'top' THEN '50% 0%' WHEN 'bottom' THEN '50% 100%' ELSE cover_focal_position END WHERE cover_focal_position IN ('center','top','bottom');
UPDATE public.anime_items  SET cover_focal_position = CASE cover_focal_position WHEN 'center' THEN '50% 50%' WHEN 'top' THEN '50% 0%' WHEN 'bottom' THEN '50% 100%' ELSE cover_focal_position END WHERE cover_focal_position IN ('center','top','bottom');
UPDATE public.music_items  SET cover_focal_position = CASE cover_focal_position WHEN 'center' THEN '50% 50%' WHEN 'top' THEN '50% 0%' WHEN 'bottom' THEN '50% 100%' ELSE cover_focal_position END WHERE cover_focal_position IN ('center','top','bottom');

ALTER TABLE public.posts        ALTER COLUMN cover_focal_position SET DEFAULT '50% 50%';
ALTER TABLE public.movies       ALTER COLUMN cover_focal_position SET DEFAULT '50% 50%';
ALTER TABLE public.anime_items  ALTER COLUMN cover_focal_position SET DEFAULT '50% 50%';
ALTER TABLE public.music_items  ALTER COLUMN cover_focal_position SET DEFAULT '50% 50%';
