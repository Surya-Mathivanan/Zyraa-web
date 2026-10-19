import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import FadingStars from "../components/FadingStars.jsx";
import SignalType from "../components/SignalType.jsx";
import HeroBadges from "../components/HeroBadges.jsx";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import Btn from "../components/Btn.jsx";
import Marquee from "../components/Marquee.jsx";
import CountUp from "../components/CountUp.jsx";
import StitchLine from "../components/StitchLine.jsx";
import ScrollText from "../components/ScrollText.jsx";
import JournalCard from "../components/JournalCard.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { ArrowUpRight } from "../components/Icons.jsx";
import { PhoneFrame, BrowserFrame } from "../components/mockups/Frames.jsx";
import {
  MobileHome,
  WebDashboard,
  AdminPayroll,
} from "../components/mockups/Screens.jsx";
import { site } from "../data/site.js";
import { posts } from "../data/posts/index.js";
import { judgeArrival, arrivalZones } from "../lib/rules/arrival.js";
import { fmtTime, fmtShift, hm } from "../lib/rules/time.js";
import { useParallax } from "../hooks/useParallax.js";
import { useMedia, useReducedMotion } from "../hooks/useMedia.js";
import "./home.css";

const ease = [0.2, 0.8, 0.2, 1];

/* ── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const contentY = useParallax(ref, ["0%", "22%"], {
    offset: ["start start", "end start"],
  });
  const fade = useParallax(ref, [1, 0], {
    offset: ["start start", "end start"],
    input: [0, 0.8],
  });

  return (
    <Section tone="night" className="hero" id="hero">
      <div className="hero-track" ref={ref}>
        <FadingStars
          className="hero-stars"
          count={130}
          speed={1}
          trail={1.15}
        />
        <div className="hero-glow" aria-hidden="true" />
        <div className="grain" />

        <motion.div
          className="container hero-inner"
          style={{ y: contentY, opacity: fade }}
        >
          <HeroBadges city={site.location.city} />

          <h1 className="sr-only">Zyraa HRMS - {site.tagline}</h1>

          {/* The wordmark sets the width; everything under it spans exactly
              from the Z to the last A, so both edges line up. */}
          <div className="hero-lockup">
            <SignalType text="ZYRAA" className="hero-wordmark" />

            <div className="hero-lower">
              <motion.p
                className="hero-sub"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease }}
              >
                One record of the month -{" "}
                <em className="accent-word">from the punch</em> to the payslip.
              </motion.p>

              <motion.div
                className="hero-side"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.78, ease }}
              >
                <p className="hero-desc">
                  Biometric attendance, shift rules, approvals, staff and
                  production payroll, gate passes and {site.stats.reports}+
                  reports - for the office that closes monthly and the floor
                  that closes weekly.
                </p>
                {/* Phones show the short labels so the two buttons can sit
                    side by side; aria-label keeps the full wording. */}
                <div className="btn-row hero-actions">
                  <Btn to="/demos" solid cursor="Play" aria-label="Try the live demos">
                    <span className="label-long">Try the live demos</span>
                    <span className="label-short">Live demos</span>
                  </Btn>
                  <Btn to="/features" cursor="Features" aria-label="See every feature">
                    <span className="label-long">See every feature</span>
                    <span className="label-short">All features</span>
                  </Btn>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ── The problem ──────────────────────────────────────────────────────── */
