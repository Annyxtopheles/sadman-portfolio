import React from 'react';
import { ACHIEVEMENTS, type AchievementItem } from '@/data/achievements';

export const AchievementsSection: React.FC<{ items?: AchievementItem[] }> = ({ items = ACHIEVEMENTS }) => {
  return (
    <section className="py-20">
      <div className="mb-10">
        <h2 className="font-scanport text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight lowercase">
          recognition &amp; impact
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-6 md:p-8 rounded-lg bg-foreground/5 flex flex-col justify-between space-y-6 group hover:bg-foreground/[0.08] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-scanport text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
                {item.metric}
              </span>
              {item.tag && (
                <span className="text-xs uppercase tracking-wider font-medium opacity-40 px-2.5 py-1 rounded-full bg-foreground/5">
                  {item.tag}
                </span>
              )}
            </div>

            <div>
              <h3 className="font-medium text-lg text-foreground mb-1.5 leading-snug">
                {item.label}
              </h3>
              <p className="text-base opacity-70 leading-relaxed font-sans font-normal">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
