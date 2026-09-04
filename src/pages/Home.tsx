import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { WorkGrid } from '@/components/WorkGrid';
import { WarpText } from '@/components/effects/WarpText';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="Sadman Zaman Khan — Designer & Poet"
        description="Designer and poet crafting meticulous designs for brands and digital products."
      />

      <main className="animate-slide-up w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[96px] md:pt-[110px]">
        {/* 1. Hero Statement with WarpText interactive effect */}
        <section className="pt-10 md:pt-16 pb-14 md:pb-20">
          <h1 className="sr-only">
            Designer and poet crafting meticulous designs for brands and digital products.
          </h1>
          <div className="w-full max-w-4xl">
            <WarpText
              text="Designer and poet crafting meticulous designs for brands and digital products."
              color="#FFFFFF"
              fontFamily="inherit"
              fontSize="clamp(1.85rem, 4.2vw, 3.75rem)"
              fontWeight={400}
              letterSpacing="-0.02em"
              lineHeight={1.22}
              textAlign="left"
              warpStrength={0.07}
              warpScale={1.6}
              speed={0.5}
              pointerInfluence={0.4}
              pointerStrength={0.35}
              refraction={0.015}
              ripple={true}
              className="w-full min-h-[120px] sm:min-h-[150px] md:min-h-[180px]"
            />
          </div>
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
