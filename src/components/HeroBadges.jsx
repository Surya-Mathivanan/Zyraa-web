import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMedia, useReducedMotion } from "../hooks/useMedia.js";
import "./hero-badges.css";

const ease = [0.2, 0.8, 0.2, 1];

/** Cycles 0…n-1 every `ms`, frozen at 0 under reduced motion. */
function useCycle(n, ms) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms, reduced]);
  return reduced ? 0 : i;
}

/* ── Icons, each with its own motion ─────────────────────────────────── */

/** A needle stitching a running thread through cloth. */
function NeedleIcon() {
  return (
    <svg viewBox="0 0 32 32" className="hb-icon hb-needle" aria-hidden="true">
      <path d="M2 23h28" className="hb-cloth" />
      <path d="M3 23h26" className="hb-thread" />
      <g className="hb-needle-body">
        <path d="M17 3l-2 17" className="hb-needle-steel" />
        <ellipse cx="16.8" cy="6" rx="1" ry="2" className="hb-needle-eye" transform="rotate(7 16.8 6)" />
      </g>
    </svg>
  );
}

/** A map pin with a radar pulse rippling out from it. */
function PinIcon() {
  return (
    <svg viewBox="0 0 32 32" className="hb-icon hb-pin" aria-hidden="true">
      <ellipse cx="16" cy="27" rx="9" ry="2.6" className="hb-ripple" />
      <ellipse cx="16" cy="27" rx="9" ry="2.6" className="hb-ripple hb-ripple--late" />
      <g className="hb-pin-body">
        <path d="M16 26s7.5-6.4 7.5-12.6A7.5 7.5 0 0 0 8.5 13.4C8.5 19.6 16 26 16 26Z" className="hb-pin-shape" />
        <circle cx="16" cy="13.4" r="2.8" className="hb-pin-dot" />
      </g>
    </svg>
  );
}

/** Monitor, browser and phone, the active one lit. */
function Devices({ active }) {
  return (
    <span className="hb-devices" aria-hidden="true">
      <svg viewBox="0 0 22 18" className={`hb-dev ${active === 0 ? "is-on" : ""}`}>
        <rect x="1.5" y="1.5" width="19" height="11.5" rx="2" />
        <path d="M8 16.5h6M11 13v3.5" />
      </svg>
      <svg viewBox="0 0 22 18" className={`hb-dev ${active === 1 ? "is-on" : ""}`}>
        <rect x="1.5" y="2" width="19" height="14" rx="2.5" />
        <path d="M1.5 6h19" />
        <circle cx="4.5" cy="4" r="0.6" />
        <circle cx="6.8" cy="4" r="0.6" />
      </svg>
      <svg viewBox="0 0 14 18" className={`hb-dev hb-dev--phone ${active === 2 ? "is-on" : ""}`}>
        <rect x="2" y="1" width="10" height="16" rx="2.4" />
        <path d="M5.5 14h3" />
      </svg>
    </span>
  );
}

/* ── Word rotator: the box keeps the width of its longest word, so the
      badge never jitters as the words change. ─────────────────────────── */
function Rotator({ words, index }) {
  return (
    <span className="hb-rotator">
      {words.map((w) => (
        <span key={w} className="hb-rotator-sizer" aria-hidden="true">
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="hb-rotator-word"
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const AUDIENCES = ["garment units", "knitwear mills", "production floors"];
const TILTS = [-1.6, 1.2, -0.8];
const SURFACES = ["Admin", "Web", "Mobile"];

/**
 * Phones: the three badges share one row and take turns — each slides in,
 * holds for a few seconds, then hands over. Dots show which one is up and
 * jump to it when tapped. Keeps the hero short so ZYRAA stays on screen.
 */
function BadgeCycle({ badges }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % badges.length), 3400);
    return () => clearInterval(id);
  }, [reduced, paused, badges.length]);

  const b = badges[i];
  return (
    <motion.div
      className={`hb-cycle hb-badge hb-badge--${b.key}`}
      role="group"
      aria-label="About Zyraa"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease }}
    >
      <span className="hb-cycle-stage" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={b.key}
            className="hb-cycle-slide"
            initial={{ y: 16, opacity: 0, filter: "blur(3px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -16, opacity: 0, filter: "blur(3px)" }}
            transition={{ duration: 0.45, ease }}
          >
            <span className="hb-code">0{i + 1}</span>
            <span className="hb-icon-wrap">{b.icon}</span>
            <span className="hb-body">{b.body}</span>
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hb-dots">
        {badges.map((x, k) => (
          <button
            key={x.key}
            type="button"
            className={k === i ? "is-on" : ""}
            aria-label={x.sr}
            aria-pressed={k === i}
            onClick={() => {
              setI(k);
              setPaused(true);
            }}
          />
        ))}
      </span>
      <span className="sr-only">{badges.map((x) => x.sr).join(". ")}.</span>
    </motion.div>
  );
}

export default function HeroBadges({ city }) {
  const compact = useMedia("(max-width: 640px)");
  const audience = useCycle(AUDIENCES.length, 2600);
  const surface = useCycle(SURFACES.length, 1500);

  const badges = [
    {
      key: "who",
      icon: <NeedleIcon />,
      body: (
        <>
          <span className="hb-label">HRMS for</span>
          <Rotator words={AUDIENCES} index={audience} />
        </>
      ),
      sr: "HRMS for garment units, knitwear mills and production floors",
    },
    {
      key: "where",
      icon: <PinIcon />,
      body: (
        <>
          <span className="hb-strong">{city}</span>
          <span className="hb-label">India</span>
        </>
      ),
      sr: `${city}, India`,
    },
    {
      key: "apps",
      icon: <Devices active={surface} />,
      body: (
        <span className="hb-apps">
          {SURFACES.map((s, i) => (
            <span key={s} className={i === surface ? "is-on" : ""}>
              {s}
            </span>
          ))}
        </span>
      ),
      sr: "Admin portal, web app and mobile app",
    },
  ];

  if (compact) return <BadgeCycle badges={badges} />;

  return (
    <ul className="hb" aria-label="About Zyraa">
      {badges.map((b, i) => (
        <motion.li
          key={b.key}
          className={`hb-badge hb-badge--${b.key}`}
          // Stamped on: drops in a little large and twisted, then settles at
          // its sticker tilt. Hover straightens and lifts it.
          initial={{ opacity: 0, scale: 1.3, rotate: TILTS[i] - 8, y: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: TILTS[i], y: 0 }}
          whileHover={{ rotate: 0, x: -2, y: -2 }}
          whileTap={{ x: 2, y: 2 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 + i * 0.14 }}
        >
          <span className="hb-code">No.0{i + 1}</span>
          <span className="hb-icon-wrap">{b.icon}</span>
          <span className="hb-body" aria-hidden="true">
            {b.body}
          </span>
          <span className="sr-only">{b.sr}</span>
        </motion.li>
      ))}
    </ul>
  );
}
