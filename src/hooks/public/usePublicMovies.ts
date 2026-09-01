export interface MovieItem {
  id: string;
  title: string;
  cover_image_url?: string | null;
  rating?: number | null;
  url?: string | null;
}

export function usePublicMovies(_limit?: number) {
  return { data: [] as MovieItem[], loading: false };
}
