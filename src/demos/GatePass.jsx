import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Range, Seg, Toggle, Tag } from "./kit.jsx";
import { fmtTime, hm } from "../lib/rules/time.js";
import "./gate.css";

/** A QR-looking grid, deterministic for a code. Decorative only. */
function FakeQR({ code }) {
  let seed = [...code].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const cells = [];
  for (let i = 0; i < 21 * 21; i += 1) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    const x = i % 21;
    const y = Math.floor(i / 21);
    const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    const ring =
      finder &&
      (x % 14 === 0 ||
        x % 14 === 6 ||
        y % 14 === 0 ||
        y % 14 === 6 ||
        (x % 14 > 1 && x % 14 < 5 && y % 14 > 1 && y % 14 < 5));
    if (finder ? ring : (seed >> 16) % 2)
      cells.push(<rect key={i} x={x} y={y} width="1" height="1" />);
  }
  return (
    <svg viewBox="-1 -1 23 23" className="gp-qr" aria-hidden="true">
      {cells}
    </svg>
  );
}

const TYPES = [
  { value: "official", label: "Official / mill duty" },
  { value: "personal", label: "Personal emergency" },
  { value: "early", label: "Early dismissal" },
];

function Outpass() {
  const [kind, setKind] = useState("official");
  const [stage, setStage] = useState("request"); // request → approved → out → back
  const [wait, setWait] = useState(20); // minutes from approval to the exit scan
  const [away, setAway] = useState(38); // minutes outside
  const planned = 45;
  const approvedAt = hm(10, 40);
  const outAt = approvedAt + wait;
  const backAt = outAt + away;
  const expired = wait > 60;

  return (
    <div className="dm">
      <div className="dm-panel">
        <span className="dm-label">Gate outpass</span>
        <Seg
          label="Pass type"
          options={TYPES}
          value={kind}
          onChange={setKind}
        />
        <Range
          label="Minutes from approval to the gate"
          value={wait}
          display={`${wait} min`}
          min={0}
          max={90}
          onChange={setWait}
        />
        <Range
          label="Minutes outside"
          value={away}
          display={`${away} min · planned ${planned}`}
          min={5}
          max={120}
          onChange={setAway}
        />
        <div className="dm-row">
          {stage === "request" && (
            <button
              type="button"
              className="dm-btn"
              onClick={() => setStage("approved")}
            >
              Request &amp; approve
            </button>
          )}
          {stage === "approved" && (
            <button
              type="button"
              className="dm-btn"
              disabled={expired}
              onClick={() => setStage("out")}
            >
              Scan at the gate - out
            </button>
          )}
          {stage === "out" && (
            <button
              type="button"
              className="dm-btn"
              onClick={() => setStage("back")}
            >
              Scan return QR - in
            </button>
          )}
          {stage !== "request" && (
            <button
              type="button"
              className="dm-btn dm-btn--ghost"
              onClick={() => setStage("request")}
            >
              Reset
            </button>
          )}
        </div>
        <p className="dm-note">
          The exit QR is valid for 60 minutes after approval; the return QR for
          60 minutes once generated. Every scan is logged - including expired
          and forged ones.
        </p>
      </div>

      <div className="dm-panel dm-panel--solid gp-card-wrap">
        <motion.div
          className="gp-card"
          animate={{ rotateY: stage === "request" ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="gp-face gp-front">
            <span className="dm-label">Security clearance · #OUT-1042</span>
            <FakeQR
              code={`${kind}-${stage === "out" || stage === "back" ? "R" : "P"}`}
            />
            <strong>
              {stage === "out" || stage === "back"
                ? "Return QR"
                : "Show this QR at the gate"}
            </strong>
            <div className="gp-meter">
              <span
                style={{ width: `${Math.max(0, 100 - (wait / 60) * 100)}%` }}
              />
            </div>
            <small>
              {expired
                ? "Expired - the 60-minute window lapsed"
                : `Valid for ${60 - wait} more minutes`}
            </small>
          </div>
          <div className="gp-face gp-back">
            <span className="dm-label">Outpass request</span>
            <strong>{TYPES.find((t) => t.value === kind).label}</strong>
            <small>Waiting for Department Head or HR</small>
          </div>
        </motion.div>

        <ul className="gp-log">
          <li className={stage !== "request" ? "is-on" : ""}>
            <span>Approved</span>
            <b>{fmtTime(approvedAt)}</b>
          </li>
          <li className={stage === "out" || stage === "back" ? "is-on" : ""}>
            <span>Out at the gate</span>
            <b>{expired ? "Denied · expired" : fmtTime(outAt)}</b>
          </li>
          <li className={stage === "back" ? "is-on" : ""}>
            <span>Back in</span>
            <b>{fmtTime(backAt)}</b>
          </li>
        </ul>
        <AnimatePresence>
          {stage === "back" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="dm-row"
            >
              <Tag tone={away > planned ? "warn" : "good"}>
                {away > planned
                  ? `Late return · +${away - planned} min`
                  : "Returned on time"}
              </Tag>
              <Tag>{away} min outside</Tag>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TeaBreak() {
  const [mins, setMins] = useState(19);
  const [returned, setReturned] = useState(true);
  const allowed = 15;
  const start = hm(15, 32);
  const status = !returned
    ? mins >= 60
      ? "Not returned"
      : "Still out"
    : mins > allowed
      ? "Overtime"
      : "On time";
  const tone = {
    "On time": "good",
    Overtime: "warn",
    "Still out": "info",
    "Not returned": "bad",
  }[status];

  return (
    <div className="dm">
      <div className="dm-panel">
        <span className="dm-label">Tea break</span>
        <Range
          label="Minutes since the out-scan"
          value={mins}
          display={`${mins} min`}
          min={1}
          max={90}
          onChange={setMins}
        />
        <Toggle
          label="Return scan done"
          checked={returned}
          onChange={setReturned}
        />
        <p className="dm-note">
          No request, no approval: the employee's permanent QR is scanned out
          and back in. HR sets the allowed minutes (15 by default); no return
          scan within 60 minutes is "not returned".
        </p>
      </div>
      <div className="dm-panel dm-panel--solid">
        <div className="tb-ring" style={{ "--p": Math.min(1, mins / 60) }}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" className="tb-ring-bg" />
            <circle
              cx="60"
              cy="60"
              r="52"
              className="tb-ring-allowed"
              style={{ strokeDasharray: `${(allowed / 60) * 326.7} 400` }}
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              className={`tb-ring-fill tb-ring-fill--${tone}`}
              style={{
                strokeDasharray: `${Math.min(1, mins / 60) * 326.7} 400`,
              }}
            />
          </svg>
          <div>
            <span className="dm-big">{mins}</span>
            <small>minutes</small>
          </div>
        </div>
        <div className="dm-row">
          <Tag tone={tone}>{status}</Tag>
          <Tag>
            Out {fmtTime(start)}
            {returned ? ` · in ${fmtTime(start + mins)}` : ""}
          </Tag>
          {mins > allowed && returned && (
            <Tag tone="warn">+{mins - allowed} min over</Tag>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GatePass() {
  return (
    <div className="gp">
      <Outpass />
      <TeaBreak />
    </div>
  );
}
