import React from 'react';
import {
  TESTIMONIALS_ROW_1,
  TESTIMONIALS_ROW_2,
  type TestimonialItem,
} from '@/data/testimonials';

const TestimonialCard: React.FC<{ item: TestimonialItem }> = ({ item }) => (
  <article className="w-[320px] sm:w-[400px] md:w-[440px] shrink-0 p-6 md:p-8 rounded-lg bg-foreground/5 flex flex-col justify-between space-y-6 select-none group hover:bg-foreground/[0.08] transition-colors">
    <p className="text-base sm:text-lg leading-relaxed opacity-85 font-sans font-normal">
      {item.quote}
    </p>

    <div>
      <div className="font-medium text-foreground text-sm">
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 inline-flex items-center gap-1"
          >
            <span>{item.author}</span>
            <span className="text-xs opacity-60">↗</span>
          </a>
        ) : (
          item.author
        )}
      </div>
      <div className="opacity-50 text-xs mt-0.5 lowercase">
        {item.role}{item.company ? ` · ${item.company}` : ''}
      </div>
    </div>
  </article>
);

export const TestimonialsMarquee: React.FC = () => {
  // Duplicate arrays for seamless infinite loop without breaks
  const row1Duplicated = [...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1];
  const row2Duplicated = [...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2];

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 mb-10">
        <h2 className="font-scanport text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight lowercase">
          what people have said about me
        </h2>
      </div>

      {/* Marquee Container with fade gradient masks at edges */}
      <div className="relative w-full space-y-6">
        {/* Edge Vignette Masks for graceful fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1: Right to Left */}
        <div className="group flex overflow-hidden w-full">
          <div className="flex gap-6 shrink-0 animate-scroll-left group-hover:[animation-play-state:paused] will-change-transform">
            {row1Duplicated.map((item, idx) => (
              <TestimonialCard key={`row1-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="group flex overflow-hidden w-full">
          <div className="flex gap-6 shrink-0 animate-scroll-right group-hover:[animation-play-state:paused] will-change-transform">
            {row2Duplicated.map((item, idx) => (
              <TestimonialCard key={`row2-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
