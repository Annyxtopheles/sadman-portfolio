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
      {/* Category Filter Header */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 pb-4 border-b border-[#1F1F1F]">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFFFFF] text-[#000000] font-semibold'
                    : 'bg-[#0A0A0A] text-[#888888] hover:text-[#FFFFFF] border border-[#1F1F1F] hover:border-[#333333]'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3-Col Grid matching Whitman layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {filteredProjects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>

      {/* Total count footer */}
      <div className="pt-8 border-t border-[#1F1F1F] flex items-center justify-between text-xs text-[#888888]">
        <div>
          Total: <span className="text-[#FFFFFF] font-medium">{filteredProjects.length} Works</span>
        </div>
      </div>
    </div>
  );
};
