import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  Settings2, 
  Check, 
  Edit3, 
  Film, 
  CheckCircle2,
  Tv
} from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface CinematicMotionVideoSectionProps {
  onOpenInquiry?: (service?: string) => void;
}

export const CinematicMotionVideoSection: React.FC<CinematicMotionVideoSectionProps> = ({ onOpenInquiry }) => {
  const { settings, updateSettings } = useStudioContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Editable settings from context or local fallbacks
  const [heading, setHeading] = useState(settings.cinematicVideoHeading || 'Watch Our Creative Process');
  const [badge, setBadge] = useState(settings.cinematicVideoBadge || 'Motion Branding');
  const [subtitle, setSubtitle] = useState(
    settings.cinematicVideoSubtitle || 'Digital Experience crafted with purposeful motion, high retention, and category-defining visual polish.'
  );
  const [autoPlay, setAutoPlay] = useState(settings.cinematicVideoAutoPlay !== undefined ? settings.cinematicVideoAutoPlay : true);
  
  // Playback states
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Editor toggle & save state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Scroll Trigger Animation: smooth zoom-in on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  const activeVideoUrl = settings.cinematicVideoUrl || settings.customHeroMotionUrl || settings.heroCardVideoUrl;

  useEffect(() => {
    if (videoRef.current) {
      if (autoPlay) {
        videoRef.current.play().catch(() => {
          // Autoplay policy might require mute
          setIsMuted(true);
          videoRef.current?.play().catch(() => {});
        });
      }
    }
  }, [autoPlay, activeVideoUrl]);

  const togglePlay = () => {
    if (!videoRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setCurrentTime(curr);
      setDuration(dur);
      setProgress((curr / dur) * 100);
    }
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      videoRef.current.currentTime = pct * duration;
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const url = event.target.result as string;
          updateSettings({ cinematicVideoUrl: url });
          triggerToast('Video updated & saved permanently!');
          setIsPlaying(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetVideo = () => {
    updateSettings({ cinematicVideoUrl: null });
    triggerToast('Video reset to default showcase.');
  };

  const handleSaveTextEdits = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      cinematicVideoHeading: heading,
      cinematicVideoBadge: badge,
      cinematicVideoSubtitle: subtitle,
      cinematicVideoAutoPlay: autoPlay
    });
    setIsEditorOpen(false);
    triggerToast('Video Section settings saved permanently!');
  };

  const triggerToast = (msg: string) => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2400);
  };

  return (
    <section
      id="cinematic-motion-showcase"
      ref={containerRef}
      className="py-24 sm:py-32 bg-[#030B1A] relative overflow-hidden text-white select-none border-b border-white/10"
    >
      {/* Hidden File Input for Video Replacement */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleVideoUpload}
        className="hidden"
      />

      {/* Save Notification Toast */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Changes permanently saved!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Soft Glowing Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#146BFF]/20 via-[#00D2FF]/20 to-[#60A5FA]/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#146BFF]/15 blur-[110px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Admin Action Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#146BFF]/20 border border-[#146BFF]/40 text-[#60A5FA] text-xs font-bold uppercase tracking-wider mb-4 shadow-lg backdrop-blur-md"
            >
              <Film className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>{settings.cinematicVideoBadge || badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]"
            >
              {(settings.cinematicVideoHeading || heading).split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#146BFF] to-[#60A5FA]">
                {(settings.cinematicVideoHeading || heading).split(' ').slice(-1).join(' ')}
              </span>
            </motion.h2>

            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-xl">
              {settings.cinematicVideoSubtitle || subtitle}
            </p>
          </div>

          {/* Quick Edit & Video Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditorOpen(!isEditorOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 backdrop-blur-md transition-all"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>{isEditorOpen ? 'Close Editor' : 'Edit Text & Video'}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-lg shadow-[#146BFF]/30 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Replace Video (.mp4)</span>
            </button>
          </div>
        </div>

        {/* Expandable Editor Panel */}
        <AnimatePresence>
          {isEditorOpen && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSaveTextEdits}
              className="mb-10 p-6 sm:p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Video Showcase Settings (Permanently Saved)
                </span>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Settings</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-xs font-bold text-white focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-xs font-bold text-white focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Subtitle / Concept
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-xs font-medium text-slate-200 focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Autoplay toggle and reset option */}
              <div className="flex flex-wrap items-center justify-between pt-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200">
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={(e) => setAutoPlay(e.target.checked)}
                    className="w-4 h-4 rounded text-[#146BFF] focus:ring-0 cursor-pointer"
                  />
                  <span>Enable Auto-Play on Load</span>
                </label>

                {settings.cinematicVideoUrl && (
                  <button
                    type="button"
                    onClick={handleResetVideo}
                    className="text-xs text-rose-300 hover:text-rose-200 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default Video Reel</span>
                  </button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* LARGE ROUNDED VIDEO CONTAINER WITH GLASS BORDER & SMOOTH ZOOM-IN ON SCROLL */}
        <motion.div
          style={{ scale, opacity }}
          className={`relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-black/90 border-2 border-white/20 shadow-[0_20px_80px_-15px_rgba(20,107,255,0.35)] backdrop-blur-2xl group transition-all duration-500 ${
            isFullscreen ? 'fixed inset-4 z-50 rounded-2xl m-0 max-h-none' : 'aspect-[16/9] max-h-[720px]'
          }`}
        >
          {/* Subtle Outer Neon Rim */}
          <div className="absolute -inset-0.5 rounded-[34px] sm:rounded-[46px] bg-gradient-to-r from-[#146BFF]/40 via-[#00D2FF]/40 to-[#60A5FA]/40 -z-10 blur-sm pointer-events-none" />

          {/* HTML5 Video or Interactive Motion Player */}
          {activeVideoUrl ? (
            <video
              ref={videoRef}
              src={activeVideoUrl}
              autoPlay={autoPlay}
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Cinematic Motion Canvas Simulation if no external file uploaded yet */
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#06142D] to-[#020714] overflow-hidden">
              
              {/* Background ambient light waves */}
              <motion.div
                animate={{
                  scale: isPlaying ? [1, 1.25, 1] : 1,
                  rotate: isPlaying ? 360 : 0
                }}
                transition={{
                  scale: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 40, ease: 'linear' }
                }}
                className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#146BFF]/30 via-[#00D2FF]/20 to-transparent blur-[80px] pointer-events-none"
              />

              {/* Dynamic Kinetic Brand Motion Sequence */}
              <div className="relative z-10 text-center px-6 max-w-2xl space-y-6">
                
                {/* Monogram Pulse */}
                <motion.div
                  animate={{
                    scale: isPlaying ? [1, 1.06, 1] : 1
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut'
                  }}
                  className="w-24 sm:w-28 h-24 sm:h-28 mx-auto rounded-3xl bg-gradient-to-br from-[#146BFF] to-[#00D2FF] p-0.5 shadow-[0_0_50px_rgba(20,107,255,0.7)] flex items-center justify-center"
                >
                  <div className="w-full h-full rounded-[22px] bg-[#071A41]/90 backdrop-blur-md flex items-center justify-center text-white font-black text-2xl tracking-tighter">
                    DWH
                  </div>
                </motion.div>

                <div>
                  <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#00D2FF] mb-2">
                    KINETIC MOTION SHOWREEL
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Every Frame Has A Purpose.
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-md mx-auto">
                    Transforming brand vision into cinematic retention and high-impact digital experiences.
                  </p>
                </div>

                {/* Animated Audio Equalizer Bar */}
                <div className="h-10 flex items-center justify-center gap-1.5 max-w-xs mx-auto">
                  {[30, 65, 90, 45, 100, 75, 40, 85, 95, 60, 35, 70, 90, 50].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[#146BFF] to-[#00D2FF] rounded-full"
                      animate={{
                        height: isPlaying ? [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] : '25%'
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.7 + (i % 4) * 0.1,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </div>

              </div>

            </div>
          )}

          {/* FUTURISTIC PLAY BUTTON (Glass & Pulsing Glow) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.button
              type="button"
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto relative w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_0_40px_rgba(20,107,255,0.6)] flex items-center justify-center text-white transition-all group/btn"
              title={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {/* Outer Pulse Ring */}
              <div className="absolute -inset-2 rounded-full border border-white/30 animate-ping pointer-events-none opacity-40" />

              {isPlaying ? (
                <Pause className="w-8 h-8 text-white fill-white" />
              ) : (
                <Play className="w-8 h-8 text-white fill-white translate-x-1" />
              )}
            </motion.button>
          </div>

          {/* Top Video Overlay Bar */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 pointer-events-auto">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-xs text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold tracking-wide uppercase text-[11px]">
                {activeVideoUrl ? 'Custom Video Source' : 'Studio Reel Master 4K'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/15 text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/15 text-white transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Bottom Interactive Progress Scrubber */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20">
            <div
              onClick={handleScrubberClick}
              className="w-full h-2 bg-white/20 hover:h-3 rounded-full overflow-hidden mb-3 cursor-pointer transition-all"
              title="Click to seek"
            >
              <div
                className="h-full bg-gradient-to-r from-[#146BFF] via-[#00D2FF] to-white rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="text-[#00D2FF] font-mono font-bold">
                  {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
                </span>
                <span>/</span>
                <span className="font-mono text-slate-400">
                  {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-semibold"
                >
                  <Upload className="w-3 h-3 text-[#00D2FF]" />
                  <span>Replace Video</span>
                </button>

                {onOpenInquiry && (
                  <button
                    onClick={() => onOpenInquiry('Motion Branding')}
                    className="px-3 py-1 rounded-lg bg-[#146BFF] hover:bg-[#0052FF] text-white text-[11px] font-bold"
                  >
                    Start Motion Project
                  </button>
                )}
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
