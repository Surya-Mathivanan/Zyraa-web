import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Seg, Tag } from "./kit.jsx";
import { Spark } from "../components/Icons.jsx";
import "./md-assistant.css";

/* Scripted answers over a made-up 4-unit, ~1,240-person garment company.
   The shape - progress lines, answer, confidence, "How I got this" with tools,
   data and assumptions, tokenised names - follows the real assistant. */
const BRIDGE = [
  ["Last month", 232.0, "total"],
  ["Joined payroll", 4.1],
  ["Left payroll", -2.9],
  ["Pay rate changes", 1.6],
  ["Overtime", 3.8],
  ["Loss of pay", -1.2],
  ["This month", 237.4, "total"],
];

const QA = [
  {
    id: "brief",
    q: "Give me a briefing on how the company is doing today.",
    steps: [
      "Reading your question",
      "Looking at today's attendance by unit",
      "Checking requests waiting",
      "Writing the answer",
    ],
    answer: [
      "Attendance is **90.3%** so far today - 3.1 points below the 30-day average of 93.4%. Unit 3 is the outlier at **74%**; the other three units are above 90%.",
      "**11 requests** are waiting more than three days, nine of them with one department head in Stitching.",
      "Overtime cost is **down 8%** on last month.",
    ],
    tools: [
      "attendance_today(by: unit)",
      "requests_waiting(older_than: 3d)",
      "overtime_cost(compare: last_month)",
    ],
    data: [
      "Attendance day records - today, 4 units",
      "Approval queue - 38 open requests",
      "Payroll - September, October so far",
    ],
    assumptions: [
      "Today is still running, so attendance is provisional.",
      "Units compared on employees scheduled today.",
    ],
    confidence: "High",
  },
  {
    id: "payroll",
    q: "Why did payroll change compared with last month?",
    steps: [
      "Reading your question",
      "Building the payroll cost bridge",
      "Checking the biggest step",
      "Writing the answer",
    ],
    answer: [
      "Gross pay rose by **₹5.4 L (2.3%)**, from ₹2.32 Cr to ₹2.374 Cr. The biggest step is **overtime (+₹3.8 L)**, mostly in Packing during the export rush.",
      "Joiners added ₹4.1 L and leavers took out ₹2.9 L. Loss of pay fell by ₹1.2 L. The steps add up to the change exactly.",
    ],
    bridge: true,
    tools: [
      "payroll_bridge(from: Sep, to: Oct)",
      "overtime_by_department(month: Oct)",
    ],
    data: [
      "Payroll - Sep and Oct, 1,200 people paid",
      "Overtime register - October",
    ],
    assumptions: [
      "October slips made before month end understate pay; this uses the finished September and October runs.",
    ],
    confidence: "High",
  },
  {
    id: "late",
    q: "Who is late most often this month?",
    steps: [
      "Reading your question",
      "Counting late-ins by person",
      "Restoring names for you",
      "Writing the answer",
    ],
    answer: [
      "Three people have **six or more late-ins** this month, all on the 9:00 general shift: **@emp-1042** (checker, Finishing), **@emp-0877** (tailor, Linking) and **@emp-1310** (helper, Cutting).",
      "All three are past the free allowance of 3, so the late-pool slabs already apply to their October pay.",
    ],
    tokens: true,
    tools: ["late_counts(month: Oct, min: 6)", "employee_profile(ids: 3)"],
    data: ["Attendance day records - October, staff only"],
    assumptions: [
      "Late-in means after shift start plus grace, before the late window ends.",
    ],
    confidence: "Medium",
  },
  {
    id: "tea",
    q: "How much production time did tea breaks cost this week?",
    steps: [
      "Reading your question",
      "Summing tea-break overruns",
      "Comparing with last week",
      "Writing the answer",
    ],
    answer: [
      "Tea-break overruns cost **41 hours** of floor time this week, against 33 last week. **62%** of breaks stayed inside the allowed 15 minutes.",
      "Most of the overrun is between **3:30 and 4:00 PM** in Unit 2 - the canteen queue, not a few repeat offenders.",
    ],
    tools: [
      "tea_break_overrun(range: this_week)",
      "tea_break_by_time_of_day(unit: all)",
    ],
    data: ["Tea-break register - this week and last week"],
    assumptions: ["Only minutes beyond the allowance count as lost."],
    confidence: "Medium",
  },
];

const md = (s) =>
  s
    .split(/(\*\*[^*]+\*\*)/)
    .map((p, i) => (p.startsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : p));

// Waterfall bars, worked out once: totals stand on the axis, steps float
// from the running total.
const BRIDGE_BARS = (() => {
  let run = 0;
  return BRIDGE.map(([label, v, kind]) => {
    const from = kind === "total" ? null : run;
    run = kind === "total" ? v : run + v;
    return { label, v, kind, from, to: run };
  });
})();

