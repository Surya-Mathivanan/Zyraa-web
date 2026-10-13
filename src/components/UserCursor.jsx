import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "../hooks/useMedia.js";
import "./user-cursor.css";

/**
 * A collaborator-style cursor: a dot plus a name tag that trails the pointer.
 * The tag swaps to the text of any hovered element carrying `data-cursor`.
 */
export default function UserCursor({ name = "ZYRAA" }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const dotRef = useRef(null);
  const tagRef = useRef(null);
  const [label, setLabel] = useState(name);
  const [mode, setMode] = useState("hidden"); // hidden | idle | hover | down

  useEffect(() => {
    if (!enabled) return undefined;

    document.body.classList.add("has-custom-cursor");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let dx = tx;
    let dy = ty;
    let gx = tx;
    let gy = ty;
    let seen = false;
    let raf = 0;
    let currentLabel = name;
    let currentMode = "hidden";
    let nativeField = false;

    const setLabelIfChanged = (next) => {
      if (next !== currentLabel) {
        currentLabel = next;
        setLabel(next);
      }
    };
    const setModeIfChanged = (next) => {
      if (next !== currentMode) {
        currentMode = next;
        setMode(next);
      }
    };

    const onMove = (event) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!seen) {
        seen = true;
        dx = gx = tx;
        dy = gy = ty;
      }

      const target = event.target instanceof Element ? event.target : null;
      const field = target?.closest("input, textarea, select");
      if (field) {
        if (!nativeField) {
          nativeField = true;
          document.body.classList.remove("has-custom-cursor");
        }
        setModeIfChanged("hidden");
        return;
      }
      if (nativeField) {
        nativeField = false;
        document.body.classList.add("has-custom-cursor");
      }

      const tagged = target?.closest("[data-cursor]");
      const interactive = tagged || target?.closest("a, button, [role='button'], label");
      if (tagged) {
        setLabelIfChanged(tagged.getAttribute("data-cursor") || name);
      } else {
        setLabelIfChanged(name);
      }
      setModeIfChanged(interactive ? "hover" : "idle");
    };

    const onLeave = () => setModeIfChanged("hidden");
    const onEnter = () => setModeIfChanged("idle");
    const onDown = () => {
      if (currentMode !== "hidden") setModeIfChanged("down");
    };
    const onUp = () => {
      if (currentMode === "down") setModeIfChanged("idle");
    };

    const loop = () => {
      dx += (tx - dx) * 0.35;
      dy += (ty - dy) * 0.35;
      gx += (tx - gx) * 0.14;
      gy += (ty - gy) * 0.14;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      if (tagRef.current) tagRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled, name]);

  if (!enabled) return null;

  return (
    <div className={`user-cursor user-cursor--${mode}`} aria-hidden="true">
      <div className="user-cursor-dot" ref={dotRef}>
        <span className="user-cursor-ring" />
        <span className="user-cursor-core" />
      </div>
      <div className="user-cursor-tag" ref={tagRef}>
        <svg className="user-cursor-pointer" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13.5L8.5 20L5 3Z" fill="currentColor" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <span className="user-cursor-label">{label}</span>
      </div>
    </div>
  );
}
