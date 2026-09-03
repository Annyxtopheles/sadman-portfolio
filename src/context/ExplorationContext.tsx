import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PROJECTS } from '@/data/projects';
import { playMilestoneSound, playCompletionRewardSound } from '@/utils/sound';

const STORAGE_KEY = 'szk_exploration_v1';

export interface ExplorationState {
  viewedProjects: string[]; // Slugs of viewed projects
  visitedRoutes: string[]; // Routes like '/', '/about', '/work'
  clicksCount: number;
  foundPortal: boolean;
  copiedContact: boolean;
  rewardUnlocked: boolean;
}

interface ExplorationContextType {
  state: ExplorationState;
  viewedCount: number;
  totalProjects: number;
  progressPercent: number;
  currentLevel: {
    level: number;
    title: string;
    description: string;
  };
  isCompleted: boolean;
  activeToast: string | null;
  isHUDOpen: boolean;
  setIsHUDOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isRewardOpen: boolean;
  setIsRewardOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  markProjectViewed: (slug: string) => void;
  recordClick: () => void;
  recordPortalFound: () => void;
  recordContactCopied: () => void;
  resetProgress: () => void;
}

const defaultState: ExplorationState = {
  viewedProjects: [],
  visitedRoutes: [],
  clicksCount: 0,
  foundPortal: false,
  copiedContact: false,
  rewardUnlocked: false,
};

const ExplorationContext = createContext<ExplorationContextType | null>(null);

export const useExploration = () => {
  const context = useContext(ExplorationContext);
  if (!context) {
    throw new Error('useExploration must be used within an ExplorationProvider');
  }
  return context;
};

