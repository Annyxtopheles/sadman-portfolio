import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { useExploration } from '@/context/ExplorationContext';
import { BorderGlow } from '@/components/effects/BorderGlow';
import { ArtifactCollage, ArtifactImage } from '@/components/ArtifactCollage';

interface ThematicBucket {
  category: string;
  points: string[];
}

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlight?: string;
  thematicBuckets?: ThematicBucket[];
  bullets?: string[];
  images?: ArtifactImage[];
}

interface CapabilityItem {
  name: string;
  category: 'uiux' | 'frontend' | 'ai' | 'brand';
  categoryLabel: string;
  description: string;
  proofProjects: { name: string; slug: string }[];
}

const CAPABILITIES: CapabilityItem[] = [
  // UI/UX Design
  {
    name: 'Figma & Design Systems',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    description: 'Building tokenized variable libraries, responsive auto-layout components, and interactive prototypes for desktop and mobile.',
    proofProjects: [
      { name: 'ePhysician Redesign', slug: 'ephysician-redesign' },
      { name: 'CollabAI Suite', slug: 'collabai-suite' },
      { name: 'ICR Surveillance', slug: 'icr-debt-surveillance' }
    ]
  },
  {
    name: 'High-Density Dashboards',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    description: 'Organizing complex financial, clinical, and operational data into clear, scannable modules with intuitive alert states.',
    proofProjects: [
      { name: 'ICR Surveillance', slug: 'icr-debt-surveillance' },
      { name: 'Alyssa Kristin SaaS', slug: 'alyssa-kristin-saas' }
    ]
  },
  {
    name: 'User Flows & Wireframing',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    description: 'Mapping conversion funnels and user journeys to resolve usability bottlenecks before committing to high-fidelity layouts.',
    proofProjects: [
      { name: 'ePhysician Redesign', slug: 'ephysician-redesign' },
      { name: 'Clandest Agency', slug: 'clandest-agency' }
    ]
  },
  // Frontend & Prototyping
  {
    name: 'Semantic HTML5 & Fluid CSS',
    category: 'frontend',
    categoryLabel: 'Frontend & Prototyping',
    description: 'Authoring clean semantic markup, fluid clamp typography scales, and accessible component styles with zero layout shift.',
    proofProjects: [
      { name: 'Clandest Agency', slug: 'clandest-agency' },
      { name: 'Archivest', slug: 'archivest' }
    ]
  },
  {
    name: 'React, TypeScript & Tailwind',
    category: 'frontend',
    categoryLabel: 'Frontend & Prototyping',
    description: 'Developing responsive web applications with static prerendering, client-side routing, and clean modular component state.',
    proofProjects: [
      { name: 'Personal Portfolio', slug: 'szk-personal-archive' },
      { name: 'CollabAI Suite', slug: 'collabai-suite' }
    ]
  },
  {
    name: 'WebGL & Interactive Physics',
    category: 'frontend',
    categoryLabel: 'Frontend & Prototyping',
    description: 'Integrating Three.js canvas elements, custom shader textures, and Rapier 3D rigid-body simulations for memorable interactive moments.',
    proofProjects: [
      { name: '3D Lanyard Badge', slug: 'szk-personal-archive' }
    ]
  },
  // AI Workflows
  {
    name: 'AI-Assisted Prototyping',
    category: 'ai',
    categoryLabel: 'AI Workflows',
    description: 'Combining Claude Code, Lovable, and Figma AI plugins to move from rough concept to testable browser prototype in hours.',
    proofProjects: [
      { name: 'ePhysician Redesign', slug: 'ephysician-redesign' },
      { name: 'CollabAI Suite', slug: 'collabai-suite' }
    ]
  },
  {
    name: 'Local Models & Ollama',
    category: 'ai',
    categoryLabel: 'AI Workflows',
    description: 'Running local open-source LLMs to prototype private UX analysis, structured outputs, and multimodal asset pipelines.',
    proofProjects: [
      { name: 'CollabAI Suite', slug: 'collabai-suite' }
    ]
  },
  {
    name: 'Agentic Interface Design',
    category: 'ai',
    categoryLabel: 'AI Workflows',
    description: 'Designing conversational turn states, model-selection toggles, and live streaming feedback for multi-agent workflows.',
    proofProjects: [
      { name: 'CollabAI Suite', slug: 'collabai-suite' },
      { name: 'Control Tower Suite', slug: 'control-tower-suite' }
    ]
  },
  // Brand & Production
  {
    name: 'Brand Systems & Vector Identity',
    category: 'brand',
    categoryLabel: 'Brand & Production',
    description: 'Designing full vector mark suites, typographic scales, color systems, and comprehensive brand guideline manuals.',
    proofProjects: [
      { name: 'NEXURA Identity', slug: 'nexura-brand-system' },
      { name: 'Clandest Agency', slug: 'clandest-agency' },
      { name: 'Queens AI Week', slug: 'control-tower-suite' }
    ]
  },
  {
    name: 'Direct-Response Ad Creative',
    category: 'brand',
    categoryLabel: 'Brand & Production',
    description: 'Creating high-converting static, vertical story, and carousel ads configured directly in Meta Ads Manager for lead generation.',
    proofProjects: [
      { name: 'ePhysician Paid Social', slug: 'ephysician-redesign' },
      { name: 'NonProfit AI Campaign', slug: 'control-tower-suite' }
    ]
  },
  {
    name: 'Print, Pre-Press & OOH Signage',
    category: 'brand',
    categoryLabel: 'Brand & Production',
    description: 'Preparing large-format corporate event backdrops, multi-venue theme park promotional collateral, and publication print layouts.',
    proofProjects: [
      { name: 'LuCreativ Theme Parks', slug: 'creative-initiatives' },
      { name: 'Campus Rebranding', slug: 'campus-rebranding' }
    ]
  }
];

