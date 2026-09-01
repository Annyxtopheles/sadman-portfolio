export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  created_at: string;
  updated_at?: string;
  cover_image_url?: string | null;
  cover_focal_position?: string | null;
}

export const POSTS: Post[] = [
  {
    id: "71b04ea5-6350-473f-84b7-9bda0e8e9c34",
    slug: "the-oxygen-paradox-how-the-air-we-breathe-may-be-slowly-killing-us",
    title: "The Oxygen Paradox: How the Air We Breathe May Be Slowly Killing Us",
    excerpt: "Every breath you take brings approximately 550 liters of oxygen into your lungs each day. This colorless, odorless gas sustains our cells and powers our bodies, yet it is also steadily oxidizing us from within.",
    body: `Every breath you take brings approximately 550 liters of oxygen into your lungs each day. This colorless, odorless gas sustains our cells and powers our bodies, yet it is also steadily oxidizing us from within.

Oxygen is essential for life, yet chemically volatile. Inside our mitochondria, oxygen accepts electrons during cellular respiration, generating the ATP that powers everything we do. But this process is imperfect. A small fraction of oxygen molecules leak out as reactive oxygen species (ROS) — free radicals that strip electrons from cell membranes, proteins, and DNA.

Over decades, the cumulative toll of oxidative damage contributes to cellular senescence, tissue aging, and degenerative processes. We require oxygen to live, but the very mechanism that grants us energy is a double-edged sword: a vital molecule and a perpetual slow burn.`,
    created_at: "2026-06-27T06:15:36.333Z",
    cover_image_url: "https://i.ibb.co.com/MkGJKbv4/Chat-GPT-Image-Jun-28-2026-07-57-06-AM.png",
    cover_focal_position: "56.6% 17.4%"
  }
];
