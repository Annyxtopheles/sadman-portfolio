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
              Dhaka, Bangladesh · <a href="tel:+8801869504388" className="hover:opacity-100 transition-opacity">+880 1869 504 388</a> · <a href="mailto:sadmanz.khan@gmail.com" className="hover:opacity-100 underline underline-offset-4 transition-opacity">sadmanz.khan@gmail.com</a>
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
                Versatile UI/UX Designer with hands-on experience across enterprise dashboards, brand systems, and AI-augmented prototyping. Uses Figma AI and low-code tools (Lovable) to move from concept to testable prototype quickly, reducing client revision cycles. Sole designer at SJ Innovation since February 2026, independently owning all client and internal design work.
              </p>
            </section>

            {/* Experience */}
            <section className="space-y-12">
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Experience</h2>

              {/* Role 1 */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-medium">UI/UX Designer</h3>
                  <span className="text-xs opacity-50 font-mono">September 2025 – Present</span>
                </div>
                <div className="text-sm opacity-60 font-medium">SJ Innovation LLC · Dhaka, Bangladesh</div>
                <p className="text-xs opacity-70 italic">Sole designer at SJ Innovation since February 2026, owning client and internal design work across the company.</p>
                <ul className="space-y-2 text-sm opacity-80 leading-relaxed list-disc list-outside pl-4 pt-2">
                  <li>Designed complete visual identity systems for 10+ AI-native Control Tower products (ePhysician, Marketing AI, MortgageAI, RealtorHelp, HR CT, Agency CT, NonProfit AI) and delivered high-stakes client projects under tight deadlines: InfoFluence diagnostic reports (McKinsey-style aesthetic for AWS presentations), StoryGrooveAI landing page optimization.</li>
                  <li>Scaled the LuCreativ theme-park client account from an initial multi-venue engagement to sustained near-daily production across 7+ properties (Six Flags St. Louis, Valleyfair, Michigan&apos;s Adventure, Worlds of Fun, Schlitterbahn Galveston, Enchanted Parks) spanning digital, OOH, and paid-display formats — consistently praised by the client for quality and fast turnaround.</li>
                  <li>Designed the logo for Queens AI Week, an event partnership between the Queens Chamber of Commerce, SJ Innovation, and Firstlight Cloud Xchange.</li>
                  <li>Designed ICR Debt Surveillance — a Bloomberg Terminal–style dashboard for credit investors, including a 15-module data layout, alert indicators, and investor-facing data visualizations.</li>
                  <li>Alyssa Kristin (luxury bridal SaaS) — designed three separate experiences (mobile Stylist App, Admin CMS, CRM) as one connected system, translating complex operational requirements into functional prototypes using Figma AI agents and low-code deployment.</li>
                  <li>Manually redesigned AI-generated visual output in Figma to remove generic template patterns, then rebuilt and deployed the site using Google Antigravity and hand-coded refinements via Git/GitHub Pages.</li>
                  <li>WordPress: Hands-on content publishing, plugin administration, and technical troubleshooting; custom HTML.</li>
                  <li>Built and executed Meta ad campaigns (ePhysician, NonProfit AI) from sales lead data: segmented leads into custom audiences, configured targeting across campaign, ad set, and ad level in Ads Manager, and designed ad creatives that generated 5 form submissions on day one (previous creatives ran 4 days with 0 clicks).</li>
                  <li>Built functional front-end prototypes using low-code platforms (Lovable) to validate design decisions with stakeholders before development, reducing revision cycles and accelerating time-to-market.</li>
                  <li>Implemented a local AI workflow prototype (Ollama/Perplexica) for competitive UX analysis and set up ComfyUI workflows with safetensors models to generate images locally.</li>
                  <li>Recognized by a senior business analyst for ownership mindset: proactively delivering work with integrated self-critique and recommended improvements, streamlining review cycles.</li>
                  <li>Led a full UI/UX redesign of CollabAI&apos;s multi-agent platform, replacing a cluttered, neon-heavy interface with a clean, minimal design; implemented live AI chat with real model provider integrations (Groq, Gemini, OpenRouter) and user access controls, tested across desktop and mobile browsers.</li>
                  <li>Rebuilt personal portfolio with a custom brand identity and migrated off Lovable/Supabase to Cloudflare Pages, with automated GitHub-based deployments and zero ongoing cost, with full SEO setup (sitemap, robots.txt, canonical metadata) and confirmed Google indexing via Search Console.</li>
                  <li>Rebuilt underperforming Meta ad creatives for a B2B healthcare automation product (ePhysician) — replaced generic stock imagery and cluttered layout with custom, brand-consistent visuals and a single clear CTA — turning a 0-lead, 4-day campaign into a sustained ~2–3.5 leads/day pipeline on the same ad budget.</li>
                  <li>Led a comprehensive on-page SEO audit across the Control Tower landing page portfolio and CollabAI/BuildYourAI landing pages (6+ pages, 4 product verticals), identifying duplicate canonical URLs, a sitewide heading markup issue, and cross-page data inconsistencies — producing a prioritized, template-level fix plan.</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="space-y-3 pt-6 border-t border-foreground/10">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-medium">Intern Graphic Designer</h3>
                  <span className="text-xs opacity-50 font-mono">May 2025 – September 2025</span>
                </div>
                <div className="text-sm opacity-60 font-medium">SJ Innovation LLC · Dhaka, Bangladesh</div>
                <ul className="space-y-2 text-sm opacity-80 leading-relaxed list-disc list-outside pl-4 pt-2">
                  <li>Orchestrated a digital asset pipeline supporting US-based global campaigns: developed 200+ high-engagement digital and print collateral pieces (targeted Meta ads, optimized LinkedIn carousels, large-format corporate event banners, internal office installations) for multicultural marketing initiatives and product launches.</li>
                </ul>
              </div>

              {/* Role 3 */}
              <div className="space-y-3 pt-6 border-t border-foreground/10">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-medium">Freelance Graphic &amp; Brand Designer</h3>
                  <span className="text-xs opacity-50 font-mono">March 2025 – April 2025</span>
                </div>
                <div className="text-sm opacity-60 font-medium">Freelancer · Global Clients</div>
                <ul className="space-y-2 text-sm opacity-80 leading-relaxed list-disc list-outside pl-4 pt-2">
                  <li>Completed 4 client engagements for US-based businesses (edtech branding, physical store signage, gym marketing collateral) during post-graduation period, delivering logo designs and brand systems with 100% on-time delivery.</li>
                </ul>
              </div>
            </section>

            {/* Key Projects & Endeavors */}
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Key Projects &amp; Endeavors</h2>
              <div className="space-y-6 text-sm opacity-80 leading-relaxed">
                <div>
                  <h4 className="font-medium text-foreground opacity-100 mb-1">Campus Rebranding &amp; Digital Infrastructure</h4>
                  <div className="text-xs opacity-50 mb-2 font-mono">Munshiganj Polytechnic Institute · 2022 – 2025</div>
                  <p>Spearheaded end-to-end visual branding overhaul for campus ceremonies, providing professional print suites (signage, custom recognition materials) and establishing standardized digital guidelines across social media. Developed and deployed a custom website on Wix to digitize unit resources and designed foundational brand identity for the new Computer Club.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground opacity-100 mb-1">NEXURA — Brand Identity System (Final Capstone Project)</h4>
                  <div className="text-xs opacity-50 mb-2 font-mono">Adobe Illustrator · Photoshop · Score: 4.0 in 8th Semester</div>
                  <p>Led end-to-end brand identity development: designed custom logo system (multiple mark variations), developed comprehensive 40-page brand guideline document, and created application mockups across 20+ touchpoints (stationery, packaging, digital interfaces, signage, vehicle wraps).</p>
                </div>
              </div>
            </section>

            {/* Professional Achievements */}
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-wider font-medium opacity-50 mb-4">Professional Contributions &amp; Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs opacity-80 leading-relaxed">
                <div className="p-4 rounded-[4px] border border-foreground/10 bg-foreground/[0.02]">
                  <div className="font-medium text-foreground mb-1">Client Impact &amp; Ownership</div>
                  <p>Took full ownership of StoryGroove during its launch phase, praised by client as &quot;clean, thorough, and easily accessible.&quot;</p>
                </div>
                <div className="p-4 rounded-[4px] border border-foreground/10 bg-foreground/[0.02]">
                  <div className="font-medium text-foreground mb-1">Brand Consistency Ownership</div>
                  <p>Led visual brand consistency across Control Tower suite and company presentations, authoring current brand guidelines.</p>
                </div>
                <div className="p-4 rounded-[4px] border border-foreground/10 bg-foreground/[0.02]">
                  <div className="font-medium text-foreground mb-1">Operational Resilience</div>
                  <p>Stepped in for critical short-notice periods (~15 hrs documented after-hours/weekend work) to protect client delivery deadlines.</p>
                </div>
                <div className="p-4 rounded-[4px] border border-foreground/10 bg-foreground/[0.02]">
                  <div className="font-medium text-foreground mb-1">Collaboration &amp; Culture</div>
                  <p>Described as &quot;pillars and compass&quot; by teammates; led design execution for SJ Innovation&apos;s 22nd Anniversary celebration.</p>
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
                  <p className="opacity-70 leading-relaxed text-xs">Ollama, Replicate API, Low-code Prototyping (Lovable, Bolt.new), Google Antigravity, Claude Code (MCP orchestration), WordPress Administration</p>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Visual Production</div>
                  <p className="opacity-70 leading-relaxed text-xs">Adobe Creative Suite (Illustrator, Photoshop), Brand Identity Systems, Vector Illustration, Print Layouts, Digital Marketing Assets (Meta ads, Carousels)</p>
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
                  <div className="font-medium">Graphic Design for Freelancing Level-3</div>
                  <div className="opacity-50">NSDA · Oct 2024</div>
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
