/**
 * Site-wide content. Every product statement here was checked against the
 * HR portal, employee web app and mobile app repositories - keep it that way:
 * no feature goes on the site that the product does not ship.
 */
export const site = {
  shortName: "ZYRAA",
  name: "Zyraa",
  productName: "Zyraa HRMS",
  tagline: "One record of the month - from the punch to the payslip.",
  // Homepage <title>. Keep in sync with the <title> in index.html.
  defaultTitle:
    "Zyraa HRMS - Attendance, Payroll and Approvals for Garment Units",
  // Canonical origin, no trailing slash. PLACEHOLDER - no domain was supplied.
  // Also appears in index.html and public/sitemap.xml; change all three together.
  url: "https://zyraa.app",
  location: {
    city: "Tiruppur",
    state: "Tamil Nadu",
    country: "India",
    label: "Tiruppur, Tamil Nadu, India",
  },
  // One number only. WhatsApp links use `raw`.
  primaryPhone: { label: "+91 93448 59103", raw: "919344859103" },
  developer: {
    name: "Surya",
    role: "Developer",
    blurb:
      "Zyraa is designed, built and supported by one developer. The person who takes your call is the person who writes the code.",
  },

  nav: [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/apps", label: "Apps" },
    { to: "/demos", label: "Live demos" },
    { to: "/blogs", label: "Journal" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ],

  // Headline figures. Sources: report registry (148 definitions → "140+"),
  // approval workflow config (12 request types), MD assistant tool registry.
  stats: {
    reports: 140,
    reportCategories: 9,
    requestTypes: 12,
    apps: 3,
    aiTools: 100,
    payCycles: 3,
    maxShiftsPerDay: "3.00",
    freeLates: 3,
  },

  // The surfaces people use. The first three are "the three apps".
  apps: [
    {
      id: "admin",
      code: "01",
      name: "HR admin portal",
      who: "HR, admins and branch users",
      tone: "ink",
      blurb:
        "The whole system: employees, attendance, shifts, approvals, staff and production payroll, gate registers, devices, documents, 140+ reports and every setting. Access is set per module - hidden, view or edit - and can be tied to one branch.",
      points: [
        "Custom roles with Hidden, View or Edit on every module",
        "Background jobs for payroll, slips and device sync",
        "Report Center with Excel and PDF on every report",
        "Six portal themes, including a dark one for evening shifts",
      ],
    },
    {
      id: "web",
      code: "02",
      name: "Employee web app",
      who: "Every employee, in the browser",
      tone: "indigo",
      blurb:
        "Self-service that explains itself: an attendance heat map with a reason for every day, live punch status, leave and permission requests, salary slips, advances, outpass QR, digital ID and a manager approvals centre.",
      points: [
        "Calendar heat map with late, permission and compensation markers",
        "Geo punch inside the branch radius - slide to punch",
        "Salary slips with PDF download",
        "Manager Approvals Center for department heads",
      ],
    },
    {
      id: "mobile",
      code: "03",
      name: "Mobile app",
      who: "Employees and department heads",
      tone: "crimson",
      blurb:
        "Everything that needs a location, a camera or the gate: GPS punch, photo-verified on-duty sessions, outpass and tea-break QR, missing-punch claims - and approvals for department heads, from the floor.",
      points: [
        "GPS punch inside the branch radius, with mock-location flags",
        "On-duty sessions: photo + location on every punch",
        "Outpass QR and a permanent tea-break pass",
        "HOD approvals with comments, on the move",
      ],
    },
  ],

  // The extra front doors, beyond the three apps.
  extras: [
    {
      name: "MD portal",
      blurb:
        "A separate executive view: exceptions first, cost bridges, executive reports and a read-only AI assistant.",
    },
    {
      name: "Gate scanner & reception",
      blurb:
        "Kiosk consoles that scan outpass and tea-break QR codes and log visitors at the gate.",
    },
    {
      name: "Public ID verification",
      blurb:
        "Every ID card carries a QR that opens a public page confirming the person is an active employee.",
    },
  ],

  // Features grouped into pillars, in the order they appear on /features.
  pillars: [
    {
      id: "time",
      name: "Time",
      title: "Attendance you can defend",
      tone: "ink",
      modules: [
        {
          id: "attendance",
          name: "Attendance engine",
          blurb:
            "Every day is judged by the shift rules and stored with a plain-language reason - so the number on the payslip can always be explained.",
          features: [
            "Strict or Simple calculation mode per company",
            "Staff timeline: late window, permission window, extra minutes, quarter-shift",
            "Half-day rule: both halves full, one half half-day, none absent",
            "Two taps within 5 minutes count as one punch",
            "Forgotten out-punch protection for the next morning",
            "Attendance corrections routed HR → HOD, always logged",
          ],
          demo: "arrival-timeline",
        },
        {
          id: "biometrics",
          name: "Biometric devices",
          blurb:
            "Face terminals on the factory network feed Zyraa three ways at once - pull, push and ADMS cloud push - with a site connector for networks the cloud cannot reach.",
          features: [
            "ZKTeco-protocol pull, JSON push and ADMS push, side by side",
            "Outbound-only Windows site connector - nothing opened in the firewall",
            "Punches kept through internet outages and sent when it returns",
            "Device status with nine diagnostic checks, refreshed every 15 s",
            "Preview missing punches before fetching; existing punches never changed",
            "Unmatched device IDs flagged so no attendance is silently lost",
          ],
          demo: "devices",
        },
        {
          id: "shifts",
          name: "Shifts & rosters",
          blurb:
            "Shift cards on a 24-hour bar, a guided assignment wizard with a live preview, and history that never rewrites a paid month.",
          features: [
            "Grace, lunch and gender- or branch-specific shifts",
            "Assignment wizard previews new, moved and kept employees",
            "A shift ever used is disabled, never deleted",
            "Shift Assignment Gaps report catches anyone without a shift",
          ],
        },
        {
          id: "geo",
          name: "Geo & on-duty",
          blurb:
            "For people away from a device: geo-fenced check-in at the branch, and photo-verified on-duty sessions for field visits.",
          features: [
            "Branch geofence radius (default 200 m), checked before a punch",
            "On-duty sessions start with a destination; punches count once approved",
            "Up to four punches a day: in, out, in, out",
            "A camera photo and GPS fix on every on-duty punch - no gallery uploads",
            "Mocked-GPS punches flagged red on the map and refused by the server",
            "Live map with route history for HR",
          ],
          demo: "geo-on-duty",
        },
      ],
    },
    {
      id: "requests",
      name: "Requests",
      title: "Every request, one pipeline",
      tone: "indigo",
      modules: [
        {
          id: "leave",
          name: "Leave, permissions & claims",
          blurb:
            "Leave, one-hour permissions, casual leave and missing-punch claims - raised from the phone or the browser, inside a window that keeps paid months closed.",
          features: [
            "Full, half and multi-day leave with balances",
            "Three one-hour permissions: Morning Late-In, Evening Early-Out, Middle One-Hour",
            "Monthly permission cap; beyond it, Overdue / Excess",
            "Casual leave: one a month after six months' service",
            "Missing-punch claims name the exact punch",
            "Requests for the current month only, plus two grace days",
          ],
          demo: "approvals",
        },
        {
          id: "approvals",
          name: "Approval workflow control",
          blurb:
            "A dozen request types, each with its own pipeline of one or two steps - HOD, HR, or whichever of them gets there first.",
          features: [
            "Per step: HOD, HR, or HOD or HR - mandatory or optional",
            "Switch any request type off with a message to employees",
            "Eight approval switches per department head",
            "Waiting requests continue from their step when rules change",
            "Pending Approvals Ageing and Approver Turnaround reports",
          ],
          demo: "approvals",
        },
        {
          id: "gate",
          name: "Gate, tea breaks & visitors",
          blurb:
            "The gate is part of the register: outpasses with QR exits and returns, a permanent tea-break pass, and a visitor desk.",
          features: [
            "Outpass request → approval → QR → scanned out and back in",
            "Tea break against allowed minutes; overruns reported",
            "Not returned within 60 minutes is flagged",
            "Signed, short QR codes - forged scans are logged",
            "28 gate, tea-break and visitor reports",
          ],
          demo: "gate-pass",
        },
      ],
    },
    {
      id: "money",
      name: "Money",
      title: "Payroll that reads the month",
      tone: "butter",
      modules: [
        {
          id: "payroll",
          name: "Staff payroll",
          blurb:
            "Generate reads the month - attendance, approved leave and permissions, due advances - and prices every rule. Review the issues, each with its ₹ impact and the rule behind it, then mark it paid.",
          features: [
            "Records, Issues, Skipped and Rules views before anything is paid",
            "Loss of pay, late-pool and without-permission deductions",
            "PF on Basic and ESI under the ceiling - rates set in Settings",
            "Issues view: each deduction with its ₹ cost and rule",
            "Salary Statement, bank file and cash list export",
            "Payslips by PDF, email and WhatsApp - single or bulk",
          ],
          demo: "staff-payroll",
        },
        {
          id: "production",
          name: "Production pay",
          blurb:
            "The floor is paid by shifts earned. A ladder of leaving times, unpaid breaks and pro-rata by the minute - on Weekly, BiWeekly or Monthly cycles side by side.",
          features: [
            "Day, Night and Sunday groups picked by the first punch",
            "Up to 3.00 shifts a day; breaks never paid, never punched",
            "Rounding step and direction, so no one is paid for time not worked",
            "Weekly (7), BiWeekly (14) and Monthly (28-day) cycles",
            "“Try a day” simulator before a rule goes live",
          ],
          demo: "production-day",
        },
        {
          id: "compensation",
          name: "Overtime & compensation",
          blurb:
            "Extra hours are recognised, not argued about: a next-morning late-in allowance, shift compensation as a day off or pay, and Sunday or holiday work credits.",
          features: [
            "Type 1: automatic next-day late-in allowance",
            "Type 2: shift compensation as Relaxation or Payment",
            "Company-announced late-in / early-out days",
            "Sunday & holiday work credited after HOD approval",
            "Paid birthday leave, automatically",
          ],
        },
        {
          id: "advances",
          name: "Advances, loans & bonus",
          blurb:
            "General advances and term loans with EMI schedules that payroll deducts by itself - plus the statutory bonus register.",
          features: [
            "General advance or term loan with a monthly schedule",
            "Pending → Active → Completed, tracked per instalment",
            "Statutory bonus at 8.33%–20% under the Bonus Act",
            "Increments and promotions with full history",
          ],
        },
      ],
    },
    {
      id: "people",
      name: "People",
      title: "Records, documents and insight",
      tone: "sage",
      modules: [
        {
          id: "employees",
          name: "Employees & organisation",
          blurb:
            "Staff and production records, branches with unit codes and geofences, departments with headcount targets - and an Excel bulk upload that checks everything before it saves.",
          features: [
            "Bulk upload up to 5,000 rows with a dry-run check",
            "Never deleted - marked inactive, history kept",
            "Branch-scoped logins for multi-unit companies",
            "Document tracker for PAN, Aadhaar, certificates and passbook",
          ],
        },
        {
          id: "documents",
          name: "Letters & ID cards",
          blurb:
            "Offer, experience and resignation letters generated on demand, and ID cards - vertical for staff, horizontal for production - with a QR that verifies them.",
          features: [
            "Per-document theme, accent, heading style and watermark",
            "ID card designer with QR verification on the back",
            "Bulk print, ZIP download, email or WhatsApp",
          ],
        },
        {
          id: "recruitment",
          name: "Recruitment",
          blurb:
            "A public careers page, required-roles planning and explainable resume screening against department hiring rules.",
          features: [
            "Score breakdown for skills, education and experience",
            "Shortlist, interview invites and rejection emails",
            "Resumes purged automatically after screening",
          ],
        },
        {
          id: "reports",
          name: "Report Center",
          blurb:
            "140+ ready-made reports in nine categories - registers, statutory statements, exceptions and executive summaries - each with filters, totals and Excel and PDF export.",
          features: [
            "PF and ESI statements, minimum-wage compliance",
            "Muster roll and Form 12-style adult workers register",
            "Late, half-day, punch-exception and overtime registers",
            "Copy a link to any report with its filters",
          ],
          demo: "report-center",
        },
        {
          id: "md",
          name: "MD portal & AI assistant",
          blurb:
            "A separate front door for the Managing Director: exceptions first, a payroll cost bridge, seven executive reports and an assistant that can read but never write.",
          features: [
            "“Needs your attention” on every page",
            "About 100 read-only analytics tools - and “How I got this” on every answer",
            "Names replaced with codes before anything reaches the AI",
            "Voice in English, Tamil and Hindi",
          ],
          demo: "md-assistant",
        },
      ],
    },
    {
      id: "platform",
      name: "Platform",
      title: "Built to be trusted",
      tone: "night",
      modules: [
        {
          id: "security",
          name: "Access, audit & sign-in",
          blurb:
            "Fail-closed permissions, a company-wide audit trail, login devices you can revoke, and passwordless sign-in for workers by SMS or WhatsApp code.",
          features: [
            "Access per module and sub-module: Hidden, View or Edit",
            "Audit log of every create, update, approve and export",
            "Employee sign-in by password or one-time code",
            "HR lockout after repeated failed logins",
          ],
        },
        {
          id: "comms",
          name: "Messages",
          blurb:
            "WhatsApp, email and SMS for the moments that matter: sign-in codes, approval decisions, documents and optional attendance alerts.",
          features: [
            "24 WhatsApp message types, each with its own switch",
            "Attendance alerts timed to each person's own shift",
            "Salary slips, letters and ID cards by email",
            "Daily send limits and automatic pause on failures",
          ],
        },
        {
          id: "ops",
          name: "Backups, data & deployment",
          blurb:
            "Scheduled backups with an off-site copy, a checked restore, a read-only data API - in the cloud or on a server at the factory.",
          features: [
            "Scheduled backups with Google Drive off-site copy",
            "Restore is checked first; a safety backup is taken before",
            "Read-only data API with keys, CORS and rate limits",
            "Cloud hosting or an on-site Windows server",
          ],
        },
      ],
    },
  ],

  // Who gets to see what.
  roles: [
    {
      name: "Super Admin",
      detail: "Everything, plus restores, data sharing and HR accounts.",
    },
    {
      name: "HR Admin",
      detail: "Every module, payroll generation and device configuration.",
    },
    {
      name: "HR Staff",
      detail: "Per-module Hidden, View or Edit - optionally one branch only.",
    },
    {
      name: "Department Head",
      detail:
        "Approves their departments' requests, from the phone or browser.",
    },
    {
      name: "Managing Director",
      detail:
        "The MD portal: analytics, executive reports and the AI assistant.",
    },
    {
      name: "Employee",
      detail: "Self-service on web and mobile - their own data only.",
    },
  ],
};
