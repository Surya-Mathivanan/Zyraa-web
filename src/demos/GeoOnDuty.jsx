import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Range, Toggle, Tag } from "./kit.jsx";
import { Check } from "../components/Icons.jsx";
import "./geo.css";

const W = 600;
const H = 380;
const M_PER_UNIT = 2; // map scale: 1 SVG unit = 2 metres
const BRANCH = { x: 300, y: 190 };
const SLOTS = ["In", "Out", "In", "Out"];

function GeoPunch() {
  const svgRef = useRef(null);
  const [me, setMe] = useState({ x: 360, y: 220 });
  const [radius, setRadius] = useState(200);
  const [mock, setMock] = useState(false);
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [count, setCount] = useState(2);

  const dist = Math.round(
    Math.hypot(me.x - BRANCH.x, me.y - BRANCH.y) * M_PER_UNIT,
  );
  const inside = dist <= radius;

  const toSvg = (e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return {
      x: Math.max(12, Math.min(W - 12, p.x)),
      y: Math.max(12, Math.min(H - 12, p.y)),
    };
  };

  const punch = () => {
    if (mock)
      setResult({
        ok: false,
        text: "Refused: the phone reported a simulated location. HR sees this punch flagged red on the live map.",
      });
    else if (!inside)
      setResult({
        ok: false,
        text: `Outside the allowed radius - ${dist} m away (allowed ${radius} m). Switch to an On-Duty punch.`,
      });
    else {
      setCount((c) => c + 1);
      setResult({
        ok: true,
        text: `Punch #${count + 1} recorded at the branch - ${dist} m from the centre. No photo needed.`,
      });
    }
  };

  return (
    <div className="dm">
      <div className="dm-panel">
        <span className="dm-label">Office geo punch</span>
        <p className="dm-note">
          Drag the blue pin. The phone takes one high-accuracy GPS fix and
          checks it against the branch radius.
        </p>
        <Range
          label="Branch radius"
          value={radius}
          display={`${radius} m`}
          min={20}
          max={600}
          step={10}
          onChange={setRadius}
        />
        <Toggle
          label="Phone reports a mocked location"
          checked={mock}
          onChange={setMock}
        />
        <button type="button" className="dm-btn" onClick={punch}>
          Slide to punch in »
        </button>
        <AnimatePresence mode="wait">
          {result && (
            <motion.p
              key={result.text}
              className={`geo-result ${result.ok ? "is-ok" : "is-no"}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {result.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="dm-panel dm-panel--solid geo-map-panel">
        <div className="dm-row">
          <Tag tone={mock ? "bad" : inside ? "good" : "warn"}>
            {mock
              ? "Simulated location"
              : inside
                ? "Inside the radius"
                : "Outside the radius"}
          </Tag>
          <Tag>{dist} m from the branch</Tag>
        </div>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className={`geo-map ${dragging ? "is-dragging" : ""}`}
          onPointerMove={(e) => dragging && setMe(toSvg(e))}
          onPointerUp={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}
          onPointerDown={(e) => {
            setDragging(true);
            setMe(toSvg(e));
            e.currentTarget.setPointerCapture?.(e.pointerId);
          }}
          role="img"
          aria-label={`Map: employee ${dist} metres from the branch, allowed radius ${radius} metres`}
        >
          <defs>
            <pattern
              id="geo-grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path d="M30 0H0V30" fill="none" className="geo-grid-line" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#geo-grid)" />
          <path d="M0 260 C 150 240, 220 300, 600 250" className="geo-road" />
          <path d="M420 0 C 400 120, 470 220, 440 380" className="geo-road" />
          <motion.circle
            cx={BRANCH.x}
            cy={BRANCH.y}
            animate={{ r: radius / M_PER_UNIT }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
            className="geo-fence"
          />
          <rect
            x={BRANCH.x - 18}
            y={BRANCH.y - 14}
            width="36"
            height="28"
            rx="6"
            className="geo-branch"
          />
          <text x={BRANCH.x} y={BRANCH.y + 44} className="geo-label">
            Unit 2 · Knitting
          </text>
          <line
            x1={BRANCH.x}
            y1={BRANCH.y}
            x2={me.x}
            y2={me.y}
            className="geo-ruler"
          />
          <g
            transform={`translate(${me.x} ${me.y})`}
            className={`geo-me ${mock ? "is-mock" : ""}`}
          >
            <circle r="22" className="geo-me-halo" />
            <circle r="10" className="geo-me-dot" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function OnDuty() {
  const [dest, setDest] = useState("Supplier mill - sample approval");
  const [stage, setStage] = useState("idle"); // idle → hod → hr → active → completed
  const [punches, setPunches] = useState([]); // {slot, state: pending|verified|rejected, mock}
  const [mock, setMock] = useState(false);

  const approved = punches.filter((p) => p.state === "verified").length;
  const done = stage === "completed";

  const start = () => {
    setStage("hod");
    setPunches([]);
  };
  const addPunch = () =>
    setPunches((ps) => [
      ...ps,
      { slot: SLOTS[ps.length], state: "pending", mock },
    ]);
  const verify = (i, ok) =>
    setPunches((ps) => {
      const next = ps.map((p, k) =>
        k === i ? { ...p, state: ok ? "verified" : "rejected" } : p,
      );
      if (next.filter((p) => p.state === "verified").length >= 4)
        setStage("completed");
      return next;
    });

  const STATUS = {
    idle: ["Not started", ""],
    hod: ["Awaiting Department Head", "warn"],
    hr: ["Awaiting HR", "info"],
    active: ["Active", "good"],
    completed: ["Completed", "good"],
  };

  return (
    <div className="dm">
      <div className="dm-panel">
        <span className="dm-label">On-duty session</span>
        <label className="dm-field">
          <span className="dm-label">Destination</span>
          <input
            className="dm-input"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            disabled={stage !== "idle"}
          />
        </label>
        <div className="dm-row">
          {stage === "idle" && (
            <button
              type="button"
              className="dm-btn"
              onClick={start}
              disabled={!dest.trim()}
            >
              Start session
            </button>
          )}
          {stage === "hod" && (
            <button
              type="button"
              className="dm-btn dm-btn--good"
              onClick={() => setStage("hr")}
            >
              Approve as HOD
            </button>
          )}
          {stage === "hr" && (
            <button
              type="button"
              className="dm-btn dm-btn--good"
              onClick={() => setStage("active")}
            >
              Approve as HR
            </button>
          )}
          {stage !== "idle" && (
            <button
              type="button"
              className="dm-btn dm-btn--ghost"
              onClick={() => {
                setStage("idle");
                setPunches([]);
              }}
            >
              Reset
            </button>
          )}
        </div>
        <Toggle
          label="Next punch from a mocked GPS"
          checked={mock}
          onChange={setMock}
        />
        <p className="dm-note">
          The session starts when the destination is sent; punches are held
          until it is approved. It closes on the 4th approved punch, on "Done",
          or at the end of the day.
        </p>
      </div>
      <div className="dm-panel dm-panel--solid">
        <div className="dm-row">
          <Tag tone={STATUS[stage][1]}>{STATUS[stage][0]}</Tag>
          <Tag>{approved} of 4 punches verified</Tag>
        </div>
        <div className="od-slots">
          {SLOTS.map((slot, i) => {
            const p = punches[i];
            return (
              <div
                key={i}
                className={`od-slot ${p ? `is-${p.state}` : ""} ${p?.mock ? "is-mock" : ""}`}
              >
                <span className="od-slot-n">#{i + 1}</span>
                <strong>{slot}</strong>
                {!p && i === punches.length && stage !== "idle" && !done ? (
                  <button
                    type="button"
                    className="dm-btn dm-btn--ghost"
                    onClick={addPunch}
                  >
                    + Photo &amp; location
                  </button>
                ) : !p ? (
                  <small>Open</small>
                ) : (
                  <>
                    <span className="od-photo" aria-hidden="true" />
                    <small>
                      {p.mock ? "Simulated GPS" : "GPS ±9 m"} ·{" "}
                      {p.state === "pending"
                        ? "Waiting for HR"
                        : p.state === "verified"
                          ? "Verified"
                          : "Rejected"}
                    </small>
                    {p.state === "pending" &&
                      (stage === "active" || stage === "completed") && (
                        <span className="dm-row">
                          <button
                            type="button"
                            className="dm-btn dm-btn--good"
                            onClick={() => verify(i, true)}
                            disabled={p.mock}
                          >
                            <Check />
                          </button>
                          <button
                            type="button"
                            className="dm-btn dm-btn--bad"
                            onClick={() => verify(i, false)}
                          >
                            Reject
                          </button>
                        </span>
                      )}
                  </>
                )}
              </div>
            );
          })}
        </div>
        {punches.some((p) => p.mock) && (
          <p className="dm-note">
            A mocked-GPS punch is flagged red for HR. It can only be rejected.
          </p>
        )}
        {punches.length > 0 && stage !== "active" && !done && (
          <p className="dm-note">
            Punches are held: HR verifies them once the session itself is
            approved.
          </p>
        )}
      </div>
    </div>
  );
}

export default function GeoOnDuty() {
  return (
    <div className="geo">
      <GeoPunch />
      <OnDuty />
    </div>
  );
}
