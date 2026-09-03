import React, { useEffect, useRef } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import GradualBlur from '@/components/GradualBlur';
import profileIllustration from '@/assets/profile-illustration.svg';
import { useExploration } from '@/context/ExplorationContext';

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
      ]
    },
    {
      role: 'Intern Graphic Designer',
      company: 'SJ Innovation LLC',
      location: 'Dhaka, Bangladesh (On-site)',
      period: 'May 2025 – Aug 2025',
      bullets: [
        'Orchestrated a digital asset pipeline supporting US-based global campaigns: developed 200+ high-engagement digital and print collateral pieces (targeted Meta ads, optimized LinkedIn carousels, large-format corporate event banners, internal office installations) for multicultural marketing initiatives and product launches.'
      ]
    },
    {
      role: 'Freelance Graphic & Brand Designer',
      company: 'Freelancer',
      location: 'Global Clients',
      period: 'Mar 2025 – Apr 2025',
      bullets: [
        'Completed 4 client engagements for US-based businesses (edtech branding, physical store signage, gym marketing collateral) during post-graduation period, delivering logo designs and brand systems with 100% on-time delivery.'
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
        {/* 1. Profile Header & Bio with Illustration */}
        <section className="pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-3xl space-y-6">
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

            {/* Illustration */}
            <div className="lg:w-72 shrink-0 flex justify-center">
              <div className="relative w-56 sm:w-64 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A] p-2 hover:border-[#333333] transition-colors">
                <img
                  src={profileIllustration}
                  alt="Sadman Zaman Khan Illustration"
                  className="w-full h-auto rounded-[2px] object-contain bg-white/95"
                />
              </div>
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

          <div className="space-y-8 w-full">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-4 hover:border-[#333333] transition-colors w-full"
              >
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

        {/* 5. Personal Digital Archive Transition with Gradual Blur */}
        <section ref={portalRef} className="relative pt-6 pb-12 overflow-hidden">
          <div className="relative rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] p-8 sm:p-12 md:p-16 text-center space-y-6 overflow-hidden group hover:border-[#333333] transition-colors">
            {/* Gradual Blur layer spanning across the bottom */}
            <GradualBlur
              position="bottom"
              height="100%"
              strength={3}
              divCount={8}
              opacity={0.85}
              curve="bezier"
              className="z-10 pointer-events-none"
            />

            <div className="relative z-20 max-w-2xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#888888] font-normal">
                Beyond the Corporate Showcase
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#FFFFFF] tracking-tight">
                Poems, pastime logs &amp; unfiltered musings.
              </h3>
              <p className="text-sm sm:text-base text-[#999999] font-normal leading-relaxed">
                Step into my personal digital archive — featuring interactive 3D physics experiments, bilingual poetry readers, and raw creative engineering.
              </p>
              <div className="pt-4">
                <a
                  href="https://sadmanzamankhan.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordPortalFound()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] text-xs uppercase tracking-wider bg-[#FFFFFF] text-[#000000] hover:bg-[#E5E5E5] transition-all font-normal shadow-lg cursor-pointer"
                >
                  <span>Explore Personal Archive ↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
