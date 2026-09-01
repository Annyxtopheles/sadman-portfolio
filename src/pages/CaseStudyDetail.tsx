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
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#00E5FF] selection:text-[#0A0A0A]">
      <SEOHead
        title={`${project.title} — Case Study by Sadman Zaman Khan`}
        description={project.summary}
        image={project.coverImage}
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full pt-[100px] md:pt-[120px]">
        {/* Back Link */}
        <div className="pt-4 pb-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CBD5E1] hover:text-[#00E5FF] transition-colors"
          >
            <span>← Back to all projects</span>
          </Link>
        </div>

        {/* 1. Header Block */}
        <section className="space-y-6 pb-10 border-b border-[#27272A]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-[#00E5FF] px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#27272A] font-medium">
              {project.category}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#CBD5E1] max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          </div>

          {project.liveUrl && (
            <div className="pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#FFFFFF] text-[#0A0A0A] hover:bg-[#F1F5F9] transition-colors font-bold"
              >
                <span>Live Preview ↗</span>
              </a>
            </div>
          )}

          {/* 2. Meta Row: Year · Scope · Client · Duration */}
          <div className="pt-6 border-t border-[#27272A] grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <span className="text-[#94A3B8] block uppercase tracking-wider mb-1">Client / Org</span>
              <span className="text-[#FFFFFF] font-medium text-sm">{project.client}</span>
            </div>
            <div>
              <span className="text-[#94A3B8] block uppercase tracking-wider mb-1">Timeline</span>
              <span className="text-[#FFFFFF] font-medium text-sm">{project.year}</span>
            </div>
            <div>
              <span className="text-[#94A3B8] block uppercase tracking-wider mb-1">Duration</span>
              <span className="text-[#FFFFFF] font-medium text-sm">{project.duration}</span>
            </div>
            <div>
              <span className="text-[#94A3B8] block uppercase tracking-wider mb-1">Scope</span>
              <span className="text-[#FFFFFF] font-medium text-sm">{project.scope.join(', ')}</span>
            </div>
          </div>
        </section>

        {/* 3. TL;DR Callout Box */}
        <section className="my-12 p-6 sm:p-8 rounded-xl bg-[#141414] border-l-4 border-l-[#00E5FF] border-y border-r border-[#27272A] space-y-4">
          <div className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-semibold">
            Executive TL;DR
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-sm">
            <div className="space-y-1.5">
              <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">The Challenge</div>
              <p className="text-[#FFFFFF] leading-relaxed">{project.tldr.challenge}</p>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">My Role</div>
              <p className="text-[#FFFFFF] leading-relaxed">{project.tldr.role}</p>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">Method &amp; Execution</div>
              <p className="text-[#FFFFFF] leading-relaxed">{project.tldr.method}</p>
            </div>
          </div>
        </section>

        {/* Cover Hero Image */}
        <section className="my-10 rounded-2xl overflow-hidden border border-[#27272A] bg-[#141414]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-auto max-h-[640px] object-cover object-center"
          />
        </section>

        {/* 4. Problem & Constraints */}
        <section className="py-12 border-b border-[#27272A] space-y-4 max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-wider text-[#00E5FF]">Context &amp; Challenge</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
            The Problem &amp; Core Constraints
          </h2>
          <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* 5. Process & Engineering Acceleration */}
        <section className="py-12 border-b border-[#27272A] space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#00E5FF]">Implementation</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Architecture, Systems &amp; Prototyping Process
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1]">
              How the solution was engineered to satisfy high-density requirements and accelerate handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.process.map((step, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-xl bg-[#141414] border border-[#27272A] space-y-4 hover:border-[#3F3F46] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#1C1C1C] border border-[#27272A] text-[#00E5FF] font-semibold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#FFFFFF]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                  {step.description}
                </p>
                {step.details && (
                  <ul className="space-y-2 pt-2 border-t border-[#27272A] text-xs text-[#CBD5E1]">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#00E5FF] mt-0.5">•</span>
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
            <div className="p-6 rounded-xl bg-[#141414] border border-[#27272A] space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-semibold">
                AI-Augmented Prototyping Workflow
              </div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {project.aiWorkflow}
              </p>
            </div>
          )}
        </section>

        {/* 6. Outcome */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section className="py-12 border-b border-[#27272A] space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#4ADE80]">Results &amp; Impact</div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Measurable Outcomes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.outcomes.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className="p-6 rounded-xl bg-[#141414] border border-[#27272A] space-y-2"
                >
                  <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
                    {metric.value}
                  </div>
                  <div className="font-mono text-xs text-[#00E5FF] font-semibold uppercase tracking-wider">
                    {metric.label}
                  </div>
                  {metric.subtext && (
                    <p className="text-xs text-[#CBD5E1] leading-relaxed pt-1">
                      {metric.subtext}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {project.outcomeSummary && (
              <p className="text-sm sm:text-base text-[#CBD5E1] italic border-l-2 border-[#27272A] pl-4">
                "{project.outcomeSummary}"
              </p>
            )}
          </section>
        )}

        {/* 7. Production Screens & Artifacts */}
        <section className="py-12 space-y-8">
          <div className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">Production Screens &amp; Artifacts</div>
          <div className="space-y-8">
            {project.galleryImages.map((img, gIdx) => (
              <figure key={gIdx} className="space-y-3 rounded-2xl overflow-hidden border border-[#27272A] bg-[#141414] p-2">
                <img
                  src={img.url}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-auto rounded-xl object-cover"
                />
                <figcaption className="px-4 py-2 font-mono text-xs text-[#CBD5E1] flex items-center justify-between">
                  <span>{img.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 8. Next / Previous Project Navigation */}
        <section className="my-16 pt-12 border-t border-[#27272A] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prev && (
            <Link
              to={`/work/${prev.slug}`}
              className="group p-6 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#27272A] hover:border-[#3F3F46] transition-all space-y-2"
            >
              <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider group-hover:text-[#00E5FF] transition-colors">
                ← Previous Project
              </div>
              <div className="font-display text-lg font-semibold text-[#FFFFFF] group-hover:text-[#00E5FF] transition-colors">
                {prev.title}
              </div>
            </Link>
          )}

          {next && (
            <Link
              to={`/work/${next.slug}`}
              className="group p-6 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#27272A] hover:border-[#3F3F46] transition-all space-y-2 text-left sm:text-right"
            >
              <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider group-hover:text-[#00E5FF] transition-colors">
                Next Project →
              </div>
              <div className="font-display text-lg font-semibold text-[#FFFFFF] group-hover:text-[#00E5FF] transition-colors">
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
