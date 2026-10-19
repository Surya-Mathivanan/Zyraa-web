export default [
  {
    type: "p",
    text: "Ask anyone who has run HR in a garment unit which week of the month they dread, and they will name the same one: the last few days of the month and the first few of the next. That is when a month's worth of small exceptions arrives at once. Leave slips for days three weeks old. A worker who says the supervisor allowed an early exit on the 9th. A supervisor who is now on leave himself. And payroll, waiting on all of it.",
  },
  {
    type: "p",
    text: "The usual response is to keep the door open as long as possible. Accept requests until payroll is run, then accept a few more as arrears next month. It feels kind. In practice it means nothing is ever final, the evidence gets weaker every day, and the people who pay for the delay are the ones who did everything on time: their salary waits on everyone else's paperwork.",
  },
  {
    type: "p",
    text: "Zyraa takes the opposite position. Employees can request dates in the current month, and on the 1st and 2nd of the next month they can still fix last month. From the 3rd, last month is closed to them. This article explains why that edge exists and what happens on the other side of it.",
  },
  {
    type: "h2",
    text: "The window, exactly",
  },
  {
    type: "list",
    items: [
      "Leave, Casual Leave, Permission and Missing Punch can be requested for any day in the **current month**.",
      "On the **1st and 2nd** of a month, the previous month is still open. From the **3rd**, it is closed.",
      "A multi-day leave must start and end inside one month. If it crosses the month end, split it.",
      "A Missing Punch can never be dated in the future.",
      "The date is the **India date on the server**, so changing the phone's clock does not reopen anything.",
      "HR is not limited by the window. Only employees are.",
    ],
  },
  {
    type: "p",
    text: "The employee sees the rule in plain words, not as a mysterious greyed-out calendar. Mid-month the app says “You can only request dates in October 2026.” On a grace day it says which dates are open and when the previous month closes: “September closes at the end of 2 October.” Tap a day that is already closed and the app says so, and tells the worker to ask HR.",
  },
  {
    type: "p",
    text: "The same rule, with the same test cases, is shared by the server, the HR portal, the employee web app and the mobile app. A date that is open on the phone is open on the server. There is no version of the rule that only one screen believes.",
  },
  {
    type: "h2",
    text: "Why a hard edge is the kinder rule",
  },
  {
    type: "p",
    text: "A request is only as good as someone's ability to check it. A department head can confirm that a tailor was at her machine yesterday. Asked about the 9th of last month, the honest answer is “I think so.” Every day of delay turns verification into goodwill, and goodwill is not evenly distributed on a factory floor.",
  },
  {
    type: "p",
    text: "A short window also changes behaviour. When people know the door closes on the 2nd, they raise the missing punch the same day. The guide we give coordinators boils it down to three words: do it today. Same day, or next day at the latest. The window is not the punishment; it is the reason the habit forms.",
  },
  {
    type: "figure",
    value: "2",
    label: "grace days at the start of each month to fix the month before",
  },
  {
    type: "h2",
    text: "What happens after the 2nd",
  },
  {
    type: "p",
    text: "Closed does not mean uncorrectable. It means the correction takes the longer road. After the window, HR raises an **Attendance correction** for the day in the HR portal, and the employee's department head must approve it. The pipeline runs HR → HOD, and it cannot be edited, because the person certifying the change has to be the one who knows what happened on the floor.",
  },
  {
    type: "p",
    text: "That route is deliberately slower. It needs HR's time and the HOD's confirmation, and it is visible in the Manual Attendance Overrides report with the before and after. That is not bureaucracy for its own sake; it is what keeps a late correction from becoming a quiet favour.",
  },
  {
    type: "h2",
    text: "A request waiting with an HOD can't be finished",
  },
  {
    type: "p",
    text: "The window only works if approvals keep up. Every request type in Zyraa has a pipeline of one or two steps. Each step is held by the Department Head, by HR, or, as a single step, by “HOD or HR, whoever acts first.” The last step is always mandatory. Out of the box, leave, permission, casual leave and outpass go to HOD or HR, whoever acts first; missing punch goes HOD → HR; on-duty goes to an optional HOD step and then HR.",
  },
  {
    type: "p",
    text: "Every request shows whose turn it is: “Waiting for HOD” or “Waiting for HR”, with a trail of each step, who decided and their comment. If HR changes a pipeline, nothing waiting is approved or rejected by the change; waiting requests simply continue from where they are. A department head cannot approve their own request, and employees with no department head go straight to HR, so nobody is stuck without an approver.",
  },
  {
    type: "p",
    text: "Department heads approve on the phone they already carry, in an Approvals tab that only they see, with a red count of what is pending. On a larger screen, the employee web app has the same approvals page. The expectation is simple: open it at the start and end of the day, and never leave a request past the next working day.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "The request window is enforced on the server on India time and explained in the employee's own app. After it closes, corrections go through an HR → HOD attendance correction that is logged with before-and-after values. Pending Approvals Ageing shows every open request, its age and who it waits on; Approver Workload & Turnaround shows, per HOD and HR approver, decisions taken, the approve–reject split and turnaround.",
  },
  {
    type: "h2",
    text: "A month-end that does not need heroics",
  },
  {
    type: "steps",
    items: [
      {
        title: "Three to five working days before month end",
        text: "Announce to everyone: raise all pending leave, permission and missing punch requests now. Clear the pending list with each HOD.",
      },
      {
        title: "Last working day",
        text: "Target zero pending approvals. Check that biometric sync is complete up to the last day.",
      },
      {
        title: "The 1st and 2nd",
        text: "Last chance for employees to fix last month. Chase every unexplained absence and missing punch.",
      },
      {
        title: "The 3rd",
        text: "Last month is closed to employees. HR raises any remaining fixes as attendance corrections for HOD approval, then generates payroll.",
      },
    ],
  },
  {
    type: "p",
    text: "None of this requires a new person in the HR office. It requires the rule, the visibility of who is holding what, and a calendar everyone knows in advance.",
  },
  {
    type: "p",
    text: "The window closes on the 2nd so that payroll can open on the 3rd. When it does, the people who did their part on time are not kept waiting for the people who did not.",
  },
];
