import { hm } from "./time.js";

/**
 * Production pay by shifts earned - the default shift groups from
 * Settings → Production Shifts. A group's ladder maps "leaves at T" to shifts
 * earned; between rows the value grows by the PAID minute, and time inside an
 * unpaid break earns nothing (nobody punches for a break).
 *
 * Times are minutes from the group's day start; next-day times are + 1440.
 */
export const GROUPS = {
  day: {
    id: "day",
    name: "Day",
    start: hm(8, 30),
    ladder: [
      [hm(10, 30), 0.25],
      [hm(12, 45), 0.5],
      [hm(15, 30), 0.75],
      [hm(17, 45), 1],
      [hm(20), 1.5],
      [hm(22, 30), 2],
      [hm(24, 30), 2.5],
      [hm(29, 30), 3],
    ],
    breaks: [
      [hm(10, 30), hm(10, 45), "Morning tea"],
      [hm(12, 45), hm(13, 30), "Lunch"],
      [hm(15, 30), hm(15, 45), "Afternoon tea"],
      [hm(17, 45), hm(18), "Evening tea"],
      [hm(20), hm(21), "Night dinner"],
    ],
  },
  night: {
    id: "night",
    name: "Night",
    start: hm(21),
    ladder: [
      [hm(24), 0.5],
      [hm(29, 30), 1.5],
    ],
    breaks: [],
  },
  sunday: {
    id: "sunday",
    name: "Sunday",
    start: hm(8, 30),
    ladder: [[hm(17), 1]],
    breaks: [
      [hm(10, 30), hm(10, 45), "Morning tea"],
      [hm(12, 45), hm(13, 30), "Lunch"],
      [hm(15, 30), hm(15, 45), "Afternoon tea"],
    ],
  },
};

export const GRACE = 5;

function paidMinutes(from, to, breaks) {
  if (to <= from) return 0;
  let total = to - from;
  for (const [a, b] of breaks) {
    const overlap = Math.min(to, b) - Math.max(from, a);
    if (overlap > 0) total -= overlap;
  }
  return total;
}

/** Cumulative shifts earned by being present from the group start until t. */
function ladderValue(t, g) {
  if (t <= g.start) return 0;
  let prevT = g.start;
  let prevV = 0;
  for (const [rowT, rowV] of g.ladder) {
    // Grace: leaving within GRACE minutes before a row earns that row.
    if (t >= rowT - GRACE && t <= rowT) return rowV;
    if (t < rowT) {
      const span = paidMinutes(prevT, rowT, g.breaks);
      const done = paidMinutes(prevT, t, g.breaks);
      return prevV + (rowV - prevV) * (span ? done / span : 0);
    }
    prevT = rowT;
    prevV = rowV;
  }
  return prevV; // past the last row: the group's maximum
}

/** Points of a group's ladder curve, for charting: [[t, value], …]. */
export function ladderCurve(g, step = 5) {
  const end = g.ladder[g.ladder.length - 1][0];
  const pts = [];
  for (let t = g.start; t <= end; t += step) pts.push([t, ladderValue(t, g)]);
  return pts;
}

/** Which group a day belongs to: Sunday, else by the first punch. */
export function pickGroup(firstPunch, isSunday) {
  if (isSunday) return GROUPS.sunday;
  return firstPunch >= hm(18) ? GROUPS.night : GROUPS.day;
}

/**
 * Shifts earned for one production day from its first and last punch.
 * `last` earlier than `first` means the worker left after midnight.
 */
export function shiftsEarned(first, last, { isSunday = false } = {}) {
  const group = pickGroup(first, isSunday);
  const out = last <= first ? last + 1440 : last;
  const arrive = first <= group.start + GRACE ? group.start : first;
  const raw = Math.max(0, ladderValue(out, group) - ladderValue(arrive, group));
  const shifts = Math.round(raw * 100) / 100;
  const late = first > group.start + GRACE;
  const brokenBreaks = group.breaks
    .filter(([a, b]) => out > a && arrive < b)
    .map(([, , n]) => n);
  return {
    group,
    shifts,
    status: shifts === 0 ? "Absent" : shifts < 1 ? "Half Shift" : "Present",
    late,
    breaks: brokenBreaks,
    out,
  };
}
