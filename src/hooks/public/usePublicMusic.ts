export interface MusicItem {
  id: string;
  title: string;
  artist?: string | null;
  cover_image_url?: string | null;
  url?: string | null;
}

export function usePublicMusic(_limit?: number) {
  return { data: [] as MusicItem[], loading: false };
}
