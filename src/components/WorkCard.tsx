import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/data/projects';
import TiltedCard from './TiltedCard';

interface WorkCardProps {
  project: Project;
}

export const WorkCard: React.FC<WorkCardProps> = ({ project }) => {
  return (
    <TiltedCard rotateAmplitude={6} scaleOnHover={1.015} className="h-full">
      <Link
        to={`/work/${project.slug}`}
        className="group flex flex-col h-full space-y-3"
      >
        {/* Card Header matching Whitman format: Date | Title | Category */}
        <div className="flex items-baseline justify-between gap-3 text-xs">
          <div className="flex items-baseline gap-2.5 overflow-hidden">
            <span className="text-[#666666] tabular-nums font-normal shrink-0">{project.year}</span>
            <h3 className="text-sm font-semibold text-[#FFFFFF] truncate leading-tight">
              {project.title}
            </h3>
          </div>
          <span className="text-[#888888] text-xs font-normal shrink-0 whitespace-nowrap">
            {project.category}
          </span>
        </div>

        {/* Card Image — clean screenshot without zoom-in effect and subtle 4px radius */}
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
  );
};
