import React from 'react';
import { useAnilistCurrent } from '@/hooks/public/live/useAnilistCurrent';
import { LiveSkeleton, LiveSectionShell, LiveError } from './LivePrimitives';

export const LiveAnimeStrip: React.FC<{ username?: string | null }> = ({ username }) => {
  const { items, loading, error } = useAnilistCurrent(username);
  if (!username) return null;
  return (
    <LiveSectionShell eyebrow="Live · AniList — Currently watching">
      {loading ? <LiveSkeleton /> : error && items.length === 0 ? <LiveError service="AniList" /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.slice(0, 4).map((a) => {
            const img = a.banner || a.cover;
            return (
              <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="aspect-[21/9] overflow-hidden border border-foreground bg-muted">
                  {img ? (
                    <img src={img} alt={a.title} loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-[400ms] ease" />
                  ) : <div className="w-full h-full bg-accent-surface" />}
                </div>
                <h3 className="text-base font-medium mt-3 truncate group-hover:text-accent-ink transition-colors duration-[400ms]">{a.title}</h3>
                <p className="text-[11px] uppercase tracking-wider opacity-60 mt-1">
                  EP {a.progress}{a.total ? `/${a.total}` : ''}{a.score ? ` · ★ ${a.score}` : ''}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </LiveSectionShell>
  );
};
