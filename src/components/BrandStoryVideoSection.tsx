import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Upload,
  Sparkles,
  Film,
  CheckCircle2,
  X,
  Link,
  Layers,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { fileToDataUrl } from '../utils/persistentStorage';

interface StoryTrack {
  id: string;
  name: string;
  category: string;
  defaultVideo: string;
  tagline: string;
  aspect: string;
}

const STORY_TRACKS: StoryTrack[] = [
  {
    id: 'brand-film',
    name: 'Brand Systems',
    category: 'Brand Architecture',
    defaultVideo: './videos/brand-systems.mp4',
    tagline: 'Sculpting unforgettable identities and geometric design systems.',
    aspect: '16:9'
  },
  {
    id: 'digital-exp',
    name: 'Digital Experiences',
    category: 'Web & Product UI',
    defaultVideo: './videos/digital-exp.mp4',
    tagline: 'High-conversion eCommerce & fluid web platforms built to scale.',
    aspect: '16:9'
  },
  {
    id: 'creative-sol',
    name: 'Creative Solutions',
    category: 'Campaign & Strategy',
    defaultVideo: './videos/creative-sol.mp4',
    tagline: 'Strategic art direction, packaging, and commercial positioning.',
    aspect: '16:9'
  },
  {
    id: 'motion-3d',
    name: '3D Motion',
    category: 'Motion Design',
    defaultVideo: './videos/motion-3d.mp4',
    tagline: 'World-class 3D product visualizations and kinetic social reels.',
    aspect: '16:9'
  }
];

