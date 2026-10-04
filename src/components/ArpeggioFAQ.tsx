import { Copy } from './Copy';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, ArrowUpRight, MessageCircle, PhoneCall } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface ArpeggioFAQProps {
  onBookCall: () => void;
}

export const ArpeggioFAQ: React.FC<ArpeggioFAQProps> = ({ onBookCall }) => {
  const { content } = useStudioContent();
  const { settings } = useStudioContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = content.sections.faqs;

  const whatsappUrl = `https://wa.me/${settings.phoneWhatsApp.replace(/[^0-9]/g, '') || '8801734144347'}?text=Hello%20Digital%20With%20Habib!%20I%20have%20a%20question%20about%20starting%20a%20project.`;

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[var(--brand-surface)] text-[var(--brand-ink)] border-t border-slate-200/80 relative font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-[var(--brand-primary)] mb-4 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span><Copy id="Arpeggio FAQ · 01">Frequently Asked Questions</Copy></span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--brand-ink)] leading-tight"><Copy id="Arpeggio FAQ · 02">
              Got questions? </Copy><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-[#146BFF] to-[var(--brand-accent)]"><Copy id="Arpeggio FAQ · 03">
                We've got answers.
              </Copy></span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed"><Copy id="Arpeggio FAQ · 04">
            Find answers to common questions about working with Digital With Habib, our process, timelines and services.
          </Copy></p>
        </motion.div>

        {/* 2-Column Layout: Accordion + Discovery Box */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion (8 Cols) */}
          <div className="lg:col-span-8 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="py-6"
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg sm:text-xl font-extrabold text-[var(--brand-ink)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 group-hover:border-[var(--brand-primary)] group-hover:text-[var(--brand-primary)] group-hover:bg-blue-50 transition-all">
                      {isOpen ? <Minus className="w-4 h-4 text-[var(--brand-primary)]" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Direct Support & Call Discovery Card (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[var(--brand-primary)] flex items-center justify-center mb-6">
                <MessageCircle className="w-5 h-5 text-[var(--brand-primary)]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-ink)] tracking-tight"><Copy id="Arpeggio FAQ · 05">
                Still looking for answers or need a good chat?
              </Copy></h3>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 font-normal leading-relaxed"><Copy id="Arpeggio FAQ · 06">
                Connect directly with Habib and our creative team. We are happy to evaluate your project scope and recommend the right approach.
              </Copy></p>
            </div>

            <div className="mt-8 space-y-3 pt-6 border-t border-slate-100">
              <button
                onClick={onBookCall}
                className="w-full py-3.5 px-4 rounded-xl bg-[var(--brand-primary)] hover:bg-[#0047E0] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[var(--brand-primary)]/20 transition-all cursor-pointer active:scale-95"
              >
                <span><Copy id="Arpeggio FAQ · 07">Start a Project</Copy></span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span><Copy id="Arpeggio FAQ · 08">Chat on WhatsApp</Copy></span>
                <ArrowUpRight className="w-4 h-4 text-[var(--brand-primary)]" />
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
