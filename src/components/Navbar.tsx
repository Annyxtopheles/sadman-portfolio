import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, FileText } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/';
    if (to === '/work') return pathname === '/work' || pathname.startsWith('/work/') || pathname === '/portfolio' || pathname.startsWith('/portfolio/');
    if (to === '/about') return pathname === '/about' || pathname === '/profile';
    if (to === '/contact') return pathname === '/contact';
    return pathname.startsWith(to);
  };

  const navLinks = [
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-[72px] transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#242424]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] h-full mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Logo / Initials */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-[#F5F5F0] hover:text-[#FF6B35] transition-colors"
        >
          <span className="font-display text-xl font-semibold tracking-tight">Sadman Zaman Khan</span>
          <span className="hidden sm:inline-block font-mono text-xs px-2 py-0.5 rounded border border-[#242424] text-[#9A9A93] group-hover:border-[#FF6B35]/40 transition-colors">
            SZK
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-1.5 transition-colors ${
                    active
                      ? 'text-[#F5F5F0] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF6B35]'
                      : 'text-[#9A9A93] hover:text-[#F5F5F0]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-[#242424]" />

          {/* Resume Download CTA */}
          <a
            href="/Sadman_Zaman_Khan_Resume.pdf"
            download="Sadman_Zaman_Khan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-[#141414] hover:bg-[#1C1C1C] text-[#F5F5F0] border border-[#242424] hover:border-[#FF6B35]/50 transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-[#9A9A93]" />
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="/Sadman_Zaman_Khan_Resume.pdf"
            download="Sadman_Zaman_Khan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-[#141414] text-[#F5F5F0] border border-[#242424]"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg bg-[#141414] border border-[#242424] text-[#F5F5F0] hover:text-[#FF6B35] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#242424] p-6 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 pt-4">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-display font-medium py-3 border-b border-[#242424] flex items-center justify-between ${
                    active ? 'text-[#FF6B35]' : 'text-[#F5F5F0]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className={`w-5 h-5 ${active ? 'text-[#FF6B35]' : 'text-[#5C5C56]'}`} />
                </Link>
              );
            })}
          </div>

          <div className="space-y-4 pt-8 pb-4">
            <a
              href="/Sadman_Zaman_Khan_Resume.pdf"
              download="Sadman_Zaman_Khan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-mono text-sm font-medium uppercase tracking-wider bg-[#F5F5F0] text-[#0A0A0A] hover:bg-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Download Full Resume (PDF)</span>
            </a>
            <div className="text-center font-mono text-xs text-[#5C5C56]">
              sadmanz.khan@gmail.com
            </div>
          </div>
        </div>
      )}
    </header>
  );
};



