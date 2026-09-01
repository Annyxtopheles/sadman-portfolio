import { useEffect, useState } from 'react';

export interface LastfmTrack {
  id: string;
  name: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  url: string;
  nowPlaying: boolean;
  date?: string;
}

export function useLastfmFeed(username = 'Asphyxtonihil') {
  const [tracks, setTracks] = useState<LastfmTrack[]>([]);
  const [nowPlaying, setNowPlaying] = useState<LastfmTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const apiKey = 'b25b959554ed76058ac220b7b2e0a026';
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${apiKey}&format=json&limit=6`
        );
        const json = await res.json();
        const rawTracks = json?.recenttracks?.track || [];
        if (!active) return;

        const parsed: LastfmTrack[] = rawTracks.map((t: any, idx: number) => {
          const isNow = t['@attr']?.nowplaying === 'true';
          const cover = t.image?.find((img: any) => img.size === 'extralarge' || img.size === 'large')?.['#text'];
          return {
            id: t.mbid || `${t.name}-${idx}`,
            name: t.name,
            artist: t.artist?.['#text'] || t.artist?.name || '',
            album: t.album?.['#text'],
            coverUrl: cover || undefined,
            url: t.url || `https://www.last.fm/user/${username}`,
            nowPlaying: isNow,
            date: t.date?.['#text'] ? new Date(t.date['#text']).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : (isNow ? 'playing now' : ''),
          };
        });

        const currentlyPlaying = parsed.find((t) => t.nowPlaying) || null;
        setNowPlaying(currentlyPlaying);
        setTracks(parsed.slice(0, 6));
      } catch (e) {
        console.error('Lastfm fetch error:', e);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [username]);

  return { tracks, nowPlaying, loading };
}
