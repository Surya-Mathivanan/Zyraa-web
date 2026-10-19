import { Spark } from "./Icons.jsx";

/**
 * Endless ticker. The list is rendered twice and the track slides by half its
 * width, so the loop has no seam. Pure CSS, so it costs no JS per frame and
 * stops under prefers-reduced-motion.
 */
export default function Marquee({ items, reverse = false, speed = 38, className = "" }) {
  const track = [...items, ...items];
  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""} ${className}`}
      style={{ "--marquee-speed": `${speed}s` }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {track.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <Spark />
          </span>
        ))}
      </div>
    </div>
  );
}