function Problem() {
  const steps = [
    {
      n: "01",
      t: "The punch",
      d: "Face terminals, geo-fenced phones and on-duty photos feed one record.",
    },
    {
      n: "02",
      t: "The rule",
      d: "Late windows, permissions and shift ladders judge each day - with a reason.",
    },
    {
      n: "03",
      t: "The approval",
      d: "Requests move through HOD and HR pipelines, inside an open window.",
    },
    {
      n: "04",
      t: "The payslip",
      d: "Payroll reads the month. Nothing is typed in twice, so nothing drifts.",
    },
  ];
  return (
    <Section tone="cream" className="section problem" id="problem">
      <div className="container problem-grid">
        <div className="problem-side">
          <Reveal>
            <span className="kicker">The problem</span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="problem-note">
              Every argument at the pay counter starts in the same place.
            </p>
          </Reveal>
        </div>
        <ScrollText
          className="problem-text"
          text="In most units the month is assembled *twice* - once as punches, once more at month end as a salary sheet someone types by hand. Two records of the same month always drift apart. Zyraa keeps *one record* and payroll reads it."
        />
      </div>
      <div className="container problem-steps">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08} className="problem-step">
            <span className="problem-step-n">{s.n}</span>
            <h3 className="h3">{s.t}</h3>
            <p>{s.d}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Three apps (horizontal scroll on desktop) ───────────────────────── */
const APP_SCREENS = {
  admin: () => (
    <BrowserFrame url="hr.zyraa / payroll">
      <AdminPayroll />
    </BrowserFrame>
  ),
  web: () => (
    <BrowserFrame url="my.zyraa / dashboard">
      <WebDashboard />
    </BrowserFrame>
  ),
  mobile: () => (
    <PhoneFrame>
      <MobileHome />
    </PhoneFrame>
  ),
};

function AppPanel({ app }) {
  const Screen = APP_SCREENS[app.id];
  return (
    <article className={`app-panel app-panel--${app.id}`}>
      <div className="app-panel-copy">
        <span className="app-panel-code figure">{app.code}</span>
        <h3 className="app-panel-name">{app.name}</h3>
        <span className="chip">{app.who}</span>
        <p>{app.blurb}</p>
        <ul className="dot-list">
          {app.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="app-panel-screen">
        <Screen />
      </div>
    </article>
  );
}

function Apps() {
  const ref = useRef(null);
  const wide = useMedia("(min-width: 1000px)");
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  // Four panels with a hold on each, so every app rests centred for a stretch
  // of scrolling before the next one slides in.
  const x = useTransform(
    smooth,
    [0, 0.1, 0.3, 0.4, 0.6, 0.7, 0.9, 1],
    ["0%", "0%", "-25%", "-25%", "-50%", "-50%", "-75%", "-75%"],
  );
  const bar = useTransform(smooth, [0, 1], [0, 1]);
  const horizontal = wide && !reduced;

  return (
    <Section
      tone="indigo"
      className={`apps ${horizontal ? "apps--h" : ""}`}
      id="apps"
    >
      <div ref={ref} className="apps-track">
        <div className="apps-sticky">
          <motion.div
            className="apps-rail"
            style={horizontal ? { x } : undefined}
          >
            <div className="apps-intro">
              <span className="kicker">Three ways in</span>
              <SplitWords
                as="h2"
                className="h1"
                text="One system. Three apps."
                accent="Three apps."
              />
              <p className="lede">
                HR runs the month from the admin portal. Employees check their
                own month in the browser. Anything that needs a location, a
                camera or the gate happens on the phone - including approvals.
              </p>
              <Btn to="/apps" cursor="Apps">
                Tour the apps
              </Btn>
            </div>
            {site.apps.map((app) => (
              <AppPanel key={app.id} app={app} />
            ))}
          </motion.div>
          {horizontal && (
            <div className="apps-progress" aria-hidden="true">
              <motion.span style={{ scaleX: bar }} />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ── Numbers ──────────────────────────────────────────────────────────── */
function Numbers() {
  const items = [
    {
      v: site.stats.reports,
      s: "+",
      l: "ready-made reports, every one to Excel and PDF",
    },
    {
      v: site.stats.requestTypes,
      l: "request types, each with its own approval pipeline",
    },
    { v: 3, d: 2, l: "shifts a production worker can earn in one day" },
    {
      v: site.stats.reportCategories,
      l: "report categories, from muster roll to MD brief",
    },
    {
      v: site.stats.aiTools,
      s: "+",
      l: "read-only analytics tools behind the MD assistant",
    },
    {
      v: site.stats.payCycles,
      l: "pay cycles side by side: weekly, bi-weekly, monthly",
    },
  ];
  return (
    <Section tone="ink" className="section numbers">
      <div className="container">
        <div className="numbers-head">
          <span className="kicker">By the numbers</span>
          <SplitWords
            as="h2"
            className="h2"
            text="Built for the whole factory, not just the office."
            accent="whole factory,"
          />
        </div>
        <div className="numbers-grid">
          {items.map((it, i) => (
            <Reveal key={it.l} delay={(i % 3) * 0.08} className="number">
              <CountUp
                className="number-value figure"
                value={it.v}
                decimals={it.d || 0}
                suffix={it.s || ""}
              />
              <p>{it.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Arrival mini-demo ────────────────────────────────────────────────── */
function ArrivalMini() {
  const [t, setT] = useState(hm(9, 35));
  const verdict = judgeArrival(t, { permission: false });
  const zones = arrivalZones();
  const min = hm(8, 30);
  const max = hm(13);
  const pct = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div className="mini card">
      <div className="mini-head">
        <span className="kicker">Drag the first punch</span>
        <span className="mini-time figure">{fmtTime(t)}</span>
      </div>
      <div className="mini-track">
        {zones.slice(0, 5).map((z) => (
          <span
            key={z.id}
            className={`mini-zone mini-zone--${z.id} ${verdict.zone === z.id ? "is-on" : ""}`}
            style={{
              left: `${Math.max(0, pct(z.from))}%`,
              width: `${Math.min(100, pct(z.to)) - Math.max(0, pct(z.from))}%`,
            }}
          />
        ))}
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          aria-label="First punch time"
        />
      </div>
      <div className="mini-out">
        <span className="figure mini-value">{fmtShift(verdict.value)}</span>
        <p>{verdict.reason}</p>
      </div>
    </div>
  );
}

function DemoTeaser() {
  const demos = [
    ["arrival-timeline", "Arrival timeline", "Five zones, one reason sentence"],
    ["production-day", "Try a production day", "Shifts earned by the minute"],
    ["approvals", "Approval pipeline", "HOD, HR, or whoever is first"],
    ["staff-payroll", "Payslip builder", "From the month to net pay"],
    ["geo-on-duty", "Geo punch & on-duty", "Inside the fence, or not"],
    ["report-center", "Report Center", "Search all 148 reports"],
  ];
  return (
    <Section tone="mist" className="section demo-teaser">
      <div className="container demo-teaser-grid">
        <div>
          <span className="kicker">Live demos</span>
          <SplitWords
            as="h2"
            className="h2"
            text="Don't read about the rules. Play with them."
            accent="Play with them."
          />
          <p className="lede">
            Every demo runs the same rules the product ships with - the late
            window, the quarter-shift, the production ladder, the request
            window. Change an input and watch the verdict change.
          </p>
          <ArrivalMini />
        </div>
        <div className="demo-teaser-list">
          {demos.map(([slug, t, d], i) => (
            <Reveal key={slug} delay={i * 0.05}>
              <Link
                to={`/demos/${slug}`}
                className="demo-teaser-link"
                data-cursor="Play"
              >
                <span className="demo-teaser-n">0{i + 1}</span>
                <span className="demo-teaser-t">
                  <strong>{t}</strong>
                  <small>{d}</small>
                </span>
                <ArrowUpRight />
              </Link>
            </Reveal>
          ))}
          <Btn to="/demos" solid cursor="Demos">
            All demos
          </Btn>
        </div>
      </div>
    </Section>
  );
}

/* ── Flow ─────────────────────────────────────────────────────────────── */
function Flow() {
  const steps = [
    {
      t: "Punch",
      d: "Face terminal, geo punch or on-duty photo. Two taps inside 5 minutes count once.",
    },
    {
      t: "Judge",
      d: "The shift's windows decide the day - and write the reason in plain words.",
    },
    {
      t: "Request",
      d: "Missed punch? Permission? Raised from the phone, inside the open window.",
    },
    {
      t: "Approve",
      d: "Department head, then HR - or whoever acts first. Every step on the trail.",
    },
    {
      t: "Pay",
      d: "Generate, review each priced issue, mark paid. Slips go out by PDF, email or WhatsApp.",
    },
  ];
  return (
    <Section tone="butter" className="section flow">
      <div className="container flow-head">
        <span className="kicker">How a month closes</span>
        <SplitWords
          as="h2"
          className="h1"
          text="From the punch to the payslip."
          accent="payslip."
        />
      </div>
      <div className="container flow-body">
        <StitchLine d="M60 0 C 60 160, 940 140, 940 300 S 60 460, 60 620 S 940 780, 940 1000" />
        <ol className="flow-list">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.t}
              delay={0.05}
              className={`flow-step ${i % 2 ? "flow-step--r" : ""}`}
            >
              <span className="flow-step-n figure">0{i + 1}</span>
              <div>
                <h3 className="flow-step-t">{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ── Pillars ──────────────────────────────────────────────────────────── */
function Pillars() {
  return (
    <Section tone="sage" className="section pillars">
      <div className="container">
        <div className="pillars-head">
          <span className="kicker">Everything the month needs</span>
          <SplitWords
            as="h2"
            className="h2"
            text="Five pillars, one record."
            accent="one record."
          />
        </div>
        <div className="pillars-grid">
          {site.pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <Link
                to={`/features#${p.id}`}
                className={`pillar tone-${p.tone}`}
                data-cursor="Open"
              >
                <span className="pillar-n figure">0{i + 1}</span>
                <span className="pillar-name">{p.name}</span>
                <span className="pillar-title">{p.title}</span>
                <ul>
                  {p.modules.map((m) => (
                    <li key={m.id}>{m.name}</li>
                  ))}
                </ul>
                <ArrowUpRight className="pillar-arrow" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Journal ──────────────────────────────────────────────────────────── */
function Journal() {
  const latest = posts.slice(0, 3);
  return (
    <Section tone="sand" className="section journal">
      <div className="container">
        <div className="journal-head">
          <div>
            <span className="kicker">The journal</span>
            <SplitWords
              as="h2"
              className="h2"
              text="Notes from the floor."
              accent="the floor."
            />
          </div>
          <Btn to="/blogs" cursor="Read">
            All articles
          </Btn>
        </div>
        <div className="journal-grid">
          {latest.map((p, i) => (
            <JournalCard key={p.slug} post={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <main className="page home">
      <Seo
        path="/"
        description="Zyraa is the HRMS built for garment and knitwear units: biometric attendance, shift rules, approvals, staff and production payroll, gate passes and 140+ reports."
      />
      <Hero />
      <Section tone="night" as="div" className="home-marquee">
        <Marquee
          items={[
            "Biometric attendance",
            "Production pay",
            "Approvals",
            "Gate passes",
            "Geo on-duty",
            "Payslips",
            "140+ reports",
            "MD portal",
          ]}
        />
      </Section>
      <Problem />
      <Apps />
      <Numbers />
      <Flow />
      <Pillars />
      <DemoTeaser />
      <Journal />
      <Footer />
    </main>
  );
}
