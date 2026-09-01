import { useLiveFeed } from './useLiveFeed';

export interface LetterboxdEntry {
  id: string; title: string; year: number | null; rating: number | null;
  reviewSnippet: string; poster: string | null; url: string; watchedAt: string | null;
}
export const useLetterboxdRecent = (u?: string | null) =>
  useLiveFeed<LetterboxdEntry>('letterboxd-recent', u, 'letterboxd');
