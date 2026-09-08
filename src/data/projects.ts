export type ProjectCategory = 'Enterprise Dashboards' | 'AI Systems' | 'Mobile & Web' | 'Brand Systems';
export type ProjectStatus = 'SHIPPED' | 'CASE STUDY' | 'LIVE';

export interface CaseStudyMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface CaseStudyTLDR {
  challenge: string;
  role: string;
  method: string;
}

export interface CaseStudyProcessStep {
  title: string;
  description: string;
  details?: string[];
}

export interface GalleryImage {
  url: string;
  caption: string;
  type?: 'desktop' | 'mobile' | 'system' | 'mockup' | 'carousel' | 'portrait' | 'comparison';
  aspectRatio?: string;
  embedUrl?: string;
  videoUrl?: string;
  externalUrl?: string;
  comparison?: {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
}

export interface CarouselItem {
  id?: string;
  title: string;
  description?: string;
  documentUrl?: string;
  documentTitle?: string;
  slides: GalleryImage[];
}

export interface GallerySection {
  sectionTitle: string;
  sectionDescription?: string;
  documentUrl?: string;
  documentTitle?: string;
  images: GalleryImage[];
  carousels?: CarouselItem[];
}

export interface BeforeAfterComparison {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  aspectRatio?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  company: string;
  client: string;
  year: string;
  duration: string;
  scope: string[];
  summary: string;
  coverImage: string;
  liveUrl?: string | null;
  tldr: CaseStudyTLDR;
  problem: string;
  process: CaseStudyProcessStep[];
  aiWorkflow?: string;
  outcomes?: CaseStudyMetric[];
  outcomeSummary?: string;
  galleryImages: GalleryImage[];
  gallerySections?: GallerySection[];
  beforeAfter?: BeforeAfterComparison;
}

export const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Enterprise Dashboards',
  'AI Systems',
  'Mobile & Web',
  'Brand Systems',
];

