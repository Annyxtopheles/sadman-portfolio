import { writeFileSync } from "fs";
import { resolve } from "path";
import { POEMS } from "../src/data/poems";
import { POSTS } from "../src/data/posts";
import { PROJECTS } from "../src/data/projects";

const BASE_URL = "https://sadmanportfolio.vercel.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/work", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "weekly", priority: "0.9" },
  { path: "/profile", changefreq: "monthly", priority: "0.8" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.8" },
  { path: "/poetry", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/pastime", changefreq: "monthly", priority: "0.7" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${new Date(e.lastmod).toISOString()}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

(() => {
  const dynamic: SitemapEntry[] = [];

  // All Projects / Case Studies
  for (const p of PROJECTS) {
    dynamic.push({ path: `/work/${p.slug}`, changefreq: "monthly", priority: "0.8" });
    dynamic.push({ path: `/portfolio/${p.slug}`, changefreq: "monthly", priority: "0.7" });
  }

  // All Poems
  for (const poem of POEMS) {
    dynamic.push({
      path: `/poetry/${poem.slug}`,
      lastmod: poem.published_at || poem.date || undefined,
      changefreq: "monthly",
      priority: "0.7"
    });
  }

  // All Blog Posts
  for (const post of POSTS) {
    dynamic.push({
      path: `/blog/${post.slug}`,
      lastmod: post.updated_at || post.created_at,
      changefreq: "monthly",
      priority: "0.7"
    });
  }

  const entries = [...staticEntries, ...dynamic];
  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
