export default [
  {
    type: "p",
    text: "In an Indian factory, “permission” is a word everyone understands. An hour to go to the bank before it closes. An hour in the morning for a child's school meeting. Stepping out at noon to collect a parcel from the courier office. Nobody calls it leave, and nobody wants it to cost a day.",
  },
  {
    type: "p",
    text: "Most units handle it with a word to the supervisor or a slip in a book. That works until you ask two questions: how many has this person taken this month, and does the supervisor in cutting say yes as easily as the one in finishing? Without a count, permission is either unlimited or arbitrary, and workers notice which.",
  },
  {
    type: "p",
    text: "Zyraa turns permission into a small, counted, visible allowance, and puts it in the same monthly pool as the other small lapses of a working day: late arrivals and early departures. The point is not to be stricter. It is to be the same for everyone, and to show each person exactly where they stand before it costs them anything.",
  },
  {
    type: "h2",
    text: "Three kinds of permission, one hour each",
  },
  {
    type: "list",
    items: [
      "**Morning Late-In** - arriving up to one hour after shift start. An allowed one moves that day's shift start 60 minutes later.",
      "**Evening Early-Out** - leaving up to one hour before shift end. An allowed one moves the shift end 60 minutes earlier.",
      "**Middle One-Hour** - stepping out for an hour during the shift. It never moves the start or the end.",
    ],
  },
  {
    type: "p",
    text: "Each is a fixed sixty minutes. The worker picks the type, the date and the time, writes a short reason, and the request goes through the permission pipeline, by default to the department head or HR, whoever acts first. The same day and type cannot be requested twice. Permissions are for staff on a shift; production workers are paid by the shifts they earn, and their lateness is handled per pay period instead.",
  },
  {
    type: "h2",
    text: "The monthly cap, and what happens past it",
  },
  {
    type: "p",
    text: "By default, the first **three** approved permissions in a month, counting all three types together, are **Allowed**. An Allowed permission protects the day: a Morning Late-In covers an arrival inside the permission window, so the day stays full with no late mark.",
  },
  {
    type: "p",
    text: "A fourth permission can still be approved. A real emergency is still a real emergency, and the department head should be able to say yes. But it becomes **Overdue / Excess**: it excuses nothing, and it adds one mark to the late pool. A rejected permission is **Not Allowed**. The worker's app shows the count as a progress bar, “Used 2 of 3”, and once the cap is reached it says so before they apply: further approved permissions this month will be Overdue / Excess.",
  },
  {
    type: "figure",
    value: "3",
    label: "allowed permissions a month by default, all three types together",
  },
  {
    type: "h2",
    text: "One pool for every small lapse",
  },
  {
    type: "p",
    text: "Late-window arrivals, early-outs and excess permissions all land in one monthly **late pool**. Morning late-in detection is on by default; early-out detection is off by default and HR can switch it on. The first three marks in the pool each month are free. After that, the deduction slabs in Settings → Late Detection decide what billable marks cost, in shifts of salary. On the default slabs, every three billable marks cost a quarter shift, capped at 2.5 shifts in a month. Unapproved absence is counted separately, in its own without-permission pool with its own settings.",
  },
  {
    type: "p",
    text: "Here is an illustrative month for a staff member on a 9:00 shift, with early-out detection switched on:",
  },
  {
    type: "steps",
    items: [
      {
        title: "Five late-window arrivals",
        text: "Each is still a full day, and each adds one mark. Pool: 5.",
      },
      {
        title: "Two early-outs without permission",
        text: "Pool: 7.",
      },
      {
        title: "Five approved permissions",
        text: "The first three are Allowed and protect their days. The fourth and fifth are Overdue / Excess and add one mark each. Pool: 9.",
      },
      {
        title: "The month's bill",
        text: "Three marks are free; six are billable. On the default slabs, six billable marks cost 0.50 shift: half a day's pay.",
      },
    ],
  },
  {
    type: "p",
    text: "The design choice that matters is the combined pool. A worker who is occasionally late, occasionally leaves early, and occasionally needs an extra hour is treated the same as one who is late three times. Nobody has to argue about which bucket an incident belongs in. And because the first three are free, an ordinary month with a couple of bad mornings costs nothing at all.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "Permission requests are counted against a monthly cap (default 3), and their status (Allowed, Overdue / Excess, Not Allowed) decides whether they protect the day. Late-ins, early-outs and excess permissions share one monthly pool with a free allowance (default 3) and configurable deduction slabs. Employees see the same counts HR sees, and the Late-Penalty Breakdown, Permission Counts and Excess Permission Salary Impact reports show the shifts and rupees behind every deduction.",
  },
  {
    type: "h2",
    text: "Transparency before the slip, not after",
  },
  {
    type: "p",
    text: "The worst way to learn about a late deduction is on the payslip. So the employee's Permission and My Shift screens carry a Lateness & Deductions card: late-ins, early-outs, excess permissions, free allowance used out of three, billable marks, shift deductions and the salary impact in rupees. Any number above zero turns red. It updates as the month goes, so the third late arrival is a warning the worker can see, not a surprise.",
  },
  {
    type: "p",
    text: "Each day on the attendance calendar explains itself too. Tap a late day and it says whether a permission covered it: “Morning Late-In permission applied: your shift start moved 60 minutes later today.” Or, if the permission was past the cap: it did not protect today and counts toward late deductions. A worker who disagrees can point at a specific day, not a total.",
  },
  {
    type: "h2",
    text: "What it asks of department heads",
  },
  {
    type: "p",
    text: "A counted allowance only stays fair if approvals are honest and consistent. When a head opens a permission request, the app reminds them that only the first three approved in a month are Allowed, and that approving one beyond that makes it Overdue / Excess. Approve the genuine ones, reject the false ones with a reason, and apply the same standard to everyone in the team.",
  },
  {
    type: "p",
    text: "For coordinators, two reports make the weekly check easy: Permission Counts flags who has reached the cap, and Late Coming Summary shows who has crossed the free allowance. A quiet word in the second week is worth more than a deduction in the fourth.",
  },
  {
    type: "p",
    text: "An hour off should never feel like a favour granted by mood. Counted, capped and visible, it becomes what it was always meant to be: a small, fair allowance that everyone can see.",
  },
];
