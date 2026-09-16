import React from 'react';
import { ArrowUpRight, Sparkles, Layers, Code, CheckCircle2 } from 'lucide-react';

interface ArpeggioServicesProps {
  onNavigate: (page: string) => void;
  onOpenInquiry: (serviceName?: string) => void;
}

export const ArpeggioServices: React.FC<ArpeggioServicesProps> = ({
  onNavigate,
  onOpenInquiry
}) => {
  const pillars = [
    {
      number: '01',
      title: 'Branding',
      tagline: 'Distinct visual identities that command instant market authority.',
      icon: Sparkles,
      capabilities: [
        'Brand Strategy',
        'Brand Identity',
        'Visual Identity',
        'Style Foundation',
        'Art Direction',
        'Brand Guidelines'
      ]
    },
    {
      number: '02',
      title: 'Digital',
      tagline: 'High-retention interfaces, kinetic interactions, and spatial products.',
      icon: Layers,
      capabilities: [
        'Digital Strategy',
        'UX Design',
        'Concept Design',
        'Website & Mobile Design',
        'User Testing',
        'Motion Design'
      ]
    },
    {
      number: '03',
      title: 'Development',
      tagline: 'Pixel-perfect code, lightning animations, and responsive production engines.',
      icon: Code,
      capabilities: [
        'Full Stack Development',
        'Framer Development',
        'Website Development',
        'CMS Integration',
        'SEO Optimization',
        'UI/UX Check'
      ]
    }
  ];

  return (
    <section id="arpeggio-services" className="py-24 bg-[#09090b] text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 mb-4">
              <span>CORE CAPABILITIES // WHAT WE DO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
              What we do
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Perfectly aligned creative and production expertise to increase digital impact and build lasting brand value.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="relative rounded-2xl border border-white/10 bg-zinc-950/60 p-8 flex flex-col justify-between group hover:border-white/25 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="text-xs font-mono text-zinc-500">
                      PILLAR // {pillar.number}
                    </span>
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mt-6 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light">
                    {pillar.tagline}
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                      Included Deliverables
                    </div>
                    <ul className="space-y-2.5">
                      {pillar.capabilities.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10">
                  <button
                    onClick={() => onOpenInquiry(pillar.title)}
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <span>Inquire About {pillar.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('work')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-tight hover:bg-zinc-200 transition-all active:scale-95"
          >
            <span>View Our Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('membership')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-white text-sm font-semibold tracking-tight hover:bg-white/10 transition-all active:scale-95"
          >
            <span>Explore Membership Plans</span>
          </button>
        </div>
      </div>
    </section>
  );
};
