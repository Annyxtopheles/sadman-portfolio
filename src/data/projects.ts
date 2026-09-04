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
}

export interface GallerySection {
  sectionTitle: string;
  sectionDescription?: string;
  documentUrl?: string;
  documentTitle?: string;
  images: GalleryImage[];
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
        sectionTitle: "NonProfit AI — Meta Ad Campaign Multi-Format Suite",
        sectionDescription: "Responsive Meta advertising creative package designed for BuildYourAI's NonProfit AI fundraising automation solution. Formatted across 1:1 Feed, 9:16 Story/Reels, and 16:9 Landscape placements to drive automated grant writing and donor management signups.",
        images: [
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
        sectionTitle: "Pohela Boishakh — Bangla New Year 1433 (শুভ নববর্ষ)",
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
            caption: "Direction 02 — Boishakhi Fair Pinwheels: Nostalgic paper wind spinners (চরকি) against clear azure skies, evoking rural festival childhood memories.",
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
        sectionTitle: "Happy Holi — Festival of Colors (রঙের উৎসব)",
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
        sectionTitle: "Independence Day of Bangladesh — 26 March (মহান স্বাধীনতা দিবস)",
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
        sectionTitle: "International Day of Happiness — 20 March (আন্তর্জাতিক সুখ দিবস)",
        sectionDescription: "Two uplifting creative directions celebrating International Day of Happiness for SJ Innovation. Explores executive thought-leadership quote cards from leadership and tactile 3D crafted smiley characters surrounded by floating emoji gems.",
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
          }
        ]
      },
      {
        sectionTitle: "International Women's Day — 8 March (আন্তর্জাতিক নারী দিবস)",
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
        sectionTitle: "International Mother Language Day — 21 February (আন্তর্জাতিক মাতৃভাষা দিবস)",
        sectionDescription: "Two poignant creative directions honoring the 1952 Language Movement and International Mother Language Day for SJ Innovation. Features a majestic sunrise over the Central Shaheed Minar with floating Bengali typography, and archival historical photography of the 1952 protest procession with illuminated neon placards.",
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
          }
        ]
      },
      {
        sectionTitle: "International May Day — 1 May (মহান মে দিবস)",
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
        sectionTitle: "Ramadan Mubarak — Sacred Reflections (মাহে রমজান)",
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
        sectionTitle: "Father's Day — Celebrating Guidance & Love (বাবা দিবস)",
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
        sectionTitle: "International Programmer's Day — Code, Innovation & Craft (প্রোগ্রামার দিবস)",
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