function Bridge() {
  const max = 240;
  const min = 228;
  const pct = (x) => ((x - min) / (max - min)) * 100;
  return (
    <div className="ma-bridge" aria-label="Payroll cost bridge, lakh rupees">
      {BRIDGE_BARS.map(({ label, v, kind, from, to }) => {
        const lo = kind ? min : Math.min(from, to);
        const hi = kind ? to : Math.max(from, to);
        return (
          <div key={label} className="ma-bar-col">
            <div className="ma-bar-track">
              <motion.span
                className={`ma-bar ${kind ? "is-total" : v > 0 ? "is-up" : "is-down"}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  bottom: `${pct(lo)}%`,
                  height: `${Math.max(1.5, pct(hi) - pct(lo))}%`,
                }}
              />
            </div>
            <b>
              {kind
                ? `₹${(v / 100).toFixed(2)} Cr`
                : `${v > 0 ? "+" : "−"}₹${Math.abs(v)} L`}
            </b>
            <small>{label}</small>
          </div>
        );
      })}
    </div>
  );
}

export default function MdAssistant() {
  const [active, setActive] = useState(null);
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState("did");
  const [lang, setLang] = useState("English");
  const qa = QA.find((x) => x.id === active);

  useEffect(() => {
    if (!qa) return undefined;
    const timers = qa.steps.map((_, i) =>
      setTimeout(() => setStep(i + 1), 450 * (i + 1)),
    );
    return () => timers.forEach(clearTimeout);
  }, [qa]);

  const done = qa && step >= qa.steps.length;

  return (
    <div className="ma">
      <div className="ma-panel">
        <div className="ma-head">
          <span className="ma-avatar">
            <Spark />
          </span>
          <div>
            <strong>AI Assistant</strong>
            <small>Read-only · names protected</small>
          </div>
        </div>

        <p className="ma-welcome">
          Ask me about your workforce, attendance, payroll, hiring or the gate.
          I read your live data, show how I worked it out, and never change
          anything.
        </p>
        <Seg
          label="Voice"
          options={["English", "தமிழ்", "हिन्दी"]}
          value={lang}
          onChange={setLang}
        />
        <span className="dm-label">Try asking</span>
        <div className="ma-asks">
          {QA.map((x) => (
            <button
              key={x.id}
              type="button"
              className={active === x.id ? "is-on" : ""}
              onClick={() => {
                setActive(x.id);
                setStep(0);
                setTab("did");
              }}
            >
              <Spark />
              {x.q}
            </button>
          ))}
        </div>
        {lang !== "English" && (
          <p className="dm-note">
            Speak your question in {lang} and hear the answer read back - voice
            works in English, Tamil and Hindi. This demo shows the text.
          </p>
        )}
      </div>

      <div className="ma-chat">
        {!qa && (
          <p className="ma-empty">Pick a question to see the assistant work.</p>
        )}
        {qa && (
          <>
            <div className="ma-user">{qa.q}</div>
            <ul className="ma-steps">
              {qa.steps.map((s, i) => (
                <li
                  key={s}
                  className={i < step ? "is-done" : i === step ? "is-now" : ""}
                >
                  {s}
                </li>
              ))}
            </ul>
            <AnimatePresence>
              {done && (
                <motion.div
                  className="ma-answer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {qa.answer.map((p) => (
                    <p key={p}>{md(p)}</p>
                  ))}
                  {qa.bridge && <Bridge />}
                  <div className="dm-row">
                    <Tag tone={qa.confidence === "High" ? "good" : "warn"}>
                      {qa.confidence} confidence
                    </Tag>
                    <Tag>Sample data</Tag>
                  </div>
                  <details className="ma-how" open>
                    <summary>How I got this</summary>
                    <Seg
                      options={[
                        { value: "did", label: "What I did" },
                        { value: "data", label: "Data used" },
                        { value: "assume", label: "Assumptions" },
                      ]}
                      value={tab}
                      onChange={setTab}
                    />
                    <ul className="ma-how-list">
                      {(tab === "did"
                        ? qa.tools
                        : tab === "data"
                          ? qa.data
                          : qa.assumptions
                      ).map((x) => (
                        <li key={x}>{tab === "did" ? <code>{x}</code> : x}</li>
                      ))}
                    </ul>
                    <p className="dm-note">
                      Employee names were replaced with codes like{" "}
                      <code>@emp-1042</code> before anything was sent to the AI,
                      and restored on your screen. Phone, address, bank and ID
                      numbers are never sent.
                    </p>
                  </details>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
