import { Copy } from './Copy';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, MessageCircle, Mail } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import {useDialog} from '../hooks/useDialog';
import { BrandLogo } from './BrandLogo';

interface ArpeggioNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenInquiry: (planOrService?: string) => void;
}

export const ArpeggioNav: React.FC<ArpeggioNavProps> = ({
  currentPage,
  onNavigate,
  onOpenInquiry
}) => {
  const { settings, content } = useStudioContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef=useDialog(menuOpen,()=>setMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const navItems = content.sections.navigation;

  const handleLinkSelect = (pageId: string) => {
    setMenuOpen(false);
    onNavigate(pageId);
    
    // If it's a section on the home view or navigating to specific page
    const element = document.getElementById(pageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const whatsappUrl = `https://wa.me/${settings.phoneWhatsApp.replace(/[^0-9]/g, '') || '8801734144347'}?text=Hello%20Digital%20With%20Habib!%20I%20am%20interested%20in%20discussing%20a%20project.`;

  return (
    <>
      <header
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-white/92 backdrop-blur-xl border-b border-slate-200/90 shadow-xs text-[var(--brand-ink)]'
            : 'py-4 sm:py-5 bg-white/80 backdrop-blur-md border-b border-slate-200/60 text-[var(--brand-ink)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Logo with Favicon on left and Digital With Habib on the right */}
            <button
              id="nav-logo"
              onClick={() => handleLinkSelect('home')}
              className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
            >
              <BrandLogo variant="full" size="md" theme="dark" />
            </button>

            {/* Desktop Middle: Menu Items - Home to Contact Bold & More Large */}
            <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2.5">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => handleLinkSelect(item.id)}
                    className={`px-4 py-2 rounded-full text-sm lg:text-[15px] transition-all cursor-pointer ${
                      isActive
                        ? 'text-[var(--brand-primary)] bg-blue-50/90 font-black shadow-xs'
                        : 'text-[var(--brand-ink)] hover:text-[var(--brand-primary)] hover:bg-slate-100/80 font-bold'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Side: Primary Button + Mobile Hamburger */}
            <div className="flex items-center gap-3">
              {/* Primary Button - Start a Project Bold & More Large */}
              <button
                id="nav-cta-btn"
                onClick={() => onOpenInquiry('Start a Project')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-primary)] hover:bg-[#0047E0] text-white text-sm sm:text-[15px] font-extrabold tracking-tight shadow-lg shadow-[var(--brand-primary)]/25 hover:shadow-xl hover:shadow-[var(--brand-primary)]/35 transition-all active:scale-95 cursor-pointer"
              >
                <span><Copy id="Arpeggio Nav · 01">Start a Project</Copy></span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                id="menu-toggle-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                className="xl:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[var(--brand-ink)] transition-all focus:outline-none cursor-pointer"
                aria-label={menuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                aria-expanded={menuOpen}
                aria-controls="fullscreen-menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 3.5, backgroundColor: 'var(--brand-primary)' } : { rotate: 0, y: 0, backgroundColor: 'var(--brand-primary)' }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-[2px] block rounded-full"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -3.5, backgroundColor: 'var(--brand-primary)' } : { rotate: 0, y: 0, backgroundColor: 'var(--brand-primary)' }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-[2px] block rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="fullscreen-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Site navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl text-[var(--brand-ink)] flex flex-col justify-between pt-24 pb-10 px-6 sm:px-12 overflow-y-auto"
          >
            {/* Menu Links */}
            <div className="my-auto py-8">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleLinkSelect(item.id)}
                      className="group flex items-center justify-between py-3.5 border-b border-slate-100 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-[var(--brand-primary)]">
                          {item.num}
                        </span>
                        <span
                          className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                            isActive ? 'text-[var(--brand-primary)]' : 'text-[var(--brand-ink)] group-hover:text-[var(--brand-primary)]'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[var(--brand-primary)] transition-colors" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Action Buttons in Mobile Menu */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenInquiry('Start a Project');
                }}
                className="w-full py-4 rounded-xl bg-[var(--brand-primary)] text-white font-extrabold text-base shadow-md shadow-[var(--brand-primary)]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span><Copy id="Arpeggio Nav · 02">Start a Project</Copy></span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span><Copy id="Arpeggio Nav · 03">Chat on WhatsApp</Copy></span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
