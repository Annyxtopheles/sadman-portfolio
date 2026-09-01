import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageLightbox } from '@/components/ImageLightbox';
import { Footer } from '@/components/Footer';

interface ContentDetailLayoutProps {
  eyebrow?: string;
  title: string;
  meta?: React.ReactNode;
  body: string;
  coverImageUrl?: string | null;
  backHref: string;
  backLabel: string;
  externalLink?: string | null;
}

export const ContentDetailLayout: React.FC<ContentDetailLayoutProps> = ({
  eyebrow,
  title,
  meta,
  body,
  coverImageUrl,
  backHref,
  backLabel,
  externalLink,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full">
        <article className="max-w-3xl mx-auto pt-36 md:pt-44 pb-20">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              to={backHref}
              className="text-base lowercase font-normal opacity-40 hover:opacity-100 transition-opacity inline-flex items-center gap-1.5"
            >
              <span>←</span>
              <span>{backLabel}</span>
            </Link>
          </div>

          {/* Eyebrow & Meta */}
          <div className="flex items-center justify-between text-xs uppercase tracking-wider font-medium opacity-40 mb-4">
            {eyebrow && <span>{eyebrow}</span>}
            {meta && <span>{meta}</span>}
          </div>

          {/* Headline */}
          <h1 className="font-scanport text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-8 leading-[1.08]">
            {title}
          </h1>

          {/* Hero Cover Image with Lightbox */}
          {coverImageUrl && (
            <>
              <figure
                onClick={() => setLightboxOpen(true)}
                className="mb-12 aspect-[16/10] bg-muted rounded-lg overflow-hidden cursor-zoom-in group relative shadow-sm"
                title="Click to view full image"
              >
                <img
                  src={coverImageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </figure>

              {lightboxOpen && (
                <ImageLightbox
                  src={coverImageUrl}
                  alt={title}
                  onClose={() => setLightboxOpen(false)}
                />
              )}
            </>
          )}

          {/* Article Body */}
          <div className="prose-content text-lg leading-relaxed snap-writing opacity-85 space-y-6">
            {body.split('\n\n').map((block, i) => {
              // Handle sub-headings inside markdown text
              if (block.startsWith('### ')) {
                return (
                  <h2 key={i} className="font-scanport text-2xl md:text-3xl font-medium tracking-tight pt-6 pb-2 opacity-100">
                    {block.replace('### ', '')}
                  </h2>
                );
              }
              // Handle bullet list items
              if (block.includes('• ') || block.includes('- ')) {
                const lines = block.split('\n');
                return (
                  <ul key={i} className="space-y-2 pl-4 list-disc list-outside opacity-90 text-base md:text-lg">
                    {lines.map((line, liIdx) => (
                      <li key={liIdx}>{line.replace(/^[•\-]\s*/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* External Link Action */}
          {externalLink && (
            <div className="mt-10 pt-6 border-t border-foreground/10">
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background px-6 py-3 rounded-full text-base lowercase font-medium hover:bg-foreground/80 transition-colors inline-flex items-center gap-2"
              >
                <span>visit live project</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}

          {/* Bottom Back Link */}
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <Link
              to={backHref}
              className="text-base lowercase font-normal opacity-40 hover:opacity-100 transition-opacity inline-flex items-center gap-1.5"
            >
              <span>←</span>
              <span>{backLabel}</span>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
