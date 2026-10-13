import "./scroll-circle.css";

const message = "SCROLL TO EXPLORE • SCROLL TO EXPLORE • ";

export default function ScrollCircle({ onClick, className = "", light = true }) {
  const letters = [...message];
  return (
    <button
      type="button"
      className={`scroll-circle ${light ? "" : "scroll-circle--dark"} ${className}`}
      onClick={onClick}
      aria-label="Scroll to explore"
      data-cursor="Scroll"
    >
      <span className="circle-text" aria-hidden="true">
        {letters.map((letter, i) => (
          <span key={i} style={{ transform: `translateX(-50%) rotate(${i * (360 / letters.length)}deg)` }}>
            {letter}
          </span>
        ))}
      </span>
      <svg className="scroll-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 4V19M6.5 13.5L12 19L17.5 13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
