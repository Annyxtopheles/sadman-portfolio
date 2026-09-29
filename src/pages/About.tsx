import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { useExploration } from '@/context/ExplorationContext';
import { BorderGlow } from '@/components/effects/BorderGlow';
import { ArtifactCollage, ArtifactImage } from '@/components/ArtifactCollage';
import { TestimonialsMarquee } from '@/components/home/TestimonialsMarquee';
import { PERSON_JSON_LD, CANONICAL_SITE_URL } from '@/data/siteSettings';

interface CompetencyPillar {
  number: string;
  title: string;
  category: string;
  skills: string[];
  tools: string[];
}

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  url: string;
}

const COMPETENCY_PILLARS: CompetencyPillar[] = [
  {
    number: '01',
    title: 'UI/UX & Design Systems',
    category: 'Product Design',
    skills: [
      'Component Libraries & Auto-layout Variants',
      'Design Tokens & Multi-variable Systems',
      'Interactive Prototyping & User Flows',
      'Responsive Web & Mobile Application Layouts',
      'Dashboard & Command-Center Interfaces'
    ],
    tools: ['Figma', 'Design Systems', 'Tokens Studio', 'FigJam']
  },
  {
    number: '02',
    title: 'AI-Augmented Workflows',
    category: 'Prototyping & Research',
    skills: [
      'AI-Directed Responsive Web Prototyping',
      'Rapid User Flow Validation Before Engineering',
      'Local Safetensors & ComfyUI Generation Pipelines',
      'Local Open-Source LLMs for Competitive UX Research',
      'Live Server-Sent Event (SSE) Stream Testing'
    ],
    tools: ['Google Antigravity', 'Lovable', 'Claude Code CLI', 'ComfyUI', 'Ollama']
  },
  {
    number: '03',
    title: 'Brand Systems & Visuals',
    category: 'Brand Architecture',
    skills: [
      'Vector Identity Systems & Logo Suites',
      'Enterprise Brand Guidelines & Design Governance',
      'Executive Sales Enablement & Diagnostic Decks',
      'High-Converting Editorial Carousels & Social Packaging',
      'Large-Format Print Collateral & Event Signage'
    ],
    tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Brand Guidelines']
  },
  {
    number: '04',
    title: 'Growth & Web Discovery',
    category: 'Performance & SEO',
    skills: [
      'Direct-Response Ad Creative Design & Testing',
      'Targeted Campaign Setup & Optimization in Meta Ads',
      'Semantic Heading Hierarchies & Metadata Optimization',
      'JSON-LD Structured Data & Search Console Verification',
      'WordPress & Web Content Administration'
    ],
    tools: ['Meta Ads Manager', 'Google Search Console', 'JSON-LD', 'WordPress']
  }
];

const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'February 2026',
    url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
  },
  {
    title: 'Design System in Figma',
    issuer: 'Grameenphone Academy',
    date: 'October 2025',
    url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
  },
  {
    title: 'Digital Skills: User Experience',
    issuer: 'Accenture',
    date: 'September 2025',
    url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
  },
  {
    title: 'HubSpot Inbound Marketing Certification',
    issuer: 'HubSpot',
    date: 'March 2026',
    url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
  },
  {
    title: 'B1 English for Developers (Score: 95.2%)',
    issuer: 'freeCodeCamp',
    date: 'February 2026',
    url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
  },
  {
    title: 'Graphic Design for Freelancing Level-3',
    issuer: 'NSDA',
    date: 'October 2024',
    url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
  }
];

