import { Copy } from './Copy';
import { useStudioContent } from '../context/StudioContentContext';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Sparkles, Layout, Code2, Video, CheckCircle2, Smartphone, Layers } from 'lucide-react';

interface ArpeggioServicesProps {
  onNavigate?: (page: string) => void;
  onOpenInquiry: (serviceName?: string) => void;
}

export const ArpeggioServices: React.FC<ArpeggioServicesProps> = ({
  onNavigate,
  onOpenInquiry
}) => {
  const { content } = useStudioContent();
  const services = content.sections.services;
  const reducedMotion = useReducedMotion();

  return (
    <section id="services" className="services-glass-section py-24 sm:py-32 bg-white text-[var(--brand-ink)] border-t border-slate-200/80 relative font-['Inter',sans-serif]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-[var(--brand-primary)] mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span><Copy id="Arpeggio Services · 01">Services</Copy></span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--brand-ink)] leading-tight"><Copy id="Arpeggio Services · 02">
              Design and digital services </Copy><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-[#146BFF] to-[var(--brand-accent)]"><Copy id="Arpeggio Services · 03">
                to help your brand grow.
              </Copy></span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed"><Copy id="Arpeggio Services · 04">
            We combine design, strategy and technology to create digital experiences that look great, work smoothly and solve real problems.
          </Copy></p>
        </motion.div>

        {/* 4 Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = ({Layers, Smartphone, Sparkles, Layout, Code2, Video} as any)[service.icon] || Layers;
            return (
              <motion.div
                key={service.id}
                initial={reducedMotion ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.5, delay: idx * 0.08, y: { type: 'spring', stiffness: 210, damping: 24 } }}
                className="service-glass-card relative rounded-2xl p-8 sm:p-10 flex flex-col justify-between group"

              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                    <span className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider"><Copy id="Arpeggio Services · 05">
                      Service // </Copy>{service.number}
                    </span>
                    <div className="service-glass-icon w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[var(--brand-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <motion.h3 className="service-motion-title text-2xl sm:text-3xl font-extrabold mt-6 tracking-tight" initial={reducedMotion ? false : {opacity:0,y:12,filter:'blur(5px)'}} whileInView={{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,amount:0.5}} transition={{duration:0.65,delay:idx*0.05}}>
                    {service.title}
                  </motion.h3>

                  <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2"><Copy id="Arpeggio Services · 06">
                      Key Deliverables & Capabilities
                    </Copy></div>
                    {service.points.map((point, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--brand-primary)] group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span><Copy id="Arpeggio Services · 07">Discuss </Copy>{service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global CTA Button */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => onOpenInquiry('General Services Inquiry')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[#0047E0] text-white font-bold text-sm tracking-tight shadow-xl shadow-[var(--brand-primary)]/25 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <span><Copy id="Arpeggio Services · 08">Discuss Your Project</Copy></span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
