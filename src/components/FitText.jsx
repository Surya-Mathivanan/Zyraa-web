import { useLayoutEffect, useRef } from "react";

/**
 * One line of display text sized to fill its container's width, capped at
 * `max`. Re-fits when the container resizes and when web fonts finish loading
 * (a brand font swapping in changes the letter widths), so a long word can
 * never spill out of its column.
 */
export default function FitText({ as: Tag = "span", max = 180, min = 36, className = "", children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return undefined;

    let lastWidth = -1;
    const fit = (force = false) => {
      const avail = box.clientWidth;
      if (!force && avail === lastWidth) return;
      lastWidth = avail;
      el.style.fontSize = `${max}px`;
      const natural = el.scrollWidth || 1;
      const size = Math.max(min, Math.min(max, (max * avail * 0.98) / natural));
      el.style.fontSize = `${size}px`;
    };
    const refit = () => fit(true);

    fit(true);
    const ro = new ResizeObserver(() => fit());
    ro.observe(box);
    document.fonts?.ready.then(refit);
    document.fonts?.addEventListener?.("loadingdone", refit);
    return () => {
      ro.disconnect();
      document.fonts?.removeEventListener?.("loadingdone", refit);
    };
  }, [max, min, children]);

  return (
    <Tag ref={ref} className={`fit-text ${className}`}>
      {children}
    </Tag>
  );
}
