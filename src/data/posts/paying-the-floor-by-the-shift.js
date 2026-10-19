export default [
  {
    type: "p",
    text: "On a knitwear floor, nobody talks about pay in hours. They talk in shifts. A full day is one shift. Staying back for a shipment is half a shift more. Working through the night to finish an order can make a day worth two or three. The rate per shift is the worker's number; the number of shifts is the factory's.",
  },
  {
    type: "p",
    text: "The rules that turn punches into shifts usually live in two places: a table pinned up near the time office, and the head of whoever has run payroll for the longest. Leave at 5:45, one shift. Leave at 8:00, one and a half. Tea at 10:30, lunch at 12:45. Every unit's table is slightly different, and every one of them is a careful piece of local knowledge.",
  },
  {
    type: "p",
    text: "Spreadsheets struggle with this. A worker who leaves at 7:00 PM is not at either line of the table. Breaks have to be subtracted. Night workers start on one date and finish on another. And some of your floor is paid weekly while the rest is paid every two weeks. Zyraa's production pay was built to take a factory's own table and apply it to every punch, exactly the same way, every day.",
  },
  {
    type: "h2",
    text: "A ladder, not a timesheet",
  },
  {
    type: "p",
    text: "Production pay in Zyraa is simple to state: **shifts earned × the worker's own salary per shift.** The interesting part is how shifts are earned. Each shift group has a short ladder of rows, each saying “a worker who leaves at this time earned this many shifts.” The default Day ladder starts at 8:30 AM:",
  },
  {
    type: "list",
    items: [
      "10:30 AM → 0.25",
      "12:45 PM → 0.50",
      "3:30 PM → 0.75",
      "**5:45 PM → 1.00** (one full shift)",
      "8:00 PM → 1.50",
      "10:30 PM → 2.00",
      "12:30 AM, next day → 2.50",
      "5:30 AM, next day → 3.00",
    ],
  },
  {
    type: "p",
    text: "Leave between two rows and you earn a share of the difference, worked out by the minute. Leave after the last row and you earn the last row and no more. Breaks are never paid and need no punch: morning tea 10:30–10:45, lunch 12:45–1:30, afternoon tea 3:30–3:45, evening tea 5:45–6:00 and night dinner 8:00–9:00 PM. The minutes inside a break earn nothing and cost nothing.",
  },
  {
    type: "figure",
    value: "3.00",
    label: "shifts is the most one day can earn on the default table",
  },
  {
    type: "h2",
    text: "Worked examples from the default table",
  },
  {
    type: "steps",
    items: [
      {
        title: "8:30 AM in, lunch out and back, 8:00 PM out",
        text: "Earns 1.50. Lunch is unpaid and needs no special handling.",
      },
      {
        title: "Same day, leaving at 7:00 PM",
        text: "Earns 1.25. The stretch from 5:45 (1.00) to 8:00 (1.50) contains the 15-minute evening tea, so the paid part runs 6:00 to 8:00. Leaving at 7:00 is halfway through it.",
      },
      {
        title: "A full night, 9:00 PM to 5:30 AM",
        text: "Earns 1.50 on the Night ladder.",
      },
      {
        title: "A day from 8:30 AM to 8:00 PM, then a full night",
        text: "Punches 8:30 AM, 12:45 PM, 1:30 PM, 8:00 PM, 9:00 PM and 5:30 AM earn 3.00, the cap.",
      },
    ],
  },
  {
    type: "p",
    text: "The edges are handled the way a fair time-keeper would handle them. There is a 5-minute grace by default (adjustable from 0 to 30). A first punch at 8:35 is on time; at 8:36 the worker is Late and loses the shifts for the minutes missed, at that stretch's rate. Leaving less than five minutes before a row counts as the row, so 5:42 PM earns what 5:45 PM earns. Leaving at 5:40, a full five minutes early, is worked out by the minute.",
  },
  {
    type: "p",
    text: "Messy punch patterns get clear rules too. A worker who goes in and out several times is paid for each in-out pair, never for the gaps between. If the punch count is odd, the last one is ignored. A single punch alone earns zero: the day shows as Half Shift, present but unpaid, which is a flag for someone to look at rather than a silent loss. Any day under 1.00 is labelled Half Shift; at or above, Present.",
  },
  {
    type: "h2",
    text: "Day, Night and Sunday groups",
  },
  {
    type: "p",
    text: "The first punch of the day picks the group. On the defaults, a Monday-to-Saturday first punch between 4:00 AM and 4:59 PM is a Day; a first punch between 5:00 PM and 11:59 PM is a Night, with its own ladder (midnight → 0.50, 5:30 AM → 1.50); a Sunday has its own single row (5:00 PM → 1.00). A first punch that fits no window goes to the group with the nearest start, so a 2:00 AM arrival is treated as Night.",
  },
  {
    type: "p",
    text: "Night work is where spreadsheets usually break, because the shift crosses midnight. In Zyraa, a 5:30 AM closing punch belongs to the evening the shift began, within a configurable night session length. And a forgotten out-punch is never closed by the next day's arrival, so one missed tap cannot quietly turn into a 24-hour shift.",
  },
  {
    type: "h2",
    text: "Weekly, BiWeekly and Monthly, side by side",
  },
  {
    type: "p",
    text: "Production pay rarely follows the calendar month. Some workers want cash every week; others are on a fortnightly cycle. Zyraa runs three cycles at once: **Weekly** (7 days), **BiWeekly** (14 days) and **Monthly** (28 days, four weeks). The week can start on any weekday. Each worker is assigned to one cycle on the Production Employees page, and each cycle has its own payroll page.",
  },
  {
    type: "p",
    text: "Generating a period is safe to repeat. Workers who already have payroll for the period are left alone, a paid payslip is never recomputed, and a period that overlaps days already paid for a worker is refused for that worker. Anyone without a salary per shift is listed under Skipped with the reason, instead of being paid zero.",
  },
  {
    type: "p",
    text: "Lateness on the floor is counted per pay period, not per month, and there is no permission pool for production. Each cycle has its own free late days and its own deduction slabs, measured in shifts and priced at the worker's own rate. For statutory purposes, a period's pay is scaled to an estimated month (× 4 on Weekly, × 2 on BiWeekly) so PF and ESI bands apply consistently whichever cycle someone is on.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "Settings → Production Shifts holds the factory's own ladders, unpaid breaks, grace, rounding and night session length in one form with one Save button. A “Try a day” simulator lets you type made-up punches and see the group, the shifts earned and the rule applied, without saving anything. Production payroll then multiplies each day's shifts by that worker's own rate, on whichever of the three cycles they are assigned to.",
  },
  {
    type: "h2",
    text: "Digitising a paper rule without changing it",
  },
  {
    type: "p",
    text: "The goal was never to impose a new pay policy. It was to take the table a unit already trusts and make the computer apply it without tiredness or favour. That is why the defaults are a real factory's timings and every row is editable, and why “Try a day” exists: the person who has done payroll by hand for years can test their own tricky cases and see the system agree with them before anyone is paid by it.",
  },
  {
    type: "p",
    text: "Two settings protect workers from rounding games. Rounding can step by 0.01, 0.05 or 0.25, and “down to the step below” always rounds down, so nobody is paid for time not completed, and nobody loses time to a generous-then-stingy clerk either. And pay always uses each worker's own rate, so changing the suggested rate for new joiners never changes anyone's existing pay.",
  },
  {
    type: "p",
    text: "Finally, rules are date-effective. “Production rules apply from” sets the first day the ladder judges; days before it keep their old calculation. A payslip already generated is never rewritten. If you change the table in June, May's paid weeks stay exactly as they were paid.",
  },
  {
    type: "p",
    text: "Paying by the shift is how the floor already thinks. The job of the software is just to count the way the floor counts, every time.",
  },
];
