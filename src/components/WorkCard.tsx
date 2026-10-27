import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '@/data/projects';
import TiltedCard from './TiltedCard';

interface WorkCardProps {
  project: Project;
  isHovered?: boolean;
  isAnyHovered?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  project,
  isHovered = false,
  isAnyHovered = false,
  onHoverStart,
  onHoverEnd,
}) => {
  const isMuted = isAnyHovered && !isHovered;
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      e.preventDefault();
      (document as any).startViewTransition(() => {
        navigate(`/work/${project.slug}`);
      });
    }
  };

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`h-full transition-all duration-300 ${
        isHovered ? 'relative z-20 scale-[1.015]' : ''
      } ${
        isMuted ? 'opacity-35 scale-[0.995]' : 'opacity-100'
      }`}
    >
      <TiltedCard rotateAmplitude={6} scaleOnHover={1.01} className="h-full">
        <Link
          to={`/work/${project.slug}`}
          onClick={handleCardClick}
          className="group flex flex-col h-full space-y-3 cursor-pointer"
        >
          {/* Card Header: Project Name on Left, Date on Right */}
          <div className="flex items-baseline justify-between gap-4 text-xs font-normal">
            <h3 className="text-sm font-normal text-[#FFFFFF] group-hover:text-[#FFFFFF] truncate leading-tight">
              {project.title}
            </h3>
            <span className="text-[#888888] text-xs font-normal tabular-nums shrink-0 whitespace-nowrap font-mono">
              {project.year}
            </span>
          </div>

          {/* Card Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A] rounded-[4px] border border-[#1F1F1F] group-hover:border-[#333333] transition-colors">
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </div>
        </Link>
      </TiltedCard>
    </div>
  );
};
