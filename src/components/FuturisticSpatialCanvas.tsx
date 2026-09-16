import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react';

interface FuturisticSpatialCanvasProps {
  mouseXMotion?: MotionValue<number>;
  mouseYMotion?: MotionValue<number>;
}

export const FuturisticSpatialCanvas: React.FC<FuturisticSpatialCanvasProps> = ({
  mouseXMotion,
  mouseYMotion
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fallback motion values if not passed from parent
  const localX = useMotionValue<number>(0);
  const localY = useMotionValue<number>(0);
  const targetX = mouseXMotion || localX;
  const targetY = mouseYMotion || localY;

  const springConfig = { damping: 30, stiffness: 120, mass: 0.8 };
  const smoothX = useSpring(targetX, springConfig) as unknown as MotionValue<number>;
  const smoothY = useSpring(targetY, springConfig) as unknown as MotionValue<number>;

  // Parallax transforms for depth layers
  const orb1X = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const orb1Y = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const orb2X = useTransform(smoothX, [-0.5, 0.5], [45, -45]);
  const orb2Y = useTransform(smoothY, [-0.5, 0.5], [35, -35]);

  const pillarParallaxX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  // Subtle interactive particle nodes for white futuristic theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for subtle spatial depth
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.4 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between close particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 102, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with soft cyan/sapphire glow
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha + Math.sin(time + p.pulse) * 0.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 140, 255, ${Math.max(0.05, currentAlpha)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Base Pristine White Studio Architectural Foundation */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FD] to-[#EDF4FC]"
      />

      {/* 2. Vertical Translucent Architectural Columns (Matching User Upload Image) */}
      <motion.div 
        style={{ x: pillarParallaxX }}
        className="absolute inset-0 flex justify-between pointer-events-none opacity-40"
      >
        <div className="w-1/6 h-full border-r border-blue-200/40 bg-gradient-to-r from-transparent to-blue-50/30" />
        <div className="w-1/4 h-full border-r border-blue-200/30 bg-gradient-to-r from-blue-50/20 to-transparent" />
        <div className="w-1/5 h-full border-r border-blue-200/40 bg-gradient-to-l from-blue-50/40 to-transparent" />
        <div className="w-1/6 h-full border-l border-blue-200/30 bg-gradient-to-l from-transparent to-blue-50/20" />
      </motion.div>

      {/* 3. Luminous Cyan & Cobalt Atmospheric Auras (Parallax Depth) */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute -top-32 -left-20 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#00D2FF]/20 via-[#146BFF]/15 to-transparent blur-[120px]"
      />

      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute top-1/4 -right-32 w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-[#00A3FF]/18 via-[#0052FF]/12 to-transparent blur-[130px]"
      />

      {/* Center Specular Soft Blue Light Core */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-200/25 blur-[120px]" />

      {/* 4. Canvas Particle Constellation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* 5. Spatial Optical Flare Rays */}
      <div 
        className="absolute top-0 left-1/4 w-[2px] h-[400px] bg-gradient-to-b from-transparent via-[#00D2FF]/25 to-transparent rotate-[35deg] blur-xs"
      />
      <div 
        className="absolute top-10 right-1/3 w-[1.5px] h-[320px] bg-gradient-to-b from-transparent via-[#146BFF]/20 to-transparent -rotate-[25deg] blur-xs"
      />
    </div>
  );
};
