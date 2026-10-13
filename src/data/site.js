export const site = {
  shortName: "ZYRAA",
  name: "Zyraa",
  productName: "Zyraa HRMS",
  tagline: "The single system that runs the people side of your company.",
  // Homepage <title>. Keep in sync with the <title> in index.html, which is what
  // crawlers and social scrapers read before JS runs.
  defaultTitle: "Zyraa HRMS — Attendance, Payroll and People in One System",
  // Canonical origin, no trailing slash. PLACEHOLDER — no domain was supplied.
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
  // Headline figures. `reports` is the count documented in the HRMS guide.
  stats: {
    reports: 140,
    approvalTypes: 7,
    surfaces: 3,
    modules: 8,
  },

  // The three places people use Zyraa from.
  surfaces: [
    {
      id: "admin",
      code: "01",
      name: "Admin portal",
      who: "HR & administration",
      blurb:
        "The full system: employee records, attendance, payroll, shifts, devices, roles and settings. Where HR actually runs the month.",
    },
    {
      id: "employee",
      code: "02",
      name: "Employee web app",
      who: "Every employee",
      blurb:
        "Self-service in the browser. Attendance heat map, leave balance, salary slips and a read-only profile.",
    },
    {
      id: "mobile",
      code: "03",
      name: "Mobile app",
      who: "Employees & approvers",
      blurb:
        "Leave, permissions, missing-punch claims and GPS on-duty sessions. Department heads approve from the floor.",
    },
  ],

  // Product modules, in the order they appear on /features.
  modules: [
    {
      id: "employees",
      code: "01",
      short: "People",
      name: "Employee records",
      blurb:
        "Personal data, professional details, documents and salary configuration in one record, with branch and unit assignment.",
      features: [
        "Personal, professional and document storage",
        "Salary configuration with the 50% + 50% split",
        "Bulk import, export and bulk updates",
        "Offer, appointment and experience letters",
        "ID cards with photo and employee details",
      ],
    },
    {
      id: "attendance",
      code: "02",
      short: "Attendance",
      name: "Attendance & biometric",
      blurb:
        "Punches come off the biometric devices on your factory network and become attendance you can defend, with every override logged.",
      features: [
        "Biometric sync in Strict or Simple mode",
        "Device registration, status and site connectors",
        "Late windows, grace periods and deduction slabs",
        "Manual override with a mandatory reason",
        "Without-Permission policy and exception logs",
      ],
    },
    {
      id: "leave",
      code: "03",
      short: "Leave",
      name: "Leave & permissions",
      blurb:
        "Employee to department head to HR, in one pipeline. Seven approval types, each with its own route and its own audit trail.",
      features: [
        "Multi-day and half-day leave with balances",
        "Late-In, Early-Out and mid-shift permissions",
        "Missing-punch claims for past dates",
        "Seven configurable approval pipelines",
        "Current-month-only requests, by design",
      ],
    },
    {
      id: "payroll",
      code: "04",
      short: "Payroll",
      name: "Staff payroll",
      blurb:
        "Salary is calculated from the attendance and the requests already in Zyraa. Nothing is re-entered, so nothing drifts.",
      features: [
        "Draft, review, publish and lock a session",
        "LOP, late deductions and advance repayments",
        "PF and ESI from the split components",
        "Salary slips by PDF, email or WhatsApp",
        "CTC breakdown and payroll cost reporting",
      ],
    },
    {
      id: "production",
      code: "05",
      short: "Production",
      name: "Production payroll",
      blurb:
        "A production floor does not run on one monthly cycle. Weekly, bi-weekly and monthly run side by side, per employee.",
      features: [
        "Weekly, BiWeekly and Monthly cycles together",
        "First, Second and Extra shift segments",
        "Segment-level late detection",
        "Per-employee cycle assignment",
        "Shift-segment based pay calculation",
      ],
    },
    {
      id: "geo",
      code: "06",
      short: "Geo",
      name: "Geo attendance & on-duty",
      blurb:
        "For the people who are not at a device: live GPS, selfie-verified punches and an approval chain for field visits.",
      features: [
        "Live GPS tracking and geo-fencing",
        "Selfie verification on punch",
        "Simulated-location detection",
        "On-duty sessions with HOD then HR approval",
        "IN/OUT punch from the mobile app",
      ],
    },
    {
      id: "money",
      code: "07",
      short: "Advances",
      name: "Advances & settlement",
      blurb:
        "General advances and term loans, with EMI schedules that deduct themselves from payroll and close when they are done.",
      features: [
        "General advances and structured term loans",
        "EMI schedules tracked across months",
        "Automatic payroll deduction",
        "Repayment progress and archiving",
        "Full and final settlement",
      ],
    },
    {
      id: "reports",
      code: "08",
      short: "Reports",
      name: "MD portal & reports",
      blurb:
        "A read-only view for the people who only need the number: headcount, absenteeism, attrition and payroll cost, every morning.",
      features: [
        "Headline cards and department breakdowns",
        "Attendance, recruitment and activity pages",
        "Daily briefings and weekly workforce reports",
        "Department scorecards and gate discipline",
        "AI assistant with voice and text queries",
      ],
    },
  ],

  // Who gets to see what.
  roles: [
    { name: "Super Admin", detail: "Everything, plus database restore and user accounts." },
    { name: "HR Admin", detail: "Full modules, payroll generation and biometric configuration." },
    { name: "HR Staff", detail: "Per-module Full, View or Hidden permissions." },
    { name: "Department Approver", detail: "Mobile approvals for assigned departments only." },
    { name: "Employee", detail: "Self-service portal, own data only." },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // BLOG POSTS — placeholder copy. Replace the title/excerpt/body of each
  // entry with real articles, or empty the array and the Blogs page shows its
  // empty state. `slug` becomes the URL: /blogs/<slug>.
  // ─────────────────────────────────────────────────────────────────────────
  posts: [
    {
      slug: "attendance-is-the-payroll",
      title: "Attendance is the payroll",
      category: "Payroll",
      date: "2026-09-29",
      readMins: 5,
      excerpt:
        "If salary is typed in a second time at month end, it will disagree with the register. The fix is to stop typing it twice.",
      body: [
        "In most units payroll is assembled twice. Once as attendance, punch by punch, across the month. Then again at month end, when someone reads the register and types the numbers into a salary sheet.",
        "Every disagreement between a worker and the wage slip lives in that second pass. Not because anyone is careless, but because two records of the same month will always drift apart.",
        "Zyraa calculates salary from the attendance and the requests already in the system. Leave, permissions, late deductions and advance EMIs are already attached to the month, so payroll is a review step rather than a reconstruction.",
      ],
    },
    {
      slug: "why-requests-are-current-month-only",
      title: "Why requests are current-month only",
      category: "Attendance",
      date: "2026-08-21",
      readMins: 4,
      excerpt:
        "A leave request for a month that is already paid is not a request, it is a correction. Zyraa draws that line on purpose.",
      body: [
        "It looks like a restriction: employees can only raise leave and permission requests for the current month. It is the single rule that keeps the register trustworthy.",
        "Once a month is published and paid, a new backdated request does not adjust a balance, it reopens a settled payroll. Allow it freely and every month stays provisionally open.",
        "Genuine corrections still have a path. A missing-punch claim is reviewed and logged with a reason, which is a different thing from a request, and it leaves a trail you can show later.",
      ],
    },
    {
      slug: "production-payroll-is-not-staff-payroll",
      title: "Production payroll is not staff payroll",
      category: "Production",
      date: "2026-07-14",
      readMins: 6,
      excerpt:
        "One monthly cycle fits the office. The floor runs on weekly and bi-weekly money, in shift segments, often in the same unit.",
      body: [
        "Staff payroll is monthly, and the software world is built for it. A production floor is not: the same unit can pay some people weekly, some bi-weekly and some monthly, in the same period.",
        "Shift segments make it harder again. First shift, second shift and extra hours each carry their own rate and their own late detection, so a day is not a single attendance row.",
        "Zyraa runs the three cycles alongside each other and assigns a cycle per employee, with segment-level late detection. The office closes monthly and the floor closes weekly, out of one attendance record.",
      ],
    },
  ],
};
