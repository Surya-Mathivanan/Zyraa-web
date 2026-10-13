import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useMedia.js";

/**
 * Fading Stars — stars rising from beyond the frame on trails that fade behind
 * them.
 *
 * Each star is seeded below the bottom edge and drifts upward with a slight
 * sway. The trail is drawn as a short run of segments whose alpha falls off
 * toward the tail, which costs nothing per frame compared with building a
 * gradient object per star, and reads the same.
 *
 * Follows the house rules for canvas work in this project: device pixel ratio
 * is capped, the RAF loop stops while the canvas is off-screen or the tab is
 * hidden, resize is debounced, and `prefers-reduced-motion` renders one static
 * starfield with no loop at all.
 */

const TAU = Math.PI * 2;

export default function FadingStars({
  count = 90,
  speed = 1,
  trail = 1,
  size = 1,
  colors = ["#ffffff", "#8b7cff", "#7fe3ff", "#ffd48a"],
  opacity = 1,
  className = "",
  style,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const colorKey = colors.join(",");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let running = true;
    let disposed = false;
    let last = performance.now();

    let stars = [];

    const rgb = colorKey.split(",").map((hex) => {
      const h = hex.replace("#", "");
      const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
      const n = parseInt(full, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    });

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Depth drives size, speed, trail length and brightness together, so near
    // stars read as near rather than merely bigger.
    const makeStar = (seeded) => {
      const depth = Math.random();
      const near = 0.35 + depth * 0.65;
      return {
        x: Math.random() * width,
        // `seeded` spreads the first frame over the whole frame; afterwards
        // stars re-enter from beyond the bottom edge.
        y: seeded ? Math.random() * height : height + 20 + Math.random() * height * 0.4,
        vy: (14 + depth * 46) * near * speed,
        sway: (Math.random() - 0.5) * 11,
        phase: Math.random() * TAU,
        twinkle: 0.6 + Math.random() * 1.9,
        r: (0.5 + depth * 1.5) * size,
        len: (26 + depth * 78) * trail,
        alpha: (0.3 + depth * 0.7) * opacity,
        tint: rgb[(Math.random() * rgb.length) | 0],
      };
    };

    const build = () => {
      // Scale the population to the area so a slim band is not as busy as a
      // full-height hero.
      const area = (width * height) / (1440 * 900);
      const n = Math.max(14, Math.round(count * Math.min(1.25, Math.max(0.3, area))));
      stars = Array.from({ length: n }, () => makeStar(true));
    };

    const drawStar = (s, t) => {
      const [r, g, b] = s.tint;
      const flicker = 0.72 + 0.28 * Math.sin(t * s.twinkle + s.phase);
      const a = s.alpha * flicker;

      // Trail: segments fading and narrowing toward the tail.
      const segs = 6;
      const segLen = s.len / segs;
      for (let i = 0; i < segs; i += 1) {
        const k = 1 - i / segs;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a * k * k * 0.5})`;
        ctx.lineWidth = Math.max(0.4, s.r * 1.5 * k);
        ctx.lineCap = "round";
        ctx.moveTo(s.x, s.y + i * segLen);
        ctx.lineTo(s.x, s.y + (i + 1) * segLen);
        ctx.stroke();
      }

      // Head: a soft halo plus a bright core, no shadowBlur.
      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a * 0.16})`;
      ctx.arc(s.x, s.y, s.r * 4.2, 0, TAU);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a * 0.38})`;
      ctx.arc(s.x, s.y, s.r * 2.1, 0, TAU);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, a * 0.95)})`;
      ctx.arc(s.x, s.y, s.r, 0, TAU);
      ctx.fill();
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => drawStar(s, 0));
    };

    const frame = (now) => {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      if (!running || !visible) {
        last = now;
        return;
      }

      // Clamp dt so a backgrounded tab or a slow frame cannot teleport the
      // whole field on the next tick.
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now * 0.001;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        s.y -= s.vy * dt;
        s.x += Math.sin(t * 0.35 + s.phase) * s.sway * dt;

        if (s.y + s.len < -10) {
          stars[i] = makeStar(false);
          continue;
        }
        if (s.x < -40) s.x = width + 40;
        else if (s.x > width + 40) s.x = -40;

        drawStar(s, t);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    observer.observe(wrap);

    const onVisibility = () => {
      running = !document.hidden;
    };

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (disposed) return;
        measure();
        build();
        renderStatic();
      }, 150);
    };

    measure();
    build();
    // Paint one frame synchronously so the field is there immediately, rather
    // than on the first RAF tick. This also means a surface where RAF is
    // throttled to nothing (hidden tab, background render, prerender) still
    // shows stars instead of an empty canvas.
    renderStatic();

    if (!reduced) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // `colors` is joined rather than referenced: callers pass an inline array,
    // which would otherwise be a new value every render and rebuild the field.
  }, [count, speed, trail, size, colorKey, opacity, reduced]);

  return (
    <div ref={wrapRef} className={`fading-stars ${className}`} style={style} aria-hidden="true">
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
