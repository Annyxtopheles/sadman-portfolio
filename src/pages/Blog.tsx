import React from 'react';
import { Link } from 'react-router-dom';
import { POSTS } from '@/data/posts';
import { SEOHead } from '@/components/SEOHead';
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder';
import { Footer } from '@/components/Footer';
import { normalizeFocal } from '@/lib/focal';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SEOHead
        title="My Ponderings — Sadman Zaman Khan"
        description="Short writings on design, software, craft, attention, and side explorations by Sadman Zaman Khan."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'My Ponderings',
          description: 'Short writings on a myriad of things that piqued my interest.',
          url: 'https://sadmanzamankhan.pages.dev/blog',
        }}
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full">
        <section className="pt-36 md:pt-44 lg:pt-52 pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-scanport text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight lowercase">
              my ponderings
            </h1>
          </div>
        </section>

        <section id="grid" className="pb-24 pt-4">
          {POSTS.length === 0 ? (
            <EmptyPlaceholder
              title="No ponderings posted yet."
              description="Short writings will appear here as they're finished. Until then, the portfolio and pastime sections are worth a wander."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {POSTS.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group block"
                >
                  <div className="aspect-[16/10] bg-muted overflow-hidden mb-4 rounded-lg">
                    {p.cover_image_url ? (
                      <img
                        src={p.cover_image_url}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300 ease"
                        style={{ objectPosition: normalizeFocal(p.cover_focal_position) }}
                      />
                    ) : (
                      <div className="w-full h-full bg-foreground/5" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs uppercase font-medium tracking-wider mb-2 opacity-40">
                      {new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                    <h2 className="text-2xl font-medium mb-2 group-hover:opacity-60 transition-opacity leading-snug">
                      {p.title}
                    </h2>
                    <p className="text-base opacity-70 line-clamp-3 leading-relaxed">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
