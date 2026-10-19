import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Seg, Toggle, Tag } from "./kit.jsx";
import { Check, Cross } from "../components/Icons.jsx";
import {
  REQUEST_TYPES,
  ROLE_LABEL,
  requestWindow,
} from "../lib/rules/requests.js";
import "./approvals.css";

const SHAPES = {
  either: { label: "HOD or HR", steps: [{ role: "either", mandatory: true }] },
  hod: { label: "HOD only", steps: [{ role: "hod", mandatory: true }] },
  hr: { label: "HR only", steps: [{ role: "hr", mandatory: true }] },
  "hod-hr": {
    label: "HOD → HR",
    steps: [
      { role: "hod", mandatory: true },
      { role: "hr", mandatory: true },
    ],
  },
  "hr-hod": {
    label: "HR → HOD",
    steps: [
      { role: "hr", mandatory: true },
      { role: "hod", mandatory: true },
    ],
  },
};

function shapeOf(type) {
  const key = type.pipeline.join("-");
  const shape = SHAPES[key] || SHAPES.either;
  return {
    key: SHAPES[key] ? key : "either",
    steps: shape.steps.map((s, i) => ({
      ...s,
      mandatory: !(type.optional || []).includes(i),
    })),
  };
}

const parse = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m: m - 1, d };
};

function RequestWindow() {
  const [today, setToday] = useState("2026-10-19");
  const [date, setDate] = useState("2026-09-28");
  const [missing, setMissing] = useState(false);
  const res =
    today && date
      ? requestWindow(parse(today), parse(date), { missingPunch: missing })
      : null;
  return (
    <div className="dm-panel ap-window">
      <span className="dm-label">The request window</span>
      <div className="ap-window-grid">
        <label className="dm-field">
          <span className="dm-label">Today is</span>
          <input
            className="dm-input"
            type="date"
            value={today}
            onChange={(e) => setToday(e.target.value)}
          />
        </label>
        <label className="dm-field">
          <span className="dm-label">Employee asks for</span>
          <input
            className="dm-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <Toggle
        label="It's a missing-punch claim"
        checked={missing}
        onChange={setMissing}
      />
      {res && (
        <p className={`ap-window-out ${res.ok ? "is-ok" : "is-no"}`}>
          {res.ok ? <Check /> : <Cross />}
          {res.message}
        </p>
      )}
      <p className="dm-note">
        Leave, casual leave, permission and missing punch: the current month
        only, plus the 1st and 2nd of the next. India time decides - the phone's
        clock does not. HR is never limited by it. Try today = 2 November.
      </p>
    </div>
  );
}

