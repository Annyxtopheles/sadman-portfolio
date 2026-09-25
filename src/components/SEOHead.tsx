import { Helmet } from 'react-helmet-async';
import { formatSeoTitle, formatMetaDescription } from '@/lib/seoHelpers';

const SITE_URL = 'https://sadmanportfolio.vercel.app';
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
  keywords = 'sadman zaman khan, ui/ux designer, product designer, portfolio, case studies, design systems, ai prototyping',
  image = DEFAULT_OG_IMAGE,
  url,
  article,
  jsonLd,
}: SEOHeadProps) => {
  const pathname =
    url ??
    (typeof window !== 'undefined' ? window.location.pathname : '/');
  const canonical = pathname.startsWith('http') ? pathname : `${SITE_URL}${pathname}`;

  const formattedTitle = formatSeoTitle(title);
  const formattedDescription = formatMetaDescription(description);

  const ogImage = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={formattedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* OpenGraph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content="Sadman Zaman Khan" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={formattedTitle} />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@annyxtopheles" />
      <meta name="twitter:creator" content="@annyxtopheles" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={formattedDescription} />
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
