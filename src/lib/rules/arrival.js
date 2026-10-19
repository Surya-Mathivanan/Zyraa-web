import { fmtTime, hm } from "./time.js";

/**
 * The staff arrival timeline and monthly late pool, with Zyraa's shipped
 * defaults (Settings → Attendance and Settings → Late Detection).
 */
export const STAFF_RULES = {
  shiftStart: hm(9),
  grace: 10,
  lateWindow: 60,
  permissionWindow: 60,
  extraMinutes: 20,
  quarterDeduction: 0.25,
  secondHalfStart: hm(14, 30),
  permissionCap: 3,
  freeMarks: 3,
  slabEvery: 3, // every 3 billable marks…
  slabShift: 0.25, // …cost a quarter shift
  slabMax: 2.5,
};

export function arrivalZones(r = STAFF_RULES) {
  const onTimeEnd = r.shiftStart + r.grace;
  const lateEnd = onTimeEnd + r.lateWindow;
  const permissionEnd = lateEnd + r.permissionWindow;
  const extraEnd = permissionEnd + r.extraMinutes;
  return [
    { id: "on-time", label: "On time", from: r.shiftStart - 60, to: onTimeEnd },
    { id: "late", label: "Late window", from: onTimeEnd, to: lateEnd },
    {
      id: "permission",
      label: "Permission window",
      from: lateEnd,
      to: permissionEnd,
    },
    { id: "extra", label: "Extra minutes", from: permissionEnd, to: extraEnd },
    {
      id: "missed",
      label: "First half missed",
      from: extraEnd,
      to: r.secondHalfStart + 90,
    },
  ];
}

/**
 * Judge one staff day from its first punch.
 * @param {number} first  first punch, minutes since midnight
 * @param {{ permission: boolean, permissionsUsed: number }} ctx
 *        permission = an approved Morning Late-In for this day;
 *        permissionsUsed = approved permissions earlier this month.
 */
export function judgeArrival(
  first,
  { permission = false, permissionsUsed = 0 } = {},
  r = STAFF_RULES,
) {
  const [onTime, late, perm, extra] = arrivalZones(r);
  const t = fmtTime(first);
  const withinCap = permissionsUsed < r.permissionCap;
  const permissionState = permission
    ? withinCap
      ? "allowed"
      : "excess"
    : null;

  if (first <= onTime.to) {
    return {
      zone: "on-time",
      value: 1,
      mark: null,
      permissionState: null,
      reason: `On time: first punch ${t} is inside the ${r.grace}-minute grace.`,
    };
  }
  if (first <= late.to) {
    return {
      zone: "late",
      value: 1,
      mark: "Late",
      permissionState: null,
      reason: `Late window: first punch ${t} is after ${fmtTime(onTime.to)} but before ${fmtTime(late.to)}. Full day, plus one mark in the monthly late pool.`,
    };
  }
  if (first <= perm.to) {
    if (permissionState === "allowed") {
      return {
        zone: "permission",
        value: 1,
        mark: null,
        permissionState,
        reason: `Approved Morning Late-In (${permissionsUsed + 1} of ${r.permissionCap} this month) moves the shift start 60 minutes. Arrival at ${t} is excused: full day, no mark.`,
      };
    }
    return {
      zone: "permission",
      value: 1 - r.quarterDeduction,
      mark: permissionState === "excess" ? "Excess permission" : null,
      permissionState,
      reason:
        permissionState === "excess"
          ? `The permission is Overdue / Excess (past this month's cap of ${r.permissionCap}): it excuses nothing and adds one mark. Quarter-shift arrival at ${t}: ${r.quarterDeduction} shift deducted.`
          : `Quarter-shift arrival: first punch ${t} is after the late window ended (${fmtTime(late.to)}). ${r.quarterDeduction} shift deducted instead of losing the half day - and no late mark.`,
    };
  }
  if (first <= extra.to) {
    return {
      zone: "extra",
      value: 1 - r.quarterDeduction,
      mark: null,
      permissionState: permission ? "no-cover" : null,
      reason: `Extra minutes: ${t} still makes the morning half, with the ${r.quarterDeduction} quarter-shift deduction. A Late-In permission only reaches ${fmtTime(perm.to)}.`,
    };
  }
  return {
    zone: "missed",
    value: 0.5,
    mark: null,
    permissionState: null,
    reason: `First half missed: nothing counts for the morning after ${fmtTime(extra.to)}. With a punch at or after ${fmtTime(r.secondHalfStart)} the day is a Half Day (0.50).`,
  };
}

/** Monthly late pool → shifts deducted, using the default slab ladder. */
export function latePool(marks, r = STAFF_RULES) {
  const free = Math.min(marks, r.freeMarks);
  const billable = Math.max(0, marks - r.freeMarks);
  const shifts = Math.min(
    r.slabMax,
    Math.floor(billable / r.slabEvery) * r.slabShift,
  );
  return { marks, free, billable, shifts };
}
