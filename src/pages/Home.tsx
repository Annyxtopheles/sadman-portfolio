import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { WorkGrid } from '@/components/WorkGrid';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper"
        description="Sadman Zaman Khan designs enterprise tools, digital products, and brand systems — building functional prototypes to bridge the gap between design and engineering."
      />

      <main className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[96px] md:pt-[110px]">
        {/* 1. Hero Section */}
        <section className="pt-8 md:pt-14 pb-14 md:pb-18 border-b border-[#1F1F1F]">
          <div className="max-w-4xl space-y-6">
            {/* Title, Name Pronunciation & Role Line */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-[1.08]">
                Sadman Zaman Khan
              </h1>
              <div className="text-xs sm:text-sm text-[#888888] tracking-wider">
                /sɑːd.mɑːn zɑː.mɑːn kɑːn/ · (Saad-maan Zaa-maan Khaan)
              </div>
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-[#FFFFFF] pt-1">
                UI/UX Designer &amp; AI-Augmented Prototyper
              </p>
            </div>

            {/* Authentic Pitch */}
            <p className="text-base sm:text-lg md:text-xl text-[#999999] leading-relaxed max-w-3xl font-normal">
              I design enterprise tools, digital products, and brand systems — and build functional prototypes to bridge the gap between design and engineering.
            </p>
          </div>
        </section>

        {/* 2. Work Grid */}
        <section id="work-section" className="py-14 md:py-18 scroll-mt-24">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FFFFFF]">
              Work
            </h2>
          </div>

          <WorkGrid showFilters={true} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
