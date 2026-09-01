import { SITE_SETTINGS } from '@/data/siteSettings';

export type SettingRow = { key: string; value: Record<string, unknown>; asset_path: string | null };

export function usePublicSiteSettings() {
  const map: Record<string, SettingRow> = {
    branding: {
      key: 'branding',
      value: {
        status_line: SITE_SETTINGS.statusLine,
        hero_targets: { enabled: true, builds: { navPaths: ['/portfolio'], sectionIds: [] }, writes: { navPaths: ['/poetry'], sectionIds: [] } }
      },
      asset_path: null
    },
    contact: {
      key: 'contact',
      value: { email: SITE_SETTINGS.email },
      asset_path: null
    }
  };

  function get<T = Record<string, unknown>>(key: string): T {
    return (map[key]?.value as T) ?? ({} as T);
  }
  function asset(_key: string): string | null {
    return null;
  }
  return { map, get, asset, loading: false, reload: () => {} };
}
