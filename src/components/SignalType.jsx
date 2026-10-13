import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useMedia.js";
import "./signal-type.css";

/**
 * A headline that flickers on like a neon sign.
 *
 * Each letter starts unlit (outline only), then ignites in a randomised order
 * with a few flicker blips before settling. Once lit, a subset of letters keeps
 * a slow buzz so the sign never looks completely static.
 *
 * The flicker is pure CSS keyframes driven by a per-letter `--st-delay`, so
 * there is no RAF loop: the ignite runs once when the heading scrolls into view
 * and the idle buzz pauses whenever the heading is off-screen.
 *
 * Fails lit, never dark. The CSS resting state is the LIT sign; the unlit
 * outline is only applied once we have committed to animating ("armed"), and a
 * timer lights the sign regardless if the viewport observer never reports — so
 * a missed IntersectionObserver callback costs the flicker, not the headline.
 *
 * Decorative by default — the letters are aria-hidden and the wrapper carries
 * no label, so pages that already have a real heading (e.g. the sr-only <h1> on
 * Home) are announced exactly once. Pass `label` to expose the text instead.
 */

// Deterministic shuffle so the ignite order is stable across re-renders.
function shuffledOrder(length, seed) {
  const order = Array.from({ length }, (_, i) => i);
  let s = seed;
  for (let i = order.length - 1; i > 0; i -= 1) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = s % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function seedFrom(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export default function SignalType({
  text = "ZYRAA",
  as: Tag = "div",
  className = "",
  order = "random",
  stagger = 0.11,
  duration = 1.15,
  buzz = true,
  label,
  style,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Decided on the first render, so the unlit outline is in the initial DOM and
  // there is no flash of a lit sign before the flicker starts.
  const [armed] = useState(() => !reduced);

  // Entrance fires once; the second observer only gates the idle buzz, so it
  // stops costing anything once the hero is scrolled past.
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const onScreen = useInView(ref, { amount: 0 });

  const chars = useMemo(() => {
    const list = [...text];
    const seed = seedFrom(text);
    const letterIdx = list.map((c, i) => (c.trim() ? i : -1)).filter((i) => i >= 0);
    const sequence = order === "random" ? shuffledOrder(letterIdx.length, seed) : letterIdx.map((_, i) => i);

    // position in the ignite sequence, keyed by index in the original string
    const slot = new Map();
    letterIdx.forEach((originalIdx, nth) => {
      slot.set(originalIdx, sequence.indexOf(nth));
    });

    return list.map((char, i) => ({
      char,
      key: `${char}-${i}`,
      isSpace: !char.trim(),
      delay: (slot.get(i) ?? 0) * stagger,
      // Roughly a third of the letters keep buzzing, desynced by a negative delay.
      buzzing: buzz && seedFrom(`${text}${i}`) % 3 === 0,
      buzzDelay: -((seedFrom(`${char}${i}x`) % 700) / 100),
    }));
  }, [text, order, stagger, buzz]);

  // Safety net: light the sign even if the observer never reports (hidden tab,
  // background render, prerender). Worst case the flicker is skipped.
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    if (!armed) return undefined;
    const total = (duration + chars.length * stagger) * 1000 + 700;
    const id = setTimeout(() => setExpired(true), total);
    return () => clearTimeout(id);
  }, [armed, duration, stagger, chars.length]);

  const classes = ["st"];
  if (armed) classes.push("st--arm");
  if (armed && inView) classes.push("st--lit");
  if (armed && expired && !inView) classes.push("st--force-lit");
  if (armed && onScreen) classes.push("st--onscreen");
  if (className) classes.push(className);

  return (
    <Tag
      ref={ref}
      className={classes.join(" ")}
      style={style}
      aria-hidden={label ? undefined : "true"}
      aria-label={label ? text : undefined}
    >
      {chars.map((c) =>
        c.isSpace ? (
          <span key={c.key} className="st-space">
            &nbsp;
          </span>
        ) : (
          <span
            key={c.key}
            className={`st-char ${c.buzzing ? "st-char--buzz" : ""}`}
            style={{ "--st-buzz-delay": `${c.buzzDelay}s` }}
            aria-hidden="true"
          >
            <span
              className="st-char-inner"
              style={{ "--st-delay": `${c.delay}s`, "--st-dur": `${duration}s` }}
            >
              {c.char}
            </span>
          </span>
        )
      )}
    </Tag>
  );
}
