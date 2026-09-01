import { useEffect, useState } from 'react';

const TTL_MS = 7 * 60 * 1000;
const FN_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export function useLiveFeed<T>(fnName: string, username: string | undefined | null, cacheKey: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(!!username);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) { setItems([]); setLoading(false); setError(null); return; }
    let alive = true;
    const key = `live:${cacheKey}:${username}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Date.now() - parsed.t < TTL_MS && Array.isArray(parsed.items)) {
          setItems(parsed.items); setLoading(false); setError(null);
          return () => { alive = false; };
        }
      }
    } catch { /* ignore */ }

    setLoading(true);
    (async () => {
      try {
        const url = `${FN_BASE}/${fnName}?u=${encodeURIComponent(username)}`;
        const r = await fetch(url, { headers: { Authorization: `Bearer ${ANON}`, apikey: ANON } });
        const j = await r.json().catch(() => ({ items: [] }));
        const resultItems: T[] = Array.isArray(j?.items) ? j.items : [];
        if (!alive) return;
        setItems(resultItems);
        setError(resultItems.length === 0 && j?.error ? String(j.error) : null);
        try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), items: resultItems })); } catch { /* ignore */ }
      } catch (e: any) {
        if (!alive) return;
        setError(String(e?.message ?? e));
        setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [fnName, username, cacheKey]);

  return { items, loading, error };
}
