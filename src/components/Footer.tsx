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
    <footer className={`w-full bg-[#0A0A0A] border-t border-[#27272A] pt-14 pb-12 mt-20 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-10">
          {/* Col 1: Direct Email */}
          <div className="space-y-2">
            <a
              href="mailto:sadmanz.khan@gmail.com"
              className="group inline-flex items-center gap-2 text-base font-medium text-[#FFFFFF] hover:text-[#00E5FF] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#00E5FF]" />
              <span>sadmanz.khan@gmail.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-sm text-[#CBD5E1]">
              Available for enterprise product design, design systems &amp; prototypes.
            </p>
          </div>

          {/* Col 2: Social & Resume Links */}
          <div className="flex flex-col space-y-3 text-sm">
            <a
              href="https://linkedin.com/in/sadmanzamankhan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[#CBD5E1] hover:text-[#FFFFFF] transition-colors font-medium"
            >
              <Linkedin className="w-4 h-4 text-[#00E5FF]" />
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#FFFFFF] transition-colors" />
            </a>
            <a
              href="/Sadman_Zaman_Khan_Resume.pdf"
              download="Sadman_Zaman_Khan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[#CBD5E1] hover:text-[#FFFFFF] transition-colors font-medium"
            >
              <FileText className="w-4 h-4 text-[#4ADE80]" />
              <span>Download Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#FFFFFF] transition-colors" />
            </a>
          </div>

          {/* Col 3: Navigation Links & Live Time */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-5 text-sm font-medium text-[#CBD5E1]">
              <Link to="/work" className="hover:text-[#FFFFFF] transition-colors">Work</Link>
              <span className="text-[#3F3F46]">·</span>
              <Link to="/about" className="hover:text-[#FFFFFF] transition-colors">About</Link>
              <span className="text-[#3F3F46]">·</span>
              <Link to="/contact" className="hover:text-[#FFFFFF] transition-colors">Contact</Link>
            </div>
            {time && (
              <div className="font-mono text-xs text-[#94A3B8] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="tabular-nums">{time} Dhaka (GMT+6)</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#94A3B8]">
          <span>© {new Date().getFullYear()} Sadman Zaman Khan</span>
          <span>UI/UX Designer &amp; AI-Augmented Prototyper</span>
        </div>
      </div>
    </footer>
  );
};

