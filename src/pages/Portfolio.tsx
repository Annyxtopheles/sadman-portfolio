import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { ShowcaseGallerySection } from '@/components/portfolio/ShowcaseGallery';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SEOHead
        title="Portfolio — Sadman Zaman Khan"
        description="Selected design works, enterprise case studies, and visual explorations by Sadman Zaman Khan: design systems, interface architecture, and interactive experiences."
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full">
        {/* Page Header */}
        <section className="pt-36 md:pt-44 lg:pt-52 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-scanport text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight lowercase">
              selected work
            </h1>
          </div>
        </section>

        {/* Portfolio Showcase Grid (Case Studies + Visual Shots) */}
        <section id="grid" className="pb-24 pt-4">
          <ShowcaseGallerySection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
