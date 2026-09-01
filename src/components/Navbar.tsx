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
    { label: 'Work', path: '/work', isExternal: false },
    { label: 'About', path: '/about', isExternal: false },
    { label: 'Contact', path: '/contact', isExternal: false },
    { label: 'Resume', path: '/Sadman_Zaman_Khan_Resume.pdf', isExternal: true },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-[72px] transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#27272A]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] h-full mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-[#FFFFFF] hover:text-[#00E5FF] transition-colors font-display text-xl font-semibold tracking-tight"
        >
          Sadman Zaman Khan
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((item) => {
            if (item.isExternal) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CBD5E1] hover:text-[#FFFFFF] py-1.5 transition-colors"
                >
                  {item.label}
                </a>
              );
            }
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1.5 transition-colors ${
                  active
                    ? 'text-[#FFFFFF] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#00E5FF]'
                    : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg bg-[#141414] border border-[#27272A] text-[#FFFFFF] hover:text-[#00E5FF] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#27272A] p-6 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 pt-4">
            {navLinks.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-display font-medium py-3 border-b border-[#27272A] text-[#FFFFFF]"
                  >
                    {item.label}
                  </a>
                );
              }
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-display font-medium py-3 border-b border-[#27272A] ${
                    active ? 'text-[#00E5FF]' : 'text-[#FFFFFF]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-8 pb-4 text-center font-mono text-xs text-[#CBD5E1]">
            sadmanz.khan@gmail.com
          </div>
        </div>
      )}
    </header>
  );
};



