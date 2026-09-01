import React, { useCallback, useEffect, useRef } from 'react';

export type GalleryPhoto = {
  id: string;
  url: string | null;
  caption: string | null;
  focal_position?: string;
};

type Props = {
  photos: GalleryPhoto[];
  focalOf: (p: GalleryPhoto) => string;
  onOpen: (index: number) => void;
};

const SPEED = 0.5; // px per frame
const MAX_SCALE = 0.2; // centre item is 120%

/**
 * Continuous marquee-style gallery.
 * - Always auto-scrolls; drag flips the travel direction.
 * - Infinite loop (three copies of the list, wraps in the middle).
 * - Centre item scales up to 120%, with extra breathing room reserved so
 *   neighbours never collide with it.
 * - Soft blurred fade on both edges instead of hard cuts.
 */
export const GalleryCarousel: React.FC<Props> = ({ photos, focalOf, onOpen }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const s = useRef({
    dir: 1,
    down: false,
    dragging: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    setWidth: 0,
    raf: 0,
  });

  const loop = photos.length ? [...photos, ...photos, ...photos] : [];

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    s.current.setWidth = track.scrollWidth / 3;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !photos.length) return;
    measure();
    let pos = s.current.setWidth;
    el.scrollLeft = pos;

    const tick = () => {
      const st = s.current;
      const node = scrollerRef.current;
      if (node) {
        measure();
        if (st.dragging) {
          pos = node.scrollLeft;
        } else if (st.setWidth > 0) {
          pos += SPEED * st.dir;
        }
        if (st.setWidth > 0) {
          if (pos >= st.setWidth * 2) pos -= st.setWidth;
          else if (pos <= 0) pos += st.setWidth;
          node.scrollLeft = pos;
        }

        // centre emphasis
        const rect = node.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        itemsRef.current.forEach((it) => {
          if (!it) return;
          const r = it.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - cx);
          const t = Math.max(0, 1 - d / (r.width * 1.6));
          const eased = t * t * (3 - 2 * t); // smoothstep
          const inner = it.firstElementChild as HTMLElement | null;
          if (inner) {
            inner.style.transform = `scale(${(1 + MAX_SCALE * eased).toFixed(3)})`;
            inner.style.filter = `saturate(${(0.75 + 0.25 * eased).toFixed(2)})`;
          }
          it.style.zIndex = eased > 0.5 ? '10' : '1';
        });
      }
      st.raf = requestAnimationFrame(tick);
    };
    s.current.raf = requestAnimationFrame(tick);

    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(s.current.raf);
      window.removeEventListener('resize', onResize);
    };
  }, [photos.length, measure]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    const st = s.current;
    st.down = true;
    st.dragging = false;
    st.startX = e.clientX;
    st.lastX = e.clientX;
    st.startScroll = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    const st = s.current;
    if (!el || !st.down) return;
    const dx = e.clientX - st.startX;
    if (!st.dragging && Math.abs(dx) > 4) {
      st.dragging = true;
      el.setPointerCapture?.(e.pointerId);
    }
    if (!st.dragging) return;
    el.scrollLeft = st.startScroll - dx;
    const move = e.clientX - st.lastX;
    if (Math.abs(move) > 1) st.dir = move > 0 ? -1 : 1;
    st.lastX = e.clientX;
  };

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    const st = s.current;
    const el = scrollerRef.current;
    if (!st.down) return;
    st.down = false;
    if (el && e && st.dragging) {
      try { el.releasePointerCapture?.(e.pointerId); } catch { /* noop */ }
    }
    // keep the flag for a tick so the click handler can suppress the click
    window.setTimeout(() => { s.current.dragging = false; }, 0);
  };

  if (!photos.length) return null;

  const fade = 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 4%, #000 14%, #000 86%, rgba(0,0,0,0.35) 96%, transparent 100%)';

  return (
    <div className="relative -mx-4 md:-mx-8">
      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto overflow-y-hidden px-4 md:px-8 py-10 cursor-grab active:cursor-grabbing select-none"
        style={{
          touchAction: 'pan-y',
          maskImage: fade,
          WebkitMaskImage: fade,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div ref={trackRef} className="flex gap-12 md:gap-16 w-max items-center">
          {loop.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="shrink-0 relative"
            >
              <div className="transition-transform duration-200 ease-out will-change-transform">
                <button
                  type="button"
                  onClick={() => { if (!s.current.dragging) onOpen(i % photos.length); }}
                  aria-label={p.caption ?? `Open photo ${(i % photos.length) + 1}`}
                  className="group relative block w-[200px] md:w-[240px] aspect-[4/5] overflow-hidden rounded-lg bg-muted shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-foreground"
                >
                  {p.url && (
                    <img
                      src={p.url}
                      alt={p.caption ?? ''}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover block"
                      style={{ objectPosition: focalOf(p) }}
                    />
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {p.caption && (
                      <span className="block text-left text-[12px] leading-snug text-white">{p.caption}</span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
