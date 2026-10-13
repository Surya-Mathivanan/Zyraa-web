import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import FadingStars from "../components/FadingStars.jsx";
import SignalType from "../components/SignalType.jsx";
import ScrollCircle from "../components/ScrollCircle.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { site } from "../data/site.js";
import { scrollToSelector } from "../hooks/useLenis.js";
import "./home.css";

const ease = [0.2, 0.8, 0.2, 1];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6M8 6H18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section className="hero" ref={ref} id="hero">
      <FadingStars className="hero-stars" count={120} speed={1} trail={1.1} />
      <div className="hero-glow" aria-hidden="true" />
      <div className="grain" />

      <motion.div className="container hero-inner" style={{ y: contentY, opacity: fade }}>
        <Reveal delay={0.1}>
          <span className="kicker">HRMS · {site.location.city}</span>
        </Reveal>

        <h1 className="sr-only">Zyraa HRMS</h1>
        <SignalType text="ZYRAA" className="hero-wordmark" />

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
        >
          {site.tagline}
        </motion.p>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease }}
        >
          Biometric attendance, staff and production payroll, leave and permission approvals, geo on-duty
          tracking and {site.stats.reports}+ reports. One record of the month, three ways in.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
        >
          <Link className="pill-action" to="/features" data-cursor="Features">
            <span className="pill">See what it does</span>
            <span className="pill-arrow">
              <Arrow />
            </span>
          </Link>
          <a className="hero-chip" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
            <span className="hero-chip-dot" aria-hidden="true" />
            Call <span className="hero-chip-phone">{site.primaryPhone.label}</span>
          </a>
          <a
            className="hero-chip"
            href={`https://wa.me/${site.primaryPhone.raw}`}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="Chat"
          >
            <span className="hero-chip-dot" aria-hidden="true" />
            WhatsApp
          </a>
        </motion.div>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.95 }}
        >
          <span>{site.stats.modules} modules</span>
          <span>{site.stats.surfaces} apps</span>
          <span>{site.stats.approvalTypes} approval pipelines</span>
          <span>{site.stats.reports}+ reports</span>
        </motion.div>
      </motion.div>

      <div className="hero-scroll">
        <ScrollCircle onClick={() => scrollToSelector("#intro")} />
      </div>
    </section>
  );
}

