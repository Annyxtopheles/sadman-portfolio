export const NAV_ITEMS = [
  { label: 'portfolio', path: '/portfolio' },
  { label: 'profile', path: '/profile' },
  { label: 'pastime', path: '/pastime' },
  { label: 'poetry', path: '/poetry' },
  { label: 'ponderings', path: '/blog' },
  { label: 'ping', path: '/contact' },
] as const;

export const HOME_SECTIONS = [
  { id: 'selected-work', label: 'Selected work' },
  { id: 'recent-poetry', label: 'Recent poetry' },
  { id: 'from-the-blog', label: 'From the blog' },
] as const;

export type HeroKey = 'builds' | 'writes';

export interface HeroTargetConfig {
  navPaths: string[];
  sectionIds: string[];
}

export interface HeroTargetsSettings {
  enabled: boolean;
  builds: HeroTargetConfig;
  writes: HeroTargetConfig;
}

export const DEFAULT_HERO_TARGETS: HeroTargetsSettings = {
  enabled: true,
  builds: { navPaths: ['/portfolio'], sectionIds: ['selected-work'] },
  writes: { navPaths: ['/poetry'], sectionIds: ['recent-poetry'] },
};

export const DEFAULT_STATUS_LINE =
  'Drinking filtered tap water, fiddling with Figma, listening to Godspeed You! Black Emperor.';

export function parseHeroTargets(value: unknown): HeroTargetsSettings {
  const v = (value ?? {}) as Record<string, unknown>;
  const ht = (v.hero_targets ?? {}) as Partial<HeroTargetsSettings>;
  return {
    enabled: ht.enabled ?? DEFAULT_HERO_TARGETS.enabled,
    builds: {
      navPaths: ht.builds?.navPaths ?? DEFAULT_HERO_TARGETS.builds.navPaths,
      sectionIds: ht.builds?.sectionIds ?? DEFAULT_HERO_TARGETS.builds.sectionIds,
    },
    writes: {
      navPaths: ht.writes?.navPaths ?? DEFAULT_HERO_TARGETS.writes.navPaths,
      sectionIds: ht.writes?.sectionIds ?? DEFAULT_HERO_TARGETS.writes.sectionIds,
    },
  };
}

export function parseStatusLine(value: unknown): string {
  const v = (value ?? {}) as Record<string, unknown>;
  return typeof v.status_line === 'string' ? v.status_line : '';
}
