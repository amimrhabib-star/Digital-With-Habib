import { Copy } from './Copy';
import { api } from '../utils/api';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight, Mail, MessageSquare } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface FooterProps {
  onOpenInquiry: (serviceName?: string) => void;
  onNavigate?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, onNavigate }) => {
  const { settings,content,isAdmin } = useStudioContent();
  const [emailInput, setEmailInput] = useState('');
  const [subscriptionError,setSubscriptionError]=useState('');
  const [submitting,setSubmitting]=useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    const elem = document.getElementById(pageId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true); setSubscriptionError('');
    try { await api('/subscribe',{method:'POST',body:JSON.stringify({email:emailInput})}); setSubscribed(true);setEmailInput(''); }
    catch(e:any){setSubscriptionError(e.message);} finally{setSubmitting(false);}
  };

  const contactEmail = settings.studioEmail;
  const whatsappNumber = settings.phoneWhatsApp.replace(/[^0-9]/g, '') || '8801734144347';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Digital%20With%20Habib!%20I%20am%20interested%20in%20starting%20a%20project.`;

  return (
    <footer
      className="text-white pt-24 pb-16 relative overflow-hidden font-['Inter',sans-serif] bg-[#050D1A] bg-cover bg-bottom sm:bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(5, 13, 26, 0.78), rgba(5, 13, 26, 0.94)), url('${settings.footerBackgroundImage}')`
      }}
    >
      {/* Radiant ambient glow on bottom luminous curve */}
      <div className="absolute inset-0 bg-radial-at-b from-blue-500/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pre-Footer Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="pb-20 border-b border-white/15 text-center max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white"><Copy id="Footer · 01">
            We Create</Copy><br /><Copy id="Footer · 02">
            Brands That</Copy><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200"><Copy id="Footer · 03">
              People Remember.
            </Copy></span>
          </h2>

          <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed"><Copy id="Footer · 04">
            Ready to elevate your visual identity, website, or product? Let's discuss your next project.
          </Copy></p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenInquiry('Start a Project')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[var(--brand-ink)] font-bold text-sm tracking-tight shadow-xl shadow-black/20 transition-all active:scale-95 cursor-pointer"
            >
              <span className="text-[var(--brand-ink)]"><Copy id="Footer · 05">Start a Project</Copy></span>
              <ArrowUpRight className="w-4 h-4 text-[var(--brand-ink)]" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-bold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-white fill-white" />
              <span className="text-white"><Copy id="Footer · 06">Chat on WhatsApp</Copy></span>
            </a>
          </div>
        </motion.div>

        {/* Brand Typography Wordmark (Registration mark removed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="py-14 border-b border-white/15 flex flex-col sm:flex-row items-baseline justify-between gap-4"
        >
          <div className="flex items-baseline">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white select-none leading-none">{settings.brandName}</h2>
          </div>

          <p className="text-white/80 font-mono text-xs sm:text-sm tracking-widest uppercase"><Copy id="Footer · 08">
            Branding • UI/UX • Web • Motion
          </Copy></p>
        </motion.div>

        {/* Directory Grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/15 text-sm">
          
          {/* Column 1: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-bold"><Copy id="Footer · 09">
              Navigation
            </Copy></h4>
            <ul className="space-y-2.5 text-white/80 font-medium">
              {content.sections.navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left text-white/85"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-bold"><Copy id="Footer · 10">
              Services
            </Copy></h4>
            <ul className="space-y-2.5 text-white/80">{content.sections.services.map(service=><li key={service.id}><button onClick={()=>onOpenInquiry(service.title)} className="hover:text-white transition-colors text-left cursor-pointer text-white/85">{service.title}</button></li>)}
            </ul>
          </div>

          {/* Column 3: Direct Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-bold"><Copy id="Footer · 17">
              Direct Inquiries
            </Copy></h4>
            <div className="space-y-3">
              <a
                href={`mailto:${contactEmail}`}
                className="text-xs font-mono font-bold text-white hover:text-cyan-200 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-white" />
                <span className="text-white">{contactEmail}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-white hover:text-emerald-300 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span className="text-white"><Copy id="Footer · 18">Chat on WhatsApp</Copy></span>
              </a>
            </div>

            <p className="text-xs text-white/75 pt-2 leading-relaxed"><Copy id="Footer · 19">
              Available worldwide for brand design, UI/UX systems, and digital web experiences.
            </Copy></p>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-bold"><Copy id="Footer · 20">
              Newsletter
            </Copy></h4>
            <p className="text-xs text-white/80 leading-relaxed font-normal"><Copy id="Footer · 21">
              Occasional design thoughts, case studies, and studio updates. No spam.
            </Copy></p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                aria-label="Email for studio updates"
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="alex@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-xs focus:outline-none focus:border-white focus:bg-white/15 transition-colors pr-10"
              />
              <button
                type="submit"
                aria-label="Submit newsletter subscription"
                disabled={submitting}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white text-[var(--brand-ink)] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-[var(--brand-ink)]" />
              </button>
            </form>{subscriptionError && <p role="alert" className="text-red-200 text-xs">{subscriptionError}</p>}
            {subscribed && (
              <p className="text-[11px] font-mono text-cyan-300 font-semibold"><Copy id="Footer · 22">
                Thank you for subscribing!
              </Copy></p>
            )}
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/80">
          <div><Copy id="Footer · 23">
            &copy; </Copy>{new Date().getFullYear()}<Copy id="Footer · 24"> Digital With Habib &bull; All rights reserved.
          </Copy></div>
          <div className="flex items-center gap-4 text-white/80">
            <span><Copy id="Footer · 25">Crafted with precision</Copy></span>
            <span><Copy id="Footer · 26">&bull;</Copy></span>
            <span><Copy id="Footer · 27">Built for real people</Copy></span>
          </div>
        </div>

      </div>
      {isAdmin && <div className="relative max-w-7xl mx-auto px-6 mt-10"><a href="#/admin" className="text-xs text-white/60 hover:text-white"><Copy id="Footer · 28">Owner sign in</Copy></a></div>}
    </footer>
  );
};
