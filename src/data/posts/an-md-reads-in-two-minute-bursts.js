export default [
  {
    type: "p",
    text: "The managing director of a garment unit does not have an afternoon to read HR reports. Their day is a buyer call, a sample review, a bank meeting, a walk through the floor, a supplier who is late, another buyer call. Between those, there are a few minutes with a phone or a laptop. When I designed the leadership side of Zyraa, I wrote one sentence at the top of the spec and kept coming back to it: **an MD reads in two-minute bursts.**",
  },
  {
    type: "p",
    text: "What usually arrives in those two minutes is a spreadsheet. Forty tabs, every employee, every day. The answer to “are we OK?” is in there somewhere, but finding it is HR's job, so the MD asks HR, and a simple question like “why is payroll up this month?” takes a day to answer, by someone who had other things to do.",
  },
  {
    type: "p",
    text: "Zyraa's MD portal is a separate front door for one person, the managing director, built around what they actually need: exceptions first, trends second, detail on demand. Everything is compared with something, and every number can be asked *why*.",
  },
  {
    type: "h2",
    text: "Exceptions first",
  },
  {
    type: "p",
    text: "Every page opens with headline cards. Each shows a number, a change chip coloured by whether the change is good or bad news, and a small sparkline. Below them sits **Needs your attention**: at most five automatically detected exceptions, most severe first, each tagged critical, warning, info or good, each written as a plain sentence with the number in it and a pointer to where to look.",
  },
  {
    type: "p",
    text: "The dashboard pulls the top items from every area: a department whose absenteeism has jumped above its own baseline, chronic absentees and long unexplained absences, outpass approvals that have waited too long, early attrition among new joiners, payroll that is running late against the pay day HR has set. Then trends, not snapshots: department against department, unit against unit, this period against the last. And when something needs a closer look, a drill-down opens a short ranked table, never a wall of rows.",
  },
  {
    type: "p",
    text: "Every figure has a **How is this calculated?** link that shows the dataset, the definition, the formula, how many rows went into it, and any caveat. A number the MD cannot interrogate is a number they will eventually stop trusting.",
  },
  {
    type: "h2",
    text: "The payroll cost bridge",
  },
  {
    type: "p",
    text: "The single most common question from the top of a factory is some version of “why did this month cost more?” Payroll Analysis answers it with a month-on-month cost bridge that splits the change into its causes: **headcount, rate, overtime, loss of pay and bonus.** Ten more people on the rolls looks very different from the same people working more overtime, and both look different from a bonus month.",
  },
  {
    type: "p",
    text: "Two rules keep those numbers honest. Payroll money is always taken from the salary slips, the record of what was actually paid, never from an intermediate calculation. And overtime money is never estimated as hours × a rate; it is what the slips actually paid for overtime.",
  },
  {
    type: "h2",
    text: "140+ reports, and seven that fit on one page",
  },
  {
    type: "p",
    text: "Detail on demand means the full library is there when it is wanted. Zyraa's Report Center has more than 140 ready-made reports in nine categories: Payroll & Salary, Attendance, Leave & Requests, Gate & Visitors, Employees, HR Reports, Loans & Bonus, Administration, and Executive. Every one has filters, an on-screen table, and Excel and PDF downloads. Sensitive identity numbers are masked to their last four digits.",
  },
  {
    type: "p",
    text: "The Executive shelf is written for the MD: a daily brief, a weekly workforce summary, a monthly payroll summary, an attrition and hiring review, attendance exceptions, a department scorecard, and a gate and discipline review. Each is one page, printable, and comparable across departments and units.",
  },
  {
    type: "figure",
    value: "140+",
    label: "ready-made reports in nine categories, each exportable to Excel and PDF",
  },
  {
    type: "h2",
    text: "An assistant that cannot change anything",
  },
  {
    type: "p",
    text: "Two minutes is often not enough to find the right report, so the MD portal has an AI assistant in a side panel, opened from any card's **Ask AI** button or with Ctrl+J. The MD types or speaks a question, for example “Which department had the most overtime last month, and is it getting worse?”, and the assistant looks the answer up in the company's data. It uses Google Gemini.",
  },
  {
    type: "p",
    text: "It is read-only in three separate ways. It has no tool that changes anything. Every lookup it makes runs inside a guard where the database refuses any write. And it never writes SQL: it can only call the same analytics functions the pages use, so the assistant and a page can never disagree, plus a tightly limited query language over 13 datasets for questions no page covers, and a search over the Report Center. The MD portal also keeps leave and request approvals with HR and the department heads; the MD can see every request but does not decide them.",
  },
  {
    type: "p",
    text: "Every answer comes with a **How I got this** panel. It is built by the server from the lookups that really happened, not from what the model says it did: what was looked up, for which period and scope, which datasets and definitions were used, the assumptions, and a confidence level. Confidence is high only when the answer rests on successful built-in lookups with no caveats. The model can lower that confidence. It can never raise it.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "The MD portal leads with headline cards, up to five ranked exceptions and trends, with provenance on every figure and an Ask AI button on every card. The assistant is read-only, answers from the same analytics the pages use, and explains each answer in a server-built “How I got this” panel. In privacy mode, employee names are replaced with tokens before anything leaves the server, and contact, bank and government ID details are never sent at all.",
  },
  {
    type: "h2",
    text: "Privacy, and a choice of language",
  },
  {
    type: "p",
    text: "Sending workforce data to an AI service deserves care. In privacy mode, which is the default, employee names in the question and in the lookup results are replaced with tokens like @emp-0001 before anything leaves the server, and put back only in what the MD reads. Phone numbers, email, addresses, dates of birth, bank details and government IDs are never sent, in any mode. Payroll totals and workforce numbers are still company data, so the setup guide recommends running the assistant on a paid Google project, whose terms do not allow training on prompts.",
  },
  {
    type: "p",
    text: "Many factory owners think and talk in Tamil or Hindi, not in report English. So the assistant listens and speaks in **English (India), Tamil and Hindi**. A spoken question gets a short spoken answer, every answer has a Listen button, and if the device has no Tamil or Hindi voice installed, the answer is shown on screen and the MD is told why. The voice is a feature of the MD's assistant; the rest of Zyraa's screens are in English.",
  },
  {
    type: "p",
    text: "None of this replaces walking the floor. But the MD who walks in already knowing that one unit's absenteeism doubled on Monday asks a better question of the first supervisor they meet. That is what two well-spent minutes are for.",
  },
];
