import React from 'react';
import { normalizeFocal } from '@/lib/focal';

export const PastimeCard: React.FC<{
  href?: string | null;
  cover: string | null;
  title: string;
  sub?: string | null;
  meta?: string | null;
  focal?: string | null;
}> = ({ href, cover, title, sub, meta, focal }) => {
  const objectPosition = normalizeFocal(focal);
  const inner = (
    <div className="group block">
      <div className="aspect-[21/9] overflow-hidden border border-foreground bg-muted">
        {cover ? (
          <img
            src={cover}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-[400ms] ease"
            style={{ objectPosition }}
          />
        ) : (
          <div className="w-full h-full bg-accent-surface" />
        )}
      </div>
      <h3 className="text-base font-medium mt-3 truncate group-hover:text-accent-ink transition-colors duration-[400ms]">{title}</h3>
      {sub && <p className="text-sm opacity-60 truncate">{sub}</p>}
      {meta && <p className="text-[11px] uppercase tracking-wider opacity-60 mt-1">{meta}</p>}
    </div>
  );
  if (!href) return inner;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
};
