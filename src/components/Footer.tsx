import React from 'react';

export const Footer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <footer className={`w-full bg-transparent border-t border-[#1F1F1F]/40 py-12 mt-20 ${className}`}>
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-[#888888]">
        {/* Left: Copyright note */}
        <div className="text-center lg:text-left">
          <span>© {new Date().getFullYear()} Sadman Zaman Khan</span>
        </div>

        {/* Right: Direct links & Email */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-8">
          <a
            href="https://linkedin.com/in/sadmanzamankhan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFFFFF] transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:sadmanz.khan@gmail.com"
            className="font-normal text-[#FFFFFF] hover:text-[#CCCCCC] underline underline-offset-4 transition-colors"
          >
            sadmanz.khan@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};
