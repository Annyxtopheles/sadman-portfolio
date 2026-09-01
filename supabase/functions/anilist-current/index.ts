import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const QUERY = `
query ($name: String) {
  MediaListCollection(userName: $name, type: ANIME, status: CURRENT) {
    lists {
      entries {
        id
        progress
        score
        media {
          id
          episodes
          siteUrl
          title { romaji english userPreferred }
          coverImage { extraLarge large }
          bannerImage
        }
      }
    }
  }
}`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const headers = { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' };
  try {
    const url = new URL(req.url);
    const u = url.searchParams.get('u')?.trim();
    if (!u) return new Response(JSON.stringify({ items: [] }), { headers });

    const r = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { name: u } }),
    });
    if (!r.ok) return new Response(JSON.stringify({ items: [] }), { headers });
    const json = await r.json();
    const lists = json?.data?.MediaListCollection?.lists ?? [];
    const entries = lists.flatMap((l: any) => l.entries ?? []);
    const items = entries.slice(0, 12).map((e: any) => {
      const m = e.media ?? {};
      const t = m.title ?? {};
      return {
        id: String(e.id ?? m.id),
        title: t.english || t.romaji || t.userPreferred || 'Untitled',
        progress: e.progress ?? 0,
        total: m.episodes ?? null,
        score: e.score ?? 0,
        cover: m.coverImage?.extraLarge || m.coverImage?.large || null,
        banner: m.bannerImage || null,
        url: m.siteUrl,
      };
    });
    return new Response(JSON.stringify({ items }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ items: [], error: String(e) }), { headers });
  }
});
