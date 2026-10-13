import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import FadingStars from "../components/FadingStars.jsx";
import ScrollCircle from "../components/ScrollCircle.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { site } from "../data/site.js";
import { scrollToSelector } from "../hooks/useLenis.js";
import "./about.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6M8 6H18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AboutHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="about-hero" ref={ref}>
      <FadingStars count={100} speed={0.9} trail={1.2} />
      <div className="about-hero-glow" aria-hidden="true" />
      <div className="grain" />
      <motion.div className="container about-hero-inner" style={{ y, opacity }}>
        <Reveal delay={0.1}>
          <span className="kicker">About · {site.productName}</span>
        </Reveal>
        <SplitWords
          as="h1"
          className="about-hero-title"
          text="Built for one problem, by one developer."
          delay={0.2}
          stagger={0.08}
        />
        <div className="about-hero-row">
          <Reveal delay={0.5}>
            <p className="about-hero-text">
              Zyraa is not a general-purpose HR suite with a manufacturing module bolted on. It is an HRMS for
              units where attendance is complicated, payroll runs on more than one cycle, and the register has
              to survive a question six months later.
            </p>
          </Reveal>
          <Reveal delay={0.6} className="about-hero-meta">
            <span>{site.location.label}</span>
            <span>One developer</span>
            <span>HRMS only</span>
          </Reveal>
        </div>
      </motion.div>
      <motion.div
        className="about-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <ScrollCircle onClick={() => scrollToSelector("#story")} />
      </motion.div>
    </section>
  );
}

function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const driftA = useTransform(scrollYProgress, [0, 1], ["-16%", "16%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section className="about-story" id="story" ref={ref}>
      <motion.span className="about-thread about-thread-1" style={{ y: driftA }} aria-hidden="true" />
      <motion.span className="about-thread about-thread-2" style={{ y: driftB }} aria-hidden="true" />
      <div className="container about-story-grid">
        <div className="about-story-side">
          <Reveal>
            <span className="kicker">The problem</span>
          </Reveal>
        </div>
        <div className="about-story-main">
          <SplitWords
            as="h2"
            className="about-story-title"
            text="A register nobody fully trusted."
            delay={0.05}
          />
          <Reveal delay={0.15}>
            <p>
              Attendance gets recorded carefully all month. Then, at month end, somebody reads it and types it
              again into a salary sheet. Two records of the same month, maintained by different hands, will
              always drift — and the drift is what the worker is standing in front of you about.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p>
              Zyraa was built to remove the second pass. Punches arrive from the biometric devices. Leave,
              permissions and missing-punch claims are raised by the employee and approved by the department
              head. Late windows and deduction slabs are policy, set once. By the time payroll runs, the month
              is already decided, and payroll is a review rather than a reconstruction.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              The rules that look restrictive are the ones that make the register defensible. Requests are
              current-month only. Overrides need a reason. A published payroll session locks. Every one of those
              decisions exists so the number can be explained later.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const principles = [
  { n: "01", t: "One record", d: "Attendance, requests and deductions live in one place, and payroll reads it rather than rebuilding it." },
  { n: "02", t: "Policy, not habit", d: "Late windows, grace periods and slabs are configured once and applied the same way every month." },
  { n: "03", t: "Explainable later", d: "Everything is logged with who did it, when, and why. A number you cannot explain is not finished." },
  { n: "04", t: "Built where it runs", d: `Designed in ${site.location.city}, against real factory floors rather than a requirements document.` },
];

function Principles() {
  return (
    <section className="about-principles">
      <div className="container">
        <div className="about-principles-head">
          <Reveal>
            <span className="kicker">How it is built</span>
          </Reveal>
          <SplitWords as="h2" className="about-principles-title" text="Four decisions that shape everything." delay={0.05} />
        </div>
        <ul className="about-principles-list">
          {principles.map((p, i) => (
            <Reveal key={p.n} as="li" delay={i * 0.09} className="about-principle">
              <span className="about-principle-n">{p.n}</span>
              <div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Maker() {
  return (
    <section className="about-maker" id="developer">
      <div className="container about-maker-grid">
        <Reveal className="about-maker-card">
          <span className="about-maker-mono" aria-hidden="true">
            {site.developer.name.slice(0, 1)}
          </span>
          <div className="about-maker-body">
            <span className="kicker">The developer</span>
            <h2>{site.developer.name}</h2>
            <p className="about-maker-role">{site.developer.role}</p>
            <p>{site.developer.blurb}</p>
            <p>
              Zyraa is designed, written, deployed and supported by one person. There is no account manager and
              no tier-one queue: the number on this site reaches the developer, and a bug report goes straight to
              the person who can fix it.
            </p>
            <div className="about-maker-actions">
              <a className="about-maker-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
                {site.primaryPhone.label}
              </a>
              <Link className="pill-action" to="/contact" data-cursor="Contact">
                <span className="pill">Get in touch</span>
                <span className="pill-arrow">
                  <Arrow />
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="about-cta">
      <FadingStars count={60} speed={0.8} trail={1.3} opacity={0.8} />
      <div className="about-cta-fade" aria-hidden="true" />
      <div className="container about-cta-inner">
        <Reveal>
          <span className="kicker">Next step</span>
        </Reveal>
        <SplitWords as="h2" className="about-cta-title" text="See it against a month you know." delay={0.05} />
        <Reveal delay={0.3}>
          <Link className="pill-action" to="/features" data-cursor="Features">
            <span className="pill">What Zyraa does</span>
            <span className="pill-arrow">
              <Arrow />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="page about">
      <Seo
        title="About"
        path="/about"
        description={`Zyraa is an HRMS for manufacturing units, designed and built by ${site.developer.name} in ${site.location.city}. One record of the month, built to be explainable later.`}
      />
      <AboutHero />
      <Story />
      <Principles />
      <Maker />
      <AboutCTA />
      <Footer />
    </main>
  );
}
