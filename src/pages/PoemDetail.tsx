import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { POEMS } from '@/data/poems';
import { SEOHead } from '@/components/SEOHead';
import { PoetryViewerToggle } from '@/components/poetry/PoetryViewerToggle';
import { ImageLightbox } from '@/components/ImageLightbox';
import { Footer } from '@/components/Footer';
import NotFound from '@/pages/NotFound';

type PoetryMode = 'modern' | 'antique';
const STORAGE_KEY = 'szk_poetry_mode';

const PoemDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const currentIndex = POEMS.findIndex((p) => p.slug === slug);
  const poem = currentIndex !== -1 ? POEMS[currentIndex] : null;

  const prevPoem = currentIndex > 0 ? POEMS[currentIndex - 1] : null;
  const nextPoem = currentIndex < POEMS.length - 1 ? POEMS[currentIndex + 1] : null;

  const [mode, setModeState] = useState<PoetryMode>('modern');
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'antique' || saved === 'modern') setModeState(saved);
    } catch { /* ignore */ }
  }, []);

  const setMode = (m: PoetryMode) => {
    setModeState(m);
    try { localStorage.setItem(STORAGE_KEY, m); } catch { /* ignore */ }
  };

  // Keyboard navigation (← and →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if lightbox is open or user is in an input
      if (lightboxOpen) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft' && prevPoem) {
        navigate(`/poetry/${prevPoem.slug}`);
      } else if (e.key === 'ArrowRight' && nextPoem) {
        navigate(`/poetry/${nextPoem.slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevPoem, nextPoem, navigate, lightboxOpen]);

  const handleCopyPoem = useCallback(() => {
    if (!poem) return;
    const formatted = `${poem.title}\nby Sadman Zaman Khan\n\n${poem.content}\n\nhttps://sadmanzamankhan.pages.dev/poetry/${poem.slug}`;
    navigator.clipboard.writeText(formatted).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [poem]);

  if (!poem) {
    return <NotFound />;
  }

  const dateStr = poem.date ?? (poem.published_at
    ? new Date(poem.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '');

  return (
    <div className={`poetry-canvas ${mode} min-h-screen bg-background flex flex-col justify-between`}>
      <SEOHead
        title={`${poem.title} — Sadman Zaman Khan`}
        description={(poem.excerpt ?? poem.content ?? '').substring(0, 160)}
        image={poem.cover_image_url || undefined}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          '@id': `https://sadmanzamankhan.pages.dev/poetry/${poem.slug}`,
          name: poem.title,
          genre: 'Poetry',
          datePublished: poem.published_at || undefined,
          author: { '@type': 'Person', name: 'Sadman Zaman Khan' },
          url: `https://sadmanzamankhan.pages.dev/poetry/${poem.slug}`,
        }}
      />
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full">
        <article className="max-w-2xl mx-auto pt-36 md:pt-44 pb-20">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/poetry"
              className="text-base lowercase font-normal opacity-40 hover:opacity-100 transition-opacity"
            >
              ← all poems
            </Link>
            <PoetryViewerToggle mode={mode} onChange={setMode} />
          </div>

          {poem.cover_image_url && (
            <>
              <figure
                onClick={() => setLightboxOpen(true)}
                className="mb-10 rounded-2xl overflow-hidden cursor-zoom-in group relative"
                title="Click to view full image"
              >
                <img
                  src={poem.cover_image_url}
                  alt={poem.title}
                  className="block w-full h-auto max-h-[60vh] object-cover bg-muted rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </figure>
              {lightboxOpen && (
                <ImageLightbox
                  src={poem.cover_image_url}
                  alt={poem.title}
                  onClose={() => setLightboxOpen(false)}
                />
              )}
            </>
          )}

          <h1 className="poem-title font-scanport text-4xl md:text-6xl font-medium mb-3 tracking-tight">
            {poem.title}
          </h1>
          {dateStr && <p className="text-base opacity-40 mb-10">{dateStr}</p>}

          <div className="poem-body text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-serif snap-writing opacity-85">
            {(poem.content ?? '').split(/\n\s*\n/).map((stanza, i) => (
              <p key={i} className="mb-6 whitespace-pre-wrap">{stanza}</p>
            ))}
          </div>

          {/* Action Bar (Copy / Share) */}
          <div className="mt-12 pt-6 border-t border-foreground/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleCopyPoem}
              className="text-base lowercase font-medium opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{copied ? 'copied to clipboard ✓' : 'copy poem'}</span>
            </button>

            {poem.tags && poem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {poem.tags.map((t) => (
                  <span key={t} className="text-base lowercase opacity-40">#{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* Navigation / Prev-Next Controls */}
          <div className="mt-12 flex items-center justify-between text-base lowercase font-normal pt-4">
            {prevPoem ? (
              <Link
                to={`/poetry/${prevPoem.slug}`}
                className="opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-1.5"
                title={`Previous: ${prevPoem.title} (← key)`}
              >
                <span>←</span>
                <span>{prevPoem.title}</span>
              </Link>
            ) : <span />}

            {nextPoem && (
              <Link
                to={`/poetry/${nextPoem.slug}`}
                className="opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 ml-auto"
                title={`Next: ${nextPoem.title} (→ key)`}
              >
                <span>{nextPoem.title}</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PoemDetail;
