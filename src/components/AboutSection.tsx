import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe2, ShieldCheck, HeartHandshake, Zap, Target } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const AboutSection: React.FC = () => {
  const stats = [
    { value: '85+', label: 'Delivered Projects', sub: 'Across 14 countries' },
    { value: '99.4%', label: 'Client Satisfaction', sub: 'Long-term retainers' },
    { value: '$40M+', label: 'Client Value Created', sub: 'Funding & acquisitions' },
    { value: '100/100', label: 'Lighthouse Performance', sub: 'Speed & accessibility' },
  ];

  const values = [
    {
      title: 'Radical Clarity',
      desc: 'We discard unnecessary jargon and decorative fluff. Every pixel, word, and interaction exists to communicate value instantly.',
      icon: Target
    },
    {
      title: 'Design Engineering',
      desc: 'Designers who understand code, and engineers who care deeply about typography. We never produce mockups that cannot be realized in production.',
      icon: Zap
    },
    {
      title: 'Human-Centered Craft',
      desc: 'Behind every corporate interface is a human being trying to accomplish a goal. We design with empathy, warmth, and intuitive flow.',
      icon: HeartHandshake
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#146BFF] text-xs font-semibold uppercase tracking-wider mb-6 border border-blue-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Manifesto</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#071A41] tracking-[-0.03em] leading-[1.05] mb-8">
            We make digital work{' '}
            <span className="text-gradient-blue">easier to understand.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base sm:text-lg text-slate-600 leading-relaxed">
            <p>
              Founded with the conviction that high-growth companies deserve more than templated websites and disconnected agency departments, <strong className="text-[#071A41]">DWH Studio</strong> operates as an agile, high-caliber creative agency.
            </p>
            <p>
              By unifying brand strategy, bespoke UI/UX systems, production-grade Next.js development, and cinematic video into one synchronized discipline, we build digital flagships that convert traffic into loyal advocates.
            </p>
          </div>
        </div>

        {/* Animated Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 sm:p-12 rounded-[32px] bg-[#F7F9FC] border border-slate-200/80 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-[#146BFF] tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#071A41]">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Core Values 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-[#146BFF]/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#146BFF] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#071A41] mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
