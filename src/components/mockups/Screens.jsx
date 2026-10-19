/**
 * Simplified product screens with made-up data, recreated from the real apps'
 * layouts (mobile home, geo punch, approvals; employee web dashboard; admin
 * payroll; MD dashboard). No real people, codes or companies.
 */

const DAY_STATES = [
  "p",
  "p",
  "p",
  "p",
  "p",
  "s",
  "p",
  "p",
  "l",
  "l",
  "p",
  "p",
  "s",
  "p",
  "h",
  "p",
  "a",
  "p",
  "p",
  "s",
  "p",
  "p",
  "f",
  "f",
  "f",
  "f",
  "s",
  "f",
  "f",
  "f",
];
const LATE_DAYS = new Set([3, 11]);
const PERMIT_DAYS = new Set([6]);

export function HeatmapGrid({ compact = false }) {
  return (
    <div className={`mk-heat ${compact ? "mk-heat--compact" : ""}`}>
      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
        <span className="mk-heat-head" key={i}>
          {d}
        </span>
      ))}
      <span className="mk-heat-cell mk-blank" />
      <span className="mk-heat-cell mk-blank" />
      <span className="mk-heat-cell mk-blank" />
      {DAY_STATES.map((s, i) => (
        <span className={`mk-heat-cell mk-${s}`} key={i}>
          {i + 1}
          {LATE_DAYS.has(i) && <i className="mk-dot mk-dot--late" />}
          {PERMIT_DAYS.has(i) && <i className="mk-dot mk-dot--permit" />}
        </span>
      ))}
    </div>
  );
}

export function HeatLegend() {
  return (
    <div className="mk-legend">
      <span>
        <i className="mk-p" />
        Present
      </span>
      <span>
        <i className="mk-s" />
        Half day
      </span>
      <span>
        <i className="mk-a" />
        Absent
      </span>
      <span>
        <i className="mk-l" />
        Leave
      </span>
      <span>
        <i className="mk-h" />
        Holiday
      </span>
    </div>
  );
}

/* ── Mobile ─────────────────────────────────────────────────────────────── */

export function MobileHome() {
  return (
    <div className="mk-mobile">
      <div className="mk-m-hero">
        <span className="mk-eyebrow">October attendance · Day 19/31</span>
        <div className="mk-m-tiles">
          <div>
            <b>17</b>
            <small>Work days</small>
          </div>
          <div className="mk-good">
            <b>15</b>
            <small>Present</small>
          </div>
          <div className="mk-bad">
            <b>1</b>
            <small>Absent</small>
          </div>
          <div>
            <b>1</b>
            <small>Leave</small>
          </div>
        </div>
      </div>
      <div className="mk-m-card">
        <div className="mk-row">
          <span className="mk-eyebrow mk-ink">Today's punches</span>
          <span className="mk-pill mk-pill--good">Punched in</span>
        </div>
        <ul className="mk-punches">
          <li>
            <span>In · GPS</span>
            <b>09:02</b>
            <i className="mk-tick" />
          </li>
          <li>
            <span>Lunch out</span>
            <b>13:01</b>
            <i className="mk-tick" />
          </li>
          <li>
            <span>Lunch in</span>
            <b>--:--</b>
          </li>
          <li>
            <span>Evening out</span>
            <b>--:--</b>
          </li>
        </ul>
      </div>
      <div className="mk-m-actions">
        {[
          "On-duty",
          "Missing punch",
          "Apply leave",
          "Permission",
          "Gate pass",
          "Salary slip",
        ].map((a, i) => (
          <span key={a} className={`mk-act mk-act--${i}`}>
            <i />
            {a}
          </span>
        ))}
      </div>
      <div className="mk-slide">
        <span className="mk-slide-knob" />
        Slide to punch out »
      </div>
    </div>
  );
}

export function MobileGeo() {
  return (
    <div className="mk-mobile">
      <div className="mk-m-title">Geo punch</div>
      <div className="mk-map">
        <span className="mk-fence" />
        <span className="mk-pin mk-pin--office" />
        <span className="mk-pin mk-pin--me" />
      </div>
      <div className="mk-banner mk-banner--good">
        You are inside the allowed radius
      </div>
      <div className="mk-grid2">
        <div>
          <small>Branch</small>
          <b>Unit 2 · Knitting</b>
        </div>
        <div>
          <small>Distance</small>
          <b>38 m / 200 m</b>
        </div>
        <div>
          <small>Punch</small>
          <b>#3 · Check-in</b>
        </div>
        <div>
          <small>Time</small>
          <b>02:04 PM</b>
        </div>
      </div>
      <div className="mk-slide mk-slide--blue">
        <span className="mk-slide-knob" />
        Slide to punch in »
      </div>
    </div>
  );
}

