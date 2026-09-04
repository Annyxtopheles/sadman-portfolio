import React, { useState } from 'react';
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
 * upon hover expands into a significantly larger floating preview card.
 */
const CompactThumbnailCard: React.FC<{
  img: GalleryImage;
  onOpenLightbox: (src: string, alt: string) => void;
}> = ({ img, onOpenLightbox }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenLightbox(img.url, img.caption)}
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
        {img.type && (
          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase bg-[#000000]/80 text-[#CCCCCC] backdrop-blur-xs border border-[#2E2E2E] leading-none">
            {img.type}
          </div>
        )}
      </div>

      {/* Tiny Label */}
      <div className="pt-1.5 px-0.5 flex items-center justify-between">
        <span className="text-[10px] font-normal text-[#777777] group-hover:text-[#CCCCCC] truncate transition-colors">
          {img.caption.split('—')[0]?.trim() || img.caption}
        </span>
        <span className="text-[10px] text-[#555555] group-hover:text-[#AAAAAA] shrink-0 font-mono transition-colors">
          ↗
        </span>
      </div>

      {/* Floating Pop-Up Preview: Substantially larger than the small preview */}
      <AnimatePresence>
        {isHovered && !img.embedUrl && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
              rotate: -2,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.82,
              rotate: 1,
              y: 6,
            }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[320px] sm:w-[480px] md:w-[540px] max-w-[90vw] z-50 pointer-events-none rounded-[6px] border border-[#333333] bg-[#0A0A0A]/95 p-3 shadow-[0_30px_70px_rgba(0,0,0,0.95)] backdrop-blur-md space-y-2.5"
          >
            {/* High-res Image Preview */}
            <div className="relative aspect-[16/10] w-full rounded-[4px] overflow-hidden bg-[#141414] border border-[#262626]">
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover object-top"
              />
              {img.type && (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#000000]/85 text-[#FFFFFF] backdrop-blur-sm border border-[#333333]">
                  {img.type}
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
          {/* Gallery Control Bar: View Switcher (Expanded vs Minimized) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F1F1F] pb-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-mono text-[#888888]">
                Visual Artifacts &amp; Case Studies
              </span>
              <div className="text-sm text-[#777777] font-normal">
                {viewMode === 'expanded'
                  ? 'Expanded View · Uniform 3-column rows'
                  : 'Minimized View · Hover previews to expand (About page style)'}
              </div>
            </div>

            {/* View Mode Switcher Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-[4px] bg-[#0E0E0E] border border-[#222222] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('expanded')}
                className={`px-3 py-1.5 rounded-[3px] text-xs font-normal transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'expanded'
                    ? 'bg-[#FFFFFF] text-[#000000] shadow-sm font-medium'
                    : 'text-[#888888] hover:text-[#FFFFFF]'
                }`}
                title="Expanded View: 3 images per row"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7" strokeWidth="1.5" />
                  <rect x="14" y="3" width="7" height="7" strokeWidth="1.5" />
                  <rect x="3" y="14" width="7" height="7" strokeWidth="1.5" />
                  <rect x="14" y="14" width="7" height="7" strokeWidth="1.5" />
                </svg>
                <span>Expanded (3-Col)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('compact')}
                className={`px-3 py-1.5 rounded-[3px] text-xs font-normal transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'compact'
                    ? 'bg-[#FFFFFF] text-[#000000] shadow-sm font-medium'
                    : 'text-[#888888] hover:text-[#FFFFFF]'
                }`}
                title="Minimized View: Small previews, hover to expand"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="4" width="4" height="4" strokeWidth="1.5" />
                  <rect x="10" y="4" width="4" height="4" strokeWidth="1.5" />
                  <rect x="17" y="4" width="4" height="4" strokeWidth="1.5" />
                  <rect x="3" y="11" width="4" height="4" strokeWidth="1.5" />
                  <rect x="10" y="11" width="4" height="4" strokeWidth="1.5" />
                  <rect x="17" y="11" width="4" height="4" strokeWidth="1.5" />
                </svg>
                <span>Minimized (Hover)</span>
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
