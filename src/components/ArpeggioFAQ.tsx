import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, ArrowUpRight, MessageCircle, PhoneCall } from 'lucide-react';
import { ARPEGGIO_FAQS } from '../data/studioData';
import { useStudioContent } from '../context/StudioContentContext';

interface ArpeggioFAQProps {
  onBookCall: () => void;
}

export const ArpeggioFAQ: React.FC<ArpeggioFAQProps> = ({ onBookCall }) => {
  const { settings } = useStudioContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappUrl = `https://wa.me/${settings.phoneWhatsApp.replace(/[^0-9]/g, '') || '8801734144347'}?text=Hello!%20I%20have%20a%20question%20about%20Arpeggio%20membership.`;

  return (
    <section id="arpeggio-faq" className="py-24 bg-[#09090b] text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-300" />
              <span>POPULAR QUERIES // FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Quick and clear answers
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Everything you need to know about our sprints, 48-hour turnarounds, pausing policy, and async workflow.
          </p>
        </div>

        {/* 2-Column Layout: Accordion + Discovery Box */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion (8 Cols) */}
          <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
            {ARPEGGIO_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-6">
                  <button
                    onClick={() => toggleItem(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg sm:text-xl font-medium text-white group-hover:text-zinc-200 transition-colors">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 text-zinc-400 group-hover:border-white/30 group-hover:text-white transition-all">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Direct Support & Call Discovery Card (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6">
                <MessageCircle className="w-5 h-5" />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Still looking for answers or need a good chat?
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light leading-relaxed">
                Connect directly with our leadership team. We are happy to evaluate your project scope and recommend the right approach.
              </p>
            </div>

            <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
              <button
                onClick={onBookCall}
                className="w-full py-3.5 rounded-full bg-white text-black text-xs sm:text-sm font-bold tracking-tight hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Book a Discovery Call</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-white/[0.05] border border-white/10 text-xs sm:text-sm font-medium text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
