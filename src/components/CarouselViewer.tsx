import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GalleryImage } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';

export interface CarouselViewerProps {
  slides: GalleryImage[];
  title?: string;
  documentUrl?: string;
  documentTitle?: string;
  onOpenLightbox?: (src: string, caption: string) => void;
  className?: string;
}

export const CarouselViewer: React.FC<CarouselViewerProps> = ({
  slides,
  title,
  documentUrl,
  documentTitle,
  onOpenLightbox,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);

  const total = slides.length;
  const currentSlide = slides[currentIndex];

  const goToSlide = useCallback((newIndex: number, dir: number) => {
    if (newIndex < 0 || newIndex >= total) return;
    setDirection(dir);
    setCurrentIndex(newIndex);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, -1);
    }
  }, [currentIndex, goToSlide]);

  const handleNext = useCallback(() => {
    if (currentIndex < total - 1) {
      goToSlide(currentIndex + 1, 1);
    }
  }, [currentIndex, total, goToSlide]);

  // Keyboard navigation when focused or fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, isFullscreen]);

  // Lock body scroll when fullscreen is active
  useEffect(() => {
    if (!isFullscreen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isFullscreen]);

  if (!slides || slides.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 32 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const viewerContent = (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={title || 'Social Media Carousel'}
      className={`relative w-full rounded-[6px] border border-[#222222] bg-[#0A0A0A] overflow-hidden flex flex-col shadow-2xl select-none focus:outline-none focus:border-[#444444] transition-colors ${
        isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-none max-w-none h-screen p-4 sm:p-6 bg-black/98' : ''
      }`}
    >
      {/* LinkedIn Document Top Bar */}
      <div className="px-3.5 sm:px-4 py-2.5 border-b border-[#1A1A1A] bg-[#0E0E0E] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="px-1.5 py-0.5 rounded-[3px] bg-[#1F1F1F] text-[#AAAAAA] text-[10px] font-mono tracking-wider uppercase border border-[#2A2A2A] shrink-0">
            {documentUrl ? 'PDF / Carousel' : 'Carousel'}
          </span>
          <span className="text-[#DDDDDD] font-medium truncate text-xs sm:text-sm">
            {title || documentTitle || 'Interactive Carousel'}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Slide counter */}
          <span className="text-[#888888] font-mono text-[11px] sm:text-xs px-2 py-0.5 rounded-[3px] bg-[#141414] border border-[#222222]">
            {currentIndex + 1} / {total}
          </span>

          {/* Optional PDF Download Button */}
          {documentUrl && (
            <a
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Download full vector document PDF"
              className="px-2.5 py-1 rounded-[3px] bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#E5E5E5] border border-[#2E2E2E] hover:border-[#444444] transition-colors text-[11px] font-mono inline-flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">PDF</span>
            </a>
          )}

          {/* Fullscreen toggle button */}
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen (esc)' : 'Fullscreen'}
            className="p-1 sm:p-1.5 rounded-[3px] text-[#888888] hover:text-[#FFFFFF] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
          >
            {isFullscreen ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Slide Viewer Canvas */}
      <div className={`relative w-full flex-1 bg-[#050505] flex items-center justify-center overflow-hidden ${
        isFullscreen ? 'h-[calc(100vh-140px)]' : 'aspect-[4/5] sm:max-h-[720px]'
      }`}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={() => {
              isDraggingRef.current = true;
              dragDistanceRef.current = 0;
            }}
            onDrag={(_, info) => {
              dragDistanceRef.current = Math.abs(info.offset.x);
            }}
            onDragEnd={(_, info) => {
              setTimeout(() => {
                isDraggingRef.current = false;
                dragDistanceRef.current = 0;
              }, 120);

              const swipeThreshold = 35;
              const velocityThreshold = 200;

              if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                handleNext();
              } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                handlePrev();
              }
            }}
            className="w-full h-full flex items-center justify-center p-2 sm:p-4 cursor-grab active:cursor-grabbing touch-pan-y select-none"
          >
            <img
              src={currentSlide.url}
              alt={currentSlide.caption || `Slide ${currentIndex + 1}`}
              draggable={false}
              onClick={(e) => {
                if (isDraggingRef.current || dragDistanceRef.current > 10) {
                  e.preventDefault();
                  return;
                }
                onOpenLightbox && onOpenLightbox(currentSlide.url, currentSlide.caption);
              }}
              className="max-h-full max-w-full object-contain rounded-[4px] shadow-2xl cursor-zoom-in hover:brightness-105 transition-all select-none pointer-events-auto"
            />
          </motion.div>
        </AnimatePresence>

        {/* Previous Arrow Button */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 hover:border-white/40 shadow-xl flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm group z-20"
          >
            <svg className="w-5 h-5 -translate-x-0.5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Arrow Button */}
        {currentIndex < total - 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 hover:border-white/40 shadow-xl flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm group z-20"
          >
            <svg className="w-5 h-5 translate-x-0.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Dots / Bar & Slide Caption */}
      <div className="px-4 py-3 bg-[#0B0B0B] border-t border-[#181818] flex flex-col gap-2.5">
        {/* Caption */}
        <div className="flex items-center justify-between text-xs text-[#999999] leading-snug">
          <span className="truncate pr-4 font-normal text-[#CCCCCC]">
            {currentSlide.caption}
          </span>
          <span className="font-mono text-[11px] text-[#666666] shrink-0">
            Slide {currentIndex + 1} of {total}
          </span>
        </div>

        {/* LinkedIn-style Progress Bar Segments */}
        <div className="flex items-center gap-1.5 w-full">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
              aria-label={`Jump to slide ${idx + 1}`}
              className={`h-1 flex-1 rounded-full transition-all duration-200 cursor-pointer ${
                idx === currentIndex
                  ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : idx < currentIndex
                  ? 'bg-[#555555] hover:bg-[#777777]'
                  : 'bg-[#222222] hover:bg-[#333333]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {viewerContent}
    </div>
  );
};
