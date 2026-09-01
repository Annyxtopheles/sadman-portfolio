import React from 'react';

export const Footer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <footer className={`w-full bg-[#0A0A0A] border-t border-[#27272A] py-12 mt-20 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Email */}
        <div>
          <a
            href="mailto:sadmanz.khan@gmail.com"
            className="text-base font-medium text-[#FFFFFF] hover:text-[#00E5FF] transition-colors"
          >
            sadmanz.khan@gmail.com
          </a>
        </div>

        {/* Right: Direct links & Copyright */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-[#94A3B8]">
          <a
            href="https://linkedin.com/in/sadmanzamankhan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFFFFF] transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="/Sadman_Zaman_Khan_Resume.pdf"
            download="Sadman_Zaman_Khan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFFFFF] transition-colors"
          >
            Resume ↗
          </a>
          <span className="text-[#3F3F46]">·</span>
          <span>© {new Date().getFullYear()} Sadman Zaman Khan</span>
        </div>
      </div>
    </footer>
  );
};

