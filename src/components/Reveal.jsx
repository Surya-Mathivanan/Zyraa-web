import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.2, 0.8, 0.2, 1];

export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  once = true,
  amount = 0.25,
  className,
  as = "div",
  style,
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/**
 * Observes the heading itself (never a clipped child), so the words always
 * reveal once the heading is on screen. Includes a fallback check in case the
 * observer does not fire (e.g. mid page-transition).
 */
export function SplitWords({ text, className, delay = 0, stagger = 0.06, as = "h2", once = true, amount = 0.3 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setForced(true);
    }, 500);
    return () => clearTimeout(id);
  }, []);

  const visible = inView || forced;
  const Tag = motion[as] || motion.h2;
  const words = text.split(" ");
  const hidden = { y: "110%", opacity: 0, rotate: 3 };

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="split-word">
            <motion.span
              style={{ display: "inline-block" }}
              initial={hidden}
              animate={visible ? { y: "0%", opacity: 1, rotate: 0 } : hidden}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

export function Line({ delay = 0, className }) {
  return (
    <motion.span
      className={className}
      style={{ display: "block", height: 1, background: "currentColor", transformOrigin: "left" }}
      initial={{ scaleX: 0, opacity: 0.4 }}
      whileInView={{ scaleX: 1, opacity: 0.4 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease }}
    />
  );
}
