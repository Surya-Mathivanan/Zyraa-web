/* Demo controls. Thin wrappers so every demo's inputs look and behave alike. */

export function Range({ label, value, display, min, max, step = 1, onChange }) {
  const fill = `${((value - min) / (max - min)) * 100}%`;
  return (
    <label className="dm-field">
      <span className="dm-label">
        {label}
        <b>{display ?? value}</b>
      </span>
      <input
        className="dm-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--fill": fill }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="dm-toggle">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="dm-switch" aria-hidden="true" />
    </label>
  );
}

export function Seg({ label, options, value, onChange }) {
  return (
    <div className="dm-field" role="group" aria-label={label}>
      {label && <span className="dm-label">{label}</span>}
      <div className="dm-seg">
        {options.map((o) => {
          const v = typeof o === "object" ? o.value : o;
          const t = typeof o === "object" ? o.label : o;
          return (
            <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)}>
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Tag({ tone = "", children }) {
  return <span className={`dm-tag ${tone ? `dm-tag--${tone}` : ""}`}>{children}</span>;
}
