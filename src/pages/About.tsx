import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { useExploration } from '@/context/ExplorationContext';
import { ArtifactCollage, ArtifactImage } from '@/components/ArtifactCollage';
import { TestimonialsMarquee } from '@/components/home/TestimonialsMarquee';
import { PERSON_JSON_LD, CANONICAL_SITE_URL } from '@/data/siteSettings';

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  url: string;
}

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

              {/* Direct, executive summary */}
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

              {/* 3 High-Legibility Metrics */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-[4px] bg-[#0A0A0A] border border-[#222222] space-y-1">
                  <div className="text-xl font-bold font-mono text-[#FFFFFF]">1.5+ Yrs</div>
                  <div className="text-xs text-[#CCCCCC] font-normal leading-snug">Design Systems &amp; UX</div>
                </div>
                <div className="p-4 rounded-[4px] bg-[#0A0A0A] border border-[#222222] space-y-1">
                  <div className="text-xl font-bold font-mono text-[#FFFFFF]">Sole Designer</div>
                  <div className="text-xs text-[#CCCCCC] font-normal leading-snug">SJ Innovation (Feb 2026)</div>
                </div>
                <div className="p-4 rounded-[4px] bg-[#0A0A0A] border border-[#222222] space-y-1">
                  <div className="text-xl font-bold font-mono text-[#FFFFFF]">100% On-Time</div>
                  <div className="text-xs text-[#CCCCCC] font-normal leading-snug">Client &amp; Partner Delivery</div>
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
            SECTION 2: Technical & Core Competencies (With Vector Logos & Hover Color)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-[#1F1F1F] pb-4">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Technical &amp; Core Competencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: UI/UX & Design Systems */}
            <div className="group p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-normal text-[#FFFFFF]">UI/UX &amp; Design Systems</h3>
                <ul className="space-y-2 text-xs text-[#999999] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Component Libraries &amp; Auto-layout Variants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Design Tokens &amp; Multi-variable Systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Interactive Prototyping &amp; User Flows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Responsive Web &amp; Mobile Layouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Dashboard &amp; Command-Center Interfaces</span>
                  </li>
                </ul>
              </div>

              {/* Vector Logos: Monochrome by default, authentic brand colors on card hover */}
              <div className="pt-4 border-t border-[#141414] flex items-center gap-3.5">
                {/* Figma Logo */}
                <div title="Figma" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 38 57" fill="none">
                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                  </svg>
                </div>
                {/* Tokens Studio / Variable Token */}
                <div title="Design Tokens / Variables" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="8" height="8" rx="2" fill="#A855F7"/>
                    <rect x="13" y="3" width="8" height="8" rx="2" fill="#9333EA"/>
                    <rect x="3" y="13" width="8" height="8" rx="2" fill="#7E22CE"/>
                    <rect x="13" y="13" width="8" height="8" rx="2" fill="#C084FC"/>
                  </svg>
                </div>
                {/* FigJam */}
                <div title="FigJam" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#FF7262" strokeWidth="2.5"/>
                    <path d="M9 12H15M12 9V15" stroke="#FF7262" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: AI-Augmented Workflows */}
            <div className="group p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-normal text-[#FFFFFF]">AI-Augmented Workflows</h3>
                <ul className="space-y-2 text-xs text-[#999999] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>AI-Directed Responsive Web Prototyping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Rapid User Flow Validation Before Engineering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Local Safetensors &amp; ComfyUI Generation Pipelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Local Open-Source LLMs for Competitive Research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Live Server-Sent Event (SSE) Stream Testing</span>
                  </li>
                </ul>
              </div>

              {/* Vector Logos: Antigravity, Lovable, Claude, ComfyUI, Ollama */}
              <div className="pt-4 border-t border-[#141414] flex items-center gap-3">
                {/* Antigravity / Gemini Spark */}
                <div title="Google Antigravity & AI" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4285F4"/>
                        <stop offset="50%" stopColor="#9B72CB"/>
                        <stop offset="100%" stopColor="#D96570"/>
                      </linearGradient>
                    </defs>
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="url(#ai-grad)"/>
                  </svg>
                </div>
                {/* Lovable */}
                <div title="Lovable" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF385C"/>
                  </svg>
                </div>
                {/* Claude / Anthropic */}
                <div title="Claude Code (Anthropic)" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" stroke="#D97757" strokeWidth="2.75" strokeLinecap="round"/>
                  </svg>
                </div>
                {/* ComfyUI */}
                <div title="ComfyUI" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <circle cx="6" cy="6" r="3" fill="#10B981"/>
                    <circle cx="18" cy="8" r="3" fill="#10B981"/>
                    <circle cx="14" cy="18" r="3" fill="#10B981"/>
                    <path d="M6 9v3a3 3 0 003 3h2m4-7l-3 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                {/* Ollama */}
                <div title="Ollama" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <path d="M8 4h8a4 4 0 014 4v7a5 5 0 01-5 5H9a5 5 0 01-5-5V8a4 4 0 014-4z" stroke="#38BDF8" strokeWidth="2"/>
                    <circle cx="9" cy="11" r="1.5" fill="#38BDF8"/>
                    <circle cx="15" cy="11" r="1.5" fill="#38BDF8"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Brand Systems & Visuals */}
            <div className="group p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-normal text-[#FFFFFF]">Brand Systems &amp; Visuals</h3>
                <ul className="space-y-2 text-xs text-[#999999] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Vector Identity Systems &amp; Logo Suites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Enterprise Brand Guidelines &amp; Governance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Executive Sales Enablement &amp; Diagnostic Decks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Editorial Carousels &amp; Social Packaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Large-Format Print Collateral &amp; Event Signage</span>
                  </li>
                </ul>
              </div>

              {/* Vector Logos: Adobe Illustrator, Photoshop, InDesign */}
              <div className="pt-4 border-t border-[#141414] flex items-center gap-3">
                {/* Illustrator */}
                <div title="Adobe Illustrator" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <div className="w-7 h-7 rounded-[4px] bg-[#261300] border border-[#FF9A00] flex items-center justify-center font-bold text-xs text-[#FF9A00] font-sans">
                    Ai
                  </div>
                </div>
                {/* Photoshop */}
                <div title="Adobe Photoshop" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <div className="w-7 h-7 rounded-[4px] bg-[#001D26] border border-[#31A8FF] flex items-center justify-center font-bold text-xs text-[#31A8FF] font-sans">
                    Ps
                  </div>
                </div>
                {/* InDesign */}
                <div title="Adobe InDesign" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <div className="w-7 h-7 rounded-[4px] bg-[#260014] border border-[#FF3366] flex items-center justify-center font-bold text-xs text-[#FF3366] font-sans">
                    Id
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Growth & Web Discovery */}
            <div className="group p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-normal text-[#FFFFFF]">Growth &amp; Web Discovery</h3>
                <ul className="space-y-2 text-xs text-[#999999] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Direct-Response Ad Creative Design &amp; Testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Targeted Campaign Setup &amp; Meta Ads Manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>Semantic Heading Hierarchies &amp; Metadata</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>JSON-LD Schemas &amp; Search Console Indexing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                    <span>WordPress &amp; Web Content Administration</span>
                  </li>
                </ul>
              </div>

              {/* Vector Logos: Meta, Google Search Console, WordPress */}
              <div className="pt-4 border-t border-[#141414] flex items-center gap-3.5">
                {/* Meta Ads */}
                <div title="Meta Ads Manager" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <linearGradient id="meta-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0064E0"/>
                        <stop offset="50%" stopColor="#0081FB"/>
                        <stop offset="100%" stopColor="#0064E0"/>
                      </linearGradient>
                    </defs>
                    <path d="M16.7 4C14.7 4 13.2 5 12 6.5 10.8 5 9.3 4 7.3 4 3.7 4 1 7.2 1 11.2c0 4.6 3.7 8.8 8.1 8.8 2.2 0 3.7-1 4.9-2.5 1.2 1.5 2.7 2.5 4.9 2.5 4.4 0 8.1-4.2 8.1-8.8C27 7.2 24.3 4 20.7 4h-4zm-8.8 13.8c-3.1 0-5.7-3.2-5.7-6.6 0-2.8 1.9-5.1 4.7-5.1 1.7 0 3 1 3.9 2.5l1.2 2c-.9 3.8-2.3 7.2-4.1 7.2zm11.9 0c-1.8 0-3.2-3.4-4.1-7.2l1.2-2c.9-1.5 2.2-2.5 3.9-2.5 2.8 0 4.7 2.3 4.7 5.1 0 3.4-2.6 6.6-5.7 6.6z" fill="url(#meta-grad)"/>
                  </svg>
                </div>
                {/* Google Search Console */}
                <div title="Google Search Console & SEO" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>
                {/* WordPress */}
                <div title="WordPress" className="transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#21759B" strokeWidth="2"/>
                    <path d="M4.5 12a7.5 7.5 0 0011.6 6.3L9.3 6.9A7.5 7.5 0 004.5 12zM12 4.5c1.4 0 2.7.4 3.8 1.1L12.5 16l-3.1-9.2c.8-.2 1.7-.3 2.6-.3zm4.6 2.6a7.4 7.4 0 012.9 4.9c0 1.9-.7 3.6-1.9 5l-2.6-7.8 1.6-2.1z" fill="#21759B"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: Professional Experience (Impact-Driven Timeline)
        ========================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-[#1F1F1F] pb-4">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-12">
            {/* Current Role: SJ Innovation UI/UX Designer */}
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
            SECTION 4: Credentials & Verified Feedback
        ========================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-[#1F1F1F] pb-4">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Credentials &amp; Verified Feedback
            </h2>
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
        </section>

        {/* =========================================================================
            SECTION 5: What People Say (Full-Width Rolling Marquee, Left-Aligned Header)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-[#1F1F1F] pb-4">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              What People Say
            </h2>
          </div>

          <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-16 xl:-mx-20">
            <TestimonialsMarquee hideHeader />
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: Beyond the Screen & Personal Discipline
        ========================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-[#1F1F1F] pb-4">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Beyond the Screen &amp; Personal Discipline
            </h2>
          </div>

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

            {/* Personal Pursuits */}
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
            SECTION 7: Gateway to Personal Archive (Clean, Dark, Minimalist)
        ========================================================================= */}
        <section ref={portalRef} className="space-y-6 pt-4 pb-16">
          <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Gateway to Personal Archive
            </h2>
            <a
              href="https://sadmanzamankhan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#888888] hover:text-[#FFFFFF] transition-colors"
            >
              sadmanzamankhan.vercel.app ↗
            </a>
          </div>

          <div className="relative w-full">
            <a
              href="https://sadmanzamankhan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordPortalFound()}
              className="group block w-full rounded-[6px] border border-[#222222] bg-[#080808] hover:border-[#444444] transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[460px] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src="/assets/projects/szk-mockup.webp"
                  alt="Sadman Zaman Khan Personal Archive Live Mockup"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Clean centered action badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-12 p-6 text-center space-y-3">
                  <p className="text-xs sm:text-sm text-[#CCCCCC] font-normal max-w-md drop-shadow">
                    Essays, poetry notebook, and personal writing.
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#FFFFFF] text-[#000000] group-hover:bg-[#E5E5E5] transition-all duration-300 font-medium shadow-2xl">
                    <span>Enter Personal Archive</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </a>
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
