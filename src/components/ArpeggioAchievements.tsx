import { Copy } from './Copy';
import { CountUpMetric } from './CountUpMetric';
import { useStudioContent } from '../context/StudioContentContext';
import React from 'react';
import { motion } from 'motion/react';
import { Trophy, CheckCircle2, Star, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { ProjectItem } from '../types';

interface ArpeggioAchievementsProps {
  onOpenProject?: (project: ProjectItem) => void;
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
}

export const ArpeggioAchievements: React.FC<ArpeggioAchievementsProps> = () => {
  const { content } = useStudioContent();
  const stats = content.sections.metrics;

  const valuePillars = content.sections.valuePillars;

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[var(--brand-surface)] text-[var(--brand-ink)] border-t border-slate-200/80 relative overflow-hidden font-['Inter',sans-serif]">
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
              <Sparkles className="w-3.5 h-3.5" />
              <span><Copy id="Arpeggio Achievements · 01">Why Digital With Habib</Copy></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--brand-ink)] max-w-2xl leading-tight"><Copy id="Arpeggio Achievements · 02">
              Design that connects, </Copy><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-[#146BFF] to-[var(--brand-accent)]"><Copy id="Arpeggio Achievements · 03">
                experiences that last.
              </Copy></span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed"><Copy id="Arpeggio Achievements · 04">
            We focus on quality over quantity. Every project is handled with direct communication, thoughtful strategy and craft that elevates your business.
          </Copy></p>
        </motion.div>

        {/* 4 Stats Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = ({Trophy, Star, TrendingUp, Clock} as any)[stat.icon] || Star;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl border border-slate-200/90 bg-white hover:border-[var(--brand-primary)]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-xs group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400 font-semibold"><Copy id="Arpeggio Achievements · 05">
                    METRIC // 0</Copy>{idx + 1}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[var(--brand-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-[var(--brand-primary)]" />
                  </div>
                </div>

                <div className="my-6">
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--brand-primary)]">
                    <CountUpMetric value={String(stat.value)} delay={idx * 0.1} />
                  </div>
                  <div className="text-base font-bold text-[var(--brand-ink)] mt-2">
                    {stat.label}
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-500 pt-4 border-t border-slate-100">
                  {stat.sub}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Us Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {valuePillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 flex items-start gap-4"
            >
              <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-[var(--brand-ink)] mb-1">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
