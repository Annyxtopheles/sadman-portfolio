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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full space-y-8 relative">
      {/* Subtle gentle backdrop overlay when hovering any card */}
      <div
        className={`fixed inset-0 bg-[#000000]/25 pointer-events-none transition-opacity duration-300 z-10 ${
          hoveredId ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Category Filter Header (Only shown on Work page) */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 pb-6 border-b border-[#1F1F1F] relative z-20">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center px-3 py-1 rounded-[4px] text-xs font-normal transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFFFFF] text-[#000000]'
                    : 'bg-[#0A0A0A] text-[#888888] hover:text-[#FFFFFF] border border-[#1F1F1F] hover:border-[#333333]'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3-Col Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-20">
        {filteredProjects.map((project) => (
          <WorkCard
            key={project.id}
            project={project}
            isHovered={hoveredId === project.id}
            isAnyHovered={hoveredId !== null}
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
          />
        ))}
      </div>
    </div>
  );
};
