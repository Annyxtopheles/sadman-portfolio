import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { getProjectBySlug, getAdjacentProjects, Project } from '@/data/projects';
import ImageTrail from '@/components/ImageTrail';
import NotFound from '@/pages/NotFound';

export const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFound />;
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  const allImages = [
    { url: project.coverImage, caption: `${project.title} — Overview` },
    ...project.galleryImages.filter((img) => img.url !== project.coverImage),
  ];

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

        {/* 3. Media Sections / Gallery */}
        {project.gallerySections && project.gallerySections.length > 0 ? (
          <div className="space-y-16 pt-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {section.images.map((img, gIdx) => (
                    <figure
                      key={gIdx}
                      className="space-y-2 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A] p-2 hover:border-[#333333] transition-colors"
                    >
                      <div className="relative overflow-hidden rounded-[2px] bg-[#0A0A0A]">
                        <img
                          src={img.url}
                          alt={img.caption}
                          loading="lazy"
                          className={`w-full ${
                            img.aspectRatio === '4/5' || img.type === 'carousel'
                              ? 'aspect-[4/5] object-contain'
                              : 'aspect-[16/10] object-cover'
                          } object-center rounded-[2px]`}
                        />
                      </div>
                      <figcaption className="px-2 py-1.5 text-xs text-[#888888] font-normal flex items-center justify-between">
                        <span>{img.caption}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {allImages.map((img, gIdx) => (
                <figure
                  key={gIdx}
                  className="space-y-2 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A] p-2 hover:border-[#333333] transition-colors"
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
          </section>
        )}

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

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
