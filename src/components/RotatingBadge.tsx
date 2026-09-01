import React from 'react';
import badgeDark from '@/assets/badge-dark.png';

/**
 * Scalloped metallic badge with static centered nib-style down-arrow.
 * Constant clockwise spin.
 */
interface RotatingBadgeProps {
  text: string;
  onClick?: () => void;
  showIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  text,
  onClick,
  className = 'fixed top-4 right-4 md:top-8 md:right-8',
}) => {
  return (
    <div
      className={`${className} w-[60px] h-[60px] md:w-[72px] md:h-[72px] lg:w-[120px] lg:h-[120px] ${onClick ? 'cursor-pointer' : ''} z-40 animate-fade-in`}
      style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${text} — scroll down` : `${text} badge`}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      <div
        className="relative w-full h-full badge-spinner"
        style={{ animation: 'badge-spin 20s linear infinite' }}
      >
        <img
          src={badgeDark}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* static centered down-arrow mark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className="h-[23px] w-[23px] md:h-[28px] md:w-[28px] lg:h-[46px] lg:w-[46px]"
          fill="none"
        >
          <path
            d="M32 10.5V46.5"
            stroke="#123E3F"
            strokeWidth="4.8"
            strokeLinecap="round"
          />
          <path
            d="M13.5 31.5C21.5 31.5 27.8 38.5 32 47"
            stroke="#123E3F"
            strokeWidth="4.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50.5 31.5C42.5 31.5 36.2 38.5 32 47"
            stroke="#123E3F"
            strokeWidth="4.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes badge-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .badge-spinner { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
