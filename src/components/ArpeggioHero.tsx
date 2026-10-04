import { Copy } from './Copy';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { ProjectItem } from '../types';
import { useStudioContent } from '../context/StudioContentContext';
import { Movable3DLogo } from './Movable3DLogo';

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

  const videoSource = settings.heroCardVideoUrl || '/videos/digital-exp.mp4';

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
  }, [videoSource]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section 
      id="arpeggio-hero" 
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-8 sm:pt-14 pb-16 overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#EDF5FF] to-white text-[var(--brand-ink)]"
    >
      {/* ========================================================================= */}
      {/* BACKGROUND ATMOSPHERE: ICE-BLUE CELESTIAL HORIZON (REFERENCE PHOTO 1)     */}
      {/* ========================================================================= */}
      {/* Curved Glowing Horizon Arc at the Top */}
      <div className="absolute -top-36 sm:-top-48 left-1/2 -translate-x-1/2 w-[1400px] h-[340px] pointer-events-none">
        <div className="w-full h-full rounded-[100%] border-b-[2px] border-cyan-300/60 shadow-[0_15px_50px_rgba(0,210,255,0.35),0_0_90px_rgba(0,82,255,0.2)] bg-radial from-[#FFFFFF] via-[#E2F2FF] to-transparent opacity-90" />
      </div>

      {/* Atmospheric Soft Light Rays & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[var(--brand-primary)]/10 via-[var(--brand-accent)]/15 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-[var(--brand-accent)]/12 to-transparent blur-[90px] pointer-events-none" />
      
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Main Viewport Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* ======================================================================= */}
        {/* TWO COLUMN HERO: HEADLINE ON LEFT & 3D ICON ON RIGHT (PHOTO 3)          */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-6 sm:py-10">
          
          {/* LEFT COLUMN: VERY LARGE HEADLINE, SUBTITLE, CREATIVE GLASS BUTTONS */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-20">
            
            {/* Very Large Headline - Strictly 3 Lines as requested */}
            <h1 className="text-[clamp(2rem,6vw,3.8rem)] lg:text-[3.8rem] xl:text-[4.65rem] font-black tracking-[-0.04em] leading-[1.04] text-[var(--brand-ink)] max-w-2xl">
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[var(--brand-ink)] "
                >
                  {settings.heroHeadline}
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[var(--brand-primary)] "
                >
                  {settings.heroLine2}
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[var(--brand-primary)] "
                >
                  {settings.heroLine3}
                </motion.span>
              </div>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-xl"
            >
              {settings.heroSubtitle}
            </motion.p>

            {/* Creative Glassmorphism Bold Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              {/* Primary Creative Glassmorphism Bold Cobalt Button */}
              <button
                id="hero-explore-plans-btn"
                onClick={() => onOpenInquiry('Start a Project')}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[var(--brand-primary)] via-[#146BFF] to-[var(--brand-accent)] text-white font-black text-sm sm:text-base tracking-tight shadow-[0_12px_32px_rgba(0,82,255,0.38)] hover:shadow-[0_18px_45px_rgba(0,82,255,0.5)] border border-white/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer overflow-hidden flex items-center gap-2.5"
              >
                {/* Specular light sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span><Copy id="Arpeggio Hero · 01">Start a Project</Copy></span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Secondary Creative Glassmorphism Frosted Button */}
              <button
                id="hero-view-work-btn"
                onClick={() => onNavigate('work')}
                className="group px-8 py-4 rounded-full bg-white/85 hover:bg-white text-[var(--brand-ink)] hover:text-[var(--brand-primary)] font-black text-sm sm:text-base tracking-tight border border-slate-200/90 hover:border-[var(--brand-primary)]/40 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,82,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span><Copy id="Arpeggio Hero · 02">View Our Work</Copy></span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-[var(--brand-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: LARGE GLOSSY TRANSPARENT 3D BRAND ICON */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center"
            >
              <Movable3DLogo onOpenInquiry={() => onOpenInquiry('Hero 3D Logo Inquiry')} />
            </motion.div>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* TEXT-LESS VIDEO SHOWCASE WITH ICE-BLUE AMBIENT FRAME                    */}
        {/* ======================================================================= */}
        <div className="hero-full-width-reel mt-12 sm:mt-16">
          <div
            data-cursor="play"
            className="relative w-full overflow-hidden bg-slate-950 aspect-video group"
          >
            {/* Pure video player without overlay title or text stamps */}
            <video
              ref={videoRef}
              src={videoSource}
              loop
              muted={isMuted}
              autoPlay={!window.matchMedia('(prefers-reduced-motion: reduce)').matches}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playsInline
              className="w-full h-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Video Controls Bar Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-center justify-between gap-4">
              {/* Progress Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20">
                <div
                  className="h-full bg-[var(--brand-primary)] transition-all duration-100"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {onOpenVideoModal && (
                <button
                  aria-label="Play fullscreen showreel" onClick={() => onOpenVideoModal(videoSource, 'Digital With Habib Cinematic Showcase')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white text-xs font-mono backdrop-blur-md transition-colors cursor-pointer"
                >
                  <Maximize2 aria-hidden="true" className="w-3.5 h-3.5" />
                  
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
