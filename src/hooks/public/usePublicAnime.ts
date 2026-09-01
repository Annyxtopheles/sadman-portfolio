export interface AnimeItem {
  id: string;
  title: string;
  cover_image_url?: string | null;
  rating?: number | null;
  url?: string | null;
}

export function usePublicAnime(_limit?: number) {
  return { data: [] as AnimeItem[], loading: false };
}
