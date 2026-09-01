import React from 'react';
import type { PoetryMode } from '@/hooks/public/usePoetryViewerSettings';

interface Props {
  mode: PoetryMode;
  onChange: (m: PoetryMode) => void;
}

export const PoetryViewerToggle: React.FC<Props> = ({ mode, onChange }) => {
  const opts: { key: PoetryMode; label: string }[] = [
    { key: 'antique', label: 'Antique' },
    { key: 'modern', label: 'Modern' },
  ];
  return (
    <div
      role="group"
      aria-label="Poem presentation mode"
      className="inline-flex items-center gap-2 bg-transparent text-[10px] uppercase tracking-wider"
    >
      {opts.map((o) => {
        const active = mode === o.key;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            aria-pressed={active}
            className={[
              'rounded-full border px-3 py-1.5 transition-colors duration-300',
              active
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent border-foreground/30 text-foreground hover:bg-foreground/5',
            ].join(' ')}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};
