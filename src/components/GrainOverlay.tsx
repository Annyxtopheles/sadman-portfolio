import React from 'react';

/**
 * Fixed, pointer-events-none film grain layer. Uses an inline SVG turbulence
 * filter so there is no extra network request. Opacity is tuned per theme via
 * the `.grain-overlay` rule in index.css.
 */
export const GrainOverlay: React.FC = () => (
  <div className="grain-overlay" aria-hidden="true" />
);
