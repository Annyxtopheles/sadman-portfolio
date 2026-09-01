import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

function b64url(bytes: Uint8Array) {
  const b = btoa(String.fromCharCode(...bytes));
  return b.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
async function sha256Hex(input: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const headers = { ...corsHeaders, 'Content-Type': 'application/json' };
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const authHeader = req.headers.get('Authorization') ?? '';
    const jwt = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!jwt) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers });

    const user = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: `Bearer ${jwt}` } } });
    const { data: userRes } = await user.auth.getUser();
    const uid = userRes?.user?.id;
    if (!uid) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers });

    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    const { data: isSuper } = await admin.rpc('is_super_admin', { _user_id: uid });
    if (!isSuper) return new Response(JSON.stringify({ error: 'forbidden' }), { status: 403, headers });

    const body = await req.json().catch(() => ({}));
    const relationHint = typeof body?.relation_hint === 'string' ? body.relation_hint.slice(0, 80) : null;
    const days = Math.min(90, Math.max(1, Number(body?.expires_in_days) || 14));

    const raw = b64url(crypto.getRandomValues(new Uint8Array(24)));
    const hash = await sha256Hex(raw);
    const expiresAt = new Date(Date.now() + days * 86400_000).toISOString();

    const { data: row, error } = await admin.from('matrimony_testimonial_invites').insert({
      token_hash: hash,
      relation_hint: relationHint,
      expires_at: expiresAt,
      created_by: uid,
    }).select('id, expires_at').single();
    if (error) return new Response(JSON.stringify({ error: 'insert_failed', detail: error.message }), { status: 500, headers });

    return new Response(JSON.stringify({ id: row.id, token: raw, expires_at: row.expires_at }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'server_error', detail: String(e) }), { status: 500, headers });
  }
});
