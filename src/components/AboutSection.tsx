import { Copy } from './Copy';
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Eye, Compass, Handshake } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface AboutSectionProps {
  onNavigate?: (page: string) => void;
  onOpenInquiry?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate, onOpenInquiry }) => {
  const { content } = useStudioContent();
  const { settings } = useStudioContent();

  const values = content.sections.values;

  return (
    <section id="about" className="py-24 sm:py-32 bg-[var(--brand-surface)] text-[var(--brand-ink)] font-['Inter',sans-serif] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[var(--brand-primary)] text-xs font-mono uppercase tracking-wider mb-5 border border-blue-200/80">
            <Sparkles className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
            <span><Copy id="About Section · 01">About Digital With Habib</Copy></span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--brand-ink)] leading-[1.15]"><Copy id="About Section · 02">
            A design studio focused on simple, useful and memorable digital experiences.
          </Copy></h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"><Copy id="About Section · 03">
            Digital With Habib is an independent design studio founded by Habib. We collaborate with founders, businesses and teams worldwide to build clear visual identities, modern websites and practical digital products.
          </Copy></p>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"><Copy id="About Section · 04">
            Our approach is straightforward: listen carefully, design with purpose, and create work that delivers real value.
          </Copy></p>
        </motion.div>

        {/* VALUES / PHILOSOPHY */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--brand-primary)] font-semibold"><Copy id="About Section · 05">
              Our Values & Philosophy
            </Copy></span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((item, idx) => {
              const Icon = ({Eye, Compass, Handshake} as any)[item.icon] || Eye;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="rounded-2xl bg-white border border-slate-200/90 p-8 shadow-xs hover:shadow-lg hover:border-[var(--brand-primary)]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[var(--brand-primary)] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[var(--brand-primary)]" />
                    </div>

                    <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-[var(--brand-primary)] font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span><Copy id="About Section · 06">Principle 0</Copy>{idx + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FOUNDER HIGHLIGHT STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-50/90 via-white to-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--brand-ink)]"><Copy id="About Section · 07">
              Ready to create something memorable?
            </Copy></h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl"><Copy id="About Section · 08">
              We collaborate with forward-thinking founders and teams across North America, Europe, and Asia.
            </Copy></p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => {
                if (onOpenInquiry) {
                  onOpenInquiry();
                } else if (onNavigate) {
                  onNavigate('contact');
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-primary)] hover:bg-[#0047E0] text-white text-xs sm:text-sm font-bold shadow-md shadow-[var(--brand-primary)]/20 transition-all cursor-pointer active:scale-95"
            >
              <span><Copy id="About Section · 09">Start a Project</Copy></span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
