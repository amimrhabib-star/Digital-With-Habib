import React from 'react';
import { motion } from 'motion/react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    'BRAND SYSTEMS',
    '3D SPATIAL UI',
    'WEB ENGINEERING',
    'DIGITAL MARKETING',
    '4K MOTION GRAPHICS',
    'AI VIDEO PRODUCTION',
    'ECOMMERCE ACCELERATION',
    'VISIONOS DESIGN'
  ];

  return (
    <div className="py-4 bg-white/90 backdrop-blur-md border-y border-blue-100/80 overflow-hidden relative select-none">
      {/* Edge gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-10 w-max items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25
        }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-10">
            <span className="text-xs sm:text-sm font-black tracking-widest text-slate-500 hover:text-[#0052FF] transition-colors uppercase">
              {item}
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF] shadow-[0_0_8px_#0052FF]" />
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
