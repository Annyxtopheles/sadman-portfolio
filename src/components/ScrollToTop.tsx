import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that navigating between pages in this Single Page Application
 * always resets the window and document scroll position back to the top (0, 0),
 * rather than preserving the previous page's scroll offset.
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Disable native browser scroll restoration that interferes with SPA route transitions
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    // If navigating to a specific in-page anchor (e.g. #work-section), scroll to it
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const resetScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // 1. Reset immediately before browser paints
    resetScroll();

    // 2. Double-check on next animation frame after Framer Motion mounts the new route DOM
    const rafId = requestAnimationFrame(() => {
      resetScroll();
    });

    // 3. Fallback timeout to guarantee top position even if layout shifts occur
    const timeoutId = setTimeout(() => {
      resetScroll();
    }, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
