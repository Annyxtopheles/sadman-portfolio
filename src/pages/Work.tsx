import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { WorkGrid } from '@/components/WorkGrid';

const Work: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="Work — Sadman Zaman Khan"
        description="Selected design work and case studies by Sadman Zaman Khan."
      />

      <main className="animate-slide-up w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[100px] md:pt-[120px]">
        {/* Page Header */}
        <section className="pt-6 pb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FFFFFF]">
            Work
          </h1>
        </section>

        {/* Work Grid with Category Filters */}
        <section className="pb-16">
          <WorkGrid showFilters={true} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
