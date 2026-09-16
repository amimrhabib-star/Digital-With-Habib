import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Zap, Sparkles, Sliders, Upload, RefreshCw, X, Play, Film, Image as ImageIcon, Check, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface FuturisticHero3DGlassEmblemProps {
  onOpenInquiry?: () => void;
}

type MotionPreset = 'crystalline' | 'gyro-orb' | 'prismatic-monolith' | 'custom';

export const FuturisticHero3DGlassEmblem: React.FC<FuturisticHero3DGlassEmblemProps> = ({ onOpenInquiry }) => {
  const { settings, updateSettings } = useStudioContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Logo Scale state (persisted in context and IndexedDB / localStorage)
  const [logoScale, setLogoScale] = useState<number>(() => {
    return settings.logoScale || 1.0;
  });

  // Sync with context changes
  useEffect(() => {
    if (settings.logoScale && settings.logoScale !== logoScale) {
      setLogoScale(settings.logoScale);
    }
  }, [settings.logoScale]);

  const handleScaleChange = (val: number) => {
    const clamped = Math.min(1.8, Math.max(0.5, Number(val.toFixed(2))));
    setLogoScale(clamped);
    updateSettings({ logoScale: clamped });
    localStorage.setItem('dwh_motion_logo_scale', clamped.toString());
  };

  // Motion preset & custom media state (persisted in settings, indexedDB, and server)
  const [customMediaUrl, setCustomMediaUrl] = useState<string | null>(() => {
    return settings.customHeroMotionUrl || localStorage.getItem('dwh_motion_logo_url') || null;
  });
  const [customMediaType, setCustomMediaType] = useState<'video' | 'image' | null>(() => {
    const url = settings.customHeroMotionUrl || localStorage.getItem('dwh_motion_logo_url');
    if (url) {
      if (url.startsWith('data:video') || /\.(mp4|webm|mov)(\?.*)?$/i.test(url)) return 'video';
      return 'image';
    }
    return (localStorage.getItem('dwh_motion_logo_type') as 'video' | 'image') || null;
  });
  const [preset, setPreset] = useState<MotionPreset>(() => {
    if (settings.motionLogoPreset) return settings.motionLogoPreset as MotionPreset;
    if (settings.customHeroMotionUrl || localStorage.getItem('dwh_motion_logo_url')) return 'custom';
    return (localStorage.getItem('dwh_motion_logo_preset') as MotionPreset) || 'crystalline';
  });
  const [motionIntensity, setMotionIntensity] = useState<'standard' | 'high'>(() => {
    if (settings.motionLogoIntensity) return settings.motionLogoIntensity as 'standard' | 'high';
    return (localStorage.getItem('dwh_motion_intensity') as 'standard' | 'high') || 'high';
  });

  // Re-sync whenever settings hydrate or change from server / indexedDB
  useEffect(() => {
    if (settings.customHeroMotionUrl) {
      setCustomMediaUrl(settings.customHeroMotionUrl);
      const isVid = settings.customHeroMotionUrl.startsWith('data:video') || /\.(mp4|webm|mov)(\?.*)?$/i.test(settings.customHeroMotionUrl);
      setCustomMediaType(isVid ? 'video' : 'image');
      if (!settings.motionLogoPreset || settings.motionLogoPreset === 'custom') {
        setPreset('custom');
      }
    }
    if (settings.motionLogoPreset && settings.motionLogoPreset !== preset) {
      setPreset(settings.motionLogoPreset as MotionPreset);
    }
    if (settings.motionLogoIntensity && settings.motionLogoIntensity !== motionIntensity) {
      setMotionIntensity(settings.motionLogoIntensity as 'standard' | 'high');
    }
    if (settings.logoScale && settings.logoScale !== logoScale) {
      setLogoScale(settings.logoScale);
    }
  }, [settings.customHeroMotionUrl, settings.motionLogoPreset, settings.motionLogoIntensity, settings.logoScale]);

  // Spring physics for interactive 3D spatial perspective tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 160, mass: 0.6 };
  const tiltFactor = motionIntensity === 'high' ? 20 : 14;
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltFactor, -tiltFactor]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltFactor, tiltFactor]), springConfig);

  // Parallax offsets for floating satellite pills
  const pill1ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const pill1ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-16, 16]), springConfig);

  const pill2ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [24, -24]), springConfig);
  const pill2ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);

  const pill3ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const pill3ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Handle custom media upload with persistent Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImg = file.type.startsWith('image/');

    if (isVideo || isImg) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setCustomMediaUrl(dataUrl);
        setCustomMediaType(isVideo ? 'video' : 'image');
        setPreset('custom');
        try {
          localStorage.setItem('dwh_motion_logo_url', dataUrl);
          localStorage.setItem('dwh_motion_logo_type', isVideo ? 'video' : 'image');
          localStorage.setItem('dwh_motion_logo_preset', 'custom');
        } catch {}
        updateSettings({ customHeroMotionUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPreset = (newPreset: MotionPreset) => {
    setPreset(newPreset);
    try {
      localStorage.setItem('dwh_motion_logo_preset', newPreset);
    } catch {}
    updateSettings({ motionLogoPreset: newPreset });
  };

  const toggleIntensity = () => {
    const next = motionIntensity === 'standard' ? 'high' : 'standard';
    setMotionIntensity(next);
    try {
      localStorage.setItem('dwh_motion_intensity', next);
    } catch {}
    updateSettings({ motionLogoIntensity: next });
  };

  const resetDefault = () => {
    setPreset('crystalline');
    setCustomMediaUrl(null);
    setCustomMediaType(null);
    setMotionIntensity('high');
    handleScaleChange(1.0);
    try {
      localStorage.removeItem('dwh_motion_logo_url');
      localStorage.removeItem('dwh_motion_logo_type');
      localStorage.setItem('dwh_motion_logo_preset', 'crystalline');
      localStorage.setItem('dwh_motion_intensity', 'high');
    } catch {}
    updateSettings({
      customHeroMotionUrl: null,
      logoScale: 1.0,
      motionLogoPreset: 'crystalline',
      motionLogoIntensity: 'high',
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[760px] min-h-[580px] sm:min-h-[660px] aspect-[1/0.92] flex items-center justify-center select-none [perspective:1400px] cursor-pointer group"
    >
      {/* Soft volumetric atmospheric blue glow underneath the emblem */}
      <div className="absolute inset-2 bg-gradient-to-tr from-[#00D2FF]/25 via-[#146BFF]/22 to-[#0052FF]/15 rounded-full blur-[80px] pointer-events-none opacity-85 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110" />

      {/* Floating Controls Bar: Scale 3D Motion & Change 3D Motion Logo */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-40 flex items-center gap-2">
        {/* Quick 3D Logo Scale Adjuster */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#0052FF] text-xs font-bold border border-blue-200 shadow-[0_8px_20px_rgba(0,82,255,0.12)] backdrop-blur-xl transition-all"
        >
          <ZoomIn className="w-3.5 h-3.5 text-[#0052FF]" />
          <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline">Scale:</span>
          <button
            onClick={() => handleScaleChange(logoScale - 0.1)}
            title="Scale down 3D logo"
            className="w-5 h-5 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0052FF] font-black flex items-center justify-center transition-colors cursor-pointer"
          >
            -
          </button>
          <span className="w-9 text-center font-mono text-[11px] font-bold text-[#071A41]">
            {Math.round(logoScale * 100)}%
          </span>
          <button
            onClick={() => handleScaleChange(logoScale + 0.1)}
            title="Scale up 3D logo"
            className="w-5 h-5 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0052FF] font-black flex items-center justify-center transition-colors cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Change 3D Motion Logo Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCustomizer(true);
          }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 hover:bg-white text-[#0052FF] text-xs font-bold border border-blue-200 shadow-[0_8px_20px_rgba(0,82,255,0.15)] hover:shadow-[0_12px_28px_rgba(0,82,255,0.25)] backdrop-blur-xl transition-all cursor-pointer hover:scale-105"
        >
          <Sliders className="w-3.5 h-3.5 text-[#0052FF]" />
          <span>Change 3D Motion Logo</span>
        </button>
      </div>

      {/* Hidden File Input for Custom Media Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,image/png,image/jpeg,image/svg+xml,image/gif"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Main 3D Floating Stage with Levitation & Interactive Perspective Tilt & Scale */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: logoScale,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: motionIntensity === 'high' ? [0, -20, 0] : [0, -12, 0],
          rotateZ: motionIntensity === 'high' ? [0, 1.6, -1.4, 0] : [0, 0.8, -0.6, 0],
        }}
        transition={{
          duration: motionIntensity === 'high' ? 5.2 : 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* ========================================================= */}
        {/* 1. DUAL 3D GLASS ORBITAL RINGS & DUAL REVOLVING SPHERES   */}
        {/* ========================================================= */}
        <div 
          style={{ transform: 'translateZ(25px)' }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <svg
            viewBox="0 0 800 700"
            className="w-full h-full overflow-visible"
            fill="none"
          >
            <defs>
              {/* Glass Orbit Ring 1 Gradient */}
              <linearGradient id="orbitGlassGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#146BFF" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.5" />
              </linearGradient>

              {/* Glass Orbit Ring 2 Gradient (Counter-orbiting) */}
              <linearGradient id="orbitGlassGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#0052FF" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#00D2FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
              </linearGradient>

              {/* Orbit Ring Outer Glow */}
              <filter id="orbitGlowHigh" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* 3D Glossy Blue Glass Sphere 1 Gradients */}
              <radialGradient id="sphereGrad1" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#70E4FF" />
                <stop offset="50%" stopColor="#0066FF" />
                <stop offset="85%" stopColor="#002D9C" />
                <stop offset="100%" stopColor="#00144D" />
              </radialGradient>

              {/* 3D Cyan Glass Sphere 2 Gradients */}
              <radialGradient id="sphereGrad2" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#A8F5FF" />
                <stop offset="60%" stopColor="#00D2FF" />
                <stop offset="90%" stopColor="#0077B6" />
                <stop offset="100%" stopColor="#03045E" />
              </radialGradient>
            </defs>

            {/* ORBIT RING 1: Tilted -20 deg with Primary Sphere */}
            <g transform="rotate(-20 400 350)">
              <ellipse
                cx="400"
                cy="350"
                rx="355"
                ry="195"
                stroke="#00D2FF"
                strokeWidth="4.5"
                strokeOpacity="0.3"
                filter="url(#orbitGlowHigh)"
              />
              <ellipse
                cx="400"
                cy="350"
                rx="355"
                ry="195"
                stroke="url(#orbitGlassGrad1)"
                strokeWidth="2.8"
              />
              {/* Specular Pulse */}
              <ellipse
                cx="400"
                cy="350"
                rx="355"
                ry="195"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeDasharray="50 550"
                className="animate-[spin_9s_linear_infinite]"
                style={{ transformOrigin: '400px 350px' }}
              />
              {/* 3D Glossy Blue Glass Sphere (Revolving smoothly along track) */}
              <g>
                <animateMotion
                  dur={motionIntensity === 'high' ? '9s' : '13s'}
                  repeatCount="indefinite"
                  path="M 400,155 A 355,195 0 1,1 399.9,155 Z"
                />
                <circle cx="0" cy="0" r="18" fill="url(#sphereGrad1)" filter="drop-shadow(0 6px 16px rgba(0,82,255,0.5))" />
                <circle cx="-6" cy="-6" r="5" fill="#FFFFFF" opacity="0.95" />
                <circle cx="-3" cy="-8" r="1.8" fill="#FFFFFF" opacity="0.8" />
              </g>
            </g>

            {/* ORBIT RING 2: Tilted +32 deg Counter-Orbiting Ring */}
            <g transform="rotate(32 400 350)">
              <ellipse
                cx="400"
                cy="350"
                rx="320"
                ry="160"
                stroke="url(#orbitGlassGrad2)"
                strokeWidth="2"
                strokeOpacity="0.8"
              />
              <ellipse
                cx="400"
                cy="350"
                rx="320"
                ry="160"
                stroke="#00D2FF"
                strokeWidth="3"
                strokeDasharray="30 400"
                className="animate-[spin_12s_linear_infinite_reverse]"
                style={{ transformOrigin: '400px 350px' }}
              />
              {/* Secondary Orbiting Sphere */}
              <g>
                <animateMotion
                  dur={motionIntensity === 'high' ? '11s' : '15s'}
                  repeatCount="indefinite"
                  path="M 400,190 A 320,160 0 1,0 400.1,190 Z"
                />
                <circle cx="0" cy="0" r="12" fill="url(#sphereGrad2)" filter="drop-shadow(0 4px 12px rgba(0,210,255,0.5))" />
                <circle cx="-4" cy="-4" r="3.5" fill="#FFFFFF" opacity="0.9" />
              </g>
            </g>
          </svg>
        </div>

        {/* ========================================================= */}
        {/* 2. CORE VISUAL: 3D EMBLEM OR CUSTOM USER MOTION VIDEO     */}
        {/* ========================================================= */}
        <div 
          style={{ transform: 'translateZ(55px)' }}
          className="relative z-20 w-[420px] sm:w-[500px] aspect-square flex items-center justify-center drop-shadow-[0_35px_70px_rgba(0,102,255,0.28)]"
        >
          {preset === 'custom' && customMediaUrl ? (
            /* USER CUSTOM MOTION LOGO (Video or Image) */
            <div className="relative w-full h-full p-4 flex items-center justify-center">
              <div className="relative w-[340px] sm:w-[400px] aspect-square rounded-[36px] overflow-hidden bg-white/40 backdrop-blur-2xl border-2 border-white shadow-[0_25px_60px_rgba(0,80,220,0.2)] flex items-center justify-center group/custom">
                {customMediaType === 'video' ? (
                  <video
                    src={customMediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={customMediaUrl}
                    alt="Custom 3D Motion Logo"
                    className="w-full h-full object-contain p-6"
                  />
                )}

                {/* Refractive Glass Rim Overlay */}
                <div className="absolute inset-0 pointer-events-none rounded-[36px] border-4 border-white/60 shadow-[inset_0_0_40px_rgba(0,130,255,0.25)]" />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none -translate-x-full animate-[shimmer_4s_infinite]" />
              </div>
            </div>
          ) : preset === 'gyro-orb' ? (
            /* GYROSCOPIC SAPPHIRE MONOLITH PRESET */
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-[340px] sm:w-[420px] aspect-square flex items-center justify-center">
                {/* Outer Gimbal Ring */}
                <div className="absolute inset-4 rounded-full border-4 border-[#00D2FF]/60 shadow-[0_0_30px_#00D2FF] animate-[spin_10s_linear_infinite]" />
                {/* Middle Gimbal Ring */}
                <div className="absolute inset-14 rounded-full border-4 border-[#0052FF]/70 shadow-[0_0_25px_#0052FF] animate-[spin_7s_linear_infinite_reverse]" />
                {/* Inner Core */}
                <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#0052FF] via-[#00D2FF] to-white shadow-[0_0_60px_#0052FF] animate-pulse flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-xl shadow-inner flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-[#0052FF]" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* DEFAULT: HIGH-FIDELITY CRYSTALLINE 3D DWH EMBLEM */
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full overflow-visible"
              fill="none"
            >
              <defs>
                <linearGradient id="glassTopFaceHigh" x1="20%" y1="10%" x2="80%" y2="90%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="25%" stopColor="#9DE7FF" stopOpacity="0.8" />
                  <stop offset="65%" stopColor="#259BFF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0B60FF" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="glassSideExtrusionHigh" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#004AD6" />
                  <stop offset="40%" stopColor="#002D9C" />
                  <stop offset="100%" stopColor="#001452" />
                </linearGradient>

                <linearGradient id="rimSpecularHigh" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="40%" stopColor="#7EE7FF" stopOpacity="0.95" />
                  <stop offset="80%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00C8FF" stopOpacity="0.85" />
                </linearGradient>

                <radialGradient id="causticGlowHigh" cx="45%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#00D2FF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="triGlassFaceHigh" x1="15%" y1="15%" x2="85%" y2="85%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="30%" stopColor="#87E2FF" stopOpacity="0.82" />
                  <stop offset="70%" stopColor="#1E8BFF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0047FF" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* 3D CAST SHADOW */}
              <g opacity="0.38" filter="blur(20px)">
                <path
                  d="M 160,110 L 320,110 C 375,110 410,145 410,200 L 410,340 C 410,375 385,400 350,400 C 315,400 295,375 295,340 L 295,275 C 295,245 270,225 240,225 L 160,225 Z"
                  fill="#002B99"
                  transform="translate(28, 48)"
                />
                <polygon
                  points="160,250 310,400 160,400"
                  fill="#002B99"
                  transform="translate(24, 44)"
                />
              </g>

              {/* 3D EXTRUDED SIDES */}
              <g fill="url(#glassSideExtrusionHigh)">
                <path
                  d="M 152,102 L 165,115 L 325,115 C 382,115 422,155 422,212 L 422,352 C 422,387 397,412 362,412 L 350,400 C 385,400 410,375 410,340 L 410,200 C 410,145 375,110 320,110 L 160,110 Z"
                  opacity="0.95"
                />
                <path
                  d="M 295,275 L 307,287 L 307,352 L 295,340 Z"
                  opacity="0.85"
                />
                <path
                  d="M 160,225 L 172,237 L 247,237 C 277,237 307,257 307,287 L 295,275 C 270,225 240,225 L 160,225 Z"
                  opacity="0.9"
                />
                <polygon
                  points="160,400 172,412 322,412 310,400"
                  opacity="0.95"
                />
                <polygon
                  points="310,400 322,412 172,262 160,250"
                  opacity="0.88"
                />
              </g>

              {/* FRONT 3D TRANSLUCENT GLASS BODIES */}
              <g>
                <path
                  d="M 160,110 L 320,110 C 375,110 410,145 410,200 L 410,340 C 410,375 385,400 350,400 C 315,400 295,375 295,340 L 295,275 C 295,245 270,225 240,225 L 160,225 Z"
                  fill="url(#glassTopFaceHigh)"
                  stroke="url(#rimSpecularHigh)"
                  strokeWidth="3"
                />
                <path
                  d="M 165,114 L 320,114 C 370,114 404,148 404,198 L 404,250"
                  stroke="#FFFFFF"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <ellipse
                  cx="330"
                  cy="190"
                  rx="85"
                  ry="60"
                  fill="url(#causticGlowHigh)"
                  pointerEvents="none"
                />
              </g>

              <g>
                <polygon
                  points="160,250 310,400 160,400"
                  fill="url(#triGlassFaceHigh)"
                  stroke="url(#rimSpecularHigh)"
                  strokeWidth="3"
                />
                <line
                  x1="164"
                  y1="254"
                  x2="304"
                  y2="394"
                  stroke="#FFFFFF"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <circle
                  cx="210"
                  cy="350"
                  r="50"
                  fill="url(#causticGlowHigh)"
                  opacity="0.8"
                  pointerEvents="none"
                />
              </g>
            </svg>
          )}
        </div>

        {/* ========================================================= */}
        {/* 3. THREE FLOATING FROSTED GLASS SATELLITE PILLS           */}
        {/* ========================================================= */}

        {/* PILL 1: TOP-RIGHT (Digital With Habib / Brand & Creative Studio) */}
        <motion.div
          style={{
            x: pill1ParallaxX,
            y: pill1ParallaxY,
            transform: 'translateZ(85px)',
          }}
          className="absolute top-[10%] -right-2 sm:-right-8 z-30 flex items-center gap-3.5 px-5 py-3 rounded-full bg-white/90 backdrop-blur-2xl border border-white shadow-[0_16px_40px_rgba(0,80,220,0.16)] hover:shadow-[0_20px_50px_rgba(0,80,220,0.25)] transition-all duration-300 hover:scale-105"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-[#0052FF] shadow-[0_0_12px_#0052FF]" />
            <span className="absolute w-5 h-5 rounded-full bg-[#00D2FF]/50 animate-ping" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-sm font-black text-[#071A41] tracking-tight leading-tight">
              Digital With Habib
            </span>
            <span className="text-xs font-bold text-[#0052FF] tracking-normal leading-tight">
              Brand & Creative Studio
            </span>
          </div>
        </motion.div>

        {/* PILL 2: BOTTOM-LEFT (99.4% Client Satisfaction) */}
        <motion.div
          style={{
            x: pill2ParallaxX,
            y: pill2ParallaxY,
            transform: 'translateZ(85px)',
          }}
          className="absolute bottom-[14%] -left-3 sm:-left-8 z-30 flex items-center gap-3.5 px-5 py-3.5 rounded-full bg-white/92 backdrop-blur-2xl border border-white shadow-[0_16px_40px_rgba(0,80,220,0.18)] hover:shadow-[0_20px_50px_rgba(0,80,220,0.26)] transition-all duration-300 hover:scale-105"
        >
          <div className="w-9 h-9 rounded-full bg-[#0052FF] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(0,82,255,0.4)] shrink-0">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-base font-black text-[#071A41] tracking-tight leading-none">
              99.4%
            </span>
            <span className="text-xs font-semibold text-slate-500 tracking-normal leading-tight mt-0.5">
              Client Satisfaction
            </span>
          </div>
        </motion.div>

        {/* PILL 3: BOTTOM-RIGHT (Full-Stack Design & Motion) */}
        <motion.div
          style={{
            x: pill3ParallaxX,
            y: pill3ParallaxY,
            transform: 'translateZ(80px)',
          }}
          className="absolute bottom-[6%] right-[6%] sm:right-[10%] z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-2xl border border-white/95 shadow-[0_12px_32px_rgba(0,80,220,0.14)] hover:shadow-[0_16px_40px_rgba(0,80,220,0.22)] transition-all duration-300 hover:scale-105"
        >
          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#0052FF] shrink-0" />
          <span className="text-xs font-bold text-slate-800 tracking-normal">
            Full-Stack Design & Motion
          </span>
        </motion.div>
      </motion.div>

      {/* ========================================================= */}
      {/* 4. MODAL FOR CUSTOMIZING / CHANGING 3D MOTION LOGO        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showCustomizer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCustomizer(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-blue-100 text-left space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#071A41]">3D Motion Logo Customizer</h3>
                    <p className="text-xs text-slate-500">Choose motion preset or upload your custom 3D logo video</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCustomizer(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. Motion Presets */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Motion Presets</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => selectPreset('crystalline')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      preset === 'crystalline'
                        ? 'border-[#0052FF] bg-blue-50/60 ring-2 ring-[#0052FF]/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-[#071A41]">Crystalline Core</span>
                      {preset === 'crystalline' && <Check className="w-4 h-4 text-[#0052FF]" />}
                    </div>
                    <p className="text-[11px] text-slate-500">Refractive glass sculpture with dual orbit planetary spheres</p>
                  </button>

                  <button
                    onClick={() => selectPreset('gyro-orb')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      preset === 'gyro-orb'
                        ? 'border-[#0052FF] bg-blue-50/60 ring-2 ring-[#0052FF]/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-[#071A41]">Gyroscopic Orb</span>
                      {preset === 'gyro-orb' && <Check className="w-4 h-4 text-[#0052FF]" />}
                    </div>
                    <p className="text-[11px] text-slate-500">High-speed kinetic gimbal rings & pulsing blue energy core</p>
                  </button>
                </div>
              </div>

              {/* 2. Upload Custom Motion Logo / Video */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Upload Your Own 3D Motion Logo</label>
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 rounded-2xl border-2 border-dashed border-blue-200 hover:border-[#0052FF] bg-blue-50/30 hover:bg-blue-50/70 transition-all cursor-pointer text-center space-y-2 group/upload"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm mx-auto flex items-center justify-center text-[#0052FF] group-hover/upload:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#071A41]">
                    Click to Upload Custom Video or 3D Logo
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Supports MP4, WebM (motion video) or PNG, SVG, GIF
                  </div>
                </div>

                {customMediaUrl && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      {customMediaType === 'video' ? <Film className="w-4 h-4 text-[#0052FF]" /> : <ImageIcon className="w-4 h-4 text-[#0052FF]" />}
                      <span>Active Custom Media Loaded</span>
                    </div>
                    <button
                      onClick={() => selectPreset('custom')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${preset === 'custom' ? 'bg-[#0052FF] text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      {preset === 'custom' ? 'Active' : 'Apply'}
                    </button>
                  </div>
                )}
              </div>

              {/* 3. 3D Logo Scale Slider & Presets */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-[#071A41] flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-[#0052FF]" />
                      3D Logo Scale / Size
                    </label>
                    <p className="text-[11px] text-slate-500">Adjust the dimensions and scale of the 3D motion logo</p>
                  </div>
                  <span className="font-mono text-xs font-black text-[#0052FF] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {Math.round(logoScale * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 font-bold">50%</span>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.05"
                    value={logoScale}
                    onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                    className="w-full accent-[#0052FF] cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400 font-bold">180%</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {[
                    { label: 'Compact (75%)', val: 0.75 },
                    { label: 'Normal (100%)', val: 1.0 },
                    { label: 'Large (125%)', val: 1.25 },
                    { label: 'Hero (150%)', val: 1.5 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => handleScaleChange(p.val)}
                      className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all ${
                        Math.abs(logoScale - p.val) < 0.04
                          ? 'bg-[#0052FF] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Motion Speed / Intensity Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <div className="text-xs font-bold text-[#071A41]">Motion Dynamics</div>
                  <div className="text-[11px] text-slate-500">Toggle between standard and hyper-speed motion</div>
                </div>
                <button
                  onClick={toggleIntensity}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#071A41] text-xs font-bold transition-all"
                >
                  Mode: <span className="text-[#0052FF] capitalize">{motionIntensity}</span>
                </button>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={resetDefault}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>

                <button
                  onClick={() => setShowCustomizer(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0052FF] hover:bg-[#0040CC] text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
