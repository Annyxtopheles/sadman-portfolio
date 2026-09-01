import React from 'react';
import { useLetterboxdRecent } from '@/hooks/public/live/useLetterboxdRecent';
import { LiveSkeleton, LiveSectionShell, LiveError } from './LivePrimitives';

const Stars: React.FC<{ rating: number | null }> = ({ rating }) => {
  if (rating == null) return null;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="text-[11px] tracking-wider opacity-80">
      {'★'.repeat(full)}{half ? '½' : ''}
    </span>
  );
};

export const LiveMoviesStrip: React.FC<{ username?: string | null }> = ({ username }) => {
  const { items, loading, error } = useLetterboxdRecent(username);
  if (!username) return null;
  return (
    <LiveSectionShell eyebrow="Live · Letterboxd">
      {loading ? <LiveSkeleton /> : error && items.length === 0 ? <LiveError service="Letterboxd" /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.slice(0, 4).map((m) => (
            <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="aspect-[21/9] overflow-hidden border border-foreground bg-muted">
                {m.poster ? (
                  <img src={m.poster} alt={m.title} loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-[400ms] ease" />
                ) : <div className="w-full h-full bg-accent-surface" />}
              </div>
              <h3 className="text-base font-medium mt-3 truncate group-hover:text-accent-ink transition-colors duration-[400ms]">
                {m.title}{m.year ? <span className="opacity-60"> · {m.year}</span> : null}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Stars rating={m.rating} />
              </div>
              {m.reviewSnippet && <p className="text-sm opacity-60 mt-1 line-clamp-2">{m.reviewSnippet}</p>}
            </a>
          ))}
        </div>
      )}
    </LiveSectionShell>
  );
};
