import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '@/data/projects';

export const FeaturedCarousel: React.FC = () => {
  if (PROJECTS.length === 0) return null;
  const loop = [...PROJECTS, ...PROJECTS];

  return (
    <section className="overflow-hidden py-8">
      <div className="flex gap-6 animate-scroll-left whitespace-nowrap">
        {loop.map((p, i) => (
          <Link key={`${p.id}-${i}`} to={`/portfolio/${p.slug}`} className="shrink-0 w-[280px] md:w-[360px] group">
            <div className="aspect-[4/3] overflow-hidden bg-muted rounded-2xl">
              {p.cover_image_url ? (
                <div
                  className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-[filter] duration-300 ease"
                  style={{ backgroundImage: `url(${p.cover_image_url})` }}
                />
              ) : (
                <div className="w-full h-full bg-foreground/5" />
              )}
            </div>
            <div className="mt-3 text-xs uppercase font-medium tracking-wider truncate group-hover:opacity-60 transition-opacity">
              {p.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
