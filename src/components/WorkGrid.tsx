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
      {/* Category Filter Header (No numbers) */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 pb-4 border-b border-[#27272A]">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#00E5FF] text-[#0A0A0A] font-bold shadow-sm'
                    : 'bg-[#141414] text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-[#1C1C1C] border border-[#27272A] hover:border-[#00E5FF]/40'
                }`}
              >
                <span>{cat}</span>
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
