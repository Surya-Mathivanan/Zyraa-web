import { categoryOf } from "../data/categories.js";
import "./post-cover.css";

/**
 * Journal cover art. Every category has its own colour and icon, and every
 * article its own illustration, so a reader can tell the cards apart at a
 * glance and find related articles by colour. Pure SVG drawn with the tone's
 * colours (stroke/fill = --fg, highlights = --accent); each scene animates on
 * card hover (see post-cover.css).
 */

const ICONS = {
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 8h7M8.5 11h7M10.5 8c3.4 0 3.4 6 0 6l4 4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  steps: <path d="M3 19h5v-4h4v-4h4V7h5" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  scan: (
    <>
      <path d="M4 9V5h4M16 5h4v4M20 15v4h-4M8 19H4v-4" />
      <circle cx="12" cy="11" r="2.6" />
      <path d="M8.5 16c1.6-2 5.4-2 7 0" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.4 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  chart: <path d="M4 20V11M10 20V6M16 20v-8M21 20H3" />,
};

export function CategoryIcon({ name, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={`cat-icon ${className}`} aria-hidden="true">
      {ICONS[categoryOf(name).icon]}
    </svg>
  );
}

/* ── One scene per article, drawn on a 400 × 250 board ────────────────── */

const SCENES = {
  // Face terminal → payslip: the punch is the payroll.
  "attendance-is-the-payroll": (
    <g>
      <rect x="56" y="50" width="96" height="150" rx="16" className="pc-line" />
      <rect x="70" y="66" width="68" height="64" rx="9" className="pc-soft" />
      <circle cx="104" cy="91" r="13" className="pc-line" />
      <path d="M86 122c5-11 31-11 36 0" className="pc-line" />
      <circle cx="104" cy="172" r="10" className="pc-acc pc-pulse" />
      <path d="M166 125h66" className="pc-dash" />
      <path d="M226 114l13 11-13 11" className="pc-line" />
      <g className="pc-lift">
        <rect x="254" y="38" width="104" height="164" rx="12" className="pc-fill" />
        <text x="306" y="104" className="pc-glyph">₹</text>
        <rect x="272" y="122" width="68" height="7" rx="3.5" className="pc-on-fill" />
        <rect x="272" y="138" width="52" height="7" rx="3.5" className="pc-on-fill" />
        <rect x="272" y="154" width="60" height="7" rx="3.5" className="pc-on-fill" />
        <circle cx="338" cy="184" r="19" className="pc-acc" />
        <path d="M329 184l6 6 12-13" className="pc-tick" />
      </g>
    </g>
  ),

  // A clock with only a quarter cut out of it.
  "the-quarter-shift-rule": (
    <g>
      <circle cx="200" cy="125" r="88" className="pc-soft" />
      <path d="M200 125V37a88 88 0 0 1 88 88Z" className="pc-acc pc-grow" />
      <circle cx="200" cy="125" r="88" className="pc-line" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="200" y1="45" x2="200" y2={i % 3 ? "53" : "60"} className="pc-line pc-thin" transform={`rotate(${i * 30} 200 125)`} />
      ))}
      <g className="pc-spin">
        <line x1="200" y1="125" x2="200" y2="62" className="pc-line pc-thick" />
      </g>
      <line x1="200" y1="125" x2="238" y2="146" className="pc-line pc-thick" />
      <circle cx="200" cy="125" r="7" className="pc-fill" />
      <rect x="300" y="40" width="70" height="34" rx="17" className="pc-fill" />
      <text x="335" y="64" className="pc-label pc-on-fill-text">0.25</text>
    </g>
  ),

  // The production ladder: shifts climbing by leaving time.
  "paying-the-floor-by-the-shift": (
    <g>
      {[[118, 18], [176, 28], [230, 12], [272, 24]].map(([x, w]) => (
        <rect key={x} x={x} y="34" width={w} height="180" className="pc-soft" />
      ))}
      <path d="M44 214H364M44 214V30" className="pc-line pc-thin" />
      <path
        d="M44 206 L96 192 L118 192 L150 178 L176 178 L208 160 L230 160 L250 140 L272 140 L300 110 L332 74 L358 40"
        className="pc-line pc-thick pc-draw"
      />
      {[[96, 192], [150, 178], [208, 160], [250, 140], [300, 110], [332, 74], [358, 40]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" className="pc-acc" />
      ))}
      <rect x="54" y="38" width="86" height="34" rx="17" className="pc-fill" />
      <text x="97" y="62" className="pc-label pc-on-fill-text">3.00</text>
    </g>
  ),

  // A calendar where only the 1st and 2nd of the new month are still open.
  "why-requests-close-on-the-second": (
    <g>
      <rect x="84" y="36" width="232" height="180" rx="18" className="pc-line" />
      <rect x="84" y="36" width="232" height="38" rx="18" className="pc-fill" />
      <rect x="84" y="56" width="232" height="18" className="pc-fill" />
      {Array.from({ length: 28 }, (_, i) => {
        const x = 100 + (i % 7) * 30;
        const y = 86 + Math.floor(i / 7) * 30;
        return i < 2 ? (
          <g key={i} className="pc-pop">
            <rect x={x} y={y} width="24" height="24" rx="6" className="pc-acc" />
            <text x={x + 12} y={y + 17} className="pc-mini pc-on-acc-text">
              {i + 1}
            </text>
          </g>
        ) : (
          <rect key={i} x={x} y={y} width="24" height="24" rx="6" className={i < 9 ? "pc-soft" : "pc-line pc-faint"} />
        );
      })}
      <g className="pc-lift">
        <rect x="292" y="168" width="54" height="44" rx="10" className="pc-acc" />
        <path d="M304 168v-12a15 15 0 0 1 30 0v12" className="pc-line pc-thick" />
      </g>
    </g>
  ),

  // An hourglass and the monthly pool: three free marks, then billable.
  "one-hour-permissions-and-the-late-pool": (
    <g>
      <path d="M100 48h84M100 202h84" className="pc-line pc-thick" />
      <path d="M110 48c0 52 64 52 64 77s-64 25-64 77M174 48c0 52-64 52-64 77s64 25 64 77" className="pc-line" />
      <path d="M126 196c4-22 28-22 32 0Z" className="pc-acc pc-grow" />
      <path d="M128 70h28l-14 22Z" className="pc-acc" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect
          key={i}
          x={222 + (i % 3) * 46}
          y={i < 3 ? 76 : 138}
          width="36"
          height="36"
          rx="9"
          className={i < 3 ? "pc-fill" : "pc-acc pc-pop"}
        />
      ))}
      <text x="291" y="64" className="pc-mini pc-text">FREE</text>
      <text x="291" y="196" className="pc-mini pc-text">BILLABLE</text>
    </g>
  ),

  // A face terminal behind a firewall, reaching out to the cloud.
  "biometrics-behind-the-factory-firewall": (
    <g>
      <rect x="40" y="92" width="70" height="110" rx="12" className="pc-line" />
      <circle cx="75" cy="128" r="12" className="pc-line" />
      <rect x="53" y="164" width="44" height="8" rx="4" className="pc-soft" />
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 2 }, (_, c) => (
          <rect key={`${r}-${c}`} x={168 + c * 34 - (r % 2) * 17} y={92 + r * 19} width="32" height="16" rx="3" className={r % 2 && c === 0 ? "pc-soft" : "pc-fill"} />
        ))
      )}
      <path d="M110 110C150 18 252 18 296 92" className="pc-dash pc-acc-stroke" />
      <path d="M284 80l13 13-18 4" className="pc-line pc-acc-stroke" />
      <path
        d="M300 150a26 26 0 0 1 8-50 34 34 0 0 1 64 8 22 22 0 0 1-2 44Z"
        className="pc-acc pc-lift"
      />
    </g>
  ),

  // A geofence around the branch, and a photo-verified punch outside it.
  "honest-on-duty-attendance": (
    <g>
      {[42, 78, 112].map((r) => (
        <circle key={r} cx="160" cy="132" r={r} className="pc-line pc-ring" />
      ))}
      <path d="M160 152s22-19 22-37a22 22 0 0 0-44 0c0 18 22 37 22 37Z" className="pc-acc pc-bob" />
      <circle cx="160" cy="114" r="8" className="pc-on-acc" />
      <path d="M190 150C240 190 270 120 300 132" className="pc-dash" />
      <g className="pc-lift">
        <rect x="292" y="98" width="76" height="58" rx="12" className="pc-fill" />
        <rect x="312" y="88" width="24" height="12" rx="4" className="pc-fill" />
        <circle cx="330" cy="127" r="17" className="pc-on-fill" />
        <circle cx="330" cy="127" r="8" className="pc-acc" />
      </g>
    </g>
  ),

  // The gate: two pillars, a beam and a QR scan.
  "the-gate-is-part-of-hr": (
    <g>
      <rect x="70" y="58" width="36" height="160" rx="6" className="pc-fill" />
      <rect x="294" y="58" width="36" height="160" rx="6" className="pc-fill" />
      <rect x="60" y="40" width="280" height="26" rx="8" className="pc-fill" />
      <rect x="150" y="90" width="100" height="100" rx="12" className="pc-fill" />
      {[[160, 100], [214, 100], [160, 154]].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <rect x={x} y={y} width="26" height="26" rx="4" className="pc-on-fill" />
          <rect x={x + 8} y={y + 8} width="10" height="10" rx="2" className="pc-fill" />
        </g>
      ))}
      {[[218, 160], [232, 174], [218, 176], [196, 166], [196, 140], [232, 140], [204, 112], [192, 124]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="10" height="10" rx="2" className="pc-on-fill" />
      ))}
      <rect x="140" y="92" width="120" height="5" rx="2.5" className="pc-acc pc-scan" />
    </g>
  ),

  // Night hours turned into an allowance: moon, clock, +30 min.
  "overtime-that-is-recognised": (
    <g>
      <path d="M118 52a58 58 0 1 0 54 82 46 46 0 1 1-54-82Z" className="pc-acc pc-bob" />
      {[[60, 70], [204, 54], [230, 96]].map(([x, y]) => (
        <path key={x} d={`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z`} className="pc-fill pc-twinkle" />
      ))}
      <circle cx="278" cy="142" r="62" className="pc-line" />
      <path d="M278 142V80a62 62 0 0 1 54 31Z" className="pc-acc pc-grow" />
      <line x1="278" y1="142" x2="278" y2="100" className="pc-line pc-thick" />
      <line x1="278" y1="142" x2="306" y2="156" className="pc-line pc-thick" />
      <circle cx="278" cy="142" r="6" className="pc-fill" />
      <rect x="70" y="170" width="112" height="38" rx="19" className="pc-fill" />
      <text x="126" y="196" className="pc-label pc-on-fill-text">+30 min</text>
    </g>
  ),

  // Exceptions first: bars, one standing out, and a two-minute timer.
  "an-md-reads-in-two-minute-bursts": (
    <g>
      <path d="M50 214H300" className="pc-line pc-thin" />
      {[70, 110, 92, 138, 168].map((h, i) => (
        <rect key={i} x={64 + i * 46} y={214 - h} width="32" height={h} rx="7" className={i === 4 ? "pc-acc pc-rise" : "pc-fill pc-rise"} style={{ "--i": i }} />
      ))}
      <path d="M264 30l5 11 11 5-11 5-5 11-5-11-11-5 11-5Z" className="pc-acc pc-twinkle" />
      <circle cx="326" cy="92" r="44" className="pc-line" />
      <rect x="316" y="36" width="20" height="10" rx="3" className="pc-fill" />
      <path d="M326 92V62a30 30 0 0 1 26 15Z" className="pc-acc" />
      <text x="326" y="164" className="pc-label pc-text">2:00</text>
    </g>
  ),
};

export default function PostCover({ post, className = "", showMeta = true }) {
  const cat = categoryOf(post.category);
  return (
    <div className={`post-cover tone-${cat.tone} ${className}`}>
      <svg viewBox="0 0 400 250" className="post-cover-art" aria-hidden="true">
        {SCENES[post.slug] || SCENES["an-md-reads-in-two-minute-bursts"]}
      </svg>
      {showMeta && (
        <>
          <span className="post-cover-cat">
            <CategoryIcon name={post.category} />
            {post.category}
          </span>
          <span className="post-cover-time">{post.readMins} min</span>
        </>
      )}
    </div>
  );
}
