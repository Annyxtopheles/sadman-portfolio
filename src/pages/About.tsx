import React from 'react';
import { FileText, ArrowUpRight, CheckCircle2, ShieldCheck, Award, Briefcase, Wrench } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';

const About: React.FC = () => {
  const experiences = [
    {
      role: 'UI/UX Designer (Sole Designer)',
      company: 'SJ Innovation LLC',
      location: 'New York, US (Remote)',
      period: 'Oct 2025 – Present',
      highlight: 'Promoted to Sole Designer in Feb 2026; independently leading all client and internal product UI/UX.',
      bullets: [
        'Designed visual identity and component token architectures for 10+ AI-native Control Tower products (ePhysician, MortgageAI, RealtorHelp, HR CT, Agency CT).',
        'Engineered ICR Debt Surveillance: a 15-module Bloomberg Terminal–style credit surveillance dashboard for institutional investors.',
        'Designed Alyssa Kristin bridal luxury ecosystem: 3-in-1 connected iOS Stylist App, Admin CMS, and Client CRM.',
        'Integrated Figma AI workflows and low-code prototyping tools to compress wireframe-to-prototype cycles by 40%.'
      ]
    },
    {
      role: 'Intern Graphic Designer',
      company: 'SJ Innovation LLC',
      location: 'New York, US (Remote)',
      period: 'May 2025 – Sep 2025',
      bullets: [
        'Orchestrated digital asset pipeline supporting global US campaigns, delivering 200+ marketing collaterals and ad sets.',
        'Built Meta ad creative campaigns generating immediate sales lead form submissions on day one.'
      ]
    },
    {
      role: 'Freelance Brand & UI Designer',
      company: 'Independent Practice',
      location: 'Global Clients',
      period: 'Mar 2025 – Apr 2025',
      bullets: [
        'Completed 4 end-to-end client branding and collateral design engagements with 100% on-time delivery.',
        'Created high-impact logo systems, physical store signage, and marketing systems for US edtech and fitness brands.'
      ]
    }
  ];

  const skillGroups = [
    {
      category: 'Design & Systems',
      items: [
        'Design Systems & Global Tokens',
        'Enterprise Dashboard Architecture',
        'High-Density Financial UI',
        'Mobile & Web UX (iOS/Android)',
        'User Flows & Wireframing',
        'Interactive Prototyping (Figma)',
        'Visual Identity & Typography Systems'
      ]
    },
    {
      category: 'AI & Rapid Prototyping',
      items: [
        'AI-Native Interface Design',
        'Conversational & Streaming UI Patterns',
        'Low-Code Prototyping (Lovable, React)',
        'Figma AI & Agent Scripting',
        'API Testing (Replicate, Groq, Gemini)',
        'Prompt-to-Prototype Workflows'
      ]
    },
    {
      category: 'Engineering & Collaboration',
      items: [
        'Tailwind CSS & Token Hand-off',
        'Component Micro-Grids',
        'WCAG AA Accessibility Auditing',
        'Cross-Functional Sprint Ownership',
        'Git & Developer Sandbox Validation',
        'Client Stakeholder Presentations'
      ]
    }
  ];

  const services = [
    'Enterprise Dashboard & SaaS Product Design',
    'AI-Native Interface Design & Streaming UX',
    'Figma Multi-Brand Design Token Architecture',
    'Rapid High-Fidelity Functional Prototyping',
    'Brand Identity Systems & Design Guidelines'
  ];

  const certifications = [
    { title: 'Design System in Figma', issuer: 'Grameenphone Academy', date: 'Oct 2025' },
    { title: 'Claude Code in Action', issuer: 'Anthropic', date: 'Feb 2026' },
    { title: 'Digital Skills: User Experience', issuer: 'Accenture', date: 'Sep 2025' },
    { title: 'HubSpot Inbound Marketing', issuer: 'HubSpot', date: 'Mar 2026' },
    { title: 'B1 English for Developers (95.2%)', issuer: 'freeCodeCamp', date: 'Feb 2026' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] flex flex-col justify-between selection:bg-[#FF6B35] selection:text-[#0A0A0A]">
      <SEOHead
        title="About & Experience — Sadman Zaman Khan"
        description="Bio, experience timeline, stats, core skills, and credibility indicators for Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper."
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full pt-[100px] md:pt-[120px]">
        {/* 1. Profile Header & Bio */}
        <section className="py-10 md:py-14 border-b border-[#242424]">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#141414] border border-[#242424] text-[#9A9A93]">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span>Sole Designer at SJ Innovation LLC</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F5F0]">
                  Sadman Zaman Khan
                </h1>
                <p className="font-display text-xl sm:text-2xl text-[#FF6B35] font-medium">
                  UI/UX Designer &amp; AI-Augmented Prototyper
                </p>
              </div>

              {/* Scannable 3-4 sentence Bio */}
              <p className="text-base sm:text-lg text-[#9A9A93] leading-relaxed">
                I specialize in high-density enterprise dashboards, AI-native product interfaces, and scalable design token systems. As the sole designer at SJ Innovation, I independently own and ship UI/UX across multi-product suites and client engagements. By combining Figma rigor with AI-augmented and low-code prototyping, I eliminate design-dev drift and compress review cycles from weeks into days.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/Sadman_Zaman_Khan_Resume.pdf"
                  download="Sadman_Zaman_Khan_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-[#F5F5F0] text-[#0A0A0A] hover:bg-white transition-all shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Full Résumé (PDF)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:sadmanz.khan@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-[#141414] text-[#F5F5F0] hover:bg-[#1C1C1C] border border-[#242424] transition-all"
                >
                  <span>sadmanz.khan@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Quick Overview Card */}
            <div className="lg:w-80 shrink-0 p-6 rounded-xl bg-[#141414] border border-[#242424] space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-[#5C5C56]">Quick Summary</div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-[#5C5C56] block">Location</span>
                  <span className="text-[#F5F5F0] font-medium">Dhaka, Bangladesh (Remote US)</span>
                </div>
                <div>
                  <span className="text-xs text-[#5C5C56] block">Education</span>
                  <span className="text-[#F5F5F0] font-medium">Diploma in Computer Engineering</span>
                  <span className="text-xs text-[#9A9A93] block">Munshiganj Polytechnic (2021–2025)</span>
                </div>
                <div>
                  <span className="text-xs text-[#5C5C56] block">Primary Focus</span>
                  <span className="text-[#F5F5F0] font-medium">Enterprise UI · AI UX · Prototypes</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Stats Row (Credibility at a glance) */}
          <div className="mt-12 pt-8 border-t border-[#242424]/60 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#141414] border border-[#242424] space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F0]">Sole Designer</div>
              <div className="font-mono text-xs text-[#FF6B35] font-semibold">At SJ Innovation since Feb 2026</div>
              <p className="text-xs text-[#9A9A93] pt-1">Independently owning and shipping all client and enterprise AI products.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#141414] border border-[#242424] space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F0]">10+ Products</div>
              <div className="font-mono text-xs text-[#4ADE80] font-semibold">AI-Native Systems Shipped</div>
              <p className="text-xs text-[#9A9A93] pt-1">Full design systems and streaming interfaces across healthcare, finance &amp; real estate.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#141414] border border-[#242424] space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F0]">200+ Assets</div>
              <div className="font-mono text-xs text-[#7DA2FF] font-semibold">Delivered with 100% On-Time Record</div>
              <p className="text-xs text-[#9A9A93] pt-1">Targeted digital marketing ad sets, high-converting lead campaigns, and brand manuals.</p>
            </div>
          </div>
        </section>

        {/* 3. Experience Timeline (Scannable Résumé Format) */}
        <section className="py-14 border-b border-[#242424] space-y-8">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#FF6B35]" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
              Experience Timeline
            </h2>
          </div>

          <div className="space-y-8 max-w-4xl">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-xl bg-[#141414] border border-[#242424] space-y-4 hover:border-[#333] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="space-y-0.5">
                    <h3 className="font-display text-xl font-bold text-[#F5F5F0]">{exp.role}</h3>
                    <div className="text-sm text-[#FF6B35] font-medium">{exp.company} · {exp.location}</div>
                  </div>
                  <span className="font-mono text-xs text-[#9A9A93] px-3 py-1 rounded-full bg-[#1C1C1C] border border-[#242424] shrink-0">
                    {exp.period}
                  </span>
                </div>

                {exp.highlight && (
                  <p className="text-xs font-mono text-[#4ADE80] bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-3 py-1.5 rounded-lg">
                    {exp.highlight}
                  </p>
                )}

                <ul className="space-y-2 pt-2 text-sm text-[#9A9A93] leading-relaxed">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-[#FF6B35] mt-1 shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Skills & Capabilities (Grouped Plain Text Lists, No arbitrary bars) */}
        <section className="py-14 border-b border-[#242424] space-y-8">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#FF6B35]" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
              Skills &amp; Technical Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#141414] border border-[#242424] space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-[#FF6B35] font-semibold border-b border-[#242424] pb-2">
                  {group.category}
                </div>
                <ul className="space-y-2.5 text-sm text-[#9A9A93]">
                  {group.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Services & Client Offerings */}
        <section className="py-14 border-b border-[#242424] space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="font-mono text-xs uppercase tracking-wider text-[#FF6B35]">Client &amp; Advisory Scope</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
              Services Offered
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, sIdx) => (
              <div
                key={sIdx}
                className="p-5 rounded-xl bg-[#141414] border border-[#242424] flex items-start gap-3 hover:border-[#333] transition-colors"
              >
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#1C1C1C] text-[#FF6B35] font-bold">
                  0{sIdx + 1}
                </span>
                <span className="text-sm font-medium text-[#F5F5F0]">{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Certifications & Verification */}
        <section className="py-14 space-y-8">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FF6B35]" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
              Certifications &amp; Credentials
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, cIdx) => (
              <div key={cIdx} className="p-5 rounded-xl bg-[#141414] border border-[#242424] space-y-1">
                <div className="text-sm font-semibold text-[#F5F5F0]">{cert.title}</div>
                <div className="font-mono text-xs text-[#9A9A93] flex items-center justify-between pt-1">
                  <span>{cert.issuer}</span>
                  <span className="text-[#5C5C56]">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
