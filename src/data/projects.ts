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
  type?: 'desktop' | 'mobile' | 'system' | 'mockup' | 'carousel' | 'portrait';
  aspectRatio?: string;
  embedUrl?: string;
  videoUrl?: string;
  externalUrl?: string;
}

export interface GallerySection {
  sectionTitle: string;
  sectionDescription?: string;
  documentUrl?: string;
  documentTitle?: string;
  images: GalleryImage[];
}

export interface BeforeAfterComparison {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
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
    galleryImages: [
      {
        url: "/assets/projects/collabai-mockup.webp",
        caption: "CollabAI Redesign Overview — Global quick composer with @agent routing, real-time automation metrics, and active agent streams",
        type: "desktop"
      }
    ],
    beforeAfter: {
      beforeImage: "/assets/projects/collabai-original.webp",
      afterImage: "/assets/projects/collabai-mockup.webp",
      beforeLabel: "Original CollabAI Design",
      afterLabel: "Sadman Redesign",
      caption: "Interactive comparison: CollabAI original interface vs. redesigned minimal workspace with integrated model switching."
    }
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
    liveUrl: "https://annyxtopheles.github.io/clandest-agency-site/",
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
    coverImage: "/assets/projects/buildyourai/byai-nsa-cisa-01-cover.webp",
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
        title: "Multi-Format Meta Ads for NonProfit AI",
        description: "Built responsive Meta advertising creative packages for BuildYourAI's NonProfit AI solution across 1:1, 9:16, and 16:9 aspect ratios, testing visual contrast and direct conversion CTAs.",
        details: [
          "Adapted headline typography and key benefits ('Automate Grant Writing', 'Enhance Donor Relations') for high mobile readability",
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
        sectionTitle: "NonProfit AI — Performance Ad Campaign & Value Drivers",
        sectionDescription: "High-converting paid social ad creatives engineered for NonProfit AI (Powered by Collab AI). Targets nonprofit executives, development directors, and board chairs by translating complex AI automation into immediate operational wins: recovering 18 hours weekly, eliminating duplicate donor records with real UI reporting, price teardowns against enterprise LLMs, deadline tracking, and community impact.",
        images: [
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-01-18-hours-clock.webp",
            caption: "Your Team Just Got 18 Hours Back This Week — 3D ticking clock visual emphasizing automated reporting, fundraising insights, and compliance tracking.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-02-pricing-comparison.webp",
            caption: "Enterprise AI for Nonprofits, Without the Enterprise Price — Transparent pricing comparison contrasting ChatGPT Enterprise ($108k/yr) against Nonprofit Control Tower ($4k/yr).",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-03-grant-deadline-calendar.webp",
            caption: "Never Miss a Grant Deadline Again — Desk flat lay featuring an August calendar deadline and real-time mobile push notifications for grant renewal drafts.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-04-duplicate-donor-ui.webp",
            caption: "Stop Chasing Duplicate Donor Records — 3D tablet mockup showcasing the live Fund Development Report, donor pyramids, and real-time board giving progress.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/nonprofit-ai-ad-05-mission-over-board-reports.webp",
            caption: "Spend More Time on Your Mission, Less Time on Board Reports — Inspiring community volunteer food drive visual highlighting one-click automated board reporting.",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/byai-meta-ad-fundraising-1x1-feed.webp",
            caption: "Square Feed Ad (1:1) — 'Let AI manage your Fundraising Backend Work' targeted for Instagram & Facebook feeds",
            type: "carousel",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/buildyourai/byai-meta-ad-fundraising-9x16-story.webp",
            caption: "Vertical Story & Reels Ad (9:16) — Full-screen mobile engagement with direct booking CTA",
            type: "mobile",
            aspectRatio: "9/16"
          },
          {
            url: "/assets/projects/buildyourai/byai-meta-ad-fundraising-16x9-landscape.webp",
            caption: "Landscape Display Ad (16:9) — Desktop and Audience Network placement",
            type: "desktop",
            aspectRatio: "16/9"
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
        type: "carousel",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/byai-meta-ad-fundraising-9x16-story.webp",
        caption: "Vertical Story & Reels Ad (9:16) — Full-screen mobile engagement with direct booking CTA",
        type: "mobile",
        aspectRatio: "9/16"
      },
      {
        url: "/assets/projects/buildyourai/byai-meta-ad-fundraising-16x9-landscape.webp",
        caption: "Landscape Display Ad (16:9) — Desktop and Audience Network placement",
        type: "desktop",
        aspectRatio: "16/9"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-01-18-hours-clock.webp",
        caption: "NonProfit AI — 18 Hours Back This Week Ad Creative",
        type: "carousel",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-02-pricing-comparison.webp",
        caption: "NonProfit AI — Pricing Comparison vs ChatGPT Enterprise",
        type: "carousel",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-03-grant-deadline-calendar.webp",
        caption: "NonProfit AI — Grant Deadline Alerts Ad Creative",
        type: "carousel",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-04-duplicate-donor-ui.webp",
        caption: "NonProfit AI — Stop Chasing Duplicate Donor Records UI Ad",
        type: "carousel",
        aspectRatio: "1/1"
      },
      {
        url: "/assets/projects/buildyourai/nonprofit-ai-ad-05-mission-over-board-reports.webp",
        caption: "NonProfit AI — Mission Focus Over Board Reports Ad Creative",
        type: "carousel",
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
    coverImage: "/assets/projects/social-greetings/mlk-day/mlk-day-01-vector-podium.webp",
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
        sectionTitle: "Martin Luther King Jr. Day — Visual Explorations",
        sectionDescription: "Five distinct creative interpretations honoring the legacy of Dr. Martin Luther King Jr. for SJ Innovation. Each direction explores a unique artistic medium—from flat vector community storytelling to expressive digital oil paint and dramatic silhouette lighting.",
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
          }
        ]
      },
      {
        sectionTitle: "Pohela Boishakh — Bangla New Year 1433",
        sectionDescription: "Five vibrant creative interpretations celebrating Pohela Boishakh (Bangla New Year 1433) for SJ Innovation. Explores traditional Bengali folk art motifs—from earthen pottery, marigolds, and pinwheels to the iconic Mangal Shobhajatra owl mask and sculpted heritage musical instruments—rendered in modern 3D and graphic compositions with bespoke Bengali typography.",
        images: [
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
        sectionTitle: "Eid al-Fitr Mubarak — Festive Visual Suites",
        sectionDescription: "Five distinct creative directions celebrating Eid al-Fitr for SJ Innovation. Explores themes of fraternal unity, sacred architectural watercolor washes, photorealistic 3D marble minarets, atmospheric dusk lantern photography, and ornate laser-cut Islamic geometric filigree.",
        images: [
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
        sectionTitle: "Happy Easter — Spring Celebration Suites",
        sectionDescription: "Five playful and refined creative directions celebrating Easter for SJ Innovation. Explores themes of minimalist bunny silhouettes, tactile close-up bunny ears, 3D branded glossy eggs, decorative porcelain flat-lays, and papercraft floral aperture cutouts.",
        images: [
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
        sectionTitle: "Happy Holi — Festival of Colors",
        sectionDescription: "Four dynamic and festive creative directions celebrating Holi for SJ Innovation. Highlights organic herbal gulal powder bowls, outdoor action captures of hands pouring saffron powder, large-scale campus courtyard floor rangoli mandalas, and high-energy dual-tone explosive powder collisions.",
        images: [
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
        sectionTitle: "Independence Day of Bangladesh — 26 March",
        sectionDescription: "Three solemn and monumental creative directions commemorating Bangladesh's Independence Day for SJ Innovation. Features geometric vector representations of the National Martyrs' Memorial (Jatiyo Smriti Soudho), monumental freedom fighter silhouettes with soaring peace doves, and dramatic low-angle perspective photography.",
        images: [
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
        sectionTitle: "International Day of Happiness — 20 March",
        sectionDescription: "Three uplifting creative directions celebrating International Day of Happiness for SJ Innovation. Explores executive thought-leadership quote cards from leadership, tactile 3D crafted smiley characters surrounded by floating emoji gems, and a whimsical cinematic street-food hamster celebrating unpretentious everyday joy.",
        images: [
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
        sectionTitle: "International Women's Day — 8 March",
        sectionDescription: "Three vibrant and empowering creative directions celebrating International Women's Day for SJ Innovation. Explores 3D sculpted floral bouquets cradled in hands, overhead circles of solidarity celebrating teamwork, and an energetic multicultural group portrait of diverse women.",
        images: [
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
        sectionTitle: "International Mother Language Day — 21 February",
        sectionDescription: "Three poignant creative directions honoring the 1952 Language Movement and International Mother Language Day for SJ Innovation. Features a majestic sunrise over the Central Shaheed Minar with floating Bengali typography, archival historical photography of the 1952 protest procession with illuminated neon placards, and a minimalist modern tribute with ethereal vertical light pillars, glowing sun disc, and subtle floating Bengali script.",
        images: [
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
        sectionTitle: "International May Day — 1 May",
        sectionDescription: "Three compelling creative directions commemorating International Workers' Day for SJ Innovation. Explores high-contrast architectural labor silhouettes, a 3D isometric toolkit bridging manual craftsmanship with modern computing, and a contemporary tech developer workstation against urban skyline scaffolding.",
        images: [
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
        sectionTitle: "Ramadan Mubarak — Sacred Reflections",
        sectionDescription: "Two warm and heartwarming creative directions celebrating the holy month of Ramadan for SJ Innovation. Highlights communal Iftar traditions of sharing fresh dates at golden sunset, and a joyful 3D animated Muslim family gathered around the Iftar dining table.",
        images: [
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
        sectionTitle: "Republic Day of India — 26 January (गणतंत्र दिवस)",
        sectionDescription: "Three majestic creative directions commemorating Republic Day of India for SJ Innovation. Features historic red sandstone vector silhouettes of the Red Fort (Lal Qila) in Delhi, golden hour architectural photography of Mughal ramparts, and monumental flowing Tiranga tricolor drapes framing the fort courtyard.",
        images: [
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
        sectionTitle: "US Memorial Day — In Memory of the Fallen",
        sectionDescription: "Three solemn and dignified commemorative visual directions honoring fallen service members for SJ Innovation. Explores a textural American flag honor roll of names, a poignant white marble cemetery cross adorned with fresh tulips and a miniature flag, and military buglers playing Taps against a silent field of inscribed heroes.",
        images: [
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
        sectionTitle: "Independence Day of India — 15 August (स्वतंत्रता दिवस)",
        sectionDescription: "Three stirring creative directions celebrating India's Independence Day for SJ Innovation. Spans majestic air force flypasts trailing saffron, white, and green tricolor plumes over India Gate, an impressionist watercolor architectural wash, and a heroic bronze monument of soldiers raising the Tiranga.",
        images: [
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
        sectionTitle: "Father's Day — Celebrating Guidance & Love",
        sectionDescription: "Seven heartwarming and modern creative directions honoring Father's Day for SJ Innovation. Explores themes of gentle guidance, superhero mentorship, playful building, and shared outdoor moments—from minimalist hand-in-hand silhouettes and piggyback joy to building block collaboration and watercolor tree swing reflections.",
        images: [
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
        sectionTitle: "International Programmer's Day — Code, Innovation & Craft",
        sectionDescription: "Three electrifying creative directions celebrating International Programmer's Day for SJ Innovation. Spans floating glowing glassmorphic tech stack icons, a cinematic dual-screen late-night development setup with AI aura, and a futuristic Creation of Adam motif symbolizing the synergy between human developers and AI.",
        images: [
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
        sectionTitle: "Eid al-Adha Mubarak — Sacred Traditions & Devotion",
        sectionDescription: "Five elevated creative directions celebrating Eid al-Adha (1447 H) for SJ Innovation. Explores architectural grand mosques under vivid saffron skies, the sacred low-poly summit of Mount Arafat with celestial mandala linework, dual-tone watercolor minaret silhouettes, twilight coastal cityscapes, and historic Islamic keyhole archways overlooking golden sunset horizons.",
        images: [
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
        sectionTitle: "International Men's Day — Celebrating Guidance & Quiet Strength (19 November)",
        sectionDescription: "Sleek social media commemorative graphic designed for International Men's Day honoring dedication, mentorship, and quiet strength. Features a tailored suit silhouette, bold orange polka-dot necktie, subtle gender symbol watermark, and playful mustache emblem integrated into high-contrast typography.",
        images: [
          {
            url: "/assets/projects/social-greetings/international-mens-day-social.webp",
            caption: "International Men's Day Social Greeting — Modern sartorial styling with tailored suit lapel, polka-dot necktie, and custom mustache typography on deep cobalt blue.",
            type: "carousel",
            aspectRatio: "1/1"
          }
        ]
      },
      {
        sectionTitle: "US Veteran's Day — Honoring All Who Served (11 November)",
        sectionDescription: "Solemn and patriotic commemorative visual suite honoring US military veterans. Explores three powerful visual directions: a waving American flag over an illuminated sunburst sky, a double-exposure officer silhouette with circular flag shield, and a high-contrast tactical squad rendering honors on a dawn ridge.",
        images: [
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
        sectionTitle: "Executive Thought Leadership & Op-Ed Campaigns (NYC AI Policy)",
        sectionDescription: "High-impact social media campaign creative promoting an executive op-ed co-authored by Shahed Islam (CEO, SJ Innovation) and Tom Grech (CEO, Queens Chamber of Commerce). Highlights AI's transformative impact on New York City and advocates for forward-thinking, inclusive municipal AI policymaking.",
        images: [
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
    id: "icr-debt-surveillance",
    slug: "icr-debt-surveillance",
    title: "ICR Debt Surveillance Terminal",
    category: "Enterprise Dashboards",
    status: "CASE STUDY",
    company: "SJ Innovation",
    client: "Institutional Credit Investors",
    year: "2025 – 2026",
    duration: "3 Months",
    scope: ["Financial UI", "Tabular Architecture", "Design Systems", "Figma Prototyping"],
    summary: "A Bloomberg Terminal–style debt intelligence and risk monitoring dashboard for institutional credit investors.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    liveUrl: null,
    tldr: {
      challenge: "Institutional credit analysts were losing hours cross-referencing covenant triggers, liquidity ratios, and debt maturities across 100+ corporate issuers in fragmented spreadsheets.",
      role: "Lead Product Designer — designed the entire 15-module configurable dashboard and tabular typographic system.",
      method: "Engineered strict typographic micro-grids and stress-tested interactive prototypes in Figma and low-code React wrappers to validate zero-latency interaction models."
    },
    problem: "Financial analysts operate in high-stakes environments where covenant breaches must be identified within seconds. The interface needed to present dense financial metrics—including maturity curves, debt tranches, and liquidity runway—without sacrificing legibility across multi-monitor terminal setups.",
    process: [
      {
        title: "15-Module Configurable Grid Architecture",
        description: "Developed a modular card structure allowing analysts to arrange surveillance modules (issuer summary, covenant compliance matrix, debt maturity schedule, alert feeds) to fit their workflow.",
        details: [
          "Monospace tabular baseline alignment for rapid numerical scanning across columns",
          "Color-coded risk status badges with WCAG AA compliance against dark charcoal backgrounds",
          "Custom multi-issuer comparison drawers for rapid debt structure analysis"
        ]
      },
      {
        title: "Zero-Latency Micro-Interactions & Prototyping",
        description: "Built interactive stress-test models in Figma and low-code sandboxes to simulate real-time rate shock scenarios, ensuring data filtering felt instantaneous.",
        details: [
          "Contextual hover tooltips with complete tranche breakdown details",
          "One-click export formatting for investor committee memorandums"
        ]
      }
    ],
    aiWorkflow: "Leveraged Figma AI scripting and automated data populators to generate realistic multi-tranche financial datasets across 100+ simulated corporate issuers, cutting component stress-testing time in half.",
    outcomes: [
      { label: "Portfolio Audit Time", value: "-65%", subtext: "Reduction in manual data lookup across sample investor portfolios" },
      { label: "Design System Modules", value: "15+", subtext: "Modular dashboard components adopted as enterprise analytics standards" },
      { label: "Covenant Breach Discovery", value: "Instant", subtext: "Visual alert threshold system replaced manual spreadsheet auditing" }
    ],
    outcomeSummary: "The resulting interface compressed high-density institutional risk tracking into an intuitive, zero-latency dashboard that reduced investor review cycles from hours to minutes.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
        caption: "Main ICR Surveillance Terminal — 15-module configurable risk monitoring layout",
        type: "desktop"
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
        caption: "Tabular data hierarchy & covenant stress-testing interaction state",
        type: "system"
      },
      {
        url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1400&auto=format&fit=crop",
        caption: "Issuer debt maturity ladder and liquidity distribution visualization",
        type: "mockup"
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
      }
    ],
    aiWorkflow: "Integrated Figma AI agents and prompt-driven scene composition to rapidly explore lighting moods and architectural 3D metaphors, finalizing vector logos and typography natively in Figma.",
    outcomes: [
      { label: "Products Branded", value: "10 Verticals", subtext: "ePhysician, Mortgage, HR, Marketing, Realtor, NonProfit, GHL, Client Success, Agency, & Restaurant" },
      { label: "Logos & Identities", value: "100% Custom", subtext: "Original brand marks and domain color palettes designed from scratch" },
      { label: "Assets Delivered", value: "15 Production Designs", subtext: "10 OpenGraph social cards & 5 ePhysician clinical ad creatives" }
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
      }
    ]
  },
  {
    id: "alyssa-kristin-bridal",
    slug: "alyssa-kristin-bridal",
    title: "Alyssa Kristin Luxury Bridal Ecosystem",
    category: "Mobile & Web",
    status: "SHIPPED",
    company: "SJ Innovation",
    client: "Alyssa Kristin Bridal (US)",
    year: "2025 – 2026",
    duration: "4 Months",
    scope: ["Mobile iOS App", "Admin CMS", "Client CRM", "Design System"],
    summary: "Three interconnected luxury bridal experiences (Stylist Mobile App, Admin CMS, Client CRM) powered by a single unified design foundation.",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
    liveUrl: null,
    tldr: {
      challenge: "Showroom bridal stylists were navigating fragmented desktop portals to record bride preferences, check gown inventory, and follow up with custom quotes.",
      role: "Lead UI/UX Designer — mapped the entire in-showroom bridal journey and designed the multi-platform ecosystem.",
      method: "Designed an ergonomic one-handed iOS stylist app, connected back-office admin CMS, and customer relationship portal using rapid low-code functional prototyping."
    },
    problem: "Bridal appointments require uninterrupted personal connection. Stylists needed to pull up dress catalogs, note custom alterations, and capture bride feedback on a mobile device without breaking eye contact or fumbling through nested menus.",
    process: [
      {
        title: "Ergonomic One-Handed Stylist Mobile UI",
        description: "Tailored bottom-sheet navigation and quick-tagging filters so stylists can effortlessly document gown selections while assisting brides in fitting suites.",
        details: [
          "Fast gown lookbook with instant size and showroom sample availability",
          "Visual moodboard tagging directly linked to bride profile records",
          "Automated post-appointment summary generation for instant client follow-up"
        ]
      },
      {
        title: "Connected Admin CMS & CRM Architecture",
        description: "Built the centralized dashboard for studio managers to manage trunk shows, track gown production timelines, and analyze sales conversion data.",
        details: [
          "Seamless data synchronization across mobile app, web CMS, and client email workflows",
          "Refined luxury brand aesthetic with generous whitespace and high-fashion editorial typography"
        ]
      }
    ],
    aiWorkflow: "Utilized rapid low-code deployment tools to test live stylist workflows on real iPhone devices during fitting simulations prior to production handoff.",
    outcomes: [
      { label: "Stylist Adoption", value: "100%", subtext: "Full showroom adoption across US bridal studio teams" },
      { label: "Quote Turnaround", value: "< 5 min", subtext: "From appointment completion to automated bride quote delivery" },
      { label: "Platforms Connected", value: "3-in-1", subtext: "Stylist App, Admin CMS, and Client CRM sharing one unified database" }
    ],
    outcomeSummary: "Delivered a high-elegance, high-speed ecosystem that elevated the luxury showroom experience while eliminating administrative back-office bottlenecks.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
        caption: "Stylist mobile interface and showroom gown inventory lookup",
        type: "mobile"
      },
      {
        url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1400&auto=format&fit=crop",
        caption: "Back-office inventory management and appointment CRM workflow",
        type: "desktop"
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
    coverImage: "/assets/projects/nexura/nexura-guidelines-01-cover.webp",
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
    id: "print-designs",
    slug: "print-designs",
    title: "Print & Workplace Visual Systems",
    category: "Brand Systems",
    status: "LIVE",
    company: "SJ Innovation",
    client: "SJ Innovation LLC",
    year: "2025 – Present",
    duration: "Ongoing Series",
    scope: ["Print Design", "Infographics", "Workplace Culture", "Recognition Certificates", "Typography", "Editorial Layout", "Poster Design", "Sports Day Placards"],
    summary: "Physical print collateral, workplace infographics, large-format motivational office posters, appreciation certificate systems, personalized member keepsake cards, and Annual Sports Day team logos and marching placards designed for SJ Innovation and the SJ Control Tower team. Features structured corporate best-practice guides, energetic culture-building wall art, official honors honoring team excellence, and high-octane competitive team emblems.",
    coverImage: "/assets/projects/print-designs/effective-meetings-3-steps-infographic.webp",
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
      { label: "Mediums", value: "Print & Stationery", subtext: "Infographics, posters, awards, birthday cards, & placards" },
      { label: "Assets Delivered", value: "26 Designs", subtext: "3 infographics, 2 wall posters, 6 award certificates, 3 Women's Day, 6 birthday cards, 4 sports placards, 2 Men's Day" },
      { label: "Office Deployment", value: "Multi-Campus", subtext: "Displayed across meeting rooms, events & collaborative spaces" }
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
          },
          {
            url: "/assets/projects/print-designs/employee-happiness-7-dimensions-infographic.webp",
            caption: "7 Dimensions of Employee Happiness — Workplace Wellbeing Framework",
            aspectRatio: "461/1024"
          }
        ]
      },
      {
        sectionTitle: "Office Culture & Motivational Wall Posters",
        sectionDescription: "Large-format environmental posters designed to energize engineering pods and communal break areas, celebrating grit, championship mindset, and everyday team camaraderie.",
        images: [
          {
            url: "/assets/projects/print-designs/mohammad-ali-champion-office-poster.webp",
            caption: "Mohammad Ali Champion Mindset Poster — 'Live the Rest of Your Life as a Champion'",
            aspectRatio: "682/1024"
          },
          {
            url: "/assets/projects/print-designs/laughter-team-building-vertical-poster.webp",
            caption: "Culture Banner — 'Laughter is the Best Team-Building Exercise'",
            aspectRatio: "512/1024"
          }
        ]
      },
      {
        sectionTitle: "Recognition Systems — SJ Control Tower Appreciation Certificates",
        sectionDescription: "Modular certificate design system created for the SJ Control Tower internal recognition program. Designed in horizontal A4 landscape format with distinct domain badge iconography, subtle geometric grid and topological linework textures, and brand-aligned pastel gradients honoring exceptional team contributions.",
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
        url: "/assets/projects/print-designs/employee-happiness-7-dimensions-infographic.webp",
        caption: "Workplace Infographic — 7 Dimensions of Employee Happiness",
        type: "portrait"
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
    summary: "Unsolicited creative initiatives conceived, designed, pitched, and operationalized autonomously for SJ Innovation. Spans modular 3D talent acquisition campaigns and a ground-up recognition initiative that transformed private Keka HRMS honors into public social media showcases with senior, managerial, and COO approval.",
    coverImage: "/assets/projects/creative-initiatives/hiring-01-uiux-graphic-design-internship.webp",
    liveUrl: null,
    tldr: {
      challenge: "Internal employee recognition and talent hiring were historically locked inside silent internal HR tools (Keka certificates and plain text notices), missing opportunities to celebrate talent and build public employer brand equity.",
      role: "Self-Directed Designer — identified organizational opportunities, built end-to-end design systems without prompting, and systematically navigated multi-tier executive approvals (Senior Designer → Engineering Manager → Chief Operating Officer) to launch company-wide initiatives.",
      method: "Conceived high-craft 3D glassmorphic social frameworks for monthly performer honors, new hire welcomes, and department hiring, turning private internal milestones into public-facing company pride."
    },
    problem: "Without dedicated creative requests from HR, talent acquisition posts and monthly performer honors remained functional but visually uninspired. Recognizing that first impressions dictate talent inbound quality and employee morale, Sadman took the initiative to build polished, production-ready social campaign systems without being prompted, securing multi-tier executive buy-in.",
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
          "Extended the framework to create standardized 'Welcome Aboard' employee onboarding announcements across global offices (e.g., Goa, Dhaka, New York)"
        ]
      }
    ],
    outcomes: [
      { label: "Initiative Origin", value: "100% Proactive", subtext: "Self-directed from conception to executive sign-off" },
      { label: "Approval Ladder", value: "3-Tier Signoff", subtext: "Pitched & approved by Senior, Manager, & COO" },
      { label: "HR Impact", value: "Company-Wide", subtext: "Keka honors elevated to public employer brand equity" }
    ],
    outcomeSummary: "Demonstrated the power of unsolicited design leadership—transforming standard HR communications and internal certificates into captivating social showcases that strengthened employee pride and employer brand perception.",
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
          }
        ]
      },
      {
        sectionTitle: "Internal Recognition & Talent Onboarding — Keka to Public Social Showcases",
        sectionDescription: "Proactive cultural initiative conceived from the ground up: previously, monthly employee honors were locked inside internal HR software (Keka) as simple PDF certificates. Sadman conceptualized transforming these into public-facing, high-craft social showcases—pitching the concept upwards from Senior Designer to Engineering Manager and the Chief Operating Officer (COO) to secure complete executive approval. Accompanied by standardized 'Welcome Aboard' talent arrival showcases.",
        images: [
          {
            url: "/assets/projects/creative-initiatives/recognition-performer-of-month-sadman.webp",
            caption: "Performer of the Month — Ground-Up Initiative Pitching & Launching Social Recognition (Sadman Zaman Khan, November 2025)",
            aspectRatio: "1/1"
          },
          {
            url: "/assets/projects/creative-initiatives/onboarding-welcome-leandra-sol.webp",
            caption: "Welcome Aboard Social Showcase — Standardized Talent Onboarding System (Leandra Sol, Digital Marketing Executive, Goa)",
            aspectRatio: "1/1"
          }
        ]
      }
    ],
    galleryImages: [
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
        caption: "Welcome Aboard — Talent Onboarding Social Showcase",
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
    coverImage: "/assets/projects/thumbnails/thumb-sji-claude-ai-2026.webp",
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
