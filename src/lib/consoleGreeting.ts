/**
 * One-time stylized devtools greeting. Safe to call multiple times — guarded
 * against React StrictMode double-mount via a window flag.
 */
export function printConsoleGreeting() {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { __szk_greeted?: boolean };
  if (w.__szk_greeted) return;
  w.__szk_greeted = true;

  const title = 'color:#FFFFFF;background:#1B1D1F;padding:6px 10px;font:600 14px/1 ui-monospace,Menlo,monospace;border-radius:2px;';
  const sub = 'color:#666666;font:500 12px/1.4 ui-monospace,Menlo,monospace;padding:6px 0;';
  const body = 'color:#1B1D1F;font:400 12px/1.5 ui-monospace,Menlo,monospace;';
  const link = 'color:#1B1D1F;font:600 12px/1.5 ui-monospace,Menlo,monospace;text-decoration:underline;';

  // eslint-disable-next-line no-console
  console.log(
    '%c szk %c  hand-built, hand-written.\n%cFound the source? Nice. Pull threads, peek at the seams.\n%cSay hi → /contact',
    title,
    sub,
    body,
    link,
  );
}
