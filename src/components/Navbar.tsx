import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    return pathname.startsWith(to);
  };

  const navLinks = [
    { label: 'Work', path: '/work', isExternal: false },
    { label: 'About', path: '/about', isExternal: false },
    { label: 'Resume', path: '/Sadman_Zaman_Khan_Resume.pdf', isExternal: true },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-[72px] transition-all duration-300 ${
        scrolled
          ? 'bg-[#000000]/95 backdrop-blur-md border-b border-[#1F1F1F]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full h-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-[#FFFFFF] hover:text-[#CCCCCC] transition-colors font-display text-xl font-bold tracking-tight"
        >
          Sadman Zaman Khan
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((item) => {
            if (item.isExternal) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888888] hover:text-[#FFFFFF] py-1.5 transition-colors"
                >
                  {item.label} ↗
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
                    ? 'text-[#FFFFFF] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#FFFFFF]'
                    : 'text-[#888888] hover:text-[#FFFFFF]'
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
            className="px-3 py-1.5 rounded-[4px] bg-[#0A0A0A] border border-[#1F1F1F] text-xs text-[#FFFFFF]"
          >
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-[#000000]/98 backdrop-blur-xl border-t border-[#1F1F1F] p-6 flex flex-col justify-between">
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
                    className="text-2xl font-display font-medium py-3 border-b border-[#1F1F1F] text-[#FFFFFF]"
                  >
                    {item.label} ↗
                  </a>
                );
              }
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-display font-medium py-3 border-b border-[#1F1F1F] ${
                    active ? 'text-[#FFFFFF] font-bold' : 'text-[#888888]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-8 pb-4 text-center text-xs text-[#888888]">
            sadmanz.khan@gmail.com
          </div>
        </div>
      )}
    </header>
  );
};
