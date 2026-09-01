import React from 'react';
import { useLastfmRecent } from '@/hooks/public/live/useLastfmRecent';
import { LiveSkeleton, LiveSectionShell, LiveError } from './LivePrimitives';

export const LiveMusicStrip: React.FC<{ username?: string | null }> = ({ username }) => {
  const { items, loading, error } = useLastfmRecent(username);
  if (!username) return null;
  return (
    <LiveSectionShell eyebrow="Live · Last.fm">
      {loading ? <LiveSkeleton /> : error && items.length === 0 ? <LiveError service="Last.fm" /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.slice(0, 4).map((t) => (
            <a key={t.id} href={t.url} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative aspect-[21/9] overflow-hidden border border-foreground bg-muted">
                {t.cover ? (
                  <img src={t.cover} alt={t.title} loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-[400ms] ease" />
                ) : <div className="w-full h-full bg-accent-surface" />}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm border border-foreground text-[10px] uppercase tracking-wider">
                  {t.nowPlaying && <span className="w-1.5 h-1.5 rounded-full bg-accent-ink animate-pulse" />}
                  {t.nowPlaying ? 'Now Playing' : 'Recently Played'}
                </div>
              </div>
              <h3 className="text-base font-medium mt-3 truncate group-hover:text-accent-ink transition-colors duration-[400ms]">{t.title}</h3>
              {t.artist && <p className="text-sm opacity-60 truncate">{t.artist}</p>}
              {t.album && <p className="text-[11px] uppercase tracking-wider opacity-60 mt-1 truncate">{t.album}</p>}
            </a>
          ))}
        </div>
      )}
    </LiveSectionShell>
  );
};
