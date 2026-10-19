export default [
  {
    type: "p",
    text: "Most factories have a cliff in their late rule. Arrive after a certain time, often 9:30 or 10:00, and the day is cut to a half. It is easy to explain and easy to apply in a spreadsheet. It is also one of the quietest sources of resentment on a shop floor.",
  },
  {
    type: "p",
    text: "Think about who falls off that cliff. The accounts assistant whose bus broke down and who walked in at 10:20, then worked until 6:00. The store-keeper who took a child to the clinic and arrived at 10:40. Both did most of a day's work. Both lose half a day's pay, exactly as if they had come in at 2:30. And both learn the same lesson: once you are past the cliff, there is little reason to come in at all.",
  },
  {
    type: "p",
    text: "Zyraa replaces the cliff with a staircase. For staff on a shift, the first punch of the morning falls into one of five zones, and the deduction grows with the lateness instead of jumping. The step in the middle, a deduction of a quarter shift instead of a half day, is the one people notice.",
  },
  {
    type: "figure",
    value: "0.25",
    label:
      "of a shift deducted for a late-morning arrival, instead of losing a half day",
  },
  {
    type: "h2",
    text: "The arrival timeline, zone by zone",
  },
  {
    type: "p",
    text: "Take a staff member on a 9:00 shift with 10 minutes of grace, using Zyraa's default settings. Their first punch of the morning decides which zone the day falls in:",
  },
  {
    type: "list",
    items: [
      "**Up to 09:10 - On time.** The day earns 1.00.",
      "**09:11 to 10:10 - Late window (60 minutes).** Still a full day, 1.00, but one Late is added to the month's late pool.",
      "**10:11 to 11:10 - Permission window (60 minutes).** With an approved Morning Late-In permission, it is a full day with no late. Without one, a quarter shift is deducted and the day earns 0.75.",
      "**11:11 to 11:30 - Extra minutes (20 minutes).** The day earns 0.75. A permission does not cover these minutes.",
      "**After 11:30 - First half missed.** The day is absent until there is a punch at or after the second-half start, 2:30 PM by default; then it is a Half Day, 0.50.",
    ],
  },
  {
    type: "p",
    text: "All of those numbers are company settings: the 60-minute late window, the 60-minute permission window, the 20 extra minutes, the 0.25 deduction (set it to 0 to switch the quarter shift off entirely) and the 2:30 PM second-half start. The defaults are a starting point that matched how real units already think about mornings.",
  },
  {
    type: "h2",
    text: "Four mornings, worked through",
  },
  {
    type: "p",
    text: "These are illustrative, but each one is exactly what the rule produces.",
  },
  {
    type: "steps",
    items: [
      {
        title: "First punch 09:42",
        text: "Late window. The day is a full 1.00 and one mark goes into the monthly late pool. If it is one of the first three marks of the month, it costs nothing.",
      },
      {
        title: "First punch 10:35, permission approved",
        text: "Permission window, and the employee raised a Morning Late-In permission that was approved within the monthly cap. Full day, no late mark. The approval is what protects the day.",
      },
      {
        title: "First punch 10:35, no permission",
        text: "Same arrival, no approval. The day earns 0.75. The employee still came to work, so the cut is a quarter, not a half.",
      },
      {
        title: "First punch 11:50, last punch 18:05",
        text: "The first half was missed. Because there is a punch after 2:30 PM, the day counts as a Half Day, 0.50. Without that afternoon punch, it would be absent.",
      },
    ],
  },
  {
    type: "h2",
    text: "Why a quarter is fairer than a half",
  },
  {
    type: "p",
    text: "The guide we wrote for HR teams puts it plainly: the employee came to work, so only a quarter of a shift is deducted, instead of losing a whole half day. The penalty is proportionate to the lost time. Someone who arrives at 10:35 has missed roughly an hour and a half of a nine-hour shift; a quarter of a day is a firm consequence, but it is not a punishment for showing up.",
  },
  {
    type: "p",
    text: "Two design choices keep the rule from becoming a double penalty. First, the quarter-shift deduction *replaces* the Late mark for that day. It is never both. Second, the late window and the permission window are separate on purpose. Arriving a little late costs a mark in a pool that has a free allowance. Arriving later costs a fixed quarter unless you asked in advance. That gives people a clear reason to raise a permission request instead of hoping nobody notices.",
  },
  {
    type: "p",
    text: "The extra-minutes zone exists because a permission is exactly sixty minutes. If a permission moves the start of the day by an hour, someone who arrives an hour and fifteen minutes late has gone past it. Rather than tip straight into a half day, they get the same 0.75 as an unexcused permission-window arrival, for twenty more minutes. Only after that does the first half count as missed.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "Each staff member's first punch is placed on their own shift's arrival timeline: on time, late window, permission window, extra minutes, or first half missed. The zone, the value the day earns and the reason are stored on the day record, so payroll, HR and the employee all see the same sentence. Every threshold, including the 0.25 deduction and the second-half start, is a setting under Settings → Attendance.",
  },
  {
    type: "h2",
    text: "Written down where the worker can read it",
  },
  {
    type: "p",
    text: "A fair rule that nobody understands still feels unfair. So the timeline is not hidden in the HR portal. The employee's My Shift screen shows their shift, grace minutes and the half-day rule in words, along the lines of “Late up to 60 min; excused up to 60 more with an approved Late-In permission; after that the day counts 0.75 shift.” Their attendance calendar marks late days with a dot and explains each day when tapped.",
  },
  {
    type: "p",
    text: "On the HR side, the day's reason names the zone and the times. When someone asks why they were marked half day although they came at 11:00, the answer is not an opinion. It is the timeline, and the reason sentence on that date tells you which zone they fell into.",
  },
  {
    type: "h2",
    text: "What the rule does not try to do",
  },
  {
    type: "p",
    text: "The timeline judges staff on a shift with a defined start. Production workers on the floor are paid by shifts earned on a separate ladder, where lateness simply costs the minutes missed. And an employee without a shift assigned is never marked late at all; Zyraa flags them for HR rather than inventing a start time.",
  },
  {
    type: "p",
    text: "Units that want something simpler can use Simple mode, which decides the halves of the day from a single cut-off time. But for staff whose mornings vary for real reasons, the staircase does something a cliff never can: it keeps people coming in.",
  },
];
