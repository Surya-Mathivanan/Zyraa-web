import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reports, reportCategories } from "../data/reports.js";
import "./report-center.css";

const TRY = [
  "PF",
  "overtime",
  "late",
  "visitor",
  "tea break",
  "Form 12",
  "minimum wage",
  "HOD",
];

function Star({ on }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8L12 3Z"
        fill={on ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReportCenter() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [starred, setStarred] = useState(
    () => new Set(["pf-statement", "late-summary-counts"]),
  );
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const query = useDeferredValue(q);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return reports.filter(
      (r) =>
        (cat === "All" ||
          (cat === "Starred" ? starred.has(r.id) : r.category === cat)) &&
        words.every((w) =>
          `${r.title} ${r.desc} ${r.category}`.toLowerCase().includes(w),
        ),
    );
  }, [query, cat, starred]);

  const toggleStar = (id) =>
    setStarred((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div className="rc">
      <aside className="rc-rail">
        {["All", "Starred", ...reportCategories].map((c) => {
          const n =
            c === "All"
              ? reports.length
              : c === "Starred"
                ? starred.size
                : reports.filter((r) => r.category === c).length;
          return (
            <button
              key={c}
              type="button"
              className={cat === c ? "is-on" : ""}
              onClick={() => setCat(c)}
            >
              <span>{c}</span>
              <b>{n}</b>
            </button>
          );
        })}
      </aside>

      <div className="rc-main">
        <label className="rc-search">
          <span className="sr-only">Search reports</span>
          <input
            className="dm-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${reports.length} reports - try “PF”, “overtime”, “late”, “visitor”…`}
          />
        </label>
        <div className="rc-try">
          {TRY.map((t) => (
            <button key={t} type="button" onClick={() => setQ(t)}>
              {t}
            </button>
          ))}
        </div>
        <p className="rc-count">
          {results.length} report{results.length === 1 ? "" : "s"}
          {cat !== "All" ? ` in ${cat}` : ""}
        </p>
        <ul className="rc-list">
          <AnimatePresence initial={false}>
            {(showAll ? results : results.slice(0, 24)).map((r) => (
              <motion.li
                key={r.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`rc-item ${open === r.id ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="rc-item-main"
                  onClick={() => setOpen(open === r.id ? null : r.id)}
                >
                  <span className="rc-cat">{r.category}</span>
                  <strong>{r.title}</strong>
                  <span className="rc-desc">{r.desc}</span>
                </button>
                <button
                  type="button"
                  className={`rc-star ${starred.has(r.id) ? "is-on" : ""}`}
                  onClick={() => toggleStar(r.id)}
                  aria-label={
                    starred.has(r.id) ? `Unstar ${r.title}` : `Star ${r.title}`
                  }
                  aria-pressed={starred.has(r.id)}
                >
                  <Star on={starred.has(r.id)} />
                </button>
                {open === r.id && (
                  <div className="rc-open">
                    <span>
                      Filters · Show report · Summary cards · Totals row
                    </span>
                    <span className="rc-exports">
                      <i>Excel</i>
                      <i>PDF</i>
                      <i>Copy link</i>
                    </span>
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {!showAll && results.length > 24 && (
          <button
            type="button"
            className="dm-btn dm-btn--ghost rc-more"
            onClick={() => setShowAll(true)}
          >
            Show all {results.length}
          </button>
        )}
        {results.length === 0 && (
          <p className="dm-note">
            No records for these filters. Try a wider word, or another shelf.
          </p>
        )}
      </div>
    </div>
  );
}
