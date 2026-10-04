import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SlatTransitionProps {
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
}

export const SlatTransition: React.FC<SlatTransitionProps> = ({
  isTransitioning,
  onTransitionComplete
}) => {
  const slatCount = 7;
  const slats = Array.from({ length: slatCount }, (_, i) => i);

  return (
    <AnimatePresence onExitComplete={onTransitionComplete}>
      {isTransitioning && (
        <motion.div
          key="slat-overlay"
          className="fixed inset-0 z-[999] pointer-events-none flex flex-col"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, delay: 0.55 }}
        >
          {slats.map((index) => {
            const delay = index * 0.035;
            return (
              <motion.div
                key={index}
                className="flex-1 w-full bg-[#f4f4f5] border-b border-zinc-300/40 relative shadow-sm"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{
                  scaleX: [0, 1, 1, 0],
                  originX: [0, 0, 1, 1],
                  transition: {
                    duration: 0.7,
                    times: [0, 0.45, 0.55, 1],
                    ease: [0.76, 0, 0.24, 1],
                    delay
                  }
                }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
