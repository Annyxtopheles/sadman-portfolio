import { useEffect, useState } from 'react';

export interface LetterboxdFilm {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  rating?: string;
  posterUrl?: string;
  review?: string;
}

export function useLetterboxdFeed(username = 'Annyxtopheles') {
  const [films, setFilms] = useState<LetterboxdFilm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://letterboxd.com/${encodeURIComponent(username)}/rss/`);
        const json = await res.json();
        if (!active || !json.items) return;

        const parsed: LetterboxdFilm[] = json.items.map((item: any, idx: number) => {
          // Extract poster image from description html <img src="..." />
          const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
          const posterUrl = imgMatch ? imgMatch[1] : undefined;

          // Extract rating if in title e.g. "Movie, 2024 - ★★★★"
          const ratingMatch = item.title?.match(/(★+½?|½)/);
          const rating = ratingMatch ? ratingMatch[0] : undefined;
          const cleanTitle = item.title?.replace(/\s*-\s*★.*$/, '')?.replace(/,\s*\d{4}.*$/, '') || item.title;

          return {
            id: item.guid || `${item.link}-${idx}`,
            title: cleanTitle,
            link: item.link,
            pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
            rating,
            posterUrl,
            review: item.content?.replace(/<[^>]*>/g, '').trim(),
          };
        });

        setFilms(parsed.slice(0, 6));
      } catch (e) {
        console.error('Letterboxd fetch error:', e);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [username]);

  return { films, loading };
}
