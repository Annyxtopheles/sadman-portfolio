import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExploration } from '@/context/ExplorationContext';
import { REWARD_WEBSITES, getRandomWebsite } from '@/data/rewardWebsites';

export const CozyRewardModal: React.FC = () => {
  const { isRewardOpen, setIsRewardOpen } = useExploration();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [justRolled, setJustRolled] = useState(false);

  if (!isRewardOpen) return null;

  const currentSite = REWARD_WEBSITES[currentIndex] || REWARD_WEBSITES[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REWARD_WEBSITES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REWARD_WEBSITES.length) % REWARD_WEBSITES.length);
  };

  const handleRandomRoll = () => {
    const randomPick = getRandomWebsite(currentSite.id);
    const newIndex = REWARD_WEBSITES.findIndex((s) => s.id === randomPick.id);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
    setJustRolled(true);
    setTimeout(() => setJustRolled(false), 400);
  };

  const handleVisitRandom = () => {
    const randomPick = getRandomWebsite();
    const newIndex = REWARD_WEBSITES.findIndex((s) => s.id === randomPick.id);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
    window.open(randomPick.url, '_blank', 'noopener,noreferrer');
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
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-[6px] border border-[#222222] bg-[#0A0A0A] p-6 sm:p-7 shadow-2xl text-[#FFFFFF] space-y-5 overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#1A1A1A] pb-3.5 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#888888] font-mono">
                  Exploration Reward
                </span>
                <span className="text-[#444444]">·</span>
                <span className="text-xs text-[#FFFFFF] font-mono">
                  {REWARD_WEBSITES.length} Curated Gems
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-normal tracking-tight text-[#FFFFFF]">
                Awesome Web Vault
              </h3>
              <p className="text-xs text-[#777777] font-normal leading-relaxed">
                You’ve explored every corner of the portfolio. Enjoy these fun, fascinating corners of the internet.
              </p>
            </div>
            <button
              onClick={() => setIsRewardOpen(false)}
              className="p-1 rounded-[3px] text-[#777777] hover:text-[#FFFFFF] hover:bg-[#141414] transition-colors"
              aria-label="Close reward modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Primary Action: Random Website Portal Button */}
          <div>
            <button
              type="button"
              onClick={handleVisitRandom}
              className="w-full py-3 px-4 rounded-[4px] bg-[#FFFFFF] hover:bg-[#E5E5E5] text-[#000000] text-xs font-normal uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>🎲 Surprise Me — Visit a Random Website</span>
              <span aria-hidden="true" className="text-sm">↗</span>
            </button>
          </div>

          {/* Curated Website Showcase Card */}
          <div className="relative rounded-[4px] border border-[#1F1F1F] bg-[#0E0E0E] p-4 space-y-3.5 overflow-hidden">
            {/* Top Row: Tag & Index */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono tracking-wider uppercase bg-[#141414] text-[#CCCCCC] border border-[#262626]">
                {currentSite.tag}
              </span>
              <span className="text-[11px] font-mono text-[#666666]">
                {currentIndex + 1} of {REWARD_WEBSITES.length}
              </span>
            </div>

            {/* Site Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSite.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="space-y-1.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-base font-normal text-[#FFFFFF] tracking-tight">
                    {currentSite.title}
                  </h4>
                  <span className="text-xs text-[#666666] font-mono truncate max-w-[200px]">
                    {currentSite.url.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
                  </span>
                </div>
                <p className="text-xs text-[#888888] font-normal leading-relaxed">
                  {currentSite.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Actions Row */}
            <div className="pt-1 grid grid-cols-2 gap-2">
              <a
                href={currentSite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-[3px] bg-[#161616] hover:bg-[#202020] border border-[#262626] text-xs text-[#FFFFFF] font-normal transition-colors flex items-center justify-center gap-1.5 cursor-pointer no-underline"
              >
                <span>Visit Site</span>
                <span className="text-xs">↗</span>
              </a>

              <button
                type="button"
                onClick={handleRandomRoll}
                className={`py-2 px-3 rounded-[3px] bg-[#121212] hover:bg-[#1A1A1A] border border-[#262626] text-xs text-[#CCCCCC] hover:text-[#FFFFFF] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  justRolled ? 'scale-95' : ''
                }`}
              >
                <span>🎲 Shuffle</span>
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-1 border-t border-[#181818] text-[11px] text-[#666666]">
              <button
                type="button"
                onClick={handlePrev}
                className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
              >
                ← Previous
              </button>
              <span className="font-mono text-[10px]">
                Browse all {REWARD_WEBSITES.length} websites
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-1 text-xs text-[#666666]">
            <span className="font-mono text-[11px]">
              Tip: Press &quot;Surprise Me&quot; anytime
            </span>
            <button
              onClick={() => setIsRewardOpen(false)}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer font-normal underline"
            >
              Close &amp; Keep Exploring
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