const About: React.FC = () => {
  const { recordPortalFound } = useExploration();
  const portalRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'uiux' | 'frontend' | 'ai' | 'brand'>('all');
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

  // Lock body scroll when resume modal is open
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

  // Professional Experience with Thematic Impact Buckets
  const experiences: Experience[] = [
    {
      role: 'UI/UX Designer',
      company: 'SJ Innovation LLC',
      location: 'Dhaka, Bangladesh',
      period: 'September 2025 – Present',
      highlight: 'Sole designer at SJ Innovation since February 2026, independently leading client and internal design initiatives across the company.',
      thematicBuckets: [
        {
          category: 'Sole Ownership & Brand Standards',
          points: [
            'Sole designer owning client and company-wide design work since February 2026, reporting directly to executive leadership.',
            'Authored company-wide visual brand guidelines and design standards spanning product interfaces, presentation decks, and marketing collateral.',
            'Designed brand identity and promotional materials for major milestones including SJ Innovation\'s 22nd Anniversary celebration and the Queens AI Week partnership (Queens Chamber of Commerce × SJ Innovation × Firstlight Cloud Xchange).'
          ]
        },
        {
          category: 'AI-Native Products & Healthcare UX',
          points: [
            'Designed complete visual identities, design systems, and product UI/UX for 10+ AI-native Control Tower products (ePhysician, MortgageAI, NonProfit AI, Marketing AI, RealtorHelp).',
            'Led end-to-end UI/UX redesign of CollabAI\'s multi-agent platform, replacing a cluttered layout with a focused dark interface, clean typography, and real-time model integrations (Groq, Gemini, OpenRouter).',
            'Designed InfoFluence diagnostic reports with structured data hierarchy for high-stakes AWS partner presentations.'
          ]
        },
        {
          category: 'Client Scale & High-Density Systems',
          points: [
            'Scaled the LuCreativ theme-park account from an initial engagement to sustained near-daily production across 7+ properties (Six Flags St. Louis, Valleyfair, Michigan\'s Adventure, Worlds of Fun, Schlitterbahn Galveston), consistently recognized for fast turnaround and reliability.',
            'Designed ICR Debt Surveillance — a Bloomberg Terminal–style 15-module dashboard for credit investors, featuring live data layouts, alert states, and investor charts.',
            'Designed unified multi-surface experience for Alyssa Kristin luxury bridal SaaS: connecting mobile Stylist App, Admin CMS, and CRM into one coherent system.'
          ]
        },
        {
          category: 'Prototyping, Paid Growth & SEO',
          points: [
            'Built functional front-end prototypes using low-code platforms (Lovable) and hand-coded HTML/CSS/React to test layouts with stakeholders and validate usability prior to development.',
            'Rebuilt underperforming Meta ad creatives for ePhysician from sales lead data, turning a 0-lead, 4-day campaign into an active ~2–3.5 leads/day pipeline on the same budget.',
            'Conducted technical on-page SEO audits across product landing pages, resolving heading hierarchies, duplicate canonical tags, and mobile Core Web Vitals.'
          ]
        }
      ],
      images: [
        {
          url: '/assets/projects/collabai-mockup.webp',
          caption: 'CollabAI — Multi-agent interface redesign & live chat system',
          tag: 'UI/UX Redesign'
        },
        {
          url: '/assets/projects/buildyourai/byai-yt-automate-business-ops-control-tower.webp',
          caption: 'Control Tower — Visual identity & enterprise ops suite',
          tag: 'Brand & UI'
        },
        {
          url: '/assets/projects/buildyourai/byai-meta-ad-fundraising-1x1-feed.webp',
          caption: 'NonProfit AI — High-converting Meta ad creative suite',
          tag: 'Paid Social'
        }
      ]
    },
    {
      role: 'Intern Graphic Designer',
      company: 'SJ Innovation LLC',
      location: 'Dhaka, Bangladesh',
      period: 'May 2025 – September 2025',
      bullets: [
        'Designed and delivered 200+ digital and print assets for US-based global campaigns, including targeted Meta ads, LinkedIn editorial carousels, large-format event banners, and internal brand installations.'
      ],
      images: [
        {
          url: '/assets/projects/buildyourai/byai-nsa-cisa-01-cover.webp',
          caption: 'NSA/CISA Data Security — 10-step editorial carousel cover',
          tag: 'Editorial Design'
        },
        {
          url: '/assets/projects/buildyourai/byai-meta-ad-fundraising-9x16-story.webp',
          caption: 'Vertical story ad creative with direct booking CTA',
          tag: '9:16 Social'
        }
      ]
    },
    {
      role: 'Freelance Graphic & Brand Designer',
      company: 'Freelancer',
      location: 'Global Clients',
      period: 'March 2025 – April 2025',
      bullets: [
        'Completed 4 client engagements for US-based businesses (edtech branding, physical store signage, gym marketing collateral) during post-graduation period, delivering logo designs and brand systems with 100% on-time delivery.'
      ],
      images: [
        {
          url: '/assets/projects/clandest-mockup.webp',
          caption: 'Clandest Agency — Brand identity & studio web presence',
          tag: 'Brand Identity'
        },
        {
          url: '/assets/projects/clandest-services.webp',
          caption: 'Services layout & typographic architecture',
          tag: 'Web Systems'
        }
      ]
    }
  ];

  // Independent Technical Projects
  const technicalProjects = [
    {
      title: 'Clandest Agency',
      role: 'Co-Founder, UI/UX & Brand Design',
      link: 'https://clandestagency.vercel.app',
      slug: 'clandest-agency',
      description: 'Co-founded a 4-person creative studio. Built and shipped the production website with semantic HTML5, fluid clamp CSS typography, and structured data with an AI crawler manifest (llms.txt) for clean search indexing.'
    },
    {
      title: 'Commercial Portfolio Architecture',
      role: 'Sole Architect & Designer',
      link: 'https://sadmanportfolio.vercel.app',
      slug: 'szk-personal-archive',
      description: 'Engineered this multi-case-study portfolio with automated static prerendering across 41+ routes for zero-JavaScript crawlability, custom WebP image pipelines, and subtle interactive micro-interactions.'
    },
    {
      title: 'AncestryForge',
      role: 'Full-Stack Architecture & Design',
      description: 'Designed and built a family-tree platform from scratch: a directed acyclic graph (DAG) engine handling pedigree collapse, multiple marriages, and historical dates with GEDCOM 5.5.1 import/export.'
    },
    {
      title: 'Design Token System',
      role: 'Systems Architecture',
      description: 'Authored a lightweight design-token compiler generating tokens across color, typography, spacing, and elevation, coupled with an automated validation suite for WCAG contrast and scale consistency.'
    }
  ];

  // Key Projects & Endeavors
  const keyProjects = [
    {
      title: 'Campus Rebranding & Digital Infrastructure',
      organization: 'Munshiganj Polytechnic Institute',
      period: '2022 – 2025',
      description: 'Spearheaded an end-to-end visual branding overhaul for campus ceremonies, providing professional print suites (signage, custom recognition materials) and establishing standardized digital guidelines across social media.',
      points: [
        'Developed and deployed a fully functional custom website to digitize unit resources, while managing multi-channel social growth and high-impact marketing collateral over three years.',
        'Designed foundational brand identity for the new campus Computer Club, including custom logos, typography, and automated social media layout frameworks.'
      ]
    },
    {
      title: 'NEXURA — Brand Identity System (Final Capstone Project)',
      organization: 'Munshiganj Polytechnic Institute · Score: 4.0 in 8th Semester',
      period: 'Capstone Project',
      description: 'Led end-to-end brand identity development: designed custom logo system with multiple mark variations, developed a comprehensive 40-page brand guideline document, and created application mockups across 20+ touchpoints.',
      points: [
        'Established typographic hierarchy, color psychology framework, and usage standards to ensure visual consistency across all media applications.',
        'Delivered formal presentation to faculty evaluators, articulating strategic rationale for all design decisions; scored a perfect 4.0 evaluation.'
      ]
    }
  ];

  // Professional Achievements
  const professionalAchievements = [
    {
      title: 'Client Impact & Ownership',
      detail: 'Took full ownership of the StoryGroove project during its launch phase, working late nights and weekends to deliver on tight deadlines. Client feedback praised the designs as "clean, thorough, and easily accessible," strengthening repeat engagement.'
    },
    {
      title: 'Brand Consistency Leadership',
      detail: 'Have led SJ Innovation\'s visual brand consistency since probation—spanning the Control Tower product suite, internal culture materials, and company-wide presentations—including authoring the current brand guidelines from concept to implementation.'
    },
    {
      title: 'Operational Resilience',
      detail: 'Repeatedly stepped in during critical, short-notice periods (Restock Resource, weekend coverage during a teammate\'s family emergency) to maintain project continuity and client delivery timelines under pressure.'
    },
    {
      title: 'Collaboration & Mentorship',
      detail: 'Team members described collaborative approach as "pillars and compass," citing significant learning improvements and clarity from working together on complex tasks.'
    },
    {
      title: 'UX Problem Solving',
      detail: 'Resolved button-placement and layout friction on the Calysta Pro CRM campaign workflow that was creating user hesitation—team members specifically credited the improved clarity.'
    },
    {
      title: 'Culture & Event Design',
      detail: 'Led design and execution for SJ Innovation\'s 22nd Anniversary celebration—crest/trophy designs, zoom backgrounds, gift boxes, event props, and media capture—recognized by HR leadership for dedication.'
    }
  ];

  const certifications = [
    {
      title: 'Design System in Figma',
      issuer: 'Grameenphone Academy',
      date: 'October 2025',
      url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
    },
    {
      title: 'Claude Code in Action',
      issuer: 'Anthropic',
      date: 'February 2026',
      url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
    },
    {
      title: 'Digital Skills: User Experience',
      issuer: 'Accenture',
      date: 'September 2025',
      url: 'https://www.linkedin.com/in/sadmanzamankhan/details/certifications/'
    },
    {
      title: 'Graphic Design for Freelancing Level-3',
      issuer: 'NSDA',
      date: 'October 2024',
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
  ];

  const personalPursuits = [
    {
      title: 'Film & Human Narrative',
      icon: '🎬',
      description: 'Drawn to cinema that observes human complexity, discipline, and moral weight—works by Tarkovsky, Kurosawa, and Park Chan-wook. Watching how stories are paced and composed deepens my understanding of how people perceive and evaluate the world.'
    },
    {
      title: 'Music & Focus',
      icon: '🎧',
      description: 'Listening spans atmospheric post-rock (Godspeed You! Black Emperor, Sigur Rós) to extreme metal (Paysage d\'Hiver, Ulver) and conscious hip-hop (Kendrick Lamar, MF DOOM). Music provides the rhythmic backdrop for deep, uninterrupted creative focus.'
    },
    {
      title: 'Writing & Conceptual Worlds',
      icon: '✍️',
      description: 'Writing poetry under pseudonyms since 2017, exploring themes of cosmic scale, mortality, and quiet observation. Building conceptual worlds from abstract ideas helps keep my thinking sharp and original.'
    },
    {
      title: 'Physical & Spiritual Practice',
      icon: '🥊',
      description: 'Practicing discipline through regular bodyweight workouts, staircase climbing, and boxing conditioning. Also deepening my study of theology and perfecting Quranic recitation for daily prayer.'
    }
  ];

  const filteredCapabilities = selectedCategory === 'all'
    ? CAPABILITIES
    : CAPABILITIES.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="About & Resume — Sadman Zaman Khan"
        description="Experience timeline, capabilities, achievements, and background of Sadman Zaman Khan — UI/UX Designer specializing in design systems, high-density dashboards, and AI-assisted prototyping."
      />

      <main className="animate-slide-up w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[100px] md:pt-[120px] space-y-16">
        {/* 1. Profile Header & Bio with Personal Portraits Collage */}
        <section className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Bio & Identity Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#FFFFFF]">
                  Sadman Zaman Khan
                </h1>
                <p className="text-xl sm:text-2xl text-[#888888] font-normal pt-1">
                  UI/UX Designer | Design Systems | AI-Assisted Prototyping
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

              {/* Honest, modest bio */}
              <p className="text-base sm:text-lg text-[#999999] font-normal leading-relaxed">
                UI/UX Designer with hands-on experience across design systems, complex enterprise dashboards, and AI-assisted prototyping. I design practical interfaces—from healthcare automation tools to financial surveillance platforms—and build front-end prototypes to test ideas with teams quickly. Currently the sole designer at SJ Innovation, independently handling client and internal design initiatives.
              </p>

              {/* Dual Resume CTAs & Quick Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
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
                  href="https://sadmanzamankhan.vercel.app/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] text-xs uppercase tracking-wider bg-[#141414] hover:bg-[#1F1F1F] text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#262626] hover:border-[#404040] transition-colors font-normal cursor-pointer"
                >
                  <span>SZK Archive</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>

            {/* Right Column: Personal Portraits Collage */}
            <div className="lg:col-span-5 pt-1">
              <ArtifactCollage images={personalImages} title="Personal Portraits &amp; Archive" />
            </div>
          </div>
        </section>

        {/* 2. Interactive Tool & Capabilities Stack (Concept C) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1F1F1F] pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
                Capabilities &amp; Tool Stack
              </h2>
              <p className="text-sm text-[#888888]">
                What I do, how I apply each tool, and where it was proven in production.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] self-start sm:self-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'uiux', label: 'UI/UX Design' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'ai', label: 'AI Workflows' },
                { id: 'brand', label: 'Brand & Print' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-3 py-1 text-xs rounded-[3px] transition-all font-mono uppercase tracking-wider cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#FFFFFF] text-[#000000] shadow-sm font-medium'
                      : 'text-[#777777] hover:text-[#FFFFFF]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-[#1F1F1F] pb-2">
                    <h3 className="text-sm font-medium text-[#FFFFFF]">{cap.name}</h3>
                    <span className="text-[10px] text-[#666666] uppercase tracking-wider font-mono">
                      {cap.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[#AAAAAA] font-normal leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Proof Projects Badges */}
                <div className="pt-2 border-t border-[#141414] flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-[#555555] uppercase tracking-wider font-mono mr-1">
                    Used In:
                  </span>
                  {cap.proofProjects.map((p, pIdx) => (
                    <Link
                      key={pIdx}
                      to={`/work/${p.slug}`}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] text-[#CCCCCC] bg-[#141414] hover:bg-[#222222] hover:text-[#FFFFFF] border border-[#222222] transition-colors font-mono cursor-pointer"
                    >
                      <span>{p.name}</span>
                      <span className="opacity-40">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Professional Experience Timeline with Thematic Impact Buckets */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Professional Experience
            </h2>
            <p className="text-sm text-[#888888] pt-1">
              Full-time and client design history categorized by tangible business impact.
            </p>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Experience Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-6 hover:border-[#333333] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1F1F1F] pb-4">
                    <div className="space-y-0.5">
                      <h3 className="text-xl font-normal text-[#FFFFFF]">{exp.role}</h3>
                      <div className="text-sm text-[#888888] font-normal">{exp.company} · {exp.location}</div>
                    </div>
                    <span className="text-xs text-[#888888] px-3 py-1 rounded-[4px] bg-[#141414] border border-[#1F1F1F] shrink-0 self-start sm:self-auto font-normal font-mono">
                      {exp.period}
                    </span>
                  </div>

                  {exp.highlight && (
                    <p className="text-xs text-[#FFFFFF] bg-[#141414] border border-[#1F1F1F] px-3 py-2 rounded-[4px] font-normal leading-relaxed">
                      {exp.highlight}
                    </p>
                  )}

                  {/* Thematic Buckets (for SJ Innovation) */}
                  {exp.thematicBuckets ? (
                    <div className="space-y-5 pt-1">
                      {exp.thematicBuckets.map((bucket, bIdx) => (
                        <div key={bIdx} className="space-y-2">
                          <h4 className="text-xs uppercase tracking-wider text-[#CCCCCC] font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
                            <span>{bucket.category}</span>
                          </h4>
                          <ul className="space-y-2 pl-3.5 text-xs sm:text-sm text-[#999999] font-normal leading-relaxed">
                            {bucket.points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-[#555555] shrink-0 mt-0.5">—</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-3 pt-2 text-sm text-[#999999] font-normal leading-relaxed">
                      {exp.bullets?.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="text-[#FFFFFF] mt-1 shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Right Column: Contextual Visual Artifacts Collage */}
                {exp.images && exp.images.length > 0 && (
                  <div className="lg:col-span-5 pt-1">
                    <ArtifactCollage images={exp.images} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. Independent Technical Projects */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Independent Technical Projects
            </h2>
            <p className="text-sm text-[#888888] pt-1">
              Platforms, open tooling, and web architectures designed and engineered independently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalProjects.map((proj, pIdx) => (
              <div
                key={pIdx}
                className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2 border-b border-[#1F1F1F] pb-3">
                    <h3 className="text-lg font-normal text-[#FFFFFF]">{proj.title}</h3>
                    {proj.slug && (
                      <Link
                        to={`/work/${proj.slug}`}
                        className="text-xs text-[#888888] hover:text-[#FFFFFF] font-mono transition-colors"
                      >
                        Case Study ↗
                      </Link>
                    )}
                  </div>
                  <p className="text-xs text-[#888888] font-mono">{proj.role}</p>
                  <p className="text-sm text-[#CCCCCC] font-normal leading-relaxed">{proj.description}</p>
                </div>

                {proj.link && (
                  <div className="pt-2 border-t border-[#141414]">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#3b82f6] hover:underline font-mono inline-flex items-center gap-1"
                    >
                      <span>{proj.link.replace('https://', '')}</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Key Endeavors & Academic Projects */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Key Endeavors &amp; Capstone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyProjects.map((proj, pIdx) => (
              <div
                key={pIdx}
                className="p-6 sm:p-7 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2 border-b border-[#1F1F1F] pb-3">
                    <h3 className="text-lg font-normal text-[#FFFFFF]">{proj.title}</h3>
                    <span className="text-xs text-[#777777] font-mono shrink-0">{proj.period}</span>
                  </div>
                  <p className="text-xs text-[#888888] font-normal">{proj.organization}</p>
                  <p className="text-sm text-[#CCCCCC] font-normal leading-relaxed">{proj.description}</p>
                </div>

                <ul className="space-y-2 pt-2 text-xs text-[#999999] leading-relaxed">
                  {proj.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2">
                      <span className="text-[#FFFFFF] mt-0.5 shrink-0">›</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Professional Contributions & Achievements */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Professional Contributions &amp; Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {professionalAchievements.map((ach, aIdx) => (
              <div
                key={aIdx}
                className="p-5 sm:p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors space-y-2"
              >
                <div className="text-sm font-normal text-[#FFFFFF] border-b border-[#1F1F1F] pb-2 flex items-center justify-between">
                  <span>{ach.title}</span>
                  <span className="text-[10px] text-[#555555] font-mono">0{aIdx + 1}</span>
                </div>
                <p className="text-xs text-[#999999] font-normal leading-relaxed pt-1">
                  {ach.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Education & Certifications */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Education &amp; Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Education Card */}
            <div className="lg:col-span-4 p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#FFFFFF] font-normal border-b border-[#1F1F1F] pb-2">
                Education
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="text-base font-normal text-[#FFFFFF]">Diploma in Engineering in Computer Science</h3>
                <p className="text-xs text-[#888888]">Munshiganj Polytechnic Institute</p>
                <p className="text-xs text-[#666666] font-mono pt-1">2021 – 2025</p>
              </div>
            </div>

            {/* Certifications Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, cIdx) => (
                <a
                  key={cIdx}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] space-y-1 transition-all block"
                >
                  <div className="text-xs sm:text-sm font-normal text-[#FFFFFF] group-hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                    <span>{cert.title}</span>
                    <span className="text-[#888888] group-hover:text-[#FFFFFF] text-xs transition-colors">↗</span>
                  </div>
                  <div className="text-[11px] text-[#888888] font-normal flex items-center justify-between pt-1">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Personal Interests & Human Dimension */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Personal Pursuits &amp; Discipline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalPursuits.map((pursuit, pIdx) => (
              <div
                key={pIdx}
                className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] transition-colors space-y-2.5"
              >
                <div className="flex items-center gap-2.5 border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-base">{pursuit.icon}</span>
                  <h3 className="text-sm font-normal text-[#FFFFFF]">{pursuit.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#999999] font-normal leading-relaxed pt-1">
                  {pursuit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Gateway to Personal Archive (Updated URL) */}
        <section ref={portalRef} className="relative pt-12 pb-16 overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-10 text-center">
            {/* SZK Header */}
            <div className="space-y-3">
              <span className="font-scanport text-[15pt] lowercase tracking-wider text-[#9E9484]">
                beyond the corporate showcase
              </span>
              <h2 className="font-fell text-4xl sm:text-5xl md:text-6xl font-normal lowercase tracking-tight text-[#F7F2EB]">
                gateway to personal archive
              </h2>
            </div>

            {/* The Gateway Card — Styled in SZK's signature warm BorderGlow aesthetic */}
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
                  <div className="relative w-full h-full overflow-hidden rounded-[26px]">
                    {/* Real Screenshot Preview of SZK personal archive */}
                    <img
                      src="/assets/projects/szk-mockup.webp"
                      alt="sadman zaman khan personal archive live preview"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Atmospheric warm vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B]/85 via-[#0E0D0B]/35 to-transparent group-hover:via-[#0E0D0B]/25 transition-colors duration-300" />

                    {/* Centered Literary SZK-style Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 p-4 pointer-events-none">
                      <div className="pointer-events-auto px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#F5F2EB] hover:bg-[#FFFFFF] text-[#1A1918] shadow-2xl border border-[#E5DFD3] transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-3 font-scanport text-base sm:text-lg lowercase tracking-normal cursor-pointer">
                        <span>enter personal archive</span>
                        <span
                          aria-hidden="true"
                          className="inline-block shrink-0 text-base leading-none transition-transform duration-300 ease-out group-hover:-rotate-45"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Formatted ATS-Style Resume Modal */}
      {isResumeModalOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Formatted Resume Modal"
            onClick={() => setIsResumeModalOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[8px] bg-[#0E0E0E] border border-[#262626] p-6 sm:p-10 shadow-2xl space-y-8 text-[#EDEDED]"
            >
              {/* Modal Top Actions */}
              <div className="flex items-center justify-between border-b border-[#222222] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-[#888888] font-mono">
                    Formatted Resume Preview
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
                  className="text-xs font-mono text-[#888888] hover:text-[#FFFFFF] transition-colors p-1"
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
                    UI/UX Designer | Design Systems | AI-Assisted Prototyping
                  </p>
                  <p className="text-xs text-[#777777] pt-1">
                    Dhaka, Bangladesh · +880 1869 504 388 · sadmanz.khan@gmail.com · sadmanportfolio.vercel.app
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-1.5 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Professional Summary
                  </h3>
                  <p className="text-xs text-[#AAAAAA] leading-relaxed">
                    UI/UX Designer with hands-on experience in enterprise dashboards, design systems, and AI-assisted prototyping. Uses Figma and code-first prototypes (React/Tailwind) to turn complex requirements into testable products quickly. Sole designer at SJ Innovation since February 2026, independently leading client and internal design initiatives.
                  </p>
                </div>

                {/* Core Competencies */}
                <div className="space-y-1.5 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Technical &amp; Core Competencies
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#AAAAAA]">
                    <div>
                      <strong className="text-[#FFFFFF]">UI/UX Design:</strong> Figma (Design Systems, Auto-layout), High-Density Dashboards, User Flows, Wireframing, Responsive Layouts.
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">Frontend &amp; Code:</strong> HTML5, CSS3/Tailwind, React, TypeScript, Three.js/Rapier, Git, Static Site Generation.
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">AI Workflows:</strong> Claude Code, Ollama (Local Models), Replicate API, Lovable Prototyping, Prompt Engineering.
                    </div>
                    <div>
                      <strong className="text-[#FFFFFF]">Brand &amp; Growth:</strong> Adobe Illustrator/Photoshop, Vector Identity, Meta Ads Manager, Print Pre-press, Technical SEO.
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Professional Experience
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-[#FFFFFF]">UI/UX Designer — SJ Innovation LLC</h4>
                      <span className="text-xs text-[#777777] font-mono">Sep 2025 – Present</span>
                    </div>
                    <p className="text-xs text-[#999999] italic">
                      Sole designer since Feb 2026, leading all client and internal design work across the company.
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-[#AAAAAA] leading-relaxed">
                      <li>Designed complete visual identities and UI/UX for 10+ AI-native Control Tower products (ePhysician, MortgageAI, NonProfit AI).</li>
                      <li>Scaled LuCreativ theme-park account across 7+ properties (Six Flags, Schlitterbahn, Valleyfair) with near-daily turnaround.</li>
                      <li>Designed ICR Debt Surveillance: 15-module Bloomberg-style financial dashboard with live data tables and alert metrics.</li>
                      <li>Led CollabAI platform redesign: replaced cluttered interface with minimal multi-model chat UI tested across viewports.</li>
                      <li>Rebuilt ePhysician Meta ad campaigns from sales lead data, producing an active ~2–3.5 leads/day pipeline on the same budget.</li>
                    </ul>
                  </div>

                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-[#FFFFFF]">Intern Graphic Designer — SJ Innovation LLC</h4>
                      <span className="text-xs text-[#777777] font-mono">May 2025 – Sep 2025</span>
                    </div>
                    <p className="text-xs text-[#AAAAAA] leading-relaxed">
                      Delivered 200+ digital and print assets for US client campaigns, including Meta ads, LinkedIn carousels, and event installations.
                    </p>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-1.5 border-t border-[#1F1F1F] pt-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#FFFFFF] font-mono">
                    Education &amp; Certifications
                  </h3>
                  <div className="text-xs text-[#AAAAAA] space-y-1">
                    <p><strong className="text-[#FFFFFF]">Diploma in Engineering in Computer Science</strong> — Munshiganj Polytechnic Institute (2021 – 2025)</p>
                    <p>Certifications: Design System in Figma (Grameenphone Academy), Claude Code in Action (Anthropic), User Experience (Accenture), Inbound Marketing (HubSpot).</p>
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