function Intro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["5%", "-12%"]);

  const stats = [
    { value: `${site.stats.reports}+`, label: "Ready-made reports for compliance and oversight" },
    { value: site.stats.approvalTypes, label: "Approval pipelines, each with its own route and audit trail" },
    { value: site.stats.surfaces, label: "Apps: admin portal, employee web and mobile" },
    { value: "1", label: "Record of the month. Payroll reads it rather than rebuilding it" },
  ];

  return (
    <section className="intro" id="intro" ref={ref}>
      <motion.div className="intro-ghost" style={{ x: ghostX }} aria-hidden="true">
        ATTENDANCE · PAYROLL · PEOPLE
      </motion.div>
      <div className="container intro-grid">
        <div className="intro-left">
          <Reveal>
            <span className="kicker">What Zyraa is</span>
          </Reveal>
          <SplitWords
            as="h2"
            className="intro-title"
            text="Salary is calculated from the attendance already in the system."
            delay={0.1}
          />
        </div>
        <div className="intro-right">
          <Reveal delay={0.15}>
            <p className="intro-text">
              In most units the month is assembled twice: once as attendance, then again at month end as a
              salary sheet. Every disagreement lives in that second pass. Zyraa keeps one record — punches,
              leave, permissions, late deductions and advance EMIs — and payroll reads it. Nothing is
              re-entered, so nothing drifts.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link className="pill-action" to="/features" data-cursor="Modules">
              <span className="pill">Browse the modules</span>
              <span className="pill-arrow">
                <Arrow />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="container stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="stat">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Biometric attendance",
    "Staff payroll",
    "Production payroll",
    "Leave & permissions",
    "Geo on-duty",
    "Advances",
    "MD portal",
  ];
  const track = [...items, ...items];
  return (
    <div className="marquee home-marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i}>
            {item} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function Surfaces() {
  return (
    <section className="surfaces">
      <div className="container surfaces-head">
        <Reveal>
          <span className="kicker">Three ways in</span>
        </Reveal>
        <SplitWords as="h2" className="surfaces-title" text="One system. Three apps." delay={0.05} />
        <Reveal delay={0.2}>
          <p className="surfaces-text">
            HR runs the month from the admin portal. Employees check their own data from the browser or the
            phone. Department heads approve from wherever they are standing.
          </p>
        </Reveal>
      </div>
      <div className="container surfaces-grid">
        {site.surfaces.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.1} className="surface-card">
            <div className="surface-card-top">
              <span className="surface-code">{s.code}</span>
              <span className="surface-who">{s.who}</span>
            </div>
            <h3>{s.name}</h3>
            <p>{s.blurb}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ModuleCard({ module: m, index }) {
  const ref = useRef(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(139, 124, 255, 0.16), transparent 62%)`
  );

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 9);
    rx.set((0.5 - py) * 9);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Reveal delay={index * 0.07} className="module-card-wrap">
      <motion.div
        ref={ref}
        className="module-card"
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div className="module-card-glow" style={{ background: glow }} aria-hidden="true" />
        <div className="module-card-top">
          <span className="module-code">{m.code}</span>
          <span className="module-short">{m.short}</span>
        </div>
        <h3 className="module-name">{m.name}</h3>
        <p className="module-blurb">{m.blurb}</p>
        <Link className="module-link" to={`/features#${m.id}`} data-cursor="Open">
          See details <Arrow />
        </Link>
      </motion.div>
    </Reveal>
  );
}

function Modules() {
  return (
    <section className="home-modules">
      <div className="container home-modules-head">
        <Reveal>
          <span className="kicker">Modules</span>
        </Reveal>
        <SplitWords as="h2" className="home-modules-title" text="Everything the month needs." delay={0.05} />
      </div>
      <div className="container module-grid">
        {site.modules.map((m, i) => (
          <ModuleCard key={m.id} module={m} index={i} />
        ))}
      </div>
    </section>
  );
}

function Flow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);

  const steps = [
    { n: "01", t: "The punch", d: "Biometric devices on the factory network sync into Zyraa, in Strict or Simple mode." },
    { n: "02", t: "The request", d: "Leave, permissions and missing-punch claims are raised from the mobile app, for the current month." },
    { n: "03", t: "The approval", d: "Employee to department head to HR. Seven pipelines, every action logged with who, when and why." },
    { n: "04", t: "The payroll", d: "Draft, review, publish, lock. LOP, late slabs, PF, ESI and EMIs are already attached to the month." },
  ];

  return (
    <section className="flow" ref={ref}>
      <div className="container flow-head">
        <Reveal>
          <span className="kicker">How a month closes</span>
        </Reveal>
        <SplitWords as="h2" className="flow-title" text="From the punch to the payslip." delay={0.05} />
      </div>
      <div className="container flow-track">
        <motion.span className="flow-line" style={{ scaleY: lineScale }} aria-hidden="true" />
        <ul className="flow-list">
          {steps.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 0.1} className="flow-item">
              <span className="flow-n">{s.n}</span>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="home-cta">
      <FadingStars className="home-cta-stars" count={70} speed={0.85} trail={1.3} opacity={0.85} />
      <div className="home-cta-fade" aria-hidden="true" />
      <div className="container home-cta-inner">
        <Reveal>
          <span className="kicker">Next step</span>
        </Reveal>
        <SplitWords as="h2" className="home-cta-title" text="Bring one month of attendance." delay={0.05} />
        <Reveal delay={0.25}>
          <p className="home-cta-text">
            The fastest way to judge Zyraa is to run a month you already know the answer to. Call and we will
            set it up.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a className="home-cta-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
            {site.primaryPhone.label}
          </a>
        </Reveal>
        <Reveal delay={0.35}>
          <Link className="pill-action" to="/contact" data-cursor="Demo">
            <span className="pill">Book a demo</span>
            <span className="pill-arrow">
              <Arrow />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="page home">
      <Seo
        path="/"
        description="Zyraa is an HRMS for manufacturing units: biometric attendance, staff and production payroll, leave and permission approvals, geo on-duty and 140+ reports."
      />
      <Hero />
      <Intro />
      <Marquee />
      <Surfaces />
      <Modules />
      <Flow />
      <CTA />
      <Footer />
    </main>
  );
}
