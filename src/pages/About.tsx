import React, { useEffect, useRef } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
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

  // Personal Portraits sourced directly from matrimonial profile archive
  const personalImages = [
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

  const experiences = [
    {
      role: 'UI/UX Designer',
      company: 'SJ Innovation LLC',
      location: 'Dhaka, Bangladesh',
      period: 'September 2025 – Present',
      highlight: 'Sole designer at SJ Innovation since February 2026, owning client and internal design work across the company.',
      bullets: [
        'Sole designer at SJ Innovation since February 2026, owning client and internal design work across the company.',
        'Designed complete visual identity systems for 10+ AI-native Control Tower products (ePhysician, Marketing AI, MortgageAI, RealtorHelp, HR CT, Agency CT, NonProfit AI) and delivered high-stakes client projects under tight deadlines: InfoFluence diagnostic reports (McKinsey-style aesthetic for AWS presentations), StoryGrooveAI landing page optimization.',
        'Scaled the LuCreativ theme-park client account from an initial multi-venue engagement to sustained near-daily production across 7+ properties (Six Flags St. Louis, Valleyfair, Michigan\'s Adventure, Worlds of Fun, Schlitterbahn Galveston, Enchanted Parks) spanning digital, OOH, and paid-display formats — consistently praised by the client for quality and fast turnaround.',
        'Designed the logo for Queens AI Week, an event partnership between the Queens Chamber of Commerce, SJ Innovation, and Firstlight Cloud Xchange.',
        'Designed ICR Debt Surveillance — a Bloomberg Terminal–style dashboard for credit investors, including a 15-module data layout, alert indicators, and investor-facing data visualizations.',
        'Alyssa Kristin (luxury bridal SaaS) — designed three separate experiences (mobile Stylist App, Admin CMS, CRM) as one connected system, translating complex operational requirements into functional prototypes using Figma AI agents and low-code deployment.',
        'Manually redesigned AI-generated visual output in Figma to remove generic template patterns, then rebuilt and deployed the site using Google Antigravity and hand-coded refinements via Git/GitHub Pages.',
        'WordPress: Hands-on content publishing, plugin administration, and technical troubleshooting; custom HTML.',
        'Built and executed Meta ad campaigns (ePhysician, NonProfit AI) from sales lead data: segmented leads into custom audiences, configured targeting across campaign, ad set, and ad level in Ads Manager, and designed ad creatives that generated 5 form submissions on day one (previous creatives ran 4 days with 0 clicks).',
        'Built functional front-end prototypes using low-code platforms (Lovable) to validate design decisions with stakeholders before development, reducing revision cycles and accelerating time-to-market.',
        'Implemented a local AI workflow prototype (Ollama/Perplexica) for competitive UX analysis and set up ComfyUI workflows with safetensors models to generate images locally.',
        'Recognized by a senior business analyst for ownership mindset: proactively delivering work with integrated self-critique and recommended improvements, streamlining review cycles.',
        'Led a full UI/UX redesign of CollabAI\'s multi-agent platform, replacing a cluttered, neon-heavy interface with a clean, minimal design; implemented live AI chat with real model provider integrations (Groq, Gemini, OpenRouter) and user access controls, tested across desktop and mobile browsers.',
        'Rebuilt personal portfolio with a custom brand identity and migrated off Lovable/Supabase to Cloudflare Pages, with automated GitHub-based deployments and zero ongoing cost, with full SEO setup (sitemap, robots.txt, canonical metadata) and confirmed Google indexing via Search Console.',
        'Rebuilt underperforming Meta ad creatives for a B2B healthcare automation product (ePhysician) — replaced generic stock imagery and cluttered layout with custom, brand-consistent visuals and a single clear CTA — turning a 0-lead, 4-day campaign into a sustained ~2–3.5 leads/day pipeline on the same ad budget.',
        'Led a comprehensive on-page SEO audit across the Control Tower landing page portfolio and CollabAI/BuildYourAI landing pages (6+ pages, 4 product verticals), identifying duplicate canonical URLs, a sitewide heading markup issue, and cross-page data inconsistencies (e.g. mismatched agent counts) — producing a prioritized, template-level fix plan.'
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

  const keyProjects = [
    {
      title: 'Campus Rebranding & Digital Infrastructure',
      organization: 'Munshiganj Polytechnic Institute',
      period: '2022 – 2025',
      description: 'Spearheaded an end-to-end visual branding overhaul for campus ceremonies, providing professional print suites (signage, custom recognition materials) and establishing standardized digital guidelines across social media.',
      points: [
        'Developed and deployed a fully functional custom website on Wix to digitize unit resources, while managing multi-channel social growth and high-impact marketing collateral over three years.',
        'Designed foundational brand identity for the new campus Computer Club, including custom logos, typography, and automated social media layout frameworks to ensure consistent visual presence across all platforms.'
      ]
    },
    {
      title: 'NEXURA — Brand Identity System (Final Capstone Project)',
      organization: 'Munshiganj Polytechnic Institute · Score: 4.0 (8th Semester)',
      period: 'Capstone Project',
      description: 'Led end-to-end brand identity development in Adobe Illustrator & Photoshop: designed a custom logo system with multiple mark variations, developed a comprehensive 40-page brand guideline document, and created application mockups across 20+ touchpoints (stationery, packaging, digital interfaces, signage, vehicle wraps).',
      points: [
        'Established typographic hierarchy, color psychology framework, and usage standards to ensure visual consistency across all media applications.',
        'Delivered formal presentation to faculty evaluators, articulating strategic rationale for all design decisions; scored a perfect 4.0 in 8th semester evaluation.'
      ]
    }
  ];

  const professionalAchievements = [
    {
      title: 'Client Impact & Ownership',
      detail: 'Took full ownership of the StoryGroove project during its critical launch phase, working late nights and weekends to deliver on tight deadlines. Client feedback praised the designs as "clean, thorough, and easily accessible," leading to repeat engagement and a strengthened relationship with SJ Innovation.'
    },
    {
      title: 'Brand Consistency Ownership',
      detail: 'Have led SJ Innovation\'s visual brand consistency since probation — spanning the Control Tower product suite, internal culture materials, and company-wide presentations — including authoring the current brand guidelines from concept to implementation (POM social media creatives, Birthday carousels).'
    },
    {
      title: 'Operational Resilience',
      detail: 'Repeatedly stepped in during critical, short-notice periods (Restock Resource, weekend coverage during a teammate\'s family emergency) to maintain project continuity and client satisfaction under extreme deadline pressure — including ~15 hours of documented after-hours and weekend work logged over a single three-week stretch to protect a client\'s delivery deadlines.'
    },
    {
      title: 'Collaboration & Knowledge Sharing',
      detail: 'Team members described collaborative approach as "pillars and compass," citing significant learning improvements from working together.'
    },
    {
      title: 'UX Problem Solving',
      detail: 'Fixed a button-placement and color issue on the Calysta Pro CRM email campaign page that was creating layout confusion — colleague specifically credited the improved usability.'
    },
    {
      title: 'Technical Agility',
      detail: 'Edited a webinar video under a 24-hour deadline; also delivered large-format event collateral and social media suites under tight recurring timelines.'
    },
    {
      title: 'Culture & Events',
      detail: 'Led design and execution for SJ Innovation\'s 22nd Anniversary celebration — crest/trophy designs, zoom backgrounds, decorative merchandise (gift box, bag stickers, portrait cards), event props, and photo/video capture — recognized by HR leadership for creativity and dedication.'
    }
  ];

  const skillGroups = [
    {
      category: 'UI/UX Design',
      items: [
        'Figma (Design Systems, AI agents)',
        'Responsive Web Layouts',
        'User Flow Mapping',
        'Wireframing',
        'Interactive Prototyping'
      ]
    },
    {
      category: 'Advanced Tech & AI Integration',
      items: [
        'Ollama',
        'Replicate API',
        'Low-code Prototyping (Lovable, Bolt.new)',
        'Google Antigravity',
        'Claude Code (MCP-based tool orchestration, e.g. Ollama-to-Figma workflows)',
        'WordPress Administration'
      ]
    },
    {
      category: 'Visual Production',
      items: [
        'Adobe Creative Suite (Illustrator, Photoshop)',
        'Brand Identity Systems',
        'Vector Illustration',
        'Print Layouts',
        'Digital Marketing Assets (Meta ads, Carousels)'
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

  const personalPursuits = [
    {
      title: 'Film & Narrative Exploration',
      icon: '🎬',
      description: 'I am drawn to films that explore the complexity of human behavior and emotion, works by directors like Tarkovsky, Kurosawa, Von Trier, and Park chan-wook. Watching these stories unfold is my way of observing experiences and perspectives I would never encounter otherwise, helping me better understand how people think, feel, and make decisions.'
    },
    {
      title: 'Music & Artistic Expression',
      icon: '🎧',
      description: 'My listening spans a wide range, from the atmospheric depth of post-rock (Godspeed You! Black Emperor, Sigur Rós) to the raw intensity of extreme metal (Paysage d\'Hiver, Ulver) and the lyrical precision of conscious hip-hop (Kendrick Lamar, MF DOOM). Music is where I go to process ideas and emotions outside of work.'
    },
    {
      title: 'Writing & Creative Discipline',
      icon: '✍️',
      description: 'Since 2017, I have written poetry under various pseudonyms, exploring themes like cosmic horror, divinity, and the limits of human understanding. I write occasionally on weekends now, but the practice of building conceptual worlds from abstract ideas remains central to how I think and process information.'
    },
    {
      title: 'Physical & Spiritual Practice',
      icon: '🥊',
      description: 'I maintain discipline through bodyweight training using whatever is available: running, climbing the 10 floors of my building multiple times on weekends, and conditioning work like punching drills with wrapped fists. I am also deepening my understanding of theology and religious history, including perfecting my Quranic recitation for salah.'
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title="About & Resume — Sadman Zaman Khan"
        description="Experience timeline, competencies, achievements, and background of Sadman Zaman Khan — UI/UX Designer specializing in AI-augmented prototyping and brand systems."
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

              {/* Bio */}
              <p className="text-base sm:text-lg text-[#999999] font-normal leading-relaxed">
                Versatile UI/UX Designer with hands-on experience across enterprise dashboards, brand systems, and AI-augmented prototyping. Uses Figma AI and low-code tools (Lovable) to move from concept to testable prototype quickly, reducing client revision cycles. Sole designer at SJ Innovation since February 2026, independently owning all client and internal design work.
              </p>

              {/* Quick Links & Resume Download CTA */}
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
                  href="https://sadmanzamankhan.pages.dev/portfolio"
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

        {/* 2. Professional Experience Timeline */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Professional Experience
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

        {/* 3. Key Projects & Endeavors */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Key Projects &amp; Endeavors
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

        {/* 4. Professional Contributions & Achievements */}
        <section className="space-y-8">
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

        {/* 5. Technical & Core Competencies */}
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
                    <li key={iIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] shrink-0 mt-1.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Education & Certifications */}
        <section className="space-y-8">
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

        {/* 7. Personal Interests & Intellectual Pursuits */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#FFFFFF]">
              Personal Interests &amp; Intellectual Pursuits
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

        {/* 8. Personal Digital Archive Transition & Gateway to SZK */}
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
