/**
 * Request types and their built-in approval pipelines, and the request date
 * window shared by the backend, the HR portal, the web app and the mobile app.
 */
export const REQUEST_TYPES = [
  { id: "leave", name: "Leave", pipeline: ["either"], editable: true },
  { id: "permission", name: "Permission", pipeline: ["either"], editable: true },
  { id: "casual", name: "Casual leave", pipeline: ["either"], editable: true },
  { id: "outpass", name: "Gate outpass", pipeline: ["either"], editable: true },
  { id: "missing", name: "Missing punch", pipeline: ["hod", "hr"], editable: true },
  { id: "onduty", name: "On-duty (geo)", pipeline: ["hod", "hr"], optional: [0], editable: true },
  { id: "resignation", name: "Resignation", pipeline: ["hod", "hr"], editable: true },
  { id: "onduty-punch", name: "On-duty punch check", pipeline: ["hr"], editable: false },
  { id: "correction", name: "Attendance correction", pipeline: ["hod"], raisedBy: "HR", editable: false },
  { id: "holiday", name: "Sunday / holiday work", pipeline: ["hod"], raisedBy: "HR", editable: false },
  { id: "other", name: "Other requests", pipeline: ["hr"], editable: false },
  { id: "advance", name: "Advance", pipeline: ["hr"], raisedBy: "HR", editable: false },
];

export const ROLE_LABEL = { hod: "Department Head", hr: "HR", either: "Department Head or HR" };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Can an employee request `date` today? Current month only; on the 1st and
 * 2nd of a month the previous month is still open. Missing punch can never
 * be in the future. Dates are plain {y, m (0-11), d}.
 */
export function requestWindow(today, date, { missingPunch = false } = {}) {
  const key = (x) => x.y * 400 + x.m * 32 + x.d;
  const sameMonth = date.y === today.y && date.m === today.m;
  const prev = today.m === 0 ? { y: today.y - 1, m: 11 } : { y: today.y, m: today.m - 1 };
  const inGrace = today.d <= 2 && date.y === prev.y && date.m === prev.m;

  if (missingPunch && key(date) > key(today)) {
    return { ok: false, message: "Date cannot be in the future." };
  }
  if (sameMonth || inGrace) {
    return {
      ok: true,
      message: inGrace
        ? `Allowed: ${MONTHS[prev.m]} is still open until the end of 2 ${MONTHS[today.m]}.`
        : `Allowed: ${MONTHS[today.m]} ${today.y} is the open month.`,
    };
  }
  return {
    ok: false,
    message:
      today.d <= 2
        ? `You can only request dates from 1 ${MONTHS[prev.m]} ${prev.y} to the end of ${MONTHS[today.m]} ${today.y}.`
        : `You can only request dates in ${MONTHS[today.m]} ${today.y}.`,
  };
}

export { MONTHS };
