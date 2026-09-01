import React, { useCallback, useEffect, useRef } from 'react';

/**
 * Horizontal drag/swipe scroller with momentum + snap.
 * - Desktop: pointer drag (grab / grabbing cursor)
 * - Mobile: native touch scrolling
 * - Suppresses click events when the pointer actually moved
 */
export const DragScroller: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({
    down: false,
    dragging: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    raf: 0,
  });

  const stopMomentum = useCallback(() => {
    if (state.current.raf) cancelAnimationFrame(state.current.raf);
    state.current.raf = 0;
  }, []);

  const momentum = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const s = state.current;
    s.velocity *= 0.95;
    el.scrollLeft -= s.velocity * 16;
    if (Math.abs(s.velocity) > 0.02) {
      s.raf = requestAnimationFrame(momentum);
    } else {
      s.raf = 0;
      el.style.scrollSnapType = 'x mandatory';
    }
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return; // let native touch scrolling handle it
    const el = ref.current;
    if (!el) return;
    stopMomentum();
    const s = state.current;
    s.down = true;
    s.dragging = false;
    s.startX = e.clientX;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.velocity = 0;
    s.startScroll = el.scrollLeft;
    el.style.scrollSnapType = 'none';
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    const s = state.current;
    if (!el || !s.down) return;
    const dx = e.clientX - s.startX;
    if (!s.dragging && Math.abs(dx) > 4) {
      s.dragging = true;
      el.setPointerCapture?.(e.pointerId);
    }
    if (!s.dragging) return;
    e.preventDefault();
    el.scrollLeft = s.startScroll - dx;
    const now = performance.now();
    const dt = now - s.lastT;
    if (dt > 0) s.velocity = (e.clientX - s.lastX) / dt;
    s.lastX = e.clientX;
    s.lastT = now;
  };

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    const s = state.current;
    if (!el || !s.down) return;
    s.down = false;
    if (e && s.dragging) {
      try {
        el.releasePointerCapture?.(e.pointerId);
      } catch {
        /* noop */
      }
    }
    if (s.dragging && Math.abs(s.velocity) > 0.02) {
      s.raf = requestAnimationFrame(momentum);
    } else {
      el.style.scrollSnapType = 'x mandatory';
    }
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.current.dragging) {
      e.preventDefault();
      e.stopPropagation();
      state.current.dragging = false;
    }
  };

  useEffect(() => stopMomentum, [stopMomentum]);

  return (
    <div
      ref={ref}
      {...rest}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
      className={`no-scrollbar overflow-x-auto cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
    >
      {children}
    </div>
  );
};
