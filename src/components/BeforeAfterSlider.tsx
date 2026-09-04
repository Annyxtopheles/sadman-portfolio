import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Design',
  afterLabel = 'Redesign',
  caption,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    calculatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsDragging(true);
      calculatePosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      calculatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      calculatePosition(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, calculatePosition]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1F1F1F] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono text-[#888888]">
              Design Evolution
            </span>
            <span className="text-[#444444]">·</span>
            <span className="text-xs text-[#CCCCCC] font-normal">
              Before &amp; After Comparison
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#FFFFFF] tracking-tight">
            Original Design vs. Redesign
          </h2>
        </div>

        {/* Quick View Presets */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto pt-1 sm:pt-0">
          <button
            type="button"
            onClick={() => setSliderPosition(100)}
            className={`px-2.5 py-1 rounded-[3px] text-[11px] font-mono transition-colors cursor-pointer border ${
              sliderPosition === 100
                ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                : 'bg-[#141414] text-[#888888] border-[#262626] hover:text-[#FFFFFF]'
            }`}
          >
            Before Only
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-2.5 py-1 rounded-[3px] text-[11px] font-mono transition-colors cursor-pointer border ${
              sliderPosition === 50
                ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                : 'bg-[#141414] text-[#888888] border-[#262626] hover:text-[#FFFFFF]'
            }`}
          >
            50 / 50
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(0)}
            className={`px-2.5 py-1 rounded-[3px] text-[11px] font-mono transition-colors cursor-pointer border ${
              sliderPosition === 0
                ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                : 'bg-[#141414] text-[#888888] border-[#262626] hover:text-[#FFFFFF]'
            }`}
          >
            After Only
          </button>
        </div>
      </div>

      {/* Main Interactive Comparison Stage */}
      <div className="rounded-[4px] border border-[#1F1F1F] bg-[#0A0A0A] p-2 sm:p-3 hover:border-[#333333] transition-colors">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after comparison slider"
          className="relative w-full aspect-[16/10] overflow-hidden rounded-[2px] bg-[#000000] select-none cursor-ew-resize focus:outline-none focus:ring-1 focus:ring-white/40"
        >
          {/* Base Layer: Redesign (After) Image */}
          <img
            src={afterImage}
            alt={afterLabel}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
          />

          {/* Clipped Top Layer: Original Design (Before) Image */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
            />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 pointer-events-none z-20">
            <span className="px-2.5 py-1 rounded-[3px] text-[10px] font-mono uppercase tracking-wider bg-[#000000]/85 text-[#CCCCCC] border border-[#2E2E2E] backdrop-blur-sm shadow-md">
              {beforeLabel}
            </span>
          </div>
          <div className="absolute top-3 right-3 pointer-events-none z-20">
            <span className="px-2.5 py-1 rounded-[3px] text-[10px] font-mono uppercase tracking-wider bg-[#000000]/85 text-[#FFFFFF] border border-[#3E3E3E] backdrop-blur-sm shadow-md">
              {afterLabel}
            </span>
          </div>

          {/* Interactive Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-30 flex items-center justify-center -translate-x-1/2"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Vertical White Line */}
            <div className="w-[2px] h-full bg-[#FFFFFF] shadow-[0_0_10px_rgba(255,255,255,0.7)]" />

            {/* Handle Thumb */}
            <div className="absolute w-8 h-8 rounded-full bg-[#000000] border-2 border-[#FFFFFF] shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center justify-center text-[#FFFFFF] text-[10px] font-mono select-none">
              <span>⟨|⟩</span>
            </div>
          </div>
        </div>

        {/* Caption & Instruction Row */}
        <div className="px-2 pt-2.5 pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-[#888888] font-normal">
          <div>
            {caption || 'Drag the slider or click anywhere to compare the legacy interface with the redesign.'}
          </div>
          <div className="text-[11px] text-[#666666] font-mono shrink-0">
            {Math.round(sliderPosition)}% Original / {Math.round(100 - sliderPosition)}% Redesign
          </div>
        </div>
      </div>
    </section>
  );
};
