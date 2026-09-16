import React from 'react';
import { 
  Check, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ArrowUpRight, 
  HeartHandshake,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const ArpeggioBentoGrid: React.FC = () => {
  return (
    <section id="arpeggio-benefits" className="py-24 bg-[#09090b] text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 mb-4">
              <Zap className="w-3.5 h-3.5 text-zinc-300" />
              <span>WHY CHOOSE US // ADVANTAGES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Partnership, Not Just Projects
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Skip the hiring maze and get an entire creative powerhouse at your fingertips. Monthly comprehensive package for unlimited opportunities.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: 48hr Fast Turnaround (Span 2 on desktop) */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">BENEFIT // 01</span>
              <div className="p-2 rounded-lg bg-white/[0.05] text-zinc-300">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <div className="my-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 text-xs font-mono mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Lightning Fast Turnaround</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Applications Kickoff in 48 Hours
              </h3>
              <p className="text-sm text-zinc-400 mt-2 max-w-md">
                From initial request to first usable deliverable in two days. Keep your engineering and marketing roadmaps moving at maximum velocity.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-4 border-t border-white/10">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active sprint updates delivered every 48 hours</span>
            </div>
          </div>

          {/* Card 2: Satisfaction Rate */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">BENEFIT // 02</span>
              <HeartHandshake className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="my-6">
              <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                99.4%
              </div>
              <div className="text-sm font-medium text-zinc-200 mt-2">
                Client Satisfaction Rate
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Measured across 140+ completed agency sprints.
              </p>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 pt-4 border-t border-white/10">
              Based on verified quarterly audits
            </div>
          </div>

          {/* Card 3: Affordable & Flat Pricing */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">BENEFIT // 03</span>
              <TrendingUp className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="my-6">
              <h3 className="text-xl font-semibold text-white tracking-tight">
                Predictable Flat Rates
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                No surprise invoice markups, hourly counters, or scope creep disputes. One fixed monthly fee.
              </p>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 pt-4 border-t border-white/10">
              Pause or cancel whenever needed
            </div>
          </div>

          {/* Card 4: Design Dashboard (Span 2 on desktop) */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">BENEFIT // 04</span>
              <div className="p-2 rounded-lg bg-white/[0.05] text-zinc-300">
                <Layers className="w-4 h-4" />
              </div>
            </div>

            <div className="my-6">
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                Your Centralized Design Dashboard
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Manage your backlog, review concepts, leave Figma comments, and track deliverable releases in real-time.
              </p>

              {/* Tool Integration Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {['Figma', 'Slack', 'Notion', 'Framer', 'Miro', 'Loom', 'GitHub'].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono text-zinc-500 pt-4 border-t border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Native integration with your existing workflow</span>
            </div>
          </div>

          {/* Card 5: Tools & Advanced Tech */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">BENEFIT // 05</span>
              <Cpu className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="my-6">
              <h3 className="text-xl font-semibold text-white tracking-tight">
                Cutting-Edge Stack
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                Leveraging the latest 3D software, WebGL, Tailwind, and React architectures for peak performance.
              </p>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 pt-4 border-t border-white/10">
              Zero legacy bloatware
            </div>
          </div>

          {/* Card 6: Dedicated Senior Assistance */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">BENEFIT // 06</span>
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="my-6">
              <div className="text-2xl font-bold text-white tracking-tight">
                99.9% Uptime
              </div>
              <div className="text-sm font-medium text-zinc-200 mt-1">
                Direct Senior Access
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Never handed down to junior designers or offshore contractors.
              </p>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 pt-4 border-t border-white/10">
              Senior Creative Directors only
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
