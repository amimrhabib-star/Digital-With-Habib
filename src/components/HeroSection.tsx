import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, MessageSquare, Sparkles, Zap, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { MagneticButton } from './MagneticButton';
import { FuturisticHero3DGlassEmblem } from './FuturisticHero3DGlassEmblem';
import { FuturisticSpatialCanvas } from './FuturisticSpatialCanvas';

interface HeroSectionProps {
  onOpenInquiry: () => void;
  onOpenVideo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry, onOpenVideo }) => {
  const { settings } = useStudioContent();
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Interactive mouse tracking for cinematic camera movement and parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120, mass: 0.6 };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Depth layers parallax
  const textParallaxX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const textParallaxY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const floatBadge1X = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const floatBadge1Y = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  const floatBadge2X = useTransform(smoothX, [-0.5, 0.5], [26, -26]);
  const floatBadge2Y = useTransform(smoothY, [-0.5, 0.5], [22, -22]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToWork = () => {
    const workElem = document.querySelector('#work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Word-by-word staggered animation variants for world-class text presentation
  const headlineWords = settings.heroHeadline.split(' ');
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="home"
      ref={heroContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-28 sm:pt-36 pb-20 md:pb-28 overflow-hidden bg-white text-[#071A41] select-none transition-colors duration-500"
    >
      {/* 1. Futuristic Spatial White Architectural Canvas & Atmospheric Light Rays */}
      <FuturisticSpatialCanvas mouseXMotion={mouseX} mouseYMotion={mouseY} />

      {/* Floating 3D Spatial Holographic Accents in White Glass */}
      <motion.div
        style={{ x: floatBadge2X, y: floatBadge2Y }}
        className="absolute bottom-14 left-[10%] hidden xl:flex items-center gap-2.5 px-4 py-2 rounded-full glass-spatial-white border border-white shadow-[0_12px_30px_rgba(0,102,255,0.12)] backdrop-blur-2xl z-20 animate-float-3"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#0052FF]" />
        <span className="text-xs font-mono tracking-wider uppercase text-slate-700 font-semibold">
          Apple Vision Pro &bull; Refractive Glass
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: World-Class Animated Typography & Next-Gen Blue-White Buttons */}
          <motion.div
            style={{ x: textParallaxX, y: textParallaxY }}
            className="lg:col-span-6 space-y-6 sm:space-y-8 text-left"
          >
            
            {/* Top Apple Vision Pro Style Floating Frosted Glass Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-spatial-white border border-white/90 text-[#071A41] text-xs font-semibold tracking-wide uppercase shadow-[0_10px_25px_rgba(0,70,200,0.1)] backdrop-blur-2xl group hover:border-[#0052FF]/30 transition-all cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0052FF] shadow-[0_0_8px_#0052FF]" />
              </span>
              <span className="text-slate-800 font-bold tracking-wider">
                MAKE IT IMPOSSIBLE TO IGNORE.
              </span>
            </motion.div>

            {/* Main Headline: Animated Staggered Words with Radiant Blue Highlight */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#071A41] tracking-[-0.035em] leading-[1.08]"
            >
              <span className="inline-block">
                {headlineWords.map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    variants={wordVariants}
                    className="inline-block mr-[0.28em] text-[#071A41]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#0077FF] to-[#00D2FF]"
              >
                {settings.heroHighlight}
                {/* Luminous cyan-blue flare underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#0052FF] via-[#00D2FF] to-transparent origin-left rounded-full"
                />
              </motion.span>
            </motion.h1>

            {/* Subtitle: High legibility with refined glassmorphic depth */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl"
            >
              {settings.heroSubtitle}
            </motion.p>

            {/* Action Buttons: Perfect Blue & White Color Combination with Click Ripple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              {/* Primary Button: Perfect Blue-White Combination */}
              <MagneticButton
                id="hero-start-project-btn"
                onClick={onOpenInquiry}
                className="btn-futuristic-perfect group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-bold text-sm tracking-tight cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </MagneticButton>

              {/* Secondary Button: Crystalline White-to-Blue Inversion */}
              <MagneticButton
                id="hero-explore-work-btn"
                onClick={scrollToWork}
                className="btn-futuristic-secondary group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-tight cursor-pointer"
              >
                <span className="relative z-10">Explore All Work</span>
              </MagneticButton>

              {/* WhatsApp Translucent Emerald-Cyan Glass Button */}
              <MagneticButton
                as="a"
                id="hero-whatsapp-btn"
                href="https://wa.me/8801734144347?text=Hello!%20I%20would%20like%20to%20start%20a%20project%20with%20DWH%20Studio."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 font-bold text-sm tracking-tight border border-emerald-400/40 backdrop-blur-xl transition-all cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span className="text-emerald-900 group-hover:text-emerald-950 font-bold">Chat on WhatsApp</span>
              </MagneticButton>
            </motion.div>

            {/* Trust Line with Glowing Cobalt Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="pt-3 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-500"
            >
              <span className="w-2 h-2 rounded-full bg-[#0052FF] shadow-[0_0_8px_#0052FF]" />
              <span>One connected team for branding, UI/UX design, development, and 3D motion.</span>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Translucent Blue Glass Emblem (Takes More Prominent Space, Freely Floating) */}
          <div className="lg:col-span-6 relative flex items-center justify-center w-full">
            <FuturisticHero3DGlassEmblem onOpenInquiry={onOpenInquiry} />
          </div>

        </div>
      </div>
    </section>
  );
};
