import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import profileIllustration from '@/assets/profile-illustration.svg';

const About: React.FC = () => {
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
        'Built functional front-end prototypes using low-code platforms (Lovable) to validate design decisions with stakeholders before development, reducing revision cycles and accelerating time-to-market.',
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
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#00E5FF] selection:text-[#0A0A0A]">
      <SEOHead
        title="About & Experience — Sadman Zaman Khan"
        description="Experience timeline, competencies, and background of Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper."
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full pt-[100px] md:pt-[120px]">
        {/* 1. Profile Header & Bio with Illustration */}
        <section className="py-10 md:py-14 border-b border-[#27272A]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-3xl space-y-6">
              <div className="space-y-2">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF]">
                  Sadman Zaman Khan
                </h1>
                <div className="font-mono text-xs sm:text-sm text-[#94A3B8] tracking-wider">
                  /sɑːd.mɑːn zɑː.mɑːn kɑːn/ · (Saad-maan Zaa-maan Khaan)
                </div>
                <p className="font-display text-xl sm:text-2xl text-[#00E5FF] font-medium pt-1">
                  UI/UX Designer | AI-Augmented Prototyping | Brand Systems
                </p>
              </div>

              {/* Bio matching Resume Summary */}
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                Versatile UI/UX Designer with hands-on experience across enterprise dashboards, brand systems, and AI-augmented prototyping. Uses Figma AI and low-code tools (Lovable) to move from concept to testable prototype quickly, reducing client revision cycles. Sole designer at SJ Innovation since February 2026, independently owning all client and internal design work.
              </p>

              <div className="pt-2 font-mono text-xs text-[#94A3B8] space-y-1">
                <div>Dhaka, Bangladesh · <a href="mailto:sadmanz.khan@gmail.com" className="text-[#FFFFFF] hover:text-[#00E5FF] transition-colors">sadmanz.khan@gmail.com</a></div>
                <div>Diploma in Engineering in Computer Science | Munshiganj Polytechnic Institute (2021 – 2025)</div>
              </div>
            </div>

            {/* Illustration of Sadman */}
            <div className="lg:w-72 shrink-0 flex justify-center">
              <div className="relative w-56 sm:w-64 rounded-2xl overflow-hidden border border-[#27272A] bg-[#141414] shadow-2xl p-2 hover:border-[#00E5FF]/40 transition-colors">
                <img
                  src={profileIllustration}
                  alt="Sadman Zaman Khan Illustration"
                  className="w-full h-auto rounded-xl object-contain bg-white/95"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Experience Timeline */}
        <section className="py-14 border-b border-[#27272A] space-y-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Experience
            </h2>
          </div>

          <div className="space-y-8 max-w-4xl">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-xl bg-[#141414] border border-[#27272A] space-y-4 hover:border-[#3F3F46] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="space-y-0.5">
                    <h3 className="font-display text-xl font-bold text-[#FFFFFF]">{exp.role}</h3>
                    <div className="text-sm text-[#00E5FF] font-medium">{exp.company} · {exp.location}</div>
                  </div>
                  <span className="font-mono text-xs text-[#CBD5E1] px-3 py-1 rounded-full bg-[#1C1C1C] border border-[#27272A] shrink-0">
                    {exp.period}
                  </span>
                </div>

                {exp.highlight && (
                  <p className="text-xs font-mono text-[#4ADE80] bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-3 py-1.5 rounded-lg">
                    {exp.highlight}
                  </p>
                )}

                <ul className="space-y-3 pt-2 text-sm text-[#CBD5E1] leading-relaxed">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-[#00E5FF] mt-1 shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Technical & Core Competencies */}
        <section className="py-14 border-b border-[#27272A] space-y-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Technical &amp; Core Competencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#141414] border border-[#27272A] space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-semibold border-b border-[#27272A] pb-2">
                  {group.category}
                </div>
                <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
                  {group.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Certifications & Verification */}
        <section className="py-14 space-y-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
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
                className="group p-5 rounded-xl bg-[#141414] border border-[#27272A] hover:border-[#00E5FF]/40 space-y-1 transition-all block"
              >
                <div className="text-sm font-semibold text-[#FFFFFF] group-hover:text-[#00E5FF] transition-colors flex items-center justify-between">
                  <span>{cert.title}</span>
                  <span className="text-[#94A3B8] group-hover:text-[#00E5FF] text-xs transition-colors">↗</span>
                </div>
                <div className="font-mono text-xs text-[#CBD5E1] flex items-center justify-between pt-1">
                  <span>{cert.issuer}</span>
                  <span className="text-[#94A3B8]">{cert.date}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
