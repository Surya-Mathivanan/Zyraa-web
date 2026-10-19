import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Seg, Tag } from "./kit.jsx";
import { fmtTime, hm } from "../lib/rules/time.js";
import "./devices.css";

/* The nine checks the Device Status page runs, in layer order. */
const CHECKS = [
  "Biometric device",
  "LAN",
  "Firewall",
  "Port configuration",
  "API connection",
  "Cloud deployment",
  "Device IP configuration",
  "Network timeout",
  "Authentication & configuration",
];

const FAULTS = {
  none: { label: "All healthy", fail: null, fix: "" },
  cable: {
    label: "Cable pulled",
    fail: 1,
    fix: "The terminal is off the LAN. Check the cable or switch port next to it.",
  },
  dns: {
    label: "Wrong DNS",
    fail: 6,
    fix: "The device's DNS points nowhere, so it cannot find the server. Set DNS on the device: Menu → COMM.",
  },
  port: {
    label: "Wrong push port",
    fail: 3,
    fix: "The device pushes to the wrong port. Cloud push must use 443 (HTTPS).",
  },
  key: {
    label: "Comm key mismatch",
    fail: 8,
    fix: "The device's comm key differs from the one saved in Zyraa. Make them match.",
  },
};

const DEVICES = [
  "Gate · Unit 1",
  "Stitching · Unit 1",
  "Knitting · Unit 2",
  "Head office",
];

function DeviceBoard() {
  const [fault, setFault] = useState("none");
  const [device, setDevice] = useState(1);
  const f = FAULTS[fault];

  return (
    <div className="dm">
      <div className="dm-panel">
        <Seg
          label="Break something"
          options={Object.entries(FAULTS).map(([k, v]) => ({
            value: k,
            label: v.label,
          }))}
          value={fault}
          onChange={setFault}
        />
        <Seg
          label="On which terminal"
          options={DEVICES.map((d, i) => ({ value: i, label: d }))}
          value={device}
          onChange={setDevice}
        />
        <p className="dm-note">
          One failing device never blocks the others. A device is Connected when
          it was heard within 3 minutes - or 6 hours for one that only sends on
          a punch, so a quiet lunch hour raises no false alarm.
        </p>
      </div>
      <div className="dm-panel dm-panel--solid">
        <div className="dv-grid">
          {DEVICES.map((d, i) => {
            const down = f.fail !== null && i === device;
            return (
              <div key={d} className={`dv-card ${down ? "is-down" : ""}`}>
                <span className="dv-led" />
                <strong>{d}</strong>
                <small>
                  {down
                    ? "Disconnected · last heard 14 min ago"
                    : `Connected · ${180 + i * 37} punches today`}
                </small>
              </div>
            );
          })}
        </div>
        <span className="dm-label">
          Why - layer by layer · {DEVICES[device]}
        </span>
        <ol className="dv-checks">
          {CHECKS.map((c, i) => {
            const state =
              f.fail === null
                ? "ok"
                : i < f.fail
                  ? "ok"
                  : i === f.fail
                    ? "bad"
                    : "na";
            return (
              <motion.li
                key={c}
                className={`dv-check is-${state}`}
                initial={false}
                animate={{ opacity: state === "na" ? 0.4 : 1 }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {c}
                <em>
                  {state === "ok"
                    ? "OK"
                    : state === "bad"
                      ? "Problem"
                      : "Not reached"}
                </em>
              </motion.li>
            );
          })}
        </ol>
        <AnimatePresence mode="wait">
          {f.fix && (
            <motion.p
              key={fault}
              className="dv-fix"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <b>What to do:</b> {f.fix}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const SAMPLE = [
  hm(8, 57),
  hm(8, 58),
  hm(13, 1),
  hm(13, 4),
  hm(13, 46),
  hm(18, 2),
];

function Dedupe() {
  const [taps, setTaps] = useState(SAMPLE);
  const kept = taps
    .slice()
    .sort((a, b) => a - b)
    .reduce(
      (acc, t) =>
        acc.length && t - acc[acc.length - 1] < 5 ? acc : [...acc, t],
      [],
    );
  const slots = ["Morning in", "Lunch out", "Lunch in", "Evening out"];

  return (
    <div className="dm">
      <div className="dm-panel">
        <span className="dm-label">Double taps</span>
        <p className="dm-note">
          A worker unsure the terminal beeped taps again. Two taps within 5
          minutes count as one punch, so the day still reads as four.
        </p>
        <div className="dm-row">
          <button
            type="button"
            className="dm-btn"
            onClick={() =>
              setTaps((t) => [...t, (t[t.length - 1] ?? hm(9)) + 2].slice(-10))
            }
          >
            Add a tap 2 min later
          </button>
          <button
            type="button"
            className="dm-btn dm-btn--ghost"
            onClick={() => setTaps(SAMPLE)}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="dm-panel dm-panel--solid">
        <span className="dm-label">Raw taps from the device</span>
        <div className="dv-taps">
          {taps.map((t, i) => (
            <span
              key={i}
              className={
                kept.includes(t) && taps.indexOf(t) === i
                  ? "is-kept"
                  : "is-dropped"
              }
            >
              {fmtTime(t)}
            </span>
          ))}
        </div>
        <span className="dm-label">Punches Zyraa keeps</span>
        <div className="dv-kept">
          {kept.map((t, i) => (
            <div key={t}>
              <small>{slots[i] || `Punch ${i + 1}`}</small>
              <b>{fmtTime(t)}</b>
            </div>
          ))}
        </div>
        {kept.length > 4 && (
          <Tag tone="warn">
            More than four punches - listed in Punch Exceptions
          </Tag>
        )}
      </div>
    </div>
  );
}

export default function Devices() {
  return (
    <div className="dv">
      <DeviceBoard />
      <Dedupe />
    </div>
  );
}
