import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExploration } from '@/context/ExplorationContext';

interface CozyItem {
  image: string;
  title: string;
  note: string;
  tag: string;
}

const COZY_ITEMS: CozyItem[] = [
  {
    image: '/assets/rewards/cozy-cat-01.webp',
    title: 'The Silent Code Reviewer',
    note: 'Curled up and making sure no extraneous margins slip into production.',
    tag: 'Feline QA Lead',
  },
  {
    image: '/assets/rewards/cozy-coffee-03.webp',
    title: 'Fresh Pour-Over & Quiet Room',
    note: 'Freshly ground Ethiopian beans, 93°C water, and 45 minutes of uninterrupted flow state.',
    tag: 'Fuel for Craft',
  },
  {
    image: '/assets/rewards/cozy-cat-02.webp',
    title: 'Maximum Comfort Protocol',
    note: 'When the layout is responsive and the typography finally aligns on the baseline grid.',
    tag: 'Comfy Vibes',
  },
  {
    image: '/assets/rewards/cozy-desk-04.webp',
    title: 'Rain Against the Glass',
    note: 'An open sketchbook, warm chamomile tea, and the sound of distant rain.',
    tag: 'Quiet Hours',
  },
  {
    image: '/assets/rewards/cozy-pup-05.webp',
    title: 'Official 100% Certification',
    note: 'Certified with extreme enthusiasm. You officially know this portfolio better than anyone.',
    tag: 'Honorary Inspector',
  },
];

export const CozyRewardModal: React.FC = () => {
  const { isRewardOpen, setIsRewardOpen, recordContactCopied } = useExploration();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isRewardOpen) return null;

  const currentItem = COZY_ITEMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % COZY_ITEMS.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('mehedi@sadman.design');
    setCopied(true);
    recordContactCopied();
    setTimeout(() => setCopied(false), 2500);
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
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-[6px] border border-[#2A2A2A] bg-[#0A0A0A] p-6 sm:p-8 shadow-2xl text-[#FFFFFF] space-y-6 overflow-hidden my-auto"
        >
          {/* Subtle warm ambient glow in top corner */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#1F1F1F] pb-4 relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded text-[11px] font-mono tracking-wide uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <span>✦ Reward Unlocked</span>
                <span>·</span>
                <span>The Cozy Break Room</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#FFFFFF]">
                You actually explored everything.
              </h3>
            </div>
            <button
              onClick={() => setIsRewardOpen(false)}
              className="p-1.5 rounded-[4px] text-[#888888] hover:text-[#FFFFFF] hover:bg-[#1A1A1A] transition-colors"
              aria-label="Close reward modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-[#AAAAAA] leading-relaxed relative z-10 font-normal">
            In an internet where most recruiters spend under 6 seconds, taking the time to inspect every case study,
            footnote, and design system is genuinely rare. Take a breath. Here is a little comfort for your curiosity:
          </p>

          {/* Interactive Cozy Card */}
          <div className="relative rounded-[4px] border border-[#262626] bg-[#111111] p-3 sm:p-4 space-y-3 overflow-hidden group">
            <div className="relative aspect-[4/3] w-full rounded-[2px] overflow-hidden bg-[#0A0A0A]">
              <motion.img
                key={currentItem.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#000000]/70 text-[#CCCCCC] backdrop-blur-sm border border-[#333333]">
                {currentItem.tag}
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-[#000000]/70 text-[#888888] backdrop-blur-sm">
                {currentIndex + 1} / {COZY_ITEMS.length}
              </div>
            </div>

            <div className="space-y-1 px-1">
              <div className="text-sm font-medium text-[#FFFFFF]">{currentItem.title}</div>
              <div className="text-xs text-[#888888] leading-relaxed">{currentItem.note}</div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-2 px-3 rounded-[3px] bg-[#1A1A1A] hover:bg-[#222222] border border-[#2E2E2E] text-xs text-[#DDDDDD] hover:text-[#FFFFFF] transition-all flex items-center justify-center gap-2 cursor-pointer font-normal"
            >
              <span>Cycle another cozy snapshot</span>
              <span className="text-[#888888]">→</span>
            </button>
          </div>

          {/* Clever Perks Box */}
          <div className="p-4 rounded-[4px] bg-[#0E0E0E] border border-[#1F1F1F] space-y-2 text-xs text-[#999999] leading-relaxed">
            <div className="text-[#FFFFFF] font-normal flex items-center gap-2">
              <span className="text-amber-400">☕</span>
              <span>The Completionist Perks:</span>
            </div>
            <p>
              Mention code <strong className="text-[#FFFFFF] font-mono font-normal">"COMPLETIONIST"</strong> if you email me about a role or collaboration, and coffee is on me.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 px-4 rounded-[4px] bg-[#FFFFFF] hover:bg-[#EAEAEA] text-[#000000] text-xs font-normal uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{copied ? '✓ Email Copied to Clipboard!' : 'Copy Direct Contact Email'}</span>
            </button>
            <button
              onClick={() => setIsRewardOpen(false)}
              className="py-2.5 px-4 rounded-[4px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] text-[#AAAAAA] hover:text-[#FFFFFF] text-xs font-normal uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close & Keep Exploring
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
