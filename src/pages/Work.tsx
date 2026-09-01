import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { WorkGrid } from '@/components/WorkGrid';

const Work: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="Work & Case Studies — Sadman Zaman Khan"
        description="Comprehensive index of enterprise dashboards, digital products, and brand systems designed and prototyped by Sadman Zaman Khan."
      />

      <main className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[100px] md:pt-[120px]">
        {/* Page Header */}
        <section className="py-10 md:py-14 border-b border-[#1F1F1F] mb-10">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF]">
              Work &amp; Case Studies
            </h1>
            <p className="text-base sm:text-lg text-[#999999] leading-relaxed">
              Enterprise financial terminals, design systems, mobile experiences, and digital platforms.
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
