import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../types';
import { useStudioContent } from '../context/StudioContentContext';
import { ARPEGGIO_FLAGSHIP_PROJECTS } from '../data/studioData';

interface ArpeggioHeroProps {
  onOpenInquiry: (planOrService?: string) => void;
  onOpenProject: (project: ProjectItem) => void;
  onNavigate: (page: string) => void;
  onOpenVideoModal?: (videoUrl: string, title: string) => void;
}

export const ArpeggioHero: React.FC<ArpeggioHeroProps> = ({
  onOpenInquiry,
  onOpenProject,
  onNavigate,
  onOpenVideoModal
}) => {
  const { settings } = useStudioContent();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const videoSource = settings.customHeroMotionUrl || './videos/digital-exp.mp4';
  const activeProject = ARPEGGIO_FLAGSHIP_PROJECTS[activeProjectIndex] || ARPEGGIO_FLAGSHIP_PROJECTS[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="arpeggio-hero" className="relative pt-32 pb-20 overflow-hidden bg-[#09090b] text-white">
      {/* Background subtle grid and radial glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Frame with Corner Crosshairs */}
        <div className="relative border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-14 bg-zinc-950/40 backdrop-blur-xs">
          {/* Corner Crosshair Pluses */}
          <div className="absolute -top-2.5 -left-2.5 text-zinc-500 font-mono text-sm select-none pointer-events-none">+</div>
          <div className="absolute -top-2.5 -right-2.5 text-zinc-500 font-mono text-sm select-none pointer-events-none">+</div>
          <div className="absolute -bottom-2.5 -left-2.5 text-zinc-500 font-mono text-sm select-none pointer-events-none">+</div>
          <div className="absolute -bottom-2.5 -right-2.5 text-zinc-500 font-mono text-sm select-none pointer-events-none">+</div>

          {/* Top Eyebrow Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>One subscription, unlimited design iterations.</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Freedom beyond the traditional project scope
            </p>
          </div>

          {/* Main Giant Display Headline */}
          <div className="py-10 sm:py-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-[-0.04em] leading-[1.05] text-white max-w-5xl"
            >
              Design that captivates today &amp; inspires tomorrow.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4"
            >
              <button
                id="hero-explore-plans-btn"
                onClick={() => onNavigate('membership')}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-tight hover:bg-zinc-200 transition-all active:scale-95"
              >
                <span>Explore Plans</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                id="hero-view-work-btn"
                onClick={() => onNavigate('work')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-white text-sm font-semibold tracking-tight hover:bg-white/10 hover:border-white/30 transition-all active:scale-95"
              >
                <span>View Selected Work</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>

              <div className="hidden md:flex items-center gap-3 ml-auto text-xs font-mono text-zinc-400">
                <span>Available for Q2 2025 Sprints</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </motion.div>
          </div>

          {/* Video Showcase Player Card */}
          <div className="mt-6 relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video max-h-[560px] group shadow-2xl">
            <video
              ref={videoRef}
              src={videoSource}
              loop
              muted={isMuted}
              autoPlay
              playsInline
              className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Video Overlay Top Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Showreel 2025 &bull; Spatial &amp; Motion</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-400 hidden sm:block">
                HD 60FPS
              </div>
            </div>

            {/* Video Controls Bar Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between gap-4">
              {/* Progress Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-colors"
                  aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-colors"
                  aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {onOpenVideoModal && (
                <button
                  onClick={() => onOpenVideoModal(videoSource, 'Arpeggio Studio 2025 Showreel')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white text-xs font-mono backdrop-blur-md transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen Reel</span>
                </button>
              )}
            </div>
          </div>

          {/* Project Highlights Mini Carousel Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARPEGGIO_FLAGSHIP_PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => onOpenProject(project)}
                className="cursor-pointer group p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                  <span>0{idx + 1} &bull; {project.client}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                  {project.tag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
