export default [
  {
    type: "p",
    text: "Every garment unit has a second attendance system that HR rarely sees. It lives at the gate, in the security guard's notebook: who went out at 11:05, who came back at 11:50, the courier at 2:15, the buyer's QA visitor at 3:00. It is often carefully kept. It is almost never connected to anything.",
  },
  {
    type: "p",
    text: "That gap matters more than it looks. The biometric terminal says a worker was present from 9:02 to 6:04. The gate book says they were outside for an hour and forty minutes in the middle. Payroll only ever sees the first record. Meanwhile a supervisor who did approve a worker's trip to the hospital has no way to show it, and a worker who left without asking is indistinguishable from one who did.",
  },
  {
    type: "p",
    text: "In Zyraa, the gate is part of HR. Time away during the shift is requested, approved, scanned out and scanned back in, and it lands in the same records as everything else. There are three different kinds of movement at a gate, and each gets a different amount of ceremony.",
  },
  {
    type: "h2",
    text: "Outpass: ask first, then scan out and back",
  },
  {
    type: "p",
    text: "An outpass is for leaving the premises during working time: an official errand to a mill, a personal emergency, or an approved early departure. The worker raises it in the app before leaving, with the destination, the expected return time and the reason. By default it goes to the department head or HR, whoever acts first.",
  },
  {
    type: "p",
    text: "Once approved, the app shows a QR pass, valid for 60 minutes from approval. Security scans it at the gate on the way out. On the way back, the worker generates a return QR and security scans that too. The pass now has a gate exit time, a gate return time and the time spent outside, and every decision on it, who approved and when, is in its trail.",
  },
  {
    type: "p",
    text: "Timing is the whole point, so the guidance to department heads is blunt: decide outpass requests within minutes, before the planned time. An outpass approved after the worker already left is useless.",
  },
  {
    type: "list",
    items: [
      "**Late returns** - workers who came back after the return time they gave, and by how much.",
      "**Not returned** - passes scanned out with no return scan: who is outside now, and whose return was never recorded.",
      "**Approved but unused** - passes whose 60-minute exit window lapsed without a gate scan.",
      "**Pending requests** - outpasses still waiting for a decision, and how long each has waited.",
    ],
  },
  {
    type: "h2",
    text: "Tea breaks: no request, just two scans",
  },
  {
    type: "p",
    text: "Tea breaks are a different animal. They happen several times a day across the whole floor, and putting each one through an approval would be absurd. So a tea break needs no request and no approval. Each employee's Digital ID card in the mobile app carries a permanent QR. Security scans it on the way out for tea and again on the way back. HR sets the allowed minutes.",
  },
  {
    type: "p",
    text: "Say the allowance is 15 minutes. A worker scans out at 10:31 and back in at 10:52. That is 21 minutes, six over, and the break is recorded as Overtime. If there is no return scan within 60 minutes, the break is marked Not Returned. On the worker's own phone the status reads On Time, Overtime, Still Out or Not Returned, and a running timer turns red once they are past the allowed time.",
  },
  {
    type: "figure",
    value: "60",
    label:
      "minutes without a return scan before a tea break is marked not returned",
  },
  {
    type: "p",
    text: "There is one rule everyone has to learn: always scan both ways. The gate scan toggles between out and in. If a worker forgets the return scan, their next scan is read as a return and produces a false, very long break. The fix is a habit, not a feature, and we say so plainly in the guide we give every unit.",
  },
  {
    type: "h2",
    text: "Visitors: who came, and who they met",
  },
  {
    type: "p",
    text: "The third kind of movement is people coming in: buyers' QA staff, auditors, suppliers, job-work contractors. Reception records each visitor's check-in, the employee they are meeting and the purpose, and the host can be notified by email and WhatsApp. Identity documents are masked in reports to the last four digits.",
  },
  {
    type: "p",
    text: "We are honest about one limit. Visitors are checked in, not checked out, so Zyraa does not claim to know who is inside the building right now or how long each visit lasted. It records who came, when, and who they met, which is what most units need for audits and for knowing which teams spend their day receiving visitors.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "Outpasses are requested in the app, approved through their own pipeline, and turned into a short, signed QR that security scans out and back. Tea breaks use the employee's permanent Digital ID QR with no approval, measured against the allowed minutes HR sets. Gate scanners and reception desks have their own logins, and the Gate Scan Audit Log records every exit and return scan, including denied and forged attempts.",
  },
  {
    type: "h2",
    text: "Why time away belongs in the register",
  },
  {
    type: "p",
    text: "Gate data is not mainly about catching people. Most of it is boring, and that is good: it shows that most breaks are on time and most passes come back. Its value is in the patterns. Employee Time Away Summary puts outpass minutes, tea breaks and visitors hosted side by side for each person. Tea Break Time-of-Day Distribution shows when breaks start and how long they last, which is genuinely useful for planning the canteen and tea station. Tea Break Exceptions lists only the breaks that ran over or never closed, worst first.",
  },
  {
    type: "p",
    text: "For leadership, the Gate & Discipline Review rolls visitors, outpasses, hours lost and tea-break overruns up by department, with the repeat cases. When a department's output drops, it is useful to know whether its people are actually at their machines, and that question used to be answered by walking the floor.",
  },
  {
    type: "p",
    text: "And for the worker, a scanned outpass is protection. If you left with permission and came back on time, the record says so, with the approver's name on it. The gate book could never do that.",
  },
];
