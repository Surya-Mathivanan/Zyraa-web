/**
 * The Zyraa loader. A needle sews the Z inside a stitched hoop (the emblem),
 * then the thread runs on through the letters of ZYRAA (the wordmark), the
 * whole thing glows once, unpicks and starts again. A spinning arc on the
 * hoop and a running bar make it plain that something is still loading.
 *
 * Its CSS lives inline in index.html (the "Zyraa loader" block), not in a
 * stylesheet, so that the identical loader in #boot can paint before any
 * JavaScript or CSS has arrived. Keep this markup in step with #boot there.
 *
 *   variant "page"   – full screen: a page that is still on its way
 *   variant "inline" – the emblem and a label: a demo, an article, a map
 *   delay            – fade in after a quarter second, so a quick load never
 *                      flashes a loader on screen
 */

const EMBLEM_Z = "M38 40H82L38 80H82";

/* Monoline letters on a 40 × 48 grid, 50 apart. Each stroke is its own path
   so every one draws from its own start. */
const LETTERS = [
  ["M4 4H36L4 52H36"],
  ["M54 4L70 26L86 4", "M70 26V52"],
  ["M106 52V4H124A12 12 0 0 1 124 28H106", "M120 28L136 52"],
  ["M154 52L170 4L186 52", "M159.5 36H180.5"],
  ["M204 52L220 4L236 52", "M209.5 36H230.5"],
];

const CAPTIONS = ["Syncing the face terminals", "Counting shifts earned", "Lining up approvals"];

function Emblem() {
  return (
    <div className="zl-mark" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <circle className="zl-face" cx="60" cy="60" r="46" />
        <circle className="zl-hoop" cx="60" cy="60" r="54" />
        <circle className="zl-orbit" cx="60" cy="60" r="54" />
        <path className="zl-guide" d={EMBLEM_Z} />
        <g className="zl-sewn">
          <path className="zl-thread" d={EMBLEM_Z} pathLength="100" />
          <path className="zl-needle" d={EMBLEM_Z} pathLength="100" />
        </g>
      </svg>
    </div>
  );
}

function Word() {
  return (
    <div className="zl-word" aria-hidden="true">
      <svg viewBox="-6 -6 252 68">
        {LETTERS.map((strokes, i) => (
          <path key={i} className="zl-guide" d={strokes.join("")} />
        ))}
        <g className="zl-sewn">
          {LETTERS.map((strokes, i) =>
            strokes.map((d) => <path key={d} className={`zl-thread zl-l${i}`} d={d} pathLength="100" />),
          )}
        </g>
      </svg>
    </div>
  );
}

export default function Loader({ variant = "page", label, delay = true }) {
  const page = variant === "page";
  return (
    <div className={`zl zl--${variant}${delay ? " zl--delay" : ""}`} role="status">
      <span className="zl-sr">{label ?? "Loading Zyraa"}</span>
      <Emblem />
      {page && <Word />}
      {page && !label ? (
        <p className="zl-caption" aria-hidden="true">
          {CAPTIONS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </p>
      ) : (
        <p className="zl-label" aria-hidden="true">
          {label}
        </p>
      )}
      {page && (
        <div className="zl-bar" aria-hidden="true">
          <span />
        </div>
      )}
    </div>
  );
}
