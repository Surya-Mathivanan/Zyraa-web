/**
 * Journal categories. Each has a cover tone (from tokens.css), an icon, and
 * an ink colour that stays readable on the light journal page — so articles
 * in the same category share a colour wherever they appear.
 */
export const CATEGORY = {
  Payroll: { tone: "crimson", icon: "coin", ink: "#b40023" },
  Attendance: { tone: "indigo", icon: "clock", ink: "#353a96" },
  Production: { tone: "lemon", icon: "steps", ink: "#6e6a00" },
  Requests: { tone: "cobalt", icon: "calendar", ink: "#285ccc" },
  Devices: { tone: "ink", icon: "scan", ink: "#010b13" },
  "Field & gate": { tone: "rust", icon: "pin", ink: "#a0430a" },
  Leadership: { tone: "night", icon: "chart", ink: "#0e0929" },
};

export function categoryOf(name) {
  return CATEGORY[name] || CATEGORY.Leadership;
}
