import React from 'react';
import { useParams } from 'react-router-dom';
import { PROJECTS } from '@/data/projects';
import { ContentDetailLayout } from '@/components/ContentDetailLayout';
import { SEOHead } from '@/components/SEOHead';
import NotFound from '@/pages/NotFound';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = PROJECTS.find((p) => p.slug === slug);

  if (!item) {
    return <NotFound />;
  }

  return (
    <>
      <SEOHead
        title={`${item.title} — Sadman Zaman Khan`}
        description={item.summary || item.title}
        image={item.cover_image_url || undefined}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: item.title,
          description: item.summary || item.title,
          image: item.cover_image_url || undefined,
          author: { '@type': 'Person', name: 'Sadman Zaman Khan' },
          url: `https://sadmanzamankhan.pages.dev/portfolio/${item.slug}`,
        }}
      />
      <ContentDetailLayout
        eyebrow="Project"
        title={item.title}
        meta={item.year}
        body={item.description}
        coverImageUrl={item.cover_image_url}
        backHref="/portfolio"
        backLabel="back to portfolio"
        externalLink={item.external_link}
      />
    </>
  );
};

export default ProjectDetail;
