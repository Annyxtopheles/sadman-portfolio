export interface Integrations {
  lastfm_username?: string;
  letterboxd_username?: string;
  anilist_username?: string;
}

export function usePublicIntegrations() {
  return {
    data: {
      lastfm_username: 'Asphyxtonihil',
      letterboxd_username: 'Annyxtopheles',
      anilist_username: 'Annyxtopheles',
    },
    loading: false,
  };
}
