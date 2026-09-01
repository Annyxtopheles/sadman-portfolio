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

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#000000]">
      <SEOHead
        title={`${project.title} — Case Study by Sadman Zaman Khan`}
        description={project.summary}
        image={project.coverImage}
      />

      <main className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex-1 pt-[100px] md:pt-[120px]">
        {/* Back Link */}
        <div className="pt-4 pb-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#888888] hover:text-[#FFFFFF] transition-colors"
          >
            <span>← Back to all projects</span>
          </Link>
        </div>

        {/* 1. Header Block */}
        <section className="space-y-6 pb-10 border-b border-[#1F1F1F]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-[#FFFFFF] px-3.5 py-1.5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] font-medium">
              {project.category}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#999999] max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          </div>

          {project.liveUrl && (
            <div className="pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-xs uppercase tracking-wider bg-[#FFFFFF] text-[#000000] hover:bg-[#E5E5E5] transition-colors font-bold"
              >
                <span>Live Preview ↗</span>
              </a>
            </div>
          )}

          {/* 2. Meta Row: Year · Scope · Client · Duration */}
          <div className="pt-6 border-t border-[#1F1F1F] grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1">Client / Org</span>
              <span className="text-[#FFFFFF] font-medium text-sm">{project.client}</span>
            </div>
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1">Timeline</span>
              <span className="text-[#FFFFFF] font-medium text-sm">{project.year}</span>
            </div>
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1">Duration</span>
              <span className="text-[#FFFFFF] font-medium text-sm">{project.duration}</span>
            </div>
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1">Scope</span>
              <span className="text-[#FFFFFF] font-medium text-sm">{project.scope.join(', ')}</span>
            </div>
          </div>
        </section>

        {/* 3. TL;DR Callout Box */}
        <section className="my-12 p-6 sm:p-8 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-4">
          <div className="text-xs uppercase tracking-wider text-[#FFFFFF] font-semibold">
            Executive TL;DR
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-sm">
            <div className="space-y-1.5">
              <div className="text-xs text-[#666666] uppercase tracking-wider">The Challenge</div>
              <p className="text-[#FFFFFF] leading-relaxed">{project.tldr.challenge}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-[#666666] uppercase tracking-wider">My Role</div>
              <p className="text-[#FFFFFF] leading-relaxed">{project.tldr.role}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-[#666666] uppercase tracking-wider">Method &amp; Execution</div>
              <p className="text-[#FFFFFF] leading-relaxed">{project.tldr.method}</p>
            </div>
          </div>
        </section>

        {/* Cover Hero Image */}
        <section className="my-10 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-auto max-h-[640px] object-cover object-center"
          />
        </section>

        {/* 4. Problem & Constraints */}
        <section className="py-12 border-b border-[#1F1F1F] space-y-4 max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-[#888888]">Context &amp; Challenge</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
            The Problem &amp; Core Constraints
          </h2>
          <p className="text-base sm:text-lg text-[#999999] leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* 5. Process & Engineering Acceleration */}
        <section className="py-12 border-b border-[#1F1F1F] space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#888888]">Implementation</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Architecture, Systems &amp; Prototyping Process
            </h2>
            <p className="text-sm sm:text-base text-[#999999]">
              How the solution was engineered to satisfy high-density requirements and accelerate handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.process.map((step, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-4 hover:border-[#333333] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-1 rounded-[4px] bg-[#141414] border border-[#1F1F1F] text-[#FFFFFF] font-semibold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#FFFFFF]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-[#999999] leading-relaxed">
                  {step.description}
                </p>
                {step.details && (
                  <ul className="space-y-2 pt-2 border-t border-[#1F1F1F] text-xs text-[#999999]">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#FFFFFF] mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* AI-Augmented Workflow Specifics */}
          {project.aiWorkflow && (
            <div className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-2">
              <div className="text-xs uppercase tracking-wider text-[#FFFFFF] font-semibold">
                AI-Augmented Prototyping Workflow
              </div>
              <p className="text-sm text-[#999999] leading-relaxed">
                {project.aiWorkflow}
              </p>
            </div>
          )}
        </section>

        {/* 6. Outcome */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section className="py-12 border-b border-[#1F1F1F] space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs uppercase tracking-wider text-[#FFFFFF]">Results &amp; Impact</div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Measurable Outcomes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.outcomes.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className="p-6 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] space-y-2"
                >
                  <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
                    {metric.value}
                  </div>
                  <div className="text-xs text-[#888888] font-semibold uppercase tracking-wider">
                    {metric.label}
                  </div>
                  {metric.subtext && (
                    <p className="text-xs text-[#999999] leading-relaxed pt-1">
                      {metric.subtext}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {project.outcomeSummary && (
              <p className="text-sm sm:text-base text-[#999999] italic border-l-2 border-[#1F1F1F] pl-4">
                "{project.outcomeSummary}"
              </p>
            )}
          </section>
        )}

        {/* 7. Production Screens & Artifacts */}
        <section className="py-12 space-y-8">
          <div className="text-xs uppercase tracking-wider text-[#888888]">Production Screens &amp; Artifacts</div>
          <div className="space-y-8">
            {project.galleryImages.map((img, gIdx) => (
              <figure key={gIdx} className="space-y-3 rounded-[4px] overflow-hidden border border-[#1F1F1F] bg-[#0A0A0A] p-2">
                <img
                  src={img.url}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-auto rounded-[2px] object-cover"
                />
                <figcaption className="px-4 py-2 text-xs text-[#888888] flex items-center justify-between">
                  <span>{img.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 8. Next / Previous Project Navigation */}
        <section className="my-16 pt-12 border-t border-[#1F1F1F] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prev && (
            <Link
              to={`/work/${prev.slug}`}
              className="group p-6 rounded-[4px] bg-[#0A0A0A] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#333333] transition-all space-y-2"
            >
              <div className="text-xs text-[#888888] uppercase tracking-wider group-hover:text-[#FFFFFF] transition-colors">
                ← Previous Project
              </div>
              <div className="font-display text-lg font-semibold text-[#FFFFFF] transition-colors">
                {prev.title}
              </div>
            </Link>
          )}

          {next && (
            <Link
              to={`/work/${next.slug}`}
              className="group p-6 rounded-[4px] bg-[#0A0A0A] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#333333] transition-all space-y-2 text-left sm:text-right"
            >
              <div className="text-xs text-[#888888] uppercase tracking-wider group-hover:text-[#FFFFFF] transition-colors">
                Next Project →
              </div>
              <div className="font-display text-lg font-semibold text-[#FFFFFF] transition-colors">
                {next.title}
              </div>
            </Link>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
