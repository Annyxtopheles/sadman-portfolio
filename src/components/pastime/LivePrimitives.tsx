import React from 'react';

export const LiveSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i}>
        <div className="aspect-[21/9] border border-foreground bg-muted animate-pulse" />
        <div className="h-4 mt-3 w-2/3 bg-muted animate-pulse" />
        <div className="h-3 mt-2 w-1/3 bg-muted animate-pulse" />
      </div>
    ))}
  </div>
);

export const LiveSectionShell: React.FC<{ eyebrow: string; children: React.ReactNode }> = ({ eyebrow, children }) => (
  <div className="mb-12">
    <div className="text-[11px] uppercase tracking-wider opacity-60 mb-4">{eyebrow}</div>
    {children}
  </div>
);

export const LiveError: React.FC<{ service: string }> = ({ service }) => (
  <p className="text-sm opacity-60">Couldn't reach {service} right now.</p>
);
