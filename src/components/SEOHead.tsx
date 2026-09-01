import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://sadmanzamankhan.pages.dev';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.webp`;

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  jsonLd?: object | object[];
}

export const SEOHead = ({
  title,
  description,
  keywords = 'sadman zaman khan, ui/ux designer, product designer, portfolio, poetry, blog, typography',
  image = DEFAULT_OG_IMAGE,
  url,
  article,
  jsonLd,
}: SEOHeadProps) => {
  const pathname =
    url ??
    (typeof window !== 'undefined' ? window.location.pathname : '/');
  const canonical = pathname.startsWith('http') ? pathname : `${SITE_URL}${pathname}`;

  const fullTitle = /sadman zaman khan/i.test(title)
    ? title
    : `${title} — Sadman Zaman Khan`;

  const ogImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* OpenGraph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content="Sadman Zaman Khan" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@annyxtopheles" />
      <meta name="twitter:creator" content="@annyxtopheles" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article metadata if applicable */}
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}

      {/* Structured Data (JSON-LD) */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};
