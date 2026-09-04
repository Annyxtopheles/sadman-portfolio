import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectBySlug, getAdjacentProjects, Project, GalleryImage } from '@/data/projects';
import ImageTrail from '@/components/ImageTrail';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { ImageLightbox } from '@/components/ImageLightbox';
import NotFound from '@/pages/NotFound';

/**
 * Minimized View: Small preview card (same size as About page),
 * upon hover expands into a significantly larger floating preview card with full natural dimensions.
 * Includes smart collision detection so the popup stays inside the screen bounds.
 */
interface CompactThumbnailCardProps {
  img: GalleryImage;
  onOpenLightbox: (src: string, alt: string) => void;
  onPlayVideo?: (embedUrl: string, caption: string, externalUrl?: string) => void;
}

const CompactThumbnailCard: React.FC<CompactThumbnailCardProps> = ({
  img,
  onOpenLightbox,
  onPlayVideo,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<'top' | 'bottom'>('top');
  const [horizontalAlign, setHorizontalAlign] = useState<'center' | 'left' | 'right'>('center');

  // Derive aspect ratio container and width for full-dimension natural popup
  const getPopupStyles = () => {
    switch (img.aspectRatio) {
      case '9/16':
        return {
          wrapperWidth: 'w-[230px] sm:w-[280px]',
          aspectClass: 'aspect-[9/16]',
        };
      case '1/1':
        return {
          wrapperWidth: 'w-[280px] sm:w-[380px]',
          aspectClass: 'aspect-square',
        };
      case '4/5':
        return {
          wrapperWidth: 'w-[260px] sm:w-[340px]',
          aspectClass: 'aspect-[4/5]',
        };
      case '16/9':
        return {
          wrapperWidth: 'w-[320px] sm:w-[500px]',
          aspectClass: 'aspect-[16/9]',
        };
      default:
        return {
          wrapperWidth: 'w-[320px] sm:w-[480px]',
          aspectClass: 'aspect-[16/10]',
        };
    }
  };

  const { wrapperWidth, aspectClass } = getPopupStyles();

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      // Smart collision detection:
      // If card top is within 440px of viewport top, open downwards so it won't be cut off by screen bounds
      if (rect.top < 440) {
        setPlacement('bottom');
      } else {
        setPlacement('top');
      }

      // Horizontal edge protection:
      if (rect.left < 200) {
        setHorizontalAlign('left');
      } else if (screenWidth - rect.right < 200) {
        setHorizontalAlign('right');
      } else {
        setHorizontalAlign('center');
      }
    }
    setIsHovered(true);
  };

  const handleClick = () => {
    if (img.embedUrl && onPlayVideo) {
      onPlayVideo(img.embedUrl, img.caption, img.externalUrl);
    } else {
      onOpenLightbox(img.url, img.caption);
    }
  };

  const verticalClass = placement === 'bottom' ? 'top-full mt-3' : 'bottom-full mb-3';
  const horizontalClass =
    horizontalAlign === 'left'
      ? 'left-0'
      : horizontalAlign === 'right'
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group relative rounded-[4px] border p-1.5 transition-all duration-200 cursor-pointer ${
        isHovered
          ? 'border-[#555555] bg-[#141414] shadow-md z-40'
          : 'border-[#1F1F1F] bg-[#0A0A0A] hover:border-[#383838] hover:bg-[#111111]'
      }`}
    >
      {/* Small Thumbnail Container (Identical to About page collage) */}
      <div className="relative aspect-[16/10] w-full rounded-[2px] overflow-hidden bg-[#161616]">
        <img
          src={img.url}
          alt={img.caption}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />

        {/* Video Reel Play Indicator Badge on Thumbnail (Clean central icon, no corner text badge) */}
        {img.embedUrl && (
          <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 flex items-center justify-center transition-colors">
            <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center pl-0.5 shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Tiny Label */}
      <div className="pt-1.5 px-0.5 flex items-center justify-between">
        <span className="text-[10px] font-normal text-[#777777] group-hover:text-[#CCCCCC] truncate transition-colors">
          {img.caption.split('—')[0]?.trim() || img.caption}
        </span>
        <span className="text-[10px] text-[#555555] group-hover:text-[#AAAAAA] shrink-0 font-mono transition-colors">
          {img.embedUrl ? '▶' : '↗'}
        </span>
      </div>

      {/* Floating Pop-Up Preview: Displays full natural dimension & aspect ratio, smart viewport positioning */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              y: placement === 'bottom' ? -10 : 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: placement === 'bottom' ? -6 : 6,
            }}
            transition={{
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`absolute ${verticalClass} ${horizontalClass} ${wrapperWidth} max-w-[90vw] z-50 pointer-events-none rounded-[6px] border border-[#333333] bg-[#0A0A0A]/95 p-3 shadow-[0_30px_70px_rgba(0,0,0,0.95)] backdrop-blur-md space-y-2.5 max-h-[78vh] flex flex-col`}
          >
            {/* Full Natural Aspect Ratio Preview */}
            <div className={`relative ${aspectClass} w-full rounded-[4px] overflow-hidden bg-[#141414] border border-[#262626] flex items-center justify-center max-h-[58vh]`}>
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-contain object-center"
              />

              {img.embedUrl && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center pl-0.5 shadow-2xl">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-[11px] tracking-wider uppercase font-medium text-white bg-black/80 px-3 py-1 rounded-full border border-white/20">
                    Play Reel
                  </span>
                </div>
              )}
            </div>

            {/* Caption & Context Details */}
            <div className="px-1 space-y-0.5">
              <div className="text-xs text-[#FFFFFF] font-normal leading-relaxed">
                {img.caption}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [activeEmbeds, setActiveEmbeds] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'expanded' | 'compact'>('expanded');
  const [selectedLightboxImg, setSelectedLightboxImg] = useState<string | null>(null);
  const [selectedLightboxAlt, setSelectedLightboxAlt] = useState<string>('');
  const [activeVideoModal, setActiveVideoModal] = useState<{
    embedUrl: string;
    caption: string;
    externalUrl?: string;
  } | null>(null);

  useEffect(() => {
    if (!activeVideoModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideoModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeVideoModal]);

  if (!project) {
    return <NotFound />;
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  const allImages = [
    { url: project.coverImage, caption: `${project.title} — Overview` },
    ...project.galleryImages.filter((img) => img.url !== project.coverImage),
  ];

  const handleOpenLightbox = (src: string, alt: string) => {
    setSelectedLightboxImg(src);
    setSelectedLightboxAlt(alt);
  };

  // Helper to extract gallery & cover images for the image trail on adjacent projects
  const getProjectTrailImages = (proj?: Project): string[] => {
    if (!proj) return [];
    const list = [proj.coverImage, ...proj.galleryImages.map((g) => g.url)];
    const unique = Array.from(new Set(list.filter(Boolean)));
    if (unique.length === 0) return [];
    const repeated: string[] = [];
    while (repeated.length < 8) {
      repeated.push(...unique);
    }
    return repeated.slice(0, 10);
  };

  const prevImages = getProjectTrailImages(prev);
  const nextImages = getProjectTrailImages(next);

  return (
    <div className="min-h-screen bg-transparent text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title={`${project.title} — Sadman Zaman Khan`}
        description={project.summary}
        image={project.coverImage}
      />

      <main className="animate-slide-up w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[100px] md:pt-[120px] space-y-12">
        {/* 1. Header Block */}
        <section className="space-y-6 pt-4">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#FFFFFF] leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#999999] font-normal max-w-4xl leading-relaxed">
              {project.summary}
            </p>
          </div>

          {project.liveUrl && (
            <div className="pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs uppercase tracking-wider bg-[#FFFFFF] text-[#000000] hover:bg-[#E5E5E5] transition-colors font-normal cursor-pointer"
              >
                <span>Live Preview ↗</span>
              </a>
            </div>
          )}

          {/* 2. Clean Meta Row: Client · Timeline · Duration */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs max-w-2xl font-normal">
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1">Client / Org</span>
              <span className="text-[#FFFFFF] text-sm font-normal">{project.client}</span>
            </div>
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1">Timeline</span>
              <span className="text-[#FFFFFF] text-sm font-normal">{project.year}</span>
            </div>
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1">Duration</span>
              <span className="text-[#FFFFFF] text-sm font-normal">{project.duration}</span>
            </div>
          </div>
        </section>

        {/* 2. Before & After Evolution Comparison (e.g. CollabAI) */}
        {project.beforeAfter && (
          <section className="pt-2">
            <BeforeAfterSlider
              beforeImage={project.beforeAfter.beforeImage}
              afterImage={project.beforeAfter.afterImage}
              beforeLabel={project.beforeAfter.beforeLabel}
              afterLabel={project.beforeAfter.afterLabel}
              caption={project.beforeAfter.caption}
            />
          </section>
        )}

        {/* 3. Media Sections & View Switcher */}
        <section className="space-y-6 pt-2">
          {/* Gallery Control Bar: View Switcher (Icon-only) */}
          <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
            <div>
              <h2 className="text-xs uppercase tracking-wider font-mono text-[#888888]">
                Visual Artifacts &amp; Case Studies
              </h2>
            </div>

            {/* View Mode Switcher: Pure Lined Icons (No Boxes or Button Backgrounds) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setViewMode('expanded')}
                aria-label="Expanded view"
                className={`transition-colors cursor-pointer p-0.5 ${
                  viewMode === 'expanded'
                    ? 'text-[#FFFFFF]'
                    : 'text-[#666666] hover:text-[#FFFFFF]'
                }`}
                title="Expanded view"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
                  <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
                  <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
                  <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('compact')}
                aria-label="Minimized view"
                className={`transition-colors cursor-pointer p-0.5 ${
                  viewMode === 'compact'
                    ? 'text-[#FFFFFF]'
                    : 'text-[#666666] hover:text-[#FFFFFF]'
                }`}
                title="Minimized view"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="4.2" height="4.2" rx="0.5" />
                  <rect x="9.9" y="3" width="4.2" height="4.2" rx="0.5" />
                  <rect x="16.8" y="3" width="4.2" height="4.2" rx="0.5" />
                  <rect x="3" y="9.9" width="4.2" height="4.2" rx="0.5" />
                  <rect x="9.9" y="9.9" width="4.2" height="4.2" rx="0.5" />
                  <rect x="16.8" y="9.9" width="4.2" height="4.2" rx="0.5" />
                  <rect x="3" y="16.8" width="4.2" height="4.2" rx="0.5" />
                  <rect x="9.9" y="16.8" width="4.2" height="4.2" rx="0.5" />
                  <rect x="16.8" y="16.8" width="4.2" height="4.2" rx="0.5" />
                </svg>
              </button>
            </div>
          </div>

          {project.gallerySections && project.gallerySections.length > 0 ? (
            <div className="space-y-16 pt-2">
              {project.gallerySections.map((section, sIdx) => (
                <section key={sIdx} className="space-y-6">
                  <div className="space-y-2 border-b border-[#1F1F1F] pb-4">
                    <h2 className="text-xl sm:text-2xl font-normal text-[#FFFFFF] tracking-tight">
                      {section.sectionTitle}
                    </h2>
                    {section.sectionDescription && (
                      <p className="text-sm sm:text-base text-[#999999] font-normal max-w-3xl leading-relaxed">
                        {section.sectionDescription}
                      </p>
                    )}
                  </div>

                  {section.documentUrl && (
                    <div className="p-4 sm:p-5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#333333] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[2px] bg-[#141414] border border-[#262626] flex items-center justify-center text-xs text-[#FFFFFF] shrink-0 font-mono font-medium">
                          PDF
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-sm text-[#FFFFFF] font-normal">
                            {section.documentTitle || 'Executive Briefing Document'}
                          </div>
                          <div className="text-xs text-[#888888]">
                            Full vector 2-page document developed in coordination with the enterprise sales team
                          </div>
                        </div>
                      </div>
                      <a
                        href={section.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs uppercase tracking-wider bg-[#FFFFFF] text-[#000000] hover:bg-[#E5E5E5] transition-colors font-normal shrink-0 self-start sm:self-auto cursor-pointer"
                      >
                        <span>View / Download PDF ↗</span>
                      </a>
                    </div>
                  )}

                  {/* Mode 1: Expanded View (3 images per row) */}
                  {viewMode === 'expanded' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {section.images.map((img, gIdx) => {
                        const embedKey = `${sIdx}-${gIdx}`;
                        const isEmbedActive = activeEmbeds[embedKey];

                        if (img.embedUrl) {
                          return (
                            <figure
                              key={gIdx}
                              className="space-y-2 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A] p-2 hover:border-[#333333] transition-colors flex flex-col justify-between"
                            >
                              {isEmbedActive ? (
                                <div className="relative w-full aspect-[9/16] overflow-hidden rounded-[2px] bg-[#000000]">
                                  <iframe
                                    src={img.embedUrl}
                                    className="w-full h-full border-0 rounded-[2px]"
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    allowFullScreen
                                    title={img.caption}
                                  />
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setActiveEmbeds((prev) => ({ ...prev, [embedKey]: true }))}
                                  className="group relative w-full overflow-hidden rounded-[2px] bg-[#0A0A0A] flex items-center justify-center cursor-pointer text-left focus:outline-none"
                                  title="Click to play video reel"
                                >
                                  <img
                                    src={img.url}
                                    alt={img.caption}
                                    loading="lazy"
                                    style={img.aspectRatio ? { aspectRatio: img.aspectRatio } : undefined}
                                    className={`w-full ${
                                      img.aspectRatio === '9/16'
                                        ? 'aspect-[9/16] object-cover'
                                        : 'aspect-[16/10] object-cover'
                                    } object-center rounded-[2px] group-hover:scale-[1.02] transition-transform duration-300`}
                                  />
                                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center gap-3">
                                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 transition-all duration-200">
                                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    </div>
                                    <span className="text-xs tracking-wider uppercase font-medium text-white bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                      Play Reel
                                    </span>
                                  </div>
                                </button>
                              )}
                              <figcaption className="px-2 py-1.5 text-xs text-[#888888] font-normal flex items-center justify-between gap-2">
                                <span className="truncate">{img.caption}</span>
                                {img.externalUrl && (
                                  <a
                                    href={img.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11px] bg-[#141414] hover:bg-[#222222] text-[#E5E5E5] border border-[#2A2A2A] hover:border-[#444444] transition-colors shrink-0 font-medium cursor-pointer"
                                  >
                                    <span>Watch on Facebook</span>
                                    <span className="text-[10px]">↗</span>
                                  </a>
                                )}
                              </figcaption>
                            </figure>
                          );
                        }

                        return (
                          <figure
                            key={gIdx}
                            onClick={() => handleOpenLightbox(img.url, img.caption)}
                            className="space-y-2 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A] p-2 hover:border-[#333333] transition-colors flex flex-col justify-between cursor-zoom-in"
                          >
                            <div className="relative overflow-hidden rounded-[2px] bg-[#0A0A0A] flex items-center justify-center">
                              <img
                                src={img.url}
                                alt={img.caption}
                                loading="lazy"
                                style={img.aspectRatio ? { aspectRatio: img.aspectRatio } : undefined}
                                className={`w-full ${
                                  img.aspectRatio === '9/16'
                                    ? 'aspect-[9/16] object-contain'
                                    : img.aspectRatio === '1/1'
                                    ? 'aspect-square object-contain'
                                    : img.aspectRatio === '4/5' || img.type === 'carousel'
                                    ? 'aspect-[4/5] object-contain'
                                    : img.aspectRatio === '16/9'
                                    ? 'aspect-[16/9] object-cover'
                                    : img.aspectRatio
                                    ? 'object-contain'
                                    : 'aspect-[16/10] object-cover'
                                } object-center rounded-[2px] hover:scale-[1.01] transition-transform duration-200`}
                              />
                            </div>
                            <figcaption className="px-2 py-1.5 text-xs text-[#888888] font-normal flex items-center justify-between gap-2">
                              <span className="truncate">{img.caption}</span>
                              {img.externalUrl && (
                                <a
                                  href={img.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11px] bg-[#141414] hover:bg-[#222222] text-[#E5E5E5] border border-[#2A2A2A] hover:border-[#444444] transition-colors shrink-0 font-medium cursor-pointer"
                                >
                                  <span>Watch on Facebook</span>
                                  <span className="text-[10px]">↗</span>
                                </a>
                              )}
                            </figcaption>
                          </figure>
                        );
                      })}
                    </div>
                  ) : (
                    /* Mode 2: Minimized View (Small Previews with Large Hover Pop-Up, exactly like About page) */
                    <div className="relative">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {section.images.map((img, gIdx) => (
                          <CompactThumbnailCard
                            key={gIdx}
                            img={img}
                            onOpenLightbox={handleOpenLightbox}
                            onPlayVideo={(embedUrl, caption, externalUrl) =>
                              setActiveVideoModal({ embedUrl, caption, externalUrl })
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            /* Fallback when project has no sections */
            <section className="pt-2">
              {viewMode === 'expanded' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {allImages.map((img, gIdx) => (
                    <figure
                      key={gIdx}
                      onClick={() => handleOpenLightbox(img.url, img.caption)}
                      className="space-y-2 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A] p-2 hover:border-[#333333] transition-colors cursor-zoom-in"
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        loading="lazy"
                        className="w-full aspect-[16/10] object-cover object-center rounded-[2px]"
                      />
                      <figcaption className="px-2 py-1 text-xs text-[#888888] font-normal flex items-center justify-between">
                        <span>{img.caption}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {allImages.map((img, gIdx) => (
                      <CompactThumbnailCard
                        key={gIdx}
                        img={img}
                        onOpenLightbox={handleOpenLightbox}
                        onPlayVideo={(embedUrl, caption, externalUrl) =>
                          setActiveVideoModal({ embedUrl, caption, externalUrl })
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </section>

        {/* 4. Next / Previous Project Navigation with Interactive Image Trails */}
        <section className="pt-12 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-6 font-normal">
          {prev ? (
            <ImageTrail items={prevImages} className="w-full">
              <Link
                to={`/work/${prev.slug}`}
                className="group relative p-8 rounded-[4px] bg-[#0A0A0A] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#333333] transition-all space-y-2 overflow-hidden block cursor-pointer"
              >
                <div className="relative z-10 text-xs text-[#888888] uppercase tracking-wider group-hover:text-[#FFFFFF] transition-colors">
                  ← Previous Project
                </div>
                <div className="relative z-10 text-lg font-normal text-[#FFFFFF] transition-colors">
                  {prev.title}
                </div>
              </Link>
            </ImageTrail>
          ) : <div />}

          {next ? (
            <ImageTrail items={nextImages} className="w-full">
              <Link
                to={`/work/${next.slug}`}
                className="group relative p-8 rounded-[4px] bg-[#0A0A0A] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#333333] transition-all space-y-2 text-left sm:text-right overflow-hidden block cursor-pointer"
              >
                <div className="relative z-10 text-xs text-[#888888] uppercase tracking-wider group-hover:text-[#FFFFFF] transition-colors">
                  Next Project →
                </div>
                <div className="relative z-10 text-lg font-normal text-[#FFFFFF] transition-colors">
                  {next.title}
                </div>
              </Link>
            </ImageTrail>
          ) : <div />}
        </section>
      </main>

      {/* Video Reel Player Modal (for Minimized View, Portaled to document.body) */}
      {activeVideoModal &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Video reel player"
            onClick={() => setActiveVideoModal(null)}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200 cursor-pointer select-none"
          >
            <button
              type="button"
              onClick={() => setActiveVideoModal(null)}
              aria-label="Close video player"
              className="absolute top-6 right-6 text-sm text-[#AAAAAA] hover:text-[#FFFFFF] transition-colors p-2 cursor-pointer z-10 font-mono"
            >
              close (esc)
            </button>

            {/* Video container with pure, unconstrained 9:16 aspect ratio */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-[340px] sm:w-[380px] md:w-[410px] max-w-[92vw] aspect-[9/16] max-h-[82vh] rounded-[6px] overflow-hidden bg-black shadow-2xl border border-[#2A2A2A] flex items-center justify-center cursor-default shrink-0"
            >
              <iframe
                src={activeVideoModal.embedUrl}
                className="w-full h-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                title={activeVideoModal.caption}
              />
            </div>

            {/* Caption & external link below video without encroaching on video aspect ratio */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[340px] sm:w-[380px] md:w-[410px] max-w-[92vw] pt-3 flex items-center justify-between gap-3 text-xs text-[#CCCCCC] cursor-default"
            >
              <span className="truncate">{activeVideoModal.caption}</span>
              {activeVideoModal.externalUrl && (
                <a
                  href={activeVideoModal.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#888888] hover:text-[#FFFFFF] transition-colors shrink-0 font-normal cursor-pointer"
                >
                  <span>Facebook</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* Full-Screen Image Lightbox */}
      <ImageLightbox
        src={selectedLightboxImg}
        alt={selectedLightboxAlt}
        onClose={() => setSelectedLightboxImg(null)}
      />

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
