import React from 'react';
import { Play, Star, Quote, ArrowUpRight } from 'lucide-react';
import { ARPEGGIO_CLIENT_STORIES } from '../data/studioData';

interface ArpeggioTestimonialsProps {
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
  onBookCall: () => void;
}

export const ArpeggioTestimonials: React.FC<ArpeggioTestimonialsProps> = ({
  onOpenVideoModal,
  onBookCall
}) => {
  const featured = ARPEGGIO_CLIENT_STORIES[0];
  const otherStories = ARPEGGIO_CLIENT_STORIES.slice(1);

  return (
    <section id="arpeggio-testimonials" className="py-24 bg-[#09090b] text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 mb-4">
              <Quote className="w-3.5 h-3.5 text-zinc-300" />
              <span>CLIENT STORIES // TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Inspiring client experiences
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Join visionary tech founders, creative directors, and global enterprises who scaled their design capabilities with Arpeggio.
          </p>
        </div>

        {/* Featured Video Testimonial Card */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-950 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Quote and Author (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-mono text-zinc-400">Verified Client Story</span>
                </div>

                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-normal text-zinc-100 leading-snug tracking-tight">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <img
                  src={featured.avatar}
                  alt={featured.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="text-base font-semibold text-white">
                    {featured.name}
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    {featured.role} &bull; {featured.company}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Preview Card (5 cols) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video bg-black border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Deborah Keith Video Story"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                <button
                  onClick={() => onOpenVideoModal ? onOpenVideoModal('./videos/digital-exp.mp4', 'Deborah Keith — Nordvision Experience') : onBookCall()}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group-hover:bg-zinc-200"
                  aria-label="Play Client Story Video"
                >
                  <Play className="w-6 h-6 fill-black translate-x-0.5" />
                </button>
                <span className="mt-3 text-xs font-mono text-white/90">
                  Watch 60-Sec Client Story
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherStories.map((story) => (
            <div
              key={story.id}
              className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400/80 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400/80" />
                  ))}
                </div>

                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/15"
                />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {story.name}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500">
                    {story.role} &bull; {story.company}
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
