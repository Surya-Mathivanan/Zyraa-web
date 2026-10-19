/**
 * Staff pay engine, as Zyraa computes a month:
 *   gross  = monthly salary ÷ working days × days paid
 *   Basic  = 50% of gross (fixed by payroll), HRA = 20%
 *   PF     = Basic × PF rate              (when PF/ESI is switched on)
 *   ESI    = gross × ESI rate, only if the salary is at or below the ceiling
 *   late   = shifts from the late-pool slabs × one day's pay
 *   net    = gross − PF − ESI − late deduction − advance recovery
 * Rates here are illustrative inputs; each company sets its own in Settings.
 */
export function staffPayslip({
  salary,
  workingDays = 26,
  present = 24,
  halfDays = 0,
  paidLeave = 0,
  lateShifts = 0,
  advance = 0,
  statutory = true,
  pfRate = 12,
  esiRate = 0.75,
  esiCeiling = 21000,
}) {
  const daysPaid = Math.min(workingDays, present + halfDays * 0.5 + paidLeave);
  const lop = Math.max(0, workingDays - daysPaid);
  const dayRate = salary / workingDays;
  const gross = round(dayRate * daysPaid);
  const basic = round(gross * 0.5);
  const hra = round(gross * 0.2);
  const allowances = round(gross - basic - hra);
  const pf = statutory ? round((basic * pfRate) / 100) : 0;
  const esi = statutory && salary <= esiCeiling ? round((gross * esiRate) / 100) : 0;
  const late = round(lateShifts * dayRate);
  const deductions = round(pf + esi + late + advance);
  const net = round(gross - deductions);

  const issues = [];
  if (lop > 0) issues.push({ code: "Absent / loss of pay", impact: round(lop * dayRate), days: lop, severity: "Needs a look" });
  if (halfDays > 0) issues.push({ code: "Half day", impact: round(halfDays * 0.5 * dayRate), days: halfDays * 0.5, severity: "Needs a look" });
  if (late > 0) issues.push({ code: "Late deduction", impact: late, days: lateShifts, severity: "Needs a look" });
  if (advance > 0) issues.push({ code: "Advance recovery", impact: advance, severity: "For information" });

  return { daysPaid, lop, dayRate, gross, basic, hra, allowances, pf, esi, late, advance, deductions, net, issues };
}

const round = (n) => Math.round(n * 100) / 100;
