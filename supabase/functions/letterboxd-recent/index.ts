import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { XMLParser } from 'npm:fast-xml-parser@4';

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

function extractPoster(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1] ?? null;
}
function stripHtml(html: string, max = 220): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const headers = { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' };
  try {
    const url = new URL(req.url);
    const u = url.searchParams.get('u')?.trim();
    if (!u) return new Response(JSON.stringify({ items: [] }), { headers });

    const r = await fetch(`https://letterboxd.com/${encodeURIComponent(u)}/rss/`, {
      headers: { 'User-Agent': 'Mozilla/5.0 SZK-Site' },
    });
    if (!r.ok) return new Response(JSON.stringify({ items: [] }), { headers });
    const xml = await r.text();
    const doc: any = parser.parse(xml);
    const rawItems = doc?.rss?.channel?.item ?? [];
    const list = Array.isArray(rawItems) ? rawItems : [rawItems];
    const items = list.slice(0, 6).map((it: any, i: number) => {
      const desc = it.description ?? '';
      const poster = extractPoster(desc);
      const rating = it['letterboxd:memberRating'] ? Number(it['letterboxd:memberRating']) : null;
      const year = it['letterboxd:filmYear'] ? Number(it['letterboxd:filmYear']) : null;
      const title = it['letterboxd:filmTitle'] ?? it.title ?? 'Untitled';
      return {
        id: it.guid?.['#text'] ?? it.guid ?? it.link ?? `${title}-${i}`,
        title,
        year,
        rating,
        reviewSnippet: stripHtml(desc),
        poster,
        url: it.link,
        watchedAt: it['letterboxd:watchedDate'] ?? it.pubDate ?? null,
      };
    });
    return new Response(JSON.stringify({ items }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ items: [], error: String(e) }), { headers });
  }
});
