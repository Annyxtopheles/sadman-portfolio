import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useExploration } from '@/context/ExplorationContext';
import { PROJECTS } from '@/data/projects';

export const ExplorationHUD: React.FC = () => {
  const {
    state,
    viewedCount,
    totalProjects,
    progressPercent,
    currentLevel,
    isCompleted,
    activeToast,
    isHUDOpen,
    setIsHUDOpen,
    setIsRewardOpen,
    recordClick,
    resetProgress,
  } = useExploration();

  const handleToggle = () => {
    setIsHUDOpen((prev) => !prev);
  };

  const handleOpenReward = () => {
    setIsHUDOpen(false);
    setIsRewardOpen(true);
  };

  return (
    <>
      {/* 1. Ambient Floating Milestone Notification Toast */}
      <AnimatePresence>
        {activeToast && (
          <motion.aside
            aria-label="Field Guide Notification"
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-auto max-w-[90vw]"
          >
            <div className="px-4 py-2.5 rounded-[4px] bg-[#0A0A0A]/95 border border-[#2E2E2E] shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs text-[#FFFFFF]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-normal font-sans tracking-wide">{activeToast}</span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. Floating Minimalist HUD Pill (Centered Bottom) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex flex-col items-start rounded-[4px] border border-[#222222] bg-[#0A0A0A]/90 hover:border-[#383838] hover:bg-[#121212] backdrop-blur-md px-3.5 py-2 shadow-xl transition-all cursor-pointer text-left whitespace-nowrap"
          aria-label="Open exploration quest checklist"
        >
          <div className="flex items-center gap-2 text-xs font-normal">
            <span className="text-[#888888] group-hover:text-[#FFFFFF] transition-colors">
              ✦
            </span>
            <span className="text-[#CCCCCC] group-hover:text-[#FFFFFF] transition-colors font-mono">
              {viewedCount}/{totalProjects}
            </span>
            <span className="text-[#555555]">·</span>
            <span className="text-[#888888] group-hover:text-[#CCCCCC] transition-colors hidden sm:inline">
              {currentLevel.title}
            </span>
            <span className="text-cyan-400 font-mono text-[11px]">
              {progressPercent}%
            </span>
          </div>

          {/* Micro Progress Bar on bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A1A1A] rounded-b-[4px] overflow-hidden">
            <motion.div
              className="h-full bg-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.button>
      </div>

      {/* 3. Interactive Checklist Drawer / Modal */}
      <AnimatePresence>
        {isHUDOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHUDOpen(false)}
              className="fixed inset-0 bg-[#000000]/70 backdrop-blur-sm"
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full sm:max-w-md max-h-[85vh] flex flex-col rounded-t-[8px] sm:rounded-[6px] border border-[#262626] bg-[#0A0A0A] shadow-2xl text-[#FFFFFF] z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#1F1F1F] flex items-start justify-between gap-4 bg-[#0E0E0E]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-[#888888] font-mono">
                      Level {currentLevel.level}
                    </span>
                    <span className="text-[#444444]">·</span>
                    <span className="text-xs text-cyan-400 font-mono">
                      {progressPercent}% Explored
                    </span>
                  </div>
                  <h3 className="text-lg font-normal text-[#FFFFFF] tracking-tight">
                    {currentLevel.title}
                  </h3>
                  <p className="text-xs text-[#777777] font-normal">
                    {currentLevel.description}
                  </p>
                </div>
                <button
                  onClick={() => setIsHUDOpen(false)}
                  className="p-1 rounded text-[#777777] hover:text-[#FFFFFF] hover:bg-[#1A1A1A] transition-colors"
                  aria-label="Close checklist"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress Line */}
              <div className="h-[2px] w-full bg-[#181818] overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Scrollable Content */}
              <div className="p-5 overflow-y-auto space-y-6 text-xs flex-1 custom-scrollbar">
                {/* 100% / Reward Banner */}
                {(isCompleted || state.rewardUnlocked) && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-[4px] bg-[#121212] border border-[#2E2E2E] space-y-2.5"
                  >
                    <div className="flex items-center gap-2 text-[#FFFFFF] font-medium">
                      <span>☕</span>
                      <span>The Cozy Break Room is Unlocked</span>
                    </div>
                    <p className="text-[#AAAAAA] text-[11px] leading-relaxed">
                      You've taken the time to see every project. Take a breather and claim your comfy reward.
                    </p>
                    <button
                      onClick={handleOpenReward}
                      className="w-full py-2.5 px-3 rounded-[3px] bg-[#FFFFFF] hover:bg-[#E5E5E5] text-[#000000] font-normal uppercase tracking-wider text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Claim Your Cozy Reward ☕</span>
                      <span>→</span>
                    </button>
                  </motion.div>
                )}

                {/* Section 1: Projects Explored */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[#888888] font-normal border-b border-[#1A1A1A] pb-2">
                    <span className="uppercase tracking-wider font-mono text-[11px]">
                      Projects Explored ({viewedCount}/{totalProjects})
                    </span>
                    <span className="text-[11px] text-[#666666]">Click to inspect</span>
                  </div>

                  <div className="space-y-1.5">
                    {PROJECTS.map((project) => {
                      const isViewed = state.viewedProjects.includes(project.slug);
                      return (
                        <Link
                          key={project.id}
                          to={`/work/${project.slug}`}
                          onClick={() => {
                            setIsHUDOpen(false);
                          }}
                          className={`group flex items-center justify-between p-2.5 rounded-[4px] border transition-all ${
                            isViewed
                              ? 'bg-[#0E0E0E] border-[#1C1C1C] text-[#888888]'
                              : 'bg-[#121212] border-[#262626] hover:border-[#444444] text-[#CCCCCC] hover:text-[#FFFFFF]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span
                              className={`w-4 h-4 rounded-[2px] flex items-center justify-center font-mono text-[10px] shrink-0 ${
                                isViewed
                                  ? 'bg-white/10 text-white border border-white/20'
                                  : 'border border-[#333333] text-[#555555]'
                              }`}
                            >
                              {isViewed ? '✓' : ''}
                            </span>
                            <span className="truncate font-normal">
                              {project.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-[#666666] font-mono hidden sm:inline">
                              {project.category}
                            </span>
                            {!isViewed && (
                              <span className="text-[10px] text-[#AAAAAA] group-hover:text-[#FFFFFF] transition-colors">
                                View →
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Exploration Quests */}
                <div className="space-y-3">
                  <div className="text-[#888888] font-normal border-b border-[#1A1A1A] pb-2 uppercase tracking-wider font-mono text-[11px]">
                    Exploration Milestones
                  </div>

                  <div className="space-y-2">
                    {/* Milestone 1: Landed */}
                    <div className="flex items-start gap-2.5 p-2 rounded-[3px] bg-[#0E0E0E] border border-[#1A1A1A]">
                      <span className="w-4 h-4 rounded-[2px] bg-white/10 text-white border border-white/20 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        ✓
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-[#DDDDDD] font-normal">First Contact</div>
                        <div className="text-[#777777] text-[11px]">Landed on the portfolio grid.</div>
                      </div>
                    </div>

                    {/* Milestone 2: Read about */}
                    <div className="flex items-start gap-2.5 p-2 rounded-[3px] bg-[#0E0E0E] border border-[#1A1A1A]">
                      <span
                        className={`w-4 h-4 rounded-[2px] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                          state.visitedRoutes.includes('/about')
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'border border-[#333333] text-[#555555]'
                        }`}
                      >
                        {state.visitedRoutes.includes('/about') ? '✓' : ''}
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-[#DDDDDD] font-normal">The Backstory</div>
                        <div className="text-[#777777] text-[11px]">
                          Explored the About page & design philosophy.
                        </div>
                      </div>
                    </div>

                    {/* Milestone 3: Tactile clicks */}
                    <div className="flex items-start gap-2.5 p-2 rounded-[3px] bg-[#0E0E0E] border border-[#1A1A1A]">
                      <span
                        className={`w-4 h-4 rounded-[2px] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                          state.clicksCount >= 5
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'border border-[#333333] text-[#555555]'
                        }`}
                      >
                        {state.clicksCount >= 5 ? '✓' : ''}
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-[#DDDDDD] font-normal">
                          Tactile Sparks ({Math.min(state.clicksCount, 5)}/5)
                        </div>
                        <div className="text-[#777777] text-[11px]">
                          Triggered the click particle sparks & mechanical clicks.
                        </div>
                      </div>
                    </div>

                    {/* Milestone 4: Raw archive portal */}
                    <div className="flex items-start gap-2.5 p-2 rounded-[3px] bg-[#0E0E0E] border border-[#1A1A1A]">
                      <span
                        className={`w-4 h-4 rounded-[2px] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                          state.foundPortal
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'border border-[#333333] text-[#555555]'
                        }`}
                      >
                        {state.foundPortal ? '✓' : ''}
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-[#DDDDDD] font-normal">The Secret Portal</div>
                        <div className="text-[#777777] text-[11px]">
                          Found the gradual blur portal on the About page.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#1F1F1F] bg-[#0E0E0E] flex items-center justify-between text-[11px] text-[#777777]">
                <button
                  onClick={() => {
                    recordClick();
                    resetProgress();
                  }}
                  className="text-[#666666] hover:text-[#AAAAAA] underline transition-colors cursor-pointer font-mono"
                >
                  Reset progress
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
