import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Globe, Clock, Check, MessageCircle, Mail } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

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
  const { settings } = useStudioContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [milanTime, setMilanTime] = useState<string>('--:--:--');

  // Track Milano time (GMT+1 / CET / CEST)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Rome',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setMilanTime(formatter.format(now));
      } catch {
        const now = new Date();
        setMilanTime(now.toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const navItems = [
    { label: 'Home', id: 'home', num: '01' },
    { label: 'About', id: 'about', num: '02' },
    { label: 'Work', id: 'work', num: '03' },
    { label: 'Membership', id: 'membership', num: '04' },
    { label: 'Journal', id: 'journal', num: '05' },
    { label: 'Contact', id: 'contact', num: '06' }
  ];

  const handleLinkSelect = (pageId: string) => {
    setMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${settings.phoneWhatsApp.replace(/[^0-9]/g, '') || '8801734144347'}?text=Hello!%20I%20am%20interested%20in%20Arpeggio%20design%20services.`;

  return (
    <>
      <header
        id="arpeggio-main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              id="arpeggio-nav-logo"
              onClick={() => handleLinkSelect('home')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              {settings.customLogoUrl ? (
                <img
                  src={settings.customLogoUrl}
                  alt="Arpeggio Logo"
                  className="h-7 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white text-black font-black text-[11px] flex items-center justify-center rounded-xs tracking-tighter">
                    A
                  </div>
                  <span className="font-extrabold text-lg sm:text-xl tracking-[-0.05em] text-white uppercase font-['Inter',sans-serif]">
                    ARPEGGIO
                  </span>
                </div>
              )}
            </button>

            {/* Desktop Center: Quick Social Pills */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-wider text-zinc-400">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                WA
              </a>
              <span className="text-zinc-600">&bull;</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                X
              </a>
              <span className="text-zinc-600">&bull;</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                IG
              </a>
              <span className="text-zinc-600">&bull;</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                LI
              </a>
              <span className="text-zinc-600">&bull;</span>
              <a
                href={`mailto:${settings.studioEmail || 'amimrhabib@gmail.com'}`}
                className="px-2 py-0.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                EMAIL
              </a>
            </div>

            {/* Right Side: Primary CTA & Hamburger Button */}
            <div className="flex items-center gap-3">
              <button
                id="arpeggio-nav-subscribe-btn"
                onClick={() => onOpenInquiry('Core Plan')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold tracking-tight hover:bg-zinc-200 transition-all active:scale-95"
              >
                <span>Discover Plans</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Minimalist 2-line Hamburger Menu Button */}
              <button
                id="arpeggio-menu-toggle-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white hover:bg-white/15 transition-all focus:outline-none focus:ring-1 focus:ring-white"
                aria-label={menuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                aria-expanded={menuOpen}
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-[1.5px] bg-white block rounded-full"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-[1.5px] bg-white block rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Arpeggio Fullscreen Maximized Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="arpeggio-fullscreen-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl text-white flex flex-col justify-between pt-24 pb-10 px-6 sm:px-12 lg:px-20 overflow-y-auto"
          >
            {/* Top Bar of Menu: Milano Timezone & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs sm:text-sm text-zinc-300 font-medium">
                  We are based in <strong className="text-white font-semibold">Milano</strong> and work remotely.
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-white font-semibold">{milanTime}</span>
                <span>current Time zone (GMT+1)</span>
              </div>
            </div>

            {/* Main Navigation Links with Numbers */}
            <div className="my-auto py-10">
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 max-w-4xl">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleLinkSelect(item.id)}
                      className="group flex items-baseline justify-between py-3 border-b border-white/[0.07] text-left transition-all hover:border-white/30"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                          {item.num}
                        </span>
                        <span
                          className={`text-3xl sm:text-5xl font-medium tracking-tight transition-colors ${
                            isActive ? 'text-white font-bold' : 'text-zinc-400 group-hover:text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Bar: Legal & Social Links */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleLinkSelect('membership')}
                  className="hover:text-white transition-colors"
                >
                  Membership Plans
                </button>
                <button
                  onClick={() => handleLinkSelect('journal')}
                  className="hover:text-white transition-colors"
                >
                  Journal & Insights
                </button>
                <button
                  onClick={() => handleLinkSelect('contact')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </div>

              <div className="flex items-center gap-4 text-zinc-300">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Whatsapp
                </a>
                <span>&bull;</span>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  X
                </a>
                <span>&bull;</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <span>&bull;</span>
                <a
                  href={`mailto:${settings.studioEmail || 'amimrhabib@gmail.com'}`}
                  className="hover:text-white transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
