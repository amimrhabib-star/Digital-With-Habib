import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenInquiry: (initialService?: string) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Work', id: 'work' },
    { name: 'Process', id: 'process' },
    { name: 'Team', id: 'team' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/85 backdrop-blur-2xl border-b border-blue-100/80 shadow-[0_10px_35px_rgba(0,80,220,0.06)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Dark Theme for Futuristic White Canvas */}
          <motion.button
            id="nav-logo-link"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center group text-left cursor-pointer"
            aria-label="DWH Studio - Homepage"
          >
            <BrandLogo size="md" theme="dark" />
          </motion.button>

          {/* Desktop Navigation Links: Apple Vision Pro Frosted Glass Capsule (White Theme) */}
          <nav
            id="desktop-nav-menu"
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-2xl border border-blue-100/80 shadow-[0_8px_30px_rgba(0,80,220,0.06)]"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <motion.button
                  key={link.name}
                  id={`nav-link-${link.id}`}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-medium transition-all rounded-full cursor-pointer ${
                    isActive
                      ? 'text-[#0052FF] font-bold'
                      : 'text-slate-600 hover:text-[#0052FF] hover:bg-blue-50/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBubble"
                      className="absolute inset-0 bg-blue-50/90 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_0_12px_rgba(0,102,255,0.12)] -z-10 border border-blue-200/60"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            {/* Live studio status pill */}
            <div className="hidden xl:flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-blue-100 text-[11px] font-semibold text-slate-700 backdrop-blur-xl shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]" />
              </span>
              <span className="text-slate-800">Available for Projects</span>
            </div>

            {/* CTA Button: Perfect Blue & White Combination on Click */}
            <motion.button
              id="nav-start-project-btn"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenInquiry()}
              className="btn-futuristic-perfect group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold tracking-wide cursor-pointer"
              aria-label="Start A Project Inquiry"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Start A Project
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 bg-white/90 hover:bg-slate-100 border border-blue-100 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-2xl border-b border-blue-100 shadow-xl"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.name}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-semibold text-left transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-[#0052FF] border border-blue-200'
                          : 'text-slate-700 hover:text-[#0052FF] hover:bg-blue-50/50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#0052FF]" />
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="btn-futuristic-perfect w-full py-3 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start A Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
