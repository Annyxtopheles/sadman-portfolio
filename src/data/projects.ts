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
  galleryImages: {
    url: string;
    caption: string;
    type?: 'desktop' | 'mobile' | 'system' | 'mockup';
  }[];
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
    title: "Collab RT Multi-Agent Workspace",
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
        caption: "Collab RT Overview — Global quick composer with @agent routing, real-time automation metrics, and active agent streams",
        type: "desktop"
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
    id: "szk-personal-archive",
    slug: "szk-personal-archive",
    title: "SZK Personal Digital Archive",
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
        caption: "SZK Archive — Minimalist editorial landing view with stark typography and poetry navigation",
        type: "desktop"
      },
      {
        url: "/assets/projects/szk-lanyard.webp",
        caption: "Interactive 3D Rapier physics badge & identity card system",
        type: "desktop"
      }
    ]
  },
  {
    id: "control-tower-suite",
    slug: "control-tower-suite",
    title: "AI-Native Control Tower Suite",
    category: "AI Systems",
    status: "SHIPPED",
    company: "SJ Innovation",
    client: "Internal & Enterprise Clients",
    year: "2025 – 2026",
    duration: "Ongoing",
    scope: ["Design System", "Multi-Product Architecture", "AI Workflows", "Design Tokens"],
    summary: "Visual identity and connected design token system for 10+ vertical AI enterprise products including ePhysician, Marketing AI, and RealtorHelp.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
    liveUrl: null,
    tldr: {
      challenge: "Scaling 10+ vertical AI enterprise products (ePhysician, MortgageAI, RealtorHelp, HR CT, Agency CT) with a single designer without fracturing UX consistency or slowing engineering sprints.",
      role: "Sole Product & Brand Designer — architected the global design token system, generative UI primitives, and cross-vertical component library.",
      method: "Created a connected Figma token architecture linked to front-end variables, using AI-augmented workflows to rapidly prototype domain-specific AI chat and dashboard states."
    },
    problem: "Each industry vertical required tailored workflows (e.g. clinical records for ePhysician, property comp tables for RealtorHelp, loan underwriting for MortgageAI), yet development velocity required a shared design token foundation to eliminate design drift.",
    process: [
      {
        title: "Multi-Brand Design Token Architecture",
        description: "Built a token taxonomy in Figma supporting light/dark theme semantics, distinct brand accent overrides, and shared functional primitives.",
        details: [
          "Standardized conversational AI states: streaming, tool invocation, markdown code rendering, and error recovery",
          "Component library covering data tables, KPI metrics cards, agent action trays, and filter rails",
          "Comprehensive design documentation enabling engineers to build new vertical screens with minimal handoff friction"
        ]
      },
      {
        title: "AI-Augmented Prototyping Workflow",
        description: "Prototyped multi-turn agent interactions and dynamic responses using Lovable and low-code React wrappers, compressing stakeholder alignment from weeks to days.",
        details: [
          "Simulated live LLM stream states and latency fallbacks in high-fidelity prototypes",
          "Tested cognitive load during agent multi-step reasoning displays"
        ]
      }
    ],
    aiWorkflow: "Integrated Figma AI agents and prompt-driven wireframing tools to accelerate initial variant generation by 40%, allowing rapid testing of domain-specific layouts.",
    outcomes: [
      { label: "Sprint Velocity", value: "+40%", subtext: "Acceleration in wireframe-to-functional prototype delivery" },
      { label: "Vertical Products", value: "10+", subtext: "AI enterprise products powered by the unified design system" },
      { label: "Design Consistency", value: "100%", subtext: "Zero UI drift across parallel cross-functional engineering teams" }
    ],
    outcomeSummary: "Established a scalable design engine that enabled a single designer to power 10+ enterprise AI products with visual cohesion and speed.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
        caption: "Control Tower global design token system and vertical AI interface suite",
        type: "desktop"
      },
      {
        url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop",
        caption: "Conversational agent interaction patterns and streaming status indicators",
        type: "system"
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
    client: "NEXURA Technologies",
    year: "2025",
    duration: "2 Months",
    scope: ["Brand Identity", "Design System", "Typography Manual", "3D Collateral"],
    summary: "End-to-end brand system featuring responsive logo marks, custom typographic hierarchy, and 20+ real-world application mockups.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1400&auto=format&fit=crop",
    liveUrl: null,
    tldr: {
      challenge: "Creating an enterprise-grade brand system capable of scaling across high-density software UIs, print marketing assets, and physical hardware touchpoints.",
      role: "Sole Brand Designer — engineered the complete visual identity, vector geometry rules, and 40-page brand guidelines manual.",
      method: "Combined mathematical grid systems with high-contrast monochrome palettes, validating legibility across 20+ digital and physical application formats."
    },
    problem: "Modern tech brands frequently suffer from generic minimalism that fails to convey engineering depth. The identity needed to feel authoritative, precise, and immediately recognizable at any scale.",
    process: [
      {
        title: "Mathematical Vector Geometry & Responsive Marks",
        description: "Constructed the core mark using optical geometry with dedicated micro-sizes engineered for high-DPI favicons and UI taskbar icons.",
        details: [
          "40-page comprehensive brand manual covering clear space, typography pairing, and improper usage rules",
          "Full digital design token specification exported directly for Tailwind and CSS custom properties",
          "20+ production mockups including software packaging, mobile app icons, and corporate signage"
        ]
      }
    ],
    aiWorkflow: "Leveraged automated asset generation pipelines to batch-export 50+ vector variations across multiple colorways and aspect ratios in seconds.",
    outcomes: [
      { label: "Academic Evaluation", value: "4.0 / 4.0", subtext: "Top capstone rating for brand architecture rigor and execution" },
      { label: "Touchpoints Documented", value: "20+", subtext: "Digital and physical assets rendered with complete specifications" }
    ],
    outcomeSummary: "Established a comprehensive visual identity system that was selected as a benchmark model for internal design guidelines at SJ Innovation.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1400&auto=format&fit=crop",
        caption: "NEXURA brand guidelines manual and typographic grid architecture",
        type: "system"
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
