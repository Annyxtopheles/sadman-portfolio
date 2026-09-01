import { useState } from 'react';
import { RECENT_ANIME, type AnimeEntry } from '@/data/anime';

export function useAnimeFeed(_username = 'Annyxtopheles') {
  const [items] = useState<AnimeEntry[]>(RECENT_ANIME.slice(0, 6));
  return { items, loading: false };
}

export type { AnimeEntry };
