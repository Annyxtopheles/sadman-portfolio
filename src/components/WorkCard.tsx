import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/data/projects';
import TiltedCard from './TiltedCard';

interface WorkCardProps {
  project: Project;
}

export const WorkCard: React.FC<WorkCardProps> = ({ project }) => {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-[#141414] hover:bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition-all duration-200"
    >
      {/* Tilted Card Image with 3D Spring Physics */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A] p-2 sm:p-3">
        <TiltedCard
          imageSrc={project.coverImage}
          altText={project.title}
          captionText={project.category}
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={12}
          scaleOnHover={1.04}
          showTooltip={true}
          showMobileWarning={false}
        />
      </div>

      {/* Text block */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#FFFFFF] group-hover:text-[#00E5FF] transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-sm text-[#CBD5E1] leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Card Footer Meta */}
        <div className="pt-3 border-t border-[#27272A] flex items-center justify-between font-mono text-xs text-[#94A3B8]">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
};
