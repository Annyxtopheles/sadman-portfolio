import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder';
import { usePublicPoems } from '@/hooks/public/usePublicPoems';
import { Footer } from '@/components/Footer';

const Poetry = () => {
  const { data: poems, loading } = usePublicPoems();

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SEOHead
        title="Poetry — A Book of Poems"
        description="Original poetry by Sadman Zaman Khan — quiet observations, kept lines, and small hours set down in verse."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Poetry — A Book of Poems',
          description: 'Original poetry by Sadman Zaman Khan.',
          url: 'https://sadmanzamankhan.pages.dev/poetry',
        }}
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full">
        <section className="pt-36 md:pt-44 lg:pt-52 pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-scanport text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight lowercase">
              a book of poems
            </h1>
          </div>
        </section>

        <section id="grid" className="pb-24 pt-4">
          {loading ? (
            <div className="text-center py-12">Loading…</div>
          ) : poems.length === 0 ? (
            <EmptyPlaceholder
              title="Poems are being transcribed."
              description="A small collection is being set down in type. In the meantime, the portfolio and ponderings pages are open."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {poems.map((p) => {
                const dateStr = p.date ?? (p.published_at
                  ? new Date(p.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  : '');
                const cover = (p as { cover_image_url?: string | null }).cover_image_url ?? null;
                const focal = (p as { cover_focal_position?: string | null }).cover_focal_position ?? null;
                return (
                  <Link
                    key={p.id}
                    to={`/poetry/${p.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[16/10] bg-muted overflow-hidden mb-4 rounded-lg">
                      {cover ? (
                        <img
                          src={cover}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300 ease"
                          style={{ objectPosition: focal ?? 'center' }}
                        />
                      ) : (
                        <div className="w-full h-full bg-foreground/5" />
                      )}
                    </div>
                    <div>
                      {dateStr && (
                        <div className="text-xs uppercase font-medium tracking-wider mb-2 opacity-40">
                          {dateStr}
                        </div>
                      )}
                      <h2 className="text-2xl font-medium mb-2 group-hover:opacity-60 transition-opacity leading-snug">
                        {p.title}
                      </h2>
                      <p className="text-base opacity-70 line-clamp-3 whitespace-pre-wrap leading-relaxed">
                        {(p.excerpt ?? p.content ?? '').split('\n').slice(0, 3).join('\n')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Poetry;