export default function Approvals() {
  const [typeId, setTypeId] = useState("missing");
  const type = REQUEST_TYPES.find((t) => t.id === typeId);
  const [shapeKey, setShapeKey] = useState(shapeOf(type).key);
  const [firstOptional, setFirstOptional] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [state, setState] = useState({ status: "draft", at: 0, trail: [] });

  const steps = (
    type.editable ? SHAPES[shapeKey].steps : shapeOf(type).steps
  ).map((s, i) =>
    i === 0 &&
    (type.editable ? firstOptional : !s.mandatory) &&
    SHAPES[shapeKey].steps.length > 1
      ? { ...s, mandatory: false }
      : s,
  );

  const reset = (next = {}) =>
    setState({ status: "draft", at: 0, trail: [], ...next });

  const pickType = (id) => {
    const t = REQUEST_TYPES.find((x) => x.id === id);
    setTypeId(id);
    setShapeKey(shapeOf(t).key);
    setFirstOptional((t.optional || []).includes(0));
    setEnabled(true);
    reset();
  };

  const submit = () =>
    setState({
      status: "pending",
      at: 0,
      trail: [{ who: type.raisedBy || "Employee", what: "Submitted" }],
    });

  const act = (role, approve) => {
    setState((s) => {
      const trail = [...s.trail];
      let at = s.at;
      // HR acting on an optional HOD step skips it.
      if (steps[at].role === "hod" && role === "hr" && !steps[at].mandatory) {
        trail.push({ who: ROLE_LABEL.hod, what: "Skipped" });
        at += 1;
      }
      const who = role === "hod" ? ROLE_LABEL.hod : ROLE_LABEL.hr;
      if (!approve)
        return {
          status: "rejected",
          at,
          trail: [...trail, { who, what: "Rejected" }],
        };
      trail.push({ who, what: "Approved" });
      if (at + 1 >= steps.length)
        return { status: "approved", at: at + 1, trail };
      return { status: "pending", at: at + 1, trail };
    });
  };

  const current = state.status === "pending" ? steps[state.at] : null;
  const canAct = (role) =>
    current &&
    (current.role === role ||
      current.role === "either" ||
      (role === "hr" &&
        current.role === "hod" &&
        !current.mandatory &&
        steps[state.at + 1]?.role === "hr"));
  const waiting = current ? `Waiting for ${ROLE_LABEL[current.role]}` : null;

  return (
    <div className="ap">
      <div className="dm">
        <div className="dm-panel">
          <Seg
            label="Request type"
            options={REQUEST_TYPES.map((t) => ({ value: t.id, label: t.name }))}
            value={typeId}
            onChange={pickType}
          />
          {type.editable ? (
            <>
              <Seg
                label="Pipeline"
                options={Object.entries(SHAPES).map(([k, s]) => ({
                  value: k,
                  label: s.label,
                }))}
                value={shapeKey}
                onChange={(k) => {
                  setShapeKey(k);
                  reset();
                }}
              />
              {SHAPES[shapeKey].steps.length > 1 && (
                <Toggle
                  label="First step optional"
                  checked={firstOptional}
                  onChange={(v) => {
                    setFirstOptional(v);
                    reset();
                  }}
                />
              )}
              <Toggle
                label="Request type switched on"
                checked={enabled}
                onChange={(v) => {
                  setEnabled(v);
                  reset();
                }}
              />
            </>
          ) : (
            <p className="dm-note">
              <Tag>Fixed pipeline</Tag>{" "}
              {type.raisedBy ? `Raised by ${type.raisedBy}. ` : ""}This type can
              be switched on or off but its steps are fixed.
            </p>
          )}
          <p className="dm-note">
            One or two steps; "HOD or HR" only as a single step; the last step
            is always mandatory. Changing a pipeline never approves or rejects
            anything already waiting.
          </p>
        </div>

        <div className="dm-panel dm-panel--solid">
          <div className="ap-card">
            <div className="dm-row ap-card-top">
              <span className="ap-avatar">T</span>
              <div>
                <strong>Tailor · Linking · EMP-0412</strong>
                <small>{type.name} · 14 Oct</small>
              </div>
              <span className="ap-status">
                {state.status === "draft" && <Tag>Not submitted</Tag>}
                {state.status === "pending" && <Tag tone="warn">{waiting}</Tag>}
                {state.status === "approved" && <Tag tone="good">Approved</Tag>}
                {state.status === "rejected" && <Tag tone="bad">Rejected</Tag>}
              </span>
            </div>
          </div>

          <ol className="dm-trail">
            <li
              className={`dm-step ${state.status !== "draft" ? "dm-step--done" : "dm-step--active"}`}
            >
              <span className="dm-step-dot">
                {state.status !== "draft" ? <Check /> : "1"}
              </span>
              <div>
                <strong>{type.raisedBy || "Employee"} submits</strong>
                <small>
                  {state.status === "draft" ? "Up next" : "Submitted"}
                </small>
              </div>
            </li>
            {steps.map((s, i) => {
              const entry = state.trail.filter((t) => t.what !== "Submitted")[
                i
              ];
              const cls = entry
                ? entry.what === "Rejected"
                  ? "dm-step--rejected"
                  : entry.what === "Skipped"
                    ? "dm-step--skipped"
                    : "dm-step--done"
                : state.status === "pending" && state.at === i
                  ? "dm-step--active"
                  : "";
              return (
                <li key={i} className={`dm-step ${cls}`}>
                  <span className="dm-step-dot">
                    {entry?.what === "Approved" ? (
                      <Check />
                    ) : entry?.what === "Rejected" ? (
                      <Cross />
                    ) : (
                      i + 2
                    )}
                  </span>
                  <div>
                    <strong>
                      {ROLE_LABEL[s.role]} {s.mandatory ? "" : "(optional)"}
                    </strong>
                    <small>
                      {entry
                        ? entry.what
                        : cls === "dm-step--active"
                          ? "Pending"
                          : "Not reached"}
                    </small>
                  </div>
                </li>
              );
            })}
          </ol>

          <AnimatePresence mode="wait">
            <motion.div
              key={state.status + state.at}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="dm-row"
            >
              {state.status === "draft" &&
                (enabled ? (
                  <button type="button" className="dm-btn" onClick={submit}>
                    Submit request
                  </button>
                ) : (
                  <p className="ap-off">
                    {type.name} requests are switched off right now. Please
                    contact HR.
                  </p>
                ))}
              {state.status === "pending" && (
                <>
                  <button
                    type="button"
                    className="dm-btn dm-btn--good"
                    disabled={!canAct("hod")}
                    onClick={() => act("hod", true)}
                  >
                    Approve as HOD
                  </button>
                  <button
                    type="button"
                    className="dm-btn dm-btn--good"
                    disabled={!canAct("hr")}
                    onClick={() => act("hr", true)}
                  >
                    Approve as HR
                  </button>
                  <button
                    type="button"
                    className="dm-btn dm-btn--bad"
                    onClick={() =>
                      act(current.role === "hr" ? "hr" : "hod", false)
                    }
                  >
                    Reject
                  </button>
                </>
              )}
              {(state.status === "approved" || state.status === "rejected") && (
                <button
                  type="button"
                  className="dm-btn dm-btn--ghost"
                  onClick={() => reset()}
                >
                  Start again
                </button>
              )}
            </motion.div>
          </AnimatePresence>
          {state.status === "approved" && typeId === "missing" && (
            <p className="dm-note">
              The approved punch is written like a real device punch and the day
              is judged again.
            </p>
          )}
        </div>
      </div>
      <RequestWindow />
    </div>
  );
}
