import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3';

const Body = z.object({
  token: z.string().min(10).max(200),
  author_name: z.string().trim().min(1).max(120),
  relation: z.string().trim().min(1).max(80),
  body: z.string().trim().min(10).max(800),
});

async function sha256Hex(input: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const headers = { ...corsHeaders, 'Content-Type': 'application/json' };
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers });

  try {
    const parsed = Body.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return new Response(JSON.stringify({ error: 'invalid_input', detail: parsed.error.flatten().fieldErrors }), { status: 400, headers });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

    // Simple rate limit: 5 attempts / 15min per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const ipBucket = `testimonial:${ip}`;
    const since = new Date(Date.now() - 15 * 60_000).toISOString();
    const { count } = await admin
      .from('matrimony_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('ip', ipBucket)
      .gte('attempted_at', since);
    if ((count ?? 0) >= 5) return new Response(JSON.stringify({ error: 'too_many_attempts' }), { status: 429, headers });
    await admin.from('matrimony_attempts').insert({ ip: ipBucket, success: false, attempted_at: new Date().toISOString() });

    const hash = await sha256Hex(parsed.data.token);
    const { data, error } = await admin.rpc('submit_matrimony_testimonial', {
      _token_hash: hash,
      _author_name: parsed.data.author_name,
      _relation: parsed.data.relation,
      _body: parsed.data.body,
    });
    if (error) {
      const code = error.message?.includes('invalid_token') ? 'invalid_token'
        : error.message?.includes('used_token') ? 'used_token'
        : error.message?.includes('expired_token') ? 'expired_token'
        : 'submit_failed';
      const status = code === 'submit_failed' ? 500 : 400;
      return new Response(JSON.stringify({ error: code, detail: error.message }), { status, headers });
    }
    return new Response(JSON.stringify({ ok: true, id: data }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'server_error', detail: String(e) }), { status: 500, headers });
  }
});
