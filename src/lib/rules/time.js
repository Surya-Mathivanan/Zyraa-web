/** Minutes since midnight ⇄ "9:05 AM". Values ≥ 1440 are the next day. */
export function fmtTime(min, { ampm = true } = {}) {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  if (!ampm) return `${String(h).padStart(2, "0")}:${mm}`;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mm} ${h < 12 ? "AM" : "PM"}`;
}

export const hm = (h, m = 0) => h * 60 + m;

export function inr(n, { decimals = 0 } = {}) {
  return `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

export const fmtShift = (n) => Number(n).toFixed(2);
