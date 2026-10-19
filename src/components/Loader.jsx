/**
 * The Zyraa loader: a thread stitches the Z while a needle runs along it, the
 * letters of ZYRAA light up in turn, and a bar shows something is moving.
 *
 * Its CSS lives inline in index.html (#loader-css), not in a stylesheet, so
 * the very same loader can paint before any JavaScript has arrived; this
 * component renders identical markup once React is running.
 *
 *   variant "page"   – full-height, for a page that is still loading
 *   variant "inline" – compact, for a demo, an article or a map
 *   delay            – fade in only after a short wait, so a fast load never
 *                      flashes a loader on screen
 */
const Z_PATH = "M36 38H84L38 82H84";

export default function Loader({ variant = "page", label = "Stitching your month together", delay = true }) {
  return (
    <div className={`zl zl--${variant} ${delay ? "zl--delay" : ""}`} role="status" aria-live="polite">
      <div className="zl-mark" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <circle className="zl-ring" cx="60" cy="60" r="54" />
          <path className="zl-guide" d={Z_PATH} />
          <path className="zl-thread" d={Z_PATH} pathLength="100" />
          <path className="zl-stitch" d={Z_PATH} />
          <circle className="zl-needle" r="4.5">
            <animateMotion
              dur="1.8s"
              repeatCount="indefinite"
              path={Z_PATH}
              calcMode="spline"
              keyPoints="0;1;1"
              keyTimes="0;0.7;1"
              keySplines="0.4 0 0.2 1;0 0 1 1"
            />
          </circle>
        </svg>
      </div>
      {variant === "page" && (
        <div className="zl-word" aria-hidden="true">
          {[..."ZYRAA"].map((c, i) => (
            <span key={i} style={{ "--i": i }}>
              {c}
            </span>
          ))}
        </div>
      )}
      <p className="zl-caption">
        {label}
        <span className="zl-dots" aria-hidden="true" />
      </p>
      {variant === "page" && (
        <div className="zl-bar" aria-hidden="true">
          <span />
        </div>
      )}
    </div>
  );
}