const About: React.FC = () => {
  const { recordPortalFound } = useExploration();
  const portalRef = useRef<HTMLDivElement>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const el = portalRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          recordPortalFound();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [recordPortalFound]);

  useEffect(() => {
    if (isResumeModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isResumeModalOpen]);

  // Personal Portraits
  const personalImages: ArtifactImage[] = [
    {
      url: '/assets/profile/portrait-06-sunlight-portrait.webp',
      caption: 'Sadman Zaman Khan — Portrait in natural sunlight',
      tag: 'Sunlight'
    },
    {
      url: '/assets/profile/portrait-03-ai-hackathon.webp',
      caption: 'AI Hackathon Certificate Photoshoot — Engineering & creative identity',
      tag: 'Hackathon'
    },
    {
      url: '/assets/profile/portrait-02-traditional-attire.webp',
      caption: 'Sadman Zaman Khan — Editorial portrait in traditional attire',
      tag: 'Editorial'
    },
    {
      url: '/assets/profile/portrait-04-candid-monochrome.webp',
      caption: 'Sadman Zaman Khan — Candid studio portrait',
      tag: 'Studio'
    },
    {
      url: '/assets/profile/portrait-05-urban-rooftop.webp',
      caption: 'Sadman Zaman Khan — Outdoor rooftop portrait',
      tag: 'Outdoor'
    },
    {
      url: '/assets/profile/portrait-01-myself-casual.webp',
      caption: 'Sadman Zaman Khan — Personal portrait & profile archive',
      tag: 'Profile'
    }
  ];

  // Workplace & Leadership Culture Images
  const workplaceImages: ArtifactImage[] = [
    {
      url: '/assets/projects/collabai-mockup.webp',
      caption: 'CollabAI — Multi-agent interface redesign & live chat system',
      tag: 'UI/UX Redesign'
    },
    {
      url: '/assets/profile/sji-22nd-anniversary-sales-marketing.webp',
      caption: 'SJ Innovation 22nd Anniversary — Celebration with Sales & Marketing team',
      tag: '22nd Anniversary'
    },
    {
      url: '/assets/profile/sji-ai-hackathon-team-award.webp',
      caption: 'AI Hackathon Runners-Up — Certificate & project award with teammates',
      tag: 'AI Hackathon'
    },
    {
      url: '/assets/profile/sji-1-year-work-anniversary.webp',
      caption: '1-Year Work Anniversary — Recognition and milestone celebration at SJ Innovation',
      tag: 'Milestone'
    },
    {
      url: '/assets/profile/sji-dhaka-all-hands-blue.webp',
      caption: 'SJ Innovation Dhaka Team — All-hands team gathering at headquarters',
      tag: 'Team Culture'
    },
    {
      url: '/assets/profile/sji-annual-team-retreat-dera.webp',
      caption: 'Annual Team Retreat — Company outing and team building at DERA Resort & Spa',
      tag: 'Team Retreat'
    }
  ];

  // Rover Scout Images
  const scoutImages: ArtifactImage[] = [
    {
      url: '/assets/profile/mupi-rover-scout-pledge-leading.webp',
      caption: 'Rover Scout Leadership — Leading the scout oath & ceremony at Munshiganj Polytechnic Institute',
      tag: 'Troop Oath'
    },
    {
      url: '/assets/profile/rover-scout-golden-jubilee-moot-award.webp',
      caption: 'Golden Jubilee Rover Moot 2023 — Service Team Award crest with troop peers (Bangladesh Scouts)',
      tag: 'Service Team Award'
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="About & Career Resume — Sadman Zaman Khan"
        description="Experience, core competencies, and career background of Sadman Zaman Khan — UI/UX Designer specializing in design systems, web dashboards, and AI-assisted prototyping."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${CANONICAL_SITE_URL}/about#profilepage`,
          "name": "About & Career Resume — Sadman Zaman Khan",
          "url": `${CANONICAL_SITE_URL}/about`,
          "mainEntity": PERSON_JSON_LD
        }}
      />

      <main className="animate-slide-up w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[100px] md:pt-[120px] space-y-20">
        {/* =========================================================================
            SECTION 1: Profile Header, Bio & Executive Stats
        ========================================================================= */}
        <section className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Bio & Identity Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-[#141414] border border-[#262626] text-[11px] font-mono uppercase tracking-wider text-[#A0A0A0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Available for UI/UX &amp; Design System Engagements</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#FFFFFF]">
                  Sadman Zaman Khan
                </h1>
                <p className="text-xl sm:text-2xl text-[#888888] font-normal pt-0.5">
                  UI/UX Designer | AI-Augmented Prototyping | Brand Systems
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#777777] pt-1">
                  <span>Dhaka, Bangladesh</span>
                  <span className="opacity-40">·</span>
                  <a href="tel:+8801869504388" className="hover:text-[#FFFFFF] transition-colors">
                    +880 1869 504 388
                  </a>
                  <span className="opacity-40">·</span>
                  <a href="mailto:sadmanz.khan@gmail.com" className="hover:text-[#FFFFFF] transition-colors">
                    sadmanz.khan@gmail.com
                  </a>
                </div>
              </div>

              {/* Direct, executive summary from updated resume */}
              <p className="text-base sm:text-lg text-[#AAAAAA] font-normal leading-relaxed">
                UI/UX and Brand Designer with hands-on experience in design systems, web dashboards, and AI-assisted prototyping. Skilled in Figma and Adobe Creative Suite, utilizing AI tools (Google Antigravity, Lovable) to rapidly turn wireframes into functional, testable browser prototypes to validate user flows with stakeholders prior to engineering. Currently the sole designer at SJ Innovation, leading client and internal design initiatives spanning interface design, brand identity systems, and performance marketing creative.
              </p>

              {/* Action Buttons & Resume Downloads */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="/Sadman_Zaman_Khan_Resume.pdf"
                  download="Sadman_Zaman_Khan_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-xs uppercase tracking-wider bg-[#FFFFFF] text-[#000000] hover:bg-[#E5E5E5] transition-colors font-medium cursor-pointer"
                >
                  <span>Download Resume (PDF)</span>
                  <span className="text-sm">↓</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] text-xs uppercase tracking-wider bg-[#141414] hover:bg-[#1F1F1F] text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#262626] hover:border-[#404040] transition-colors font-normal cursor-pointer"
                >
                  <span>View Formatted Resume</span>
                  <span className="text-xs">↗</span>
                </button>
                <a
                  href="https://linkedin.com/in/sadmanzamankhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] text-xs uppercase tracking-wider bg-[#141414] hover:bg-[#1F1F1F] text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#262626] hover:border-[#404040] transition-colors font-normal cursor-pointer"
                >
                  <span>LinkedIn</span>
                  <span className="text-xs">↗</span>
                </a>
                <a
                  href="https://sadmanzamankhan.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] text-xs uppercase tracking-wider bg-[#141414] hover:bg-[#1F1F1F] text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#262626] hover:border-[#404040] transition-colors font-normal cursor-pointer"
                >
                  <span>Personal Archive</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>

              {/* Quick Proof Counters */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-0.5">
                  <div className="text-lg font-bold text-[#FFFFFF]">1.5+ Yrs</div>
                  <div className="text-[11px] text-[#777777]">Design Systems &amp; UX</div>
                </div>
                <div className="p-3 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-0.5">
                  <div className="text-lg font-bold text-[#FFFFFF]">Sole Designer</div>
                  <div className="text-[11px] text-[#777777]">SJ Innovation (Feb 2026)</div>
                </div>
                <div className="p-3 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-0.5">
                  <div className="text-lg font-bold text-[#FFFFFF]">761+ Pages</div>
                  <div className="text-[11px] text-[#777777]">Optimized SEO &amp; Schemas</div>
                </div>
                <div className="p-3 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-0.5">
                  <div className="text-lg font-bold text-[#FFFFFF]">100% On-Time</div>
                  <div className="text-[11px] text-[#777777]">High-Velocity Turnarounds</div>
                </div>
              </div>
            </div>

            {/* Right Column: Personal Portraits Collage */}
            <div className="lg:col-span-5 pt-1">
              <ArtifactCollage images={personalImages} title="Personal Portraits &amp; Archive" />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: Technical & Core Competencies (4 Scannable Pillars)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1F1F1F] pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
                Technical &amp; Core Competencies
              </h2>
              <p className="text-sm text-[#888888] pt-1">
                Structured across 4 specialized pillars from interface engineering to AI discoverability.
              </p>
            </div>
            <span className="text-xs font-mono text-[#555555]">
              04 ARCHITECTURAL PILLARS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPETENCY_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                    <span className="text-xs font-mono text-[#666666]">{pillar.number}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded-[2px] bg-[#141414] border border-[#222222]">
                      {pillar.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-normal text-[#FFFFFF]">{pillar.title}</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-[#999999] leading-relaxed">
                    {pillar.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#141414] flex flex-wrap gap-1.5">
                  {pillar.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono text-[#CCCCCC] bg-[#141414] border border-[#222222]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: Professional Experience (Impact-Driven Timeline)
        ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1F1F1F] pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
                Professional Experience
              </h2>
              <p className="text-sm text-[#888888] pt-1">
                Full-time and client design history focused on ownership, delivery velocity, and measurable impact.
              </p>
            </div>
            <span className="text-xs font-mono text-[#555555]">
              CHRONOLOGICAL CAREER RECORD
            </span>
          </div>

          <div className="space-y-12">
            {/* 1. Current Role: SJ Innovation UI/UX Designer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-6 hover:border-[#333333] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1F1F1F] pb-4">
                  <div className="space-y-0.5">
                    <h3 className="text-xl font-normal text-[#FFFFFF]">UI/UX Designer</h3>
                    <div className="text-sm text-[#888888] font-normal">
                      SJ Innovation LLC · Dhaka, Bangladesh
                    </div>
                  </div>
                  <span className="text-xs text-[#888888] px-3 py-1 rounded-[4px] bg-[#141414] border border-[#1F1F1F] shrink-0 self-start sm:self-auto font-mono">
                    September 2025 – Present
                  </span>
                </div>

                <div className="p-3 rounded-[4px] bg-[#121212] border border-[#262626] text-xs text-[#E5E5E5] leading-relaxed flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                  <span>
                    <strong>Leadership Milestone:</strong> Leading client and corporate design deliverables across the company since February 2026, reporting directly to executive leadership.
                  </span>
                </div>

                {/* 4 Impact Buckets from Updated Resume */}
                <div className="space-y-6 pt-1">
                  {/* Bucket 1: Interface Design */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
                      <span>Interface Design &amp; High-Stakes Client Delivery</span>
                    </h4>
                    <ul className="space-y-2 pl-3.5 text-xs sm:text-sm text-[#999999] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">Alyssa Kristin (Luxury Bridal SaaS):</strong> Designed a connected multi-platform ecosystem spanning a mobile Stylist App, Web Admin CMS, and CRM; praised by the client via internal feedback as "clean, thorough, and easily accessible."</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">StoryGrooveAI:</strong> Performed a 40+ point UX audit and end-to-end redesign of the landing page, pricing tiers, and onboarding flows to reduce friction; recognized by project leadership for taking full ownership under tight deadlines to secure client trust.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">CollabAI Suite:</strong> Led the interface redesign of a multi-agent AI platform, transforming a dense layout into a clean, intuitive dark command-center interface with scannable typography and live streaming canvas.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">ICR Debt Surveillance &amp; InfoFluence:</strong> Designed a 15-module Bloomberg-style credit surveillance dashboard in Figma with distinct visual alert tiers, and crafted McKinsey-style executive diagnostic decks for AWS partner reviews.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bucket 2: Brand Systems & Sales Enablement */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
                      <span>Brand Systems &amp; Sales Enablement</span>
                    </h4>
                    <ul className="space-y-2 pl-3.5 text-xs sm:text-sm text-[#999999] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">AI Control Tower Suite:</strong> Created complete brand identity systems, logos, OpenGraph social assets, and 10+ comprehensive sales enablement decks for enterprise products (ePhysician, Marketing AI, Client Success AI, MortgageAI, RealtorHelp, Restaurant AI, NonProfit AI).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">Queens AI Week:</strong> Designed the official logo and brand asset package for the Queens Chamber of Commerce × SJ Innovation × Firstlight Cloud Xchange initiative.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">22nd Corporate Anniversary:</strong> Led complete creative direction across 3 global offices (Dhaka, Sylhet, Goa), designing the anniversary identity, stage banners, recognition crests, merchandise packaging, and editing the post-event recap reel.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bucket 3: Client Scale & Rapid Production */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
                      <span>Client Scale &amp; Rapid Production</span>
                    </h4>
                    <ul className="space-y-2 pl-3.5 text-xs sm:text-sm text-[#999999] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">LuCreativ / 3i Advertising:</strong> Scaled account from an initial project to sustained, near-daily production across 7+ regional theme parks (Six Flags St. Louis, Valleyfair, Michigan's Adventure, Worlds of Fun, Schlitterbahn Galveston, Enchanted Parks).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">Rapid Reliability:</strong> Praised by external agency leadership for reliable same-day turnarounds, managing high-volume promotional pipelines, and proactively catching layout flaws before publication.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bucket 4: AI Prototyping, Web Discovery & Growth */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
                      <span>AI Prototyping, Web Discovery &amp; Growth</span>
                    </h4>
                    <ul className="space-y-2 pl-3.5 text-xs sm:text-sm text-[#999999] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">Web Architecture &amp; Discoverability:</strong> Structured and optimized 761+ pages across 3 major properties on the Lovable platform for on-page SEO and AI discoverability (JSON-LD schemas, semantic heading hierarchies, metadata, and Search Console indexing).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                        <span><strong className="text-[#CCCCCC]">Rapid Prototyping &amp; Paid Social:</strong> Used Google Antigravity and Lovable to convert design concepts into testable browser prototypes prior to engineering. Built Meta ad creative suites that scaled a stalled campaign to ~3.5 qualified leads/day on the same budget.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Contextual Visual Artifacts Collage */}
              <div className="lg:col-span-5 pt-1">
                <ArtifactCollage images={workplaceImages} title="SJ Innovation Artifacts &amp; Culture" />
              </div>
            </div>

            {/* Earlier Experience (Compact Dual Nodes) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors space-y-3">
                <div className="flex items-baseline justify-between gap-2 border-b border-[#1A1A1A] pb-3">
                  <div>
                    <h4 className="text-base font-normal text-[#FFFFFF]">Intern Graphic Designer</h4>
                    <p className="text-xs text-[#888888]">SJ Innovation LLC · Dhaka, Bangladesh</p>
                  </div>
                  <span className="text-xs font-mono text-[#666666]">May 2025 – Sep 2025</span>
                </div>
                <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed">
                  Designed 200+ digital and print assets for US client campaigns, including high-converting Meta feed/story ads, technical LinkedIn editorial carousels, and corporate event signage.
                </p>
              </div>

              <div className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors space-y-3">
                <div className="flex items-baseline justify-between gap-2 border-b border-[#1A1A1A] pb-3">
                  <div>
                    <h4 className="text-base font-normal text-[#FFFFFF]">Freelance Graphic &amp; Brand Designer</h4>
                    <p className="text-xs text-[#888888]">Independent Practice · US Businesses</p>
                  </div>
                  <span className="text-xs font-mono text-[#666666]">March 2025 – April 2025</span>
                </div>
                <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed">
                  Completed 4 client engagements for US businesses (edtech branding, store signage, gym promotional materials) during post-graduation period, delivering logos and brand assets with 100% on-time delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: Credentials, Verified Praise & Social Proof
        ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1F1F1F] pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
                Credentials &amp; Verified Feedback
              </h2>
              <p className="text-sm text-[#888888] pt-1">
                Formal technical education, certified industry qualifications, and client endorsements.
              </p>
            </div>
            <span className="text-xs font-mono text-[#555555]">
              VERIFIED RECORD &amp; ENDORSEMENTS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Education & Certifications */}
            <div className="lg:col-span-6 space-y-6">
              {/* Education Box */}
              <div className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                  Academic Foundation
                </span>
                <div className="border-b border-[#1A1A1A] pb-3">
                  <h3 className="text-base font-normal text-[#FFFFFF]">
                    Diploma in Engineering in Computer Science
                  </h3>
                  <p className="text-xs text-[#888888] pt-0.5">Munshiganj Polytechnic Institute</p>
                  <p className="text-xs text-[#666666] font-mono pt-1">2021 – 2025 · Graduated with Distinction</p>
                </div>
                <p className="text-xs text-[#999999] leading-relaxed">
                  Combined foundational computer science concepts (algorithms, frontend structures, databases) with autonomous design systems research and campus leadership.
                </p>
              </div>

              {/* Certifications Grid */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                  Verified Certifications (6)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CERTIFICATIONS.map((cert, cIdx) => (
                    <a
                      key={cIdx}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3.5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors block space-y-1"
                    >
                      <div className="text-xs font-normal text-[#FFFFFF] group-hover:text-[#FFFFFF] flex items-center justify-between">
                        <span className="truncate pr-1">{cert.title}</span>
                        <span className="text-[#666666] group-hover:text-[#FFFFFF] text-xs transition-colors shrink-0">↗</span>
                      </div>
                      <div className="text-[11px] text-[#777777] flex items-center justify-between pt-0.5">
                        <span>{cert.issuer}</span>
                        <span className="font-mono">{cert.date}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Featured Client & Leadership Praise */}
            <div className="lg:col-span-6 space-y-4">
              {/* Highlighted Quote from StoryGroove */}
              <div className="p-6 sm:p-7 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>StoryGroove Project Dedication</span>
                  </span>
                  <span className="text-xs font-mono text-[#555555]">www.storygroove.ai</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed italic border-l-2 border-[#333333] pl-4">
                  "In the StoryGroove project, your dedication to taking full ownership of the work was instrumental in delivering the end product to the client and ensuring her success. The effort you put in, including working late nights and weekends, was truly impressive and made a noticeable difference for the team. As a result, the client was very satisfied with the outcome, and we were able to strengthen our relationship and build trust and confidence with her."
                </blockquote>
                <div className="text-xs text-[#888888] font-mono pt-1">
                  — Project Leadership Feedback · Verified Client Delivery
                </div>
              </div>

              {/* Compact Key Endorsement Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
                  <div className="text-[#FFFFFF] font-medium">"Clean, thorough, and easily accessible"</div>
                  <div className="text-[11px] text-[#777777]">Client commendation during Alyssa Kristin Luxury Bridal SaaS review.</div>
                </div>
                <div className="p-4 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
                  <div className="text-[#FFFFFF] font-medium">"Pillars and Compass"</div>
                  <div className="text-[11px] text-[#777777]">Peer &amp; team description of collaborative guidance, KT, and shared design learnings.</div>
                </div>
                <div className="p-4 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
                  <div className="text-[#FFFFFF] font-medium">Performer of the Month</div>
                  <div className="text-[11px] text-[#777777]">Awarded November 2025 at SJ Innovation for outstanding creative output.</div>
                </div>
                <div className="p-4 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
                  <div className="text-[#FFFFFF] font-medium">Operational Resilience</div>
                  <div className="text-[11px] text-[#777777]">~15 hours logged over 3-week crunch protecting client deadlines with zero handholding.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Flowing Testimonials Marquee for Living Social Proof */}
          <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-16 xl:-mx-20 pt-4">
            <TestimonialsMarquee />
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: Beyond the Screen & Gateway to SZK Personal Archive
        ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1F1F1F] pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
                Beyond the Screen &amp; Personal Discipline
              </h2>
              <p className="text-sm text-[#888888] pt-1">
                Civic leadership in the Scouts Movement, artistic influences, and personal pursuits.
              </p>
            </div>
            <span className="text-xs font-mono text-[#555555]">
              HUMAN DIMENSION
            </span>
          </div>

          {/* Integrated Rover Scout & Personal Pursuits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Rover Scout Leadership Box with 2 Artifacts */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-4">
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                <div>
                  <h3 className="text-base font-normal text-[#FFFFFF]">
                    Rover Scout Leadership · Bangladesh Scouts
                  </h3>
                  <p className="text-xs text-[#888888] pt-0.5">
                    Munshiganj Polytechnic Institute Rover Scout Group (WOSM) · 2022 – 2025
                  </p>
                </div>
                <span className="text-xs font-mono text-[#666666]">CIVIC SERVICE</span>
              </div>
              <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed">
                Active member and leader within the Rover Scout section of Bangladesh Scouts (World Organization of the Scout Movement). Participated in troop ceremonies, oath-taking pledges, civic service activities, and national/regional moots while upholding the Scout Promise and Law.
              </p>
              <ul className="space-y-2 text-xs text-[#888888] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#555555] shrink-0 mt-0.5">▪</span>
                  <span>Served in the Service Team (সেবাদল) at the Golden Jubilee Rover Moot 2023, receiving the official Service Team Award crest with troop peers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#555555] shrink-0 mt-0.5">▪</span>
                  <span>Led official troop oath-taking ceremonies, parade formations, and campus civic clean-up operations as an active Rover.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#555555] shrink-0 mt-0.5">▪</span>
                  <span>Designed institutional branding, roll-up exhibition banners, and commemorative graphics for regional workshops.</span>
                </li>
              </ul>
              <div className="pt-2">
                <ArtifactCollage images={scoutImages} title="Rover Scout Leadership Artifacts" />
              </div>
            </div>

            {/* Personal Pursuits (Cinema, Music, Writing, Conditioning) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#FFFFFF] font-normal border-b border-[#1A1A1A] pb-2">
                  <span>🎬</span>
                  <span>Cinema &amp; Human Narrative</span>
                </div>
                <p className="text-xs text-[#999999] leading-relaxed">
                  Drawn to cinema observing human complexity, discipline, and moral weight — works by Andrei Tarkovsky, Akira Kurosawa, and Park Chan-wook.
                </p>
              </div>

              <div className="p-5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#FFFFFF] font-normal border-b border-[#1A1A1A] pb-2">
                  <span>🎧</span>
                  <span>Music &amp; Focus</span>
                </div>
                <p className="text-xs text-[#999999] leading-relaxed">
                  Atmospheric post-rock (Godspeed You! Black Emperor, Sigur Rós) to extreme metal (Paysage d'Hiver, Ulver) and conscious hip-hop (Kendrick Lamar, MF DOOM).
                </p>
              </div>

              <div className="p-5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#FFFFFF] font-normal border-b border-[#1A1A1A] pb-2">
                  <span>✍️</span>
                  <span>Writing &amp; Conceptual Worlds</span>
                </div>
                <p className="text-xs text-[#999999] leading-relaxed">
                  Writing poetry exploring cosmic scale, mortality, and quiet observation since 2017, building conceptual worlds from abstract thoughts.
                </p>
              </div>

              <div className="p-5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#FFFFFF] font-normal border-b border-[#1A1A1A] pb-2">
                  <span>🥊</span>
                  <span>Physical &amp; Spiritual Practice</span>
                </div>
                <p className="text-xs text-[#999999] leading-relaxed">
                  Bodyweight training, running conditioning, and theological study, cultivating daily focus, humility, and mental resilience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: Gateway to Personal Archive (SZK Portal)
        ========================================================================= */}
        <section ref={portalRef} className="relative pt-8 pb-16 overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-10 text-center">
            <div className="space-y-3">
              <span className="font-scanport text-[15pt] lowercase tracking-wider text-[#9E9484]">
                beyond the corporate showcase
              </span>
              <h2 className="font-fell text-4xl sm:text-5xl md:text-6xl font-normal lowercase tracking-tight text-[#F7F2EB]">
                gateway to personal archive
              </h2>
            </div>

            <div className="relative w-full flex items-center justify-center">
              <a
                href="https://sadmanzamankhan.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => recordPortalFound()}
                className="group block w-full cursor-pointer select-none no-underline"
              >
                <BorderGlow
                  borderRadius={28}
                  glowRadius={130}
                  glowIntensity={1.4}
                  coneSpread={28}
                  edgeSensitivity={20}
                  glowColor="38 75 55"
                  backgroundColor="#141311"
                  colors={['#D4A373', '#E9C46A', '#FAEDCD', '#C58F5E', '#8C6239']}
                  fillOpacity={0.3}
                  className="w-full aspect-[16/10] min-h-[360px] sm:min-h-[440px] shadow-2xl transition-transform duration-300 rounded-[28px]"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-6 relative z-10">
                    <div className="space-y-2">
                      <span className="text-xs font-mono tracking-widest text-[#D4A373] uppercase">
                        SZK Unfiltered
                      </span>
                      <h3 className="font-fell text-3xl sm:text-4xl text-[#F7F2EB] lowercase tracking-tight">
                        enter the personal chamber
                      </h3>
                    </div>
                    <p className="max-w-lg text-xs sm:text-sm text-[#C4BCB1] leading-relaxed font-sans font-light">
                      Visual poetry, philosophical essays, curated vinyl archives, and raw conceptual explorations kept outside commercial client portfolios.
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#F7F2EB] text-[#141311] group-hover:bg-[#FFFFFF] transition-colors font-medium">
                        <span>Open Archive</span>
                        <span>↗</span>
                      </span>
                    </div>
                  </div>
                </BorderGlow>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          MODAL: Formatted Resume (Updated 2026 Record)
      ========================================================================= */}
      {isResumeModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsResumeModalOpen(false);
            }}
          >
            <div className="relative w-full max-w-3xl my-8 rounded-[6px] border border-[#222222] bg-[#0A0A0A] p-6 sm:p-10 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto text-left selection:bg-[#FFFFFF] selection:text-[#000000]">
              {/* Modal Top Control Bar */}
              <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">
                    Official Curriculum Vitae
                  </span>
                  <a
                    href="/Sadman_Zaman_Khan_Resume.pdf"
                    download="Sadman_Zaman_Khan_Resume.pdf"
                    className="text-xs text-[#FFFFFF] bg-[#222222] hover:bg-[#333333] px-3 py-1 rounded-[3px] font-mono transition-colors"
                  >
                    Download PDF ↓
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(false)}
                  className="text-xs font-mono text-[#888888] hover:text-[#FFFFFF] transition-colors p-1 cursor-pointer"
                >
                  Close (esc) ✕
                </button>
              </div>

              {/* Formatted Resume Body */}
              <div className="space-y-8 font-sans text-sm">
                {/* Header */}
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-[#FFFFFF]">SADMAN ZAMAN KHAN</h2>
                  <p className="text-sm text-[#AAAAAA]">
                    UI/UX Designer | AI-Augmented Prototyping | Brand Systems
                  </p>
                  <p className="text-xs text-[#777777] pt-1">
                    Dhaka, Bangladesh · +880 1869 504 388 · sadmanz.khan@gmail.com · linkedin.com/in/sadmanzamankhan · sadmanportfolio.vercel.app
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-1.5 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Professional Summary
                  </h3>
                  <p className="text-xs text-[#AAAAAA] leading-relaxed">
                    UI/UX and Brand Designer with hands-on experience in design systems, web dashboards, and AI-assisted prototyping. Skilled in Figma and Adobe Creative Suite, utilizing AI tools (Google Antigravity, Lovable) to rapidly turn wireframes into functional, testable browser prototypes to validate user flows with stakeholders prior to engineering. Currently the sole designer at SJ Innovation, leading client and internal design initiatives spanning interface design, brand identity systems, and performance marketing creative.
                  </p>
                </div>

                {/* Core Competencies */}
                <div className="space-y-1.5 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Technical &amp; Core Competencies
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#AAAAAA]">
                    <div>
                      <strong className="text-[#FFFFFF]">UI/UX Design:</strong> Figma (Design Systems, Auto-layout, Component Libraries, Variables, Interactive Prototyping, Wireframing, User Flows), Responsive Web &amp; Mobile Layouts, Dashboard &amp; Command-Center Interface Design.
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">AI-Assisted Workflows:</strong> Google Antigravity (AI-directed web prototyping), Lovable, Claude Code CLI, ComfyUI (custom safetensors workflows), Ollama (local LLM research), Figma AI.
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">Brand Identity &amp; Visual:</strong> Adobe Illustrator, Adobe Photoshop, Brand Guidelines, Vector Identity Systems, Sales Enablement Decks, Editorial Carousels, Print &amp; Event Collateral.
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">Growth &amp; Web Discovery:</strong> Meta Ads Manager (ad creative design &amp; campaign setup), On-Page SEO (semantic heading hierarchies, metadata, JSON-LD structured data, Google Search Console), WordPress Administration.
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-5 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Professional Experience
                  </h3>

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                      <h4 className="font-semibold text-[#FFFFFF] text-sm">UI/UX Designer — SJ Innovation LLC</h4>
                      <span className="text-xs text-[#888888] font-mono">Sep 2025 – Present · Dhaka, Bangladesh</span>
                    </div>
                    <p className="text-xs text-[#AAAAAA] italic bg-[#141414] px-3 py-1.5 rounded-[3px] border border-[#222222]">
                      Leading client and corporate design deliverables across the company since February 2026, reporting directly to executive leadership.
                    </p>
                    <ul className="list-disc pl-4 space-y-2 text-xs text-[#AAAAAA] leading-relaxed">
                      <li><strong className="text-[#FFFFFF]">Interface Design &amp; High-Stakes Client Delivery:</strong> Designed connected multi-platform ecosystem for Alyssa Kristin (mobile Stylist App, Web Admin CMS, CRM); commended as "clean, thorough, and easily accessible." Conducted 40+ point UX audit and redesign for StoryGrooveAI; led interface redesign of CollabAI multi-agent platform; designed 15-module Bloomberg-style credit surveillance dashboard for ICR in Figma; crafted McKinsey-style diagnostic decks for InfoFluence AWS reviews.</li>
                      <li><strong className="text-[#FFFFFF]">Brand Systems &amp; Sales Enablement:</strong> Created complete brand identity systems, logos, OpenGraph social assets, and 10+ comprehensive sales enablement decks for enterprise products (ePhysician, Marketing AI, Client Success AI, MortgageAI, RealtorHelp, Restaurant AI, NonProfit AI). Designed official logo for Queens AI Week. Directed creative for SJ Innovation's 22nd Anniversary across 3 global offices.</li>
                      <li><strong className="text-[#FFFFFF]">Client Scale &amp; Rapid Production:</strong> Scaled LuCreativ / 3i Advertising account to sustained, near-daily production across 7+ regional theme parks (Six Flags, Valleyfair, Michigan's Adventure, Worlds of Fun, Schlitterbahn Galveston). Commended for reliable same-day turnarounds and proactive template QA.</li>
                      <li><strong className="text-[#FFFFFF]">AI Prototyping, Web Discovery &amp; Growth:</strong> Structured and optimized 761+ pages across 3 properties on Lovable for on-page SEO and AI discoverability (JSON-LD schemas, heading hierarchies, Search Console indexing). Used Google Antigravity and Lovable to convert design concepts into testable browser prototypes. Built Meta ad suites establishing ~3.5 qualified leads/day pipeline.</li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                      <h4 className="font-semibold text-[#FFFFFF] text-sm">Intern Graphic Designer — SJ Innovation LLC</h4>
                      <span className="text-xs text-[#888888] font-mono">May 2025 – Sep 2025 · Dhaka, Bangladesh</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-[#AAAAAA] leading-relaxed">
                      <li>Designed 200+ digital and print assets for US client campaigns, including high-converting Meta feed/story ads, technical LinkedIn editorial carousels, and corporate event signage.</li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                      <h4 className="font-semibold text-[#FFFFFF] text-sm">Freelance Graphic &amp; Brand Designer</h4>
                      <span className="text-xs text-[#888888] font-mono">Mar 2025 – Apr 2025 · US Businesses</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-[#AAAAAA] leading-relaxed">
                      <li>Completed 4 client engagements for US businesses (edtech branding, store signage, gym promotional materials), delivering logos and brand assets with 100% on-time delivery.</li>
                    </ul>
                  </div>
                </div>

                {/* Selected Projects */}
                <div className="space-y-3 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Selected Projects
                  </h3>
                  <div className="space-y-2 text-xs text-[#AAAAAA] leading-relaxed">
                    <p>
                      <strong className="text-[#FFFFFF]">ePhysician Landing Page Redesign:</strong> Comprehensive redesign for US healthcare AI platform. Overhauled messaging, visual contrast, interactive ROI calculator, and HIPAA/PCI compliance trust seals.
                    </p>
                    <p>
                      <strong className="text-[#FFFFFF]">Clandest Agency (Co-Founder &amp; Lead Designer):</strong> Designed visual identity, typography system, and web layout for creative studio, directing AI tools to ship with clean on-page SEO.
                    </p>
                    <p>
                      <strong className="text-[#FFFFFF]">Personal Portfolio Architecture:</strong> Interactive 19-project portfolio with dark aesthetic and case studies, built and deployed as static crawlable pages on Vercel.
                    </p>
                    <p>
                      <strong className="text-[#FFFFFF]">NEXURA — Brand Identity System (Capstone Project · Score: 4.0):</strong> Led end-to-end brand identity in Illustrator &amp; Photoshop: custom logo system, 40-page brand guideline book, and 20+ mockups.
                    </p>
                  </div>
                </div>

                {/* Contributions & Achievements */}
                <div className="space-y-3 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Professional Contributions &amp; Achievements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#AAAAAA]">
                    <div>
                      <strong className="text-[#FFFFFF]">Client Ownership:</strong> Took full ownership of StoryGroove during critical launch phase, praised by client as "clean, thorough, and easily accessible."
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">Brand Consistency:</strong> Led visual brand consistency across Control Tower product suite, internal culture, and authored company brand guidelines.
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">Operational Resilience:</strong> Stepped in during short-notice periods (Restock Resource, weekend coverage) with ~15 documented after-hours/weekend hours logged over 3-week crunch.
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">Mentorship:</strong> Formally assigned mentor to new design intern, providing hands-on KT, structured feedback, and building an onboarding project resource approved by management.
                    </div>
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="space-y-2 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Education &amp; Certifications
                  </h3>
                  <div className="text-xs text-[#AAAAAA] space-y-1.5">
                    <p><strong className="text-[#FFFFFF]">Diploma in Engineering in Computer Science</strong> — Munshiganj Polytechnic Institute (2021 – 2025)</p>
                    <p><strong className="text-[#FFFFFF]">Certifications:</strong> Claude Code in Action (Anthropic, 2026) · Design System in Figma (Grameenphone Academy, 2025) · Digital Skills: User Experience (Accenture, 2025) · HubSpot Inbound Marketing (2026) · B1 English for Developers, 95.2% (freeCodeCamp, 2026) · Graphic Design Level-3 (NSDA, 2024).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <Footer />
    </div>
  );
};

export default About;
