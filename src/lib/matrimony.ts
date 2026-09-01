import matrimonyData from '@/data/matrimony.json';

export type MatrimonyAmbient = {
  enabled?: boolean;
  source?: 'url' | 'upload';
  url?: string | null;
  volume?: number;
  loop?: boolean;
};

export type MatrimonyChip = { label: string; url?: string | null };
export type CategoryChips = Record<string, MatrimonyChip[] | string | string[]>;

export type MatrimonyProfile = {
  headline: string | null;
  bio: string | null;
  videoUrl: string | null;
  pdfUrl: string | null;
  family: Record<string, any>;
  interests: CategoryChips;
  goals: CategoryChips;
  contact: Record<string, any>;
  ambient: MatrimonyAmbient;
  faq?: { question: string; answer: string }[];
  updatedAt: string | null;
};

export type MatrimonyPhoto = {
  id: string;
  caption: string | null;
  category: string;
  sort_order: number;
  url: string | null;
  focal_position: string;
};

export type MatrimonySkill = {
  id: string;
  kind: 'language' | 'skill' | 'certification' | 'testimonial_link';
  label: string;
  level: number | null;
  detail: string | null;
  url: string | null;
  sort_order: number;
};

export type MatrimonyQuizOption = { id: string; label: string; score: number; sort_order: number };
export type MatrimonyQuizQuestion = {
  id: string;
  prompt: string;
  axis: string;
  weight: number;
  sort_order: number;
  owner_ideal_score: number | null;
  options: MatrimonyQuizOption[];
};

export type MatrimonyContactItem = {
  icon?: string;
  label?: string;
  value?: string;
};

export type MatrimonyFamilyNode = {
  id: string;
  relation: string;
  name: string;
  location_label?: string | null;
  lat?: number | null;
  lng?: number | null;
  profession?: string | null;
  icon?: string | null;
  note?: string | null;
  bio?: string | null;
  birth_place?: string | null;
  birth_year?: number | null;
  education?: string | null;
  occupation_detail?: string | null;
  contact_info?: Record<string, unknown> | Array<MatrimonyContactItem>;
  sort_order: number;
  mother_id?: string | null;
  father_id?: string | null;
  is_self?: boolean;
  photoUrl?: string | null;
  achievements?: string[];
};

export type MatrimonyPayload = {
  profile: MatrimonyProfile;
  photos: MatrimonyPhoto[];
  skills: MatrimonySkill[];
  quiz: MatrimonyQuizQuestion[];
  familyNodes: MatrimonyFamilyNode[];
};

export async function fetchProfile(): Promise<MatrimonyPayload> {
  return matrimonyData as unknown as MatrimonyPayload;
}
