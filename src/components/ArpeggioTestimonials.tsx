import { Copy } from './Copy';
import {useStudioContent} from '../context/StudioContentContext';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Star, Quote, Edit3, X, Upload, RotateCcw, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { ARPEGGIO_CLIENT_STORIES } from '../data/studioData';

interface ClientStoryItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  hasVideo?: boolean;
  videoUrl?: string;
  videoPoster?: string;
}

interface ArpeggioTestimonialsProps {
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
  onBookCall: () => void;
}

const DEFAULT_VIDEO_POSTER = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80';

export const ArpeggioTestimonials: React.FC<ArpeggioTestimonialsProps> = ({
  onOpenVideoModal,
  onBookCall
}) => {
  const {content}=useStudioContent();
  const stories=content.stories as ClientStoryItem[];
  const featured: ClientStoryItem = stories[0];
  const otherStories = stories.slice(1);

  if(!featured) return null;
  return (
    <section id="arpeggio-testimonials" className="py-24 bg-white text-[var(--brand-ink)] border-t border-slate-200/80 relative font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Edit Stories Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-[var(--brand-primary)] mb-4">
              <Quote className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span><Copy id="Arpeggio Testimonials · 01">CLIENT STORIES // TESTIMONIALS</Copy></span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--brand-ink)] leading-tight"><Copy id="Arpeggio Testimonials · 02">
              Inspiring client experiences
            </Copy></h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed"><Copy id="Arpeggio Testimonials · 03">
              Join visionary tech founders, creative directors, and global enterprises who scaled their design capabilities with our team.
            </Copy></p>

            
          </div>
        </div>

        {/* Featured Video Testimonial Card */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-[var(--brand-surface)] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xs group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Quote and Author (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-mono text-slate-500 font-semibold"><Copy id="Arpeggio Testimonials · 05">Verified Client Story</Copy></span>
                </div>

                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--brand-ink)] leading-snug tracking-tight"><Copy id="Arpeggio Testimonials · 06">
                  &ldquo;</Copy>{featured.quote}<Copy id="Arpeggio Testimonials · 07">&rdquo;
                </Copy></blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={featured.avatar}
                    alt={featured.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="text-base font-extrabold text-[var(--brand-ink)]">
                      {featured.name}
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      {featured.role}<Copy id="Arpeggio Testimonials · 08"> &bull; </Copy><span className="text-[var(--brand-primary)] font-bold">{featured.company}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Edit Trigger */}
                
              </div>
            </div>

            {/* Video Preview Card (5 cols) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-slate-200 group/video shadow-md">
              <img
                src={featured.videoPoster || DEFAULT_VIDEO_POSTER}
                alt={`${featured.name} Video Story`}
                className="w-full h-full object-cover opacity-80 group-hover/video:opacity-95 transition-opacity"
              />
              <div className="absolute inset-0 bg-[var(--brand-ink)]/40 flex flex-col items-center justify-center p-4">
                <button
                  disabled={!featured.hasVideo || !featured.videoUrl}
                  onClick={() => featured.videoUrl && onOpenVideoModal?.(featured.videoUrl, `${featured.name} — Experience`)}
                  className="w-16 h-16 rounded-full bg-white text-[var(--brand-primary)] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group-hover/video:bg-blue-50 cursor-pointer"
                  aria-label="Play Client Story Video"
                >
                  <Play className="w-6 h-6 fill-[var(--brand-primary)] translate-x-0.5" />
                </button>
                <span className="mt-3 text-xs font-mono text-white font-semibold"><Copy id="Arpeggio Testimonials · 09">
                  Watch 60-Sec Client Story
                </Copy></span>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherStories.map((story) => (
            <div
              key={story.id}
              className="rounded-2xl border border-slate-200 bg-[var(--brand-surface)] p-6 sm:p-8 flex flex-col justify-between hover:border-blue-300 hover:bg-white hover:shadow-md transition-all shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  
                </div>

                <p className="text-sm text-slate-700 font-normal leading-relaxed"><Copy id="Arpeggio Testimonials · 10">
                  &ldquo;</Copy>{story.quote}<Copy id="Arpeggio Testimonials · 11">&rdquo;
                </Copy></p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <div className="text-sm font-bold text-[var(--brand-ink)]">
                    {story.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 font-medium">
                    {story.role}<Copy id="Arpeggio Testimonials · 12"> &bull; </Copy><span className="text-[var(--brand-primary)] font-semibold">{story.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
