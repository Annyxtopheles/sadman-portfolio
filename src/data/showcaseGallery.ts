export type PortfolioItemType = 'case-study' | 'shot';

export interface PortfolioItem {
  id: string;
  type: PortfolioItemType;
  title: string;
  category?: string;
  src: string;
  slug?: string; // Link to /portfolio/${slug} if case-study
  summary?: string;
  year?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "case-study-1",
    type: "case-study",
    slug: "icr-debt-surveillance",
    title: "ICR Debt Surveillance Terminal",
    category: "Financial Dashboard · Enterprise UX",
    summary: "A Bloomberg Terminal–style debt intelligence and risk monitoring dashboard for institutional credit investors.",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    year: "2025 – 2026",
  },
  {
    id: "case-study-2",
    type: "case-study",
    slug: "control-tower-suite",
    title: "AI-Native Control Tower Suite",
    category: "Design System · AI Applications",
    summary: "Visual identity and connected design token system for 10+ vertical AI enterprise products.",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    year: "2025 – 2026",
  },
  {
    id: "shot-1",
    type: "shot",
    title: "Fluid Forms & Spatial Distortion",
    category: "3D & Motion",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "shot-2",
    type: "shot",
    title: "Concrete & Light Interplay",
    category: "Spatial Architecture",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "shot-3",
    type: "shot",
    title: "Type Specimens & Grid Cadence",
    category: "Typography",
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "shot-4",
    type: "shot",
    title: "Monochrome Atmospheric Gradients",
    category: "Visual Identity",
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "shot-5",
    type: "shot",
    title: "Editorial Monograph Spread",
    category: "Editorial Design",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "shot-6",
    type: "shot",
    title: "Node Graph Topology",
    category: "Creative Technology",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
  },
];
