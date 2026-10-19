import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Range, Seg, Toggle, Tag } from "./kit.jsx";
import { shiftsEarned, ladderCurve, GRACE } from "../lib/rules/production.js";
import { fmtTime, fmtShift, hm, inr } from "../lib/rules/time.js";
import "./production.css";

const PRESETS = [
  { label: "Regular day", first: hm(8, 28), last: hm(20) },
  { label: "Leaves 7 PM", first: hm(8, 30), last: hm(19) },
  { label: "Half day", first: hm(8, 30), last: hm(12, 45) },
  { label: "Till 10:30 PM", first: hm(8, 30), last: hm(22, 30) },
  { label: "Day + night", first: hm(8, 30), last: hm(29, 30) },
  { label: "Night only", first: hm(21), last: hm(29, 30) },
];

const W = 640;
const H = 220;

function LadderChart({ group, first, out }) {
  const pts = useMemo(() => ladderCurve(group), [group]);
  const t0 = group.start;
  const t1 = pts[pts.length - 1][0];
  const vMax = pts[pts.length - 1][1];
  const x = (t) => ((Math.min(t1, Math.max(t0, t)) - t0) / (t1 - t0)) * W;
  const y = (v) => H - (v / vMax) * (H - 16);
  const line = pts
    .map(([t, v], i) => `${i ? "L" : "M"}${x(t).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
  const arrive = Math.max(first, t0);

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 30}`}
      className="pd-chart"
      role="img"
      aria-label={`${group.name} group ladder`}
    >
      {group.breaks.map(([a, b, name]) => (
        <g key={name}>
          <rect
            x={x(a)}
            y={0}
            width={Math.max(2, x(b) - x(a))}
            height={H}
            className="pd-break"
          />
        </g>
      ))}
      <rect
        x={x(arrive)}
        y={0}
        width={Math.max(0, x(out) - x(arrive))}
        height={H}
        className="pd-worked"
      />
      <path d={line} className="pd-line" />
      {group.ladder.map(([t, v]) => (
        <g key={t}>
          <circle cx={x(t)} cy={y(v)} r="4" className="pd-row" />
          <text x={x(t)} y={y(v) - 10} className="pd-row-label">
            {fmtShift(v)}
          </text>
          <text x={x(t)} y={H + 20} className="pd-axis">
            {fmtTime(t, { ampm: false })}
          </text>
        </g>
      ))}
      <line x1={x(out)} x2={x(out)} y1={0} y2={H} className="pd-out" />
    </svg>
  );
}

export default function ProductionDay() {
  const [first, setFirst] = useState(hm(8, 28));
  const [last, setLast] = useState(hm(19));
  const [sunday, setSunday] = useState(false);
  const [rate, setRate] = useState(550);
  const [preset, setPreset] = useState("Leaves 7 PM");

  const lastClock = last >= 1440 ? last - 1440 : last;
  const r = shiftsEarned(first, lastClock, { isSunday: sunday });

  const apply = (p) => {
    setPreset(p.label);
    setFirst(p.first);
    setLast(p.last);
    setSunday(false);
  };

  return (
    <div className="dm">
      <div className="dm-panel">
        <Seg
          label="Try a preset"
          options={PRESETS.map((p) => p.label)}
          value={preset}
          onChange={(l) => apply(PRESETS.find((p) => p.label === l))}
        />
        <Range
          label="First punch"
          value={first}
          display={fmtTime(first)}
          min={hm(6)}
          max={hm(23)}
          step={5}
          onChange={(v) => {
            setFirst(v);
            setPreset(null);
            if (last <= v) setLast(v + 60);
          }}
        />
        <Range
          label="Last punch"
          value={last}
          display={`${fmtTime(last)}${last >= 1440 ? " (next day)" : ""}`}
          min={first + 15}
          max={hm(30)}
          step={5}
          onChange={(v) => {
            setLast(v);
            setPreset(null);
          }}
        />
        <Toggle label="It's a Sunday" checked={sunday} onChange={setSunday} />
        <Range
          label="Salary per shift"
          value={rate}
          display={inr(rate)}
          min={300}
          max={900}
          step={10}
          onChange={setRate}
        />
        <p className="dm-note">
          The day group is picked by the first punch. Leaving within {GRACE}{" "}
          minutes before a ladder row earns that row. Breaks are never paid and
          need no punch. Rate is illustrative - each worker has their own.
        </p>
      </div>

      <div className="dm-panel dm-panel--solid">
        <div className="dm-row pd-head">
          <Tag tone="info">{r.group.name} group</Tag>
          <Tag
            tone={
              r.status === "Present"
                ? "good"
                : r.status === "Half Shift"
                  ? "warn"
                  : "bad"
            }
          >
            {r.status}
          </Tag>
          {r.late && <Tag tone="warn">Late arrival</Tag>}
        </div>
        <LadderChart group={r.group} first={first} out={r.out} />
        <div className="pd-out-grid">
          <div>
            <span className="dm-label">Shifts earned</span>
            <motion.span
              key={r.shifts}
              className="dm-big"
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {fmtShift(r.shifts)}
            </motion.span>
          </div>
          <div>
            <span className="dm-label">Day's pay</span>
            <span className="dm-big pd-pay">{inr(r.shifts * rate)}</span>
          </div>
        </div>
        <p className="dm-reason">
          {fmtTime(first)} → {fmtTime(r.out)}
          {r.out >= 1440 ? " (next day)" : ""} on the {r.group.name} ladder
          earns <b>{fmtShift(r.shifts)}</b> shifts × {inr(rate)} ={" "}
          <b>{inr(r.shifts * rate)}</b>.
          {r.breaks.length > 0 && (
            <> Unpaid: {r.breaks.join(", ").toLowerCase()}.</>
          )}
        </p>
      </div>
    </div>
  );
}
