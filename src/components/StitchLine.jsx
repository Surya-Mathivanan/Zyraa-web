import { useId, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useMedia.js";
import "./stitch-line.css";

/**
 * A sewing line that stitches itself along a path as the section scrolls
 * through the viewport.
 *
 * framer-motion's pathLength works by rewriting stroke-dasharray, which would
 * erase the dashed running-stitch look, so the dashed thread is drawn once and
 * revealed through a mask whose solid stroke is the part that draws on.
 *
 * `d` is an SVG path in a 0–1000 × 0–1000 box, stretched to the wrapper.
 */
export default function StitchLine({ d, className = "", offset = ["start 85%", "end 35%"] }) {
  const ref = useRef(null);
  const maskId = `stitch-${useId().replace(/:/g, "")}`;
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={`stitch ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="-100" y="-100" width="1200" height="1200">
            <motion.path
              d={d}
              fill="none"
              stroke="#fff"
              strokeWidth="16"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduced ? 1 : progress }}
            />
          </mask>
        </defs>
        <path d={d} className="stitch-guide" vectorEffect="non-scaling-stroke" />
        <path d={d} className="stitch-thread" vectorEffect="non-scaling-stroke" mask={`url(#${maskId})`} />
      </svg>
    </div>
  );
}
