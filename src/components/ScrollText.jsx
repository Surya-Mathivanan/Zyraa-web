import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useMedia.js";

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className={accent ? "accent-word" : undefined} style={{ opacity }}>
      {children}
    </motion.span>
  );
}

// *An accent* may span several words: an opening * switches it on and a
// word ending in * (before any punctuation) switches it off.
function tokenize(text) {
  const out = [];
  let open = false;
  for (const w of text.split(" ")) {
    if (w.startsWith("*")) open = true;
    out.push({ word: w.replace(/\*/g, ""), accent: open });
    if (/\*[.,;:!?]?$/.test(w)) open = false;
  }
  return out;
}

/**
 * A paragraph that "reads itself": each word brightens in turn as the block
 * scrolls through the middle of the screen. Words wrapped in *asterisks* are
 * set as accent words. The full text is real text in the DOM throughout.
 */
export default function ScrollText({ text, as: Tag = "p", className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const tokens = tokenize(text);

  return (
    <Tag ref={ref} className={className}>
      {tokens.map((t, i) => {
        const start = i / tokens.length;
        const end = start + 1 / tokens.length;
        return (
          <span key={i}>
            {reduced ? (
              <span className={t.accent ? "accent-word" : undefined}>{t.word}</span>
            ) : (
              <Word progress={scrollYProgress} range={[start, end]} accent={t.accent}>
                {t.word}
              </Word>
            )}
            {i < tokens.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
