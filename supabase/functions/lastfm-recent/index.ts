import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const headers = { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' };
  try {
    const url = new URL(req.url);
    const u = url.searchParams.get('u')?.trim();
    if (!u) return new Response(JSON.stringify({ items: [] }), { headers });
    const key = Deno.env.get('LASTFM_API_KEY');
    if (!key) return new Response(JSON.stringify({ items: [], error: 'missing_key' }), { headers });

    const api = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(u)}&api_key=${key}&format=json&limit=6`;
    const r = await fetch(api);
    if (!r.ok) return new Response(JSON.stringify({ items: [] }), { headers });
    const json = await r.json();
    const tracks = json?.recenttracks?.track ?? [];
    const items = (Array.isArray(tracks) ? tracks : [tracks]).map((t: any, i: number) => {
      const images = t.image ?? [];
      const cover = images[images.length - 1]?.['#text'] || null;
      const nowPlaying = t['@attr']?.nowplaying === 'true';
      return {
        id: t.url || `${t.name}-${i}`,
        title: t.name,
        artist: t.artist?.['#text'] ?? t.artist?.name ?? '',
        album: t.album?.['#text'] ?? '',
        cover,
        url: t.url,
        nowPlaying,
        playedAt: t.date?.uts ? Number(t.date.uts) * 1000 : null,
      };
    });
    return new Response(JSON.stringify({ items }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ items: [], error: String(e) }), { headers });
  }
});
