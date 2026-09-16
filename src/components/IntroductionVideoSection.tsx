import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Upload, 
  RotateCcw,
  ArrowRight,
  Code2,
  Film,
  Layers,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface IntroductionVideoSectionProps {
  onOpenInquiry: () => void;
}

export const IntroductionVideoSection: React.FC<IntroductionVideoSectionProps> = ({ onOpenInquiry }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0); // 0 to 7
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('0913 — Watch How We Create Brands');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Frames corresponding exactly to the 0913 video uploaded by user:
  // Frame 0: "It starts with an idea."
  // Frame 1: "We create BRANDS. For eCommerce, SaaS & creators."
  // Frame 2: "Brand identity. Distinct by design." (Delvix, Aerivo, Stride)
  // Frame 3: "UI/UX & App Design. Built around people." (Beaver, Examly)
  // Frame 4: "Web & App Development. From design to a live experience." (Code to live UI)
  // Frame 5: "Motion that holds attention. Every frame has a purpose." (Waveform & reels)
  // Frame 6: "We Create Brands That People Remember"
  // Frame 7: "Digital With Habib — Let's build your brand."
  
  const frameDurations = [2500, 2500, 3000, 3000, 3000, 3000, 2500, 3000];
  const totalDuration = frameDurations.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (!isPlaying || customVideoUrl) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (totalDuration / 100);
        if (next >= 100) {
          setCurrentFrame(0);
          return 0;
        }

        // Calculate which frame based on percentage
        const currentElapsed = (next / 100) * totalDuration;
        let accum = 0;
        for (let i = 0; i < frameDurations.length; i++) {
          accum += frameDurations[i];
          if (currentElapsed <= accum) {
            setCurrentFrame(i);
            break;
          }
        }

        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying, customVideoUrl, totalDuration]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setVideoTitle(file.name);
      setIsPlaying(true);
    }
  };

  const jumpToFrame = (idx: number) => {
    setCurrentFrame(idx);
    let accum = 0;
    for (let i = 0; i < idx; i++) {
      accum += frameDurations[i];
    }
    setProgress((accum / totalDuration) * 100);
  };

  return (
    <section id="intro-video" className="py-20 md:py-28 bg-[#F7F9FC] relative overflow-hidden border-y border-slate-200/60">
      
      {/* Hidden file input for uploading custom 0913 video */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#146BFF] text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-200">
              <Film className="w-3.5 h-3.5" />
              <span>Studio Showreel Film</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#071A41] tracking-tight leading-[1.15]">
              Behind Every Great Brand Is A <br />
              <span className="text-gradient-blue">Great Story.</span>
            </h2>
            
            <p className="text-base text-slate-600 mt-2 max-w-xl">
              Watch how we create brands, digital experiences and creative solutions.
            </p>
          </div>

          {/* Upload or Replay Action Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#071A41] border border-slate-200 text-xs font-semibold shadow-xs transition-colors"
              title="Upload your local 0913 video file (.mp4)"
            >
              <Upload className="w-3.5 h-3.5 text-[#146BFF]" />
              <span>{customVideoUrl ? 'Replace Video' : 'Upload 0913 Video (.mp4)'}</span>
            </button>

            {customVideoUrl && (
              <button
                onClick={() => setCustomVideoUrl(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                title="Reset to Animated Showreel"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Video Player Container */}
        <div
          className={`relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#071A41] border border-slate-800 shadow-2xl shadow-[#146BFF]/20 group transition-all duration-300 select-none ${
            isFullscreen ? 'fixed inset-4 z-50 rounded-2xl m-0 max-h-none' : 'aspect-[16/9] max-h-[660px]'
          }`}
        >
          {/* If user uploaded a custom MP4 file, play HTML5 video */}
          {customVideoUrl ? (
            <video
              src={customVideoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            /* Otherwise, render the exact sequence from the 0913 user video! */
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* FRAME 0: "It starts with an idea." */}
                {currentFrame === 0 && (
                  <motion.div
                    key="frame-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-white flex flex-col justify-between p-8 sm:p-14 text-left"
                  >
                    <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                      DIGITAL WITH HABIB
                    </div>

                    <div className="max-w-2xl">
                      <h3 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#071A41] tracking-tight leading-none mb-4">
                        It starts with an idea.
                      </h3>
                      {/* Signature blue curved accent line */}
                      <div className="w-32 h-1.5 bg-[#146BFF] rounded-full" />
                    </div>

                    <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                      GOOD IDEAS DESERVE GREAT DESIGN
                    </div>
                  </motion.div>
                )}

                {/* FRAME 1: "We create BRANDS. For eCommerce, SaaS & creators." */}
                {currentFrame === 1 && (
                  <motion.div
                    key="frame-1"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-[#146BFF] flex flex-col justify-between p-8 sm:p-14 text-white relative overflow-hidden"
                  >
                    {/* Background angular slices */}
                    <div className="absolute top-0 right-0 bottom-0 w-2/5 bg-[#00D2FF]/20 -skew-x-12 pointer-events-none" />
                    <div className="absolute top-0 right-1/4 bottom-0 w-1/6 bg-white/10 -skew-x-12 pointer-events-none" />

                    <div className="text-xs font-bold tracking-widest text-blue-200 uppercase z-10">
                      DIGITAL WITH HABIB
                    </div>

                    <div className="z-10">
                      <div className="text-2xl sm:text-3xl font-medium text-blue-100">
                        We create
                      </div>
                      <h3 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
                        BRANDS
                      </h3>
                      <p className="text-lg sm:text-2xl text-blue-100 font-medium mt-3">
                        For eCommerce, SaaS & creators.
                      </p>
                    </div>

                    <div className="text-6xl sm:text-9xl font-black text-white/10 tracking-widest uppercase pointer-events-none z-0">
                      BRANDS
                    </div>
                  </motion.div>
                )}

                {/* FRAME 2: Brand identity (Delvix, Aerivo, Stride) */}
                {currentFrame === 2 && (
                  <motion.div
                    key="frame-2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-[#F7F9FC] flex flex-col md:flex-row items-center justify-between p-8 sm:p-14 gap-8"
                  >
                    <div className="max-w-md text-left">
                      <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
                        DIGITAL WITH HABIB
                      </div>
                      <h3 className="text-4xl sm:text-6xl font-black text-[#071A41] leading-tight mb-2">
                        Brand identity
                      </h3>
                      <p className="text-lg text-slate-500 font-medium mb-6">
                        Distinct by design.
                      </p>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                        LOGO SYSTEMS &bull; VISUAL IDENTITY
                      </div>
                    </div>

                    {/* 3 Mockup Cards overlapping */}
                    <div className="relative w-full max-w-lg h-64 sm:h-72 flex items-center justify-center">
                      <motion.div 
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute left-0 w-44 sm:w-52 p-4 rounded-2xl bg-[#0B1528] text-white shadow-xl border border-slate-700"
                      >
                        <div className="text-xs font-bold text-emerald-400 mb-1">Delvix</div>
                        <div className="text-[11px] text-slate-300 font-medium">Intelligent Supply Chains</div>
                        <div className="mt-3 h-20 rounded-lg bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-xs text-emerald-300 font-bold">
                          SUPPLY CHAIN OS
                        </div>
                      </motion.div>

                      <motion.div 
                        animate={{ y: [5, -5, 5] }}
                        transition={{ repeat: Infinity, duration: 4.5 }}
                        className="absolute top-2 right-4 w-48 sm:w-56 p-4 rounded-2xl bg-white text-[#071A41] shadow-2xl border border-slate-200 z-10"
                      >
                        <div className="text-xs font-bold text-[#146BFF] mb-1">Aerivo</div>
                        <div className="text-[11px] text-slate-500 font-medium">GO BEYOND THE HORIZON</div>
                        <div className="mt-3 h-20 rounded-lg bg-blue-50 flex items-center justify-center text-xs text-[#146BFF] font-black">
                          OUTDOOR LUXURY
                        </div>
                      </motion.div>

                      <motion.div 
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ repeat: Infinity, duration: 3.5 }}
                        className="absolute -bottom-4 right-10 w-44 sm:w-52 p-3 rounded-2xl bg-[#111827] text-white shadow-xl border border-slate-800 z-20"
                      >
                        <div className="text-xs font-black text-lime-400">STRIDE</div>
                        <div className="text-[10px] text-slate-400">MOVE. PLAY. WIN.</div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* FRAME 3: UI/UX & App Design (Beaver, Examly) */}
                {currentFrame === 3 && (
                  <motion.div
                    key="frame-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-white flex flex-col md:flex-row items-center justify-between p-8 sm:p-14 gap-8"
                  >
                    <div className="max-w-md text-left">
                      <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
                        DIGITAL WITH HABIB
                      </div>
                      <h3 className="text-4xl sm:text-5xl font-black text-[#071A41] leading-tight mb-2">
                        UI/UX & <br />App Design
                      </h3>
                      <p className="text-lg text-slate-500 font-medium mb-6">
                        Built around people.
                      </p>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                        WEB EXPERIENCES &bull; MOBILE INTERFACES
                      </div>
                    </div>

                    {/* SaaS Dashboard preview container */}
                    <div className="relative w-full max-w-xl p-5 rounded-2xl bg-white border border-slate-200 shadow-2xl">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-400" />
                          <span className="w-3 h-3 rounded-full bg-amber-400" />
                          <span className="w-3 h-3 rounded-full bg-emerald-400" />
                          <span className="text-xs font-bold text-[#071A41] ml-2">Beaver Social Co-Pilot</span>
                        </div>
                        <span className="text-[10px] font-semibold text-[#146BFF] bg-blue-50 px-2 py-0.5 rounded">
                          SaaS App v3.2
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-[#F7F9FC] border border-slate-100">
                          <div className="text-[10px] text-slate-400">Total Audience</div>
                          <div className="text-lg font-black text-[#071A41]">1,420,800</div>
                          <div className="text-[10px] text-emerald-600 font-bold">+28.4% this week</div>
                        </div>
                        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                          <div className="text-[10px] text-[#146BFF] font-semibold">Examly Mobile Quiz</div>
                          <div className="text-lg font-black text-[#146BFF]">98.2% Pass</div>
                          <div className="text-[10px] text-slate-500">Fast micro-learning</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FRAME 4: Web & App Development (Code editor morphing to interface) */}
                {currentFrame === 4 && (
                  <motion.div
                    key="frame-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-[#071A41] flex flex-col md:flex-row items-center justify-between p-8 sm:p-14 gap-8 text-white"
                  >
                    <div className="max-w-md text-left">
                      <div className="text-xs font-bold tracking-widest text-blue-300 uppercase mb-4">
                        DIGITAL WITH HABIB
                      </div>
                      <h3 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-2">
                        Web & App <br />Development
                      </h3>
                      <p className="text-base text-slate-300 font-medium mb-6">
                        From design to a live experience.
                      </p>
                      <div className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                        RESPONSIVE BY DESIGN
                      </div>
                    </div>

                    {/* Sleek Laptop Code Editor Terminal */}
                    <div className="w-full max-w-lg rounded-2xl bg-[#040C1E] border border-slate-700/80 p-5 shadow-2xl font-mono text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 mb-3">
                        <span className="text-blue-400">experience.tsx</span>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400">TypeScript 5.8</span>
                      </div>
                      <div className="text-slate-300 space-y-1">
                        <div><span className="text-purple-400">const</span> <span className="text-blue-300">Brand</span> = () =&gt; &#123;</div>
                        <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                        <div className="pl-8 text-cyan-300">&lt;Experience</div>
                        <div className="pl-12 text-slate-300">identity=<span className="text-emerald-300">"distinct"</span></div>
                        <div className="pl-12 text-slate-300">responsive=&#123;<span className="text-amber-300">true</span>&#125;</div>
                        <div className="pl-12 text-slate-300">motion=<span className="text-emerald-300">"purposeful"</span></div>
                        <div className="pl-8 text-cyan-300">/&gt;</div>
                        <div className="pl-4">);</div>
                        <div>&#125;;</div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Speed: 100/100 Core Web Vitals</span>
                        <span className="text-emerald-400 font-bold">Compiled 0.4s</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FRAME 5: Motion that holds attention (Sound waveform & cards) */}
                {currentFrame === 5 && (
                  <motion.div
                    key="frame-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-white flex flex-col md:flex-row items-center justify-between p-8 sm:p-14 gap-8"
                  >
                    <div className="max-w-md text-left">
                      <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
                        DIGITAL WITH HABIB
                      </div>
                      <h3 className="text-4xl sm:text-5xl font-black text-[#071A41] leading-tight mb-2">
                        Motion that <br />holds attention.
                      </h3>
                      <p className="text-base text-slate-500 font-medium mb-6">
                        Every frame has a purpose.
                      </p>
                      <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                        VIDEO EDITING &bull; MOTION DESIGN
                      </div>
                    </div>

                    {/* Waveform & Reel Card */}
                    <div className="w-full max-w-lg p-6 rounded-3xl bg-[#071A41] text-white shadow-2xl border border-slate-700">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#146BFF] animate-ping" />
                          <span className="text-xs font-bold uppercase tracking-wider">Cinematic Master</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">4K 60FPS</span>
                      </div>

                      {/* Live Animated Audio Waveform */}
                      <div className="h-16 flex items-center justify-center gap-1 mb-6 px-4">
                        {[15, 30, 60, 85, 40, 95, 75, 45, 90, 100, 80, 65, 35, 50, 75, 90, 60, 40, 85, 95, 70, 50, 30, 20].map((h, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-[#146BFF] to-[#00D2FF] rounded-full"
                            animate={{
                              height: isPlaying ? [`${h * 0.4}%`, `${h}%`, `${h * 0.3}%`] : `${h * 0.5}%`
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8 + (i % 5) * 0.1,
                              ease: 'easeInOut'
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                        <span className="text-[#146BFF] font-bold">Sound Design & Editing</span>
                        <span>01:45 / 4K UHD</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FRAME 6: "We Create Brands That People Remember" */}
                {currentFrame === 6 && (
                  <motion.div
                    key="frame-6"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#071A41] to-[#0B2154] flex flex-col items-center justify-center p-8 sm:p-14 text-center text-white"
                  >
                    <div className="max-w-2xl p-8 sm:p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                      <div className="text-xs font-bold tracking-widest text-blue-300 uppercase mb-4">
                        DIGITAL WITH HABIB
                      </div>
                      <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-4">
                        We Create Brands <br />
                        <span className="text-gradient-blue">That People</span> <br />
                        Remember
                      </h3>
                      <div className="w-20 h-1 bg-[#146BFF] rounded-full mx-auto" />
                    </div>
                  </motion.div>
                )}

                {/* FRAME 7: Signature Outro (Logo + Let's build your brand.) */}
                {currentFrame === 7 && (
                  <motion.div
                    key="frame-7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 sm:p-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="flex flex-col items-center gap-4"
                    >
                      <BrandLogo variant="full" size="xl" />
                      <p className="text-xl sm:text-2xl font-bold text-[#071A41] mt-2">
                        Let's build your brand.
                      </p>
                      <div className="w-16 h-1 bg-[#146BFF] rounded-full" />
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          )}

          {/* Top Bar Controls */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-30 pointer-events-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-semibold truncate max-w-[200px]">{videoTitle}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white transition-colors"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Bottom Video Progress Bar & Chapter Markers */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-30">
            {/* Scrubber Bar */}
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-3 cursor-pointer">
              <div
                className="h-full bg-gradient-to-r from-[#146BFF] to-[#00D2FF] rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Quick Scene Buttons */}
            <div className="hidden sm:flex items-center justify-between text-[11px] text-white/70">
              <button onClick={() => jumpToFrame(0)} className="hover:text-white transition-colors">01 Idea</button>
              <button onClick={() => jumpToFrame(1)} className="hover:text-white transition-colors">02 Brands</button>
              <button onClick={() => jumpToFrame(2)} className="hover:text-white transition-colors">03 Identity</button>
              <button onClick={() => jumpToFrame(3)} className="hover:text-white transition-colors">04 UI/UX</button>
              <button onClick={() => jumpToFrame(4)} className="hover:text-white transition-colors">05 Code</button>
              <button onClick={() => jumpToFrame(5)} className="hover:text-white transition-colors">06 Motion</button>
              <button onClick={() => jumpToFrame(6)} className="hover:text-white transition-colors">07 Impact</button>
              <button onClick={() => jumpToFrame(7)} className="hover:text-white transition-colors">08 Finale</button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
