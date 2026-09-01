import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { POSTS } from '@/data/posts';
import { SEOHead } from '@/components/SEOHead';
import { ImageLightbox } from '@/components/ImageLightbox';
import NotFound from '@/pages/NotFound';
import { Footer } from '@/components/Footer';
import { sanitizeHtml } from '@/lib/sanitizeHtml';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const currentIndex = POSTS.findIndex((p) => p.slug === slug);
  const post = currentIndex !== -1 ? POSTS[currentIndex] : null;

  const prevPost = currentIndex > 0 ? POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < POSTS.length - 1 ? POSTS[currentIndex + 1] : null;

  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Keyboard navigation (← and →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft' && prevPost) {
        navigate(`/blog/${prevPost.slug}`);
      } else if (e.key === 'ArrowRight' && nextPost) {
        navigate(`/blog/${nextPost.slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevPost, nextPost, navigate, lightboxOpen]);

  if (!post) {
    return <NotFound />;
  }

  const isHtml = /<[a-z][\s\S]*>/i.test(post.body);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SEOHead
        title={`${post.title} — Sadman Zaman Khan`}
        description={post.excerpt || post.title}
        image={post.cover_image_url || undefined}
        article={{
          publishedTime: post.created_at,
          modifiedTime: post.updated_at,
          author: 'Sadman Zaman Khan',
          section: 'Design & Writing',
        }}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt || post.title,
          image: post.cover_image_url || undefined,
          datePublished: post.created_at,
          dateModified: post.updated_at,
          author: { '@type': 'Person', name: 'Sadman Zaman Khan' },
          publisher: { '@type': 'Person', name: 'Sadman Zaman Khan' },
          mainEntityOfPage: `https://sadmanzamankhan.pages.dev/blog/${post.slug}`,
        }}
      />
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full">
        <article className="max-w-3xl mx-auto pt-36 md:pt-44 pb-20">
          <div className="mb-6">
            <Link
              to="/blog"
              className="text-base lowercase font-normal opacity-40 hover:opacity-100 transition-opacity"
            >
              ← all ponderings
            </Link>
          </div>

          <div className="text-sm uppercase font-medium tracking-wider mb-4 opacity-40">
            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="font-scanport text-4xl sm:text-5xl md:text-6xl font-medium mb-4 tracking-tight">{post.title}</h1>
          {post.excerpt && <p className="text-xl opacity-70 mb-10 leading-relaxed">{post.excerpt}</p>}

          {post.cover_image_url && (
            <>
              <div
                onClick={() => setLightboxOpen(true)}
                className="aspect-video bg-muted mb-10 rounded-2xl overflow-hidden cursor-zoom-in group relative"
                title="Click to view full image"
              >
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>
              {lightboxOpen && (
                <ImageLightbox
                  src={post.cover_image_url}
                  alt={post.title}
                  onClose={() => setLightboxOpen(false)}
                />
              )}
            </>
          )}

          {isHtml ? (
            <div
              className="prose-content text-lg leading-relaxed snap-writing opacity-85"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.body) }}
            />
          ) : (
            <div className="text-lg leading-relaxed snap-writing opacity-85">
              {post.body.split('\n\n').map((para, i) => <p key={i} className="mb-6">{para}</p>)}
            </div>
          )}

          {/* Navigation / Prev-Next Controls */}
          <div className="mt-16 pt-8 border-t border-foreground/10 flex items-center justify-between text-base lowercase font-normal">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-1.5"
                title={`Previous: ${prevPost.title} (← key)`}
              >
                <span>←</span>
                <span>{prevPost.title}</span>
              </Link>
            ) : <span />}

            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 ml-auto"
                title={`Next: ${nextPost.title} (→ key)`}
              >
                <span>{nextPost.title}</span>
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

export default BlogDetail;
