import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { WorkGrid } from '@/components/WorkGrid';

const Work: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] flex flex-col justify-between selection:bg-[#FF6B35] selection:text-[#0A0A0A]">
      <SEOHead
        title="Work & Case Studies — Sadman Zaman Khan"
        description="Comprehensive index of enterprise dashboards, AI-native products, and brand systems designed and prototyped by Sadman Zaman Khan."
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full pt-[100px] md:pt-[120px]">
        {/* Page Header */}
        <section className="py-10 md:py-14 border-b border-[#242424] mb-10">
          <div className="max-w-3xl space-y-4">
            <div className="font-mono text-xs uppercase tracking-wider text-[#FF6B35]">
              Project Index
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F5F0]">
              Selected Work &amp; Case Studies
            </h1>
            <p className="text-base sm:text-lg text-[#9A9A93] leading-relaxed">
              Enterprise financial terminals, connected multi-product design systems, luxury mobile experiences, and AI workspace platforms.
            </p>
          </div>
        </section>

        {/* Full Work Grid */}
        <section className="pb-16">
          <WorkGrid showFilters={true} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
