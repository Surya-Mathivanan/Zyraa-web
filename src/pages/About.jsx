import { useRef } from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import Btn from "../components/Btn.jsx";
import CountUp from "../components/CountUp.jsx";
import ScrollText from "../components/ScrollText.jsx";
import StitchLine from "../components/StitchLine.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { site } from "../data/site.js";
import { useParallax } from "../hooks/useParallax.js";
import { useMedia } from "../hooks/useMedia.js";
import "./about.css";

function AboutHero() {
  const ref = useRef(null);
  const rotate = useParallax(ref, [0, 90], {
    offset: ["start start", "end start"],
  });
  const y = useParallax(ref, ["0%", "30%"], {
    offset: ["start start", "end start"],
  });
  // On phones the emblem sits in the column above the heading, so it only
  // turns; drifting down would carry it onto the text.
  const inColumn = useMedia("(max-width: 760px)");
  return (
    <Section tone="sand" className="ab-hero">
      <div ref={ref} className="ab-hero-inner container">
        <motion.img
          className="ab-hero-emblem"
          src="/assets/emblem.webp"
          alt=""
          width="512"
          height="512"
          style={{ rotate, y: inColumn ? 0 : y }}
          aria-hidden="true"
        />
        <Reveal>
          <span className="kicker">About · {site.productName}</span>
        </Reveal>
        <h1
          className="ab-hero-title"
          aria-label="Built for one industry, by one developer."
        >
          <SplitWords
            as="span"
            className="ab-line"
            text="Built for"
            delay={0.1}
          />
          <SplitWords
            as="span"
            className="ab-line ab-line--accent"
            text="one industry,"
            delay={0.2}
          />
          <SplitWords
            as="span"
            className="ab-line"
            text="by one developer."
            delay={0.3}
          />
        </h1>
        <Reveal delay={0.5} className="ab-hero-meta">
          <span>{site.location.label}</span>
          <span>Garment &amp; knitwear units</span>
          <span>HRMS only</span>
        </Reveal>
      </div>
    </Section>
  );
}

function Story() {
  return (
    <Section tone="cream" className="section ab-story">
      <div className="container ab-story-grid">
        <div className="ab-story-side">
          <span className="kicker">Why Zyraa exists</span>
          <p className="ab-story-quote">
            “If it isn't in the system, it didn't happen - for payroll.”
          </p>
        </div>
        <div className="ab-story-main">
          <ScrollText
            className="ab-story-lead"
            text="A garment unit runs on *two clocks*. The office closes the month; the floor closes the week. Attendance is recorded carefully, then typed in again at month end - and the second copy is where every dispute lives."
          />
          <Reveal>
            <p>
              Zyraa was built to remove that second pass. Punches arrive from
              the face terminals on the factory network. Leave, permissions and
              missing-punch claims are raised by the employee and decided by the
              department head. Late windows, shift ladders and deduction slabs
              are policy, set once. By the time payroll runs, the month is
              already decided - and payroll is a review, not a reconstruction.
            </p>
          </Reveal>
          <Reveal>
            <p>
              The rules that look strict are the ones that make the register
              defensible. Requests close on the second of the month. Overrides
              need a reason and a second person. A paid month is never judged
              again. Every one of those decisions exists so the number on a
              payslip can be explained, months later, to the person standing at
              the counter.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Proof() {
  const items = [
    { v: 118, l: "data models behind one record of the month" },
    {
      v: 6500,
      s: "+",
      l: "automated backend tests, checking the rules on every change",
    },
    { v: 148, l: "registered reports, each to Excel and PDF" },
    { v: 3, l: "apps - admin, web and mobile - on one backend" },
  ];
  return (
    <Section tone="rust" className="section ab-proof">
      <div className="container">
        <div className="ab-proof-head">
          <span className="kicker">What the code says</span>
          <SplitWords
            as="h2"
            className="h2"
            text="Small team. Serious system."
            accent="Serious system."
          />
        </div>
        <div className="ab-proof-grid">
          {items.map((it, i) => (
            <Reveal key={it.l} delay={i * 0.08} className="ab-proof-item">
              <CountUp
                className="figure ab-proof-value"
                value={it.v}
                suffix={it.s || ""}
                duration={1800}
              />
              <p>{it.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

const principles = [
  {
    t: "One record",
    d: "Attendance, requests and deductions live in one place. Payroll reads it rather than rebuilding it.",
  },
  {
    t: "Policy, not habit",
    d: "Late windows, grace and slabs are configured once and applied the same way to everyone, every month.",
  },
  {
    t: "Explainable later",
    d: "Every day stores its reason; every change stores who, when and why. A number you cannot explain is not finished.",
  },
  {
    t: "Fair by design",
    d: "A late arrival costs a quarter shift, not half a day. Extra hours earn an allowance. Breaks are never paid, never punched.",
  },
  {
    t: "Built where it runs",
    d: "Designed against real factory floors - LANs the cloud can't reach, shared phones, workers who don't do passwords.",
  },
];

function Principles() {
  return (
    <Section tone="cream" className="section ab-principles">
      <div className="container">
        <div className="ab-principles-head">
          <span className="kicker">How it is built</span>
          <SplitWords
            as="h2"
            className="h2"
            text="Five decisions that shape everything."
            accent="shape everything."
          />
        </div>
        <div className="ab-principles-body">
          <StitchLine d="M40 0 L 40 1000" offset={["start 80%", "end 60%"]} />
          <ol className="ab-principles-list">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.t} delay={0.05} className="ab-principle">
                <span className="ab-principle-n figure">0{i + 1}</span>
                <div>
                  <h3 className="ab-principle-t">{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

function Maker() {
  return (
    <Section tone="night" className="section ab-maker" id="developer">
      <div className="container ab-maker-grid">
        <Reveal className="ab-maker-mono">
          <span className="display" aria-hidden="true">
            {site.developer.name.slice(0, 1)}
          </span>
        </Reveal>
        <div className="ab-maker-body">
          <span className="kicker">The developer</span>
          <SplitWords as="h2" className="h1" text={site.developer.name} />
          <Reveal delay={0.1}>
            <p className="lede">{site.developer.blurb}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lede">
              There is no account manager and no tier-one queue. The number on
              this site reaches the developer, and a bug report goes straight to
              the person who can fix it - usually the same day.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="btn-row">
            <Btn href={`tel:+${site.primaryPhone.raw}`} solid cursor="Call">
              {site.primaryPhone.label}
            </Btn>
            <Btn to="/contact" cursor="Contact">
              Write instead
            </Btn>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export default function About() {
  return (
    <main className="page about">
      <Seo
        title="About"
        path="/about"
        description={`Zyraa is an HRMS for garment and knitwear units, designed and built by ${site.developer.name} in ${site.location.city}: one record of the month, explainable later.`}
      />
      <AboutHero />
      <Story />
      <Proof />
      <Principles />
      <Maker />
      <Footer />
    </main>
  );
}
