import { POEMS, type Poem } from '@/data/poems';

export function usePublicPoems(limit?: number) {
  const data = limit ? POEMS.slice(0, limit) : POEMS;
  return { data, loading: false };
}

export type { Poem };