export const BrandStoryVideoSection: React.FC = () => {
  const { settings, updateBrandStoryVideo } = useStudioContent();

  const [activeTrackId, setActiveTrackId] = useState<string>('brand-film');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [duration, setDuration] = useState<string>('0:00');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadUrlInput, setUploadUrlInput] = useState<string>('');
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeTrack = STORY_TRACKS.find(t => t.id === activeTrackId) || STORY_TRACKS[0];

  // If user has uploaded a custom video (data: or custom url not matching defaults), use it; otherwise use active track default video
  const isCustomUploaded = settings.brandStoryVideoUrl && !STORY_TRACKS.some(t => t.defaultVideo === settings.brandStoryVideoUrl) && !settings.brandStoryVideoUrl.includes('mixkit.co');
  const currentVideoSrc = isCustomUploaded ? settings.brandStoryVideoUrl : activeTrack.defaultVideo;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((curr / dur) * 100);

    const format = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    setCurrentTime(format(curr));
    setDuration(format(dur));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = percent * (videoRef.current.duration || 1);
    setProgress(percent * 100);
  };

  const handleSpeedChange = () => {
    if (!videoRef.current) return;
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen?.();
    }
  };

  // Video File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Size limit recommendation: 50MB
    if (file.size > 50 * 1024 * 1024) {
      alert('For smooth in-browser playback, please choose a video under 50MB or enter a direct MP4/WebM URL.');
      return;
    }

    setUploadLoading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      updateBrandStoryVideo(dataUrl);
      setShowUploadModal(false);
      setUploadSuccessToast('Custom video uploaded successfully! Saved permanently.');
      setTimeout(() => setUploadSuccessToast(null), 4000);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } catch {
      alert('Could not process video file. Please try a different MP4 or paste a video link.');
    } finally {
      setUploadLoading(false);
    }
  };

  // Video URL Input Handler
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrlInput.trim()) return;

    updateBrandStoryVideo(uploadUrlInput.trim());
    setShowUploadModal(false);
    setUploadUrlInput('');
    setUploadSuccessToast('Video link applied and saved!');
    setTimeout(() => setUploadSuccessToast(null), 4000);

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleResetToAgencyDefault = () => {
    updateBrandStoryVideo(activeTrack.defaultVideo);
    setShowUploadModal(false);
    setUploadSuccessToast('Reset to default agency showcase video.');
    setTimeout(() => setUploadSuccessToast(null), 4000);
  };

  // When switching from one bar to another
  const handleBarChange = (trackId: string) => {
    setActiveTrackId(trackId);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Text Animation Tokens
  const headlineWords = [
    { text: 'Behind', highlight: false },
    { text: 'Every', highlight: false },
    { text: 'Great', highlight: true },
    { text: 'Brand', highlight: true },
    { text: 'Is', highlight: false },
    { text: 'A', highlight: false },
    { text: 'Great', highlight: true },
    { text: 'Story.', highlight: true }
  ];

  return (
    <section
      id="brand-story-video-showcase"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-[#F4F8FD] to-[#EDF4FC] text-[#071A41] overflow-hidden"
    >
      {/* Dynamic World-Class Ambient Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#00D2FF]/15 rounded-full blur-[140px] opacity-70" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#0052FF]/10 rounded-full blur-[120px]" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#0052FF 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow & Upload Option Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-blue-200/70 shadow-[0_4px_16px_rgba(0,102,255,0.08)] backdrop-blur-md self-start"
          >
            <Film className="w-4 h-4 text-[#0052FF] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF]">
              Agency Creative Showcase
            </span>
          </motion.div>

          {/* Video Upload / Replace Trigger Button */}
          <motion.button
            id="open-video-upload-btn"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowUploadModal(true)}
            className="btn-futuristic-secondary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-sm backdrop-blur-md self-start sm:self-auto group cursor-pointer"
            aria-label="Upload or replace showcase video"
          >
            <Upload className="w-3.5 h-3.5 text-[#0052FF] group-hover:text-white transition-colors" />
            <span>Upload Showcase Video</span>
          </motion.button>
        </div>

        {/* ================= WORLD-CLASS KINETIC HEADLINE ANIMATION ================= */}
        <div className="mb-8">
          <h2
            id="brand-story-animated-headline"
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] max-w-5xl"
          >
            <span className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2">
              {headlineWords.map((word, idx) => (
                <span
                  key={`${word.text}-${idx}`}
                  className="inline-block overflow-hidden py-0.5"
                >
                  <motion.span
                    key={`${word.text}-${idx}-${activeTrackId}`}
                    initial={{ y: '120%', opacity: 0, rotate: 4 }}
                    animate={{ y: '0%', opacity: 1, rotate: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.045,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`inline-block ${
                      word.highlight
                        ? 'bg-gradient-to-r from-[#0052FF] via-[#0077FF] to-[#00D2FF] bg-clip-text text-transparent font-black drop-shadow-sm'
                        : 'text-[#071A41]'
                    }`}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </span>
          </h2>

          {/* Animated Subtitle that reacts to bar clicks and scrolling */}
          <motion.p
            key={`subtitle-${activeTrackId}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
            className="mt-4 text-base sm:text-xl text-slate-600 font-normal max-w-3xl leading-relaxed"
          >
            Watch how we create brands, digital experiences and creative solutions.
          </motion.p>
        </div>

        {/* ================= INTERACTIVE ANIMATED BAR SELECTOR ================= */}
        {/* World-class motion: Clicking one bar to another animates text and moves active spring indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
            {STORY_TRACKS.map((track) => {
              const isActive = activeTrackId === track.id;
              return (
                <button
                  key={track.id}
                  id={`story-bar-btn-${track.id}`}
                  onClick={() => handleBarChange(track.id)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:text-[#0052FF] hover:bg-blue-50/60'
                  }`}
                >
                  {/* Kinetic active spring pill */}
                  {isActive && (
                    <motion.div
                      layoutId="storyBarPill"
                      className="absolute inset-0 bg-[#0052FF] rounded-full shadow-lg shadow-[#0052FF]/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? 'bg-white' : 'bg-[#0052FF]'
                      }`}
                    />
                    {track.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated Track Tagline on Bar Change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-xs sm:text-sm text-slate-400 flex items-center gap-2"
            >
              <span className="text-[#146BFF] font-semibold">{activeTrack.category}:</span>
              <span>{activeTrack.tagline}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= CINEMA-GRADE VIDEO PLAYER WITH CONTROLS ================= */}
        <div
          ref={containerRef}
          className="relative rounded-3xl overflow-hidden bg-black/80 border border-slate-700/60 shadow-[0_20px_60px_-15px_rgba(20,107,255,0.3)] group"
        >
          {/* Ambient Video Backlight */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#146BFF]/30 to-cyan-500/20 blur-xl opacity-40 -z-10" />

          {/* The Video Element */}
          <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              key={currentVideoSrc}
              src={currentVideoSrc}
              muted={isMuted}
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              onError={() => {
                if (videoRef.current && videoRef.current.src !== activeTrack.defaultVideo) {
                  videoRef.current.src = activeTrack.defaultVideo;
                  videoRef.current.load();
                }
              }}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Large Center Play/Pause Floating Kinetic Button (World-class agency look) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                  onClick={togglePlay}
                >
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#146BFF] text-white flex items-center justify-center shadow-2xl shadow-[#146BFF]/50 border-2 border-white/30"
                    aria-label="Play brand showcase video"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#146BFF] animate-ping opacity-25" />
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top Video Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-white">
                  {activeTrack.category}
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  4K Cinematic Reel &bull; DWH Creative Agency
                </span>
              </div>

              <div className="pointer-events-auto">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace Video</span>
                </button>
              </div>
            </div>

            {/* Bottom Custom Playback Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Progress Scrubber */}
              <div
                onClick={handleSeek}
                className="relative w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all mb-3 group/scrubber"
              >
                <div
                  className="absolute top-0 left-0 bottom-0 bg-[#146BFF] rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/scrubber:scale-100 transition-transform" />
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between gap-3 text-xs font-medium text-white">
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-slate-300 text-[11px] tabular-nums">
                    {currentTime} / {duration}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handleSpeedChange}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold tabular-nums transition-colors"
                    title="Change playback speed"
                  >
                    {playbackSpeed}x
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics / Quality Badges */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <div className="text-2xl font-black text-white">120+</div>
            <div className="text-xs text-slate-400 mt-0.5">Commercial Brand Reels</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <div className="text-2xl font-black text-[#146BFF]">4K Ultra HD</div>
            <div className="text-xs text-slate-400 mt-0.5">Master Output Quality</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <div className="text-2xl font-black text-white">60 FPS</div>
            <div className="text-xs text-slate-400 mt-0.5">Fluid Motion Systems</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <div className="text-2xl font-black text-cyan-400">100% Custom</div>
            <div className="text-xs text-slate-400 mt-0.5">Uploaded Directly by You</div>
          </div>
        </div>
      </div>

      {/* ================= VIDEO UPLOAD MODAL ================= */}
      <AnimatePresence>
        {showUploadModal && (
          <div
            id="video-upload-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-[#0B214D] border border-blue-900/60 shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#146BFF]" />
                  <h3 className="text-lg font-bold">Upload Showcase Video</h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 pt-5">
                {/* Option 1: Direct File Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Method 1: Choose Video File From Your Computer
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-blue-500/40 hover:border-[#146BFF] rounded-2xl p-6 text-center cursor-pointer bg-white/[0.03] hover:bg-white/[0.06] transition-all group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/ogg"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Upload className="w-8 h-8 text-blue-400 group-hover:scale-110 group-hover:text-[#146BFF] transition-all mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white">
                      {uploadLoading ? 'Processing Video...' : 'Click to Browse or Drag & Drop'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Supports MP4, WebM (Recommended under 50MB)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs uppercase font-bold text-slate-500">OR</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Option 2: Paste Direct Video URL */}
                <form onSubmit={handleUrlSubmit} className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Method 2: Paste Direct Video URL (MP4 / WebM / CDN)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        placeholder="https://your-domain.com/video.mp4"
                        value={uploadUrlInput}
                        onChange={(e) => setUploadUrlInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#146BFF]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!uploadUrlInput.trim()}
                      className="px-4 py-2.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md"
                    >
                      Apply
                    </button>
                  </div>
                </form>

                {/* Reset to Default */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={handleResetToAgencyDefault}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Agency Default Reel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {uploadSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#004AD9] border border-blue-400/50 text-white shadow-2xl backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0" />
            <span className="text-sm font-semibold">{uploadSuccessToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
