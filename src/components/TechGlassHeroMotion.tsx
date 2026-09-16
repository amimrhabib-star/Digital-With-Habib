import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Play, Pause, Upload, Sparkles, Volume2, VolumeX, ShieldCheck, Zap, Layers, Cpu, Eye, Radio } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface TechGlassHeroMotionProps {
  onOpenVideoModal?: () => void;
}

export const TechGlassHeroMotion: React.FC<TechGlassHeroMotionProps> = ({ onOpenVideoModal }) => {
  const { settings, updateHeroCardMedia } = useStudioContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [reflectionPos, setReflectionPos] = useState({ x: 50, y: 50 });

  // Default motion video if none uploaded
  const defaultMotionVideo = '/videos/motion-3d.mp4';
  const currentMediaUrl = settings.customHeroMotionUrl || defaultMotionVideo;
  const isVideo = currentMediaUrl.includes('.mp4') || currentMediaUrl.includes('.webm') || currentMediaUrl.startsWith('data:video');

  // Interactive 3D Perspective Tilt Physics with high damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  // Parallax translation for floating holographic satellite widgets
  const satelliteZ1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const satelliteZ2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setReflectionPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setReflectionPos({ x: 50, y: 50 });
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateHeroCardMedia(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center p-2 sm:p-4 select-none [perspective:1400px]">
      {/* Hidden File Input for Custom Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,image/png,image/jpeg,image/gif,image/webp,image/svg+xml"
        onChange={handleMediaUpload}
        className="hidden"
      />

      {/* Floating Holographic Satellite Chip 1 (Top Left in 3D Space) */}
      <motion.div
        style={{
          x: satelliteZ1,
          y: satelliteZ2,
          transformStyle: 'preserve-3d',
        }}
        className="absolute -top-6 -left-4 sm:-left-8 z-30 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-spatial border border-white/30 shadow-[0_12px_32px_rgba(0,210,255,0.25)] backdrop-blur-2xl animate-float-1"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-300 font-bold">
            SPATIAL 3D ENGINE
          </span>
          <span className="text-[9px] text-white/70 font-mono">
            60 FPS &bull; VisionOS Ready
          </span>
        </div>
      </motion.div>

      {/* Floating Holographic Satellite Chip 2 (Bottom Right in 3D Space) */}
      <motion.div
        style={{
          x: satelliteZ2,
          y: satelliteZ1,
          transformStyle: 'preserve-3d',
        }}
        className="absolute -bottom-5 -right-3 sm:-right-6 z-30 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-spatial border border-white/30 shadow-[0_12px_32px_rgba(20,107,255,0.3)] backdrop-blur-2xl animate-float-2"
      >
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#146BFF] to-[#00D2FF] flex items-center justify-center text-white text-[10px] font-black shadow-sm">
          4K
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-white tracking-tight">
            Ultra-Realistic Fidelity
          </span>
          <span className="text-[9px] text-cyan-300 font-mono">
            Reflective Glass Pipeline
          </span>
        </div>
      </motion.div>

      {/* Ambient Neon Blue Backlight Aura */}
      <div className="absolute -inset-6 bg-gradient-to-r from-[#00D2FF]/25 via-[#146BFF]/35 to-[#0052FF]/25 rounded-[56px] blur-3xl opacity-75 pointer-events-none animate-pulse-glow" />

      {/* Main 3D Spatial Glass Chassis */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[500px] aspect-[4/5] sm:aspect-[1/1.12] rounded-[44px] glass-spatial-card border border-white/30 shadow-[0_30px_90px_-15px_rgba(0,18,60,0.85)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden group cursor-pointer"
      >
        {/* Realistic Dynamic Specular Light Flare (follows cursor) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${reflectionPos.x}% ${reflectionPos.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(0, 210, 255, 0.12) 35%, transparent 70%)`,
            opacity: isHovered ? 1 : 0.45,
          }}
        />

        {/* Diagonal Specular Reflection Sweep */}
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 pointer-events-none transition-transform duration-1000 group-hover:translate-x-full" />

        {/* High-tech optic matrix background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00D2FF 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Apple Vision Pro Glass Bevel Border Sheen */}
        <div className="absolute inset-0 rounded-[44px] border border-white/25 pointer-events-none [box-shadow:inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.5)]" />

        {/* TOP HUD ROW: Spatial Badges & Controls (Layered at Z=45px) */}
        <div 
          style={{ transform: 'translateZ(45px)' }}
          className="relative z-20 flex items-center justify-between gap-2"
        >
          {/* Active 3D Spatial Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-[#00F0FF] text-[11px] font-bold tracking-wider uppercase backdrop-blur-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-white font-semibold">VisionOS // 3D</span>
            <span className="text-cyan-300/80 font-mono text-[10px]">60 FPS</span>
          </div>

          {/* Controls: Audio Mute & Upload */}
          <div className="flex items-center gap-1.5">
            {isVideo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 flex items-center justify-center text-white transition-all shadow-sm active:scale-95"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-zinc-300" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                )}
              </button>
            )}

            {/* Quick Upload Button directly on the card */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#146BFF] to-[#00D2FF] hover:brightness-110 text-white text-xs font-bold shadow-[0_4px_20px_rgba(0,210,255,0.4)] border border-white/30 transition-all hover:scale-105 active:scale-95"
              title="Upload custom motion video or 3D brand mark"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload Motion</span>
            </button>
          </div>
        </div>

        {/* CENTER 3D KINETIC MOTION DISPLAY (Layered at Z=65px) */}
        <div 
          style={{ transform: 'translateZ(65px)' }}
          className="relative z-10 my-auto flex flex-col items-center justify-center text-center w-full"
        >
          {/* Glass Viewport Screen Frame */}
          <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden bg-[#030917]/90 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group/screen">
            {/* Screen Inner Specular Flare */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/50 pointer-events-none z-10" />

            {isVideo ? (
              <video
                ref={videoRef}
                key={currentMediaUrl}
                src={currentMediaUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onError={() => {
                  if (videoRef.current && videoRef.current.src !== defaultMotionVideo) {
                    videoRef.current.src = defaultMotionVideo;
                    videoRef.current.load();
                  }
                }}
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-[#051129] to-[#020713]">
                {/* 3D Concentric Orbit Rings behind image */}
                <div className="absolute w-48 h-48 rounded-full border border-[#00D2FF]/35 animate-[spin_16s_linear_infinite]" />
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-white/30 animate-[spin_10s_linear_infinite_reverse]" />
                
                <img
                  src={currentMediaUrl}
                  alt="Brand 3D Motion Mark"
                  className="max-h-36 max-w-[80%] object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(0,210,255,0.6)]"
                />
              </div>
            )}

            {/* Futuristic Glass Play Overlay (visible on hover or when paused) */}
            <div 
              onClick={togglePlay}
              className={`absolute inset-0 z-20 bg-[#030917]/65 backdrop-blur-xs flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
                !isPlaying || isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#146BFF] via-[#00D2FF] to-white text-white flex items-center justify-center shadow-[0_0_35px_rgba(0,210,255,0.7)] border border-white/50 transition-transform group-hover/screen:scale-110">
                {isPlaying ? (
                  <Pause className="w-7 h-7 text-black fill-current" />
                ) : (
                  <Play className="w-7 h-7 text-black fill-current translate-x-0.5" />
                )}
              </div>

              <div className="text-center">
                <div className="text-white text-xs font-bold tracking-tight text-glow-white">
                  {isPlaying ? 'Click to Pause' : 'Click to Play Motion'}
                </div>
                <div className="text-[#00F0FF] text-[11px] font-medium font-mono">
                  DWH Studio Visual Reel
                </div>
              </div>
            </div>

            {/* Floating Glass Pill inside viewport */}
            <div className="absolute bottom-3 left-3 z-10 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/25 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-md">
              <Zap className="w-3 h-3 text-[#00F0FF] fill-current" />
              <span>High-Retention 3D Motion</span>
            </div>
          </div>
        </div>

        {/* BOTTOM HUD ROW: Verification Badges & Clean Stats (Layered at Z=45px) */}
        <div 
          style={{ transform: 'translateZ(45px)' }}
          className="relative z-20 grid grid-cols-2 gap-3"
        >
          {/* Card 1: 99.4% Client Satisfaction */}
          <div className="flex items-center gap-3 p-3 rounded-2xl glass-spatial border border-white/20 backdrop-blur-xl shadow-md group/stat hover:border-cyan-400/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D2FF] to-[#146BFF] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-[0_0_15px_rgba(0,210,255,0.4)]">
              ★
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-xs font-black text-white">
                <span>99.4%</span>
                <span className="text-[#00F0FF] text-[9px] font-mono font-bold bg-[#00D2FF]/20 px-1 rounded border border-[#00D2FF]/30">
                  Verified
                </span>
              </div>
              <div className="text-[10px] text-blue-200 font-medium truncate">
                Client Satisfaction
              </div>
            </div>
          </div>

          {/* Card 2: Studio Leadership */}
          <div className="flex items-center gap-3 p-3 rounded-2xl glass-spatial border border-white/20 backdrop-blur-xl shadow-md group/stat hover:border-cyan-400/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-white/10 text-[#00F0FF] flex items-center justify-center shrink-0 border border-white/25 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                Creative Directors
              </div>
              <div className="text-[10px] text-blue-200 font-medium truncate">
                Direct Studio Access
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
