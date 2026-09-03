import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  let clientX = 0,
    clientY = 0;
  if ('touches' in e && e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  DOM: { el: HTMLElement; inner: HTMLElement | null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect: DOMRect | null = null;
  resize: () => void;

  constructor(DOM_el: HTMLElement) {
    this.DOM = {
      el: DOM_el,
      inner: DOM_el.querySelector('.content__img-inner')
    };
    this.getRect();
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    this.initEvents();
  }
  initEvents() {
    window.addEventListener('resize', this.resize);
  }
  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }
  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}

class ImageTrailVariant1 {
  container: HTMLElement;
  rafId: number | null = null;
  destroyed = false;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 60;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  handlePointerMove: (ev: MouseEvent | TouchEvent) => void;
  initRender: (ev: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...this.DOM.el.querySelectorAll('.content__img')].map(
      img => new ImageItem(img as HTMLElement)
    );
    this.imagesTotal = this.images.length;

    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove as EventListener);
    container.addEventListener('touchmove', handlePointerMove as EventListener);

    const initRender = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.rafId = requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender as EventListener);
      container.removeEventListener('touchmove', initRender as EventListener);
    };
    container.addEventListener('mousemove', initRender as EventListener);
    container.addEventListener('touchmove', initRender as EventListener);
    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
  }

  render() {
    if (this.destroyed) return;

    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

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
    if (!img || !img.rect) return;

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0,
          scale: 0.2
        },
        0.4
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
    this.container.removeEventListener('mousemove', this.initRender as EventListener);
    this.container.removeEventListener('touchmove', this.initRender as EventListener);
    this.images.forEach(img => {
      gsap.killTweensOf(img.DOM.el);
      img.destroy();
    });
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }
}

class ImageTrailVariant2 {
  container: HTMLElement;
  rafId: number | null = null;
  destroyed = false;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 60;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  handlePointerMove: (ev: MouseEvent | TouchEvent) => void;
  initRender: (ev: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(
      img => new ImageItem(img as HTMLElement)
    );
    this.imagesTotal = this.images.length;

    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove as EventListener);
    container.addEventListener('touchmove', handlePointerMove as EventListener);

    const initRender = (ev: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.rafId = requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender as EventListener);
      container.removeEventListener('touchmove', initRender as EventListener);
    };
    container.addEventListener('mousemove', initRender as EventListener);
    container.addEventListener('touchmove', initRender as EventListener);
    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
  }

  render() {
    if (this.destroyed) return;

    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

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
    if (!img || !img.rect) return;

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2.8,
          filter: 'brightness(250%)'
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%)'
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          scale: 0.2
        },
        0.45
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
    this.container.removeEventListener('mousemove', this.initRender as EventListener);
    this.container.removeEventListener('touchmove', this.initRender as EventListener);
    this.images.forEach(img => {
      gsap.killTweensOf(img.DOM.el);
      img.destroy();
    });
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

function getNewPosition(position: number, offset: number, arr: unknown[]) {
  const realOffset = Math.abs(offset) % arr.length;
  if (position - realOffset >= 0) {
    return position - realOffset;
  } else {
    return arr.length - (realOffset - position);
  }
}

class ImageTrailVariant7 {
  container: HTMLElement;
  rafId: number | null = null;
  destroyed = false;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 60;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };
  visibleImagesCount = 0;
  visibleImagesTotal = 6;
  handlePointerMove: (ev: MouseEvent | TouchEvent) => void;
  initRender: (ev: MouseEvent | TouchEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(
      img => new ImageItem(img as HTMLElement)
    );
    this.imagesTotal = this.images.length;
    this.visibleImagesTotal = Math.min(this.visibleImagesTotal, Math.max(1, this.imagesTotal - 1));

    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove as EventListener);
    container.addEventListener('touchmove', handlePointerMove as EventListener);

    const initRender = (ev: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.rafId = requestAnimationFrame(() => this.render());
      container.removeEventListener('mousemove', initRender as EventListener);
      container.removeEventListener('touchmove', initRender as EventListener);
    };
    container.addEventListener('mousemove', initRender as EventListener);
    container.addEventListener('touchmove', initRender as EventListener);
    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
  }

  render() {
    if (this.destroyed) return;

    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;

    this.rafId = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (this.imagesTotal === 0) return;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    if (!img || !img.rect) return;
    ++this.visibleImagesCount;

    gsap.killTweensOf(img.DOM.el);
    const scaleValue = gsap.utils.random(0.8, 1.2);

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          scale: scaleValue - Math.max(gsap.utils.random(0.1, 0.3), 0),
          rotationZ: 0,
          opacity: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power3',
          scale: scaleValue,
          rotationZ: gsap.utils.random(-3, 3),
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      );

    if (this.visibleImagesCount >= this.visibleImagesTotal) {
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);
      const oldImg = this.images[lastInQueue];
      if (oldImg) {
        gsap.to(oldImg.DOM.el, {
          duration: 0.4,
          ease: 'power4',
          opacity: 0,
          scale: 1.2,
          onComplete: () => {
            if (this.activeImagesCount === 0) {
              this.isIdle = true;
            }
          }
        });
      }
    }
  }

  destroy() {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.container.removeEventListener('mousemove', this.handlePointerMove as EventListener);
    this.container.removeEventListener('touchmove', this.handlePointerMove as EventListener);
    this.container.removeEventListener('mousemove', this.initRender as EventListener);
    this.container.removeEventListener('touchmove', this.initRender as EventListener);
    this.images.forEach(img => {
      gsap.killTweensOf(img.DOM.el);
      img.destroy();
    });
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
  }
}

// Map available variants
const variantMap: Record<
  number,
  new (el: HTMLElement) => {
    destroy: () => void;
  }
> = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2,
  7: ImageTrailVariant7
};

interface ImageTrailProps {
  items?: string[];
  variant?: number;
  className?: string;
  children?: React.ReactNode;
}

export const ImageTrail: React.FC<ImageTrailProps> = ({
  items = [],
  variant = 1,
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const Cls = variantMap[variant] || variantMap[1];
    const instance = new Cls(containerRef.current);

    return () => {
      instance.destroy();
    };
  }, [variant, items]);

  return (
    <div className={`content ${className}`} ref={containerRef}>
      {children}
      {items.map((url, i) => (
        <div className="content__img" key={i}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
};

export default ImageTrail;
