import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/projects';

interface WorkCardProps {
  project: Project;
}

export const WorkCard: React.FC<WorkCardProps> = ({ project }) => {
  const isShipped = project.status === 'SHIPPED';
  const isCaseStudy = project.status === 'CASE STUDY';

  const dotColor = isShipped
    ? 'bg-[#4ADE80]'
    : isCaseStudy
    ? 'bg-[#7DA2FF]'
    : 'bg-[#FF6B35]';

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] hover:border-[#333333] transition-all duration-200 hover:scale-[1.015] hover:shadow-xl"
    >
      {/* Card Image — fills top ~70% without padding/letterboxing */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A]">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

        {/* Status Pill on top-right of image */}
        <div className="absolute top-4 right-4 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-medium uppercase tracking-wider bg-[#0A0A0A]/85 backdrop-blur-md border border-[#242424] text-[#F5F5F0] shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
            <span>{project.status}</span>
          </div>
        </div>

        {/* Scope Pill top-left */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-2.5 py-1 rounded-full font-mono text-[11px] font-medium text-[#9A9A93] bg-[#0A0A0A]/85 backdrop-blur-md border border-[#242424]">
            {project.category}
          </span>
        </div>
      </div>

      {/* Text block with 24px padding */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F5F5F0] group-hover:text-[#FF6B35] transition-colors leading-tight">
              {project.title}
            </h3>
            <div className="p-1.5 rounded-full bg-[#1C1C1C] border border-[#242424] text-[#9A9A93] group-hover:text-[#F5F5F0] group-hover:border-[#FF6B35]/40 transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm text-[#9A9A93] leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Card Footer Meta */}
        <div className="pt-3 border-t border-[#242424] flex items-center justify-between font-mono text-xs text-[#5C5C56]">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
};
