export const CANONICAL_SITE_URL = "https://sadmanportfolio.vercel.app";

export const PERSON_SAME_AS = [
  "https://www.linkedin.com/in/sadmanzamankhan/",
  "https://github.com/Annyxtopheles",
  "https://x.com/annyxtopheles",
  "https://linktr.ee/sadmanzamankhan",
  "https://instagram.com/ananyanwu",
  "https://facebook.com/SadmanZ.Khan",
  "https://www.youtube.com/@annyxtopheles",
  "https://open.spotify.com/user/cy4txrib5jrbw5b5d25iq9l9f",
  "https://letterboxd.com/Annyxtopheles/",
  "https://myanimelist.net/profile/Annyxtopheles",
  "https://sadmanzamankhan.vercel.app"
];

export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${CANONICAL_SITE_URL}/#person`,
  "name": "Sadman Zaman Khan",
  "alternateName": ["সাদমান জামান খান", "Sadman Khan", "Annyxtopheles"],
  "jobTitle": "UI/UX Designer & AI-Augmented Prototyper",
  "description": "UI/UX Designer and AI-Augmented Prototyper designing enterprise dashboards, AI-native product interfaces, brand systems, and design systems.",
  "url": CANONICAL_SITE_URL,
  "image": `${CANONICAL_SITE_URL}/og-image.webp`,
  "email": "mailto:sadmanz.khan@gmail.com",
  "telephone": "+8801869504388",
  "worksFor": {
    "@type": "Organization",
    "name": "SJ Innovation LLC",
    "url": "https://sjinnovation.com/"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Munshiganj Polytechnic Institute"
  },
  "knowsAbout": [
    "UI/UX Design",
    "Design Systems",
    "Enterprise Dashboards",
    "AI-Augmented Prototyping",
    "Google Antigravity",
    "ComfyUI",
    "Figma Token Architecture",
    "React",
    "Tailwind CSS",
    "Motion Graphics"
  ],
  "sameAs": PERSON_SAME_AS
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${CANONICAL_SITE_URL}/#website`,
  "name": "Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper",
  "url": CANONICAL_SITE_URL,
  "description": "Personal portfolio of Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper designing enterprise dashboards, AI-native product interfaces, and brand systems.",
  "author": {
    "@id": `${CANONICAL_SITE_URL}/#person`
  },
  "inLanguage": "en-US"
};

export const SITE_SETTINGS = {
  name: "Sadman Zaman Khan",
  title: "Sadman Zaman Khan — UI/UX Designer & Writer",
  description: "Portfolio, poetry, and writing by Sadman Zaman Khan.",
  statusLine: "Drinking filtered tap water, fiddling with Figma, listening to Godspeed You! Black Emperor.",
  email: "sadmanz.khan@gmail.com",
  socials: [
    { label: "linkedin", href: "https://www.linkedin.com/in/sadmanzamankhan/" },
    { label: "github", href: "https://github.com/Annyxtopheles" },
    { label: "twitter", href: "https://x.com/annyxtopheles" },
    { label: "linktree", href: "https://linktr.ee/sadmanzamankhan" },
    { label: "instagram", href: "https://www.instagram.com/ananyanwu" },
    { label: "facebook", href: "https://facebook.com/SadmanZ.Khan" },
    { label: "youtube", href: "https://www.youtube.com/@annyxtopheles" },
    { label: "letterboxd", href: "https://letterboxd.com/Annyxtopheles/" },
    { label: "spotify", href: "https://open.spotify.com/user/cy4txrib5jrbw5b5d25iq9l9f" },
    { label: "myanimelist", href: "https://myanimelist.net/profile/Annyxtopheles" },
  ],
  resumeUrl: "/Sadman_Zaman_Khan_Resume.pdf"
};