export function MobileApprovals() {
  return (
    <div className="mk-mobile">
      <div className="mk-m-title">Approvals</div>
      <div className="mk-chips">
        <span className="mk-chip-on">Leave 3</span>
        <span>Permission 2</span>
        <span>Missing punch 1</span>
      </div>
      {[
        ["Casual leave", "21 Oct", "Family function"],
        ["Permission · Morning late-in", "22 Oct", "Bank visit"],
      ].map(([type, date, why], i) => (
        <div className="mk-m-card mk-approve" key={i}>
          <div className="mk-row">
            <span className="mk-avatar">{i ? "M" : "K"}</span>
            <div className="mk-who">
              <b>{i ? "Checker · Finishing" : "Tailor · Linking"}</b>
              <small>EMP-04{12 + i * 7}</small>
            </div>
          </div>
          <p>
            <b>{type}</b> · {date}
            <br />
            <small>{why}</small>
          </p>
          <div className="mk-row mk-gap">
            <span className="mk-btn mk-btn--good">Approve</span>
            <span className="mk-btn mk-btn--bad">Reject</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Employee web ───────────────────────────────────────────────────────── */

export function WebDashboard() {
  return (
    <div className="mk-web tone-ink">
      <aside className="mk-side">
        <span className="mk-logo" />
        {[
          "Dashboard",
          "Attendance",
          "My shift",
          "Leave",
          "Permission",
          "Salary slips",
          "Outpass",
          "Digital ID",
        ].map((l, i) => (
          <span key={l} className={i === 1 ? "mk-side-on" : ""}>
            {l}
          </span>
        ))}
      </aside>
      <div className="mk-web-main">
        <div className="mk-row">
          <div>
            <span className="mk-eyebrow mk-green">
              General shift · 09:00 – 18:00
            </span>
            <div className="mk-greet">Good morning</div>
          </div>
          <span className="mk-pill mk-pill--good">● Punched in 09:02</span>
        </div>
        <div className="mk-stats">
          <div>
            <small>Working days</small>
            <b>17</b>
          </div>
          <div>
            <small>Present days</small>
            <b>15.5</b>
            <em>91% attendance</em>
          </div>
          <div>
            <small>Absent</small>
            <b>1</b>
          </div>
          <div>
            <small>CL left</small>
            <b>8 / 12</b>
          </div>
        </div>
        <div className="mk-web-split">
          <div className="mk-panel">
            <span className="mk-eyebrow">October</span>
            <HeatmapGrid compact />
            <HeatLegend />
          </div>
          <div className="mk-panel mk-slip">
            <span className="mk-eyebrow">Salary slip · September</span>
            <div className="mk-net">₹18,450</div>
            <ul>
              <li>
                <span>Basic</span>
                <b>₹9,975</b>
              </li>
              <li>
                <span>HRA</span>
                <b>₹3,990</b>
              </li>
              <li>
                <span>Allowances</span>
                <b>₹5,985</b>
              </li>
              <li className="mk-minus">
                <span>PF</span>
                <b>−₹1,197</b>
              </li>
              <li className="mk-minus">
                <span>ESI</span>
                <b>−₹150</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── HR admin ───────────────────────────────────────────────────────────── */

export function AdminPayroll() {
  const rows = [
    ["EMP-0412", "Stitching", "26.00", "₹21,600", "Paid"],
    ["EMP-0419", "Cutting", "24.50", "₹19,240", "Pending"],
    ["EMP-0433", "Finishing", "25.75", "₹18,910", "Paid"],
    ["EMP-0447", "Checking", "23.00", "₹16,820", "Pending"],
    ["EMP-0451", "Packing", "26.00", "₹17,300", "Paid"],
  ];
  return (
    <div className="mk-web mk-admin tone-mist">
      <aside className="mk-side">
        <span className="mk-logo" />
        {[
          "Dashboard",
          "Employees",
          "Attendance",
          "Requests",
          "Payroll",
          "Production pay",
          "Reports",
          "Settings",
        ].map((l, i) => (
          <span key={l} className={i === 4 ? "mk-side-on" : ""}>
            {l}
          </span>
        ))}
      </aside>
      <div className="mk-web-main">
        <div className="mk-row">
          <div className="mk-greet mk-greet--sm">Payroll · October</div>
          <span className="mk-btn mk-btn--solid">Generate payroll</span>
        </div>
        <div className="mk-stats">
          <div>
            <small>In payroll</small>
            <b>312</b>
          </div>
          <div>
            <small>Total gross</small>
            <b>₹58.4L</b>
          </div>
          <div>
            <small>Net payable</small>
            <b>₹53.1L</b>
          </div>
          <div className="mk-warn">
            <small>Issues</small>
            <b>27</b>
          </div>
        </div>
        <div className="mk-tabs">
          <span className="mk-tab-on">Records</span>
          <span>Issues 27</span>
          <span>Skipped 2</span>
          <span>Rules</span>
        </div>
        <table className="mk-table">
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                <td>{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td>{r[3]}</td>
                <td>
                  <span
                    className={`mk-pill ${r[4] === "Paid" ? "mk-pill--good" : "mk-pill--warn"}`}
                  >
                    {r[4]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── MD portal ──────────────────────────────────────────────────────────── */

export function MdDashboard() {
  const tiles = [
    ["Active headcount", "1,240", "+1%"],
    ["Attendance today", "90.3%", ""],
    ["Absenteeism, 30d", "4.2%", "+0.4 pts"],
    ["Payroll cost", "₹2.4 Cr", "+4.3%"],
  ];
  return (
    <div className="mk-web mk-md tone-cream">
      <div className="mk-web-main">
        <span className="mk-eyebrow">Monday · Managing Director</span>
        <div className="mk-greet">Good afternoon</div>
        <div className="mk-ask">
          Ask anything - why is absenteeism up this week?
        </div>
        <div className="mk-stats mk-stats--4">
          {tiles.map(([l, v, d]) => (
            <div key={l}>
              <small>{l}</small>
              <b>{v}</b>
              {d && <em>{d}</em>}
            </div>
          ))}
        </div>
        <div className="mk-attn">
          <span className="mk-eyebrow mk-ink">Needs your attention</span>
          <p>
            <i className="mk-sev mk-sev--crit" />
            Unit 3 attendance 74% - below the 30-day average
          </p>
          <p>
            <i className="mk-sev mk-sev--warn" />
            11 requests waiting over 3 days with one HOD
          </p>
          <p>
            <i className="mk-sev mk-sev--good" />
            Overtime cost down 8% on last month
          </p>
        </div>
      </div>
    </div>
  );
}
