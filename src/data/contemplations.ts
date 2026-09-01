export interface Contemplation {
  id: string;
  title: string;
  category?: string;
  body: string;
  date?: string;
  link?: string;
}

export const CONTEMPLATIONS: Contemplation[] = [
  {
    id: '1',
    title: 'The illusion of linear velocity',
    category: 'philosophy',
    body: 'Modern tools accelerate output speed while subtly compressing the quiet, contemplative window required to form truly novel paradigms.',
    date: 'August 2026',
  },
  {
    id: '2',
    title: 'Atmospheric weight in monochrome UI',
    category: 'design theory',
    body: 'Why stark black and white layouts feel heavier, more permanent, and less disposable than ephemeral color gradients.',
    date: 'July 2026',
  },
  {
    id: '3',
    title: 'Cosmic scale vs. the small hours',
    category: 'contemplation',
    body: 'How midnight writing distills sprawling thoughts into concentrated verse without the ambient noise of daylight demands.',
    date: 'June 2026',
  },
];
