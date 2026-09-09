import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { PROJECTS, Project } from "../src/data/projects";

const BASE_URL = "https://sadmanportfolio.vercel.app";

function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function ensureDir(filePath: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function buildProjectHtml(project: Project): string {
  const outcomesHtml = project.outcomes
    ? `
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; color: #fff;">Measurable Outcomes</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem;">
          ${project.outcomes
            .map(
              (o) => `
            <div style="background: #111; padding: 1.25rem; border-radius: 8px; border: 1px solid #222;">
              <div style="font-size: 1.8rem; font-weight: 700; color: #fff;">${escapeHtml(o.value)}</div>
              <div style="color: #aaa; font-weight: 500; font-size: 0.9rem; margin-top: 0.25rem;">${escapeHtml(o.label)}</div>
              ${o.subtext ? `<div style="color: #666; font-size: 0.8rem; margin-top: 0.25rem;">${escapeHtml(o.subtext)}</div>` : ""}
            </div>
          `
            )
            .join("")}
        </div>
        ${
          project.outcomeSummary
            ? `<p style="margin-top: 1.25rem; line-height: 1.6; color: #ccc;">${escapeHtml(project.outcomeSummary)}</p>`
            : ""
        }
      </section>
    `
    : "";

  const processHtml = `
    <section style="margin-bottom: 2.5rem;">
      <h2 style="font-size: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; color: #fff;">Process &amp; Implementation</h2>
      ${project.process
        .map(
          (p) => `
        <article style="margin-top: 1.5rem;">
          <h3 style="font-size: 1.2rem; color: #eee; margin-bottom: 0.5rem;">${escapeHtml(p.title)}</h3>
          <p style="margin: 0 0 0.75rem; line-height: 1.6; color: #bbb;">${escapeHtml(p.description)}</p>
          ${
            p.details
              ? `<ul style="margin: 0.5rem 0 0 1.25rem; padding: 0; color: #aaa; line-height: 1.6;">
                  ${p.details.map((d) => `<li style="margin-bottom: 0.25rem;">${escapeHtml(d)}</li>`).join("")}
                </ul>`
              : ""
          }
        </article>
      `
        )
        .join("")}
    </section>
  `;

  const galleryListHtml =
    project.galleryImages && project.galleryImages.length > 0
      ? `
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; color: #fff;">Visual Artifacts &amp; Gallery</h2>
        <ul style="margin-top: 1rem; padding-left: 1.25rem; color: #bbb; line-height: 1.6;">
          ${project.galleryImages
            .map((img) => `<li><strong>${escapeHtml(img.caption)}</strong> (Asset: <code>${escapeHtml(img.url)}</code>)</li>`)
            .join("")}
        </ul>
      </section>
    `
      : "";

  return `
    <main class="static-prerender" style="max-width: 1000px; margin: 0 auto; padding: 3rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed; line-height: 1.6;">
      <header style="margin-bottom: 3rem;">
        <nav style="margin-bottom: 2rem; font-size: 0.9rem;">
          <a href="/" style="color: #888; text-decoration: none;">Sadman Zaman Khan</a>
          <span style="color: #444; margin: 0 0.5rem;">/</span>
          <a href="/work" style="color: #888; text-decoration: none;">Work</a>
          <span style="color: #444; margin: 0 0.5rem;">/</span>
          <span style="color: #fff;">${escapeHtml(project.title)}</span>
        </nav>
        <p style="text-transform: uppercase; letter-spacing: 0.12em; color: #888; font-size: 0.8rem; margin-bottom: 0.5rem;">
          ${escapeHtml(project.category)} · ${escapeHtml(project.year)} · ${escapeHtml(project.status)}
        </p>
        <h1 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem; color: #ffffff; letter-spacing: -0.02em;">
          ${escapeHtml(project.title)}
        </h1>
        <p style="font-size: 1.2rem; line-height: 1.6; color: #cccccc; margin: 0 0 2rem;">
          ${escapeHtml(project.summary)}
        </p>
        <dl style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 0; background: #111; padding: 1.5rem; border-radius: 8px; border: 1px solid #222;">
          <div><dt style="color: #777; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Company</dt><dd style="color: #fff; font-weight: 500; margin: 0;">${escapeHtml(project.company)}</dd></div>
          <div><dt style="color: #777; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Client</dt><dd style="color: #fff; font-weight: 500; margin: 0;">${escapeHtml(project.client)}</dd></div>
          <div><dt style="color: #777; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Timeline</dt><dd style="color: #fff; font-weight: 500; margin: 0;">${escapeHtml(project.duration)}</dd></div>
          <div><dt style="color: #777; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Scope</dt><dd style="color: #fff; font-weight: 500; margin: 0;">${escapeHtml(project.scope.join(", "))}</dd></div>
        </dl>
      </header>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; color: #fff;">Overview &amp; TL;DR</h2>
        <div style="margin-top: 1rem; display: grid; gap: 0.75rem;">
          <p><strong>The Challenge:</strong> ${escapeHtml(project.tldr.challenge)}</p>
          <p><strong>My Role:</strong> ${escapeHtml(project.tldr.role)}</p>
          <p><strong>The Method:</strong> ${escapeHtml(project.tldr.method)}</p>
        </div>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; color: #fff;">The Problem</h2>
        <p style="margin-top: 1rem; line-height: 1.6; color: #bbb;">${escapeHtml(project.problem)}</p>
      </section>

      ${processHtml}
      ${outcomesHtml}
      ${galleryListHtml}

      ${
        project.liveUrl
          ? `
        <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #222;">
          <a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #ffffff; color: #000000; padding: 0.75rem 1.5rem; font-weight: 600; text-decoration: none; border-radius: 6px;">
            Visit Live Production Project ↗
          </a>
        </div>
      `
          : ""
      }
    </main>
  `;
}

function buildHomeHtml(): string {
  return `
    <main class="static-prerender" style="max-width: 1000px; margin: 0 auto; padding: 3rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed; line-height: 1.6;">
      <header style="margin-bottom: 3.5rem;">
        <h1 style="font-size: 2.75rem; font-weight: 700; margin: 0 0 1rem; color: #ffffff; letter-spacing: -0.03em;">
          Sadman Zaman Khan
        </h1>
        <p style="font-size: 1.25rem; color: #aaa; margin: 0 0 1.5rem; max-width: 700px;">
          UI/UX Designer &amp; AI-Augmented Prototyper designing enterprise dashboards, AI-native product interfaces, motion graphics, and brand systems.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="/work" style="display: inline-block; background: #fff; color: #000; padding: 0.65rem 1.25rem; font-weight: 600; text-decoration: none; border-radius: 6px;">Explore Selected Work</a>
          <a href="/about" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 0.65rem 1.25rem; font-weight: 500; text-decoration: none; border-radius: 6px; border: 1px solid #333;">About &amp; Resume</a>
        </div>
      </header>

      <section style="margin-bottom: 3.5rem;">
        <h2 style="font-size: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; color: #fff; margin-bottom: 1.5rem;">
          Selected Work &amp; Case Studies (${PROJECTS.length} Projects)
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
          ${PROJECTS.map(
            (p) => `
            <article style="background: #111; padding: 1.5rem; border-radius: 8px; border: 1px solid #222;">
              <p style="text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; color: #888; margin: 0 0 0.5rem;">
                ${escapeHtml(p.category)} · ${escapeHtml(p.year)}
              </p>
              <h3 style="font-size: 1.25rem; margin: 0 0 0.75rem;">
                <a href="/work/${escapeHtml(p.slug)}" style="color: #fff; text-decoration: none;">${escapeHtml(p.title)}</a>
              </h3>
              <p style="color: #aaa; font-size: 0.95rem; line-height: 1.5; margin: 0 0 1rem;">
                ${escapeHtml(p.summary)}
              </p>
              <a href="/work/${escapeHtml(p.slug)}" style="color: #3b82f6; font-size: 0.9rem; text-decoration: none; font-weight: 500;">
                Read Case Study →
              </a>
            </article>
          `
          ).join("")}
        </div>
      </section>
    </main>
  `;
}

function buildWorkHtml(): string {
  const categories = ["Enterprise Dashboards", "AI Systems", "Mobile & Web", "Brand Systems"] as const;

  return `
    <main class="static-prerender" style="max-width: 1000px; margin: 0 auto; padding: 3rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed; line-height: 1.6;">
      <header style="margin-bottom: 3rem;">
        <nav style="margin-bottom: 1.5rem;"><a href="/" style="color: #888; text-decoration: none;">← Home</a></nav>
        <h1 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 0.75rem; color: #fff;">Work &amp; Case Studies</h1>
        <p style="color: #aaa; font-size: 1.15rem; margin: 0;">Comprehensive index of commercial UI/UX, enterprise platforms, AI products, and brand identity systems.</p>
      </header>

      ${categories
        .map((cat) => {
          const catProjects = PROJECTS.filter((p) => p.category === cat);
          if (catProjects.length === 0) return "";
          return `
          <section style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.4rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; color: #fff; margin-bottom: 1.25rem;">
              ${escapeHtml(cat)} (${catProjects.length})
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
              ${catProjects
                .map(
                  (p) => `
                <article style="background: #111; padding: 1.25rem; border-radius: 8px; border: 1px solid #222;">
                  <h3 style="font-size: 1.15rem; margin: 0 0 0.5rem;">
                    <a href="/work/${escapeHtml(p.slug)}" style="color: #fff; text-decoration: none;">${escapeHtml(p.title)}</a>
                  </h3>
                  <p style="color: #aaa; font-size: 0.9rem; line-height: 1.5; margin: 0 0 0.75rem;">${escapeHtml(p.summary)}</p>
                  <a href="/work/${escapeHtml(p.slug)}" style="color: #3b82f6; font-size: 0.85rem; text-decoration: none;">Read Case Study →</a>
                </article>
              `
                )
                .join("")}
            </div>
          </section>
        `;
        })
        .join("")}
    </main>
  `;
}

function buildAboutHtml(): string {
  return `
    <main class="static-prerender" style="max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed; line-height: 1.6;">
      <header style="margin-bottom: 2.5rem;">
        <nav style="margin-bottom: 1.5rem;"><a href="/" style="color: #888; text-decoration: none;">← Home</a></nav>
        <h1 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 0.5rem; color: #fff;">About Sadman Zaman Khan</h1>
        <p style="color: #aaa; font-size: 1.15rem;">UI/UX Designer &amp; AI-Augmented Prototyper based in Dhaka, Bangladesh.</p>
      </header>

      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.3rem; color: #fff; border-bottom: 1px solid #333; padding-bottom: 0.5rem;">Background &amp; Philosophy</h2>
        <p style="color: #ccc; margin-top: 1rem; line-height: 1.7;">
          Versatile UI/UX Designer with hands-on experience across enterprise SaaS dashboards, AI agent workflows, design systems, and rapid prototyping. Sole designer at SJ Innovation LLC independently owning client and internal design initiatives.
        </p>
        <p style="color: #ccc; line-height: 1.7;">
          My work synthesizes rigorous information architecture with high-craft aesthetics—transforming dense financial datasets, clinical automation workflows, and multi-agent platforms into intuitive, memorable interfaces.
        </p>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.3rem; color: #fff; border-bottom: 1px solid #333; padding-bottom: 0.5rem;">Core Competencies</h2>
        <ul style="color: #ccc; margin-top: 1rem; line-height: 1.8; padding-left: 1.25rem;">
          <li><strong>UI/UX Design:</strong> Enterprise SaaS, Design Systems (Figma), Responsive Web Layouts, User Flow Mapping, Interactive Prototyping.</li>
          <li><strong>AI Integration &amp; Prototyping:</strong> Claude Code, Ollama, Replicate API, Prompt Engineering, Agentic UX.</li>
          <li><strong>Visual &amp; Print Production:</strong> Adobe Creative Cloud (Illustrator, Photoshop), Vector Geometry, Large-Format Event Collateral, Publication Typography.</li>
          <li><strong>Frontend Engineering:</strong> Semantic HTML5, CSS3/Tailwind, React/Vite, WebGL/Three.js, Rapier3D physics.</li>
        </ul>
      </section>
    </main>
  `;
}

function updateHtmlTags(
  templateHtml: string,
  options: {
    title: string;
    description: string;
    url: string;
    image: string;
    contentHtml: string;
    jsonLd?: object;
  }
): string {
  let html = templateHtml;

  // 1. Replace title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(options.title)}</title>`);

  // 2. Replace meta description
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(options.description)}">`
  );

  // 3. Replace OG tags
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(options.title)}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(options.description)}" />`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:url" content="${escapeHtml(options.url)}" />`);
  html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:image" content="${escapeHtml(options.image)}" />`);

  // 4. Replace Twitter tags
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(options.title)}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(options.description)}" />`);
  html = html.replace(/<meta\s+name=["']twitter:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:url" content="${escapeHtml(options.url)}" />`);
  html = html.replace(/<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:image" content="${escapeHtml(options.image)}" />`);

  // 5. Replace or Inject Canonical & JSON-LD
  if (/<link\s+rel=["']canonical["'][^>]*\/?>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*\/?>/i, `<link rel="canonical" href="${escapeHtml(options.url)}" />`);
  } else {
    html = html.replace(/<\/head>/i, `    <link rel="canonical" href="${escapeHtml(options.url)}" />\n  </head>`);
  }

  if (options.jsonLd) {
    html = html.replace(/<\/head>/i, `    <script type="application/ld+json">${JSON.stringify(options.jsonLd)}</script>\n  </head>`);
  }

  // 6. Inject prerendered body into #root
  html = html.replace('<div id="root"></div>', `<div id="root">${options.contentHtml}</div>`);

  return html;
}

export function prerender() {
  const distDir = resolve("dist");
  const templatePath = resolve(distDir, "index.html");

  if (!existsSync(templatePath)) {
    console.error("dist/index.html not found! Run 'vite build' first.");
    process.exit(1);
  }

  const templateHtml = readFileSync(templatePath, "utf-8");
  let count = 0;

  // 1. Prerender Homepage
  const homeHtml = updateHtmlTags(templateHtml, {
    title: "Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper",
    description: "Personal portfolio of Sadman Zaman Khan — UI/UX Designer & AI-Augmented Prototyper designing enterprise dashboards, AI-native product interfaces, and brand systems.",
    url: `${BASE_URL}/`,
    image: `${BASE_URL}/og-image.webp`,
    contentHtml: buildHomeHtml(),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sadman Zaman Khan",
      "jobTitle": "UI/UX Designer & AI-Augmented Prototyper",
      "url": BASE_URL,
      "sameAs": ["https://github.com/Annyxtopheles", "https://twitter.com/annyxtopheles"]
    }
  });
  writeFileSync(resolve(distDir, "index.html"), homeHtml, "utf-8");
  count++;

  // 2. Prerender /work
  const workHtml = updateHtmlTags(templateHtml, {
    title: "Work & Case Studies — Sadman Zaman Khan",
    description: "Featured design systems, enterprise dashboards, AI tools, and mobile/web projects by Sadman Zaman Khan.",
    url: `${BASE_URL}/work`,
    image: `${BASE_URL}/og-image.webp`,
    contentHtml: buildWorkHtml()
  });
  const workPath = resolve(distDir, "work", "index.html");
  ensureDir(workPath);
  writeFileSync(workPath, workHtml, "utf-8");
  count++;

  // 3. Prerender /about
  const aboutHtml = updateHtmlTags(templateHtml, {
    title: "About & Experience — Sadman Zaman Khan",
    description: "Biography, design competencies, technical skills, and experience of UI/UX Designer Sadman Zaman Khan.",
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/og-image.webp`,
    contentHtml: buildAboutHtml()
  });
  const aboutPath = resolve(distDir, "about", "index.html");
  ensureDir(aboutPath);
  writeFileSync(aboutPath, aboutHtml, "utf-8");
  count++;

  // 4. Prerender all projects
  for (const project of PROJECTS) {
    const projectUrl = `${BASE_URL}/work/${project.slug}`;
    const imageUrl = project.coverImage.startsWith("http")
      ? project.coverImage
      : `${BASE_URL}${project.coverImage}`;

    const projectHtml = updateHtmlTags(templateHtml, {
      title: `${project.title} — Case Study | Sadman Zaman Khan`,
      description: project.summary,
      url: projectUrl,
      image: imageUrl,
      contentHtml: buildProjectHtml(project),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "headline": project.title,
        "description": project.summary,
        "image": imageUrl,
        "url": projectUrl,
        "author": {
          "@type": "Person",
          "name": "Sadman Zaman Khan"
        },
        "genre": project.category,
        "keywords": project.scope.join(", ")
      }
    });

    // Write to dist/work/[slug]/index.html
    const targetWork = resolve(distDir, "work", project.slug, "index.html");
    ensureDir(targetWork);
    writeFileSync(targetWork, projectHtml, "utf-8");
    count++;

    // Write alias to dist/portfolio/[slug]/index.html
    const targetPortfolio = resolve(distDir, "portfolio", project.slug, "index.html");
    ensureDir(targetPortfolio);
    writeFileSync(targetPortfolio, projectHtml, "utf-8");
    count++;
  }

  console.log(`[prerender] Successfully generated ${count} static crawlable HTML pages in dist/!`);
}

prerender();
