import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import NotFound from '@/pages/NotFound';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFound />;
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  const allImages = [
    { url: project.coverImage, caption: `${project.title} — Overview` },
    ...project.galleryImages
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs uppercase tracking-wider bg-[#FFFFFF] text-[#000000] hover:bg-[#E5E5E5] transition-colors font-normal"
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

        {/* 3. Screenshots (2 Columns Side by Side) */}
        <section className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {allImages.map((img, gIdx) => (
              <figure key={gIdx} className="space-y-2 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A] p-2 hover:border-[#333333] transition-colors">
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

        {/* 4. Next / Previous Project Navigation */}
        <section className="pt-12 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-6 font-normal">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="group p-6 rounded-[4px] bg-[#0A0A0A] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#333333] transition-all space-y-2"
            >
              <div className="text-xs text-[#888888] uppercase tracking-wider group-hover:text-[#FFFFFF] transition-colors">
                ← Previous Project
              </div>
              <div className="text-lg font-normal text-[#FFFFFF] transition-colors">
                {prev.title}
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="group p-6 rounded-[4px] bg-[#0A0A0A] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#333333] transition-all space-y-2 text-left sm:text-right"
            >
              <div className="text-xs text-[#888888] uppercase tracking-wider group-hover:text-[#FFFFFF] transition-colors">
                Next Project →
              </div>
              <div className="text-lg font-normal text-[#FFFFFF] transition-colors">
                {next.title}
              </div>
            </Link>
          ) : <div />}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
