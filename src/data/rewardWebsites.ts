/**
 * REWARD WEBSITES COLLECTION
 * ---------------------------------------------------------------------------
 * When visitors explore your portfolio and complete the exploration quest,
 * this curated pool of fun, awesome websites is unlocked as their reward.
 *
 * HOW TO ADD OR REPLACE WEBSITES:
 * Simply add or edit entries in the REWARD_WEBSITES array below!
 * Each entry requires:
 * - id: unique identifier string
 * - title: website name
 * - url: website URL (opens in new tab)
 * - description: a short, fun sentence about what you can do there
 * - tag: badge label (e.g. "Interactive Game", "Generative Art", "Audio World")
 */

export interface RewardWebsite {
  id: string;
  title: string;
  url: string;
  description: string;
  tag: string;
}

export const REWARD_WEBSITES: RewardWebsite[] = [
  {
    id: 'zoomquilt',
    title: 'Zoomquilt — Infinitely Zooming Painting',
    url: 'https://zoomquilt.org/',
    description: 'The legendary, hypnotically infinite zooming canvas that seamlessly transitions through surreal fantasy landscapes and psychedelic worlds.',
    tag: 'Infinite Zoom',
  },
  {
    id: 'doodlelab',
    title: 'DoodleLab — Creative Drawing Games',
    url: 'https://doodlelab.fun/',
    description: 'Free daily drawing challenges, creative prompts, and multiplayer sketching games designed to spark imagination and spontaneous play.',
    tag: 'Creative Games',
  },
  {
    id: 'geofs',
    title: 'GeoFS — Free Online Flight Simulator',
    url: 'https://www.geo-fs.com/',
    description: 'A free, community-driven online flight simulator with global satellite terrain and realistic flight physics running directly in your browser.',
    tag: 'Flight Simulator',
  },
  {
    id: 'neal-fun',
    title: 'Neal.fun — Interactive Web Wonders',
    url: 'https://neal.fun/',
    description: 'A brilliant collection of interactive web wonders, deep sea explorations, the password game, and delightful internet toys.',
    tag: 'Interactive Toys',
  },
  {
    id: 'window-swap',
    title: 'WindowSwap',
    url: 'https://www.window-swap.com/',
    description: 'Open a new window somewhere in the world and gaze out with real ambient sounds from Tokyo, Switzerland, or Buenos Aires.',
    tag: 'Atmospheric',
  },
  {
    id: 'radio-garden',
    title: 'Radio Garden',
    url: 'https://radio.garden/',
    description: 'Spin a 3D Earth globe and tune into thousands of live local radio stations broadcasting right now across the planet.',
    tag: 'Audio Globe',
  },
  {
    id: 'quick-draw',
    title: 'Quick, Draw! by Google',
    url: 'https://quickdraw.withgoogle.com/',
    description: 'Can an AI recognize your doodle? A fast, delightful 20-second doodling game powered by machine learning.',
    tag: 'AI Game',
  },
  {
    id: 'pointer-pointer',
    title: 'Pointer Pointer',
    url: 'https://pointerpointer.com/',
    description: 'Hold your cursor still anywhere on the screen and it finds a real photograph of someone pointing precisely at your cursor.',
    tag: 'Internet Classic',
  },
  {
    id: 'slow-roads',
    title: 'Slow Roads',
    url: 'https://slowroads.io/',
    description: 'Endless procedurally generated scenic driving simulator in your browser. Pure chill lofi cruising through hills and snow.',
    tag: '3D Simulation',
  },
  {
    id: 'chrome-music-lab',
    title: 'Chrome Music Lab',
    url: 'https://musiclab.chromeexperiments.com/',
    description: 'Hands-on sound experiments, harmonic grids, spectrograms, and an addictive song maker right in the browser.',
    tag: 'Music & Play',
  },
  {
    id: 'silk-generative-art',
    title: 'Silk Interactive Art',
    url: 'http://weavesilk.com/',
    description: 'Draw glowing symmetrical silk ribbons of light with relaxing ambient soundscapes and generative acoustics.',
    tag: 'Generative Art',
  },
  {
    id: 'drive-and-listen',
    title: 'Drive & Listen',
    url: 'https://driveandlisten.herokuapp.com/',
    description: 'Virtual car windshield ride through Tokyo, London, Paris, or Seoul while streaming live local FM radio.',
    tag: 'Virtual Travel',
  },
  {
    id: 'koalas-to-the-max',
    title: 'Koalas to the Max',
    url: 'https://www.koalastothemax.com/',
    description: 'Hyper-satisfying interactive dot-splitting canvas where your mouse motion pops circles into photographic clarity.',
    tag: 'Tactile Play',
  },
  {
    id: 'stellarium-web',
    title: 'Stellarium Web',
    url: 'https://stellarium-web.org/',
    description: 'An interactive planetarium telescope: explore constellations, nebulae, planets, and real-time night skies.',
    tag: 'Astronomy',
  },
  {
    id: 'the-useless-web',
    title: 'The Useless Web',
    url: 'https://theuselessweb.com/',
    description: 'The golden age StumbleUpon button that teleports you to wonderfully bizarre, surprising single-serving websites.',
    tag: 'Random Portal',
  },
];

/**
 * Helper to pick a random website from the reward pool
 */
export const getRandomWebsite = (excludeId?: string): RewardWebsite => {
  const pool = excludeId
    ? REWARD_WEBSITES.filter((site) => site.id !== excludeId)
    : REWARD_WEBSITES;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || REWARD_WEBSITES[0];
};
