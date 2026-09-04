import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ArtifactImage {
  url: string;
  caption: string;
  tag?: string;
}

interface ArtifactCollageProps {
  images: ArtifactImage[];
  title?: string;
}

export const ArtifactCollage: React.FC<ArtifactCollageProps> = ({
  images,
  title = 'Artifacts & Context',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const activeItem = hoveredIndex !== null ? images[hoveredIndex] : null;

  return (
    <div className="relative space-y-2.5">
      {/* Small Header */}
      <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666] px-1 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-[10px] text-[#555555]">
          {images.length} {images.length === 1 ? 'preview' : 'previews'} · hover to expand
        </span>
      </div>

      {/* Collage of Small Previews */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {images.map((img, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative rounded-[4px] border p-1.5 transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? 'border-[#555555] bg-[#141414] shadow-md'
                    : 'border-[#1F1F1F] bg-[#0A0A0A] hover:border-[#383838] hover:bg-[#111111]'
                }`}
              >
                {/* Thumbnail Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-[2px] overflow-hidden bg-[#161616]">
                  <img
                    src={img.url}
                    alt={img.caption}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Tiny Label */}
                <div className="pt-1.5 px-0.5 flex items-center justify-between">
                  <span className="text-[10px] font-normal text-[#777777] group-hover:text-[#CCCCCC] truncate transition-colors">
                    {img.caption.split('—')[0]?.trim() || img.caption}
                  </span>
                  <span className="text-[10px] text-[#555555] group-hover:text-[#AAAAAA] shrink-0 font-mono transition-colors">
                    ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Pop-Up Preview (Identical GSAP ImageTrail animation physics) */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.75,
                rotate: -2,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.82,
                rotate: 1,
                y: 6,
              }}
              transition={{
                duration: 0.32,
                ease: [0.16, 1, 0.3, 1], // Equivalent to power1.out with slight spring cushion
              }}
              className="absolute -top-4 -left-2 -right-2 sm:-top-8 sm:-left-6 sm:-right-6 z-50 pointer-events-none rounded-[6px] border border-[#333333] bg-[#0A0A0A]/95 p-3 shadow-[0_30px_70px_rgba(0,0,0,0.95)] backdrop-blur-md space-y-2.5"
            >
              {/* High-res Image Preview */}
              <div className="relative aspect-[16/10] w-full rounded-[4px] overflow-hidden bg-[#141414] border border-[#262626]">
                <img
                  src={activeItem.url}
                  alt={activeItem.caption}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Caption & Context Details */}
              <div className="px-1 space-y-0.5">
                <div className="text-xs text-[#FFFFFF] font-normal leading-relaxed">
                  {activeItem.caption}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
