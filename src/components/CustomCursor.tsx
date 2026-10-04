import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'visit' | 'read' | 'play' | 'view'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Damped spring physics for smooth, non-laggy follower matching Arpeggio video
  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show custom cursor on devices that support mouse hover
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Detect cursor context
      const target = e.target as HTMLElement | null;
      if (target) {
        const visitEl = target.closest('[data-cursor="visit"], .cursor-visit, [data-project-card]');
        const viewEl = target.closest('[data-cursor="view"], .cursor-view, [data-cursor="slide"]');
        const readEl = target.closest('[data-cursor="read"], .cursor-read');
        const playEl = target.closest('[data-cursor="play"], .cursor-play');
        const interactiveEl = target.closest('button, a, input, textarea, select, [role="button"], .interactive-element');

        if (viewEl) {
          setCursorType('view');
        } else if (visitEl) {
          setCursorType('visit');
        } else if (readEl) {
          setCursorType('read');
        } else if (playEl) {
          setCursorType('play');
        } else if (interactiveEl) {
          setCursorType('pointer');
        } else {
          setCursorType('default');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const isVisit = cursorType === 'visit';
  const isView = cursorType === 'view';
  const isRead = cursorType === 'read';
  const isPlay = cursorType === 'play';
  const isSpecial = isVisit || isView || isRead || isPlay;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Interactive Cursor Badge / Magnetic Dot */}
      <motion.div
        className="pointer-events-none absolute rounded-full flex items-center justify-center font-bold tracking-wider select-none shadow-xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: isSpecial ? 84 : cursorType === 'pointer' ? 24 : 14,
          height: isSpecial ? 84 : cursorType === 'pointer' ? 24 : 14,
          backgroundColor: isSpecial ? '#ffffff' : 'var(--brand-primary)',
          color: isSpecial ? 'var(--brand-ink)' : '#ffffff',
          scale: 1,
          opacity: 1
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      >
        {isVisit && (
          <span className="pointer-events-none text-xs font-black tracking-widest text-black uppercase font-['Inter',sans-serif]">
            VISIT
          </span>
        )}
        {isView && (
          <span className="pointer-events-none text-xs font-black tracking-widest text-[var(--brand-primary)] uppercase font-['Inter',sans-serif]">
            VIEW
          </span>
        )}
        {isRead && (
          <span className="pointer-events-none text-xs font-black tracking-widest text-black uppercase font-['Inter',sans-serif]">
            READ
          </span>
        )}
        {isPlay && (
          <span className="pointer-events-none text-xs font-black tracking-widest text-black uppercase font-['Inter',sans-serif]">
            PLAY
          </span>
        )}
      </motion.div>
    </div>
  );
};
