import { useMotionValue, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "./useMedia.js";

/**
 * Scroll-linked value for parallax. Under prefers-reduced-motion it returns a
 * still value (the first of `output`), so nothing drifts for people who asked
 * for less motion - MotionConfig alone does not cover scroll-linked values.
 */
export function useParallax(
  ref,
  output,
  { offset = ["start end", "end start"], input = [0, 1] } = {},
) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const moving = useTransform(scrollYProgress, input, output);
  const still = useMotionValue(output[0]);
  return reduced ? still : moving;
}

/** Raw progress of an element through the viewport, for custom transforms. */
export function useSectionProgress(ref, offset = ["start end", "end start"]) {
  return useScroll({ target: ref, offset }).scrollYProgress;
}
