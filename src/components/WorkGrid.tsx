import React, { useState } from 'react';
import { CATEGORIES, PROJECTS, ProjectCategory } from '@/data/projects';
import { WorkCard } from './WorkCard';

interface WorkGridProps {
  initialCategory?: 'All' | ProjectCategory;
  showFilters?: boolean;
}

export const WorkGrid: React.FC<WorkGridProps> = ({
  initialCategory = 'All',
  showFilters = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>(initialCategory);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full space-y-8">
      {/* Category Index Filter Header */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 pb-2 border-b border-[#242424]">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#F5F5F0] text-[#0A0A0A] font-semibold'
                    : 'bg-[#141414] text-[#9A9A93] hover:text-[#F5F5F0] hover:bg-[#1C1C1C] border border-[#242424]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#0A0A0A]/20 text-[#0A0A0A]' : 'bg-[#242424] text-[#5C5C56] group-hover:text-[#9A9A93]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 2-Col Grid (Desktop) / 1-Col Grid (Mobile) with 24px Gutters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
