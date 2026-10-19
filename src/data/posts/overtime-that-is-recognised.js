export default [
  {
    type: "p",
    text: "Shipment week in a garment unit has a particular sound: the office still lit at 9 PM, a merchandiser finishing the inspection paperwork for a buyer, the stores team receiving a late yarn delivery, someone in accounts chasing a document the forwarder needs by morning. Nobody asked them to stay in writing. Everybody knew they had to.",
  },
  {
    type: "p",
    text: "Then the next morning comes. They walk in at 9:35, and the machine marks them late. Under most attendance systems, that is the end of the story. Last night's three extra hours are invisible; this morning's twenty-five minutes are on the record. It is a small thing, and it is exactly the kind of small thing that makes good staff feel the system is not on their side.",
  },
  {
    type: "p",
    text: "Zyraa's compensation features exist to recognise extra work, for staff on a shift, in the ways a sensible manager already would: a later start the next day, a day off in lieu, extra pay, or a credit for working a Sunday. And all of it is detected from punches, not claimed on paper. (Production workers are handled differently: their extra hours are already paid as extra shifts on the production ladder.)",
  },
  {
    type: "h2",
    text: "Type 1: a later start the next morning",
  },
  {
    type: "p",
    text: "The first kind is automatic and never paid. When a staff member works past their shift end, Zyraa notices from their punches, checking in the background about every 15 minutes, and gives them extra minutes for the first punch of their next working day. On the default table:",
  },
  {
    type: "list",
    items: [
      "1 hour of extra work → 30 minutes' allowance",
      "1 hour 30 minutes → 30 minutes",
      "2 hours → 60 minutes",
      "2 hours 30 minutes → 60 minutes",
    ],
  },
  {
    type: "p",
    text: "A day earns the row with the most extra work it reaches, so 1 hour 45 minutes earns the 30-minute row. The allowance moves that one morning's late limit: shift start, plus the allowance, plus the shift's own grace. Take a 9:00 shift with 10 minutes' grace and a 30-minute allowance: the worker is not late until 9:40. Arrive at 9:35 and the day is marked **OT** for allowance used, not Late, and it is not cut by the quarter-shift rule either. Arrive on time and the allowance simply goes unused. Nobody claims it and HR assigns nothing. It skips Sundays, company holidays and a Saturday off, landing on the next real working day.",
  },
  {
    type: "p",
    text: "If the worker also has an approved Morning Late-In permission that day, the permission is used first. The same lateness is never excused twice.",
  },
  {
    type: "h2",
    text: "Type 2: a shift's worth, as a day off or as pay",
  },
  {
    type: "p",
    text: "Beyond 2 hours 30 minutes past shift end, the extra work is bigger than a later start can repay. Those days are listed for HR as **Waiting for HR**, with a suggested value based on when the last punch-out happened:",
  },
  {
    type: "list",
    items: [
      "Before 9:00 PM → 0.25 shift",
      "9:00 PM to midnight → 0.50",
      "Midnight to 2:00 AM → 0.75",
      "2:00 AM or later → 1.00",
    ],
  },
  {
    type: "p",
    text: "HR then decides how to give it. **Relaxation** grants a day off in lieu on a date in the same month: that day is topped up by the shifts and marked as a compensation day, so the worker is paid while resting. A day can never go above one shift in total. **Payment** adds the shifts × one day's pay to that month's payroll as overtime pay. Relaxation is on by default, Payment off, and each can be switched in Settings. A day that was authorised work rather than real overtime can be rejected. Every assignment is logged with who made it.",
  },
  {
    type: "p",
    text: "An illustrative case: a staff member on a 9:00–6:00 shift leaves at 9:40 PM after a shipment. That is more than two and a half hours past shift end, and the 9 PM–midnight row suggests 0.50 shift. HR assigns it as Relaxation on a quiet Friday later in the month; that Friday, a half day off is paid as a full day.",
  },
  {
    type: "h2",
    text: "Days the company bends the rules itself",
  },
  {
    type: "p",
    text: "Some mornings, being late is nobody's fault. Heavy rain floods the approach roads. A transport strike stops the buses. A festival week makes everyone's evening errands longer. Instead of a flood of permission requests, HR can announce a **late-in** (staff may arrive up to a set time) or an **early-out** (staff may leave from a set time) for a date, up to 180 days ahead, with a reason the staff see. It can cover everyone or be narrowed to a department or branch.",
  },
  {
    type: "p",
    text: "On that date only, arriving by the announced time is not late, and leaving after the announced time is not an early-out. It is a company announcement, not a leave: a day nobody attended is still absent. Days that used it are marked **LI** or **EO** on the attendance screens, so HR can see the announcement did its job.",
  },
  {
    type: "h2",
    text: "Sundays, holidays and birthdays",
  },
  {
    type: "p",
    text: "Staff who work a Sunday or a company holiday can be credited 0.25 to 1 shift. HR raises the claim for a date up to 45 days back, choosing from the people who actually punched that day, and the employee's department head must approve it. HR cannot approve it alone. An approval adds the shifts to the employee's compensation balance, which HR later redeems as a day off; the redeemed day is marked as compensation and the balance goes down.",
  },
  {
    type: "p",
    text: "Birthdays are simpler, and fully automatic. On a staff member's birthday, taken from the date of birth on their record, the day is paid leave: it counts as a full present day whether they come in, stay home, or leave early, and no late, early-out or half-day rule applies. A 29 February birthday is given on 28 February in other years. The year of birth is never shown.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "Overtime is detected from punches: up to 2 hours 30 minutes past shift end earns an automatic next-day late-in allowance; beyond that, HR assigns 0.25 to 1 shift as a day off or as pay. Company-wide late-in and early-out announcements, Sunday and holiday work credits approved by the department head, and paid birthday leave complete the set. Employees see all of it, and their compensation balance in shifts, on their own Compensation page; HR sees who benefited from each of seven compensation types by day, week or month.",
  },
  {
    type: "h2",
    text: "Rules that never re-judge a paid month",
  },
  {
    type: "p",
    text: "Generous rules are only trustworthy if they are stable. Every compensation feature applies from a date set in Settings. Days before that date are never changed, so a month that is already paid is not judged again, and payslips already generated are never rewritten. There is one master switch for all of it; switching it off pauses detection and assignment but deletes nothing, and every record stays readable.",
  },
  {
    type: "p",
    text: "That matters because the alternative is a system where changing a setting in October quietly changes what July should have paid. Nobody can run a factory on numbers that move after the money has gone out.",
  },
  {
    type: "p",
    text: "The staff who stay back on shipment night are usually the ones you can least afford to lose. Recognising that work, automatically and on the record, costs very little. Not recognising it costs a lot more.",
  },
];
