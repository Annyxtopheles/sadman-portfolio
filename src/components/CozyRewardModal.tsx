import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExploration } from '@/context/ExplorationContext';

interface ArchiveArtifact {
  image: string;
  title: string;
  note: string;
  tag: string;
}

const ARCHIVE_ARTIFACTS: ArchiveArtifact[] = [
  {
    image: '/assets/projects/collabai-mockup.webp',
    title: 'Collab RT Spatial Interaction Loops',
    note: 'Multi-agent coordination architecture: structuring real-time spatial canvases where AI personas and human designers co-author concurrently.',
    tag: 'AI Systems',
  },
  {
    image: '/assets/projects/buildyourai/byai-yt-automate-business-ops-control-tower.webp',
    title: 'AI Control Tower Operational Suite',
    note: 'Designing autonomous business telemetry: transforming distributed multi-agent operations into actionable high-level control feeds.',
    tag: 'Enterprise Architecture',
  },
  {
    image: '/assets/projects/buildyourai/byai-nsa-cisa-01-cover.webp',
    title: 'NSA/CISA Security Guidelines Editorial',
    note: 'Coordinated with sales & security engineers to translate federal compliance documentation into high-retention technical visual frameworks.',
    tag: 'Technical Systems',
  },
  {
    image: '/assets/projects/clandest-mockup.webp',
    title: 'Clandest Luxury Spatial Identity',
    note: 'Explorations in high-end typographic restraint, subtle lighting physics, and asymmetric rhythm for modern web storytelling.',
    tag: 'Brand Systems',
  },
  {
    image: '/assets/rewards/cozy-desk-04.webp',
    title: 'Studio Workspace & Prototyping Lab',
    note: 'Where concept wireframes meet code: validating interaction micro-physics, bezier easing curves, and design systems.',
    tag: 'Field Notes',
  },
];

export const CozyRewardModal: React.FC = () => {
  const { isRewardOpen, setIsRewardOpen } = useExploration();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isRewardOpen) return null;

  const currentItem = ARCHIVE_ARTIFACTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ARCHIVE_ARTIFACTS.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark tinted glass backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsRewardOpen(false)}
          className="fixed inset-0 bg-[#000000]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-[4px] border border-[#222222] bg-[#0A0A0A] p-6 sm:p-7 shadow-2xl text-[#FFFFFF] space-y-5 overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#1A1A1A] pb-3.5 relative z-10">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-normal tracking-tight text-[#FFFFFF]">
                Process Archive Vault
              </h3>
              <p className="text-[11px] text-[#777777] font-mono uppercase tracking-wider">
                Unfiltered behind-the-scenes field notes
              </p>
            </div>
            <button
              onClick={() => setIsRewardOpen(false)}
              className="p-1 rounded-[3px] text-[#777777] hover:text-[#FFFFFF] hover:bg-[#141414] transition-colors"
              aria-label="Close archive modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Interactive Field Note Card */}
          <div className="relative rounded-[4px] border border-[#1F1F1F] bg-[#0E0E0E] p-3 space-y-3 overflow-hidden group">
            <div className="relative aspect-[16/10] w-full rounded-[2px] overflow-hidden bg-[#050505]">
              <motion.img
                key={currentItem.image}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-[2px] text-[10px] font-mono tracking-wider uppercase bg-[#000000]/80 text-[#CCCCCC] backdrop-blur-sm border border-[#2A2A2A]">
                {currentItem.tag}
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-[2px] text-[10px] font-mono tracking-wider bg-[#000000]/80 text-[#888888] backdrop-blur-sm border border-[#222222]">
                {currentIndex + 1} / {ARCHIVE_ARTIFACTS.length}
              </div>
            </div>

            <div className="space-y-1 px-0.5">
              <div className="text-sm font-normal text-[#FFFFFF]">{currentItem.title}</div>
              <div className="text-xs text-[#888888] leading-relaxed font-normal">{currentItem.note}</div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-2 px-3 rounded-[3px] bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] text-xs text-[#CCCCCC] hover:text-[#FFFFFF] transition-all flex items-center justify-center gap-2 cursor-pointer font-normal"
            >
              <span>Next Field Note</span>
              <span className="text-[#888888]">→</span>
            </button>
          </div>

          {/* Action Buttons styled consistently with the portfolio design system */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <a
              href="https://wa.me/8801869504388?text=Hi%20Sadman,%20I%20just%20explored%20your%20full%20portfolio%20and%20wanted%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-[4px] bg-[#FFFFFF] hover:bg-[#E5E5E5] text-[#000000] text-xs font-normal uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer no-underline select-none"
            >
              <span>Message me on WhatsApp</span>
              <span aria-hidden="true" className="text-xs">↗</span>
            </a>
            <button
              onClick={() => setIsRewardOpen(false)}
              className="py-2.5 px-4 rounded-[4px] bg-[#0A0A0A] hover:bg-[#141414] border border-[#222222] hover:border-[#383838] text-[#888888] hover:text-[#FFFFFF] text-xs font-normal uppercase tracking-wider transition-colors cursor-pointer select-none"
            >
              Close &amp; Keep Exploring
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
