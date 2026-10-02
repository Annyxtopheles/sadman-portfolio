import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

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

  // Blur background page and lock body scroll when mobile menu is open
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (mainContent) {
        mainContent.style.filter = 'blur(12px)';
        mainContent.style.transition = 'filter 0.25s ease';
        mainContent.setAttribute('inert', '');
      }
    } else {
      document.body.style.overflow = '';
      if (mainContent) {
        mainContent.style.filter = '';
        mainContent.removeAttribute('inert');
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (mainContent) {
        mainContent.style.filter = '';
        mainContent.removeAttribute('inert');
      }
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-lg bg-black/40 border-none">
        <div className="w-full h-[72px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-[#FFFFFF] hover:text-[#CCCCCC] transition-colors font-display text-xl font-normal tracking-tight"
          >
            Sadman Zaman Khan
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-normal">
            {navLinks.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888888] hover:text-[#FFFFFF] py-1.5 transition-colors font-normal"
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
                  className={`relative py-1.5 transition-colors font-normal ${
                    active
                      ? 'text-[#FFFFFF] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#FFFFFF]'
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
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="px-3.5 py-1.5 rounded-[4px] bg-[#0A0A0A] hover:bg-[#141414] border border-[#222222] text-xs text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Portal with Frosted Blur & High Contrast */}
      {isMobileMenuOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="md:hidden fixed inset-0 z-[100] flex flex-col justify-between bg-black/85 backdrop-blur-2xl p-0 min-h-[100dvh] overflow-y-auto animate-in fade-in duration-200"
            style={{
              WebkitBackdropFilter: 'blur(28px)',
              backdropFilter: 'blur(28px)',
            }}
          >
            {/* Top Bar inside portal */}
            <div className="w-full h-[72px] px-6 sm:px-10 flex items-center justify-between shrink-0">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#FFFFFF] font-display text-xl font-normal tracking-tight"
              >
                Sadman Zaman Khan
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="px-3.5 py-1.5 rounded-[4px] bg-[#141414] hover:bg-[#1F1F1F] border border-[#2E2E2E] text-xs text-[#FFFFFF] font-mono transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Close</span>
                <span>✕</span>
              </button>
            </div>

            {/* Navigation Links (Crisp, High Contrast, No Internal Dividing Lines) */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 space-y-6 my-auto">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl sm:text-4xl font-display font-medium py-2 transition-colors flex items-center justify-between ${
                  pathname === '/' ? 'text-[#FFFFFF]' : 'text-[#CCCCCC] hover:text-[#FFFFFF]'
                }`}
              >
                <span>Home</span>
                {pathname === '/' && <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">Current</span>}
              </Link>

              {navLinks.map((item) => {
                if (item.isExternal) {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl sm:text-4xl font-display font-medium py-2 text-[#CCCCCC] hover:text-[#FFFFFF] transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <span className="text-xl text-[#888888]">↗</span>
                    </a>
                  );
                }
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-3xl sm:text-4xl font-display font-medium py-2 transition-colors flex items-center justify-between ${
                      active ? 'text-[#FFFFFF]' : 'text-[#CCCCCC] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">Current</span>}
                  </Link>
                );
              })}
            </nav>

            {/* Footer Contact Info */}
            <div className="px-8 pb-8 pt-6 shrink-0 flex flex-col items-start sm:items-center text-xs text-[#888888] space-y-1">
              <a
                href="mailto:sadmanz.khan@gmail.com"
                className="text-[#CCCCCC] hover:text-[#FFFFFF] transition-colors text-sm font-normal"
              >
                sadmanz.khan@gmail.com
              </a>
              <span className="text-[#666666]">Dhaka, Bangladesh · UI/UX Designer</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Navbar;
