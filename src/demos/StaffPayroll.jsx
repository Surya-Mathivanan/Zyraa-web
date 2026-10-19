import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Range, Toggle, Tag } from "./kit.jsx";
import { staffPayslip } from "../lib/rules/payroll.js";
import { latePool } from "../lib/rules/arrival.js";
import { inr, fmtShift } from "../lib/rules/time.js";
import "./payroll.css";

const SEV = {
  "Needs a look": "warn",
  "For information": "info",
  Critical: "bad",
};

export default function StaffPayroll() {
  const [salary, setSalary] = useState(22000);
  const [present, setPresent] = useState(23);
  const [halfDays, setHalfDays] = useState(1);
  const [paidLeave, setPaidLeave] = useState(1);
  const [marks, setMarks] = useState(7);
  const [advance, setAdvance] = useState(2000);
  const [statutory, setStatutory] = useState(true);
  const [paid, setPaid] = useState(false);
  const workingDays = 26;

  const maxPresent = workingDays - halfDays - paidLeave;
  const p = Math.min(present, maxPresent);
  const pool = latePool(marks);
  const slip = staffPayslip({
    salary,
    workingDays,
    present: p,
    halfDays,
    paidLeave,
    lateShifts: pool.shifts,
    advance,
    statutory,
  });

  const touch = (fn) => (v) => {
    fn(v);
    setPaid(false);
  };

  return (
    <div className="dm">
      <div className="dm-panel">
        <Range
          label="Monthly salary"
          value={salary}
          display={inr(salary)}
          min={9000}
          max={45000}
          step={500}
          onChange={touch(setSalary)}
        />
        <Range
          label="Days present"
          value={p}
          display={`${p} of ${workingDays}`}
          min={0}
          max={maxPresent}
          onChange={touch(setPresent)}
        />
        <Range
          label="Half days"
          value={halfDays}
          min={0}
          max={6}
          onChange={touch(setHalfDays)}
        />
        <Range
          label="Approved paid leave"
          value={paidLeave}
          min={0}
          max={4}
          onChange={touch(setPaidLeave)}
        />
        <Range
          label="Late-pool marks"
          value={marks}
          display={`${marks} → ${fmtShift(pool.shifts)} shift`}
          min={0}
          max={18}
          onChange={touch(setMarks)}
        />
        <Range
          label="Advance EMI due"
          value={advance}
          display={inr(advance)}
          min={0}
          max={6000}
          step={250}
          onChange={touch(setAdvance)}
        />
        <Toggle
          label="PF / ESI switched on"
          checked={statutory}
          onChange={touch(setStatutory)}
        />
        <p className="dm-note">
          {workingDays} working days (Sundays and holidays excluded). Example
          rates: PF 12% of Basic, ESI 0.75% while the salary is at or below
          ₹21,000. Both are off by default and set per company.
        </p>
      </div>

      <div className="dm-panel dm-panel--solid">
        <div className="sp-head">
          <div>
            <span className="dm-label">Salary slip · October</span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={Math.round(slip.net)}
                className="dm-big"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {inr(slip.net)}
              </motion.span>
            </AnimatePresence>
            <span className="dm-note">
              Net pay · {fmtShift(slip.daysPaid)} days paid
            </span>
          </div>
          <div className="sp-status">
            {paid ? (
              <Tag tone="good">Paid</Tag>
            ) : (
              <Tag tone="warn">Pending</Tag>
            )}
            <button
              type="button"
              className="dm-btn"
              disabled={paid}
              onClick={() => setPaid(true)}
            >
              Mark paid
            </button>
          </div>
        </div>

        <div className="sp-cols">
          <dl className="dm-kv">
            <span className="dm-label">Earnings</span>
            <div>
              <dt>Basic (50%)</dt>
              <b>{inr(slip.basic)}</b>
            </div>
            <div>
              <dt>HRA (20%)</dt>
              <b>{inr(slip.hra)}</b>
            </div>
            <div>
              <dt>Allowances</dt>
              <b>{inr(slip.allowances)}</b>
            </div>
            <div className="dm-total">
              <dt>Gross</dt>
              <b>{inr(slip.gross)}</b>
            </div>
          </dl>
          <dl className="dm-kv">
            <span className="dm-label">Deductions</span>
            <div>
              <dt>PF</dt>
              <b>{inr(slip.pf)}</b>
            </div>
            <div>
              <dt>ESI</dt>
              <b>{inr(slip.esi)}</b>
            </div>
            <div>
              <dt>Late deduction</dt>
              <b>{inr(slip.late)}</b>
            </div>
            <div>
              <dt>Advance recovery</dt>
              <b>{inr(slip.advance)}</b>
            </div>
            <div className="dm-total">
              <dt>Total</dt>
              <b>{inr(slip.deductions)}</b>
            </div>
          </dl>
        </div>

        <div className="sp-formula">
          {inr(salary)} ÷ {workingDays} × {fmtShift(slip.daysPaid)} days ={" "}
          <b>{inr(slip.gross)}</b> gross
        </div>

        <div className="sp-issues">
          <span className="dm-label">
            Issues behind this slip <b>{slip.issues.length}</b>
          </span>
          {slip.issues.length === 0 && (
            <p className="dm-note">Clean month - nothing to review.</p>
          )}
          {slip.issues.map((i) => (
            <div key={i.code} className="sp-issue">
              <Tag tone={SEV[i.severity]}>{i.severity}</Tag>
              <span>
                {i.code}
                {i.days
                  ? ` · ${fmtShift(i.days)} ${i.code === "Late deduction" ? "shift" : "days"}`
                  : ""}
              </span>
              <b>{inr(i.impact)}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
