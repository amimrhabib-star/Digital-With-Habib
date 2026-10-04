import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

export function CountUpMetric({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)([^\d]*)$/);
    if (!match || reducedMotion) { node.textContent = value; return; }
    const [, prefix, number, suffix] = match;
    const decimals = number.split('.')[1]?.length ?? 0;
    node.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
    if (!visible) return;
    const controls = animate(0, Number(number), {
      duration: 1.45,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: current => { node.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`; },
      onComplete: () => { node.textContent = value; },
    });
    return () => controls.stop();
  }, [value, visible, reducedMotion, delay]);

  return <span className="relative inline-grid"><span className="invisible" aria-hidden="true">{value}</span><span className="absolute inset-0" aria-hidden="true" ref={ref}>{value}</span><span className="sr-only">{value}</span></span>;
}
