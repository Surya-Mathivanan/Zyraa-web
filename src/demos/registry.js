import { lazy } from "react";

/**
 * Every interactive demo, in hub order. Each loads as its own chunk, only
 * when its page is opened. `rules` says what the demo runs, so visitors know
 * the numbers come from the product and not from a mock-up.
 */
export const demos = [
  {
    slug: "arrival-timeline",
    title: "Arrival timeline",
    accent: "timeline",
    kicker: "Attendance",
    tone: "night",
    blurb:
      "Drag a staff member's first punch through the morning and watch the day's value, the late pool and the reason sentence change.",
    rules:
      "Late window 60 min · permission window 60 min · extra minutes 20 · quarter-shift 0.25 · 3 free marks, then 0.25 shift per 3",
    component: lazy(() => import("./ArrivalTimeline.jsx")),
  },
  {
    slug: "production-day",
    title: "Try a production day",
    accent: "production day",
    kicker: "Production pay",
    tone: "butter",
    blurb:
      "Set a worker's first and last punch. The day ladder, unpaid breaks and pro-rata by the minute decide the shifts earned - and the pay.",
    rules:
      "Day group from 8:30 AM · ladder to 3.00 shifts · five unpaid breaks · 5-minute grace · Night and Sunday groups",
    component: lazy(() => import("./ProductionDay.jsx")),
  },
  {
    slug: "approvals",
    title: "Approval pipeline",
    accent: "pipeline",
    kicker: "Requests",
    tone: "indigo",
    blurb:
      "Raise a request, change its pipeline, then approve or reject as the department head or HR. Check the request window for any date.",
    rules:
      "12 request types · 1–2 steps of HOD, HR or HOD-or-HR · current month plus 2 grace days",
    component: lazy(() => import("./Approvals.jsx")),
  },
  {
    slug: "staff-payroll",
    title: "Payslip builder",
    accent: "builder",
    kicker: "Staff payroll",
    tone: "cream",
    blurb:
      "Move the month - present days, half days, late marks, an advance - and see gross, PF, ESI, the priced issues and net pay.",
    rules:
      "Gross = salary ÷ working days × days paid · Basic 50% · PF on Basic · ESI under the ceiling · example rates",
    component: lazy(() => import("./StaffPayroll.jsx")),
  },
  {
    slug: "geo-on-duty",
    title: "Geo punch & on-duty",
    accent: "on-duty",
    kicker: "Field & gate",
    tone: "sage",
    blurb:
      "Drag the employee around the branch geofence, switch on a mocked GPS, then run an on-duty session from destination to four punches.",
    rules:
      "Branch radius (default 200 m) · mocked GPS refused · up to 4 photo + location punches",
    component: lazy(() => import("./GeoOnDuty.jsx")),
  },
  {
    slug: "gate-pass",
    title: "Gate pass & tea break",
    accent: "tea break",
    kicker: "Field & gate",
    tone: "rust",
    blurb:
      "Take an outpass from request to the return scan, then run a tea break against the allowed minutes.",
    rules:
      "Exit QR valid 60 min after approval · return QR 60 min · tea break 15 min allowed · not returned after 60 min",
    component: lazy(() => import("./GatePass.jsx")),
  },
  {
    slug: "self-service",
    title: "Employee month",
    accent: "month",
    kicker: "Employee web app",
    tone: "mist",
    blurb:
      "The employee's own attendance heat map. Tap any day to read why it was counted the way it was.",
    rules:
      "Present, half day, absent, leave, holiday · late-in and permission markers · present days = present + ½ half days",
    component: lazy(() => import("./SelfService.jsx")),
  },
  {
    slug: "devices",
    title: "Device board",
    accent: "board",
    kicker: "Biometrics",
    tone: "ink",
    blurb:
      "Break a face terminal's network and watch the nine checks find the layer. Then feed in double taps and see them collapse.",
    rules:
      "Connected = heard within 3 min · nine diagnostic checks · two taps within 5 minutes = one punch",
    component: lazy(() => import("./Devices.jsx")),
  },
  {
    slug: "report-center",
    title: "Report Center",
    accent: "Center",
    kicker: "Reports",
    tone: "lemon",
    blurb:
      "Search the full catalogue - every one of the 148 reports, by category, exactly as the product lists them.",
    rules:
      "148 reports · 9 categories · filters, totals, Excel and PDF on every report",
    component: lazy(() => import("./ReportCenter.jsx")),
  },
  {
    slug: "md-assistant",
    title: "MD assistant",
    accent: "assistant",
    kicker: "MD portal",
    tone: "crimson",
    blurb:
      "Ask the Managing Director's assistant a question and open “How I got this” to see the tools it used and the names it never sent.",
    rules:
      "Read-only · ~100 analytics tools · names tokenised before the AI sees them · English, Tamil, Hindi voice · sample data",
    component: lazy(() => import("./MdAssistant.jsx")),
  },
];

export const demoBySlug = Object.fromEntries(demos.map((d) => [d.slug, d]));
