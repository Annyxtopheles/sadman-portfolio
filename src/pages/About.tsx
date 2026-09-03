import React, { useEffect, useRef } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import profileIllustration from '@/assets/profile-illustration.svg';
import { useExploration } from '@/context/ExplorationContext';
import { BorderGlow } from '@/components/effects/BorderGlow';
import { ArtifactCollage } from '@/components/ArtifactCollage';

const About: React.FC = () => {
  const { recordPortalFound } = useExploration();
  const portalRef = useRef<HTMLDivElement>(null);

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

  const personalImages = [
    {
      url: profileIllustration,
      caption: 'Sadman Zaman Khan — Signature vector portrait & avatar',
      tag: 'Portrait'
    },
    {
      url: '/assets/profile/id-card-portrait.svg',
      caption: 'SJ Innovation LLC — Designer badge & corporate identity',
      tag: 'Identity'
    },
    {
      url: '/assets/rewards/cozy-desk-04.webp',
      caption: 'Studio workspace — Rapid prototyping, research & design systems',
      tag: 'Studio'
    }
  ];

  const experiences = [
    {
      role: 'UI/UX Designer',
      company: 'SJ Innovation LLC',
      location: 'Dhaka, Bangladesh (On-site)',
      period: 'Sep 2025 – Present',
      highlight: 'Sole designer at SJ Innovation since February 2026, owning client and internal design work across the company.',
      bullets: [
        'Designed complete visual identity systems for 10+ AI-native Control Tower products (ePhysician, Marketing AI, MortgageAI, RealtorHelp, HR CT, Agency CT, NonProfit AI) and delivered high-stakes client projects under tight deadlines: InfoFluence diagnostic reports (McKinsey-style aesthetic for AWS presentations), LuCreativ multi-venue marketing campaign (consistently praised by the client for quality and fast turnaround), StoryGrooveAI landing page optimization.',
        'Designed ICR Debt Surveillance — a Bloomberg Terminal–style dashboard for credit investors, including a 15-module data layout, alert indicators, and investor-facing data visualizations.',
        'Alyssa Kristin (luxury bridal SaaS) — designed three separate experiences (mobile Stylist App, Admin CMS, CRM) as one connected system, translating complex operational requirements into functional prototypes using Figma AI agents and low-code deployment.',
        'Manually redesigned AI-generated visual output in Figma to remove generic template patterns, then rebuilt and deployed the site using Google Antigravity and hand-coded refinements via Git/GitHub Pages.',
        'WordPress: Hands-on content publishing, plugin administration, and technical troubleshooting; custom HTML.',
        'Built and executed Meta ad campaigns (ePhysician, NonProfit AI) from sales lead data: segmented leads into custom audiences, configured targeting across campaign, ad set, and ad level in Ads Manager, and designed ad creatives that generated 5 form submissions on day one (previous creatives ran 4 days with 0 clicks).',
        'Built functional front-end prototypes using modern rapid prototyping platforms to validate design decisions with stakeholders before development, reducing revision cycles and accelerating time-to-market.',
        'Implemented a local AI workflow prototype (Ollama/Perplexica) for competitive UX analysis and set up ComfyUI workflows with safetensors models to generate images locally.',
        'Recognized by a senior business analyst for ownership mindset: proactively delivering work with integrated self-critique and recommended improvements, streamlining review cycles.',
        'Led a full UI/UX redesign of CollabAI\'s multi-agent platform, replacing a cluttered, neon-heavy interface with a clean, minimal design; implemented live AI chat with real model provider integrations (Groq, Gemini, OpenRouter) and user access controls, tested across desktop and mobile browsers.'
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
      location: 'Dhaka, Bangladesh (On-site)',
      period: 'May 2025 – Aug 2025',
      bullets: [
        'Orchestrated a digital asset pipeline supporting US-based global campaigns: developed 200+ high-engagement digital and print collateral pieces (targeted Meta ads, optimized LinkedIn carousels, large-format corporate event banners, internal office installations) for multicultural marketing initiatives and product launches.'
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
      period: 'Mar 2025 – Apr 2025',
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

  const skillGroups = [
    {
      category: 'UI/UX Design',
      items: [
        'Figma (Design Systems, AI agents)',
        'Responsive Web Layouts',
        'User Flow Mapping',
        'Wireframing & Information Architecture',
        'Interactive Prototyping',
        'High-Density Dashboard Systems'
      ]
    },
    {
      category: 'Advanced Tech & AI Integration',
      items: [
        'Ollama & Local Model Workflows',
        'Replicate API Integration',
        'Low-Code Prototyping (Lovable, Bolt.new)',
        'Google Antigravity',
        'WordPress Administration & Custom HTML',
        'Prompt-to-Prototype Pipelines'
      ]
    },
    {
      category: 'Visual Production',
      items: [
        'Adobe Creative Suite (Illustrator, Photoshop)',
        'Brand Identity Systems & Design Guidelines',
        'Vector Illustration',
        'Print Layouts & Physical Installations',
        'Digital Marketing Assets (Meta ads, Carousels)',
        'WCAG Accessibility Audits'
      ]
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

  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="About — Sadman Zaman Khan"
        description="Experience timeline, competencies, and background of Sadman Zaman Khan."
      />

      <main className="animate-slide-up w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[100px] md:pt-[120px] space-y-16">
        {/* 1. Profile Header & Bio with Personal Artifacts Collage */}
        <section className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Bio & Identity Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#FFFFFF]">
                  Sadman Zaman Khan
                </h1>
                <p className="text-xl sm:text-2xl text-[#888888] font-normal pt-1">
                  UI/UX Designer | AI-Augmented Prototyping | Brand Systems
                </p>
              </div>

              {/* Bio */}
              <p className="text-base sm:text-lg text-[#999999] font-normal leading-relaxed">
                Versatile UI/UX Designer with hands-on experience across enterprise dashboards, brand systems, and AI-augmented prototyping. Uses Figma AI and rapid prototyping tools to move from concept to testable prototype quickly, reducing client revision cycles. Sole designer at SJ Innovation since February 2026, independently owning all client and internal design work.
              </p>
            </div>

            {/* Right Column: Personal Artifacts Collage */}
            <div className="lg:col-span-5 pt-1">
              <ArtifactCollage images={personalImages} title="Identity &amp; Individual" />
            </div>
          </div>
        </section>

        {/* 2. Experience Timeline */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Experience
            </h2>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Experience Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-4 hover:border-[#333333] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="space-y-0.5">
                      <h3 className="text-xl font-normal text-[#FFFFFF]">{exp.role}</h3>
                      <div className="text-sm text-[#888888] font-normal">{exp.company} · {exp.location}</div>
                    </div>
                    <span className="text-xs text-[#888888] px-3 py-1 rounded-[4px] bg-[#141414] border border-[#1F1F1F] shrink-0 self-start sm:self-auto font-normal">
                      {exp.period}
                    </span>
                  </div>

                  {exp.highlight && (
                    <p className="text-xs text-[#FFFFFF] bg-[#141414] border border-[#1F1F1F] px-3 py-1.5 rounded-[4px] font-normal">
                      {exp.highlight}
                    </p>
                  )}

                  <ul className="space-y-3 pt-2 text-sm text-[#999999] font-normal leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-[#FFFFFF] mt-1 shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
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

        {/* 3. Technical & Core Competencies */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Technical &amp; Core Competencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-4">
                <div className="text-xs uppercase tracking-wider text-[#FFFFFF] font-normal border-b border-[#1F1F1F] pb-2">
                  {group.category}
                </div>
                <ul className="space-y-2.5 text-sm text-[#999999] font-normal">
                  {group.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Certifications */}
        <section className="space-y-8 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, cIdx) => (
              <a
                key={cIdx}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] space-y-1 transition-all block"
              >
                <div className="text-sm font-normal text-[#FFFFFF] group-hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>{cert.title}</span>
                  <span className="text-[#888888] group-hover:text-[#FFFFFF] text-xs transition-colors">↗</span>
                </div>
                <div className="text-xs text-[#888888] font-normal flex items-center justify-between pt-1">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 5. Personal Digital Archive Transition & Gateway to SZK */}
        <section ref={portalRef} className="relative pt-12 pb-16 overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-10 text-center">
            {/* SZK Header */}
            <div className="space-y-3">
              <span className="font-scanport text-xs lowercase tracking-wider text-[#9E9484]">
                beyond the corporate showcase
              </span>
              <h2 className="font-fell text-4xl sm:text-5xl md:text-6xl font-normal lowercase tracking-tight text-[#F7F2EB]">
                gateway to personal archive
              </h2>
            </div>

            {/* The Gateway Card — Styled in SZK's signature warm, analog, BorderGlow aesthetic */}
            <div className="relative w-full flex items-center justify-center">
              <a
                href="https://sadmanzamankhan.pages.dev/"
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

                    {/* Centered Literary SZK-style Button with Scanport font */}
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

      <Footer />
    </div>
  );
};

export default About;
