import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Linkedin, FileText } from 'lucide-react';

const getDhakaTime = () => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date()).toLowerCase();
  } catch {
    return '';
  }
};

export const Footer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [time, setTime] = useState(getDhakaTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getDhakaTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={`w-full bg-[#0A0A0A] border-t border-[#242424] pt-16 pb-12 mt-20 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12">
          {/* Col 1: Direct Contact */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#5C5C56]">Direct Contact</div>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:sadmanz.khan@gmail.com"
                className="group flex items-center gap-2 text-[#F5F5F0] hover:text-[#FF6B35] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF6B35]" />
                <span>sadmanz.khan@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-xs text-[#9A9A93]">
                Available for enterprise product design, AI UX consulting &amp; design systems.
              </p>
            </div>
          </div>

          {/* Col 2: Social & Profiles */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#5C5C56]">Connect &amp; Verification</div>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href="https://linkedin.com/in/sadmanzamankhan"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#9A9A93] hover:text-[#F5F5F0] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#7DA2FF]" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5C56] group-hover:text-[#F5F5F0] transition-colors" />
              </a>
              <a
                href="/Sadman_Zaman_Khan_Resume.pdf"
                download="Sadman_Zaman_Khan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#9A9A93] hover:text-[#F5F5F0] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#4ADE80]" />
                <span>Download Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5C56] group-hover:text-[#F5F5F0] transition-colors" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation & Live Time */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#5C5C56]">Index</div>
            <div className="flex flex-wrap gap-4 text-sm text-[#9A9A93]">
              <Link to="/work" className="hover:text-[#F5F5F0] transition-colors">Work</Link>
              <span className="text-[#242424]">·</span>
              <Link to="/about" className="hover:text-[#F5F5F0] transition-colors">About</Link>
              <span className="text-[#242424]">·</span>
              <Link to="/contact" className="hover:text-[#F5F5F0] transition-colors">Contact</Link>
            </div>
            {time && (
              <div className="pt-2 font-mono text-xs text-[#5C5C56] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="tabular-nums">{time} Dhaka (GMT+6)</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#5C5C56]">
          <span>© {new Date().getFullYear()} Sadman Zaman Khan. All rights reserved.</span>
          <span>Designed with high-density precision &amp; AI-augmented velocity.</span>
        </div>
      </div>
    </footer>
  );
};

