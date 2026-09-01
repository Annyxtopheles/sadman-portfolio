import React from 'react';

/**
 * Visually hidden link revealed on keyboard focus.
 * Lets keyboard users jump past the fixed Navbar straight to page content.
 */
export const SkipLink: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:text-[11px] focus:uppercase focus:font-medium focus:tracking-wider focus:border focus:border-foreground"
  >
    Skip to content
  </a>
);
