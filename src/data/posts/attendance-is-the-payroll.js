export default [
  {
    type: "p",
    text: "Walk into the time office of a knitwear unit on the 30th and you will see payroll being done twice. The first pass happened all month, on the biometric machine at the gate. The second pass happens now: a clerk with the device export in one window, a leave-slip file on the desk, the supervisor's notebook, and a phone full of messages that start with “Sir, I came at 9:20, the machine didn't take my face.”",
  },
  {
    type: "p",
    text: "That second pass is where most garment payrolls actually get decided. Every exception is judged again, from memory, under deadline, by someone who was not on the floor that day. Nothing is written down about *why* a day was cut, so when a worker disputes their slip, the only answer is “that's what the register said.”",
  },
  {
    type: "p",
    text: "Zyraa is built on one rule that removes the second pass: **salary is calculated from the attendance and the requests in the system. If it isn't in the system, it didn't happen for payroll.** It sounds strict. On the floor it turns out to be the fairest rule you can have, because it is the same for everyone and it moves every argument back to the day it happened.",
  },
  {
    type: "h2",
    text: "Why the month-end second pass fails",
  },
  {
    type: "p",
    text: "A face or fingerprint terminal does not know what attendance is. It knows that a particular face showed up at 09:23, 13:01, 13:46 and 18:04. Whether that was a full day, a late day, a day protected by a permission, or a half day is a *meaning* applied afterwards. In most units that meaning is applied in Excel, by hand, at the end of the month.",
  },
  {
    type: "p",
    text: "That creates three problems. First, the rules drift: one clerk cuts a half day at 9:30, another at 10:00, and nobody can tell which is policy. Second, the evidence is gone: three weeks later nobody remembers whether the supervisor said yes to that early exit. Third, the people who do know the truth, the department heads, are consulted last, when payroll is already late.",
  },
  {
    type: "p",
    text: "Paper registers and spreadsheets are not the villain here. The villain is the gap between when something happens and when it is judged. The longer the gap, the more payroll becomes negotiation.",
  },
  {
    type: "h2",
    text: "Punches are raw material, not attendance",
  },
  {
    type: "p",
    text: "In Zyraa, raw punches and day verdicts are separate things. A staff member normally punches four times: In, Lunch Out, Lunch In and Out. Two taps within five minutes count as one punch, so a nervous double tap at the gate does not accidentally become the lunch-out. Each employee is judged against *their own* shift, not a factory-wide clock time.",
  },
  {
    type: "p",
    text: "From those punches, the shift, and every approved request for that date (leave, permission, missing punch, on-duty), the system computes one day record. That day record is what payroll reads. Nobody edits payroll to fix attendance; you fix the day, and payroll follows.",
  },
  {
    type: "p",
    text: "There is one honest edge to this. An employee with no shift assigned is never marked late and gets no arrival timeline, because there is nothing to judge them against. Zyraa does not guess. It flags them as a data gap, in reports like Shift Assignment Gaps, so HR assigns a shift before it matters.",
  },
  {
    type: "h2",
    text: "A reason sentence for every day",
  },
  {
    type: "p",
    text: "Every day record stores a plain-language reason. Not a code, a sentence. For a staff member on a 9:00 shift who first punched at 11:00 without a permission, the HR portal shows something like:",
  },
  {
    type: "quote",
    text: "Quarter-shift arrival: first punch 11:00 is after the Late window ended (10:10) … 0.25 shift deducted.",
    cite: "A day's reason, as written in the HR portal",
  },
  {
    type: "p",
    text: "The employee sees the same story on their own calendar in the mobile or web app: the day's status, the first and last punch, and notes such as “Morning Late-In permission applied: your shift start moved 60 minutes later today.” When the worker and HR look at the same day, they read the same sentence. Most disputes end there, because the question shifts from “who decided this?” to “is this fact wrong?”, and a wrong fact has a clear fix.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "Attendance is computed from punches, the employee's own shift and approved requests into one day record per person per day. Payroll reads only those records. The payroll page then lists every detection of the month as an Issue (absent days, late arrivals, half days, quarter-day cuts, missing punches, no shift assigned, excess permissions, missing bank or PF details) with the date it was detected, what it cost in days and rupees, and a link to the rule behind it.",
  },
  {
    type: "h2",
    text: "Moving the argument to the day it happened",
  },
  {
    type: "p",
    text: "A rule like “if it isn't in the system, it didn't happen” only works if the system makes it easy to get things in on time. So the requests that protect a day live where the worker already is: on their phone and in a browser. A forgotten lunch punch becomes a Missing Punch request (date, which punch, reason) that goes to the department head and then HR. A late arrival becomes a Morning Late-In permission. A field visit becomes an On-Duty session.",
  },
  {
    type: "p",
    text: "Every request shows whose turn it is, “Waiting for HOD” or “Waiting for HR”, and every decision is logged with who made it, when, and the comment. That log protects the company and the employee equally. If a supervisor approved an early exit, there is a record. If they rejected it, the reason is there too, and the employee received it.",
  },
  {
    type: "p",
    text: "Requests are only open for the current month, plus the 1st and 2nd of the next. That is deliberate, and it gets its own article. The short version: a day is easiest to verify while people still remember it.",
  },
  {
    type: "h2",
    text: "What the month-end close looks like instead",
  },
  {
    type: "steps",
    items: [
      {
        title: "Days are judged daily",
        text: "Punches arrive from the devices, each day gets its verdict and reason, and employees can see their calendar the same day.",
      },
      {
        title: "Exceptions are chased while they are fresh",
        text: "Reports such as Daily Absentee List, Late Coming Detail and Punch Exceptions give the coordinator a call list every morning and evening.",
      },
      {
        title: "Approvals are cleared before the window closes",
        text: "Pending Approvals Ageing shows every open request, how old it is and who it is waiting on.",
      },
      {
        title: "Payroll is generated, then reviewed",
        text: "Generating staff payroll reads the attendance, approved leave and permissions, prices late arrivals and half days, and recovers due advances. HR reviews the Records, Issues, Skipped and Rules views. If something is wrong, you fix the day and regenerate; nothing is patched inside payroll.",
      },
      {
        title: "Marked paid, with a trail behind it",
        text: "Each payslip moves from Pending to Paid, and can be traced back to the days, the reasons and the approvals that produced it. Regenerating a month asks first, and puts a Paid slip back to Pending.",
      },
    ],
  },
  {
    type: "p",
    text: "The difference is not speed for its own sake. It is that payroll stops being a judgement and becomes a confirmation. The judging already happened, one day at a time, by the people who were there.",
  },
  {
    type: "h2",
    text: "The part that is about trust",
  },
  {
    type: "p",
    text: "Factory workers are not naive about pay. When deductions arrive with no explanation, they assume the worst, and in a cluster where a skilled operator can find another unit down the road, that assumption costs you people. A slip that can be explained day by day, in the worker's own app, is a slip that gets argued about less.",
  },
  {
    type: "p",
    text: "So yes, “if it isn't in the system, it didn't happen” is a hard line. But it cuts both ways. If it *is* in the system, approved and reasoned, it happened, and nobody at month end gets to quietly decide otherwise.",
  },
];
