import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import FadingStars from "../components/FadingStars.jsx";
import ShatterType from "../components/ShatterType.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { site } from "../data/site.js";
import { useMedia } from "../hooks/useMedia.js";
import "./features.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6M8 6H18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturesHero() {
  const ref = useRef(null);
  const mobile = useMedia("(max-width: 760px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="features-hero" ref={ref}>
      <FadingStars count={90} speed={0.95} trail={1.15} />
      <div className="features-hero-glow" aria-hidden="true" />
      <div className="grain" />
      <motion.div className="container features-hero-inner" style={{ y: contentY, opacity }}>
        <Reveal delay={0.1}>
          <span className="kicker">Features · {site.productName}</span>
        </Reveal>
        <ShatterType
          key={mobile ? "m" : "d"}
          text="ONE RECORD OF THE MONTH."
          className="features-hero-title"
          cols={mobile ? 5 : 8}
          rows={3}
          as="h1"
        />
        <div className="features-hero-row">
          <Reveal delay={0.6}>
            <p className="features-hero-text">
              {site.stats.modules} modules that share one attendance record, {site.stats.approvalTypes} approval
              pipelines and {site.stats.reports}+ reports. Built for units where the office closes monthly and
              the floor closes weekly.
            </p>
          </Reveal>
          <Reveal delay={0.7} className="features-hero-tags">
            {site.modules.slice(0, 4).map((m) => (
              <a key={m.id} href={`#${m.id}`}>
                {m.short}
              </a>
            ))}
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

function ModuleRow({ module: m, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], index % 2 ? ["-9%", "9%"] : ["9%", "-9%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.07, 0]);

  return (
    <article className={`module-row ${index % 2 ? "module-row--alt" : ""}`} id={m.id} ref={ref}>
      <motion.div className="module-row-ghost" style={{ x: ghostX, opacity: ghostOpacity }} aria-hidden="true">
        {m.short}
      </motion.div>
      <div className="container module-row-grid">
        <div className="module-row-side">
          <Reveal>
            <span className="module-row-code">{m.code}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="module-row-short">{m.short}</h2>
          </Reveal>
        </div>
        <div className="module-row-main">
          <SplitWords as="h3" className="module-row-name" text={m.name} delay={0.05} stagger={0.04} />
          <Reveal delay={0.15}>
            <p className="module-row-blurb">{m.blurb}</p>
          </Reveal>
          <ul className="module-row-features">
            {m.features.map((f, i) => (
              <Reveal key={f} as="li" delay={0.2 + i * 0.05}>
                <span className="feature-dot" />
                {f}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.4} className="module-row-actions">
            <Link className="pill-action" to="/contact" data-cursor="Demo">
              <span className="pill">See it on your data</span>
              <span className="pill-arrow">
                <Arrow />
              </span>
            </Link>
            <a className="module-row-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
              or call {site.primaryPhone.label}
            </a>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function Roles() {
  return (
    <section className="roles" id="roles">
      <div className="container">
        <div className="roles-head">
          <Reveal>
            <span className="kicker">Roles &amp; permissions</span>
          </Reveal>
          <SplitWords as="h2" className="roles-title" text="Everyone sees exactly their own job." delay={0.05} />
          <Reveal delay={0.2}>
            <p className="roles-text">
              Permissions are set per module, per user: Full, View or Hidden. Department approvers only ever see
              their own departments, and employees only ever see themselves.
            </p>
          </Reveal>
        </div>
        <div className="roles-list">
          {site.roles.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07} className="role-row">
              <span className="role-n">{String(i + 1).padStart(2, "0")}</span>
              <strong>{r.name}</strong>
              <span>{r.detail}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const mobileFeatures = [
  "Leave requests, multi-day and half-day",
  "Late-In, Early-Out and mid-shift permissions",
  "Missing-punch claims for past dates",
  "GPS on-duty sessions with selfie punch",
  "Approver dashboard for department heads",
  "Voice input in Tamil, Hindi and English",
];

const adminFeatures = [
  "Biometric device registration and status",
  "Site connectors for factory-network devices",
  "Shift creation for staff and production",
  "Bulk import, export and attendance correction",
  "Scheduled backups with offsite copies",
  "Activity logging, including odd-hours access",
];

function Platform() {
  return (
    <section className="platform">
      <div className="container platform-grid">
        <Reveal className="platform-card">
          <span className="kicker">Mobile app</span>
          <h2>Approvals from the floor.</h2>
          <p>
            Employees raise requests and department heads clear them without walking to the office. Every action
            carries who approved it, when, and with what comment.
          </p>
          <ul>
            {mobileFeatures.map((f) => (
              <li key={f}>
                <span className="feature-dot" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.12} className="platform-card">
          <span className="kicker">Administration</span>
          <h2>The parts nobody should think about.</h2>
          <p>
            Devices, shifts, policies and backups. Set the late windows and the deduction slabs once and the
            month applies them for you.
          </p>
          <ul>
            {adminFeatures.map((f) => (
              <li key={f}>
                <span className="feature-dot" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { t: "Every override is logged", d: "Manual attendance changes need a reason, and the reason is stored with the user and the timestamp." },
    { t: "Current-month requests only", d: "A published month stays published. Corrections go through a reviewed claim instead." },
    { t: "Session locking", d: "Payroll moves Draft → Published → Paid, and a locked session cannot be quietly edited." },
    { t: "Spoof detection", d: "Simulated-location punches are flagged rather than silently accepted." },
  ];
  return (
    <section className="trust">
      <div className="container">
        <div className="trust-head">
          <Reveal>
            <span className="kicker">Why the numbers hold</span>
          </Reveal>
          <SplitWords as="h2" className="trust-title" text="A register you can defend." delay={0.05} />
        </div>
        <div className="trust-grid">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.09} className="trust-card">
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesCTA() {
  return (
    <section className="features-cta">
      <FadingStars count={60} speed={0.8} trail={1.35} opacity={0.8} />
      <div className="features-cta-fade" aria-hidden="true" />
      <div className="container features-cta-inner">
        <Reveal>
          <span className="kicker">Next step</span>
        </Reveal>
        <SplitWords as="h2" className="features-cta-title" text="Run one month and compare." delay={0.05} />
        <Reveal delay={0.25}>
          <a className="features-cta-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
            {site.primaryPhone.label}
          </a>
        </Reveal>
        <Reveal delay={0.3}>
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

export default function Features() {
  return (
    <main className="page features">
      <Seo
        title="Features"
        path="/features"
        description={`${site.stats.modules} modules on one attendance record: biometric attendance, staff and production payroll, leave and permissions, geo on-duty, advances and ${site.stats.reports}+ reports.`}
      />
      <FeaturesHero />
      <div className="module-list">
        {site.modules.map((m, i) => (
          <ModuleRow key={m.id} module={m} index={i} />
        ))}
      </div>
      <Roles />
      <Platform />
      <Trust />
      <FeaturesCTA />
      <Footer />
    </main>
  );
}
