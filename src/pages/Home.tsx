import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { WorkGrid } from '@/components/WorkGrid';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="Sadman Zaman Khan — Designer & Poet"
        description="Designer and poet crafting meticulous designs for brands and digital products."
      />

      <main className="animate-slide-up w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[96px] md:pt-[110px]">
        {/* 1. Hero Statement (Direct, no big name, no designation, regular weight) */}
        <section className="pt-10 md:pt-16 pb-14 md:pb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFFFF] font-normal leading-[1.18] tracking-tight max-w-4xl">
            Designer and poet crafting meticulous designs for brands and digital products.
          </h1>
        </section>

        {/* 2. Direct Work Showcase (No section title, no filters on home) */}
        <section id="work-section" className="pb-16">
          <WorkGrid showFilters={false} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
