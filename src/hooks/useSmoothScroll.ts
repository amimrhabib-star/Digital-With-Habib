import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeLenisInstance: Lenis | null = null;

export function getLenis() {
  return activeLenisInstance;
}

export function useSmoothScroll(pageKey?: string) {
  useEffect(() => {
    // Respect prefers-reduced-motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Suggested Lenis duration 1.0–1.3 with natural easing
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    activeLenisInstance = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      activeLenisInstance = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Whenever pageKey (e.g. route like 'work' or 'home') changes, recalculate scroll dimensions
  useEffect(() => {
    if (!activeLenisInstance) return;
    const timer1 = setTimeout(() => {
      activeLenisInstance?.resize();
      ScrollTrigger.refresh();
    }, 100);
    const timer2 = setTimeout(() => {
      activeLenisInstance?.resize();
      ScrollTrigger.refresh();
    }, 450);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pageKey]);
}
