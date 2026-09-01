import { useLiveFeed } from './useLiveFeed';

export interface LastfmTrack {
  id: string; title: string; artist: string; album: string;
  cover: string | null; url: string; nowPlaying: boolean; playedAt: number | null;
}
export const useLastfmRecent = (u?: string | null) =>
  useLiveFeed<LastfmTrack>('lastfm-recent', u, 'lastfm');
