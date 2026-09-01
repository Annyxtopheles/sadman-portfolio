export interface AchievementItem {
  id: string;
  metric: string;
  label: string;
  detail: string;
  tag?: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    metric: "10+",
    label: "Enterprise AI Products",
    detail: "Spearheaded end-to-end UX architecture and design token systems for 10+ vertical AI enterprise applications.",
    tag: "Design Systems",
  },
  {
    id: "ach-2",
    metric: "40%",
    label: "Prototype Velocity Gain",
    detail: "Accelerated concept-to-functional prototype delivery by 40% utilizing tokenized Figma workflows and AI tooling.",
    tag: "Product Velocity",
  },
  {
    id: "ach-3",
    metric: "200+",
    label: "Global Production Assets",
    detail: "Engineered multi-channel brand assets, ad pipelines, and digital collateral for US-based marketing campaigns.",
    tag: "Brand Production",
  },
  {
    id: "ach-4",
    metric: "4.0",
    label: "Distinction Score",
    detail: "Awarded top-tier evaluation for the NEXURA Comprehensive Brand Identity System and 40-page standards book.",
    tag: "Brand Identity",
  },
  {
    id: "ach-5",
    metric: "5+",
    label: "Accredited Certifications",
    detail: "Credentialed in Figma Design Systems, Anthropic Claude Code, Accenture UX, and HubSpot Inbound Systems.",
    tag: "Continuous Craft",
  },
  {
    id: "ach-6",
    metric: "100%",
    label: "On-Time Client Delivery",
    detail: "Maintained a spotless track record across independent design contracts, dashboards, and startup brand launches.",
    tag: "Execution",
  },
];
