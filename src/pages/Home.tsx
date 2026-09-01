import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Mail, Sparkles, Code2, Layers } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { WorkGrid } from '@/components/WorkGrid';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] flex flex-col justify-between selection:bg-[#FF6B35] selection:text-[#0A0A0A]">
      <SEOHead
        title="Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper"
        description="Sadman Zaman Khan designs enterprise dashboards, AI-native product interfaces, and brand systems — building functional prototypes to compress engineering cycles."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Sadman Zaman Khan',
            jobTitle: 'UI/UX Designer & AI-Augmented Prototyper',
            worksFor: {
              '@type': 'Organization',
              name: 'SJ Innovation LLC',
            },
            url: 'https://sadmanzamankhan.pages.dev/',
            sameAs: ['https://linkedin.com/in/sadmanzamankhan'],
          },
        ]}
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full pt-[96px] md:pt-[110px]">
        {/* 1. Hero Section (Kept to ~4 lines max, no scroll required) */}
        <section className="pt-8 md:pt-14 pb-14 md:pb-18 border-b border-[#242424]">
          <div className="max-w-4xl space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#141414] border border-[#242424] text-[#9A9A93]">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span>Currently Sole Designer at SJ Innovation</span>
            </div>

            {/* Title & Role Line */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F0] leading-[1.08]">
                Sadman Zaman Khan
              </h1>
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-[#FF6B35]">
                UI/UX Designer &amp; AI-Augmented Prototyper
              </p>
            </div>

            {/* One-line Pitch */}
            <p className="text-base sm:text-lg md:text-xl text-[#9A9A93] leading-relaxed max-w-3xl font-normal">
              I design enterprise dashboards, AI-native product interfaces, and brand systems — then build functional prototypes myself to compress engineering review cycles.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#F5F5F0] text-[#0A0A0A] hover:bg-white transition-all shadow-md active:scale-95"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="#work-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#141414] text-[#F5F5F0] hover:bg-[#1C1C1C] border border-[#242424] transition-all active:scale-95"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-4 h-4 text-[#9A9A93]" />
              </a>
            </div>
          </div>

          {/* Quick Credibility Strip */}
          <div className="mt-12 pt-8 border-t border-[#242424]/60 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs text-[#9A9A93]">
            <div>
              <div className="text-xl font-bold font-display text-[#F5F5F0]">10+</div>
              <div className="text-[#5C5C56] mt-0.5">AI Products Designed</div>
            </div>
            <div>
              <div className="text-xl font-bold font-display text-[#F5F5F0]">-40%</div>
              <div className="text-[#5C5C56] mt-0.5">Dev Review Cycles</div>
            </div>
            <div>
              <div className="text-xl font-bold font-display text-[#F5F5F0]">200+</div>
              <div className="text-[#5C5C56] mt-0.5">Digital Assets Shipped</div>
            </div>
            <div>
              <div className="text-xl font-bold font-display text-[#F5F5F0]">100%</div>
              <div className="text-[#5C5C56] mt-0.5">On-Time Delivery</div>
            </div>
          </div>
        </section>

        {/* 2. Work Grid Starts Immediately Below */}
        <section id="work-section" className="py-14 md:py-18 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#FF6B35] mb-1">Selected Projects</div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F0]">
                Enterprise &amp; AI Product Work
              </h2>
            </div>
            <p className="text-sm text-[#9A9A93] max-w-md">
              Real interfaces shipped to production and high-fidelity testable prototypes. Click any project for the full case study.
            </p>
          </div>

          <WorkGrid showFilters={true} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