export const ExplorationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [state, setState] = useState<ExplorationState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore local storage parse error
    }
    return defaultState;
  });

  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [isHUDOpen, setIsHUDOpen] = useState(false);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable
    }
  }, [state]);

  const triggerToast = useCallback((msg: string, isBigReward = false) => {
    setActiveToast(msg);
    if (isBigReward) {
      playCompletionRewardSound();
    } else {
      playMilestoneSound();
    }
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setActiveToast(null);
    }, 3800);
  }, []);

  // Track route changes
  useEffect(() => {
    const path = location.pathname;
    setState((prev) => {
      if (!prev.visitedRoutes.includes(path)) {
        const nextRoutes = [...prev.visitedRoutes, path];
        if (path === '/' && prev.visitedRoutes.length === 0) {
          setTimeout(() => triggerToast('✦ Field Guide: Touched base on the portfolio'), 800);
        } else if (path === '/about' && !prev.visitedRoutes.includes('/about')) {
          setTimeout(() => triggerToast('✦ Field Guide: Explored the backstory (/about)'), 500);
        }
        return { ...prev, visitedRoutes: nextRoutes };
      }
      return prev;
    });

    // Check if visiting a project page directly
    if (path.startsWith('/work/') || path.startsWith('/portfolio/')) {
      const slug = path.split('/')[2];
      if (slug) {
        const project = PROJECTS.find((p) => p.slug === slug || p.id === slug);
        if (project) {
          setState((prev) => {
            if (!prev.viewedProjects.includes(project.slug)) {
              const nextViewed = [...prev.viewedProjects, project.slug];
              const isAllViewed = nextViewed.length >= PROJECTS.length;
              setTimeout(() => {
                triggerToast(
                  `✦ Project Explored: ${project.title} (${nextViewed.length}/${PROJECTS.length})`,
                  isAllViewed
                );
              }, 400);
              return {
                ...prev,
                viewedProjects: nextViewed,
                rewardUnlocked: prev.rewardUnlocked || isAllViewed,
              };
            }
            return prev;
          });
        }
      }
    }
  }, [location.pathname, triggerToast]);

  const markProjectViewed = useCallback(
    (slug: string) => {
      const project = PROJECTS.find((p) => p.slug === slug || p.id === slug);
      if (!project) return;
      setState((prev) => {
        if (!prev.viewedProjects.includes(project.slug)) {
          const nextViewed = [...prev.viewedProjects, project.slug];
          const isAllViewed = nextViewed.length >= PROJECTS.length;
          triggerToast(
            `✦ Project Explored: ${project.title} (${nextViewed.length}/${PROJECTS.length})`,
            isAllViewed
          );
          return {
            ...prev,
            viewedProjects: nextViewed,
            rewardUnlocked: prev.rewardUnlocked || isAllViewed,
          };
        }
        return prev;
      });
    },
    [triggerToast]
  );

  const recordClick = useCallback(() => {
    setState((prev) => {
      const nextCount = prev.clicksCount + 1;
      if (nextCount === 5) {
        triggerToast('✦ Milestone: Discovered tactile click sparks & mechanical audio');
      }
      return { ...prev, clicksCount: nextCount };
    });
  }, [triggerToast]);

  const recordPortalFound = useCallback(() => {
    setState((prev) => {
      if (!prev.foundPortal) {
        triggerToast('✦ Discovery: Uncovered the raw personal archive portal');
        return { ...prev, foundPortal: true };
      }
      return prev;
    });
  }, [triggerToast]);

  const recordContactCopied = useCallback(() => {
    setState((prev) => {
      if (!prev.copiedContact) {
        triggerToast('✦ Milestone: Copied direct contact line');
        return { ...prev, copiedContact: true };
      }
      return prev;
    });
  }, [triggerToast]);

  const resetProgress = useCallback(() => {
    setState(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setActiveToast('✦ Exploration progress reset');
  }, []);

  const totalProjects = PROJECTS.length;
  const viewedCount = state.viewedProjects.length;

  // Calculate percentage:
  // - Visited home: 10%
  // - Projects: up to 50% (viewedCount / totalProjects * 50)
  // - About page: 15%
  // - Tactile sparks (>= 5 clicks): 10%
  // - Portal discovered: 10%
  // - Contact copied: 5%
  let calculatedPercent = 0;
  if (state.visitedRoutes.includes('/') || state.visitedRoutes.length > 0) calculatedPercent += 10;
  calculatedPercent += Math.round((viewedCount / totalProjects) * 50);
  if (state.visitedRoutes.includes('/about')) calculatedPercent += 15;
  if (state.clicksCount >= 5) calculatedPercent += 10;
  if (state.foundPortal) calculatedPercent += 10;
  if (state.copiedContact) calculatedPercent += 5;

  const progressPercent = Math.min(100, Math.max(0, calculatedPercent));
  const isCompleted = progressPercent >= 100 || (viewedCount >= totalProjects && state.visitedRoutes.includes('/about'));

  // Editorial rank levels
  let currentLevel = {
    level: 1,
    title: 'Curious Visitor',
    description: 'Just arrived on the grid. Taking in the layout.',
  };
  if (progressPercent >= 85) {
    currentLevel = {
      level: 4,
      title: 'Full Spectrum Explorer',
      description: 'You have seen every corner of my work. Rare dedication.',
    };
  } else if (progressPercent >= 50) {
    currentLevel = {
      level: 3,
      title: 'Deep Diver',
      description: 'Examining case studies, design systems, and technical details.',
    };
  } else if (progressPercent >= 20) {
    currentLevel = {
      level: 2,
      title: 'Thoughtful Observer',
      description: 'Browsing beyond the surface and inspecting real projects.',
    };
  }

  return (
    <ExplorationContext.Provider
      value={{
        state,
        viewedCount,
        totalProjects,
        progressPercent,
        currentLevel,
        isCompleted,
        activeToast,
        isHUDOpen,
        setIsHUDOpen,
        isRewardOpen,
        setIsRewardOpen,
        markProjectViewed,
        recordClick,
        recordPortalFound,
        recordContactCopied,
        resetProgress,
      }}
    >
      {children}
    </ExplorationContext.Provider>
  );
};
