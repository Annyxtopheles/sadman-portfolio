import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Mail, Sparkles, Code2, Layers } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { WorkGrid } from '@/components/WorkGrid';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#00E5FF] selection:text-[#0A0A0A]">
      <SEOHead
        title="Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper"
        description="Sadman Zaman Khan designs enterprise tools, digital products, and brand systems — building functional prototypes to bridge the gap between design and engineering."
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full pt-[96px] md:pt-[110px]">
        {/* 1. Hero Section */}
        <section className="pt-8 md:pt-14 pb-14 md:pb-18 border-b border-[#27272A]">
          <div className="max-w-4xl space-y-6">
            {/* Title, Name Pronunciation & Role Line */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-[1.08]">
                Sadman Zaman Khan
              </h1>
              <div className="font-mono text-xs sm:text-sm text-[#94A3B8] tracking-wider">
                /sɑːd.mɑːn zɑː.mɑːn kɑːn/ · (Saad-maan Zaa-maan Khaan)
              </div>
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-[#00E5FF] pt-1">
                UI/UX Designer &amp; AI-Augmented Prototyper
              </p>
            </div>

            {/* Authentic Pitch */}
            <p className="text-base sm:text-lg md:text-xl text-[#CBD5E1] leading-relaxed max-w-3xl font-normal">
              I design enterprise tools, digital products, and brand systems — and build functional prototypes to bridge the gap between design and engineering.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#FFFFFF] text-[#0A0A0A] hover:bg-[#F1F5F9] transition-all shadow-md active:scale-95 font-semibold"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="#work-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#141414] text-[#FFFFFF] hover:bg-[#1C1C1C] border border-[#27272A] hover:border-[#00E5FF]/40 transition-all active:scale-95"
              >
                <span>View Work</span>
                <ArrowDown className="w-4 h-4 text-[#00E5FF]" />
              </a>
            </div>
          </div>
        </section>

        {/* 2. Work Grid */}
        <section id="work-section" className="py-14 md:py-18 scroll-mt-24">
          <div className="mb-8">
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
