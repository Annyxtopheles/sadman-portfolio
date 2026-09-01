import { useLiveFeed } from './useLiveFeed';

export interface AnilistEntry {
  id: string; title: string; progress: number; total: number | null;
  score: number; cover: string | null; banner: string | null; url: string;
}
export const useAnilistCurrent = (u?: string | null) =>
  useLiveFeed<AnilistEntry>('anilist-current', u, 'anilist');
