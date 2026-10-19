import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useMedia.js";
import "./shatter-type.css";

const rand = (a, b) => a + Math.random() * (b - a);

function buildShards(cols, rows) {
  const pts = [];
  for (let r = 0; r <= rows; r += 1) {
    const row = [];
    for (let c = 0; c <= cols; c += 1) {
      let x = (c / cols) * 100;
      let y = (r / rows) * 100;
      if (c > 0 && c < cols) x += rand(-0.38, 0.38) * (100 / cols);
      if (r > 0 && r < rows) y += rand(-0.38, 0.38) * (100 / rows);
      row.push([x, y]);
    }
    pts.push(row);
  }

  const shards = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const a = pts[r][c];
      const b = pts[r][c + 1];
      const d = pts[r + 1][c + 1];
      const e = pts[r + 1][c];
      const tris = Math.random() > 0.5 ? [[a, b, d], [a, d, e]] : [[a, b, e], [b, d, e]];
      tris.forEach((tri) => {
        const cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3;
        const cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
        shards.push({
          poly: tri.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(", "),
          cx,
          cy,
          seed: Math.random(),
          facet: rand(0, 360),
        });
      });
    }
  }
  return shards;
}

function Shard({ shard, index, total, size, mouseX, mouseY, state, reduced }) {
  const { cx, cy, seed } = shard;
  const radius = 150;

  const influence = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (mx < -1000) return { s: 0, dx: 0, dy: 0 };
    const px = (cx / 100) * size.w;
    const py = (cy / 100) * size.h;
    const dx = px - mx;
    const dy = py - my;
    const d = Math.hypot(dx, dy);
    if (d > radius) return { s: 0, dx: 0, dy: 0 };
    const s = (1 - d / radius) ** 2;
    return { s, dx: (dx / (d || 1)) * s, dy: (dy / (d || 1)) * s };
  });

  const x = useSpring(useTransform(influence, (v) => v.dx * 14), { stiffness: 260, damping: 18 });
  const y = useSpring(useTransform(influence, (v) => v.dy * 14), { stiffness: 260, damping: 18 });
  const rotate = useSpring(useTransform(influence, (v) => v.s * (seed - 0.5) * 9), { stiffness: 260, damping: 18 });
  const facet = useSpring(useTransform(influence, (v) => 0.1 + v.s * 0.55), { stiffness: 200, damping: 20 });

  const dirX = cx - 50;
  const dirY = cy - 50;
  const mag = Math.hypot(dirX, dirY) || 1;
  const distFromCenter = mag / 70;

  const variants = useMemo(
    () => ({
      scattered: {
        x: (dirX / mag) * rand(160, 320) + rand(-60, 60),
        y: (dirY / mag) * rand(120, 260) - 80 + rand(-60, 60),
        rotate: rand(-70, 70),
        scale: 0.6,
        opacity: 0,
      },
      assembled: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 110,
          damping: 16,
          mass: 0.9,
          delay: 0.1 + distFromCenter * 0.35 + (index / total) * 0.2,
          opacity: { duration: 0.35, delay: 0.1 + distFromCenter * 0.35 },
        },
      },
      shatter: {
        x: (dirX / mag) * rand(260, 520) + rand(-80, 80),
        y: (dirY / mag) * rand(200, 420) + 240 + rand(-60, 60),
        rotate: rand(-200, 200),
        scale: rand(0.5, 0.9),
        opacity: 0,
        transition: { duration: 1.05, ease: [0.2, 0.7, 0.3, 1], delay: seed * 0.08 },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <motion.div
      className="shatter-shard"
      style={{ clipPath: `polygon(${shard.poly})` }}
      variants={variants}
      initial={reduced ? "assembled" : "scattered"}
      animate={state}
    >
      <motion.div className="shatter-inner" style={{ x, y, rotate }}>
        <span className="shatter-copy">{shard.text}</span>
        <motion.span
          className="shatter-copy shatter-facet"
          style={{
            opacity: facet,
            backgroundImage: `linear-gradient(${shard.facet}deg, rgba(255,255,255,1), rgba(255,255,255,0) 50%, rgba(120,120,120,0.9))`,
          }}
        >
          {shard.text}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/**
 * A headline cut into glass shards that assemble on view, crack under the
 * pointer and shatter on click before pulling themselves back together.
 */
export default function ShatterType({ text, className = "", cols = 8, rows = 3, as: Tag = "h1", hint = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [size, setSize] = useState({ w: 1, h: 1 });
  const [burst, setBurst] = useState(false);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const shards = useMemo(() => buildShards(cols, rows).map((s) => ({ ...s, text })), [cols, rows, text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.max(1, width), h: Math.max(1, height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!burst) return undefined;
    const id = setTimeout(() => setBurst(false), 1500);
    return () => clearTimeout(id);
  }, [burst]);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const onLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  const state = reduced ? "assembled" : !inView ? "scattered" : burst ? "shatter" : "assembled";

  return (
    <div
      ref={ref}
      className={`shatter ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => !reduced && !burst && setBurst(true)}
      data-cursor={burst ? "Boom" : "Shatter"}
      role="presentation"
    >
      {/* The real heading. The sizer below is `visibility: hidden`, which drops
          it from the accessibility tree, and the shards are aria-hidden, so
          without this the page would have no readable heading at all. */}
      <Tag className="sr-only">{text}</Tag>
      <div className="shatter-sizer" aria-hidden="true">
        {text}
      </div>
      <div className="shatter-layer" aria-hidden="true">
        {shards.map((shard, i) => (
          <Shard
            key={i}
            shard={shard}
            index={i}
            total={shards.length}
            size={size}
            mouseX={mouseX}
            mouseY={mouseY}
            state={state}
            reduced={reduced}
          />
        ))}
      </div>
      {hint && !reduced && (
        <motion.span
          className="shatter-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          {burst ? "re-forming" : "hover to crack · click to shatter"}
        </motion.span>
      )}
    </div>
  );
}
