import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { MorphingText } from '@/components/MorphingText';
import Lanyard from '@/components/profile/Lanyard';
import idCardFrontSvg from '@/assets/ID Card Front for Profile in SZK.svg';
import sjiIconSvg from '@/assets/SJI Icon.svg';

const Profile = () => {
  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-between overflow-x-clip">
      <SEOHead
        title="Profile & Resume — Sadman Zaman Khan"
        description="Profile, experience, core competencies, and resume of Sadman Zaman Khan — UI/UX Designer specializing in AI-augmented prototyping and brand systems."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Sadman Zaman Khan — Profile & Resume',
          description: 'UI/UX Designer | AI-Augmented Prototyping | Brand Systems',
          url: 'https://sadmanzamankhan.pages.dev/profile',
        }}
      />

      {/* Full-Screen 3D Lanyard ID Card Hanging from Top Ceiling (Full Viewport Bounds) */}
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none z-30 overflow-visible">
        <Lanyard frontImage={idCardFrontSvg} backImage={sjiIconSvg} />
      </div>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-36 md:pt-44 lg:pt-52 pb-24 flex-1 w-full relative z-10">
        {/* Header / Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div className="max-w-2xl">
            <h1 className="font-scanport text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-3">
              <MorphingText
                texts={["Sadman Zaman Khan", "সাদমান জামান খান"]}
                align="left"
                className="text-left"
              />
            </h1>
            <p className="text-lg md:text-xl opacity-75 font-normal">
              UI/UX Designer <span className="opacity-40">/</span> AI-Augmented Prototyping <span className="opacity-40">/</span> Brand Systems
            </p>
            <p className="text-sm opacity-50 mt-2">
              Dhaka, Bangladesh · <a href="mailto:sadmanz.khan@gmail.com" className="hover:opacity-100 underline underline-offset-4 transition-opacity">sadmanz.khan@gmail.com</a>
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="/Sadman_Zaman_Khan_Resume.pdf"
              download="Sadman_Zaman_Khan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background px-5 py-2.5 rounded-full text-xs font-medium lowercase tracking-wide hover:bg-foreground/80 transition-colors inline-flex items-center gap-2"
            >
              <span>download resume (pdf)</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
          {/* Left Column: Summary & Experience */}
          <div className="lg:col-span-8 space-y-16">
            {/* Professional Summary */}
            <section>
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Summary</h2>
              <p className="text-base sm:text-lg leading-relaxed opacity-85">
                Versatile UI/UX Designer with hands-on experience across enterprise dashboards, brand systems, and AI-augmented prototyping. Uses Figma AI and low-code tools to move from concept to testable prototype quickly, reducing client revision cycles. Sole designer at SJ Innovation since February 2026, independently owning all client and internal design work.
              </p>
            </section>

            {/* Experience */}
            <section className="space-y-12">
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Experience</h2>

              {/* Role 1 */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-medium">UI/UX Designer</h3>
                  <span className="text-xs opacity-50 font-mono">Oct 2025 – Present</span>
                </div>
                <div className="text-sm opacity-60 font-medium">SJ Innovation LLC · Full-time · New York, US (Remote)</div>
                <p className="text-xs opacity-50 italic">Promoted to sole designer in Feb 2026; independently owning all design work.</p>
                <ul className="space-y-2 text-sm opacity-80 leading-relaxed list-disc list-outside pl-4 pt-2">
                  <li>Designed complete visual identity systems for 10+ AI-native Control Tower products (ePhysician, Marketing AI, MortgageAI, RealtorHelp, HR CT, Agency CT, NonProfit AI) and delivered high-stakes client projects under tight deadlines.</li>
                  <li>Designed ICR Debt Surveillance — a Bloomberg Terminal–style dashboard for credit investors, including a 15-module data layout, alert indicators, and investor-facing data visualizations.</li>
                  <li>Alyssa Kristin (luxury bridal SaaS) — designed three separate experiences (mobile Stylist App, Admin CMS, CRM) as one connected system using Figma AI agents and low-code deployment.</li>
                  <li>Built and executed Meta ad campaigns resulting in 5 form submissions on day one from sales lead data.</li>
                  <li>Led full UI/UX redesign of CollabAI&apos;s multi-agent platform, replacing a cluttered interface with a clean, minimal design with live AI chat integrations (Groq, Gemini, OpenRouter).</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="space-y-3 pt-4 border-t border-foreground/10">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-medium">Intern Graphic Designer</h3>
                  <span className="text-xs opacity-50 font-mono">May 2025 – Sep 2025</span>
                </div>
                <div className="text-sm opacity-60 font-medium">SJ Innovation LLC</div>
                <ul className="space-y-2 text-sm opacity-80 leading-relaxed list-disc list-outside pl-4 pt-2">
                  <li>Orchestrated digital asset pipeline supporting US-based global campaigns: developed 200+ high-engagement digital and print collateral pieces (targeted Meta ads, LinkedIn carousels, event banners).</li>
                </ul>
              </div>

              {/* Role 3 */}
              <div className="space-y-3 pt-4 border-t border-foreground/10">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-medium">Freelance Graphic &amp; Brand Designer</h3>
                  <span className="text-xs opacity-50 font-mono">Mar 2025 – Apr 2025</span>
                </div>
                <div className="text-sm opacity-60 font-medium">Independent</div>
                <ul className="space-y-2 text-sm opacity-80 leading-relaxed list-disc list-outside pl-4 pt-2">
                  <li>Completed 4 client engagements for US-based businesses (edtech branding, physical store signage, gym marketing collateral), delivering logo designs and brand systems with 100% on-time delivery.</li>
                </ul>
              </div>
            </section>

            {/* Key Endeavors & Impact */}
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Key Endeavors &amp; Contributions</h2>
              <div className="space-y-4 text-sm opacity-80 leading-relaxed">
                <div>
                  <h4 className="font-medium text-foreground opacity-100 mb-1">Brand Consistency Ownership</h4>
                  <p>Led visual brand consistency across the Control Tower product suite, internal culture materials, and company-wide presentations, authoring complete brand guidelines from concept to implementation.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground opacity-100 mb-1">NEXURA Brand Identity System</h4>
                  <p>End-to-end brand system for capstone project: logo suite, 40-page guideline document, and application mockups across 20+ touchpoints (Score: 4.0).</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Skills, Education, Certifications */}
          <div className="lg:col-span-4 space-y-12">
            {/* Core Competencies */}
            <section>
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Competencies</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-foreground mb-1">UI/UX Design</div>
                  <p className="opacity-70 leading-relaxed text-xs">Figma (Design Systems, AI agents), Responsive Web Layouts, User Flow Mapping, Wireframing, Interactive Prototyping</p>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Advanced Tech &amp; AI Integration</div>
                  <p className="opacity-70 leading-relaxed text-xs">Ollama, Replicate API, Low-code Prototyping (Lovable, Bolt.new), Google Antigravity, WordPress Administration</p>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Visual Production</div>
                  <p className="opacity-70 leading-relaxed text-xs">Adobe Creative Suite (Illustrator, Photoshop), Brand Identity Systems, Vector Illustration, Digital Marketing Assets</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Education</h2>
              <div className="text-sm">
                <div className="font-medium">Diploma in Engineering in Computer Science</div>
                <div className="opacity-60 text-xs mt-1">Munshiganj Polytechnic Institute</div>
                <div className="opacity-40 text-xs font-mono mt-0.5">2021 – 2025</div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Certifications</h2>
              <ul className="space-y-3 text-xs opacity-80">
                <li>
                  <div className="font-medium">Design System in Figma</div>
                  <div className="opacity-50">Grameenphone Academy · Oct 2025</div>
                </li>
                <li>
                  <div className="font-medium">Claude Code in Action</div>
                  <div className="opacity-50">Anthropic · Feb 2026</div>
                </li>
                <li>
                  <div className="font-medium">Digital Skills: User Experience</div>
                  <div className="opacity-50">Accenture · Sep 2025</div>
                </li>
                <li>
                  <div className="font-medium">HubSpot Inbound Marketing</div>
                  <div className="opacity-50">HubSpot · Mar 2026</div>
                </li>
                <li>
                  <div className="font-medium">B1 English for Developers (95.2%)</div>
                  <div className="opacity-50">freeCodeCamp · Feb 2026</div>
                </li>
              </ul>
            </section>

            {/* Direct Connect */}
            <section className="pt-6 border-t border-foreground/10">
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-3">Links</h2>
              <div className="flex flex-col gap-2 text-xs font-medium">
                <a href="https://linkedin.com/in/sadmanzamankhan" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  linkedin ↗
                </a>
                <a href="mailto:sadmanz.khan@gmail.com" className="hover:opacity-60 transition-opacity">
                  email ↗
                </a>
                <a href="/Sadman_Zaman_Khan_Resume.pdf" download="Sadman_Zaman_Khan_Resume.pdf" className="hover:opacity-60 transition-opacity">
                  download pdf resume ↗
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
