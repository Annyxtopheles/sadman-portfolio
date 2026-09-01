import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  DEFAULT_HERO_TARGETS,
  HeroKey,
  HeroTargetsSettings,
} from '@/lib/heroTargets';
import { SITE_SETTINGS } from '@/data/siteSettings';

interface Ctx {
  activeKey: HeroKey | null;
  setActiveKey: (k: HeroKey | null) => void;
  config: HeroTargetsSettings;
  statusLine: string;
  refresh: () => void;
}

const HeroHoverContext = createContext<Ctx>({
  activeKey: null,
  setActiveKey: () => {},
  config: DEFAULT_HERO_TARGETS,
  statusLine: SITE_SETTINGS.statusLine,
  refresh: () => {},
});

export const HeroHoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeKey, setActiveKey] = useState<HeroKey | null>(null);
  const [config] = useState<HeroTargetsSettings>(DEFAULT_HERO_TARGETS);
  const [statusLine] = useState<string>(SITE_SETTINGS.statusLine);

  const value = useMemo(
    () => ({
      activeKey,
      setActiveKey,
      config,
      statusLine,
      refresh: () => {},
    }),
    [activeKey, config, statusLine],
  );

  return <HeroHoverContext.Provider value={value}>{children}</HeroHoverContext.Provider>;
};

export const useHeroHover = () => useContext(HeroHoverContext);
