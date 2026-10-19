import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useMedia.js";

/**
 * Counts a number up when it scrolls into view. Renders the final value in the
 * markup from the start (for crawlers and reduced motion) and only animates
 * once it is actually seen.
 */
export default function CountUp({ value, decimals = 0, suffix = "", prefix = "", duration = 1400, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduced || started.current) return undefined;
    started.current = true;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setShown(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setShown(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
