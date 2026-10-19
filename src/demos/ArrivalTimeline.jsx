import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Range, Toggle, Tag } from "./kit.jsx";
import {
  STAFF_RULES,
  arrivalZones,
  judgeArrival,
  latePool,
} from "../lib/rules/arrival.js";
import { fmtTime, fmtShift, hm } from "../lib/rules/time.js";
import "./arrival.css";

const MIN = hm(8, 30);
const MAX = hm(15, 30);
const pct = (v) =>
  ((Math.min(MAX, Math.max(MIN, v)) - MIN) / (MAX - MIN)) * 100;

const ZONE_TONE = {
  "on-time": "good",
  late: "warn",
  permission: "info",
  extra: "warn",
  missed: "bad",
};

export default function ArrivalTimeline() {
  const [first, setFirst] = useState(hm(9, 42));
  const [permission, setPermission] = useState(false);
  const [permissionsUsed, setPermissionsUsed] = useState(1);
  const [marksBefore, setMarksBefore] = useState(4);

  const v = judgeArrival(first, { permission, permissionsUsed });
  const zones = arrivalZones();
  const marks = marksBefore + (v.mark ? 1 : 0);
  const pool = latePool(marks);
  const poolBefore = latePool(marksBefore);
  const extraShift = pool.shifts - poolBefore.shifts;

  return (
    <div className="dm">
      <div className="dm-panel">
        <Range
          label="First punch"
          value={first}
          display={fmtTime(first)}
          min={MIN}
          max={MAX}
          onChange={setFirst}
        />
        <Toggle
          label="Approved Morning Late-In permission"
          checked={permission}
          onChange={setPermission}
        />
        <Range
          label="Permissions already used this month"
          value={permissionsUsed}
          display={`${permissionsUsed} of ${STAFF_RULES.permissionCap}`}
          min={0}
          max={5}
          onChange={setPermissionsUsed}
        />
        <Range
          label="Late-pool marks before today"
          value={marksBefore}
          min={0}
          max={14}
          onChange={setMarksBefore}
        />
        <p className="dm-note">
          Example shift 9:00 AM with 10 minutes' grace - the shipped defaults.
          Every window is a setting a company can change.
        </p>
      </div>

      <div className="dm-panel dm-panel--solid">
        <div className="at-track" aria-hidden="true">
          {zones.map((z) => (
            <span
              key={z.id}
              className={`at-zone at-zone--${z.id} ${v.zone === z.id ? "is-on" : ""}`}
              style={{
                left: `${pct(z.from)}%`,
                width: `${pct(z.to) - pct(z.from)}%`,
              }}
            >
              <em>{z.label}</em>
            </span>
          ))}
          <motion.span
            className="at-needle"
            animate={{ left: `${pct(first)}%` }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            <i>{fmtTime(first)}</i>
          </motion.span>
        </div>
        <div className="at-scale" aria-hidden="true">
          {[hm(9), hm(10, 10), hm(11, 10), hm(11, 30), hm(14, 30)].map((t) => (
            <span key={t} style={{ left: `${pct(t)}%` }}>
              {fmtTime(t)}
            </span>
          ))}
        </div>

        <div className="dm-verdict">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={v.value}
              className="dm-big"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {fmtShift(v.value)}
            </motion.span>
          </AnimatePresence>
          <div className="at-reason">
            <div className="dm-tags">
              <Tag tone={ZONE_TONE[v.zone]}>
                {zones.find((z) => z.id === v.zone).label}
              </Tag>
              {v.mark && <Tag tone="warn">+1 mark · {v.mark}</Tag>}
              {v.permissionState === "allowed" && (
                <Tag tone="good">Permission allowed</Tag>
              )}
              {v.permissionState === "excess" && (
                <Tag tone="bad">Overdue / Excess</Tag>
              )}
            </div>
            <p className="dm-reason">{v.reason}</p>
          </div>
        </div>

        <div className="at-pool">
          <span className="dm-label">
            Monthly late pool
            <b>
              {pool.billable} billable · {fmtShift(pool.shifts)} shift
            </b>
          </span>
          <div className="at-pips" aria-label={`${marks} marks this month`}>
            {Array.from({ length: 15 }, (_, i) => (
              <span
                key={i}
                className={`at-pip ${i < marks ? (i < STAFF_RULES.freeMarks ? "is-free" : "is-billable") : ""} ${
                  v.mark && i === marks - 1 ? "is-new" : ""
                } ${i >= STAFF_RULES.freeMarks && (i - STAFF_RULES.freeMarks + 1) % STAFF_RULES.slabEvery === 0 ? "is-slab" : ""}`}
              />
            ))}
          </div>
          <p className="dm-note">
            Late-ins, early-outs and excess permissions share one pool. The
            first {STAFF_RULES.freeMarks} are free; then every{" "}
            {STAFF_RULES.slabEvery} billable marks cost {STAFF_RULES.slabShift}{" "}
            shift (capped at {STAFF_RULES.slabMax}).
            {extraShift > 0 && (
              <strong>
                {" "}
                Today's mark completes a slab: another {fmtShift(
                  extraShift,
                )}{" "}
                shift.
              </strong>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
