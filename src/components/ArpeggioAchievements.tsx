import React from 'react';
import { motion } from 'motion/react';
import { Award, ArrowUpRight, Play, Trophy, Star } from 'lucide-react';
import { ARPEGGIO_AWARDS, ARPEGGIO_METRICS, ARPEGGIO_FLAGSHIP_PROJECTS } from '../data/studioData';
import { ProjectItem } from '../types';

interface ArpeggioAchievementsProps {
  onOpenProject: (project: ProjectItem) => void;
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
}

export const ArpeggioAchievements: React.FC<ArpeggioAchievementsProps> = ({
  onOpenProject,
  onOpenVideoModal
}) => {
  const featuredBoreal = ARPEGGIO_FLAGSHIP_PROJECTS.find(p => p.id === 'boreal-vr-headset') || ARPEGGIO_FLAGSHIP_PROJECTS[0];

  return (
    <section id="arpeggio-achievements" className="py-24 bg-[#09090b] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 mb-4">
              <Trophy className="w-3.5 h-3.5 text-zinc-300" />
              <span>OUR ACHIEVEMENTS &bull; METRICS &amp; MILESTONES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white max-w-2xl leading-tight">
              Behind every statistic pulses a human story.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Transforming brands and digital products through rigorous craftsmanship, obsessive attention to detail, and measurable market impact.
          </p>
        </div>

        {/* Featured Award Showcase & Dynamic Stats Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Award Box (5 Cols) */}
          <div className="lg:col-span-5 relative rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between overflow-hidden group">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  Featured Recognition 2024
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[11px] font-mono">
                  ★ Gold Trophy
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white mt-4 tracking-tight">
                Best Integrated Campaign 2024
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Honoring the global hardware reveal, spatial UI system, and interactive WebGL launch for Nordvision Boreal VR.
              </p>
            </div>

            {/* Video preview thumbnail */}
            <div className="my-6 relative rounded-xl overflow-hidden aspect-video border border-white/10 bg-black">
              <img
                src={featuredBoreal.coverImage}
                alt="Boreal VR Headset Award Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => onOpenVideoModal ? onOpenVideoModal('/videos/digital-exp.mp4', 'Boreal VR Award Reel') : onOpenProject(featuredBoreal)}
                  className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                  aria-label="Play Award Showcase Reel"
                >
                  <Play className="w-5 h-5 fill-black translate-x-0.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => onOpenProject(featuredBoreal)}
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <span>View Boreal Project Case</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono text-zinc-500">Awwwards &bull; Red Dot</span>
            </div>
          </div>

          {/* Metrics Bento Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ARPEGGIO_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div className="font-mono text-xs text-zinc-500">
                  METRIC // 0{idx + 1}
                </div>
                <div className="my-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-zinc-200 mt-1">
                    {metric.label}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infinite International Awards Ticker */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Accredited International Distinctions
            </span>
            <span className="text-xs font-mono text-zinc-400">
              51+ Industry Honors
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ARPEGGIO_AWARDS.map((award, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                  <span>{award.year}</span>
                </div>
                <h4 className="text-xs font-medium text-white mt-2 leading-snug">
                  {award.name}
                </h4>
                <div className="text-[11px] font-mono text-zinc-500 mt-2">
                  {award.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
