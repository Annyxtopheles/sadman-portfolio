export interface Poem {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string | null;
  date?: string | null;
  published_at?: string | null;
  cover_image_url?: string | null;
  cover_focal_position?: string | null;
  tags?: string[];
}

export const POEMS: Poem[] = [
  {
    id: "c8f0379e-d6f6-448f-90e1-0f4ebedb3fdd",
    slug: "cosmotellurian",
    title: "cosmotellurian",
    content: `you are the steadfast stars
made up of bones and satellite
your trenchant fringes sneer at me
don't be my inocciduous guide
godrays glitter at the fringes-
encircle me, levy!
i falter murklins anent the rivage,
rivel at the sevidical visage
of a myriander of perantique souls
crawling out from the sithis-shaped holes
the resiants ecstasiated by your arrival
your disciples gnawed and gouged the presciting tongues out of my mouth
refilled it with a thousand cramoisy magellanic clouds
my eyes now exude scathefire`,
    excerpt: `you are the steadfast stars\nmade up of bones and satellite\nyour trenchant fringes sneer at me\ndon't be my inocciduous guide\ngodrays glitter at the…`,
    date: "June 27, 2026",
    published_at: "2026-06-27T02:43:54.505Z",
    cover_image_url: "https://i.ibb.co.com/d0fmtNTC/SZK-Poetry-Comsotellurian.png",
    tags: ["cosmic", "poetry"]
  }
];
