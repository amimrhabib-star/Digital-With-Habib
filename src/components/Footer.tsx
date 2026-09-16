import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Mail, Phone, MessageSquare, Globe2 } from 'lucide-react';

interface FooterProps {
  onOpenInquiry: (serviceName?: string) => void;
  onNavigate?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, onNavigate }) => {
  const handleNav = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(`#${pageId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#071A41] text-white pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand Logo & Tagline */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo variant="full" theme="white" size="lg" />
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We help eCommerce brands, tech companies, and creators with simple, clean branding, websites, and high-impact video.
            </p>
            
            {/* WhatsApp Green Button */}
            <div>
              <a
                href="https://wa.me/8801734144347"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp: +880 1734 144347</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              SERVICES
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button onClick={() => { handleNav('services'); onOpenInquiry('Brand Identity & Logo Design'); }} className="hover:text-white transition-colors">
                  Brand Identity & Logo Design
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('services'); onOpenInquiry('UI/UX Design'); }} className="hover:text-white transition-colors">
                  UI/UX & Web Design
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('services'); onOpenInquiry('Web Development'); }} className="hover:text-white transition-colors">
                  Web & App Development
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('services'); onOpenInquiry('Video Editing & Motion Graphics'); }} className="hover:text-white transition-colors">
                  Video Editing & 3D Motion
                </button>
              </li>
              <li>
                <button onClick={() => { handleNav('services'); onOpenInquiry('Digital Marketing'); }} className="hover:text-white transition-colors">
                  Digital Marketing & Growth
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              PAGES
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('work')} className="hover:text-white transition-colors">
                  Work / Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('process')} className="hover:text-white transition-colors">
                  Process
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('team')} className="hover:text-white transition-colors">
                  Team
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              CONTACT DETAILS
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href="mailto:contact@dwhstudio.com"
                className="flex items-center gap-2 hover:text-white transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">contact@dwhstudio.com</span>
              </a>

              <a
                href="tel:+8801734144347"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+880 1734 144347</span>
              </a>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] text-slate-300">
                  <Globe2 className="w-3 h-3 text-cyan-400" />
                  <span>Global Remote Studio</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 DWH Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">About Studio</button>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">Start Project</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
