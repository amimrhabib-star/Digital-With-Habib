import { Copy } from './Copy';
import { useStudioContent } from '../context/StudioContentContext';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { PROCESS_STEPS } from '../data/studioData';

export const ProcessSection: React.FC = () => {
  const { content, settings } = useStudioContent();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const principles = content.sections.principles;

  return (
    <section id="process" className="py-24 sm:py-32 bg-white text-[var(--brand-ink)] border-t border-slate-200 relative overflow-hidden font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching video motion */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-slate-200 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-[var(--brand-primary)] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              <span><Copy id="Process Section · 01">Our Approach // The way we work</Copy></span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--brand-ink)] leading-tight"><Copy id="Process Section · 02">
              The way we work
            </Copy></h2>
          </div>

          <div className="max-w-md space-y-2 text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
            <p className="text-[var(--brand-ink)] font-bold"><Copy id="Process Section · 03">Simple steps, remarkable results.</Copy></p>
            <p><Copy id="Process Section · 04">
              Our approach combines strategic thinking with creative excellence. We listen first, understand your goals, and transform ideas into impactful digital experiences.
            </Copy></p>
          </div>
        </div>

        {/* 3 Editorial Posters / Visual Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md relative group">
            <img
              src={settings["ProcessSection image 1"]}
              alt="Artistic Research Poster"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-ink)]/90 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-mono text-blue-300 uppercase font-semibold"><Copy id="Process Section · 05">Phase 01</Copy></span>
              <h4 className="text-lg font-bold text-white"><Copy id="Process Section · 06">Discovery &amp; Strategy</Copy></h4>
            </div>
          </div>

          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md relative group">
            <img
              src={settings["ProcessSection image 2"]}
              alt="Design System Poster"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-ink)]/90 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-mono text-blue-300 uppercase font-semibold"><Copy id="Process Section · 07">Phase 02</Copy></span>
              <h4 className="text-lg font-bold text-white"><Copy id="Process Section · 08">Execution &amp; Design</Copy></h4>
            </div>
          </div>

          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md relative group">
            <img
              src={settings["ProcessSection image 3"]}
              alt="Production Deployment Poster"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-ink)]/90 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-mono text-blue-300 uppercase font-semibold"><Copy id="Process Section · 09">Phase 03</Copy></span>
              <h4 className="text-lg font-bold text-white"><Copy id="Process Section · 10">Production &amp; Launch</Copy></h4>
            </div>
          </div>
        </div>

        {/* Editorial Numbered Principles matching video layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-slate-200">
          <div className="lg:col-span-6 space-y-8">
            {principles.map((p) => (
              <div key={p.num} className="border-b border-slate-200 pb-6">
                <span className="text-sm font-mono text-[var(--brand-primary)] font-bold block mb-2">{p.num}</span>
                <h4 className="text-xl sm:text-2xl font-bold text-[var(--brand-ink)] tracking-tight">{p.title}</h4>
                <p className="text-sm text-slate-600 font-normal mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 bg-[var(--brand-surface)] p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--brand-primary)] font-semibold"><Copy id="Process Section · 11">Collaboration</Copy></span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--brand-ink)] tracking-tight leading-tight"><Copy id="Process Section · 12">
                Every project begins with understanding your unique needs.
              </Copy></h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed"><Copy id="Process Section · 13">
                Our collaborative process ensures clear communication, focused attention, and consistent quality—delivered by a dedicated team that's invested in your vision.
              </Copy></p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                <span><Copy id="Process Section · 14">48h Sprint Delivery</Copy></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span><Copy id="Process Section · 15">Direct Slack / WA</Copy></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                <span><Copy id="Process Section · 16">Unlimited Revisions</Copy></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span><Copy id="Process Section · 17">Pause or Cancel Anytime</Copy></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
