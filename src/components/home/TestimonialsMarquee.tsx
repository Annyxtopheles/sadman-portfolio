import React from 'react';
import {
  TESTIMONIALS_ROW_1,
  TESTIMONIALS_ROW_2,
  type TestimonialItem,
} from '@/data/testimonials';

const TestimonialCard: React.FC<{ item: TestimonialItem }> = ({ item }) => (
  <article className="w-[320px] sm:w-[400px] md:w-[440px] shrink-0 p-6 md:p-7 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] flex flex-col justify-between space-y-5 select-none group transition-colors">
    <p className="text-xs sm:text-sm text-[#CCCCCC] font-normal leading-relaxed">
      "{item.quote}"
    </p>

    <div className="border-t border-[#1a1a1a] pt-3.5">
      <div className="font-normal text-[#FFFFFF] text-xs sm:text-sm">
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 inline-flex items-center gap-1 text-[#FFFFFF]"
          >
            <span>{item.author}</span>
            <span className="text-xs text-[#888888]">↗</span>
          </a>
        ) : (
          item.author
        )}
      </div>
      <div className="text-[#888888] text-xs mt-0.5 font-mono lowercase">
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
    <section className="py-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 mb-8 space-y-1">
        <span className="text-xs font-mono uppercase tracking-wider text-[#888888] block">
          Endorsements & Feedback
        </span>
        <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
          What People Say
        </h2>
      </div>

      {/* Marquee Container with fade gradient masks at edges */}
      <div className="relative w-full space-y-5">
        {/* Edge Vignette Masks for graceful fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1: Right to Left */}
        <div className="group flex overflow-hidden w-full">
          <div className="flex gap-5 shrink-0 animate-scroll-left group-hover:[animation-play-state:paused] will-change-transform">
            {row1Duplicated.map((item, idx) => (
              <TestimonialCard key={`row1-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="group flex overflow-hidden w-full">
          <div className="flex gap-5 shrink-0 animate-scroll-right group-hover:[animation-play-state:paused] will-change-transform">
            {row2Duplicated.map((item, idx) => (
              <TestimonialCard key={`row2-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
