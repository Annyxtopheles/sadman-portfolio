import React from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`h-full transition-all duration-300 ${
        isHovered ? 'relative z-20 scale-[1.015]' : ''
      } ${
        isMuted ? 'opacity-25 blur-[3px] scale-[0.98]' : 'opacity-100 filter-none'
      }`}
    >
      <TiltedCard rotateAmplitude={6} scaleOnHover={1.01} className="h-full">
        <Link
          to={`/work/${project.slug}`}
          className="group flex flex-col h-full space-y-3 cursor-pointer"
        >
          {/* Card Header: Project Name on Left, Date on Right (No category, regular weight) */}
          <div className="flex items-baseline justify-between gap-4 text-xs font-normal">
            <h3 className="text-sm font-normal text-[#FFFFFF] group-hover:text-[#FFFFFF] truncate leading-tight">
              {project.title}
            </h3>
            <span className="text-[#888888] text-xs font-normal tabular-nums shrink-0 whitespace-nowrap">
              {project.year}
            </span>
          </div>

          {/* Card Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A] rounded-[4px] border border-[#1F1F1F] group-hover:border-[#333333] transition-colors">
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Link>
      </TiltedCard>
    </div>
  );
};