export const PROJECTS: Project[] = [
  {
    id: "collabai-platform",
    slug: "collabai-platform",
    title: "CollabAI Redesign — Multi-Agent Workspace",
    category: "AI Systems",
    status: "LIVE",
    company: "CollabAI",
    client: "CollabAI Platform",
    year: "2025 – 2026",
    duration: "2 Months",
    scope: ["Multi-Agent UX", "Real-Time Streaming", "Global Composer", "Design System", "Full-Stack Prototype"],
    summary: "Full UI/UX redesign of CollabAI's multi-agent collaboration platform, replacing a cluttered neon interface with a minimal dark workspace featuring multi-model streaming (Groq, Gemini, OpenRouter), agent orchestration, and in-context tool execution.",
    coverImage: "/assets/projects/collabai-mockup.webp",
    liveUrl: "https://collabai-redesign.onrender.com/",
    tldr: {
      challenge: "The initial platform suffered from high visual clutter, confusing agent orchestration controls, and poor readability during multi-agent code generation.",
      role: "Lead UI/UX Designer — stripped away redundant UI layers, redesigned the design system, and built functional prototypes with live model streaming.",
      method: "Designed an intuitive global composer with @agent and #tag shortcuts, multi-model provider switching (Groq 120fps, Gemini, OpenRouter), and clean workspace hierarchy."
    },
    problem: "When orchestrating multiple autonomous AI agents simultaneously, users were overwhelmed by jumping layout frames, indistinct agent roles, and unclear streaming feedback.",
    process: [
      {
        title: "Distraction-Free Multi-Agent Canvas & Composer",
        description: "Restructured the core dashboard around a global quick composer with @agent routing, #tag shortcuts, and unified workspace breadcrumbs.",
        details: [
          "Distinct visual identity cards for individual agents (Aster Architect, Reasoning Advisor, Color Palette Gen)",
          "Seamless model provider selection with real-time switching between Groq, Gemini, and OpenRouter",
          "Directory-connected Knowledge Base, persistent projects, and in-context tool attachments"
        ]
      }
    ],
    aiWorkflow: "Implemented live functional prototypes with Server-Sent Events (SSE) token streaming to test responsiveness and UI stability during high-frequency agent output.",
    outcomes: [
      { label: "Visual Clarity", value: "100%", subtext: "Replaced cluttered neon aesthetic with unified minimal dark architecture" },
      { label: "Execution Speed", value: "120 fps", subtext: "Integrated low-latency Groq model routing for instantaneous chat responses" }
    ],
    outcomeSummary: "Transformed a cluttered technical proof-of-concept into a clean, modern AI workspace praised by users for its speed, clarity, and ergonomic multi-agent orchestration.",
    gallerySections: [
      {
        sectionTitle: "Interface Evolutions & Before/After Comparisons",
        sectionDescription: "Interactive before-and-after comparisons contrasting the legacy interface against the redesigned minimal workspace across core workflows. Slide horizontally to inspect the architectural and visual overhaul.",
        images: [
          {
            url: "/assets/projects/collabai/collabai-dashboard-after.webp",
            caption: "Workspace Dashboard & Composer — Slide to compare legacy interface vs. redesigned workspace",
            aspectRatio: "1024/532",
            type: "comparison",
            comparison: {
              beforeImage: "/assets/projects/collabai/collabai-dashboard-before.webp",
              afterImage: "/assets/projects/collabai/collabai-dashboard-after.webp",
              beforeLabel: "Original Interface",
              afterLabel: "Redesigned Workspace"
            }
          },
          {
            url: "/assets/projects/collabai/collabai-chat-after.webp",
            caption: "Conversational UI & Canvas — Slide to compare original chat flow vs. fluid streaming canvas",
            aspectRatio: "1024/532",
            type: "comparison",
            comparison: {
              beforeImage: "/assets/projects/collabai/collabai-chat-before.webp",
              afterImage: "/assets/projects/collabai/collabai-chat-after.webp",
              beforeLabel: "Original Chat UI",
              afterLabel: "Redesigned Canvas"
            }
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/collabai/collabai-dashboard-after.webp",
        caption: "CollabAI Redesigned Dashboard — Minimal dark architecture and unified @agent composer",
        aspectRatio: "1024/532",
        type: "desktop"
      },
      {
        url: "/assets/projects/collabai/collabai-chat-after.webp",
        caption: "CollabAI Redesigned Chat — Fluid conversational canvas with reasoning stream",
        aspectRatio: "1024/532",
        type: "desktop"
      }
    ]
  },
  {
    id: "szk-personal-archive",
    slug: "szk-personal-archive",
    title: "My Personal Digital Archive",
    category: "Mobile & Web",
    status: "LIVE",
    company: "Independent / Personal",
    client: "Sadman Zaman Khan",
    year: "2025 – 2026",
    duration: "3 Months",
    scope: ["3D WebGL", "Physics Simulation", "Creative Direction", "Bilingual Poetry UI", "Full-Stack React"],
    summary: "An expressive personal digital archive and initial portfolio combining 3D physics lanyard simulation, bilingual poetry reader, multimedia pastime tracking, and vintage editorial typography.",
    coverImage: "/assets/projects/szk-mockup.webp",
    liveUrl: "https://sadmanzamankhan.pages.dev/",
    tldr: {
      challenge: "Creating an intimate, unfiltered digital sanctuary that breaks away from cookie-cutter designer portfolios—blending technical 3D physics with poetry, cinema, and literary personal essays.",
      role: "Creator, Designer & Engineer — conceived the editorial identity, engineered the Rapier3D interactive physics lanyard badge, and built custom reader modes.",
      method: "Engineered with React Three Fiber, Rapier 3D rigid-body dynamics, custom audio synthesis, and Caslon Antique typography with ambient grain overlays."
    },
    problem: "Standard hiring portfolios sanitize personality in favor of safe corporate templates. This project was conceived as an authentic digital habitat celebrating personal prose, pastime logs, and deep creative engineering.",
    process: [
      {
        title: "Interactive 3D Physics Lanyard Badge",
        description: "Built a real-time draggable employee ID lanyard card using React Three Fiber, Drei, and Rapier3D physics engines with dynamic lighting, collision detection, and tactile spring dynamics.",
        details: [
          "Real-time WebGL mesh rendering with ambient grain and scanline post-processing",
          "Bilingual poetry interface with paper-textured reader toggle and custom Bengali typography",
          "Integrated multimedia pastime tracker with live status chips for anime, cinema, and literature"
        ]
      }
    ],
    aiWorkflow: "Used generative design and procedural math scripting in GLSL shaders to tune realistic cloth physics and rope tension for the 3D lanyard strap.",
    outcomes: [
      { label: "3D Physics", value: "60 fps", subtext: "Silky smooth rigid-body simulation on both mobile and desktop browsers" },
      { label: "Authenticity", value: "100%", subtext: "Direct uncompromised expression of design, poetry, and technical craft" }
    ],
    outcomeSummary: "An unapologetically personal, tactile web experience that proves depth of craft and technical mastery beyond conventional portfolio bounds.",
    galleryImages: [
      {
        url: "/assets/projects/szk-mockup.webp",
        caption: "My Personal Digital Archive — Minimalist editorial landing view with stark typography and poetry navigation",
        type: "desktop"
      }
    ]
  },
  {
    id: "clandest-agency",
    slug: "clandest-agency",
    title: "Clandest Agency Landing Page",
    category: "Mobile & Web",
    status: "LIVE",
    company: "Clandest Agency",
    client: "Clandest Studio",
    year: "2026",
    duration: "1 Month",
    scope: ["Brand Identity", "Web Design", "Frontend Engineering", "Fluid Typography", "Vanilla HTML/CSS"],
    summary: "High-performance studio landing page for Clandest Agency — a Dhaka-based design, development, and video post-production collective. Built with plain semantic HTML5, fluid clamp CSS3, and interactive hover mechanics with zero framework overhead.",
    coverImage: "/assets/projects/clandest-mockup.webp",
    liveUrl: "https://clandestagency.pages.dev/",
    tldr: {
      challenge: "Building a lean, expressive web agency presence that communicates capabilities fast, highlights the 4-founder collective without corporate jargon, and scores 100 on Core Web Vitals.",
      role: "Co-founder & Lead Designer — designed the brand visual language, responsive web layouts, typography system, and authored clean semantic HTML/CSS.",
      method: "Engineered fluid clamp-based typography (Host Grotesk & Roboto Flex), custom animated SVG button states, and lightweight interactive service cards."
    },
    problem: "Most creative agency websites are bloated with heavy JavaScript bundles, slow load times, and vague positioning copy that hides who is actually doing the work.",
    process: [
      {
        title: "Direct Visual Hierarchy & Fluid Typography",
        description: "Developed a human, conversational headline structure paired with fluid typography scales that automatically adapt across mobile, tablet, and ultra-wide screens without jarring layout shifts.",
        details: [
          "Curated distinct brand palette: Base Canvas (#E6E6E6) paired with deep Brand Navy (#2E4F94)",
          "Engineered animated CTA buttons with dual sliding arrows and hover circle expansion",
          "Structured service preview cards for Marketing Video, Logo & Brand Design, and Website Redesign"
        ]
      }
    ],
    aiWorkflow: "Leveraged rapid prototyping workflows to iterate through 15+ card compositions and font pairings in under 48 hours before writing production HTML and CSS.",
    outcomes: [
      { label: "Performance Score", value: "100", subtext: "Zero-framework vanilla architecture scoring 100 on Google PageSpeed" },
      { label: "Bundle Size", value: "< 50 KB", subtext: "Total CSS and JavaScript footprint for instantaneous initial load" }
    ],
    outcomeSummary: "Created a distinct, warm, and highly functional studio identity that establishes instant credibility and highlights the founding team's combined design and engineering strengths.",
    galleryImages: [
      {
        url: "/assets/projects/clandest-mockup.webp",
        caption: "Clandest Agency — Studio homepage showcasing brand, web development, and marketing video services",
        type: "desktop"
      },
      {
        url: "/assets/projects/clandest-services.webp",
        caption: "Services visual architecture — responsive card grid with fluid micro-interactions",
        type: "desktop"
      }
    ]
  },
  {
    id: "buildyourai-creatives",
    slug: "buildyourai-creatives",
    title: "BuildYourAI Creatives",
    category: "Brand Systems",
    status: "CASE STUDY",
    company: "BuildYourAI",
    client: "BuildYourAI Media & Growth",
    year: "2025 – 2026",
    duration: "Ongoing",
    scope: ["Social Design Systems", "Meta Ads", "Sales Enablement Collateral", "Executive Briefings", "LinkedIn Carousels", "YouTube Thumbnails", "Brand Identity"],
    summary: "Visual design, editorial layouts, multi-format Meta ad campaigns, and high-impact social content systems for BuildYourAI. Translates dense federal cybersecurity frameworks and AI governance guides into digestible executive briefing documents and viral LinkedIn carousels in close coordination with the enterprise sales team.",
    coverImage: "/assets/projects/buildyourai/buildyourai-creatives-cover.webp",
    liveUrl: null,
    tldr: {
      challenge: "Federal cybersecurity frameworks (NSA, CISA, FBI) are dense and impenetrable for mainstream technical buyers, while B2B AI products require high-trust marketing creatives across paid social and video channels.",
      role: "Lead Visual & Content Designer — collaborated directly with the enterprise sales team to develop executive lead magnets and sales enablement assets; designed full-funnel Meta ad suites and YouTube video packaging.",
      method: "Distilled multi-agency security guidance into plain-English checklists and 2-page briefing documents; engineered multi-format Meta ad creative suites (1:1 Feed, 9:16 Story/Reels, 16:9 Landscape) with clear benefit-driven messaging."
    },
    problem: "Public sector agencies and AI practitioners frequently deploy models on untrusted data without understanding data poisoning, supply-chain vulnerabilities, or model drift.",
    process: [
      {
        title: "Sales Coordination & Technical Deconstruction",
        description: "Coordinated directly with the enterprise sales team to address the top security objections from public sector buyers. Broke down joint cybersecurity guidance from NSA, CISA, FBI, NCSC, and ASD into accessible themes: business risks, affected audiences, lifecycle threats, and actionable checklists.",
        details: [
          "Curated trusted agency seals and authority badges for high credibility",
          "Engineered a simple 6-phase lifecycle threat matrix pairing phases with specific threats and counter-measures",
          "Designed clean 4:5 vertical carousel slides optimized for LinkedIn mobile and desktop feed viewing",
          "Produced a companion 2-page executive briefing document used directly in enterprise sales meetings and follow-ups"
        ]
      },
      {
        title: "Multi-Format Meta Ads for BuildYourAI",
        description: "Built responsive Meta advertising creative packages for BuildYourAI across 1:1, 9:16, and 16:9 aspect ratios, testing visual contrast and direct conversion CTAs.",
        details: [
          "Adapted headline typography and key benefits ('Let AI Manage Your Fundraising Backend Work') for high mobile readability",
          "Optimized layout compositions for feed cards, vertical Stories/Reels, and landscape display banners",
          "Maintained consistent brand authority with the BuildYourAI gradient emblem and clean photographic art direction"
        ]
      }
    ],
    outcomes: [
      { label: "Sales Enablement", value: "Joint Collateral", subtext: "Developed in direct coordination with sales team to accelerate government buyer discovery" },
      { label: "Multi-Format Reach", value: "4:5, 1:1, 9:16, 16:9", subtext: "Full responsive coverage across LinkedIn, Meta Ads, and YouTube" }
    ],
    outcomeSummary: "Delivered an authoritative marketing and sales enablement design system that turns complex technical compliance and enterprise AI capabilities into compelling visual assets across LinkedIn, Meta paid media, and YouTube.",
    gallerySections: [
      {
        sectionTitle: "NSA/CISA AI Data Security Guide — LinkedIn Carousel & Briefing Document",
        sectionDescription: "Editorial carousel and executive 2-page briefing document translating the multi-agency AI data security guidance (NSA, CISA, FBI, NCSC, ASD) into executive takeaways, lifecycle threat matrices, and plain-English actionable checklists. Developed in close coordination with the enterprise sales team as an authoritative B2B lead generation asset.",
        documentUrl: "/assets/projects/buildyourai/byai-nsa-cisa-security-guide.pdf",
        documentTitle: "Why AI Security Starts with Data and Why NYC Agencies Should Care (2-Page Executive Security Guide)",
        carousels: [
          {
            title: "NSA/CISA AI Data Security Guide",
            description: "10-Step AI Data Security Checklist for Agencies & Enterprise Teams (7 slides)",
            documentUrl: "/assets/projects/buildyourai/byai-nsa-cisa-security-guide.pdf",
            documentTitle: "Why AI Security Starts with Data and Why NYC Agencies Should Care (2-Page Executive Security Guide)",
            slides: [
              {
                url: "/assets/projects/buildyourai/byai-nsa-cisa-01-cover.webp",
                caption: "Slide 01 — Cover: 10-Step NSA/CISA AI Data Security Checklist",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/buildyourai/byai-nsa-cisa-02-why-agencies-need-it.webp",
                caption: "Slide 02 — Why Government Agencies Need Data-Driven AI Security",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/buildyourai/byai-nsa-cisa-03-big-risks-audience.webp",
                caption: "Slide 03 — The Big Risks & Target Stakeholder Audience",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/buildyourai/byai-nsa-cisa-04-lifecycle-threats.webp",
                caption: "Slide 04 — AI Lifecycle & Threats Explained Simply",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/buildyourai/byai-nsa-cisa-05-checklist-part1.webp",
                caption: "Slide 05 — 10-Step NSA/CISA Data Security Checklist (Steps 1–4)",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/buildyourai/byai-nsa-cisa-06-checklist-part2.webp",
                caption: "Slide 06 — 10-Step NSA/CISA Data Security Checklist (Steps 5–10)",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/buildyourai/byai-nsa-cisa-07-consultation-cta.webp",
                caption: "Slide 07 — Executive Consultation Call & Next Steps CTA",
                type: "carousel",
                aspectRatio: "4/5"
              }
            ]
          }
        ],
        images: [
          {
            url: "/assets/projects/buildyourai/byai-nsa-cisa-01-cover.webp",
            caption: "Slide 01 — Cover: 10-Step NSA/CISA AI Data Security Checklist",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/buildyourai/byai-nsa-cisa-02-why-agencies-need-it.webp",
            caption: "Slide 02 — Why Government Agencies Need Data-Driven AI Security",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/buildyourai/byai-nsa-cisa-03-big-risks-audience.webp",
            caption: "Slide 03 — The Big Risks & Target Stakeholder Audience",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/buildyourai/byai-nsa-cisa-04-lifecycle-threats.webp",
            caption: "Slide 04 — AI Lifecycle & Threats Explained Simply",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/buildyourai/byai-nsa-cisa-05-checklist-part1.webp",
            caption: "Slide 05 — 10-Step NSA/CISA Data Security Checklist (Steps 1–4)",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/buildyourai/byai-nsa-cisa-06-checklist-part2.webp",
            caption: "Slide 06 — 10-Step NSA/CISA Data Security Checklist (Steps 5–10)",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/buildyourai/byai-nsa-cisa-07-consultation-cta.webp",
            caption: "Slide 07 — Executive Consultation Call & Next Steps CTA",
            type: "carousel",
            aspectRatio: "4/5"
          }
        ]
      },
      {
        sectionTitle: "BuildYourAI — Paid Meta Social Ad Creative",
        sectionDescription: "High-contrast square social ad creative for BuildYourAI, pairing clear benefit-led value propositions with high-conversion CTAs for social feeds.",
        images: [
          {
            url: "/assets/projects/buildyourai/byai-meta-ad-fundraising-1x1-feed.webp",
            caption: "Square Feed Ad (1:1) — 'Let AI manage your Fundraising Backend Work' targeted for Instagram & Facebook feeds",
            type: "mockup",
            aspectRatio: "1/1"
          }
        ]
      },
      {
        sectionTitle: "YouTube Video Thumbnails & Demo Showcases",
        sectionDescription: "High-CTR 16:9 thumbnail design system crafted for BuildYourAI's YouTube tutorials, live agent walkthroughs, and executive feature demonstrations, combining bold headline typography, brand gradient accents, and real dashboard mockups.",
        images: [
          {
            url: "/assets/projects/buildyourai/byai-yt-smart-shopper-insights.webp",
            caption: "Smart Shopper Insights — E-Commerce Customer Purchase Analytics demo thumbnail",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/buildyourai/byai-yt-ai-booking-agent-demo.webp",
            caption: "AI Booking Agent Demo — Voice agent and conversational scheduler walkthrough",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/buildyourai/byai-yt-ai-event-organizer.webp",
            caption: "AI Event Organizer — Dual-display administrative CMS and email workflow demo",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/buildyourai/byai-yt-automate-business-ops-control-tower.webp",
            caption: "Automate Business Ops — Control Tower enterprise suite overview with 3D metallic crest",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/buildyourai/byai-yt-bill-splitter-app-ep02.webp",
            caption: "Bill-Splitter App (Episode 02) — Product walkthrough and mobile utility showcase",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/buildyourai/byai-nsa-cisa-01-cover.webp",
        caption: "Slide 01 — Cover: 10-Step NSA/CISA AI Data Security Checklist",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/buildyourai/byai-nsa-cisa-02-why-agencies-need-it.webp",
        caption: "Slide 02 — Why Government Agencies Need Data-Driven AI Security",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/buildyourai/byai-nsa-cisa-03-big-risks-audience.webp",
        caption: "Slide 03 — The Big Risks & Target Stakeholder Audience",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/buildyourai/byai-nsa-cisa-04-lifecycle-threats.webp",
        caption: "Slide 04 — AI Lifecycle & Threats Explained Simply",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/buildyourai/byai-nsa-cisa-05-checklist-part1.webp",
        caption: "Slide 05 — 10-Step NSA/CISA Data Security Checklist (Steps 1–4)",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/buildyourai/byai-nsa-cisa-06-checklist-part2.webp",
        caption: "Slide 06 — 10-Step NSA/CISA Data Security Checklist (Steps 5–10)",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/buildyourai/byai-nsa-cisa-07-consultation-cta.webp",
        caption: "Slide 07 — Executive Consultation Call & Next Steps CTA",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-smart-shopper-insights.webp",
        caption: "Smart Shopper Insights — E-Commerce Customer Purchase Analytics demo thumbnail",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-ai-booking-agent-demo.webp",
        caption: "AI Booking Agent Demo — Voice agent and conversational scheduler walkthrough",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-ai-event-organizer.webp",
        caption: "AI Event Organizer — Dual-display administrative CMS and email workflow demo",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-automate-business-ops-control-tower.webp",
        caption: "Automate Business Ops — Control Tower enterprise suite overview with 3D metallic crest",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-bill-splitter-app-ep02.webp",
        caption: "Bill-Splitter App (Episode 02) — Product walkthrough and mobile utility showcase",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-meta-ad-fundraising-1x1-feed.webp",
        caption: "Square Feed Ad (1:1) — 'Let AI manage your Fundraising Backend Work' targeted for Instagram & Facebook feeds",
        type: "mockup",
        aspectRatio: "1/1"
      }
    ]
  },
  {
    id: "collabai-creatives",
    slug: "collabai-creatives",
    title: "CollabAI Creatives",
    category: "Brand Systems",
    status: "CASE STUDY",
    company: "CollabAI",
    client: "CollabAI Growth & Marketing",
    year: "2025 – 2026",
    duration: "Ongoing Series",
    scope: [
      "Social Design Systems",
      "LinkedIn Carousels",
      "Instagram Creatives",
      "Paid Social Ad Creatives",
      "Member Profile Banners",
      "B2B SaaS Pricing Teardowns",
      "Motion Video Reels",
      "Direct-Response Copywriting",
      "Product Marketing Strategy"
    ],
    summary: "B2B growth design system, viral LinkedIn and Instagram pricing teardown carousels, and high-converting vertical video reels created for CollabAI. Deconstructs enterprise SaaS per-seat pricing models against CollabAI's direct-API Control Tower, illustrating real cost savings, departmental custom AI agents, and self-hosted data ownership for agencies and growing teams.",
    coverImage: "/assets/projects/collabai/creatives/collabai-creatives-cover.webp",
    liveUrl: "https://controltower.collabai.software",
    tldr: {
      challenge: "Enterprise agencies are burdened by bloated $25/seat monthly chatbot subscriptions that charge for employee presence rather than actual token utilization. CollabAI needed high-contrast visual storytelling to prove 50–60% software cost savings while showcasing its multi-agent Control Tower capabilities.",
      role: "Lead Creative & Growth Designer — conceptualized the B2B pricing deconstruction narrative, designed custom 4:5 visual infographics (dual-gauge usage comparison, pricing pyramids), edited vertical video reels, and created direct conversion landing mockups.",
      method: "Engineered high-retention 4:5 vertical carousel slides combining stark cobalt-to-navy gradient backdrops, 3D metallic currency lockups, data-driven usage gauges, and product interface mockups, paired with high-tempo Meta video reels."
    },
    problem: "Most AI software marketing relies on vague buzzwords like 'unlock productivity' that fail to convince CFOs and agency founders. Agency leaders need transparent economic math: contrasting a 30-person team paying $9,000/year for generic chatbots against direct API access costing only $3,000–$4,000/year for custom departmental agents.",
    process: [
      {
        title: "Economic Deconstruction & Visual Metaphors",
        description: "Broke down the hidden financial trap of per-seat SaaS billing into immediate visual proof points.",
        details: [
          "Calculated real-world cost comparisons for a 30-person agency ($25/seat x 30 = $9,000/year vs $3,000–$4,000 API costs)",
          "Conceived the dual speedometer gauge metaphor to visually expose the unfairness of per-seat billing: a finance manager using AI twice a month pays the exact same fee as a content writer prompting 50 times a day",
          "Highlighted CollabAI's core architectural advantages: departmental custom AI employees, self-hosted data security, and full API control",
          "Crafted punchy takeaway badges: 'That's 50-60% less. And infinitely more capable.'"
        ]
      },
      {
        title: "4:5 Carousel Architecture for LinkedIn & Instagram",
        description: "Optimized aspect ratio, contrast hierarchy, and micro-hooks for maximum mobile feed scroll-stopping power.",
        details: [
          "Engineered 4:5 vertical canvas (819×1024) to occupy maximum screen real estate in mobile feeds",
          "Slide 01 Hook: Immediate pattern-interrupt headline with 3D currency stack and metallic executive avatar clusters",
          "Slide 02 Problem: Speedometer gauges visually demonstrating the presence-vs-usage economic disparity",
          "Slide 03 Solution: Side-by-side checklist demonstrating departmental custom AI agents and direct API savings",
          "Slide 04 Conversion: High-fidelity web and dashboard mockup driving qualified traffic directly to controltower.collabai.software"
        ]
      },
      {
        title: "Multi-Format Video & Paid Campaign Extension",
        description: "Extended the core value proposition into vertical 9:16 motion video reels for Instagram and Facebook.",
        details: [
          "Produced the Nonprofit AI Workflow Automation Reel, spotlighting free open-source dashboard automation and grant retrieval",
          "Produced the Black Friday Extended Offer Campaign Reel, driving urgency around $300 starter discounts and 20% pro tier savings",
          "Maintained consistent brand typography, neon cyan and deep cobalt color grading, and high-tempo beat synchronization"
        ]
      },
      {
        title: "Direct-Response Ads & Member Profile Branding",
        description: "Engineered high-converting 1:1 feed ad creatives and promotional LinkedIn profile banners for team advocates.",
        details: [
          "Developed 'Your Data, Your Servers, Your Control' feed ads featuring 3D holographic security shield lockups and compliance proofs (SOC 2, HIPAA, GDPR)",
          "Executed the disruptive 'Like Ch*tGPT, but we can't see your chats' privacy campaign tailored for financial modeling and academic research contexts",
          "Designed the Black Friday Sale 20% Off member LinkedIn profile banner, establishing visual alignment across employee networks during peak promotional windows"
        ]
      }
    ],
    outcomes: [
      { label: "Cost Transparency", value: "50–60% Savings", subtext: "Clear financial contrast of $9k/yr per-seat vs $3k–$4k direct API costs" },
      { label: "Campaign Ecosystem", value: "Carousels, Ads & Reels", subtext: "15 carousel slides, 4 paid feed ads, 1 member banner, and 2 video reels" },
      { label: "Data Sovereignty", value: "Zero-Logging Focus", subtext: "High-contrast positioning on behind-firewall security and data privacy" }
    ],
    outcomeSummary: "Turned complex SaaS pricing mechanics into an authoritative, viral social campaign that directly positions CollabAI Control Tower as the financially superior, enterprise-grade alternative to generic per-seat chatbot subscriptions.",
    gallerySections: [
      {
        sectionTitle: "Social Media Carousel Campaigns (LinkedIn & Instagram)",
        sectionDescription: "High-retention 4:5 vertical carousels deconstructing SaaS per-seat pricing math, data sovereignty, agency workflows, and white-glove onboarding for mobile feeds.",
        carousels: [
          {
            title: "Campaign 01: The Real Cost of AI",
            description: "B2B per-seat pricing teardown vs direct API costs (4 slides)",
            slides: [
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-01-real-cost-of-ai.webp",
                caption: "Slide 01 — Hook: The Real Cost of AI for a 30-Person Agency ($25/seat = $9,000/year for generic chatbots).",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-02-per-seat-model-dilemma.webp",
                caption: "Slide 02 — Problem: The Per-Seat Model Charges for Presence, Not Usage (Dual-gauge speedometers).",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-03-control-tower-advantage.webp",
                caption: "Slide 03 — Solution: CollabAI Control Tower Direct API Access ($3k–$4k/yr, 50–60% less, custom departmental AI).",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-04-control-tower-cta.webp",
                caption: "Slide 04 — CTA & Product Demo: Visit controltower.collabai.software with live dashboard mockup.",
                type: "carousel",
                aspectRatio: "4/5"
              }
            ]
          },
          {
            title: "Campaign 02: Paying Rent on AI vs Owning It",
            description: "Data sovereignty & behind-your-firewall infrastructure (4 slides)",
            slides: [
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b2-01-paying-rent-on-ai.webp",
                caption: "Slide 01 — Hook: Your Agency Is Paying Rent on AI. Here's How to Own It Instead (Holographic OpenAI, Jasper, Copy.ai logos).",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b2-02-hidden-costs-data-leakage.webp",
                caption: "Slide 02 — The Reality: $7,500/year on seats, unencrypted prompt routing through third-party servers, and generic tools.",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b2-03-own-your-ai-control-tower.webp",
                caption: "Slide 03 — The Alternative: Custom AI employees running on your server, using your API keys, behind your firewall.",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b2-04-we-install-it-cta.webp",
                caption: "Slide 04 — Instant Setup CTA: 'We Install It. You Build AI Employees in Minutes' directing to controltower.collabai.software.",
                type: "carousel",
                aspectRatio: "4/5"
              }
            ]
          },
          {
            title: "Campaign 03: 15-Minute Zero-Pitch Walkthrough",
            description: "Friction-free calendar booking & high-trust inbound proof (4 slides)",
            slides: [
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b3-01-15min-walkthrough-hook.webp",
                caption: "Slide 01 — Target Audience Hook: '15-min walkthroughs for Digital Marketing & Software Agencies' with multi-monitor developer setup.",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b3-02-agency-pain-points-qualification.webp",
                caption: "Slide 02 — Qualification Checklist: 4 core agency criteria (tool costs, server security, custom workforce, per-seat elimination).",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b3-03-no-pitch-decks-live-demo.webp",
                caption: "Slide 03 — Friction Elimination: 'No Pitch Decks. No Long Intros. Just a live 15-min walkthrough' with desktop monitor mockup.",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b3-04-right-fit-trust-cta.webp",
                caption: "Slide 04 — Radically Honest Trust CTA: 'If It's Not the Right Fit, We'll Tell You' directing to controltower.collabai.software.",
                type: "carousel",
                aspectRatio: "4/5"
              }
            ]
          },
          {
            title: "Campaign 04: 'We\'re Marketers, Not Engineers'",
            description: "Objection handling, white-glove setup & edge support (3 slides)",
            slides: [
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b4-01-marketers-not-engineers-hook.webp",
                caption: "Slide 01 — Objection Hook: 'We're Marketers, Not Engineers...' — The #1 objection agencies have to self-hosted AI.",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b4-02-full-service-onboarding-steps.webp",
                caption: "Slide 02 — Process: 'Here's What We Do for You' (Server selection, installation, workflow setup, multi-LLM API keys).",
                type: "carousel",
                aspectRatio: "4/5"
              },
              {
                url: "/assets/projects/collabai/creatives/collabai-carousel-b4-03-self-hosted-without-headaches-cta.webp",
                caption: "Slide 03 — Division of Labor & CTA: 'Self-Hosted AI Without the Self-Hosting Headaches' + Ongoing Edge-Support Included.",
                type: "carousel",
                aspectRatio: "4/5"
              }
            ]
          }
        ],
        images: [
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-01-real-cost-of-ai.webp",
            caption: "Campaign 01: Slide 01 — The Real Cost of AI for a 30-Person Agency ($25/seat = $9,000/year for generic chatbots).",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-02-per-seat-model-dilemma.webp",
            caption: "Campaign 01: Slide 02 — Problem: The Per-Seat Model Charges for Presence, Not Usage (Dual-gauge speedometers).",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-03-control-tower-advantage.webp",
            caption: "Campaign 01: Slide 03 — Solution: CollabAI Control Tower Direct API Access ($3k–$4k/yr, 50–60% less, custom departmental AI).",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-04-control-tower-cta.webp",
            caption: "Campaign 01: Slide 04 — CTA & Product Demo: Visit controltower.collabai.software with live dashboard mockup.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b2-01-paying-rent-on-ai.webp",
            caption: "Campaign 02: Slide 01 — Hook: Your Agency Is Paying Rent on AI. Here's How to Own It Instead.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b2-02-hidden-costs-data-leakage.webp",
            caption: "Campaign 02: Slide 02 — The Reality: $7,500/year on seats, unencrypted prompt routing through third-party servers.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b2-03-own-your-ai-control-tower.webp",
            caption: "Campaign 02: Slide 03 — The Alternative: Custom AI employees running on your server, behind your firewall.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b2-04-we-install-it-cta.webp",
            caption: "Campaign 02: Slide 04 — Instant Setup CTA: 'We Install It. You Build AI Employees in Minutes'.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b3-01-15min-walkthrough-hook.webp",
            caption: "Campaign 03: Slide 01 — Target Audience Hook: '15-min walkthroughs for Digital Marketing & Software Agencies'.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b3-02-agency-pain-points-qualification.webp",
            caption: "Campaign 03: Slide 02 — Qualification Checklist: 4 core agency criteria.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b3-03-no-pitch-decks-live-demo.webp",
            caption: "Campaign 03: Slide 03 — Friction Elimination: 'No Pitch Decks. No Long Intros. Just a live 15-min walkthrough'.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b3-04-right-fit-trust-cta.webp",
            caption: "Campaign 03: Slide 04 — Radically Honest Trust CTA: 'If It's Not the Right Fit, We'll Tell You'.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b4-01-marketers-not-engineers-hook.webp",
            caption: "Campaign 04: Slide 01 — Objection Hook: 'We're Marketers, Not Engineers...' — The #1 objection agencies have to self-hosted AI.",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b4-02-full-service-onboarding-steps.webp",
            caption: "Campaign 04: Slide 02 — Process: 'Here's What We Do for You' (Server selection, installation, workflow setup).",
            type: "carousel",
            aspectRatio: "4/5"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-carousel-b4-03-self-hosted-without-headaches-cta.webp",
            caption: "Campaign 04: Slide 03 — Division of Labor & CTA: 'Self-Hosted AI Without the Self-Hosting Headaches'.",
            type: "carousel",
            aspectRatio: "4/5"
          }
        ]
      },
      {
        sectionTitle: "Direct-Response Paid Ads & Privacy Creatives",
        sectionDescription: "High-conversion 1:1 feed advertisements targeting enterprise founders and operators, focusing on behind-your-firewall data infrastructure and absolute privacy guarantees.",
        images: [
          {
            url: "/assets/projects/collabai/creatives/collabai-ad-01-your-data-servers-control-shield.webp",
            caption: "Paid Social Ad — 'Your Data, Your Servers, Your Control': Self-Hosted AI Agents That Never Leave Your Infrastructure",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-ad-02-enterprise-firewall-features-demo.webp",
            caption: "Enterprise Features & Demo CTA — 'Deploy Enterprise AI Behind Your Firewall': SOC 2, HIPAA & GDPR Compliance, Custom Access Controls & Book a Demo",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-ad-03-chatgpt-privacy-finance-home.webp",
            caption: "Privacy Positioning Ad — 'Like Ch*tGPT, But We Can't See Your Chats': Confidential Financial, Tax & Accounting Workflows",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-ad-04-chatgpt-privacy-research-library.webp",
            caption: "Privacy Positioning Ad — 'Like Ch*tGPT, But We Can't See Your Chats': Secure Academic & Deep Corporate Research",
            type: "desktop",
            aspectRatio: "1/1"
          }
        ]
      },
      {
        sectionTitle: "Promotional Campaigns & Member Profile Banners",
        sectionDescription: "Digital brand amplification assets and LinkedIn profile banners created for team members and brand advocates to drive seasonal conversion during high-impact promotions.",
        images: [
          {
            url: "/assets/projects/collabai/creatives/collabai-ad-05-black-friday-sales-offer.webp",
            caption: "CollabAI Black Friday Sales Ad — 'Supercharge Your Team with Collab AI': 20% Off Limited Time Offer (Up to $400 Off)",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/collabai/creatives/collabai-banner-black-friday-linkedin-profile.webp",
            caption: "CollabAI Black Friday Sale — Member LinkedIn Profile Banner (20% Off Limited Time Offer)",
            type: "desktop",
            aspectRatio: "4/1"
          }
        ]
      },
      {
        sectionTitle: "High-Impact Video Reels & Paid Social Campaigns",
        sectionDescription: "Vertical 9:16 motion video reels driving product education, feature adoption, and promotional conversions across Meta channels.",
        images: [
          {
            url: "/assets/projects/reels/reel-10-collabai-nonprofit-ai.webp",
            caption: "CollabAI Nonprofit AI Video Reel (9:16) — Dynamic vertical product walkthrough highlighting free open-source AI workflow automation, board reporting, and grant tracking.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F791352226744510%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/791352226744510"
          },
          {
            url: "/assets/projects/reels/reel-11-collabai-black-friday-sale.webp",
            caption: "CollabAI Black Friday Extended Offer Reel (9:16) — Urgency-driven SaaS promotional motion ad promoting $300 off Starter and 20% off Pro plans with dynamic typography and brand motion.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1836781190301543%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/1836781190301543"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-01-real-cost-of-ai.webp",
        caption: "Slide 01 — The Real Cost of AI for a 30-Person Agency",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-02-per-seat-model-dilemma.webp",
        caption: "Slide 02 — Per-Seat Model Charges for Presence, Not Usage",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-03-control-tower-advantage.webp",
        caption: "Slide 03 — CollabAI Control Tower Direct API Access",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-04-control-tower-cta.webp",
        caption: "Slide 04 — Visit controltower.collabai.software",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b2-01-paying-rent-on-ai.webp",
        caption: "Slide 01 — Your Agency Is Paying Rent on AI",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b2-02-hidden-costs-data-leakage.webp",
        caption: "Slide 02 — Here's What That Actually Looks Like",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b2-03-own-your-ai-control-tower.webp",
        caption: "Slide 03 — CollabAI Control Tower: Build Custom AI Employees",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b2-04-we-install-it-cta.webp",
        caption: "Slide 04 — We Install It. You Build AI Employees in Minutes",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b3-01-15min-walkthrough-hook.webp",
        caption: "Slide 01 — 15-Min Walkthroughs of CollabAI Control Tower",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b3-02-agency-pain-points-qualification.webp",
        caption: "Slide 02 — Are You Thinking About... (Agency Qualification)",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b3-03-no-pitch-decks-live-demo.webp",
        caption: "Slide 03 — No Pitch Decks. No Long Intros. Just Live Demo",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b3-04-right-fit-trust-cta.webp",
        caption: "Slide 04 — If It's Not the Right Fit, We'll Tell You (CTA)",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b4-01-marketers-not-engineers-hook.webp",
        caption: "Slide 01 — We're Marketers, Not Engineers (Objection Hook)",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b4-02-full-service-onboarding-steps.webp",
        caption: "Slide 02 — Here's What We Do for You (Full-Service Setup)",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-carousel-b4-03-self-hosted-without-headaches-cta.webp",
        caption: "Slide 03 — Self-Hosted AI Without the Self-Hosting Headaches",
        type: "carousel",
        aspectRatio: "4/5"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-ad-01-your-data-servers-control-shield.webp",
        caption: "Paid Social Ad — Your Data, Your Servers, Your Control (Self-Hosted Infrastructure)",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-ad-02-enterprise-firewall-features-demo.webp",
        caption: "Enterprise Features & Demo CTA — Deploy Enterprise AI Behind Your Firewall",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-ad-03-chatgpt-privacy-finance-home.webp",
        caption: "Privacy Positioning Ad — Like Ch*tGPT, But We Can't See Your Chats (Finance & Accounting)",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-ad-04-chatgpt-privacy-research-library.webp",
        caption: "Privacy Positioning Ad — Like Ch*tGPT, But We Can't See Your Chats (Academic & Research)",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-ad-05-black-friday-sales-offer.webp",
        caption: "CollabAI Black Friday Sales Ad — Supercharge Your Team (Up to $400 Off)",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/collabai/creatives/collabai-banner-black-friday-linkedin-profile.webp",
        caption: "CollabAI Black Friday Sale — Member LinkedIn Profile Banner",
        type: "desktop",
        aspectRatio: "4/1"
      },
      {
        url: "/assets/projects/reels/reel-10-collabai-nonprofit-ai.webp",
        caption: "CollabAI Nonprofit AI Product Automation Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F791352226744510%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/791352226744510"
      },
      {
        url: "/assets/projects/reels/reel-11-collabai-black-friday-sale.webp",
        caption: "CollabAI Black Friday Extended Offer Campaign Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1836781190301543%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/1836781190301543"
      }
    ]
  },
  {
    id: "social-media-greetings",
    slug: "social-media-greetings",
    title: "Social Media Greetings",
    category: "Brand Systems",
    status: "LIVE",
    company: "SJ Innovation",
    client: "SJ Innovation LLC",
    year: "2025 – Present",
    duration: "Ongoing Series",
    scope: ["Social Media Creative", "Event Greetings", "Visual Identity", "Vector Illustration", "Digital Painting", "Photo Manipulation", "Brand Systems"],
    summary: "Multi-format social media greeting creatives and commemorative visual campaigns designed for SJ Innovation. Features distinct thematic visual directions—from flat vector storytelling and expressive digital brushwork to archival photo composites—celebrating global holidays, cultural milestones, and company events with brand consistency.",
    coverImage: "/assets/projects/social-greetings/social-media-greetings-cover.webp",
    liveUrl: null,
    tldr: {
      challenge: "Corporate social greetings often fall into generic stock templates. The goal was to establish elevated, custom-crafted visual directions for SJ Innovation across global observances that reflect the company's creative identity and technological edge.",
      role: "Sole Designer — conceptualized, illustrated, and produced creative suites across diverse artistic mediums (vector, painterly, photo composite, and high-contrast silhouette) under SJ Innovation's brand guidelines.",
      method: "Developed modular thematic series starting with Martin Luther King Jr. Day, exploring five distinct aesthetic expressions while preserving brand recognition through consistent typography, logo lockups, and color harmony."
    },
    problem: "Most B2B tech companies treat commemorative holiday posts as an afterthought, relying on repetitive stock vectors that dilute brand presence. SJ Innovation required high-craft, original commemorative designs that honor each occasion's cultural significance while reinforcing the brand's design standards.",
    process: [
      {
        title: "Multi-Disciplinary Artistic Explorations",
        description: "Instead of settling on a single visual formula, explored multiple artistic languages—vector geometry, digital impasto brushwork, double-exposure photo compositing, and monochromatic silhouette—to give each commemorative greeting distinct emotion and visual weight.",
        details: [
          "Vector Narrative: Constructed flat geometry with crowd silhouetting to emphasize solidarity and unity",
          "Expressive Brushwork: Layered digital oil strokes with cobalt and gold accents to evoke historical gravitas",
          "Archival Photomontage: Blended authentic historic photographs with duotone gradients and subtle typographic watermarks",
          "High-Contrast Silhouette: Stripped away extraneous detail for a stark, black-and-white visual focused purely on the iconic podium posture"
        ]
      },
      {
        title: "Brand Lockup & Scalable System Architecture",
        description: "Integrated SJ Innovation's 'AI First Solutions' corporate identity and consistent typography across diverse illustrative styles, ensuring instant brand recall in social feeds.",
        details: [
          "Created flexible 1:1 square compositions optimized for LinkedIn, Twitter/X, and Instagram feeds",
          "Designed extensible section architecture to accommodate upcoming international holidays, cultural observances, and internal milestones",
          "Balanced prominent historical quote excerpts with clean title hierarchies for maximum readability on mobile displays"
        ]
      }
    ],
    outcomes: [
      { label: "Artistic Mediums", value: "5 Directions", subtext: "Vector, painterly, photo composite, color-blocked, & silhouette" },
      { label: "Occasion Series", value: "Modular", subtext: "Scalable architecture designed for recurring international events" }
    ],
    outcomeSummary: "Created an elevated commemorative visual system for SJ Innovation that transforms holiday posts into bespoke artistic statements, elevating social feed engagement and reinforcing design excellence.",
    gallerySections: [
      {
        sectionTitle: "Social Media Greetings & Commemorative Visuals",
        sectionDescription: "Multi-direction commemorative visual suites and creative explorations designed for SJ Innovation across global holidays, cultural milestones, and company events. Explore each event's curated visual directions in interactive carousels.",
        carousels: [
          {
            title: "Martin Luther King Jr. Day — Visual Explorations",
            description: "Five distinct creative interpretations honoring the legacy of Dr. Martin Luther King Jr. for SJ Innovation. Each direction explores a unique artistic medium—from flat vector community storytelling to expressive digital oil paint and dramatic silhouette lighting.",
            slides: [
              {
                url: "/assets/projects/social-greetings/mlk-day/mlk-day-01-vector-podium.webp",
                caption: "Direction 01 — Vector Illustration & Community Solidarity: Flat vector composition capturing Dr. King at the podium surrounded by an engaged audience.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/mlk-day/mlk-day-02-warm-photo-composite.webp",
                caption: "Direction 02 — Archival Photo Composite: Warm amber & cobalt blue dual-tone photo manipulation with historic speech excerpt typography.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/mlk-day/mlk-day-03-geometric-portrait.webp",
                caption: "Direction 03 — Color-Blocked Pop-Art Portrait: Modernist faceted vector study with vibrant terracotta, azure, and deep obsidian blocks.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/mlk-day/mlk-day-04-oil-paint-portrait.webp",
                caption: "Direction 04 — Expressive Digital Brushwork: Impasto oil painting style featuring energetic cobalt and gold stroke texturing.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/mlk-day/mlk-day-05-black-white-silhouette.webp",
                caption: "Direction 05 — High-Contrast Monochrome Silhouette: Minimalist stark silhouette with atmospheric spotlighting and 'I Have A Dream' typography.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Pohela Boishakh — Bangla New Year 1433",
            description: "Five vibrant creative interpretations celebrating Pohela Boishakh (Bangla New Year 1433) for SJ Innovation. Explores traditional Bengali folk art motifs—from earthen pottery, marigolds, and pinwheels to the iconic Mangal Shobhajatra owl mask and sculpted heritage musical instruments—rendered in modern 3D and graphic compositions with bespoke Bengali typography.",
            slides: [
              {
                url: "/assets/projects/social-greetings/bangla-new-year/boishakh-01-clay-pot-alpana.webp",
                caption: "Direction 01 — Earthen Pot & Winnowing Fan: Traditional painted clay pitcher with marigolds, lit terracotta diya, woven bamboo kula, and floor alpana.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/bangla-new-year/boishakh-02-pinwheels-chorki.webp",
                caption: "Direction 02 — Boishakhi Fair Pinwheels: Nostalgic paper wind spinners against clear azure skies, evoking rural festival childhood memories.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/bangla-new-year/boishakh-03-mangal-owl-mask.webp",
                caption: "Direction 03 — Mangal Shobhajatra Owl Motif: Stylized UNESCO-recognized folk owl mask framed by delicate white border alpana on an amber-blue gradient.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/bangla-new-year/boishakh-04-3d-cultural-motifs.webp",
                caption: "Direction 04 — Floating Folk Celebration: 3D dynamic festival composition with folk dholak drums, ektara, traditional masks, clay pots, and sweets.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/bangla-new-year/boishakh-05-heritage-musical-ensemble.webp",
                caption: "Direction 05 — Classical Folk Instruments & Peacock: Sculpted 3D floral medallion framed by harmonium, bansuri flutes, dhol, dotara, and peacock.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Eid al-Fitr Mubarak — Festive Visual Suites",
            description: "Five distinct creative directions celebrating Eid al-Fitr for SJ Innovation. Explores themes of fraternal unity, sacred architectural watercolor washes, photorealistic 3D marble minarets, atmospheric dusk lantern photography, and ornate laser-cut Islamic geometric filigree.",
            slides: [
              {
                url: "/assets/projects/social-greetings/eid-al-fitr/eid-01-fraternal-embrace.webp",
                caption: "Direction 01 — Fraternal Unity & Kolakuli: Stylized vector illustration of traditional fraternal embrace framed by archways and hanging glass lanterns.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-fitr/eid-02-watercolor-mosque-skyline.webp",
                caption: "Direction 02 — Watercolor Mosque Architecture: Expressive saffron and cobalt watercolor wash capturing domes and minarets under the crescent moon.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-fitr/eid-03-3d-marble-minaret-twilight.webp",
                caption: "Direction 03 — 3D Sculpted White Marble Mosque: Photorealistic architectural rendering of a grand marble dome and minaret at golden dusk.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-fitr/eid-04-lantern-in-hand-nightfall.webp",
                caption: "Direction 04 — Hand-Held Fanous at Dusk: Cinematic photographic study of a glowing vintage brass lantern against a starry twilight indigo sky.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-fitr/eid-05-filigree-gold-crescent.webp",
                caption: "Direction 05 — Laser-Cut Gold Filigree Crescent (Hilal): Intricate geometric Islamic star lattice crescent moon glowing against a dusk horizon.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Happy Easter — Spring Celebration Suites",
            description: "Five playful and refined creative directions celebrating Easter for SJ Innovation. Explores themes of minimalist bunny silhouettes, tactile close-up bunny ears, 3D branded glossy eggs, decorative porcelain flat-lays, and papercraft floral aperture cutouts.",
            slides: [
              {
                url: "/assets/projects/social-greetings/easter/easter-01-minimalist-bunny-silhouette.webp",
                caption: "Direction 01 — Minimalist Archway Silhouette: Serene arch window silhouette of an Easter bunny surrounded by delicate foliage against a starry blue sky.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/easter/easter-02-fluffy-bunny-ears.webp",
                caption: "Direction 02 — Tactile Bunny Ears & Sky: Playful macro close-up of soft white rabbit ears against a tranquil blue sky with flowing calligraphy.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/easter/easter-03-3d-patterned-eggs.webp",
                caption: "Direction 03 — 3D Glossy Patterned Eggs: Three glossy porcelain eggs rendered in signature cobalt, vibrant orange, and white with polka dots and ribbons.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/easter/easter-04-ceramic-egg-flatlay.webp",
                caption: "Direction 04 — Hand-Painted Ceramic Flat-Lay: High-angle flat-lay frame featuring patterned decorative porcelain eggs with floral and radial geometric motifs.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/easter/easter-05-spring-blooms-cutout.webp",
                caption: "Direction 05 — Papercraft Spring Floral Cutout: Egg-shaped papercraft aperture revealing fresh daisies and a bright yellow daffodil blooming against an azure sky.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/easter/easter-06-bunny-flower-egg-silhouette.webp",
                caption: "Direction 06 — Easter Egg Floral Silhouette: Minimalist egg silhouette framed with spring daisies and a rabbit silhouette holding an orange blossom.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Happy Holi — Festival of Colors",
            description: "Four dynamic and festive creative directions celebrating Holi for SJ Innovation. Highlights organic herbal gulal powder bowls, outdoor action captures of hands pouring saffron powder, large-scale campus courtyard floor rangoli mandalas, and high-energy dual-tone explosive powder collisions.",
            slides: [
              {
                url: "/assets/projects/social-greetings/holi/holi-01-powder-bowls-trio.webp",
                caption: "Direction 01 — Trio of Organic Gulal Bowls: High-contrast studio still featuring rustic bowls heaped with vibrant orange, royal cobalt blue, and pure white gulal powder.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/holi/holi-02-hands-pouring-gulal.webp",
                caption: "Direction 02 — Hands Pouring Saffron Gulal: Dynamic outdoor action photography capturing colored hands pouring saffron powder against a joyful festival crowd.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/holi/holi-03-campus-rangoli-mandala.webp",
                caption: "Direction 03 — Campus Courtyard Rangoli & Gulal: Intricate white floor rangoli mandala on campus grounds in front of SJ Innovation's building, framed by colorful powders.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/holi/holi-04-explosive-powder-splash.webp",
                caption: "Direction 04 — Dual-Tone Explosive Powder Collision: High-energy kinetic splash of blazing orange and electric cobalt blue powder dust with textured chalk lettering.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Independence Day of Bangladesh — 26 March",
            description: "Three solemn and monumental creative directions commemorating Bangladesh's Independence Day for SJ Innovation. Features geometric vector representations of the National Martyrs' Memorial (Jatiyo Smriti Soudho), monumental freedom fighter silhouettes with soaring peace doves, and dramatic low-angle perspective photography.",
            slides: [
              {
                url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-01-smriti-soudho-vector.webp",
                caption: "Direction 01 — National Martyrs' Memorial Vector: Geometric flat vector illustration of the Jatiyo Smriti Soudho at Savar with brick concourses, green foliage, and the fluttering flag.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-02-freedom-fighters-silhouette.webp",
                caption: "Direction 02 — Freedom Fighters & Fluttering Flag: Monumental silhouette of three heroic freedom fighters holding the national flag aloft with soaring white peace doves.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-03-monument-perspective-sky.webp",
                caption: "Direction 03 — Low-Angle Concrete Monolith Perspective: Dramatic low-angle perspective photography of the Smriti Soudho concrete pylons piercing the clouds.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "International Day of Happiness — 20 March",
            description: "Three uplifting creative directions celebrating International Day of Happiness for SJ Innovation. Explores executive thought-leadership quote cards from leadership, tactile 3D crafted smiley characters surrounded by floating emoji gems, and a whimsical cinematic street-food hamster celebrating unpretentious everyday joy.",
            slides: [
              {
                url: "/assets/projects/social-greetings/day-of-happiness/happiness-01-executive-quote-card.webp",
                caption: "Direction 01 — Executive Thought-Leadership Card: Minimalist social card featuring Shahed Islam (@shahednyc, CEO of SJ Innovation) on choosing happiness as a mindset.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/day-of-happiness/happiness-02-knitted-smiley-tactile.webp",
                caption: "Direction 02 — Tactile Knitted Smiley Sphere: Cozy macro still of a handcrafted yellow knitted smiley character with fuzzy pom-pom cheeks and floating emoji gems.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/day-of-happiness/happiness-03-hamster-street-snack.webp",
                caption: "Direction 03 — Whimsical Hamster Street Joy: Playful and heartwarming cinematic capture of a cheerful hamster wearing a yellow bucket hat holding a street-food skewer, celebrating pure everyday happiness.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "International Women's Day — 8 March",
            description: "Three vibrant and empowering creative directions celebrating International Women's Day for SJ Innovation. Explores 3D sculpted floral bouquets cradled in hands, overhead circles of solidarity celebrating teamwork, and an energetic multicultural group portrait of diverse women.",
            slides: [
              {
                url: "/assets/projects/social-greetings/womens-day/womens-day-01-cradled-blossoms-3d.webp",
                caption: "Direction 01 — Cradled Spring Flora: 3D sculpted hands gently cradling a blooming bouquet of daisies and vibrant blossoms against a pastel gradient.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/womens-day/womens-day-02-hands-together-solidarity.webp",
                caption: "Direction 02 — Circle of Diverse Hands: Overhead circle of women's hands joining together in solidarity, empowerment, and collaborative strength.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/womens-day/womens-day-03-diverse-women-portrait.webp",
                caption: "Direction 03 — Multicultural Women Portrait: Celebratory ensemble portrait of diverse women across different cultures and walks of life against a vibrant fuchsia backdrop.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "International Mother Language Day — 21 February",
            description: "Three poignant creative directions honoring the 1952 Language Movement and International Mother Language Day for SJ Innovation. Features a majestic sunrise over the Central Shaheed Minar with floating Bengali typography, archival historical photography of the 1952 protest procession with illuminated neon placards, and a minimalist modern tribute with ethereal vertical light pillars, glowing sun disc, and subtle floating Bengali script.",
            slides: [
              {
                url: "/assets/projects/social-greetings/mother-language-day/language-day-01-shaheed-minar-sunrise.webp",
                caption: "Direction 01 — Central Shaheed Minar at Golden Dawn: Monumental architectural view of the Central Shaheed Minar against a glowing sunrise with floating Bengali alphabets.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/mother-language-day/language-day-02-1952-movement-neon-placards.webp",
                caption: "Direction 02 — Historic 1952 Procession & Neon Placards: Gritty archival photography of the historic Language Movement procession with glowing neon typography on protest placards.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/mother-language-day/language-day-03-light-pillars-sun-disc.webp",
                caption: "Direction 03 — Luminous Shaheed Minar Light Beams & Sun Disc: Minimalist modern composition of vertical pillars of light evoking the Shaheed Minar surrounding a warm orange sun disc, crowned by subtle floating Bengali alphabets.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "International May Day — 1 May",
            description: "Three compelling creative directions commemorating International Workers' Day for SJ Innovation. Explores high-contrast architectural labor silhouettes, a 3D isometric toolkit bridging manual craftsmanship with modern computing, and a contemporary tech developer workstation against urban skyline scaffolding.",
            slides: [
              {
                url: "/assets/projects/social-greetings/may-day/mayday-01-construction-silhouettes.webp",
                caption: "Direction 01 — Structural Labor Silhouettes: High-contrast blue vector illustration honoring building construction workers, jackhammers, and structural scaffolding.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/may-day/mayday-02-digital-physical-tools.webp",
                caption: "Direction 02 — Digital & Physical Craft Toolkit: 3D floating composition bridging manual and digital labor—keyboard, mouse, wrench, hard hat, hammer, and blueprints.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/may-day/mayday-03-modern-engineer-scaffolding.webp",
                caption: "Direction 03 — Tech Engineering & Infrastructure: Contemporary visual narrative showing a software engineer working across multi-screen telemetry dashboards with architectural cranes.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Ramadan Mubarak — Sacred Reflections",
            description: "Two warm and heartwarming creative directions celebrating the holy month of Ramadan for SJ Innovation. Highlights communal Iftar traditions of sharing fresh dates at golden sunset, and a joyful 3D animated Muslim family gathered around the Iftar dining table.",
            slides: [
              {
                url: "/assets/projects/social-greetings/ramadan/ramadan-01-iftar-sharing-dates.webp",
                caption: "Direction 01 — Sharing Dates at Golden Hour Iftar: Warm, communal 3D render of hands reaching together to share fresh Medjool dates and water against a golden sunset and mosque dome.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/ramadan/ramadan-02-family-iftar-table-3d.webp",
                caption: "Direction 02 — 3D Family Iftar Table: Whimsical, warm 3D animated Muslim family gathered around a circular dining table breaking fast with dates and fresh fruit on soft clouds.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/ramadan/ramadan-03-iftar-feast-archway.webp",
                caption: "Direction 03 — Archway Iftar Feast & Henna: Atmospheric Iftar spread viewed through an Islamic arch with hanging lanterns, showing hands reaching for fresh dates, salads, and juices.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Republic Day of India — 26 January (गणतंत्र दिवस)",
            description: "Three majestic creative directions commemorating Republic Day of India for SJ Innovation. Features historic red sandstone vector silhouettes of the Red Fort (Lal Qila) in Delhi, golden hour architectural photography of Mughal ramparts, and monumental flowing Tiranga tricolor drapes framing the fort courtyard.",
            slides: [
              {
                url: "/assets/projects/social-greetings/india-republic-day/republic-day-01-red-fort-sunset-vector.webp",
                caption: "Direction 01 — Red Fort Dusk Silhouette Vector: Architectural vector illustration of the iconic Red Fort (Lal Qila) in Delhi under a warm sunset sky.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/india-republic-day/republic-day-02-red-fort-sandstone-monolith.webp",
                caption: "Direction 02 — Red Sandstone Ramparts & Golden Hour: Majestic low-angle photography of the Mughal red sandstone fort towers and domes basking in golden hour light.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/india-republic-day/republic-day-03-tricolor-drapes-red-fort.webp",
                caption: "Direction 03 — Grand Tricolor Flag Drapes: Dramatic architectural vista of the Red Fort adorned with monumental flowing Indian Tiranga tricolor drapes and mandalas.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "US Memorial Day — In Memory of the Fallen",
            description: "Three solemn and dignified commemorative visual directions honoring fallen service members for SJ Innovation. Explores a textural American flag honor roll of names, a poignant white marble cemetery cross adorned with fresh tulips and a miniature flag, and military buglers playing Taps against a silent field of inscribed heroes.",
            slides: [
              {
                url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-01-stars-stripes-fallen-roll.webp",
                caption: "Direction 01 — Roll of the Fallen & Stars and Stripes: Somber commemoration displaying the waving American flag texture overlaid with thousands of inscribed names of fallen service members.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-02-cross-headstone-tulips.webp",
                caption: "Direction 02 — Honored Glory Memorial Cross: Low-angle perspective of a pristine white marble cemetery cross inscribed 'Here rests in honored glory a comrade in arms known but to God', accompanied by vibrant tulips and an American flag under summer skies.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-03-taps-bugler-names.webp",
                caption: "Direction 03 — Taps Bugler Silhouette & Honor Roll: Poignant silhouette of military buglers playing Taps against a deep navy field filled with thousands of names of fallen heroes, framed by a waving American flag.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Independence Day of India — 15 August (स्वतंत्रता दिवस)",
            description: "Three stirring creative directions celebrating India's Independence Day for SJ Innovation. Spans majestic air force flypasts trailing saffron, white, and green tricolor plumes over India Gate, an impressionist watercolor architectural wash, and a heroic bronze monument of soldiers raising the Tiranga.",
            slides: [
              {
                url: "/assets/projects/social-greetings/india-independence-day/india-independence-01-india-gate-flypast.webp",
                caption: "Direction 01 — India Gate Air Force Flypast: Iconic low-angle view of the sandstone India Gate with three fighter jets streaking across the sky leaving vivid saffron, white, and green smoke plumes.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/india-independence-day/india-independence-02-watercolor-india-gate.webp",
                caption: "Direction 02 — Watercolor India Gate & Sun Disc: Artistic watercolor wash of the India Gate framed by a radiant golden solar disc, birds in flight, and trees rendered in tricolor saffron and blue pigment blooms.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/india-independence-day/india-independence-03-soldier-monument-tricolor.webp",
                caption: "Direction 03 — Patriotic Soldier Memorial & Jet Formation: Heroic bronze statues of soldiers raising the Indian national flag atop a stone plinth, echoed by a V-formation of fighter jets releasing tricolor trails.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Father's Day — Celebrating Guidance & Love",
            description: "Seven heartwarming and modern creative directions honoring Father's Day for SJ Innovation. Explores themes of gentle guidance, superhero mentorship, playful building, and shared outdoor moments—from minimalist hand-in-hand silhouettes and piggyback joy to building block collaboration and watercolor tree swing reflections.",
            slides: [
              {
                url: "/assets/projects/social-greetings/fathers-day/fathers-day-01-holding-hands-minimalist.webp",
                caption: "Direction 01 — Gentle Guiding Hands: Minimalist high-contrast vector silhouette of a parent's blue hand tenderly holding a toddler's orange hands in trust and safety.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/fathers-day/fathers-day-02-piggyback-silhouette.webp",
                caption: "Direction 02 — Piggyback Silhouette & Pure Joy: Dynamic blue silhouette of a joyful father carrying his cheering son on his shoulders against a soft gradient sky.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/fathers-day/fathers-day-03-superhero-capes.webp",
                caption: "Direction 03 — Everyday Superheroes: Stylized vector illustration of a father and young daughter wearing superhero capes, holding hands as they gaze forward together.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/fathers-day/fathers-day-04-baby-holding-finger.webp",
                caption: "Direction 04 — Tiny Grip, Lifelong Bond: Intimate illustrated close-up of a newborn infant's tiny hand holding firmly onto a father's finger against soft azure stripes.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/fathers-day/fathers-day-05-mountain-sunrise-summit.webp",
                caption: "Direction 05 — Mountain Summit Sunrise: Inspiring landscape illustration of father and daughter silhouetted on a mountain peak at dawn, looking toward endless horizons.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/fathers-day/fathers-day-06-building-blocks-overhead.webp",
                caption: "Direction 06 — Building Together with Blocks: Top-down composition capturing father and child assembling vibrant blue, orange, and white interlocking bricks on a pristine white work surface.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/fathers-day/fathers-day-07-watercolor-tree-swing.webp",
                caption: "Direction 07 — Watercolor Sunset Tree Swing: Nostalgic blue watercolor silhouette of a father pushing his laughing child on a rope swing beneath a grand tree during a golden orange sunset.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "International Programmer's Day — Code, Innovation & Craft",
            description: "Three electrifying creative directions celebrating International Programmer's Day for SJ Innovation. Spans floating glowing glassmorphic tech stack icons, a cinematic dual-screen late-night development setup with AI aura, and a futuristic Creation of Adam motif symbolizing the synergy between human developers and AI.",
            slides: [
              {
                url: "/assets/projects/social-greetings/programmers-day/programmers-day-01-floating-tech-icons.webp",
                caption: "Direction 01 — Floating Glassmorphic Tech Stack: Cinematic dark frame featuring a developer's hand surrounded by orbiting neon-accented glass icons representing HTML, CSS, JavaScript, terminal, Git, and database architectures.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/programmers-day/programmers-day-02-night-coder-dual-monitors.webp",
                caption: "Direction 02 — Late-Night Flow & AI Energy Aura: Atmospheric nocturnal perspective of a software engineer at a dual-monitor workstation radiating electric blue and amber illumination while architecting custom AI software.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/programmers-day/programmers-day-03-cyborg-human-code-touch.webp",
                caption: "Direction 03 — Human-AI Synergy & Creation Touch: Futuristic 'Creation of Adam' homage showing a sleek robotic hand and human fingertip converging upon glowing 3D code brackets.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Eid al-Adha Mubarak — Sacred Traditions & Devotion",
            description: "Five elevated creative directions celebrating Eid al-Adha (1447 H) for SJ Innovation. Explores architectural grand mosques under vivid saffron skies, the sacred low-poly summit of Mount Arafat with celestial mandala linework, dual-tone watercolor minaret silhouettes, twilight coastal cityscapes, and historic Islamic keyhole archways overlooking golden sunset horizons.",
            slides: [
              {
                url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-01-blue-mosque-orange-sky.webp",
                caption: "Direction 01 — Architectural Grandeur & Twilight Horizon: Dramatic Sultanahmet / Blue Mosque minarets set against a fiery sunset and crescent moon.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-02-mount-arafat-mandala-twilight.webp",
                caption: "Direction 02 — Sacred Mount Arafat & Celestial Mandala: Geometric low-poly summit of Jabal al-Rahmah bathed in twilight violet, framed by a starry sky and subtle sacred geometry.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-03-watercolor-mosque-silhouette.webp",
                caption: "Direction 03 — Expressive Watercolor Silhouette: Dual-tone saffron and cobalt blue watercolor wash forming an ethereal mosque skyline on textured off-white paper.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-04-modern-coastal-skyline-mosque.webp",
                caption: "Direction 04 — Modern Coastal Metascape: Contemporary mosque and illuminated crescent moon against a panoramic waterfront skyline and palm-lined promenade.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-05-archway-sunset-crescent.webp",
                caption: "Direction 05 — Ornate Keyhole Arch & Golden Sunset: Intricate arabesque stone archway framing a glowing golden dusk over an ancient domed city.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-01-warm-amber-archway.webp",
                caption: "2025 Series: Direction 01 — Warm Amber Archway & Hanging Lanterns: Multi-domed mosque silhouette in warm amber glowing through an arched window with starry blue skies.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-02-ice-blue-mosque-silhouette.webp",
                caption: "2025 Series: Direction 02 — Minimalist Ice Blue Keyhole Archway: Pristine white mosque silhouette framed by an ornate Moroccan keyhole arch with crescent moon and hanging star pendants.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-03-twilight-gradient-minarets.webp",
                caption: "2025 Series: Direction 03 — Twilight Minaret Skyline & Illuminated Crescent: Multi-layered architectural mosque silhouette against a vivid sunset-to-indigo gradient with illuminated portals and delicate hanging stars.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "International Men's Day — Celebrating Guidance & Quiet Strength (19 November)",
            description: "Two sleek social media commemorative directions designed for International Men's Day honoring dedication, mentorship, and quiet strength. Features modern sartorial styling with tailored suits, polka-dot neckties, collar adjustment gestures, subtle male gender symbol watermarks, and playful mustache emblems integrated into typography.",
            slides: [
              {
                url: "/assets/projects/social-greetings/international-mens-day-social.webp",
                caption: "Direction 01 — Modern Sartorial Silhouette: Deep cobalt blue styling with tailored suit lapel, orange polka-dot necktie, and custom mustache typography.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/international-mens-day-02-orange-suit-tie-adjustment.webp",
                caption: "Direction 02 — Vibrant Suit & Tie Adjustment: High-energy electric blue and warm orange composition featuring a tailored suit, crisp collar adjustment gesture, mustache emblem, and official SJ Innovation branding.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "US Veteran's Day — Honoring All Who Served (11 November)",
            description: "Solemn and patriotic commemorative visual suite honoring US military veterans. Explores three powerful visual directions: a waving American flag over an illuminated sunburst sky, a double-exposure officer silhouette with circular flag shield, and a high-contrast tactical squad rendering honors on a dawn ridge.",
            slides: [
              {
                url: "/assets/projects/social-greetings/veterans-day-social.webp",
                caption: "Direction 01 — Waving American Flag & Saluting Soldiers: Majestic rippling flag canopy over a sunburst deep navy sky with five-star insignia and tactical soldier silhouettes.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/veterans-day-02-saluting-officer-shield.webp",
                caption: "Direction 02 — Saluting Officer & Circular Flag Shield: Double-exposure cutout of a saluting officer framing an infantry soldier on an American flag shield.",
                type: "carousel",
                aspectRatio: "1/1"
              },
              {
                url: "/assets/projects/social-greetings/veterans-day-03-squad-salute-ridge.webp",
                caption: "Direction 03 — Tactical Squad on Morning Ridge: High-contrast silhouette of five soldiers rendering honors and holding perimeter watch against radiating morning sunbeams.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          },
          {
            title: "Executive Thought Leadership & Op-Ed Campaigns (NYC AI Policy)",
            description: "High-impact social media campaign creative promoting an executive op-ed co-authored by Shahed Islam (CEO, SJ Innovation) and Tom Grech (CEO, Queens Chamber of Commerce). Highlights AI's transformative impact on New York City and advocates for forward-thinking, inclusive municipal AI policymaking.",
            slides: [
              {
                url: "/assets/projects/social-greetings/events/event-nyc-ai-policy-oped-shahed-grech.webp",
                caption: "Executive Op-Ed Creative — 'AI is Shaping the Future of New York City, But Policy Must Evolve With It' featuring glowing Empire State Building neural net and executive portraits.",
                type: "carousel",
                aspectRatio: "1/1"
              }
            ]
          }
        ],
        images: [
          {
            url: "/assets/projects/social-greetings/mlk-day/mlk-day-01-vector-podium.webp",
            caption: "Direction 01 — Vector Illustration & Community Solidarity: Flat vector composition capturing Dr. King at the podium surrounded by an engaged audience.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/mlk-day/mlk-day-02-warm-photo-composite.webp",
            caption: "Direction 02 — Archival Photo Composite: Warm amber & cobalt blue dual-tone photo manipulation with historic speech excerpt typography.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/mlk-day/mlk-day-03-geometric-portrait.webp",
            caption: "Direction 03 — Color-Blocked Pop-Art Portrait: Modernist faceted vector study with vibrant terracotta, azure, and deep obsidian blocks.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/mlk-day/mlk-day-04-oil-paint-portrait.webp",
            caption: "Direction 04 — Expressive Digital Brushwork: Impasto oil painting style featuring energetic cobalt and gold stroke texturing.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/mlk-day/mlk-day-05-black-white-silhouette.webp",
            caption: "Direction 05 — High-Contrast Monochrome Silhouette: Minimalist stark silhouette with atmospheric spotlighting and 'I Have A Dream' typography.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/bangla-new-year/boishakh-01-clay-pot-alpana.webp",
            caption: "Direction 01 — Earthen Pot & Winnowing Fan: Traditional painted clay pitcher with marigolds, lit terracotta diya, woven bamboo kula, and floor alpana.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/bangla-new-year/boishakh-02-pinwheels-chorki.webp",
            caption: "Direction 02 — Boishakhi Fair Pinwheels: Nostalgic paper wind spinners against clear azure skies, evoking rural festival childhood memories.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/bangla-new-year/boishakh-03-mangal-owl-mask.webp",
            caption: "Direction 03 — Mangal Shobhajatra Owl Motif: Stylized UNESCO-recognized folk owl mask framed by delicate white border alpana on an amber-blue gradient.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/bangla-new-year/boishakh-04-3d-cultural-motifs.webp",
            caption: "Direction 04 — Floating Folk Celebration: 3D dynamic festival composition with folk dholak drums, ektara, traditional masks, clay pots, and sweets.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/bangla-new-year/boishakh-05-heritage-musical-ensemble.webp",
            caption: "Direction 05 — Classical Folk Instruments & Peacock: Sculpted 3D floral medallion framed by harmonium, bansuri flutes, dhol, dotara, and peacock.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-fitr/eid-01-fraternal-embrace.webp",
            caption: "Direction 01 — Fraternal Unity & Kolakuli: Stylized vector illustration of traditional fraternal embrace framed by archways and hanging glass lanterns.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-fitr/eid-02-watercolor-mosque-skyline.webp",
            caption: "Direction 02 — Watercolor Mosque Architecture: Expressive saffron and cobalt watercolor wash capturing domes and minarets under the crescent moon.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-fitr/eid-03-3d-marble-minaret-twilight.webp",
            caption: "Direction 03 — 3D Sculpted White Marble Mosque: Photorealistic architectural rendering of a grand marble dome and minaret at golden dusk.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-fitr/eid-04-lantern-in-hand-nightfall.webp",
            caption: "Direction 04 — Hand-Held Fanous at Dusk: Cinematic photographic study of a glowing vintage brass lantern against a starry twilight indigo sky.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-fitr/eid-05-filigree-gold-crescent.webp",
            caption: "Direction 05 — Laser-Cut Gold Filigree Crescent (Hilal): Intricate geometric Islamic star lattice crescent moon glowing against a dusk horizon.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/easter/easter-01-minimalist-bunny-silhouette.webp",
            caption: "Direction 01 — Minimalist Archway Silhouette: Serene arch window silhouette of an Easter bunny surrounded by delicate foliage against a starry blue sky.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/easter/easter-02-fluffy-bunny-ears.webp",
            caption: "Direction 02 — Tactile Bunny Ears & Sky: Playful macro close-up of soft white rabbit ears against a tranquil blue sky with flowing calligraphy.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/easter/easter-03-3d-patterned-eggs.webp",
            caption: "Direction 03 — 3D Glossy Patterned Eggs: Three glossy porcelain eggs rendered in signature cobalt, vibrant orange, and white with polka dots and ribbons.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/easter/easter-04-ceramic-egg-flatlay.webp",
            caption: "Direction 04 — Hand-Painted Ceramic Flat-Lay: High-angle flat-lay frame featuring patterned decorative porcelain eggs with floral and radial geometric motifs.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/easter/easter-05-spring-blooms-cutout.webp",
            caption: "Direction 05 — Papercraft Spring Floral Cutout: Egg-shaped papercraft aperture revealing fresh daisies and a bright yellow daffodil blooming against an azure sky.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/easter/easter-06-bunny-flower-egg-silhouette.webp",
            caption: "Direction 06 — Easter Egg Floral Silhouette: Minimalist egg silhouette framed with spring daisies and a rabbit silhouette holding an orange blossom.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/holi/holi-01-powder-bowls-trio.webp",
            caption: "Direction 01 — Trio of Organic Gulal Bowls: High-contrast studio still featuring rustic bowls heaped with vibrant orange, royal cobalt blue, and pure white gulal powder.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/holi/holi-02-hands-pouring-gulal.webp",
            caption: "Direction 02 — Hands Pouring Saffron Gulal: Dynamic outdoor action photography capturing colored hands pouring saffron powder against a joyful festival crowd.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/holi/holi-03-campus-rangoli-mandala.webp",
            caption: "Direction 03 — Campus Courtyard Rangoli & Gulal: Intricate white floor rangoli mandala on campus grounds in front of SJ Innovation's building, framed by colorful powders.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/holi/holi-04-explosive-powder-splash.webp",
            caption: "Direction 04 — Dual-Tone Explosive Powder Collision: High-energy kinetic splash of blazing orange and electric cobalt blue powder dust with textured chalk lettering.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-01-smriti-soudho-vector.webp",
            caption: "Direction 01 — National Martyrs' Memorial Vector: Geometric flat vector illustration of the Jatiyo Smriti Soudho at Savar with brick concourses, green foliage, and the fluttering flag.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-02-freedom-fighters-silhouette.webp",
            caption: "Direction 02 — Freedom Fighters & Fluttering Flag: Monumental silhouette of three heroic freedom fighters holding the national flag aloft with soaring white peace doves.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-03-monument-perspective-sky.webp",
            caption: "Direction 03 — Low-Angle Concrete Monolith Perspective: Dramatic low-angle perspective photography of the Smriti Soudho concrete pylons piercing the clouds.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/day-of-happiness/happiness-01-executive-quote-card.webp",
            caption: "Direction 01 — Executive Thought-Leadership Card: Minimalist social card featuring Shahed Islam (@shahednyc, CEO of SJ Innovation) on choosing happiness as a mindset.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/day-of-happiness/happiness-02-knitted-smiley-tactile.webp",
            caption: "Direction 02 — Tactile Knitted Smiley Sphere: Cozy macro still of a handcrafted yellow knitted smiley character with fuzzy pom-pom cheeks and floating emoji gems.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/day-of-happiness/happiness-03-hamster-street-snack.webp",
            caption: "Direction 03 — Whimsical Hamster Street Joy: Playful and heartwarming cinematic capture of a cheerful hamster wearing a yellow bucket hat holding a street-food skewer, celebrating pure everyday happiness.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/womens-day/womens-day-01-cradled-blossoms-3d.webp",
            caption: "Direction 01 — Cradled Spring Flora: 3D sculpted hands gently cradling a blooming bouquet of daisies and vibrant blossoms against a pastel gradient.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/womens-day/womens-day-02-hands-together-solidarity.webp",
            caption: "Direction 02 — Circle of Diverse Hands: Overhead circle of women's hands joining together in solidarity, empowerment, and collaborative strength.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/womens-day/womens-day-03-diverse-women-portrait.webp",
            caption: "Direction 03 — Multicultural Women Portrait: Celebratory ensemble portrait of diverse women across different cultures and walks of life against a vibrant fuchsia backdrop.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/mother-language-day/language-day-01-shaheed-minar-sunrise.webp",
            caption: "Direction 01 — Central Shaheed Minar at Golden Dawn: Monumental architectural view of the Central Shaheed Minar against a glowing sunrise with floating Bengali alphabets.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/mother-language-day/language-day-02-1952-movement-neon-placards.webp",
            caption: "Direction 02 — Historic 1952 Procession & Neon Placards: Gritty archival photography of the historic Language Movement procession with glowing neon typography on protest placards.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/mother-language-day/language-day-03-light-pillars-sun-disc.webp",
            caption: "Direction 03 — Luminous Shaheed Minar Light Beams & Sun Disc: Minimalist modern composition of vertical pillars of light evoking the Shaheed Minar surrounding a warm orange sun disc, crowned by subtle floating Bengali alphabets.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/may-day/mayday-01-construction-silhouettes.webp",
            caption: "Direction 01 — Structural Labor Silhouettes: High-contrast blue vector illustration honoring building construction workers, jackhammers, and structural scaffolding.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/may-day/mayday-02-digital-physical-tools.webp",
            caption: "Direction 02 — Digital & Physical Craft Toolkit: 3D floating composition bridging manual and digital labor—keyboard, mouse, wrench, hard hat, hammer, and blueprints.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/may-day/mayday-03-modern-engineer-scaffolding.webp",
            caption: "Direction 03 — Tech Engineering & Infrastructure: Contemporary visual narrative showing a software engineer working across multi-screen telemetry dashboards with architectural cranes.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/ramadan/ramadan-01-iftar-sharing-dates.webp",
            caption: "Direction 01 — Sharing Dates at Golden Hour Iftar: Warm, communal 3D render of hands reaching together to share fresh Medjool dates and water against a golden sunset and mosque dome.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/ramadan/ramadan-02-family-iftar-table-3d.webp",
            caption: "Direction 02 — 3D Family Iftar Table: Whimsical, warm 3D animated Muslim family gathered around a circular dining table breaking fast with dates and fresh fruit on soft clouds.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/ramadan/ramadan-03-iftar-feast-archway.webp",
            caption: "Direction 03 — Archway Iftar Feast & Henna: Atmospheric Iftar spread viewed through an Islamic arch with hanging lanterns, showing hands reaching for fresh dates, salads, and juices.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/india-republic-day/republic-day-01-red-fort-sunset-vector.webp",
            caption: "Direction 01 — Red Fort Dusk Silhouette Vector: Architectural vector illustration of the iconic Red Fort (Lal Qila) in Delhi under a warm sunset sky.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/india-republic-day/republic-day-02-red-fort-sandstone-monolith.webp",
            caption: "Direction 02 — Red Sandstone Ramparts & Golden Hour: Majestic low-angle photography of the Mughal red sandstone fort towers and domes basking in golden hour light.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/india-republic-day/republic-day-03-tricolor-drapes-red-fort.webp",
            caption: "Direction 03 — Grand Tricolor Flag Drapes: Dramatic architectural vista of the Red Fort adorned with monumental flowing Indian Tiranga tricolor drapes and mandalas.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-01-stars-stripes-fallen-roll.webp",
            caption: "Direction 01 — Roll of the Fallen & Stars and Stripes: Somber commemoration displaying the waving American flag texture overlaid with thousands of inscribed names of fallen service members.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-02-cross-headstone-tulips.webp",
            caption: "Direction 02 — Honored Glory Memorial Cross: Low-angle perspective of a pristine white marble cemetery cross inscribed 'Here rests in honored glory a comrade in arms known but to God', accompanied by vibrant tulips and an American flag under summer skies.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-03-taps-bugler-names.webp",
            caption: "Direction 03 — Taps Bugler Silhouette & Honor Roll: Poignant silhouette of military buglers playing Taps against a deep navy field filled with thousands of names of fallen heroes, framed by a waving American flag.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/india-independence-day/india-independence-01-india-gate-flypast.webp",
            caption: "Direction 01 — India Gate Air Force Flypast: Iconic low-angle view of the sandstone India Gate with three fighter jets streaking across the sky leaving vivid saffron, white, and green smoke plumes.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/india-independence-day/india-independence-02-watercolor-india-gate.webp",
            caption: "Direction 02 — Watercolor India Gate & Sun Disc: Artistic watercolor wash of the India Gate framed by a radiant golden solar disc, birds in flight, and trees rendered in tricolor saffron and blue pigment blooms.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/india-independence-day/india-independence-03-soldier-monument-tricolor.webp",
            caption: "Direction 03 — Patriotic Soldier Memorial & Jet Formation: Heroic bronze statues of soldiers raising the Indian national flag atop a stone plinth, echoed by a V-formation of fighter jets releasing tricolor trails.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/fathers-day/fathers-day-01-holding-hands-minimalist.webp",
            caption: "Direction 01 — Gentle Guiding Hands: Minimalist high-contrast vector silhouette of a parent's blue hand tenderly holding a toddler's orange hands in trust and safety.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/fathers-day/fathers-day-02-piggyback-silhouette.webp",
            caption: "Direction 02 — Piggyback Silhouette & Pure Joy: Dynamic blue silhouette of a joyful father carrying his cheering son on his shoulders against a soft gradient sky.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/fathers-day/fathers-day-03-superhero-capes.webp",
            caption: "Direction 03 — Everyday Superheroes: Stylized vector illustration of a father and young daughter wearing superhero capes, holding hands as they gaze forward together.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/fathers-day/fathers-day-04-baby-holding-finger.webp",
            caption: "Direction 04 — Tiny Grip, Lifelong Bond: Intimate illustrated close-up of a newborn infant's tiny hand holding firmly onto a father's finger against soft azure stripes.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/fathers-day/fathers-day-05-mountain-sunrise-summit.webp",
            caption: "Direction 05 — Mountain Summit Sunrise: Inspiring landscape illustration of father and daughter silhouetted on a mountain peak at dawn, looking toward endless horizons.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/fathers-day/fathers-day-06-building-blocks-overhead.webp",
            caption: "Direction 06 — Building Together with Blocks: Top-down composition capturing father and child assembling vibrant blue, orange, and white interlocking bricks on a pristine white work surface.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/fathers-day/fathers-day-07-watercolor-tree-swing.webp",
            caption: "Direction 07 — Watercolor Sunset Tree Swing: Nostalgic blue watercolor silhouette of a father pushing his laughing child on a rope swing beneath a grand tree during a golden orange sunset.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/programmers-day/programmers-day-01-floating-tech-icons.webp",
            caption: "Direction 01 — Floating Glassmorphic Tech Stack: Cinematic dark frame featuring a developer's hand surrounded by orbiting neon-accented glass icons representing HTML, CSS, JavaScript, terminal, Git, and database architectures.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/programmers-day/programmers-day-02-night-coder-dual-monitors.webp",
            caption: "Direction 02 — Late-Night Flow & AI Energy Aura: Atmospheric nocturnal perspective of a software engineer at a dual-monitor workstation radiating electric blue and amber illumination while architecting custom AI software.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/programmers-day/programmers-day-03-cyborg-human-code-touch.webp",
            caption: "Direction 03 — Human-AI Synergy & Creation Touch: Futuristic 'Creation of Adam' homage showing a sleek robotic hand and human fingertip converging upon glowing 3D code brackets.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-01-blue-mosque-orange-sky.webp",
            caption: "Direction 01 — Architectural Grandeur & Twilight Horizon: Dramatic Sultanahmet / Blue Mosque minarets set against a fiery sunset and crescent moon.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-02-mount-arafat-mandala-twilight.webp",
            caption: "Direction 02 — Sacred Mount Arafat & Celestial Mandala: Geometric low-poly summit of Jabal al-Rahmah bathed in twilight violet, framed by a starry sky and subtle sacred geometry.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-03-watercolor-mosque-silhouette.webp",
            caption: "Direction 03 — Expressive Watercolor Silhouette: Dual-tone saffron and cobalt blue watercolor wash forming an ethereal mosque skyline on textured off-white paper.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-04-modern-coastal-skyline-mosque.webp",
            caption: "Direction 04 — Modern Coastal Metascape: Contemporary mosque and illuminated crescent moon against a panoramic waterfront skyline and palm-lined promenade.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-05-archway-sunset-crescent.webp",
            caption: "Direction 05 — Ornate Keyhole Arch & Golden Sunset: Intricate arabesque stone archway framing a glowing golden dusk over an ancient domed city.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-01-warm-amber-archway.webp",
            caption: "2025 Series: Direction 01 — Warm Amber Archway & Hanging Lanterns: Multi-domed mosque silhouette in warm amber glowing through an arched window with starry blue skies.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-02-ice-blue-mosque-silhouette.webp",
            caption: "2025 Series: Direction 02 — Minimalist Ice Blue Keyhole Archway: Pristine white mosque silhouette framed by an ornate Moroccan keyhole arch with crescent moon and hanging star pendants.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-03-twilight-gradient-minarets.webp",
            caption: "2025 Series: Direction 03 — Twilight Minaret Skyline & Illuminated Crescent: Multi-layered architectural mosque silhouette against a vivid sunset-to-indigo gradient with illuminated portals and delicate hanging stars.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/international-mens-day-social.webp",
            caption: "Direction 01 — Modern Sartorial Silhouette: Deep cobalt blue styling with tailored suit lapel, orange polka-dot necktie, and custom mustache typography.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/international-mens-day-02-orange-suit-tie-adjustment.webp",
            caption: "Direction 02 — Vibrant Suit & Tie Adjustment: High-energy electric blue and warm orange composition featuring a tailored suit, crisp collar adjustment gesture, mustache emblem, and official SJ Innovation branding.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/veterans-day-social.webp",
            caption: "Direction 01 — Waving American Flag & Saluting Soldiers: Majestic rippling flag canopy over a sunburst deep navy sky with five-star insignia and tactical soldier silhouettes.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/veterans-day-02-saluting-officer-shield.webp",
            caption: "Direction 02 — Saluting Officer & Circular Flag Shield: Double-exposure cutout of a saluting officer framing an infantry soldier on an American flag shield.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/veterans-day-03-squad-salute-ridge.webp",
            caption: "Direction 03 — Tactical Squad on Morning Ridge: High-contrast silhouette of five soldiers rendering honors and holding perimeter watch against radiating morning sunbeams.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/social-greetings/events/event-nyc-ai-policy-oped-shahed-grech.webp",
            caption: "Executive Op-Ed Creative — 'AI is Shaping the Future of New York City, But Policy Must Evolve With It' featuring glowing Empire State Building neural net and executive portraits.",
            type: "carousel",
            aspectRatio: "1/1"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/social-greetings/mlk-day/mlk-day-01-vector-podium.webp",
        caption: "Direction 01 — Vector Illustration & Community Solidarity",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/mlk-day/mlk-day-02-warm-photo-composite.webp",
        caption: "Direction 02 — Archival Photo Composite",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/mlk-day/mlk-day-03-geometric-portrait.webp",
        caption: "Direction 03 — Color-Blocked Pop-Art Portrait",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/mlk-day/mlk-day-04-oil-paint-portrait.webp",
        caption: "Direction 04 — Expressive Digital Brushwork",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/mlk-day/mlk-day-05-black-white-silhouette.webp",
        caption: "Direction 05 — High-Contrast Monochrome Silhouette",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/bangla-new-year/boishakh-01-clay-pot-alpana.webp",
        caption: "Pohela Boishakh — Earthen Pot & Winnowing Fan",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/bangla-new-year/boishakh-02-pinwheels-chorki.webp",
        caption: "Pohela Boishakh — Boishakhi Fair Pinwheels",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/bangla-new-year/boishakh-03-mangal-owl-mask.webp",
        caption: "Pohela Boishakh — Mangal Shobhajatra Owl Motif",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/bangla-new-year/boishakh-04-3d-cultural-motifs.webp",
        caption: "Pohela Boishakh — Floating Folk Celebration",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/bangla-new-year/boishakh-05-heritage-musical-ensemble.webp",
        caption: "Pohela Boishakh — Classical Folk Instruments & Peacock",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-fitr/eid-01-fraternal-embrace.webp",
        caption: "Eid al-Fitr — Fraternal Unity & Kolakuli",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-fitr/eid-02-watercolor-mosque-skyline.webp",
        caption: "Eid al-Fitr — Watercolor Mosque Architecture",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-fitr/eid-03-3d-marble-minaret-twilight.webp",
        caption: "Eid al-Fitr — 3D Sculpted White Marble Mosque",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-fitr/eid-04-lantern-in-hand-nightfall.webp",
        caption: "Eid al-Fitr — Hand-Held Fanous at Dusk",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-fitr/eid-05-filigree-gold-crescent.webp",
        caption: "Eid al-Fitr — Laser-Cut Gold Filigree Crescent",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/easter/easter-01-minimalist-bunny-silhouette.webp",
        caption: "Easter — Minimalist Archway Silhouette",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/easter/easter-02-fluffy-bunny-ears.webp",
        caption: "Easter — Tactile Bunny Ears & Sky",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/easter/easter-03-3d-patterned-eggs.webp",
        caption: "Easter — 3D Glossy Patterned Eggs",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/easter/easter-04-ceramic-egg-flatlay.webp",
        caption: "Easter — Hand-Painted Ceramic Flat-Lay",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/easter/easter-05-spring-blooms-cutout.webp",
        caption: "Easter — Papercraft Spring Floral Cutout",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/easter/easter-06-bunny-flower-egg-silhouette.webp",
        caption: "Easter — Easter Egg Floral Silhouette",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/holi/holi-01-powder-bowls-trio.webp",
        caption: "Holi — Trio of Organic Gulal Bowls",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/holi/holi-02-hands-pouring-gulal.webp",
        caption: "Holi — Hands Pouring Saffron Gulal",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/holi/holi-03-campus-rangoli-mandala.webp",
        caption: "Holi — Campus Courtyard Rangoli & Gulal",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/holi/holi-04-explosive-powder-splash.webp",
        caption: "Holi — Dual-Tone Explosive Powder Collision",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-01-smriti-soudho-vector.webp",
        caption: "Independence Day — National Martyrs' Memorial Vector",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-02-freedom-fighters-silhouette.webp",
        caption: "Independence Day — Freedom Fighters & Fluttering Flag",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/bangladesh-independence-day/independence-03-monument-perspective-sky.webp",
        caption: "Independence Day — Low-Angle Concrete Monolith Perspective",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/day-of-happiness/happiness-01-executive-quote-card.webp",
        caption: "Day of Happiness — Executive Thought-Leadership Card",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/day-of-happiness/happiness-02-knitted-smiley-tactile.webp",
        caption: "Day of Happiness — Tactile Knitted Smiley Sphere",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/day-of-happiness/happiness-03-hamster-street-snack.webp",
        caption: "Day of Happiness — Whimsical Hamster Street Joy",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/womens-day/womens-day-01-cradled-blossoms-3d.webp",
        caption: "Women's Day — Cradled Spring Flora",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/womens-day/womens-day-02-hands-together-solidarity.webp",
        caption: "Women's Day — Circle of Diverse Hands",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/womens-day/womens-day-03-diverse-women-portrait.webp",
        caption: "Women's Day — Multicultural Women Portrait",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/mother-language-day/language-day-01-shaheed-minar-sunrise.webp",
        caption: "Mother Language Day — Central Shaheed Minar at Dawn",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/mother-language-day/language-day-02-1952-movement-neon-placards.webp",
        caption: "Mother Language Day — 1952 Procession & Neon Placards",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/mother-language-day/language-day-03-light-pillars-sun-disc.webp",
        caption: "Mother Language Day — Luminous Light Beams & Sun Disc",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/may-day/mayday-01-construction-silhouettes.webp",
        caption: "May Day — Structural Labor Silhouettes",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/may-day/mayday-02-digital-physical-tools.webp",
        caption: "May Day — Digital & Physical Craft Toolkit",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/may-day/mayday-03-modern-engineer-scaffolding.webp",
        caption: "May Day — Tech Engineering & Infrastructure",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/ramadan/ramadan-01-iftar-sharing-dates.webp",
        caption: "Ramadan — Sharing Dates at Golden Hour Iftar",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/ramadan/ramadan-02-family-iftar-table-3d.webp",
        caption: "Ramadan — 3D Family Iftar Table",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/ramadan/ramadan-03-iftar-feast-archway.webp",
        caption: "Ramadan — Archway Iftar Feast & Henna",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/india-republic-day/republic-day-01-red-fort-sunset-vector.webp",
        caption: "Republic Day of India — Red Fort Dusk Silhouette",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/india-republic-day/republic-day-02-red-fort-sandstone-monolith.webp",
        caption: "Republic Day of India — Red Sandstone Ramparts",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/india-republic-day/republic-day-03-tricolor-drapes-red-fort.webp",
        caption: "Republic Day of India — Grand Tricolor Flag Drapes",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-01-stars-stripes-fallen-roll.webp",
        caption: "US Memorial Day — Roll of the Fallen",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-02-cross-headstone-tulips.webp",
        caption: "US Memorial Day — Honored Glory Memorial Cross",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/us-memorial-day/memorial-day-03-taps-bugler-names.webp",
        caption: "US Memorial Day — Taps Bugler Silhouette & Honor Roll",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/india-independence-day/india-independence-01-india-gate-flypast.webp",
        caption: "Independence Day of India — India Gate Air Force Flypast",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/india-independence-day/india-independence-02-watercolor-india-gate.webp",
        caption: "Independence Day of India — Watercolor India Gate & Sun Disc",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/india-independence-day/india-independence-03-soldier-monument-tricolor.webp",
        caption: "Independence Day of India — Patriotic Soldier Memorial",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/fathers-day/fathers-day-01-holding-hands-minimalist.webp",
        caption: "Father's Day — Gentle Guiding Hands",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/fathers-day/fathers-day-02-piggyback-silhouette.webp",
        caption: "Father's Day — Piggyback Silhouette & Pure Joy",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/fathers-day/fathers-day-03-superhero-capes.webp",
        caption: "Father's Day — Everyday Superheroes",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/fathers-day/fathers-day-04-baby-holding-finger.webp",
        caption: "Father's Day — Tiny Grip, Lifelong Bond",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/fathers-day/fathers-day-05-mountain-sunrise-summit.webp",
        caption: "Father's Day — Mountain Summit Sunrise",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/fathers-day/fathers-day-06-building-blocks-overhead.webp",
        caption: "Father's Day — Building Together with Blocks",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/fathers-day/fathers-day-07-watercolor-tree-swing.webp",
        caption: "Father's Day — Watercolor Sunset Tree Swing",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/programmers-day/programmers-day-01-floating-tech-icons.webp",
        caption: "Programmer's Day — Floating Glassmorphic Tech Stack",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/programmers-day/programmers-day-02-night-coder-dual-monitors.webp",
        caption: "Programmer's Day — Late-Night Flow & AI Energy Aura",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/programmers-day/programmers-day-03-cyborg-human-code-touch.webp",
        caption: "Programmer's Day — Human-AI Synergy & Creation Touch",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-01-blue-mosque-orange-sky.webp",
        caption: "Eid al-Adha — Architectural Grandeur & Twilight Horizon",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-02-mount-arafat-mandala-twilight.webp",
        caption: "Eid al-Adha — Sacred Mount Arafat & Celestial Mandala",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-03-watercolor-mosque-silhouette.webp",
        caption: "Eid al-Adha — Expressive Watercolor Silhouette",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-04-modern-coastal-skyline-mosque.webp",
        caption: "Eid al-Adha — Modern Coastal Metascape",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-05-archway-sunset-crescent.webp",
        caption: "Eid al-Adha — Ornate Keyhole Arch & Golden Sunset",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-01-warm-amber-archway.webp",
        caption: "Eid al-Adha (2025) — Warm Amber Archway & Hanging Lanterns",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-02-ice-blue-mosque-silhouette.webp",
        caption: "Eid al-Adha (2025) — Minimalist Ice Blue Keyhole Archway",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/eid-al-adha/eid-adha-2025-03-twilight-gradient-minarets.webp",
        caption: "Eid al-Adha (2025) — Twilight Minaret Skyline & Illuminated Crescent",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/international-mens-day-social.webp",
        caption: "International Men's Day — Sartorial Silhouette Social Greeting",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/international-mens-day-02-orange-suit-tie-adjustment.webp",
        caption: "International Men's Day — Vibrant Suit & Tie Adjustment Social Greeting",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/veterans-day-social.webp",
        caption: "US Veteran's Day — Honoring All Who Served (Flag & Saluting Soldiers)",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/veterans-day-02-saluting-officer-shield.webp",
        caption: "US Veteran's Day — Saluting Officer & Circular Flag Shield",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/veterans-day-03-squad-salute-ridge.webp",
        caption: "US Veteran's Day — Tactical Squad on Dawn Ridge",
        type: "carousel"
      },
      {
        url: "/assets/projects/social-greetings/events/event-nyc-ai-policy-oped-shahed-grech.webp",
        caption: "Thought Leadership Event — NYC AI Policy Op-Ed (Shahed Islam & Tom Grech)",
        type: "carousel"
      }
    ]
  },
  {
    id: "aegis-credit-terminal",
    slug: "aegis-credit-terminal",
    title: "Aegis Credit Terminal Dashboard",
    category: "Enterprise Dashboards",
    status: "CASE STUDY",
    company: "Aegis Financial",
    client: "Aegis Credit Terminal Platform",
    year: "2025 – 2026",
    duration: "3 Months",
    scope: ["Financial UI", "Admin Console", "Role-Based Access Control", "Credit Intelligence", "Design Systems", "Figma Prototyping"],
    summary: "Comprehensive enterprise design system and administrative console for the Aegis Credit Terminal—an institutional debt intelligence and risk monitoring platform. Powers corporate credit onboarding, tiered role-based user management, live analyst debt pricing commentary, and macroeconomic sector news curation.",
    coverImage: "/assets/projects/aegis-terminal/aegis-credit-terminal-cover.webp",
    liveUrl: "https://annyxtopheles.github.io/aegis-credit-terminal/",
    tldr: {
      challenge: "Institutional credit operators and terminal administrators required a robust, distraction-free control console to manage multi-company onboarding, role-based analyst permissions, and real-time debt pricing and macroeconomic sector intelligence without operational latency.",
      role: "Lead Product Designer — conceptualized and engineered the complete dark-mode design system, administrative workflows, entity onboarding architecture, and editorial publishing console.",
      method: "Engineered high-density tabular user management layouts, collapsible accordion commentary workflows with draft-to-publish states, and structured metadata forms adhering to strict dark-mode contrast standards."
    },
    problem: "Credit surveillance platforms demand precision and rapid administrative turnaround. Institutional administrators juggle multi-entity corporate structures (e.g., Apex Brands Group, Chefs' Warehouse, Horizon Global), assigning granular roles (Company Admin, User) while simultaneously publishing market-moving debt pricing commentary, covenant compliance updates, and geopolitical risk assessments across tight reporting cycles.",
    process: [
      {
        title: "Enterprise Admin Console & Multi-Entity Management",
        description: "Architected the core administrative console allowing platform operators to manage company profiles, provision corporate administrators, and audit user access status.",
        details: [
          "Streamlined multi-company onboarding workflows with instant contact delegation and entity tagging",
          "High-clarity user administration table featuring status badges (Active, Pending) and role hierarchy tokens",
          "Persistent dark-theme UI with teal primary accents and slate secondary tones for sustained analyst focus"
        ]
      },
      {
        title: "Structured Commentary & Sector Intelligence Publishing",
        description: "Designed a modular editorial environment for credit analysts to author, stage, and publish real-time debt commentary and macroeconomic risk alerts.",
        details: [
          "Collapsible category drawers for Debt Pricing, Capital Structure, and Covenant Compliance with live publication timestamps",
          "Draft-to-Publish state toggles ensuring thorough review before pushing market intelligence to terminal subscribers",
          "Categorized sector news curation modules spanning Regulatory, Geopolitical, and Monetary Policy feeds"
        ]
      }
    ],
    aiWorkflow: "Leveraged Figma AI scripting and automated data populators to generate realistic multi-tranche financial datasets across 100+ simulated corporate issuers, cutting component stress-testing time in half.",
    outcomes: [
      { label: "Admin Workflow Efficiency", value: "+70%", subtext: "Faster company onboarding and user provisioning across institutional accounts" },
      { label: "Editorial Turnaround", value: "Instant", subtext: "Streamlined live commentary and sector risk publishing without developer intervention" },
      { label: "Design System", value: "100% Dark", subtext: "Ergonomic, high-contrast dark theme optimized for intensive financial terminal environments" }
    ],
    outcomeSummary: "Transformed institutional credit administration into a streamlined, high-efficiency command center, uniting multi-company user management with rapid market commentary and sector intelligence distribution.",
    gallerySections: [
      {
        sectionTitle: "Admin Console & Credit Intelligence Management",
        sectionDescription: "High-density administrative interfaces engineered for the Aegis Credit Terminal, enabling rapid company onboarding, granular user access control, analyst debt commentary, and macroeconomic risk curation.",
        images: [
          {
            url: "/assets/projects/aegis-terminal/aegis-admin-01-onboarding.webp",
            caption: "Admin Console — Add New Company & Corporate Entity Onboarding Workflow",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/aegis-terminal/aegis-admin-02-manage-users.webp",
            caption: "Admin Console — Role-Based User Management & Access Status Matrix",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/aegis-terminal/aegis-admin-03-credit-commentary.webp",
            caption: "Admin Console — Analyst Commentary Sections (Debt Pricing, Capital Structure & Covenant Compliance)",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/aegis-terminal/aegis-admin-04-sector-news.webp",
            caption: "Admin Console — Sector News & Commentary Publishing (Regulatory, Geopolitical & Policy Subsections)",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/aegis-terminal/aegis-admin-01-onboarding.webp",
        caption: "Admin Console — Add New Company & Corporate Entity Onboarding Workflow",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/aegis-terminal/aegis-admin-02-manage-users.webp",
        caption: "Admin Console — Role-Based User Management & Access Status Matrix",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/aegis-terminal/aegis-admin-03-credit-commentary.webp",
        caption: "Admin Console — Analyst Commentary Sections (Debt Pricing, Capital Structure & Covenant Compliance)",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/aegis-terminal/aegis-admin-04-sector-news.webp",
        caption: "Admin Console — Sector News & Commentary Publishing (Regulatory, Geopolitical & Policy Subsections)",
        type: "desktop",
        aspectRatio: "16/9"
      }
    ]
  },
  {
    id: "control-tower-products",
    slug: "control-tower-products",
    title: "Control Tower Products",
    category: "AI Systems",
    status: "SHIPPED",
    company: "SJ Innovation",
    client: "Internal & Enterprise Clients",
    year: "2025 – 2026",
    duration: "Ongoing",
    scope: [
      "Brand Identity & Logos",
      "Color System Strategy",
      "OpenGraph Systems",
      "Design System & Tokens",
      "ePhysician Medical UI",
      "Performance Ad Creatives"
    ],
    summary: "Full brand identity, custom logo marks, domain-specific color palettes, OpenGraph card architecture, and clinical UI design for 10+ vertical AI enterprise products—featuring ePhysician, Mortgage AI, HR Control Tower, Marketing Control Tower, and RealtorHelp.",
    coverImage: "/assets/projects/control-tower/og-ephysician-control-tower.webp",
    liveUrl: null,
    tldr: {
      challenge: "Launching 10+ domain-specific vertical AI enterprise products under the Control Tower umbrella without fracturing brand cohesion, while giving each product its own distinct industry identity, custom logo, color psychology, and high-conversion social preview system.",
      role: "Lead Product & Brand Designer — conceptualized and designed all logos from scratch, established the domain-specific color palettes, engineered the OpenGraph metadata visual systems, and designed the clinical dashboard UI and performance ad campaigns for ePhysician Control Tower.",
      method: "Created a unified design token architecture paired with individualized vertical identities: crafted bespoke vector logos for each industry, engineered high-contrast 1.91:1 OpenGraph card templates for social sharing, and built clinical front-desk workflows with companion B2B acquisition ads."
    },
    problem: "Each vertical required immediate credibility in its specific sector (e.g. medical compliance for ePhysician, financial security for Mortgage AI, corporate empathy for HR Control Tower, high growth for Marketing, and trusted real estate agility for RealtorHelp). A generic, one-size-fits-all corporate skin would fail to resonate with specialized industry buyers.",
    process: [
      {
        title: "Bespoke Logo Design & Domain Color Strategy",
        description: "Conceptualized and crafted unique vector marks and tailored color schemes for every Control Tower product to evoke instant domain authority.",
        details: [
          "ePhysician Control Tower: Cyan & clinical white with an EKG pulse wave logo conveying medical telemetry and life-support reliability",
          "Mortgage AI: Deep slate navy and emerald green with a geometric roofline mark symbolizing secure lending and rate lock vigilance",
          "HR Control Tower: Electric network blue with interconnected human figures symbolizing organizational talent retention and burnout prevention",
          "Marketing Control Tower: Deep royal violet with an upward momentum wave mark representing agency growth and multi-channel orchestration",
          "RealtorHelp.software: Sky azure with topographic contour lines and clean residential geometry representing 24/7 client responsiveness"
        ]
      },
      {
        title: "High-Conversion OpenGraph (OG) Visual System",
        description: "Standardized high-impact 1.91:1 (1200x630 standard) social preview cards for link sharing across LinkedIn, Twitter/X, and Slack, pairing benefit-led headlines with dual CTA buttons ('See It Live ->' / 'Book a Demo').",
        details: [
          "Micro-copy formulated around high-urgency pain points ('Never Miss Another Rate Lock', 'AI Spots the Burnout', '15 Leads. 2 Minutes. Done.')",
          "Subtle domain-specific background graphics (neural nets, topographic contours, medical hex grids, particle fields) ensuring visual depth",
          "Prominent product logo lockups with 'Powered by Collab AI' endorsement badges"
        ]
      },
      {
        title: "ePhysician Clinical Dashboard & Performance Ad Campaigns",
        description: "Engineered responsive dark and light mode clinical dashboards for ePhysician Control Tower, pairing automated reminder telemetry with persuasive paid social ad campaigns.",
        details: [
          "Addressed operational bottlenecks with high-impact headline copy: 'Stop Starting Your Day 40 Voicemails Deep'",
          "Showcased live clinical metrics: 86.3% response rates, automated insurance verification, and zero staff intervention",
          "Designed 3D hospital campus renders and 24/7 reception desk visuals communicating enterprise scalability"
        ]
      },
      {
        title: "NonProfit AI Campaign & Motion Product Reel",
        description: "Engineered multi-format paid social ad creatives and an interactive motion reel for NonProfit Control Tower (Powered by Collab AI), addressing operational pain points like donor record duplication, board reporting, and grant deadlines.",
        details: [
          "Developed persuasive visual hooks: 'Your Team Just Got 18 Hours Back This Week' and transparent price comparisons vs ChatGPT Enterprise",
          "Simulated live dashboard interfaces displaying donor pyramids, giving telemetry, and automated calendar alerts",
          "Produced a high-converting 9:16 motion walkthrough reel showcasing free open-source AI automation"
        ]
      }
    ],
    aiWorkflow: "Integrated Figma AI agents and prompt-driven scene composition to rapidly explore lighting moods and architectural 3D metaphors, finalizing vector logos and typography natively in Figma.",
    outcomes: [
      { label: "Products Branded", value: "10 Verticals", subtext: "ePhysician, Mortgage, HR, Marketing, Realtor, NonProfit, GHL, Client Success, Agency, & Restaurant" },
      { label: "Logos & Identities", value: "100% Custom", subtext: "Original brand marks and domain color palettes designed from scratch" },
      { label: "Assets Delivered", value: "21 Production Assets", subtext: "10 OpenGraph cards, 5 ePhysician ads, 5 NonProfit AI ads, & 1 video reel" }
    ],
    outcomeSummary: "Established a cohesive multi-product design ecosystem that empowered each Control Tower product to launch with bespoke brand identity, sector-specific authority, and high-converting marketing collateral.",
    gallerySections: [
      {
        sectionTitle: "Control Tower Products — OpenGraph & Brand Identity Systems",
        sectionDescription: "High-impact 1.91:1 OpenGraph metadata and social preview cards designed for each Control Tower product. All logos, branding colors, typography, and thematic backgrounds were designed from scratch by Sadman to establish sector-specific authority across healthcare, mortgage lending, human resources, marketing agencies, real estate, nonprofits, developer platforms, client success, and restaurant management.",
        images: [
          {
            url: "/assets/projects/control-tower/og-agency-control-tower.webp",
            caption: "Agency Control Tower (OG Card) — Faceted crown tower emblem, midnight cobalt theme, and 'Run Your Entire Agency from One Command Center' master lockup.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-ephysician-control-tower.webp",
            caption: "ePhysician Control Tower (OG Card) — Custom EKG pulse wave logo, clinical cyan palette, and 'Phone. Reminders. Check-in. Billing. All on autopilot.' headline.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-mortgage-ai.webp",
            caption: "Mortgage AI (OG Card) — Custom geometric house mark, emerald/slate color scheme, and 'Never Miss Another Rate Lock' benefit lockup.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-hr-control-tower.webp",
            caption: "HR Control Tower (OG Card) — Connected human figure logo, neural network blue gradient, and 'AI Spots the Burnout. You Keep the Talent.' copy.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-marketing-control-tower.webp",
            caption: "Marketing Control Tower (OG Card) — Ascending growth wave mark, royal violet ambient particles, and 'The AI Control Tower for Marketing Agencies' headline.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-realtorhelp-control-tower.webp",
            caption: "RealtorHelp.software (OG Card) — Residential icon, azure topographic contours, and 'AI writes every message. You decide what to send. 15 leads. 2 minutes. Done.' message.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-nonprofit-control-tower.webp",
            caption: "NonProfit AI Control Tower (OG Card) — Botanical spring green palette, brain-in-hand emblem, and 'One Intelligence Layer. Every System Connected. 16 AI Agents Working 24/7.' lockup.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-ghl-developer-control-tower.webp",
            caption: "GHL Developer Control Tower (OG Card) — Faceted gradient ribbon mark, neon cyan & purple constellation nodes, and 'Your Agency Command Center. All Clients. One Login.' headline.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-client-success-control-tower.webp",
            caption: "Client Success AI Control Tower (OG Card) — Circular target gauge emblem, warm amber gold theme, and 'Your Team's Day Planned before Coffee' value hook.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/control-tower/og-restaurant-ai-control-tower.webp",
            caption: "Restaurant AI Control Tower (OG Card) — Crossed cutlery gold mark, warm amber smoke & charcoal palette, and 'Monday 8AM. Your AI Brief is Ready.' headline.",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      },
      {
        sectionTitle: "ePhysician Control Tower — Acquisition & Performance Ad Creatives",
        sectionDescription: "Multi-format paid social and executive marketing ad creatives designed for ePhysician Control Tower (Powered by Collab AI). Strategically targets healthcare operators and clinic administrators by translating complex automated front-desk capabilities into immediate operational ROI across dark and light thematic executions.",
        images: [
          {
            url: "/assets/projects/control-tower/ephysician-ad-04-voicemails-dark-ui.webp",
            caption: "Stop Starting Your Day 40 Voicemails Deep (Dark Mode UI) — High-contrast dark dashboard perspective featuring automated SMS/Voice reminders, response rates, and real-time patient queue.",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/control-tower/ephysician-ad-01-voicemails-light-ui.webp",
            caption: "Stop Starting Your Day 40 Voicemails Deep (Light Mode UI) — Clean medical tablet perspective showcasing zero-staff appointment confirmations and insurance verification.",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/control-tower/ephysician-ad-02-multi-site-daylight.webp",
            caption: "One AI Front Desk. Every Location. Your Brand. (Daylight) — 3D multi-facility healthcare campus representing scalable multi-site deployment with centralized oversight.",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/control-tower/ephysician-ad-03-multi-site-night.webp",
            caption: "One AI Front Desk. Every Location. Your Brand. (Nocturnal) — Atmospheric 3D nocturnal medical center highlighting 24/7 brand continuity and automated clinic coverage.",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/control-tower/ephysician-ad-05-front-desk-never-sleeps.webp",
            caption: "Your Front Desk Never Sleeps. Neither Do Your Bookings. — Conceptual 3D illuminated clinic reception desk framed by celestial day/night elements, illustrating continuous patient intake.",
            type: "desktop",
            aspectRatio: "1/1"
          }
        ]
      },
      {
        sectionTitle: "NonProfit AI Control Tower — Performance Ad Campaign & Product Reel",
        sectionDescription: "High-converting paid social ad creatives and motion reel engineered for NonProfit Control Tower (Powered by Collab AI). Targets nonprofit executives, development directors, and board chairs by translating complex AI automation into immediate operational wins: recovering 18 hours weekly, eliminating duplicate donor records with real UI reporting, price teardowns against enterprise LLMs, deadline tracking, and community impact.",
        images: [
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-01-18-hours-clock.webp",
            caption: "Your Team Just Got 18 Hours Back This Week — 3D ticking clock visual emphasizing automated reporting, fundraising insights, and compliance tracking.",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-02-pricing-comparison.webp",
            caption: "Enterprise AI for Nonprofits, Without the Enterprise Price — Transparent pricing comparison contrasting ChatGPT Enterprise ($108k/yr) against Nonprofit Control Tower ($4k/yr).",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-03-grant-deadline-calendar.webp",
            caption: "Never Miss a Grant Deadline Again — Desk flat lay featuring an August calendar deadline and real-time mobile push notifications for grant renewal drafts.",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-04-duplicate-donor-ui.webp",
            caption: "Stop Chasing Duplicate Donor Records — 3D tablet mockup showcasing the live Fund Development Report, donor pyramids, and real-time board giving progress.",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-05-mission-over-board-reports.webp",
            caption: "Spend More Time on Your Mission, Less Time on Board Reports — Inspiring community volunteer food drive visual highlighting one-click automated board reporting.",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/reels/reel-10-collabai-nonprofit-ai.webp",
            caption: "CollabAI Nonprofit AI Video Reel (9:16) — Dynamic vertical product walkthrough highlighting free open-source AI workflow automation, board reporting, and grant tracking.",
            type: "mobile",
            aspectRatio: "9/16",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F791352226744510%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/791352226744510"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/control-tower/og-agency-control-tower.webp",
        caption: "Agency Control Tower — Core Command Center OG Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-ephysician-control-tower.webp",
        caption: "ePhysician Control Tower — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-mortgage-ai.webp",
        caption: "Mortgage AI — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-hr-control-tower.webp",
        caption: "HR Control Tower — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-marketing-control-tower.webp",
        caption: "Marketing Control Tower — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-realtorhelp-control-tower.webp",
        caption: "RealtorHelp.software — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-nonprofit-control-tower.webp",
        caption: "NonProfit AI Control Tower — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-ghl-developer-control-tower.webp",
        caption: "GHL Developer Control Tower — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-client-success-control-tower.webp",
        caption: "Client Success AI Control Tower — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/og-restaurant-ai-control-tower.webp",
        caption: "Restaurant AI Control Tower — Social OpenGraph Card",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/control-tower/ephysician-ad-04-voicemails-dark-ui.webp",
        caption: "ePhysician Control Tower — Dark Mode Reminder System Ad Creative",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/control-tower/ephysician-ad-01-voicemails-light-ui.webp",
        caption: "ePhysician Control Tower — Light Mode Clinical UI Ad Creative",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/control-tower/ephysician-ad-02-multi-site-daylight.webp",
        caption: "ePhysician Control Tower — Multi-Site Healthcare Deployment (Day)",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/control-tower/ephysician-ad-03-multi-site-night.webp",
        caption: "ePhysician Control Tower — 24/7 Multi-Site Facility Coverage (Night)",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/control-tower/ephysician-ad-05-front-desk-never-sleeps.webp",
        caption: "ePhysician Control Tower — 24/7 AI Receptionist & Booking Desk",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-01-18-hours-clock.webp",
        caption: "NonProfit AI — 18 Hours Back This Week Ad Creative",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-02-pricing-comparison.webp",
        caption: "NonProfit AI — Pricing Comparison vs ChatGPT Enterprise",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-03-grant-deadline-calendar.webp",
        caption: "NonProfit AI — Grant Deadline Alerts Ad Creative",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-04-duplicate-donor-ui.webp",
        caption: "NonProfit AI — Stop Chasing Duplicate Donor Records UI Ad",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-05-mission-over-board-reports.webp",
        caption: "NonProfit AI — Mission Focus Over Board Reports Ad Creative",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/reels/reel-10-collabai-nonprofit-ai.webp",
        caption: "CollabAI Nonprofit AI Video Reel (9:16)",
        type: "mobile",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F791352226744510%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/791352226744510"
      }
    ]
  },
  {
    id: "nagae-studio",
    slug: "nagae-studio",
    title: "NAGAE Studio — Luxury Bridal Retailer Ecosystem",
    category: "Mobile & Web",
    status: "SHIPPED",
    company: "NAGAE Studio / SJ Innovation",
    client: "NAGAE Studio (Redesign Showcase of Production Client Platform)",
    year: "2025 – 2026",
    duration: "4 Months",
    scope: ["Retailer Platform", "Admin Management", "Sales Intelligence CRM", "Stylist Mobile App", "AI Knowledge Base", "Performance Analytics", "Luxury Bridal UX"],
    summary: "Comprehensive multi-surface retailer ecosystem and administrative intelligence platform designed for NAGAE Studio—a modern luxury bridal brand. Unites gown catalog CMS management, B2B wholesale boutique CRM pipeline tracking, real-time showroom performance analytics, and an in-suite Stylist Mobile App with interactive AI fitting guidance.",
    coverImage: "/assets/projects/nagae-studio/nagae-studio-cover-banner.webp",
    liveUrl: "https://annyxtopheles.github.io/nagae-studio/",
    tldr: {
      challenge: "Luxury bridal retail demands rapid coordination across studio leadership, wholesale sales reps, and showroom stylists. The client needed a unified multi-platform solution to manage gown collections, track boutique wholesale accounts, and deliver instant answers on gown alterations and lead times directly inside fitting suites.",
      role: "Lead UI/UX Designer — conceptualized and engineered the full multi-surface ecosystem across Admin Management, Sales Intelligence CRM, and the one-handed Stylist Mobile Application with AI fitting support.",
      method: "Designed an editorial luxury design system with warm blush accents (#E58A9F), high-contrast tabular CRM pipelines, multi-attribute gown categorization, and a conversational AI fitting knowledge base."
    },
    problem: "Bridal appointments require personal connection without administrative distraction. Stylists assisting brides in fitting suites need instant answers on custom gown modifications, split sizing, fabric care, and delivery lead times. Concurrently, studio management lacked unified pipeline tracking for authorized wholesale boutique stockists, while catalog administration across complex fabric and silhouette combinations was fragmented.",
    process: [
      {
        title: "Admin Management & Product Catalog CMS",
        description: "Architected an executive performance overview and product catalog CMS tracking showroom health metrics, gown demand curves, and inventory attributes.",
        details: [
          "Monitored active stylist engagement (104 active stylists), monthly logins, and catalog view volume across 7D/30D/90D/1Y timeframes",
          "Visualized showroom popularity ranking bestsellers (Sloan Mikado, Ophelia Tulle, Sloan Fitted) against newer collection releases",
          "Engineered multi-select attribute tagging for luxury fabrics (Mikado, Silk Charmeuse, Organza) and silhouettes (A-Line, Trumpet, Bias Cut)"
        ]
      },
      {
        title: "B2B Sales Intelligence CRM & Boutique Pipeline",
        description: "Designed a dedicated wholesale CRM pipeline for studio sales directors to manage boutique retail accounts and automate operational connectors.",
        details: [
          "Visual Kanban deal pipeline tracking stockist progression: Prospecting, Initial Contact, Sample Sent, Negotiating, and Won",
          "External connector hub integrating Google Sheets order sync, Front email threads, Google Calendar trunk shows, and AI meeting notes",
          "Automated stockist communication timelines to accelerate wholesale sample turnarounds and trunk show agreements"
        ]
      },
      {
        title: "Stylist Mobile Application & In-Suite AI Assistant",
        description: "Engineered an ergonomic one-handed mobile application for showroom stylists in bridal fitting suites with live AI product support.",
        details: [
          "Ask NAGAE AI: Instant mobile assistant delivering accurate answers for alterations ('Can Peyton be made with an A-line skirt?'), veil pairings, and silhouette advice",
          "Resolution confidence tracking (98.2%) with 4.9/5 stylist satisfaction ratings across showroom appointments",
          "Gamified stylist profiles with certification tiers (Expert Level 3), point accruals, and monthly retail leaderboard rankings"
        ]
      }
    ],
    aiWorkflow: "Integrated the NAGAE AI Knowledge Base across both the mobile stylist app and admin console, allowing stylists to receive instant fitting recommendations while studio directors monitor common query trends.",
    outcomes: [
      { label: "Resolution Confidence", value: "98.2%", subtext: "Accuracy on stylist alteration and sizing queries via NAGAE AI" },
      { label: "Active Stylists", value: "104+", subtext: "Active showroom stylists across authorized bridal retail partners" },
      { label: "Stylist Satisfaction", value: "4.9 / 5", subtext: "Helpfulness rating from retail stylists using the platform" }
    ],
    outcomeSummary: "Delivered a cohesive luxury bridal retail ecosystem bridging the gap between studio administration, wholesale boutique management, and intelligent fitting suite stylist support.",
    gallerySections: [
      {
        sectionTitle: "Admin Management & Product Catalog CMS",
        sectionDescription: "Centralized administrative management console for studio leadership, featuring comprehensive gown catalog management, multi-attribute fabric/silhouette tagging, and real-time showroom performance analytics.",
        images: [
          {
            url: "/assets/projects/nagae-studio/nagae-admin-01-performance-analytics.webp",
            caption: "Admin Management — Platform Performance & Stylist Activity Analytics Dashboard",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nagae-studio/nagae-admin-02-ai-knowledge-base.webp",
            caption: "Admin Management — NAGAE AI Knowledge Base & Stylist Resolution Telemetry",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nagae-studio/nagae-admin-03-product-catalog.webp",
            caption: "Admin Management — Luxury Bridal Gown Product Catalog & Inventory Matrix",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nagae-studio/nagae-admin-04-add-product.webp",
            caption: "Admin Management — New Gown Product Creator & Fabric/Silhouette Attribute Tagger",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      },
      {
        sectionTitle: "Sales Intelligence CRM & Wholesale Pipeline",
        sectionDescription: "B2B wholesale relationship management portal designed for studio sales directors, featuring live stockist deal pipeline tracking and multi-channel system integrations.",
        images: [
          {
            url: "/assets/projects/nagae-studio/nagae-crm-01-system-integrations.webp",
            caption: "Sales Intelligence CRM — External Connectors & System Integrations (Google Sheets, Front, Calendar & AI Notes)",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nagae-studio/nagae-crm-02-boutique-pipeline.webp",
            caption: "Sales Intelligence CRM — Boutique Deal Pipeline & Wholesale Account Kanban",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      },
      {
        sectionTitle: "Stylist Mobile Application & In-Suite AI Assistant",
        sectionDescription: "Mobile-first fitting suite companion engineered for bridal stylists, integrating immediate conversational AI assistance for gown customizations and stylist leaderboard gamification.",
        images: [
          {
            url: "/assets/projects/nagae-studio/nagae-stylist-01-ask-ai-mobile.webp",
            caption: "Stylist Mobile App — Ask NAGAE AI Interactive Fitting & Gown Modification Assistant",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nagae-studio/nagae-stylist-02-profile-leaderboard.webp",
            caption: "Stylist Mobile App — Stylist Profile, Certification Badges & Performance Leaderboard",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/nagae-studio/nagae-admin-01-performance-analytics.webp",
        caption: "Admin Management — Platform Performance & Stylist Activity Analytics Dashboard",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nagae-studio/nagae-admin-02-ai-knowledge-base.webp",
        caption: "Admin Management — NAGAE AI Knowledge Base & Stylist Resolution Telemetry",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nagae-studio/nagae-admin-03-product-catalog.webp",
        caption: "Admin Management — Luxury Bridal Gown Product Catalog & Inventory Matrix",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nagae-studio/nagae-admin-04-add-product.webp",
        caption: "Admin Management — New Gown Product Creator & Fabric/Silhouette Attribute Tagger",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nagae-studio/nagae-crm-01-system-integrations.webp",
        caption: "Sales Intelligence CRM — External Connectors & System Integrations (Google Sheets, Front, Calendar & AI Notes)",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nagae-studio/nagae-crm-02-boutique-pipeline.webp",
        caption: "Sales Intelligence CRM — Boutique Deal Pipeline & Wholesale Account Kanban",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nagae-studio/nagae-stylist-01-ask-ai-mobile.webp",
        caption: "Stylist Mobile App — Ask NAGAE AI Interactive Fitting & Gown Modification Assistant",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nagae-studio/nagae-stylist-02-profile-leaderboard.webp",
        caption: "Stylist Mobile App — Stylist Profile, Certification Badges & Performance Leaderboard",
        type: "desktop",
        aspectRatio: "16/9"
      }
    ]
  },
  {
    id: "nexura-brand-system",
    slug: "nexura-brand-system",
    title: "NEXURA Brand Identity & Design System",
    category: "Brand Systems",
    status: "CASE STUDY",
    company: "Capstone / Independent",
    client: "NEXURA Consulting & Tech Solutions Ltd.",
    year: "2025",
    duration: "2 Months",
    scope: [
      "Brand Identity",
      "Design System",
      "Vector Geometry",
      "Brand Guidelines",
      "Typography Standards",
      "Stationery Specifications",
      "Merchandise Standards"
    ],
    summary: "Comprehensive corporate brand guidelines manual engineered for NEXURA Consulting & Tech Solutions Ltd. Details geometric logo construction, clearspace and alignment grids, color architecture, typography standards, and brand application standards across print collateral and corporate merchandise.",
    coverImage: "/assets/projects/nexura/nexura-cover-thumbnail.webp",
    liveUrl: null,
    tldr: {
      challenge: "Creating an enterprise-grade corporate brand system for a modern tech consulting firm capable of scaling seamlessly across digital interfaces, print collateral, architectural signage, and corporate merchandise.",
      role: "Sole Brand & Visual Designer — engineered the complete visual identity, vector geometry rules, brand guidelines manual, stationery specifications, and merchandise standards.",
      method: "Constructed a mathematical mark utilizing an ellipse and concentric hexagons forming a cube and labyrinth metaphor. Paired deep charcoal, aquatic cyan, and vibrant turquoise with clean Swiss typography (Helvetica) across 9 comprehensive brand guidelines plates."
    },
    problem: "Modern tech and consulting brands frequently suffer from generic minimalism or fragmented visual touchpoints. NEXURA needed an authoritative, mathematically precise identity that radiates technological competence, clarity, and trust while remaining versatile across small mobile app icons, business cards, large architectural facade installations, and company apparel.",
    process: [
      {
        title: "Mathematical Vector Geometry & Symbolism",
        description: "Engineered the core mark using strict optical geometry with concentric hexagons enclosing a central sphere (The Nexus), conveying harmony, structure, and forward-looking clarity.",
        details: [
          "Symbolic Architecture: The central sphere represents harmony and the focal point; concentric hexagons represent structured utility, stability, and multifaceted protection; the labyrinth metaphor guides clients toward optimal technical solutions.",
          "Grid & Spacing Architecture: Defined precise clearspace margins and optical alignment guidelines for horizontal and vertical brandmark lockups.",
          "Color Token Hierarchy: Anchored in Bluish Gray (#2D353D) for corporate authority, Aqua Cyan (#60E7FF) for serenity and innovation, and Greenish Turquoise (#00FFAE) for dynamic digital accents."
        ]
      },
      {
        title: "Corporate Stationery & Editorial Standards",
        description: "Standardized high-contrast corporate correspondence systems including official letterheads, A5 debossed notebooks, executive CTO business cards, invoices, presentation decks, and trifold brochures.",
        details: [
          "Stationery Collateral: Letterheads, invoice templates, corporate envelopes, document folders, spiral notebooks, and dual-sided identification cards.",
          "Editorial & Marketing: Multi-page statistical magazine layouts, promotional event flyers, and introductory webinar banners with hexagonal photo mask frames."
        ]
      },
      {
        title: "Merchandise Ecosystem & Apparel Guidelines",
        description: "Established comprehensive specifications for physical brand applications and company apparel to maintain visual integrity across materials.",
        details: [
          "Product Ecosystem: Guidelines for ceramic desk mugs, matte coffee cups, twill embroidered caps, and spiral notebooks.",
          "Apparel & Uniforms: Specifications for branded cotton crewnecks, athletic football jerseys, and corporate polo collared shirts."
        ]
      }
    ],
    aiWorkflow: "Automated batch export and responsive vector token scaling across multiple aspect ratios and high-DPI display resolutions.",
    outcomes: [
      { label: "Capstone Evaluation", value: "Top Tier", subtext: "Recognized as benchmark brand standards capstone project" },
      { label: "Brand Manual", value: "9 Standards Plates", subtext: "Comprehensive construction, color, and usage guidelines" },
      { label: "Identity Architecture", value: "Complete", subtext: "Logo, geometry, typography, palette, stationery & collateral" }
    ],
    outcomeSummary: "Established an authoritative visual identity system and cohesive application suite demonstrating how mathematical vector principles create a memorable, future-ready corporate brand.",
    gallerySections: [
      {
        sectionTitle: "Brand Guidelines Presentation & Identity Standards",
        sectionDescription: "The complete 9-plate brand identity manual defining vector geometry construction, clearspace boundaries, conceptual symbolism, color token architecture, and application standards.",
        images: [
          {
            url: "/assets/projects/nexura/nexura-guidelines-01-cover.webp",
            caption: "NEXURA Brand Guidelines Manual — Official Cover",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nexura/nexura-guidelines-02-construction.webp",
            caption: "LOGO Construction, Clearspace & Optical Alignment Rules",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nexura/nexura-guidelines-03-symbolism.webp",
            caption: "LOGO Symbolism & Philosophy — Nexus, Cube, Hexagon & Labyrinth",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nexura/nexura-guidelines-04-palette-typography.webp",
            caption: "Color Palette & Typographic Hierarchy (Aqua Cyan, Bluish Gray, Helvetica)",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nexura/nexura-guidelines-stationery-specs.webp",
            caption: "Office Stationery Brand Standards (Letterhead, Notebook, Invoice, Envelope)",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nexura/nexura-guidelines-marketing-specs.webp",
            caption: "Marketing & Editorial Collateral Standards (Flyer, Magazine, Brochure, Web Banner)",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nexura/nexura-guidelines-id-calendar-specs.webp",
            caption: "Corporate ID Cards, Business Cards & Calendar Standards",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nexura/nexura-guidelines-products-specs.webp",
            caption: "Corporate Product Ecosystem Standards (Mug, Pens, Cap, Backpack, Notebook)",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/nexura/nexura-guidelines-apparel-specs.webp",
            caption: "Athletic & Lifestyle Apparel Standards (Jacket, Jersey, Polo, Sweatshirt, Watch)",
            aspectRatio: "16/9"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/nexura/nexura-guidelines-01-cover.webp",
        caption: "NEXURA Brand Guidelines Manual",
        type: "system",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nexura/nexura-guidelines-02-construction.webp",
        caption: "Logo Construction & Alignment Rules",
        type: "system",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nexura/nexura-guidelines-03-symbolism.webp",
        caption: "Logo Symbolism & Philosophy",
        type: "system",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nexura/nexura-guidelines-04-palette-typography.webp",
        caption: "Color Palette & Typography",
        type: "system",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nexura/nexura-guidelines-stationery-specs.webp",
        caption: "Office Stationery Standards",
        type: "system",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/nexura/nexura-guidelines-marketing-specs.webp",
        caption: "Marketing Collateral Standards",
        type: "system",
        aspectRatio: "16/9"
      }
    ]
  },
  {
    id: "noborangi",
    slug: "noborangi",
    title: "Noborangi Brand Identity",
    category: "Brand Systems",
    status: "CASE STUDY",
    company: "SJ Innovation (Internship)",
    client: "Noborangi (Practice Work)",
    year: "2024",
    duration: "Practice Project",
    scope: [
      "Brand Identity",
      "Logotype Design",
      "Editorial Typography",
      "Storefront Architecture Mockup",
      "Stationery & Print Collateral",
      "Retail Packaging Design",
      "Merchandise & Apparel",
      "Mobile App Icon & UI"
    ],
    summary: "Complete fashion and cultural lifestyle brand identity developed as an intensive design practice project during my internship at SJ Innovation. Conceived a high-contrast editorial serif logotype with starry diacritical accents, a rich crimson and cream color architecture, luxury retail packaging, boutique architectural facade signage, split-tone merchandise, corporate stationery, and mobile application iconography under the core philosophy 'Celebrate tradition with Style'.",
    coverImage: "/assets/projects/noborangi/noborangi-banner-cover.webp",
    liveUrl: null,
    tldr: {
      challenge: "Synthesizing traditional Bengali and South Asian cultural heritage with contemporary minimalist luxury fashion aesthetics, avoiding outdated ethnic clichés while preserving genuine craft authenticity.",
      role: "Brand Identity Designer (Internship Practice) — conceived the comprehensive visual identity from the ground up: primary logotype, monogram, color system, retail packaging, boutique exterior mockups, apparel, executive stationery, and mobile touchpoints.",
      method: "Engineered a high-contrast editorial serif wordmark accented with a refined four-pointed sparkle star. Established a rich heritage crimson palette paired with crisp white and blush tones, extending across physical boutique collateral and digital screens."
    },
    problem: "Ethnic fashion brands frequently face a polarizing dilemma: either they rely on overly ornate, visually busy traditional motifs that alienate modern consumers, or they strip away their cultural identity entirely in pursuit of generic Western minimalism. Noborangi required an aesthetic identity that honors deep cultural roots while radiating high-fashion editorial sophistication.",
    process: [
      {
        title: "Logotype Architecture & Cultural Geometry",
        description: "Engineered a custom condensed serif wordmark designed to project haute couture elegance with cultural resonance.",
        details: [
          "Crafted high-contrast Didone-inspired letterforms featuring ultra-fine hairlines, razor serifs, and tall vertical proportions",
          "Embedded a four-pointed diamond star between syllables, symbolizing the dual meaning of 'Nobo' (New) and 'Rangi' (Colors / Vibrancy)",
          "Paired with a fluid cursive script tagline: 'Celebrate tradition with Style'",
          "Constructed a compact 'NR' monogram lockup optimized for small-scale debossing, wax seals, and mobile app icons"
        ]
      },
      {
        title: "Regal Crimson Palette & Material Architecture",
        description: "Built a sensory color and substrate system rooted in celebratory heritage and contemporary retail luxury.",
        details: [
          "Selected a regal festive crimson red as the primary anchor hue, evoking bridal warmth, celebration, and festive tradition",
          "Balanced against crisp architectural white, blush watercolor gradients, and unbleached kraft paper textures for sustainable packaging",
          "Integrated dark charcoal and black slate substrates for executive stationery and drafting tools to establish corporate gravitas"
        ]
      },
      {
        title: "Omnichannel Touchpoint Extension",
        description: "Applied the visual identity across the complete physical and digital customer journey.",
        details: [
          "Storefront Architecture: Classical wood-paneled boutique facade in signature crimson with frosted window vinyl and an exterior illuminated blade sign",
          "Packaging Suite: Rigid luxury retail shopping bags with crimson braided cord handles and subtle watermark typography",
          "Apparel & Merch: Split-tone colorblock hoodies, canvas totes, dual-tone ceramic mugs, and branded metal pens",
          "Executive Stationery: Official corporate letterhead, crimson presentation envelopes, and embossed business cards for marketing executives",
          "Digital Touchpoint: iOS app icon featuring the illuminated white 'NR' monogram centered on a crimson squircle"
        ]
      }
    ],
    outcomes: [
      { label: "Brand Touchpoints", value: "10+ Collateral Systems", subtext: "Storefront, signage, packaging, apparel, stationery & mobile app" },
      { label: "Typography System", value: "Custom Editorial Serif", subtext: "High-contrast Didone letterforms + flowing script tagline" },
      { label: "Color Architecture", value: "Regal Crimson & Cream", subtext: "Heritage-inspired festive crimson with modern blush accents" }
    ],
    outcomeSummary: "Created a versatile, cohesive fashion brand identity during my SJ Innovation internship that demonstrates the capacity to conceptualize, style, and scale a luxury retail brand across architectural, print, merchandise, and digital touchpoints.",
    gallerySections: [
      {
        sectionTitle: "Editorial Identity & Art Direction",
        sectionDescription: "The signature visual anchor for Noborangi: a high-contrast editorial serif wordmark set against regal floral crimson photography, establishing the core brand ethos 'Celebrate tradition with Style'.",
        images: [
          {
            url: "/assets/projects/noborangi/noborangi-banner-cover.webp",
            caption: "Noborangi Editorial Banner — Signature crimson duotone fashion portrait featuring intricate floral embroidery and the bold white NOBO RANGI logotype.",
            type: "portrait",
            aspectRatio: "1/1"
          }
        ]
      },
      {
        sectionTitle: "Touchpoint Applications & Collateral System",
        sectionDescription: "Detailed breakdown of each physical and digital touchpoint engineered for the Noborangi retail experience.",
        images: [
          {
            url: "/assets/projects/noborangi/noborangi-01-logo-tagline.webp",
            caption: "Primary Logotype & Tagline — High-contrast serif wordmark with star diacritic and 'Celebrate tradition with Style' script.",
            type: "mockup",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/noborangi/noborangi-02-business-cards.webp",
            caption: "Executive Business Cards — Dual-sided crimson and watercolor blush card design featuring the custom 'NR' monogram.",
            type: "mockup",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/noborangi/noborangi-03-blade-signage.webp",
            caption: "Architectural Blade Signage — Illuminated square exterior lightbox mounted on textured commercial building tile.",
            type: "mockup",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/noborangi/noborangi-04-apparel-merchandise.webp",
            caption: "Apparel & Lifestyle Merch — Split-tone colorblock hoodie, canvas tote bag, stacked ceramic mugs, and branded pens.",
            type: "mockup",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/noborangi/noborangi-05-storefront-facade.webp",
            caption: "Flagship Boutique Storefront — Parisian-inspired crimson wood-molded facade with large-scale window vinyl branding.",
            type: "mockup",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/noborangi/noborangi-06-luxury-shopping-bag.webp",
            caption: "Luxury Retail Shopping Bag — Perspective view of high-gsm paper carrier bag with vertical wordmark treatment.",
            type: "mockup",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/noborangi/noborangi-07-stationery-suite.webp",
            caption: "Official Corporate Stationery — Watermarked letterhead, crimson envelope, business cards, and drafting tools on slate.",
            type: "mockup",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/noborangi/noborangi-08-retail-packaging-bags.webp",
            caption: "Retail Gift Packaging — Pair of branded shopping bags featuring crimson braided rope handles and subtle script watermark.",
            type: "mockup",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/noborangi/noborangi-09-mobile-app-icon.webp",
            caption: "Digital Experience & Mobile App Icon — iOS home screen placement highlighting the white 'NR' monogram on crimson.",
            type: "mobile",
            aspectRatio: "1/1"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/noborangi/noborangi-banner-cover.webp",
        caption: "Noborangi Editorial Cover Banner",
        type: "portrait",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-01-logo-tagline.webp",
        caption: "Primary Logotype & Tagline Lockup",
        type: "mockup",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-02-business-cards.webp",
        caption: "Executive Business Cards & Monogram",
        type: "mockup",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-03-blade-signage.webp",
        caption: "Illuminated Blade Signage Mockup",
        type: "mockup",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-04-apparel-merchandise.webp",
        caption: "Split-Tone Merchandise & Apparel",
        type: "mockup",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-05-storefront-facade.webp",
        caption: "Flagship Boutique Retail Facade",
        type: "mockup",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-06-luxury-shopping-bag.webp",
        caption: "Luxury Retail Shopping Bag Mockup",
        type: "mockup",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-07-stationery-suite.webp",
        caption: "Corporate Stationery & Letterhead Suite",
        type: "mockup",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-08-retail-packaging-bags.webp",
        caption: "Retail Packaging & Gift Shopping Bags",
        type: "mockup",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/noborangi/noborangi-09-mobile-app-icon.webp",
        caption: "iOS Mobile Application Icon",
        type: "mobile",
        aspectRatio: "1/1"
      }
    ]
  },
  {
    id: "print-designs",
    slug: "print-designs",
    title: "Print & Workplace Visual Systems",
    category: "Brand Systems",
    status: "LIVE",
    company: "SJ Innovation",
    client: "SJ Innovation LLC",
    year: "2025 – Present",
    duration: "Ongoing Series",
    scope: ["Print Design", "Infographics", "Workplace Culture", "Recognition Certificates", "Client Postcards", "Holiday Event Cards", "Typography", "Editorial Layout", "Poster Design", "Sports Day Placards"],
    summary: "Physical print collateral, workplace infographics, large-format motivational office posters, appreciation certificate systems, personalized member keepsake cards, holiday campus event cards (Thanksgiving, Women's Day, Men's Day), US client outreach postcards, and Annual Sports Day team logos and marching placards designed for SJ Innovation and partner teams. Features structured corporate best-practice guides, energetic culture-building wall art, official honors honoring team excellence, and client appreciation collateral.",
    coverImage: "/assets/projects/print-designs/womens-day-office-print-banner.webp",
    liveUrl: null,
    tldr: {
      challenge: "Workplace guidelines, cultural values, and employee recognition often get lost in digital noise. The goal was to design high-impact physical print collateral, office wall posters, and official certificate systems that celebrate achievement and communicate operational clarity.",
      role: "Lead Visual & Brand Designer — conceptualized, illustrated, and typeset all physical print collateral, workplace infographics, environmental posters, and recognition certificates for SJ Innovation and SJ Control Tower.",
      method: "Applied modular information hierarchy, clean iconography, high-contrast brand colors (SJ cobalt, vibrant orange, and crisp white), subtle background textures (grids, topological contours, geometric mesh), and large-format editorial typography."
    },
    problem: "Ineffective meetings, passive office environments, and unrecognized milestone achievements drain creative momentum. SJ Innovation needed tangible, engaging print assets—reminding teams to run intentional meetings, fostering an inspiring culture, and officially honoring outstanding team contributions.",
    process: [
      {
        title: "Information Architecture for Rapid Scanning",
        description: "Deconstructed operational meeting frameworks and employee wellness research into scannable infographics with distinct visual anchors.",
        details: [
          "Crafted custom vector iconography representing Intent (target), Decisions (checklist), and Insights (lightbulb)",
          "Structured the 7 Dimensions of Employee Happiness into a circular radial infographic mapping compensation, growth, and work-life harmony",
          "Balanced brand-consistent warm orange gradients with clean white backgrounds for optimal print reproduction"
        ]
      },
      {
        title: "Environmental Impact & Cultural Wall Art",
        description: "Created high-energy, motivational posters designed to be printed and hung across office communal spaces and engineering pods.",
        details: [
          "Mohammad Ali Champion Tribute: Bold athletic vector illustration paired with high-impact uppercase quote typography on an energetic saffron-orange background",
          "Team Culture Banner: Whimsical spherical character illustrations climbing and swinging from typography blocks to celebrate laughter as essential team bonding"
        ]
      },
      {
        title: "SJ Control Tower Recognition Certificate System",
        description: "Engineered an official horizontal A4 certificate suite for the SJ Control Tower recognition program honoring high-impact individual performers.",
        details: [
          "Developed specialized category insignia: Innovation Instigator (Lightbulb), Above & Beyond (Rocket), Agile Advocate (Sprint Cycle), and Client Hero (Flame)",
          "Paired each recognition tier with customized procedural background patterns: technical grids, topographic contours, blueprint coordinates, and faceted polygon meshes",
          "Maintained official corporate metadata hierarchy with Module Lead sign-offs, issue dates, and recipient typography"
        ]
      }
    ],
    outcomes: [
      { label: "Mediums", value: "Print & Stationery", subtext: "Postcards, event cards, posters, awards, & placards" },
      { label: "Assets Delivered", value: "45 Designs", subtext: "3 infographics, 7 posters, 7 certificates, 14 holiday & Thanksgiving cards, 3 Women's Day, 2 Men's Day, 6 birthday, 4 placards" },
      { label: "Office & Outreach", value: "Multi-Campus & US", subtext: "Displayed across campuses and mailed to US enterprise clients" }
    ],
    outcomeSummary: "Delivered a cohesive suite of workplace print collateral that transforms blank office walls into functional frameworks, cultural anchors, and official honors of team excellence.",
    gallerySections: [
      {
        sectionTitle: "Workplace Productivity & Culture Infographics",
        sectionDescription: "Structured corporate infographics designed to be printed and mounted in conference rooms, collaborative hubs, and common areas. Distills core organizational habits and employee wellbeing into intuitive, scannable steps.",
        images: [
          {
            url: "/assets/projects/print-designs/effective-meetings-3-steps-infographic.webp",
            caption: "3 Steps to More Effective Meetings — Intent, Decisions, Insights",
            aspectRatio: "723/1024"
          },
          {
            url: "/assets/projects/print-designs/effective-meetings-5-tips-infographic.webp",
            caption: "5 Essential Tips for Running Effective Meetings — Actionable Meeting Hygiene",
            aspectRatio: "723/1024"
          }
        ]
      },
      {
        sectionTitle: "Recognition & Certification Systems — SJ Innovation Appreciation & AI Internship Certificates",
        sectionDescription: "Official corporate recognition and academic certification systems engineered for SJ Innovation. Features modular horizontal A4 appreciation certificates for the internal SJ Control Tower program with custom domain badge iconography, alongside official AI Internship completion certificates styled with dynamic polygonal mosaic borders, verifiable credential IDs, and executive leadership sign-offs.",
        images: [
          {
            url: "/assets/projects/print-designs/certificate-01-innovation-instigator.webp",
            caption: "Innovation Instigator — Golden Grid Motif & Lightbulb Badge (Awarded to Sadman Zaman Khan)",
            aspectRatio: "1024/724"
          },
          {
            url: "/assets/projects/print-designs/certificate-02-above-and-beyond.webp",
            caption: "Above & Beyond — Topographic Aqua Contours & Rocket Badge (Awarded to Yeasin Ramin)",
            aspectRatio: "1024/724"
          },
          {
            url: "/assets/projects/print-designs/certificate-03-agile-advocate.webp",
            caption: "Agile Advocate — Purple Geometric Mesh & Sprint Loop Badge (Awarded to Yeasin Ramin)",
            aspectRatio: "1024/724"
          },
          {
            url: "/assets/projects/print-designs/certificate-04-client-hero.webp",
            caption: "Client Hero — Blueprint Technical Grid & Flame Badge (Awarded to Yeasin Ramin)",
            aspectRatio: "1024/724"
          },
          {
            url: "/assets/projects/print-designs/certificate-05-quality-crusader.webp",
            caption: "Quality Crusader — Mint Constellation Grid & Flame Badge (Awarded to Yeasin Ramin)",
            aspectRatio: "1024/724"
          },
          {
            url: "/assets/projects/print-designs/certificate-06-urgent-attention.webp",
            caption: "Urgent Attention — Policy Non-Compliance Novelty Citation (Issued to Yeasin Ramin)",
            aspectRatio: "1024/724"
          },
          {
            url: "/assets/projects/print-designs/certificate-07-ai-internship-christiana-mattheopoulos.webp",
            caption: "Certificate of AI Internship — Official 6-Week Completion Honor with Geometric Mosaic Borders (Awarded to Christiana Mattheopoulos)",
            aspectRatio: "964/715"
          }
        ]
      },
      {
        sectionTitle: "Women's Day Global Campus Print Collateral",
        sectionDescription: "Environmental office branding and personalized print collateral designed for International Women's Day across all SJ Innovation global campuses. Features an expansive multi-office print banner celebrating unity, and custom floral appreciation cards individually personalized for every female team member.",
        images: [
          {
            url: "/assets/projects/print-designs/womens-day-office-print-banner.webp",
            caption: "Global Office Print Banner — Diverse Hands Holding Spring Daisies (Displayed across all SJ Innovation campuses)",
            aspectRatio: "1024/512"
          },
          {
            url: "/assets/projects/print-designs/womens-day-member-gift-card.webp",
            caption: "Individual Keepsake Gift Card — Personalized Floral Appreciation Card for Every Female Team Member",
            aspectRatio: "723/1024"
          },
          {
            url: "/assets/projects/print-designs/womens-day-2025-dhaka-cake-card.webp",
            caption: "Celebration Cake Topper Card (Dhaka Office Edition) — 3D stylized hands presenting vibrant spring blooms around the central Dhaka campus emblem for International Women's Day.",
            aspectRatio: "1/1"
          }
        ]
      },
      {
        sectionTitle: "Personalized Member Birthday Keepsake Cards",
        sectionDescription: "Bespoke print greeting cards designed for team members across SJ Innovation global campuses. Spans a playful corporate color-blocked cake illustration, festive confetti ribbon typography for Shahera, a high-contrast editorial silhouette card for Sadman Zaman Khan, frosted translucent glassmorphism typography for Manju Ayali, an ink illustration of Rajib Chowdhury at his dual-monitor workstation, and an expressive fine art watercolor portrait keepsake.",
        images: [
          {
            url: "/assets/projects/print-designs/birthday-card-01-minimalist-cake-vector.webp",
            caption: "Minimalist Birthday Cake Print Card — Geometric 3-tier cake illustration in corporate blue, white, and orange on deep slate navy.",
            aspectRatio: "727/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/print-designs/birthday-card-02-shahera-confetti-ribbon.webp",
            caption: "Festive Birthday Card for Shahera — Playful gift box silhouette typography with floating confetti and orange ribbon banner.",
            aspectRatio: "727/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/print-designs/birthday-card-03-sadman-silhouette-editorial.webp",
            caption: "Editorial Silhouette Birthday Card for Sadman Zaman Khan — Minimalist high-contrast pure-white profile silhouette with celestial starburst and serif typography on cobalt blue.",
            aspectRatio: "727/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/print-designs/birthday-card-04-manju-frost-gradient.webp",
            caption: "Frosted Glassmorphic Birthday Card for Manju Ayali — Subtle sky-to-cerulean gradient background with frosted translucent typography and birthday candle flame.",
            aspectRatio: "727/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/print-designs/birthday-card-05-rajib-desk-ink-sketch.webp",
            caption: "Bespoke Birthday Card for Rajib Chowdhury — Handcrafted ink illustration of Rajib at his dual-monitor development workstation with custom typography.",
            aspectRatio: "727/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/print-designs/birthday-card-06-rajib-watercolor-portrait.webp",
            caption: "Fine Art Watercolor Birthday Card for Rajib Chowdhury — Expressive hand-painted watercolor portrait keepsake with azure and amber atmospheric splashes.",
            aspectRatio: "727/1024",
            type: "portrait"
          }
        ]
      },
      {
        sectionTitle: "Annual Sports Day Team Crests & Printed Marching Placards",
        sectionDescription: "High-octane mascot emblems and physical printed placards designed for the company's Annual Sports Day championship. Conceived for tournament teams to carry during opening march ceremonies and display across field pavilions. Features four competitive team identities: Transformers (mecha Optimus Prime crest with gears and circuit tracings), War Wolves (fierce wolf mascot with flaming eye on circular tribal steel), The Warriors (armored minotaur charging with electric cyan lightning eyes and billowing nostril steam), and Blazing Fury (fire-breathing horned dragon crest enveloped in crimson flame banners).",
        images: [
          {
            url: "/assets/projects/print-designs/sports-day-placard-01-transformers.webp",
            caption: "Sports Day Printed Placard & Crest — Transformers: Diamond steel crest with mecha Optimus Prime helmet, mechanical gears, and circuit traces on twilight gradient.",
            aspectRatio: "16/9",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/sports-day-placard-02-war-wolves.webp",
            caption: "Sports Day Printed Placard & Crest — War Wolves: Textured circular steel emblem featuring a fierce wolf with flame-eye effect and arched banner on slate-to-gold gradient.",
            aspectRatio: "16/9",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/sports-day-placard-03-the-warriors.webp",
            caption: "Sports Day Printed Placard & Crest — The Warriors: Multi-tiered armor shield with charging minotaur, electric cyan lightning eyes, and emerald smoke clouds.",
            aspectRatio: "16/9",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/sports-day-placard-04-blazing-fury.webp",
            caption: "Sports Day Printed Placard & Crest — Blazing Fury: Circular crimson crest featuring a ferocious horned black dragon breathing torrents of flame with bold ribbon typography on dark twilight red gradient.",
            aspectRatio: "16/9",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "International Men's Day Campus Print Collateral & Keepsakes",
        sectionDescription: "Printed celebratory touchpoints designed for International Men's Day celebrations across SJ Innovation offices. Spans personalized member keepsakes honoring personal strength and character, paired with display cake topper cards featuring corporate lifestyle illustrations.",
        images: [
          {
            url: "/assets/projects/print-designs/mens-day-2025-member-keepsake-card.webp",
            caption: "Personalized Member Appreciation Keepsake Card — Dedicated commemorative tribute for Nurul Huda celebrating quiet courage, resilience, and daily dedication.",
            aspectRatio: "721/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/print-designs/mens-day-2025-cake-card.webp",
            caption: "Celebration Cake Card — 'Happy International Men's Day' display print featuring desk lifestyle illustrations (ping pong, coffee, briefcase, fedora, Rubik's cube, laptop).",
            aspectRatio: "1024/819",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "Thanksgiving Global Campus Office Event Print Card",
        sectionDescription: "Physical print appreciation card designed for the SJ Innovation Thanksgiving campus event, distributed to team members to celebrate gratitude, dedication, and everyday camaraderie alongside International Women's Day and Men's Day traditions.",
        images: [
          {
            url: "/assets/projects/print-designs/thanksgiving-office-event-team-card.webp",
            caption: "Global Campus Event Print Card — 'We Are Thankful for Your Commitment & Dedication': Autumn harvest card with pumpkins, maize, and golden wheat border.",
            aspectRatio: "1024/723",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "Thanksgiving Client Appreciation Postcards (US Client Outreach)",
        sectionDescription: "Standard physical print postcards mailed and hand-delivered to enterprise clients across the United States. Custom-crafted for partner ecosystems—LeadsLift, Plate Presence, and SJ Innovation—combining warm holiday gratitude with cohesive brand endorsement.",
        images: [
          {
            url: "/assets/projects/print-designs/thanksgiving-client-postcard-01-leadslift.webp",
            caption: "LeadsLift Client Thanksgiving Postcard — 'Grateful for the Relationships Built Along the Way': Cool-toned cornucopia with gradient pumpkins and stylized turkey.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/thanksgiving-client-postcard-02-platepresence.webp",
            caption: "Plate Presence Client Thanksgiving Postcard — 'Thankful for Your Trust to Help Tell Your Unique Story': Warm watercolor harvest feast table and autumn village scene with PlatePresence AI announcement.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/thanksgiving-client-postcard-03-sji.webp",
            caption: "SJ Innovation Client Thanksgiving Postcard — 'Deep Appreciation for Your Partnership & Vision': Artistic watercolor turkeys, cornucopia, and harvest pumpkins with expressive autumn splashes.",
            aspectRatio: "1024/682",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "Happy Holidays & Year-End Client Appreciation Postcards",
        sectionDescription: "Seasonal 6×4-inch physical print postcards distributed to clients across the United States for SJ Innovation, LeadsLift, Plate Presence, and CollabAI, featuring custom watercolor winter landscapes, cozy holiday storytelling, and forward-looking 2026 innovation partnerships.",
        images: [
          {
            url: "/assets/projects/print-designs/holiday-postcard-01-sji-winter-deer.webp",
            caption: "SJ Innovation Holiday Postcard — 'Cozy Season of Rest & Loved Ones': Alpine winter chalets, snowman, and peaceful deer in snow-covered mountain valley.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-02-sji-sleigh-reindeer.webp",
            caption: "SJ Innovation Holiday Postcard — 'May Relaxation Be Your Only Plan': Enchanting winter village with Santa's sleigh, flying reindeer, and children ice skating.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-03-sji-christmas-tree-gifts.webp",
            caption: "SJ Innovation Holiday Postcard — 'Peace, Warm Moments & Pure Joy': Decorated Christmas tree with wrapped gifts, snowman, and sunset alpenglow.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-04-leadslift-family-snowman.webp",
            caption: "LeadsLift Holiday Postcard — 'Days Glow with Kindness & Effortless Joy': Warm family scene building a snowman outside a glowing cottage.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-05-leadslift-christmas-tree-cottage.webp",
            caption: "LeadsLift Holiday Postcard — 'Warmth to Your Heart & Happiness to Your Home': Majestic snow-dusted Christmas tree, gift boxes, and cozy holiday cottage.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-08-platepresence-snowy-restaurant-chef.webp",
            caption: "Plate Presence Holiday Postcard — 'Overflow with Warmth & Cherished Memories': Cozy winter restaurant with snowman chef and glowing dining tables in the snow.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-10-platepresence-aurora-fireplace-family.webp",
            caption: "Plate Presence Holiday Postcard — 'Joyful Season of Good Food & Heartfelt Connection': Outdoor stone fireplace and decorated tree under emerald aurora borealis.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-06-collabai-ladder-decorating-tree.webp",
            caption: "CollabAI Holiday Postcard — 'Restful Days Surrounded by Love & Simple Joys': Children decorating a grand outdoor pine tree with silver bells and blue star topper.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-07-collabai-minimalist-blue-tree.webp",
            caption: "CollabAI Holiday Postcard — 'No Rush, Just Peace': Pure watercolor snow scene with illuminated Christmas tree and glowing celestial star.",
            aspectRatio: "1024/682",
            type: "desktop"
          },
          {
            url: "/assets/projects/print-designs/holiday-postcard-09-collabai-family-gifts-front-door.webp",
            caption: "CollabAI Holiday Postcard — 'Cozy Moments, Family Closeness & Sweet Relaxation': Family opening holiday gift boxes outside a modern warmly lit winter home.",
            aspectRatio: "1024/682",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "Office Culture & Motivational Wall Posters",
        sectionDescription: "Large-format environmental posters designed to energize engineering pods, collaborative hubs, and executive corridors. Spans championship mindset, team camaraderie through laughter, employee wellbeing frameworks, AI workplace innovation catalysts, and forward-looking career trajectory murals.",
        images: [
          {
            url: "/assets/projects/print-designs/mohammad-ali-champion-office-poster.webp",
            caption: "Mohammad Ali Champion Mindset Poster — 'Live the Rest of Your Life as a Champion'",
            aspectRatio: "512/1024"
          },
          {
            url: "/assets/projects/print-designs/laughter-team-building-vertical-poster.webp",
            caption: "Culture Banner — 'Laughter is the Best Team-Building Exercise'",
            aspectRatio: "512/1024"
          },
          {
            url: "/assets/projects/print-designs/employee-happiness-7-dimensions-infographic.webp",
            caption: "7 Dimensions of Employee Happiness — Workplace Wellbeing Wall Poster",
            aspectRatio: "512/1024"
          },
          {
            url: "/assets/projects/print-designs/ai-workplace-innovation-catalyst-poster.webp",
            caption: "Workplace Innovation Catalyst Poster — 'AI: The Secret Sauce for Businesses That Want to Be Unfairly Brilliant'",
            aspectRatio: "512/1024"
          },
          {
            url: "/assets/projects/print-designs/culture-we-live-by-wall-poster.webp",
            caption: "Culture We Live By — Workplace Core Values Infographic Poster (Empowered Teams, Thriving Clients)",
            aspectRatio: "512/1024"
          },
          {
            url: "/assets/projects/print-designs/crafting-tomorrows-solutions-ai-poster.webp",
            caption: "Future Solutions Wall Poster — 'Crafting Tomorrow's Solutions with Today's AI'",
            aspectRatio: "1024/682"
          },
          {
            url: "/assets/projects/print-designs/elevate-career-trajectory-ai-insights-poster.webp",
            caption: "Career Trajectory Wall Poster — 'Elevate Your Career Trajectory with the Insights of AI'",
            aspectRatio: "1024/682"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/print-designs/effective-meetings-3-steps-infographic.webp",
        caption: "Workplace Infographic — 3 Steps to More Effective Meetings",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/effective-meetings-5-tips-infographic.webp",
        caption: "Workplace Infographic — 5 Essential Tips for Running Effective Meetings",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/certificate-01-innovation-instigator.webp",
        caption: "SJ Control Tower Certificate — Innovation Instigator",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/certificate-02-above-and-beyond.webp",
        caption: "SJ Control Tower Certificate — Above & Beyond",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/certificate-03-agile-advocate.webp",
        caption: "SJ Control Tower Certificate — Agile Advocate",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/certificate-04-client-hero.webp",
        caption: "SJ Control Tower Certificate — Client Hero",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/certificate-05-quality-crusader.webp",
        caption: "SJ Control Tower Certificate — Quality Crusader",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/certificate-06-urgent-attention.webp",
        caption: "SJ Control Tower Citation — Urgent Attention",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/certificate-07-ai-internship-christiana-mattheopoulos.webp",
        caption: "SJ Innovation Certificate of AI Internship (Christiana Mattheopoulos)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/womens-day-office-print-banner.webp",
        caption: "Women's Day Multi-Office Print Banner",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/womens-day-member-gift-card.webp",
        caption: "Women's Day Personalized Keepsake Card",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/birthday-card-01-minimalist-cake-vector.webp",
        caption: "Member Birthday Card — Minimalist Geometric Cake Illustration",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/birthday-card-02-shahera-confetti-ribbon.webp",
        caption: "Member Birthday Card — Shahera (Festive Confetti & Gift Box)",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/birthday-card-03-sadman-silhouette-editorial.webp",
        caption: "Member Birthday Card — Sadman Zaman Khan (Editorial Silhouette)",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/birthday-card-04-manju-frost-gradient.webp",
        caption: "Member Birthday Card — Manju Ayali (Frosted Glassmorphism)",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/birthday-card-05-rajib-desk-ink-sketch.webp",
        caption: "Member Birthday Card — Rajib Chowdhury (Workstation Ink Sketch)",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/birthday-card-06-rajib-watercolor-portrait.webp",
        caption: "Member Birthday Card — Rajib Chowdhury (Watercolor Fine Art)",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/sports-day-placard-01-transformers.webp",
        caption: "Sports Day Placard — Transformers Team Crest",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/sports-day-placard-02-war-wolves.webp",
        caption: "Sports Day Placard — War Wolves Team Crest",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/sports-day-placard-03-the-warriors.webp",
        caption: "Sports Day Placard — The Warriors Team Crest",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/sports-day-placard-04-blazing-fury.webp",
        caption: "Sports Day Placard — Blazing Fury Team Crest",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/womens-day-2025-dhaka-cake-card.webp",
        caption: "Women's Day 2025 — Dhaka Campus Cake Card",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/mens-day-2025-member-keepsake-card.webp",
        caption: "Men's Day 2025 — Member Keepsake Card (Nurul Huda)",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/mens-day-2025-cake-card.webp",
        caption: "Men's Day 2025 — Campus Cake Card",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/thanksgiving-office-event-team-card.webp",
        caption: "Thanksgiving Campus Event Card — Team Commitment & Gratitude",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/thanksgiving-client-postcard-01-leadslift.webp",
        caption: "Thanksgiving Client Postcard — LeadsLift (US Outreach)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/thanksgiving-client-postcard-02-platepresence.webp",
        caption: "Thanksgiving Client Postcard — Plate Presence (US Outreach)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/thanksgiving-client-postcard-03-sji.webp",
        caption: "Thanksgiving Client Postcard — SJ Innovation (US Outreach)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-01-sji-winter-deer.webp",
        caption: "Holiday Client Postcard — SJI (Alpine Chalets & Winter Deer)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-02-sji-sleigh-reindeer.webp",
        caption: "Holiday Client Postcard — SJI (Santa's Sleigh & Village Skaters)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-03-sji-christmas-tree-gifts.webp",
        caption: "Holiday Client Postcard — SJI (Decorated Tree & Sunset Peaks)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-04-leadslift-family-snowman.webp",
        caption: "Holiday Client Postcard — LeadsLift (Family Snowman & Cottage)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-05-leadslift-christmas-tree-cottage.webp",
        caption: "Holiday Client Postcard — LeadsLift (Star-Topped Tree & Village)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-08-platepresence-snowy-restaurant-chef.webp",
        caption: "Holiday Client Postcard — Plate Presence (Snowy Restaurant & Chef)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-10-platepresence-aurora-fireplace-family.webp",
        caption: "Holiday Client Postcard — Plate Presence (Aurora & Fireplace)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-06-collabai-ladder-decorating-tree.webp",
        caption: "Holiday Client Postcard — CollabAI (Children Decorating Tree)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-07-collabai-minimalist-blue-tree.webp",
        caption: "Holiday Client Postcard — CollabAI (Minimalist Star Tree)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/holiday-postcard-09-collabai-family-gifts-front-door.webp",
        caption: "Holiday Client Postcard — CollabAI (Family Opening Holiday Gifts)",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/mohammad-ali-champion-office-poster.webp",
        caption: "Office Wall Poster — Mohammad Ali Champion Mindset",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/laughter-team-building-vertical-poster.webp",
        caption: "Team Culture Poster — Laughter Team-Building Exercise",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/employee-happiness-7-dimensions-infographic.webp",
        caption: "Office Wall Poster — 7 Dimensions of Employee Happiness",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/ai-workplace-innovation-catalyst-poster.webp",
        caption: "Office Wall Poster — AI Workplace Innovation Catalyst",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/culture-we-live-by-wall-poster.webp",
        caption: "Office Wall Poster — Culture We Live By Core Values",
        type: "portrait"
      },
      {
        url: "/assets/projects/print-designs/crafting-tomorrows-solutions-ai-poster.webp",
        caption: "Office Wall Poster — Crafting Tomorrow's Solutions with Today's AI",
        type: "desktop"
      },
      {
        url: "/assets/projects/print-designs/elevate-career-trajectory-ai-insights-poster.webp",
        caption: "Office Wall Poster — Elevate Your Career Trajectory with AI Insights",
        type: "desktop"
      }
    ]
  },
  {
    id: "industrial-training-freelance",
    slug: "industrial-training-freelance",
    title: "European IT Industrial Training & Freelance Endeavors",
    category: "Brand Systems",
    status: "CASE STUDY",
    company: "European IT Solutions / Freelancer.com / MPI Rover Scouts",
    client: "Freelance Clients, European IT Institute & Munshiganj Polytechnic Institute",
    year: "2024 – 2025",
    duration: "Selected Endeavors",
    scope: [
      "Brand Identity",
      "Corporate Stationery",
      "Visual Design",
      "Photo Manipulation",
      "Certificate Redesign",
      "Print Collateral",
      "Event Banners",
      "Creative Direction"
    ],
    summary: "A curated collection bridging institutional industrial training at European IT Solutions with real-world freelance client commissions on Freelancer.com, an unsolicited modern redesign of the BRAC certificate of completion, and visual identity and event collateral for the Munshiganj Polytechnic Institute Rover Scout Group.",
    coverImage: "/assets/projects/industrial-training-freelance/european-it-camera-photo-manipulation.webp",
    liveUrl: null,
    tldr: {
      challenge: "Synthesizing rigorous classroom training at European IT Solutions, competitive fast-paced international freelance design contests, unsolicited personal redesign explorations, and real-world institutional event banners for Munshiganj Polytechnic Institute Rover Scout Group.",
      role: "Lead Visual Designer & Compositor — conceptualized and executed vector brand marks, corporate stationery systems, event roll-up displays, social media campaigns, certificate redesigns, and surreal photo compositing.",
      method: "Applied modular vector geometry, high-impact typography pairing, multi-layer luminosity blending, perspective mockups, and commercial print prepress standards."
    },
    problem: "Transitioning between institutional assignments, international client briefs, unsolicited public-good redesigns, and civic/scouting event collateral requires adapting across radically different aesthetics, print constraints, and communication goals.",
    process: [
      {
        title: "Freelance Client Contests & Identity Systems",
        description: "Delivered targeted visual identities and commercial collateral across varied industries on Freelancer.com under strict competitive briefs.",
        details: [
          "Mercurio Informatica: Synthesized ancient medical-scientific symbolism (Caduceus) with software engineering syntax (< />) into a balanced vector emblem for an IT systems consultancy.",
          "Direct BuyBack: Engineered high-contrast retail brand mark with vibrant electric green and clean sans-serif geometry conveying quick liquidity and modern re-commerce.",
          "WellMed Pharmacy: Designed promotional patient onboarding flyer and print campaign balancing professional clinical credibility with clear incentive value propositions.",
          "Elevate Lifestyle: Designed widescreen 16:9 digital community and YouTube hero banner combining alpine photography, textured angled typography, and user engagement prompts."
        ]
      },
      {
        title: "European IT Industrial Training & Corporate Identity",
        description: "Authored advanced corporate stationery collateral and composite artworks during industrial training at European IT Solutions, exploring tactile mockups and cinematic atmosphere.",
        details: [
          "Ascent Corporations Ltd. Stationery Suite: Designed a complete corporate stationery system including official letterhead, branded correspondence envelopes, and dual-sided business cards displayed on marble and textured granite substrates.",
          "Lens to Horizon: Seamlessly composited a solitary traveler traversing railway tracks emerging through a camera lens aperture into an autumn alpine expanse, harmonizing optical depth and warm rim lighting."
        ]
      },
      {
        title: "BRAC Certificate of Completion — Unsolicited Redesign",
        description: "Undertook an unsolicited personal redesign of the BRAC Institute of Educational Development certificate, transforming dated corporate styling into an elegant, modern academic credential.",
        details: [
          "Geometric Watermark & Crest: Created a subtle, elegant circular petal motif watermark providing depth and forgery deterrence without hindering readability.",
          "Refined Typographic Hierarchy: Replaced heavy generic fonts with clean modern serif headline typography, balanced letter-spacing, and clear credential metadata.",
          "Print Balance: Maintained standard international landscape A4 proportions, formal border margins, and dual signature authentication zones."
        ]
      },
      {
        title: "Munshiganj Polytechnic Institute — Rover Scout Collateral",
        description: "Designed official institutional event collateral, commemorative social media campaigns, and large-format roll-up banners for the Munshiganj Polytechnic Institute Rover Scout Group.",
        details: [
          "7th National COMDECA Banner: Designed the official event display banner and exhibition stand mockup for the delegation attending the 7th National Community Development Camp (COMDECA).",
          "Baden-Powell Day Social Post: Designed an official commemorative social media post honoring Lord Baden-Powell's 164th birth anniversary, featuring portrait illustration, scouting emblems, and balanced Bengali typography.",
          "Natore District Rover Mate Banner: Crafted high-resolution event stage and presentation banner for the Rover Mate leadership training course."
        ]
      }
    ],
    outcomes: [
      { label: "Contests & Clients", value: "International", subtext: "Delivered on Freelancer.com across US & European clients" },
      { label: "Institutional Works", value: "European IT & MPI", subtext: "Industrial training coursework and official Rover Scout collateral" },
      { label: "Design Disciplines", value: "6 Formats", subtext: "Brand identity, corporate stationery, event banners, and certificate design" }
    ],
    outcomeSummary: "Demonstrates creative agility and technical precision across international freelancing, industrial institutional training, civic scouting collateral, and unsolicited brand redesigns.",
    gallerySections: [
      {
        sectionTitle: "Freelancer.com & Client Social Media Marketing",
        sectionDescription: "Commercial client social media graphics, advertising banners, and promotional marketing collateral executed for international and regional clients, including top-performing engagement campaigns on Freelancer.com.",
        images: [
          {
            url: "/assets/projects/industrial-training-freelance/power-gym-social-ad.webp",
            caption: "Power Gym — Social Media Fitness Ad ('Transform Your Body, Rebuild Yourself — Take Your First Step Now')",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/nafiur-dates-ramadan-promo.webp",
            caption: "Nafiur Rahman Dates — Ramadan Special Promotional Ad for Saudi imported dates ('রমজান উপলক্ষে সৌদি আরব থেকে আমদানি করা খেজুর সুলভ মূল্যে পাওয়া যাচ্ছে')",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/manage-tutor-social-ad-post.webp",
            caption: "Manage Tutor — Facebook Ad & Social Post Design ('Connect with us to find a tutor in one click'). Sourced via Freelancer.com; became one of their highest-engaged posts.",
            aspectRatio: "1/1",
            type: "desktop",
            externalUrl: "https://www.facebook.com/share/p/1FnD487b4B/"
          },
          {
            url: "/assets/projects/industrial-training-freelance/teacher-nibo-social-ad-post.webp",
            caption: "Teacher Nibo — Social Media Recruitment Ad Post ('Studying at a top public university? Get attractive tuitions with us'). Created for company design assessment.",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/freelance-mercurio-informatica-logo.webp",
            caption: "Mercurio Informatica — Medical-Tech Identity Combining Caduceus & Code Syntax (< />)",
            aspectRatio: "1/1",
            type: "system"
          },
          {
            url: "/assets/projects/industrial-training-freelance/freelance-direct-buyback-logo.webp",
            caption: "Direct BuyBack — Re-Commerce & Electronics Brand Identity",
            aspectRatio: "1/1",
            type: "system"
          },
          {
            url: "/assets/projects/industrial-training-freelance/freelance-wellmed-pharmacy-flyer.webp",
            caption: "WellMed Pharmacy — Patient Onboarding & Prescription Transfer Promotional Flyer (Burbank, CA)",
            aspectRatio: "768/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/industrial-training-freelance/freelance-elevate-lifestyle-banner.webp",
            caption: "ELEVATE Lifestyle — Digital Community & YouTube Hero Banner ('Live Life. Elevated.')",
            aspectRatio: "16/9",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "European IT Institute — Industrial Training",
        sectionDescription: "Advanced creative composite design and corporate stationery systems developed during industrial training at European IT Solutions & Institute.",
        images: [
          {
            url: "/assets/projects/industrial-training-freelance/ascent-corporations-stationery.webp",
            caption: "Ascent Corporations Ltd. — Corporate Stationery Suite Mockup (Letterhead, Business Cards & Envelopes)",
            aspectRatio: "3/2",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/european-it-camera-photo-manipulation.webp",
            caption: "Lens to Horizon — Camera Aperture Portal Photo Manipulation (European IT Training)",
            aspectRatio: "16/9",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "BRAC Certificate of Completion — Unsolicited Redesign Study",
        sectionDescription: "Personal concept redesign of the BRAC certificate of completion, initiated independently to explore modern academic typography, balanced hierarchy, and security watermark aesthetics.",
        images: [
          {
            url: "/assets/projects/industrial-training-freelance/brac-certificate-before.webp",
            caption: "BRAC Certificate — Original Reference Design",
            aspectRatio: "2000/1412",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/brac-certificate-after.webp",
            caption: "BRAC Certificate of Completion — Unsolicited Modern Redesign",
            aspectRatio: "2000/1412",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/brac-certificate-after.webp",
            caption: "Interactive Evolution — Slide to compare Original vs. Unsolicited Redesign",
            aspectRatio: "2000/1412",
            type: "comparison",
            comparison: {
              beforeImage: "/assets/projects/industrial-training-freelance/brac-certificate-before.webp",
              afterImage: "/assets/projects/industrial-training-freelance/brac-certificate-after.webp",
              beforeLabel: "Original BRAC Certificate",
              afterLabel: "Unsolicited Redesign"
            }
          }
        ]
      },
      {
        sectionTitle: "Munshiganj & Regional Scouts — Event Banners & Recognition Graphics",
        sectionDescription: "Official event collateral, roll-up exhibition banner mockups, leadership congratulations posts, and commemorative social media graphics created for Munshiganj Polytechnic Institute Rover Scout Group and Bangladesh Scouts regional districts.",
        images: [
          {
            url: "/assets/projects/industrial-training-freelance/munshiganj-district-rover-congratulations-selim-chowdhury.webp",
            caption: "Bangladesh Scouts, Munshiganj District Rover — Congratulatory Social Media Banner for Prof. A.K.M. Selim Chowdhury (Elected Treasurer at the 49th Triennial Council, Rover Region)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mupirsg-birthday-nafiur-rahman.webp",
            caption: "Munshiganj Polytechnic Institute Rover Scout Group — Birthday Post for Md. Nafiur Rahman (Assistant Patrol Leader, Bondhu Patrol)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/scouts-library-facebook-cover.webp",
            caption: "Scouts Library — Official Facebook Page Cover Banner (Abu Sayed Md. Akramuzzaman, Asst. Leader Trainer, Bangladesh Scouts)",
            aspectRatio: "1024/534",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mpirsg-badge-giving-event-banner.webp",
            caption: "Munshiganj Polytechnic Institute Rover Scout Group — In-House Badge Giving & Rank Elevation Ceremony Banner ('ব্যাজ বিতরণ ও স্তর পরিবর্তন অনুষ্ঠান')",
            aspectRatio: "16/9",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/dhaka-regional-rover-workshop-banner.webp",
            caption: "Dhaka Regional Rover Scout Workshop — Event Stage Banner ('ঢাকা বিভাগীয় সিনিয়র রোভার মেট সমাজ উন্নয়ন অ্যাওয়ার্ড ওয়ার্কশপ — বাংলাদেশ স্কাউটস, রোভার অঞ্চল')",
            aspectRatio: "16/9",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mpirsg-squire-recruitment-banner.webp",
            caption: "Munshiganj Polytechnic Institute Rover Scout Group — Squire & Fresher Admission / Recruitment Notice Banner ('ভর্তি চলছে — নবীন ভাই ও বোনেরা যারা স্কাউটিং কার্যক্রমে অংশগ্রহণ করতে ইচ্ছুক, রোভার ডেনে এসে ভর্তি ফর্ম নিন')",
            aspectRatio: "1024/438",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mpirsg-cleanup-certificate.webp",
            caption: "Munshiganj Polytechnic Institute Rover Scout Group — Clean-up Operations Activity Certificate ('পরিস্কার-পরিচ্ছন্নতা অভিযানে সাফল্যের সাথে অংশগ্রহণ')",
            aspectRatio: "1024/724",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mpirsg-crew-meeting-notice.webp",
            caption: "Munshiganj Polytechnic Institute Rover Scout Group — Weekly Crew-Meeting Notice ('All the Rovers are instructed to attend the special crew-meeting in full uniform')",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mosg-admission-banner-info.webp",
            caption: "Munshiganj Open Scout Group — Social Media Admission Banner Part 1 ('মূল্যবোধ চর্চার জন্য স্কাউটিং — ভর্তি চলছে — কাব, স্কাউট ও রোভার শাখা')",
            aspectRatio: "512/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mosg-admission-banner-gallery.webp",
            caption: "Munshiganj Open Scout Group — Social Media Admission Banner Part 2 ('আমাদের কার্যক্রমের কিছু স্থিরচিত্র বিদ্যমান')",
            aspectRatio: "512/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mpi-rover-scout-comdeca-banner.webp",
            caption: "7th National COMDECA — Event Roll-Up Display Banner Mockup (Munshiganj Polytechnic Institute Rover Scout Group)",
            aspectRatio: "2400/1877",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mpi-rover-scout-bp-day.webp",
            caption: "Baden-Powell Day — 164th Birth Anniversary Commemorative Social Media Post (Munshiganj Polytechnic Institute Rover Scout Group)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/rajshahi-dsrm-social-post-landscape.webp",
            caption: "District Senior Rover Mate (DSRM) Representatives 2025–2026 — Congratulations Landscape Banner (Bangladesh Scouts, Rajshahi District Rover)",
            aspectRatio: "16/9",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/rajshahi-dsrm-social-post-dina.webp",
            caption: "DSRM Representative Recognition Post — Nushrat Jerin Dina, Rajshahi Mohila Polytechnic Girl in Rover Unit (Bangladesh Scouts, Rajshahi District Rover)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/natore-district-rover-mate-banner.webp",
            caption: "10th Course for Rover Mate — Event Stage Presentation Banner (Bangladesh Scouts, Natore District Rover)",
            aspectRatio: "16/9",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/scouts-technical-region-square.webp",
            caption: "Bangladesh Scouts Movement Advocacy — Technical Education Region Demand (1:1 Feed Post)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/scouts-technical-region-portrait.webp",
            caption: "Bangladesh Scouts Movement Advocacy — Technical Education Region Demand (9:16 Story / Mobile Format)",
            aspectRatio: "576/1024",
            type: "portrait"
          },
          {
            url: "/assets/projects/industrial-training-freelance/scouts-technical-region-landscape.webp",
            caption: "Bangladesh Scouts Movement Advocacy — Technical Education Region Demand (Landscape Display Banner)",
            aspectRatio: "1024/426",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "Munshiganj Polytechnic Institute — Campus & Club Event Collateral",
        sectionDescription: "Large-format print banners, outdoor billboards, and digital event screens designed for Munshiganj Polytechnic Institute campus events, the MUPI Computer Club, inter-district cricket tournaments, and annual sports festivals.",
        images: [
          {
            url: "/assets/projects/industrial-training-freelance/mupi-fresher-farewell-2023-banner.webp",
            caption: "MUPI Computer Department — Fresher Orientation, Senior Farewell & Cultural Festival 2023 Digital Master Banner ('নবীন বরণ, বিদায় সংবর্ধনা ও সাংস্কৃতিক অনুষ্ঠান ২০২৩')",
            aspectRatio: "1024/455",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mupi-fresher-farewell-banner-stage-print.webp",
            caption: "Fresher Orientation & Farewell 2023 — Stage Backdrop Print Installation & Digital Proof Comparison",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mupi-fresher-farewell-crest-award.webp",
            caption: "Fresher Orientation & Farewell 2023 — Official Guest Table Crest Awards & Student Recipient Showcase (CST Department)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mupi-fresher-farewell-management-badge.webp",
            caption: "Fresher Orientation & Farewell 2023 — Management Committee Official Pin Badge Design & Physical Print Photo",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mupi-computer-club-print-banner.webp",
            caption: "MUPI Computer Club — Official Campus Recruitment Print Banner ('Learn, Share and Grow Together! — Benefits, Registration & Member Overview')",
            aspectRatio: "2/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mupi-computer-club-orientation-quiz-screen.webp",
            caption: "MUPI Computer Club — Orientation & Quiz Event Meeting Room Digital Display Screen",
            aspectRatio: "1024/585",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mupi-cricket-tournament-banner.webp",
            caption: "Inter-District T10 Cricket Tournament — Large Print Banner: Munshiganj Polytechnic Institute vs. Faridpur Polytechnic Institute ('নতুন বাংলাদেশে তরুণের উৎসব')",
            aspectRatio: "2/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/mupi-annual-sports-week-banner-mockup.webp",
            caption: "MUPI Annual Sports & Cultural Week — Outdoor Billboard Exhibition Mockup ('বার্ষিক ক্রীড়া ও সাংস্কৃতিক সপ্তাহ')",
            aspectRatio: "3/2",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "Personal Creative Studies & Visual Experiments",
        sectionDescription: "Self-initiated design explorations, typography studies, and visual artworks created out of personal interest, covering musical playlist covers, motivational editorial banners, philosophical dark compositions, and abstract geometric landscapes.",
        images: [
          {
            url: "/assets/projects/industrial-training-freelance/personal-workout-playlist-cover.webp",
            caption: "A Workout Playlist — Personal Spotify Workout Album / Playlist Cover (High-intensity monochrome bodybuilding painting with distressed red typography)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/broader-shoulders-facebook-cover.webp",
            caption: "Broader Shoulders — Personal Editorial Facebook Cover ('I ask not for a lighter burden but broader shoulders' — Classical Atlas statue with modern contrasted typography)",
            aspectRatio: "1024/449",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/prophets-born-today-conceptual-art.webp",
            caption: "Philosophical Inquiry Artwork — 'If the prophets were born today, they would be ostracized or worse, slaughtered.' (Dark starry sky, burning martyr silhouette, and framed typographic box)",
            aspectRatio: "16/9",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/geometric-mountain-landscape-composition.webp",
            caption: "Geometric Alpine Landscape Composition — Diamond-tiled mountain peaks with intersecting linear guides and atmospheric sunrise gradient",
            aspectRatio: "3/2",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "Vector Illustration & Character Design Studies",
        sectionDescription: "Original vector artworks and digital illustrations exploring perspective, geometric portraiture, Japanese woodblock aesthetics, flat-art character rendering, and campus architectural line-work.",
        images: [
          {
            url: "/assets/projects/industrial-training-freelance/vector-mupi-campus-architecture.webp",
            caption: "Munshiganj Polytechnic Institute — Vector Campus Architectural Illustration (Clean perspective courtyard, arcade corridors, and main academic building facade)",
            aspectRatio: "1024/724",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/vector-portrait-japanese-kabuki-samurai.webp",
            caption: "Traditional Japanese Kabuki Actor / Samurai — Geometric Vector Portrait (Bold angular shading, crest accents, and stylized rising sun background)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/vector-portrait-hijab-dua-prayer.webp",
            caption: "Devotion in Dua — Vector Character Portrait (Clean lines, elegant draping hijab, and peaceful prayer posture)",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/vector-portrait-glasses-serene-girl.webp",
            caption: "Serenity — Minimalist Vector Portrait with Round Wireframe Glasses, Bob Haircut, and Soft Pastel Palette",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/vector-portrait-flowing-hair-pink-dress.webp",
            caption: "Breeze & Contemplation — Flat Vector Fashion Portrait with Flowing Windblown Hair and Warm Ambient Shadows",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/vector-low-poly-rover-scout-leader.webp",
            caption: "Rover Scout Leader — Low Polygon Geometric Vector Portrait (Faceted low-poly modeling, glasses, Bangladesh Scouts neckerchief, and woggle)",
            aspectRatio: "1/1",
            type: "desktop"
          }
        ]
      },
      {
        sectionTitle: "Emblem & Insignia Design — School, Institutional & Community Identity Systems",
        sectionDescription: "High-precision vector logo recreation, institutional monograms, and heraldic emblem design. Features circular seal recreations, academic identity marks, and official unit insignias across schools, scouting groups, and humanitarian community initiatives.",
        images: [
          {
            url: "/assets/projects/industrial-training-freelance/meherpur-govt-high-school-vector-logo.webp",
            caption: "Meherpur Government High School (Est. 1854) — Official School Emblem Vector Recreation ('মেহেরপুর সরকারী উচ্চ বিদ্যালয়, মেহেরপুর — এসো সুন্দর হই')",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/meherpur-govt-high-school-scout-group-logo.webp",
            caption: "Meherpur Government High School Scout Group — Official Unit Insignia & Crest Design ('মেহেরপুর সরকারী উচ্চ বিদ্যালয় স্কাউট গ্রুপ — সদা প্রস্তুত')",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/origin-school-monogram-logo.webp",
            caption: "Origin School (Est. 1995, Fatullah, Narayanganj) — Official Circular Monogram & Institutional Seal Design ('অরিজিন স্কুল — ভূঁইঘর, কুতুবপুর, ফতুল্লা, নারায়ণগঞ্জ')",
            aspectRatio: "1/1",
            type: "desktop"
          },
          {
            url: "/assets/projects/industrial-training-freelance/scout-blood-donation-logo.webp",
            caption: "Scout Blood Donation — Community Identity & WhatsApp Group Avatar Emblem (Bangladesh Scouts fleur-de-lis, blood drop, and pulse rhythm line)",
            aspectRatio: "1/1",
            type: "desktop"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/industrial-training-freelance/origin-school-monogram-logo.webp",
        caption: "Origin School — Monogram & Seal Design",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/scout-blood-donation-logo.webp",
        caption: "Scout Blood Donation — Community Logo Design",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/meherpur-govt-high-school-vector-logo.webp",
        caption: "Meherpur Govt. High School — Vector Logo Recreation",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/meherpur-govt-high-school-scout-group-logo.webp",
        caption: "Meherpur Govt. High School Scout Group — Unit Logo Design",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/vector-low-poly-rover-scout-leader.webp",
        caption: "Rover Scout Leader — Low Poly Vector Illustration",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/munshiganj-district-rover-congratulations-selim-chowdhury.webp",
        caption: "Munshiganj District Rover — Congratulatory Post",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupirsg-birthday-nafiur-rahman.webp",
        caption: "MUPIRSG — Birthday Post for Md. Nafiur Rahman",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/vector-mupi-campus-architecture.webp",
        caption: "MUPI Campus Architecture — Vector Illustration",
        type: "desktop",
        aspectRatio: "1024/724"
      },
      {
        url: "/assets/projects/industrial-training-freelance/vector-portrait-japanese-kabuki-samurai.webp",
        caption: "Kabuki Samurai — Geometric Vector Portrait",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/vector-portrait-hijab-dua-prayer.webp",
        caption: "Devotion in Dua — Vector Portrait",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/vector-portrait-glasses-serene-girl.webp",
        caption: "Serenity — Vector Character Portrait",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/vector-portrait-flowing-hair-pink-dress.webp",
        caption: "Windblown — Flat Vector Fashion Portrait",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/personal-workout-playlist-cover.webp",
        caption: "A Workout Playlist — Spotify Playlist Cover",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/broader-shoulders-facebook-cover.webp",
        caption: "Broader Shoulders — Personal Editorial Cover",
        type: "desktop",
        aspectRatio: "1024/449"
      },
      {
        url: "/assets/projects/industrial-training-freelance/prophets-born-today-conceptual-art.webp",
        caption: "Philosophical Inquiry — Conceptual Visual Art",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/industrial-training-freelance/geometric-mountain-landscape-composition.webp",
        caption: "Geometric Alpine Landscape — Visual Experiment",
        type: "desktop",
        aspectRatio: "3/2"
      },
      {
        url: "/assets/projects/industrial-training-freelance/scouts-library-facebook-cover.webp",
        caption: "Scouts Library — Facebook Page Cover Banner",
        type: "desktop",
        aspectRatio: "1024/534"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupi-fresher-farewell-2023-banner.webp",
        caption: "MUPI Computer Dept — Fresher Orientation & Farewell 2023 Banner",
        type: "desktop",
        aspectRatio: "1024/455"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupi-fresher-farewell-crest-award.webp",
        caption: "MUPI Farewell 2023 — Official Crest Award & Recipient",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupi-fresher-farewell-management-badge.webp",
        caption: "MUPI Farewell 2023 — Management Committee Pin Badge",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupi-fresher-farewell-banner-stage-print.webp",
        caption: "MUPI Farewell 2023 — Stage Backdrop Print Installation",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mpirsg-badge-giving-event-banner.webp",
        caption: "MPIRSG — In-House Badge Giving Ceremony Banner",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupi-computer-club-print-banner.webp",
        caption: "MUPI Computer Club — Campus Print Banner",
        type: "desktop",
        aspectRatio: "2/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupi-computer-club-orientation-quiz-screen.webp",
        caption: "MUPI Computer Club — Orientation & Quiz Screen",
        type: "desktop",
        aspectRatio: "1024/585"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupi-cricket-tournament-banner.webp",
        caption: "Inter-District Cricket Tournament Banner — MUPI vs. FPI",
        type: "desktop",
        aspectRatio: "2/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mupi-annual-sports-week-banner-mockup.webp",
        caption: "MUPI Annual Sports Week — Billboard Mockup",
        type: "desktop",
        aspectRatio: "3/2"
      },
      {
        url: "/assets/projects/industrial-training-freelance/dhaka-regional-rover-workshop-banner.webp",
        caption: "Dhaka Regional Rover Scout Workshop — Stage Banner",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mpirsg-squire-recruitment-banner.webp",
        caption: "Munshiganj Polytechnic Institute Rover Scout Group — Squire Admission Banner",
        type: "desktop",
        aspectRatio: "1024/438"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mpirsg-cleanup-certificate.webp",
        caption: "Munshiganj Polytechnic Institute Rover Scout Group — Clean-up Operations Certificate",
        type: "desktop",
        aspectRatio: "1024/724"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mpirsg-crew-meeting-notice.webp",
        caption: "Munshiganj Polytechnic Institute Rover Scout Group — Weekly Crew-Meeting Notice",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mosg-admission-banner-info.webp",
        caption: "Munshiganj Open Scout Group — Admission Banner Overview",
        type: "portrait",
        aspectRatio: "512/1024"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mosg-admission-banner-gallery.webp",
        caption: "Munshiganj Open Scout Group — Activities Gallery Banner",
        type: "portrait",
        aspectRatio: "512/1024"
      },
      {
        url: "/assets/projects/industrial-training-freelance/power-gym-social-ad.webp",
        caption: "Power Gym — Social Media Fitness Ad",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/nafiur-dates-ramadan-promo.webp",
        caption: "Nafiur Rahman Dates — Ramadan Promotional Ad",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/manage-tutor-social-ad-post.webp",
        caption: "Manage Tutor — Facebook Social Ad Post",
        type: "desktop",
        aspectRatio: "1/1",
        externalUrl: "https://www.facebook.com/share/p/1FnD487b4B/"
      },
      {
        url: "/assets/projects/industrial-training-freelance/teacher-nibo-social-ad-post.webp",
        caption: "Teacher Nibo — Social Media Ad Post Design",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/european-it-camera-photo-manipulation.webp",
        caption: "Lens to Horizon — Camera Aperture Portal Photo Manipulation",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/industrial-training-freelance/ascent-corporations-stationery.webp",
        caption: "Ascent Corporations Ltd. — Corporate Stationery Suite Mockup",
        type: "desktop",
        aspectRatio: "3/2"
      },
      {
        url: "/assets/projects/industrial-training-freelance/brac-certificate-before.webp",
        caption: "BRAC Certificate of Completion — Original Reference Design",
        type: "desktop",
        aspectRatio: "2000/1412"
      },
      {
        url: "/assets/projects/industrial-training-freelance/brac-certificate-after.webp",
        caption: "BRAC Certificate of Completion — Unsolicited Redesign",
        type: "desktop",
        aspectRatio: "2000/1412"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mpi-rover-scout-comdeca-banner.webp",
        caption: "7th National COMDECA — Display Banner Mockup",
        type: "desktop",
        aspectRatio: "2400/1877"
      },
      {
        url: "/assets/projects/industrial-training-freelance/rajshahi-dsrm-social-post-landscape.webp",
        caption: "Rajshahi District Rover — DSRM Representatives Banner",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/industrial-training-freelance/rajshahi-dsrm-social-post-dina.webp",
        caption: "Rajshahi District Rover — DSRM Representative Post",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/scouts-technical-region-square.webp",
        caption: "Bangladesh Scouts Movement — Technical Education Region Post",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/scouts-technical-region-portrait.webp",
        caption: "Bangladesh Scouts Movement — Technical Education Region Story",
        type: "portrait",
        aspectRatio: "576/1024"
      },
      {
        url: "/assets/projects/industrial-training-freelance/scouts-technical-region-landscape.webp",
        caption: "Bangladesh Scouts Movement — Technical Education Region Banner",
        type: "desktop",
        aspectRatio: "1024/426"
      },
      {
        url: "/assets/projects/industrial-training-freelance/mpi-rover-scout-bp-day.webp",
        caption: "Baden-Powell Day — Commemorative Social Post",
        type: "desktop",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/natore-district-rover-mate-banner.webp",
        caption: "Rover Mate Leadership Course — Event Stage Banner",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/industrial-training-freelance/freelance-mercurio-informatica-logo.webp",
        caption: "Mercurio Informatica — Brand Identity",
        type: "system",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/freelance-direct-buyback-logo.webp",
        caption: "Direct BuyBack — Electronics Brand Identity",
        type: "system",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/industrial-training-freelance/freelance-wellmed-pharmacy-flyer.webp",
        caption: "WellMed Pharmacy — Promotional Flyer",
        type: "portrait",
        aspectRatio: "768/1024"
      },
      {
        url: "/assets/projects/industrial-training-freelance/freelance-elevate-lifestyle-banner.webp",
        caption: "ELEVATE Lifestyle — Digital Hero Banner",
        type: "desktop",
        aspectRatio: "16/9"
      }
    ]
  },
  {
    id: "creative-initiatives",
    slug: "creative-initiatives",
    title: "Proactive Creative Initiatives & Campaigns",
    category: "Brand Systems",
    status: "LIVE",
    company: "SJ Innovation",
    client: "Internal Initiatives & People Operations",
    year: "2025 – Present",
    duration: "Ongoing",
    scope: ["Autonomous Design Initiatives", "HR & Talent Campaigns", "Social Recognition Systems", "3D Glassmorphism", "Executive Alignment", "Employer Branding"],
    summary: "Unsolicited creative initiatives conceived, designed, pitched, and operationalized autonomously for SJ Innovation. Spans modular 3D talent acquisition campaigns, a ground-up recognition system that transformed private Keka HRMS honors into public social showcases with 3-tier executive approval, and the Member Birthday Carousel motion initiative that replaced static circular cake graphics with dynamic member-first video spotlights.",
    coverImage: "/assets/projects/creative-initiatives/hiring-01-uiux-graphic-design-internship.webp",
    liveUrl: null,
    tldr: {
      challenge: "Internal employee recognition was historically locked inside silent HR tools (Keka certificates and plain text notices), while employee birthdays relied on generic static circular cake images, missing opportunities to celebrate talent and build community pride.",
      role: "Self-Directed Designer — identified organizational opportunities, built end-to-end design systems without prompting, and systematically navigated multi-tier executive approvals (Senior Designer → Engineering Manager → Chief Operating Officer) to launch company-wide initiatives.",
      method: "Conceived high-craft 3D glassmorphic social frameworks for monthly performer honors, dynamic member-first birthday video reels, and multi-discipline hiring campaigns, turning routine milestones into public-facing company pride."
    },
    problem: "Without dedicated creative requests from HR, talent acquisition posts and monthly performer honors remained functional but visually uninspired, and team birthday celebrations relied on repetitive static cake graphics. Recognizing that first impressions and internal morale dictate company culture, Sadman took the initiative to build polished social campaign systems and dynamic motion carousels without being prompted, securing multi-tier executive buy-in.",
    process: [
      {
        title: "Identifying Unmet Opportunities & Autonomous Inception",
        description: "Audited ongoing talent acquisition workflows and spotted an opportunity to elevate SJ Innovation's employer branding with bespoke 3D glassmorphism.",
        details: [
          "Conceived the entire campaign autonomously, bypassing bureaucratic backlog to present working high-fidelity prototypes",
          "Tailored domain-specific 3D iconography: design palettes & artboards for UI/UX, enterprise briefs & metrics for BA, and interactive code terminals & AI chips for developers",
          "Integrated brand-consistent orange CTA badges ('Apply Now') and official website domain lockups"
        ]
      },
      {
        title: "Ground-Up Recognition Transformation: From Keka to Social Media",
        description: "Historically, Performer of the Month honors were only distributed as private PDF certificates inside the internal HR portal (Keka). Sadman recognized an opportunity to publicly celebrate talent on social channels.",
        details: [
          "Independently conceptualized and designed the 'Performer of the Month' social template featuring a sculpted 3D glass trophy, tech coordinate grids, and brand gradients",
          "Presented the initiative through a 3-tier approval hierarchy: pitched to Senior Designer (approved), escalated to Manager (approved), and presented to Chief Operating Officer (COO, approved)",
          "Established an enduring corporate tradition celebrating team excellence on public LinkedIn and social media channels"
        ]
      },
      {
        title: "Member Birthday Carousel Motion Initiative: Reimagining Static Posts",
        description: "Reconceived corporate employee birthday celebrations: previously, birthdays were recognized with generic static circular cake images. Sadman took the initiative to transform them into dynamic, member-first video reels and multi-slide carousel spotlights.",
        details: [
          "Replaced impersonal static graphics with personalized motion spotlights celebrating team members across global offices (Dhaka, Goa, New York)",
          "Crafted high-retention video compositions pairing upbeat background rhythms with energetic motion typography",
          "Dramatically increased cross-office engagement, comments, and internal camaraderie on social channels"
        ]
      }
    ],
    outcomes: [
      { label: "Initiative Origin", value: "100% Proactive", subtext: "Self-directed from conception to executive sign-off" },
      { label: "Approval Ladder", value: "3-Tier Signoff", subtext: "Pitched & approved by Senior, Manager, & COO" },
      { label: "Culture Impact", value: "Company-Wide", subtext: "Keka honors & member birthdays elevated to engaging social media traditions" }
    ],
    outcomeSummary: "Demonstrated the power of unsolicited design leadership—transforming standard HR communications and internal certificates into captivating social showcases and dynamic motion carousels that strengthened employee pride and employer brand perception.",
    gallerySections: [
      {
        sectionTitle: "People Operations — 3D Glassmorphic Talent Acquisition Campaigns",
        sectionDescription: "Autonomous recruitment campaign suite designed for SJ Innovation's HR team. Features customized 3D floating glassmorphic iconography tailored to specific career disciplines, clean typographic hierarchies, and prominent call-to-actions.",
        images: [
          {
            url: "/assets/projects/creative-initiatives/hiring-01-uiux-graphic-design-internship.webp",
            caption: "Paid Internship Opportunity — UI/UX & Graphic Design (Floating 3D Vector Tools & Color Swatches)",
            aspectRatio: "1024/682"
          },
          {
            url: "/assets/projects/creative-initiatives/hiring-02-business-analyst.webp",
            caption: "We're Hiring — Business Analyst (Glassmorphic Enterprise Strategy & Analytics Cubes)",
            aspectRatio: "1024/682"
          },
          {
            url: "/assets/projects/creative-initiatives/hiring-03-jr-software-developer.webp",
            caption: "We're Hiring — Jr. Software Developer (Glowing Glass Terminal, Code Blocks & AI Processor)",
            aspectRatio: "1024/682"
          },
          {
            url: "/assets/projects/creative-initiatives/onboarding-welcome-leandra-sol.webp",
            caption: "Welcome Aboard Social Showcase — Standardized Talent Onboarding System (Leandra Sol, Digital Marketing Executive, Goa)",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/creative-initiatives/onboarding-welcome-akshata-alornekar.webp",
            caption: "Welcome Aboard Social Showcase — Standardized Talent Onboarding System (Akshata Alornekar, HR Admin Executive, Sylhet)",
            aspectRatio: "1/1"
          }
        ]
      },
      {
        sectionTitle: "Employee Recognition — Ground-Up Social Transformation from Keka HRMS",
        sectionDescription: "Proactive cultural initiative conceived from the ground up: previously, monthly employee honors were locked inside internal HR software (Keka) as simple PDF certificates. Sadman conceptualized transforming these into public-facing, high-craft social showcases—pitching the concept upwards from Senior Designer to Engineering Manager and the Chief Operating Officer (COO) to secure complete executive approval.",
        images: [
          {
            url: "/assets/projects/creative-initiatives/recognition-performer-of-month-sadman.webp",
            caption: "Performer of the Month — Ground-Up Initiative Pitching & Launching Social Recognition (Sadman Zaman Khan, November 2025)",
            aspectRatio: "1/1"
          }
        ]
      },
      {
        sectionTitle: "Proactive Culture Initiatives — Dynamic Member Birthday Carousel Reel",
        sectionDescription: "Autonomous culture initiative conceived and executed by Sadman to transform repetitive static birthday cake graphics into energetic, member-first motion carousel reels celebrating colleagues across global offices.",
        images: [
          {
            url: "/assets/projects/reels/reel-03-member-birthday-carousel-initiative.webp",
            caption: "Member Birthday Carousel Motion Initiative — Ground-up transformation: reimagined static circular cake graphics into dynamic, member-first video spotlights celebrating individual colleagues across global offices.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1492889088963334%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/1492889088963334"
          }
        ]
      },
      {
        sectionTitle: "SJ Innovation 21st Anniversary — Social Media Banners",
        sectionDescription: "Panoramic commemorative social media banner suite celebrating 21 years of engineering excellence, AI-first innovation, and team culture across global campuses. Features the central anniversary insignia, subsidiary brand ecosystem (BuildYourAI, CollabAI, LeadsLift, Plate Presence), enterprise accreditation credentials, and curated photo collages of team members, retreats, and milestones.",
        images: [
          {
            url: "/assets/projects/creative-initiatives/anniversary-21st-social-banner-01.webp",
            caption: "21st Anniversary Social Banner — Direction 01 (Asymmetrical Photo Clusters & Team Retreats)",
            type: "carousel",
            aspectRatio: "1024/373"
          },
          {
            url: "/assets/projects/creative-initiatives/anniversary-21st-social-banner-02.webp",
            caption: "21st Anniversary Social Banner — Direction 02 (Polaroids, Outdoor Sports & Company Celebrations)",
            type: "carousel",
            aspectRatio: "1024/373"
          },
          {
            url: "/assets/projects/creative-initiatives/anniversary-21st-social-banner-03.webp",
            caption: "21st Anniversary Social Banner — Direction 03 (Awards Dinners, Nasdaq Times Square & Team Milestones)",
            type: "carousel",
            aspectRatio: "1024/379"
          }
        ]
      },
      {
        sectionTitle: "SJ Innovation 21st Anniversary — Interactive Photobooth Frames",
        sectionDescription: "Custom-designed event selfie and photobooth cutout frames created for campus-wide 21st Anniversary celebrations (August 18th, 2025). Features dual design directions: a dot-matrix light minimalist edition with corporate confetti dots, and a vibrant sunset-orange to deep indigo gradient edition.",
        images: [
          {
            url: "/assets/projects/creative-initiatives/anniversary-21st-photobooth-01-dot-matrix.webp",
            caption: "Photobooth Frame 01 — Dot-Matrix Minimalist Edition (Pristine White & Multicolored Confetti Dots)",
            type: "carousel",
            aspectRatio: "585/1024"
          },
          {
            url: "/assets/projects/creative-initiatives/anniversary-21st-photobooth-02-sunset-gradient.webp",
            caption: "Photobooth Frame 02 — Sunset Gradient Edition (Bold Tangerine & Indigo Halftone Matrix)",
            type: "carousel",
            aspectRatio: "585/1024"
          }
        ]
      },
      {
        sectionTitle: "SJ Innovation 21st Anniversary — Core Value Motto Signage",
        sectionDescription: "Environmental culture signage and wall placards celebrating SJ Innovation's defining core values during the 21st Anniversary milestone. Designed with large-format numeral typography, domain icons, and high-contrast brand color blocking.",
        images: [
          {
            url: "/assets/projects/creative-initiatives/anniversary-21st-motto-01-client-first.webp",
            caption: "Motto Signage 01 — 'Client First Mind-Set: We prioritize our client needs and strive to exceed their expectations.'",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/creative-initiatives/anniversary-21st-motto-02-solution-oriented.webp",
            caption: "Motto Signage 02 — 'Solution Oriented: We focus on solutions, not problems.'",
            type: "desktop",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/creative-initiatives/anniversary-21st-motto-03-on-time-delivery.webp",
            caption: "Motto Signage 03 — 'On-Time Delivery: We are committed to delivering on time, every time.'",
            type: "desktop",
            aspectRatio: "1/1"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/reels/reel-03-member-birthday-carousel-initiative.webp",
        caption: "Member Birthday Carousel Motion Initiative",
        type: "mobile",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1492889088963334%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/1492889088963334"
      },
      {
        url: "/assets/projects/creative-initiatives/hiring-01-uiux-graphic-design-internship.webp",
        caption: "HR Creative — UI/UX & Graphic Design Paid Internship",
        type: "desktop"
      },
      {
        url: "/assets/projects/creative-initiatives/hiring-02-business-analyst.webp",
        caption: "HR Creative — Business Analyst Hiring Campaign",
        type: "desktop"
      },
      {
        url: "/assets/projects/creative-initiatives/hiring-03-jr-software-developer.webp",
        caption: "HR Creative — Jr. Software Developer Hiring Campaign",
        type: "desktop"
      },
      {
        url: "/assets/projects/creative-initiatives/recognition-performer-of-month-sadman.webp",
        caption: "Performer of the Month — Ground-Up Social Recognition Initiative",
        type: "desktop"
      },
      {
        url: "/assets/projects/creative-initiatives/onboarding-welcome-leandra-sol.webp",
        caption: "Welcome Aboard — Talent Onboarding Social Showcase (Leandra Sol)",
        type: "desktop"
      },
      {
        url: "/assets/projects/creative-initiatives/onboarding-welcome-akshata-alornekar.webp",
        caption: "Welcome Aboard — Talent Onboarding Social Showcase (Akshata Alornekar)",
        type: "desktop"
      },
      {
        url: "/assets/projects/creative-initiatives/anniversary-21st-social-banner-01.webp",
        caption: "21st Anniversary Social Banner — Asymmetrical Photo Clusters",
        type: "carousel"
      },
      {
        url: "/assets/projects/creative-initiatives/anniversary-21st-social-banner-02.webp",
        caption: "21st Anniversary Social Banner — Polaroids & Outdoor Retreats",
        type: "carousel"
      },
      {
        url: "/assets/projects/creative-initiatives/anniversary-21st-social-banner-03.webp",
        caption: "21st Anniversary Social Banner — Awards & Nasdaq Times Square",
        type: "carousel"
      },
      {
        url: "/assets/projects/creative-initiatives/anniversary-21st-photobooth-01-dot-matrix.webp",
        caption: "21st Anniversary Photobooth Frame — Dot-Matrix Edition",
        type: "portrait"
      },
      {
        url: "/assets/projects/creative-initiatives/anniversary-21st-photobooth-02-sunset-gradient.webp",
        caption: "21st Anniversary Photobooth Frame — Sunset Gradient Edition",
        type: "portrait"
      },
      {
        url: "/assets/projects/creative-initiatives/anniversary-21st-motto-01-client-first.webp",
        caption: "21st Anniversary Motto Signage — 01 Client First Mind-Set",
        type: "desktop"
      },
      {
        url: "/assets/projects/creative-initiatives/anniversary-21st-motto-02-solution-oriented.webp",
        caption: "21st Anniversary Motto Signage — 02 Solution Oriented",
        type: "desktop"
      },
      {
        url: "/assets/projects/creative-initiatives/anniversary-21st-motto-03-on-time-delivery.webp",
        caption: "21st Anniversary Motto Signage — 03 On-Time Delivery",
        type: "desktop"
      }
    ]
  },
  {
    id: "youtube-webinar-thumbnails",
    slug: "youtube-webinar-thumbnails",
    title: "YouTube & Webinar Thumbnails",
    category: "Brand Systems",
    status: "LIVE",
    company: "SJ Innovation & Client Ventures",
    client: "SJ Innovation LLC & Autonomous AI Channels",
    year: "2025 – Present",
    duration: "Ongoing Production",
    scope: ["YouTube Packaging", "Webinar Visual Identity", "High-CTR Cover Design", "3D Scene Composition", "Typography & Hierarchy", "Brand Systems"],
    summary: "High-impact 16:9 thumbnail design system engineered for maximum click-through rate (CTR), micro-scale mobile legibility, and brand recall across YouTube videos, tech masterclasses, and executive AI webinars for SJ Innovation and autonomous AI media channels.",
    coverImage: "/assets/projects/thumbnails/thumb-ai-agents-workforce.webp",
    liveUrl: null,
    tldr: {
      challenge: "Technical webinars and AI YouTube content compete in crowded feeds where viewers make click decisions in sub-second glances. Generic stock covers or text-heavy slides result in abysmal click-through rates and diluted brand authority.",
      role: "Lead Visual Designer — conceptualized visual concepts, directed 3D metaphor staging, and engineered modular 16:9 thumbnail cover systems with high typographic contrast and mobile readability.",
      method: "Engineered a three-pillar thumbnail framework: 1) High-salience focal point (3D character, tactile metaphor, or cinematic hero), 2) 3-second legible title lockup with high contrast, and 3) Cohesive brand identity anchors across recurring series."
    },
    problem: "Video and webinar packaging faces extreme constraints: thumbnails render as small as 120px wide on mobile feeds, yet must instantly communicate value, provoke curiosity, and maintain corporate authority without looking cluttered or clickbaity.",
    process: [
      {
        title: "Micro-Scale Legibility & Typographic Hierarchy",
        description: "Designed concise 2-to-3 line title lockups utilizing bold sans-serif fonts, high-contrast color fills (vibrant amber, electric blue, and crisp white), and clean badges ('Free Webinar') positioned safely away from platform time-stamp overlays.",
        details: [
          "Tested visual hierarchy at 15% zoom to ensure immediate readability on mobile screens",
          "Reserved right-hand 60% of frame for visual storytelling while keeping left 40% clean for primary typography",
          "Avoided bottom-right clutter to prevent obstruction by YouTube and LinkedIn timestamp badges"
        ]
      },
      {
        title: "Conceptual 3D Metaphors & AI Visual Storytelling",
        description: "Instead of generic software screenshots, developed bespoke 3D conceptual scenes that encapsulate abstract tech subjects—from miniature holographic developer pods for Claude AI to chameleon agility for Git version control and futuristic humanoid agent conference tables.",
        details: [
          "Modeled tactile 3D elements: metallic Sora cloud icons, robotic arms, dual-monitor workstations, and multi-agent workstations",
          "Applied cinematic lighting and directional color gradients (warm amber vs cool indigo) to create depth and visual pop",
          "Maintained strict brand lockup consistency with company logos ('AI First Solutions') across episodic releases"
        ]
      },
      {
        title: "Cross-Platform Responsive Deployment",
        description: "Formatted all visual assets in native 16:9 (1280x720 / 1920x1080 standard) optimized for YouTube watch pages, LinkedIn event banners, newsletter embeds, and landing page hero cards.",
        details: [
          "Standardized color grading for high contrast across both OLED mobile displays and desktop monitors",
          "Created reusable Figma master components with smart auto-layout guides for rapid turnaround under tight webinar marketing schedules"
        ]
      }
    ],
    aiWorkflow: "Leveraged AI-augmented 3D scene rendering and lighting exploration in Midjourney and Photoshop generative workflows to rapidly prototype character poses, metallic textures, and lighting moods, finalizing vectors and type in Figma.",
    outcomes: [
      { label: "Design System", value: "High CTR", subtext: "Optimized for mobile feed glanceability and high initial engagement" },
      { label: "Assets Delivered", value: "10 Thumbnails", subtext: "Across SJ Innovation webinars, AI channel features, & product demos" },
      { label: "Visual Consistency", value: "100%", subtext: "Strict brand lockup and typographic system across all episodic releases" }
    ],
    outcomeSummary: "Delivered an elevated video and webinar packaging system that transforms complex enterprise AI topics and technical developer tools into captivating, high-converting visual invitations.",
    gallerySections: [
      {
        sectionTitle: "SJ Innovation — AI First Webinar & Masterclass Series",
        sectionDescription: "16:9 webinar promotional thumbnails and video packaging designed for SJ Innovation's official tech webinar series. Blends corporate brand identity with striking 3D visual metaphors highlighting Claude AI, Git & Cody developer workflows, and OpenAI Sora video editing.",
        images: [
          {
            url: "/assets/projects/thumbnails/thumb-sji-claude-ai-2026.webp",
            caption: "Claude AI 2026: Everything You Need to Know for Maximum Productivity — 3D holographic developer workstation and coding assistant setup.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/thumbnails/thumb-sji-coding-success-git-cody.webp",
            caption: "Coding Success: Master Git & Cody Workflows for Effective Version Control — 3D chameleon metaphor representing developer adaptability and version control agility.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/thumbnails/thumb-sji-empower-edits-sora-ai.webp",
            caption: "Empower Your Edits: Sora's AI-Powered Video Editing — Sleek 3D brushed-metal cloud icon with glowing AI sparkles and dual-tone lighting.",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      },
      {
        sectionTitle: "Autonomous AI & Agentic Media Channel Series",
        sectionDescription: "Cinematic, high-concept thumbnail designs for autonomous AI media channels and deep-dive technical explorations. Emphasizes futuristic robotics, multi-agent systems, and digital intelligence.",
        images: [
          {
            url: "/assets/projects/thumbnails/thumb-ai-social-media-manager.webp",
            caption: "Social Media Manager: Your All-in-One Autonomous AI Operator — Hyper-realistic humanoid female AI robot with floating social ecosystem icons.",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/thumbnails/thumb-ai-agents-workforce.webp",
            caption: "AGENTS: The Autonomous Multi-Agent Workforce — Cinematic dark studio composition featuring four specialized humanoid robotic agents collaborating across development, hardware, design, and analytics.",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      },
      {
        sectionTitle: "BuildYourAI — YouTube Product Demos & Feature Walkthroughs",
        sectionDescription: "High-CTR 16:9 thumbnail design system crafted for BuildYourAI's YouTube tutorials, live agent walkthroughs, and executive feature demonstrations, combining bold headline typography, brand gradient accents, and real dashboard mockups.",
        images: [
          {
            url: "/assets/projects/buildyourai/byai-yt-smart-shopper-insights.webp",
            caption: "Smart Shopper Insights — E-Commerce Customer Purchase Analytics demo thumbnail",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/buildyourai/byai-yt-ai-booking-agent-demo.webp",
            caption: "AI Booking Agent Demo — Voice agent and conversational scheduler walkthrough",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/buildyourai/byai-yt-ai-event-organizer.webp",
            caption: "AI Event Organizer — Dual-display administrative CMS and email workflow demo",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/buildyourai/byai-yt-automate-business-ops-control-tower.webp",
            caption: "Automate Business Ops — Control Tower enterprise suite overview with 3D metallic crest",
            type: "desktop",
            aspectRatio: "16/9"
          },
          {
            url: "/assets/projects/buildyourai/byai-yt-bill-splitter-app-ep02.webp",
            caption: "Bill-Splitter App (Episode 02) — Product walkthrough and mobile utility showcase",
            type: "desktop",
            aspectRatio: "16/9"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/thumbnails/thumb-sji-claude-ai-2026.webp",
        caption: "Claude AI 2026 — Webinar Thumbnail Packaging",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/thumbnails/thumb-sji-coding-success-git-cody.webp",
        caption: "Coding Success: Git & Cody — Webinar Thumbnail Packaging",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/thumbnails/thumb-sji-empower-edits-sora-ai.webp",
        caption: "Empower Your Edits: Sora AI — Webinar Thumbnail Packaging",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/thumbnails/thumb-ai-social-media-manager.webp",
        caption: "Social Media Manager — Autonomous AI Agent Thumbnail",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/thumbnails/thumb-ai-agents-workforce.webp",
        caption: "AGENTS — Multi-Agent Autonomous Workforce Feature Thumbnail",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-smart-shopper-insights.webp",
        caption: "Smart Shopper Insights — YouTube Demo Packaging",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-ai-booking-agent-demo.webp",
        caption: "AI Booking Agent — YouTube Demo Packaging",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-ai-event-organizer.webp",
        caption: "AI Event Organizer — YouTube Demo Packaging",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-automate-business-ops-control-tower.webp",
        caption: "Automate Business Ops — YouTube Demo Packaging",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/byai-yt-bill-splitter-app-ep02.webp",
        caption: "Bill-Splitter App — YouTube Demo Packaging",
        type: "desktop",
        aspectRatio: "16/9"
      }
    ]
  },
  {
    id: "motion-graphics-social-reels",
    slug: "motion-graphics-social-reels",
    title: "Motion Graphics & Social Reels",
    category: "Brand Systems",
    status: "LIVE",
    company: "SJ Innovation",
    client: "SJ Innovation Global Social Media",
    year: "2025 – Present",
    duration: "Ongoing Series",
    scope: ["Motion Graphics", "Social Reels & TikTok", "Video Storytelling", "Kinetic Typography", "Corporate Milestone Branding", "3D Motion Design"],
    summary: "High-energy vertical short-form video reels, corporate anniversary motion graphics, and cultural storytelling campaigns designed for SJ Innovation's global social channels. Engineered with kinetic typography, 3D badge animations, team archive collages, and dynamic pacing to celebrate milestones, boost audience retention, and drive authentic employer branding.",
    coverImage: "/assets/projects/reels/reel-01-sji-dhaka-22-years.webp",
    liveUrl: "https://www.facebook.com/reel/2352896815516246",
    tldr: {
      challenge: "Corporate celebrations and cultural milestones often translate into static, text-heavy photo galleries that fail to capture real workplace vitality or hook fast-scrolling mobile viewers on Instagram, Facebook Reels, and LinkedIn.",
      role: "Motion Designer & Video Editor — conceived narrative storyboards, curated archival photo and video assets, engineered kinetic typography, integrated sound design, and delivered optimized 9:16 vertical motion formats.",
      method: "Combined layered scrapbook collage aesthetics, 3D anniversary badge lockups, rhythmic beat-matched cuts, and floating handwriting notes to build emotional resonance and high audience watch-through rates."
    },
    problem: "Traditional corporate recap videos feel slow and sterile. Social media audiences demand immediate visual hooks in the first 2 seconds, punchy kinetic transitions, and authentic human emotion that communicates company culture without corporate clichés.",
    process: [
      {
        title: "Scrapbook Collage Aesthetic & 3D Milestone Lockup",
        description: "Conceived a tactile memory-board visual direction that bridges historic milestones with modern agency pride.",
        details: [
          "Designed the central 3D '22 Years Anniversary' emblem featuring multi-line retro-modern geometry with gold and silver foil accents",
          "Layered handwritten sticky notes from actual team members alongside archival event photography and team outings",
          "Structured a dynamic camera fly-through giving physical depth and tactile warmth to corporate memories"
        ]
      },
      {
        title: "Kinetic Rhythm, Beat Matching & Micro-Hooks",
        description: "Engineered high-retention video editing principles to maximize view-through rates on vertical video algorithms.",
        details: [
          "Synchronized fast-paced cuts to an energetic acoustic and percussion soundtrack",
          "Engineered visual anchors in the opening 1.5 seconds to maximize 3-second view-through rates on Facebook and Instagram Reels",
          "Preserved clear visual safe zones for platform UI overlays (likes, comments, profile badges, and sound tickers)"
        ]
      }
    ],
    outcomes: [
      { label: "Motion Formats", value: "9:16 Vertical", subtext: "Full HD vertical motion optimized for Facebook & Instagram Reels" },
      { label: "Assets Delivered", value: "11 Video Reels", subtext: "Across milestones, culture, festivals & CollabAI SaaS product marketing" },
      { label: "Creative Ownership", value: "100% End-to-End", subtext: "Storyboarding, asset sourcing, caricature art, editing & sound" }
    ],
    outcomeSummary: "Transformed company celebrations, bi-weekly team rituals, and member milestones into captivating, high-retention video reels that turned private office moments into inspiring public employer brand equity.",
    gallerySections: [
      {
        sectionTitle: "Corporate Milestones & Global Observances",
        sectionDescription: "High-energy anniversary and cultural celebration reels engineered with kinetic pacing, rich photo collages, and custom character illustration.",
        images: [
          {
            url: "/assets/projects/reels/reel-01-sji-dhaka-22-years.webp",
            caption: "SJ Innovation Dhaka 22nd Anniversary Reel — Tactile scrapbook motion collage with 3D milestone badge and team archive memories.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2352896815516246%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/2352896815516246"
          },
          {
            url: "/assets/projects/reels/reel-04-womens-day-celebration.webp",
            caption: "International Women's Day Celebration Reel — Soothing, elegant floral motion storytelling honoring female innovators across global offices.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F916672407779495%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/916672407779495"
          },
          {
            url: "/assets/projects/reels/reel-06-mens-day-caricature-celebration.webp",
            caption: "International Men's Day Caricature Reel — High-energy motion celebration featuring custom illustrated caricatures for every male team member.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1504548987315950%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/1504548987315950"
          }
        ]
      },
      {
        sectionTitle: "Autonomous Creative & Workplace Culture Initiatives",
        sectionDescription: "Self-directed creative projects and event activations conceived, pitched, and operationalized from the ground up by Sadman without prior prompting.",
        images: [
          {
            url: "/assets/projects/reels/reel-03-member-birthday-carousel-initiative.webp",
            caption: "Member Birthday Carousel Motion Initiative — Ground-up transformation: reimagined static circular cake graphics into dynamic, member-first video spotlights.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1492889088963334%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/1492889088963334"
          },
          {
            url: "/assets/projects/reels/reel-07-friday-fun-activity-initiative.webp",
            caption: "Friday Fun Activity (FFA) — Ground-Up Initiative: Conceived, organized, hosted, and edited bi-weekly team bonding sessions from inception to recap.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F774387224946413%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/774387224946413"
          },
          {
            url: "/assets/projects/reels/reel-05-team-bonding-activity.webp",
            caption: "Team Bonding & Camaraderie Culture Reel — High-tempo event recap capturing unscripted laughter, competitive challenges, and cross-team unity.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2058453101574944%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/2058453101574944"
          },
          {
            url: "/assets/projects/reels/reel-08-biweekly-wellness-session.webp",
            caption: "Bi-Weekly Employee Wellness Session Reel — Calming, mindful video recap capturing desk ergonomics, meditation, and team wellbeing rituals.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2208437409618587%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/2208437409618587"
          }
        ]
      },
      {
        sectionTitle: "Annual Fruit Festival Celebrations (2025 & 2026)",
        sectionDescription: "Vibrant tropical summer event motion recaps capturing multi-campus fruit feasts, seasonal colors, and lively team celebrations across two consecutive years.",
        images: [
          {
            url: "/assets/projects/reels/reel-02-fruit-festival-2026.webp",
            caption: "Fruit Festival 2026 Celebration Reel — Vivid tropical feast motion recap highlighting exotic seasonal harvests, office games, and campus energy.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F973645452155282%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/973645452155282"
          },
          {
            url: "/assets/projects/reels/reel-09-fruit-festival-2025.webp",
            caption: "Fruit Festival 2025 Celebration Reel — Warm nostalgic summer festival recap featuring colorful fruit tables, communal gatherings, and joyful smiles.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F706056789010508%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/706056789010508"
          }
        ]
      },
      {
        sectionTitle: "CollabAI Product Marketing & SaaS Campaigns",
        sectionDescription: "High-impact vertical motion graphics and promotional video campaigns designed for CollabAI, driving product awareness, workflow automation benefits, and holiday sales conversion across Meta channels.",
        images: [
          {
            url: "/assets/projects/reels/reel-10-collabai-nonprofit-ai.webp",
            caption: "CollabAI Nonprofit AI Reel — High-converting motion walkthrough demonstrating 100% free open-source AI dashboard automation, board meeting summaries, and knowledge retrieval.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F791352226744510%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/791352226744510"
          },
          {
            url: "/assets/projects/reels/reel-11-collabai-black-friday-sale.webp",
            caption: "CollabAI Black Friday Extended Offer Reel — Urgency-driven SaaS promotional motion ad promoting $300 off Starter and 20% off Pro plans with dynamic typography and brand motion.",
            aspectRatio: "9/16",
            type: "portrait",
            embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1836781190301543%2F&show_text=false&t=0",
            externalUrl: "https://www.facebook.com/reel/1836781190301543"
          }
        ]
      }
    ],
    galleryImages: [
      {
        url: "/assets/projects/reels/reel-01-sji-dhaka-22-years.webp",
        caption: "SJ Innovation Dhaka 22nd Anniversary Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2352896815516246%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/2352896815516246"
      },
      {
        url: "/assets/projects/reels/reel-02-fruit-festival-2026.webp",
        caption: "Fruit Festival 2026 Celebration Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F973645452155282%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/973645452155282"
      },
      {
        url: "/assets/projects/reels/reel-03-member-birthday-carousel-initiative.webp",
        caption: "Member Birthday Carousel Motion Initiative",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1492889088963334%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/1492889088963334"
      },
      {
        url: "/assets/projects/reels/reel-04-womens-day-celebration.webp",
        caption: "International Women's Day Celebration Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F916672407779495%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/916672407779495"
      },
      {
        url: "/assets/projects/reels/reel-05-team-bonding-activity.webp",
        caption: "Team Bonding Activity & Culture Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2058453101574944%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/2058453101574944"
      },
      {
        url: "/assets/projects/reels/reel-06-mens-day-caricature-celebration.webp",
        caption: "International Men's Day Caricature Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1504548987315950%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/1504548987315950"
      },
      {
        url: "/assets/projects/reels/reel-07-friday-fun-activity-initiative.webp",
        caption: "Friday Fun Activity (FFA) — Ground-Up Initiative",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F774387224946413%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/774387224946413"
      },
      {
        url: "/assets/projects/reels/reel-08-biweekly-wellness-session.webp",
        caption: "Bi-Weekly Employee Wellness Session Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2208437409618587%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/2208437409618587"
      },
      {
        url: "/assets/projects/reels/reel-09-fruit-festival-2025.webp",
        caption: "Fruit Festival 2025 Celebration Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F706056789010508%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/706056789010508"
      },
      {
        url: "/assets/projects/reels/reel-10-collabai-nonprofit-ai.webp",
        caption: "CollabAI Nonprofit AI Product Automation Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F791352226744510%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/791352226744510"
      },
      {
        url: "/assets/projects/reels/reel-11-collabai-black-friday-sale.webp",
        caption: "CollabAI Black Friday Extended Offer Campaign Reel",
        type: "portrait",
        aspectRatio: "9/16",
        embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1836781190301543%2F&show_text=false&t=0",
        externalUrl: "https://www.facebook.com/reel/1836781190301543"
      }
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(currentSlug: string): { prev?: Project; next?: Project } {
  const index = PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return {};
  const prev = index > 0 ? PROJECTS[index - 1] : PROJECTS[PROJECTS.length - 1];
  const next = index < PROJECTS.length - 1 ? PROJECTS[index + 1] : PROJECTS[0];
  return { prev, next };
}
