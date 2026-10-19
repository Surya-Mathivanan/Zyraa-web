import { useEffect, useRef } from "react";

/**
 * Makes a section drive the page tone. When the section crosses a line 45% of
 * the way down the viewport, its tone is written to <html data-tone>, and the
 * registered colour variables in tokens.css cross-fade the whole page to it.
 *
 * Every section watches the same thin band, so exactly one section is "under
 * the line" at a time and fast scrolling settles on the right one.
 */
export function useTone(tone) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !tone) return undefined;

    const apply = () => {
      document.documentElement.dataset.tone = tone;
    };

    // A section already under the line on mount (the first one on a page)
    // claims the tone straight away rather than waiting for a scroll.
    const r = el.getBoundingClientRect();
    const line = window.innerHeight * 0.45;
    if (r.top <= line && r.bottom > line) apply();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) apply();
      },
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [tone]);

  return ref;
}
