import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tag } from "./kit.jsx";
import "./self-service.css";

/* October 2026, as an employee on the 09:00 general shift sees it on the 19th.
   Made-up month; the statuses, markers and wording follow the web app. */
const DAYS = {
  1: {
    s: "present",
    in: "08:56",
    out: "18:04",
    note: "Both halves worked: a full day.",
  },
  2: { s: "holiday", note: "Gandhi Jayanti - a paid national holiday." },
  3: {
    s: "present",
    in: "09:02",
    out: "18:10",
    note: "Both halves worked: a full day.",
  },
  4: { s: "off", note: "Sunday - weekly off." },
  5: {
    s: "present",
    in: "09:24",
    out: "18:05",
    late: true,
    note: "Late-In: your first punch is after shift start plus grace (09:10). Full day, and one mark in this month's late pool.",
  },
  6: {
    s: "present",
    in: "08:58",
    out: "18:01",
    note: "Both halves worked: a full day.",
  },
  7: {
    s: "half",
    in: "14:41",
    out: "18:02",
    note: "Half Day: a punch in only the evening half (at or after 14:30). Both halves is a full day, neither is absent.",
  },
  8: {
    s: "present",
    in: "10:32",
    out: "18:06",
    permit: true,
    note: "Morning Late-In permission applied: your shift start moved 60 minutes later today. Allowed - 1 of 3 this month.",
  },
  9: {
    s: "present",
    in: "09:05",
    out: "18:00",
    note: "Both halves worked: a full day.",
  },
  10: {
    s: "leave",
    note: "Earned leave - approved by your department head. Paid leave, so it is not loss of pay.",
  },
  11: { s: "off", note: "Sunday - weekly off." },
  12: {
    s: "present",
    in: "09:00",
    out: "18:12",
    note: "Both halves worked: a full day.",
  },
  13: {
    s: "present",
    in: "10:52",
    out: "18:03",
    quarter: true,
    note: "Quarter-shift arrival: first punch 10:52 is after the late window ended (10:10). 0.25 shift deducted instead of a half day - and no late mark.",
  },
  14: {
    s: "present",
    in: "08:59",
    out: "18:04",
    claim: true,
    note: "Missing punch (lunch in) approved by your department head and HR - written like a device punch, so the day is full.",
  },
  15: {
    s: "absent",
    note: "No punch recorded. Missing a punch? Raise a missing-punch claim - this month is still open.",
  },
  16: {
    s: "present",
    in: "09:28",
    out: "18:02",
    comp: true,
    note: "You arrived within your late-in allowance (30 minutes earned for last night's extra hours), so you were not marked late.",
  },
  17: {
    s: "present",
    in: "09:01",
    out: "18:00",
    note: "Both halves worked: a full day.",
  },
  18: { s: "off", note: "Sunday - weekly off." },
  19: {
    s: "present",
    in: "09:02",
    out: "-",
    today: true,
    note: "Today. Punched in at 09:02 by the face terminal at Unit 2. The evening punch completes the day.",
  },
};

const LABEL = {
  present: "Present",
  half: "Half day",
  absent: "Absent",
  leave: "Leave",
  holiday: "Holiday",
  off: "Weekly off",
  future: "Upcoming",
};
const TONE = {
  present: "good",
  half: "warn",
  absent: "bad",
  leave: "info",
  holiday: "",
  off: "",
};

export default function SelfService() {
  const [pick, setPick] = useState(13);
  const firstWeekday = new Date(2026, 9, 1).getDay(); // Thursday
  const day = DAYS[pick] || {
    s: "future",
    note: "This day hasn't happened yet.",
  };

  const all = Object.values(DAYS);
  const working = all.filter((d) => !["holiday", "off"].includes(d.s)).length;
  const present = all.filter((d) => d.s === "present").length;
  const half = all.filter((d) => d.s === "half").length;
  const presentDays = present + half * 0.5;
  const late = all.filter((d) => d.late).length;

  return (
    <div className="dm ss">
      <div className="dm-panel dm-panel--solid">
        <div className="ss-stats">
          <div>
            <small>Working days</small>
            <b>{working}</b>
          </div>
          <div>
            <small>Present days</small>
            <b>{presentDays}</b>
            <em>{Math.round((presentDays / working) * 100)}% attendance</em>
          </div>
          <div>
            <small>Absent</small>
            <b>{all.filter((d) => d.s === "absent").length}</b>
          </div>
          <div>
            <small>Days flagged late</small>
            <b>{late}</b>
          </div>
        </div>
        <div className="ss-cal" role="grid" aria-label="October 2026">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d} className="ss-head" role="columnheader">
              {d}
            </span>
          ))}
          {Array.from({ length: firstWeekday }, (_, i) => (
            <span key={`b${i}`} />
          ))}
          {Array.from({ length: 31 }, (_, i) => {
            const n = i + 1;
            const d = DAYS[n] || { s: "future" };
            return (
              <button
                key={n}
                type="button"
                className={`ss-day ss-${d.s} ${pick === n ? "is-picked" : ""} ${d.today ? "is-today" : ""} ${d.comp ? "is-comp" : ""}`}
                onClick={() => setPick(n)}
                aria-pressed={pick === n}
                aria-label={`${n} October: ${LABEL[d.s]}`}
              >
                {n}
                <span className="ss-marks">
                  {d.late && <i className="ss-mark ss-mark--late" />}
                  {d.permit && <i className="ss-mark ss-mark--permit" />}
                  {d.quarter && <i className="ss-mark ss-mark--quarter" />}
                </span>
              </button>
            );
          })}
        </div>
        <div className="ss-legend">
          <span>
            <i className="ss-present" />
            Present
          </span>
          <span>
            <i className="ss-half" />
            Half day
          </span>
          <span>
            <i className="ss-absent" />
            Absent
          </span>
          <span>
            <i className="ss-leave" />
            Leave
          </span>
          <span>
            <i className="ss-holiday" />
            Holiday / off
          </span>
          <span>
            <i className="ss-mark ss-mark--late" />
            Late-in
          </span>
          <span>
            <i className="ss-mark ss-mark--permit" />
            Permission
          </span>
          <span>
            <i className="ss-ring" />
            Late-in allowance
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={pick}
          className="dm-panel ss-detail"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="dm-label">
            {new Date(2026, 9, pick).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </span>
          <div className="dm-tags">
            <Tag tone={TONE[day.s]}>{LABEL[day.s]}</Tag>
            {day.late && <Tag tone="warn">Late-In</Tag>}
            {day.permit && <Tag tone="info">Permission applied</Tag>}
            {day.quarter && <Tag tone="warn">Quarter shift · 0.75</Tag>}
            {day.comp && <Tag tone="good">Allowance used</Tag>}
            {day.claim && <Tag tone="info">Missing punch approved</Tag>}
          </div>
          {day.in && (
            <dl className="dm-kv">
              <div>
                <dt>First punch in</dt>
                <b>{day.in}</b>
              </div>
              <div>
                <dt>Last punch out</dt>
                <b>{day.out}</b>
              </div>
            </dl>
          )}
          <p className="dm-reason">{day.note}</p>
          <p className="dm-note">
            Tap any day. Every day carries its reason, in the words the employee
            sees.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
