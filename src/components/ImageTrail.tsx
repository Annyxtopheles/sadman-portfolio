import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  let clientX = 0;
  let clientY = 0;
  if ('touches' in e && e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  el: HTMLElement;
  inner: HTMLElement | null;
  rect: { width: number; height: number } = { width: 200, height: 130 };

  constructor(DOM_el: HTMLElement) {
    this.el = DOM_el;
    this.inner = DOM_el.querySelector('.content__img-inner');
    this.getRect();
  }

  getRect() {
    const r = this.el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      this.rect = { width: r.width, height: r.height };
    }
  }
}

class ImageTrailEngine {
  container: HTMLElement;
  rafId: number | null = null;
  destroyed = false;
  images: ImageItem[] = [];
  imagesTotal = 0;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 35; // Lower threshold so trails spawn smoothly with gentle mouse movement
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  handlePointerMove: (ev: MouseEvent | TouchEvent) => void;
  handlePointerEnter: (ev: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.images = Array.from(container.querySelectorAll('.content__img')).map(
      (img) => new ImageItem(img as HTMLElement)
    );
    this.imagesTotal = this.images.length;

    this.handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };

    this.handlePointerEnter = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.lastMousePos = { ...this.mousePos };
      if (!this.rafId) {
        this.rafId = requestAnimationFrame(() => this.render());
      }
    };

    container.addEventListener('mousemove', this.handlePointerMove as EventListener, { passive: true });
    container.addEventListener('touchmove', this.handlePointerMove as EventListener, { passive: true });
    container.addEventListener('mouseenter', this.handlePointerEnter as EventListener, { passive: true });
    container.addEventListener('touchstart', this.handlePointerEnter as EventListener, { passive: true });

    // Initial loop
    this.rafId = requestAnimationFrame(() => this.render());
  }

  render() {
    if (this.destroyed) return;

    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.15);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.15);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }

    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }

    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (this.imagesTotal === 0) return;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    if (!img) return;

    const w = img.rect.width || 200;
    const h = img.rect.height || 130;

    this.activeImagesCount++;
    this.isIdle = false;

    gsap.killTweensOf(img.el);
    gsap
      .timeline({
        onComplete: () => {
          this.activeImagesCount--;
          if (this.activeImagesCount === 0) {
            this.isIdle = true;
          }
        },
      })
      .fromTo(
        img.el,
        {
          opacity: 1,
          scale: 0.75,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - w / 2,
          y: this.cacheMousePos.y - h / 2,
          rotationZ: gsap.utils.random(-4, 4),
        },
        {
          duration: 0.35,
          ease: 'power1.out',
          scale: 1,
          x: this.mousePos.x - w / 2,
          y: this.mousePos.y - h / 2,
        },
        0
      )
      .to(
        img.el,
        {
          duration: 0.45,
          ease: 'power2.in',
          opacity: 0,
          scale: 0.3,
        },
        0.35
      );
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.container.removeEventListener('mousemove', this.handlePointerMove as EventListener);
    this.container.removeEventListener('touchmove', this.handlePointerMove as EventListener);
    this.container.removeEventListener('mouseenter', this.handlePointerEnter as EventListener);
    this.container.removeEventListener('touchstart', this.handlePointerEnter as EventListener);
    this.images.forEach((img) => {
      gsap.killTweensOf(img.el);
    });
  }
}

interface ImageTrailProps {
  items?: string[];
  className?: string;
  children?: React.ReactNode;
}

export const ImageTrail: React.FC<ImageTrailProps> = ({
  items = [],
  className = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const engine = new ImageTrailEngine(containerRef.current);

    return () => {
      engine.destroy();
    };
  }, [items]);

  return (
    <div className={`image-trail-wrapper ${className}`} ref={containerRef}>
      {children}
      {items.map((url, i) => (
        <div className="content__img" key={i}>
          <div
            className="content__img-inner"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageTrail;
