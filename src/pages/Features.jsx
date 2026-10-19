import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadingStars from "../components/FadingStars.jsx";
import ShatterType from "../components/ShatterType.jsx";
import Section from "../components/Section.jsx";
import FitText from "../components/FitText.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import Btn from "../components/Btn.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { ArrowUpRight, Play } from "../components/Icons.jsx";
import { site } from "../data/site.js";
import { reports, reportCategories } from "../data/reports.js";
import { useMedia } from "../hooks/useMedia.js";
import { scrollToSelector } from "../hooks/useLenis.js";
import "./features.css";

function FeaturesHero() {
  const mobile = useMedia("(max-width: 760px)");
  const moduleCount = site.pillars.reduce((n, p) => n + p.modules.length, 0);
  return (
    <Section tone="ink" className="f-hero">
      <FadingStars
        count={90}
        speed={0.9}
        trail={1.15}
        colors={["#92acff", "#dfe8e7", "#285ccc"]}
      />
      <div className="grain" />
      <div className="container f-hero-inner">
        <Reveal delay={0.05}>
          <span className="kicker">Features · {site.productName}</span>
        </Reveal>
        <ShatterType
          key={mobile ? "m" : "d"}
          text="EVERY RULE OF THE MONTH."
          className="f-hero-title"
          cols={mobile ? 5 : 9}
          rows={3}
          as="h1"
        />
        <div className="f-hero-row">
          <Reveal delay={0.5}>
            <p className="lede">
              {moduleCount} modules on one attendance record - from the face
              terminal at the gate to the MD's morning brief. Every feature
              below ships today; the demos run its real rules.
            </p>
          </Reveal>
          <Reveal delay={0.6} className="f-hero-stats">
            <div>
              <span className="figure">{site.stats.reports}+</span>
              <small>reports</small>
            </div>
            <div>
              <span className="figure">{site.stats.requestTypes}</span>
              <small>request types</small>
            </div>
            <div>
              <span className="figure">{site.stats.payCycles}</span>
              <small>pay cycles</small>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Sticky index of the pillars; the active one follows the scroll. */
function PillarNav() {
  const [active, setActive] = useState(site.pillars[0].id);
  useEffect(() => {
    const els = site.pillars
      .map((p) => document.getElementById(p.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="pillar-nav" aria-label="Feature pillars">
      {site.pillars.map((p, i) => (
        <a
          key={p.id}
          href={`#${p.id}`}
          className={active === p.id ? "is-active" : ""}
          onClick={(e) => {
            e.preventDefault();
            scrollToSelector(`#${p.id}`);
          }}
        >
          <span>0{i + 1}</span>
          {p.name}
        </a>
      ))}
    </nav>
  );
}

function Module({ m, index }) {
  return (
    <article className="f-module" id={m.id}>
      <Reveal className="f-module-head">
        <span className="f-module-n figure">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="f-module-name">{m.name}</h3>
      </Reveal>
      <div className="f-module-body">
        <Reveal delay={0.05}>
          <p className="f-module-blurb">{m.blurb}</p>
        </Reveal>
        <ul className="f-module-list">
          {m.features.map((f, i) => (
            <Reveal as="li" key={f} delay={0.08 + i * 0.04} y={14}>
              {f}
            </Reveal>
          ))}
        </ul>
        {m.demo && (
          <Reveal delay={0.2}>
            <Link
              to={`/demos/${m.demo}`}
              className="f-module-demo"
              data-cursor="Play"
            >
              <span className="f-module-demo-icon">
                <Play />
              </span>
              Try it in the live demo
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}

function Pillar({ pillar, index }) {
  return (
    <Section tone={pillar.tone} className="f-pillar" id={pillar.id}>
      <div className="container f-pillar-grid">
        <div className="f-pillar-side">
          <div className="f-pillar-sticky">
            <span className="kicker">Pillar 0{index + 1}</span>
            <FitText as="h2" className="f-pillar-name display" max={170}>
              {pillar.name}
            </FitText>
            <p className="f-pillar-title">{pillar.title}</p>
            <ul className="f-pillar-toc">
              {pillar.modules.map((m) => (
                <li key={m.id}>
                  <a
                    href={`#${m.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSelector(`#${m.id}`);
                    }}
                  >
                    {m.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="f-pillar-modules">
          {pillar.modules.map((m, i) => (
            <Module key={m.id} m={m} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Roles() {
  return (
    <Section tone="cream" className="section f-roles" id="roles">
      <div className="container">
        <div className="f-section-head">
          <span className="kicker">Roles &amp; access</span>
          <SplitWords
            as="h2"
            className="h2"
            text="Everyone sees exactly their own job."
            accent="their own job."
          />
          <p className="lede">
            Access is set per module - hidden, view or edit - and a login can be
            tied to one branch. View-only pages stay fully browsable; only the
            buttons that change data lock.
          </p>
        </div>
        <div className="f-roles-grid">
          {site.roles.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06} className="f-role">
              <span className="f-role-n figure">0{i + 1}</span>
              <h3 className="h3">{r.name}</h3>
              <p>{r.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ReportsTeaser() {
  const counts = reportCategories.map((c) => ({
    c,
    n: reports.filter((r) => r.category === c).length,
  }));
  const max = Math.max(...counts.map((x) => x.n));
  return (
    <Section tone="lemon" className="section f-reports">
      <div className="container f-reports-grid">
        <div className="f-section-head">
          <span className="kicker">Report Center</span>
          <SplitWords
            as="h2"
            className="h2"
            text={`${reports.length} reports. Nine shelves.`}
            accent="Nine shelves."
          />
          <p className="lede">
            Statutory statements, registers inspectors ask for, exception lists
            HR acts on and one-page executive summaries - each with filters,
            totals, and Excel and PDF export.
          </p>
          <Btn to="/demos/report-center" solid cursor="Search">
            Search every report
          </Btn>
        </div>
        <ul className="f-bars">
          {counts.map(({ c, n }, i) => (
            <Reveal as="li" key={c} delay={i * 0.05} y={10}>
              <span className="f-bar-label">{c}</span>
              <span className="f-bar">
                <span style={{ width: `${(n / max) * 100}%` }} />
              </span>
              <span className="f-bar-n figure">{n}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Connector() {
  return (
    <Section tone="night" className="section f-connector">
      <div className="container">
        <div className="f-section-head">
          <span className="kicker">Devices on the factory floor</span>
          <SplitWords
            as="h2"
            className="h2"
            text="The cloud can't reach your factory LAN. The connector reaches out."
            accent="reaches out."
          />
          <p className="lede">
            A small Windows service on a factory computer reads the face
            terminals on the local network and sends punches out over HTTPS.
            Nothing is opened in the firewall, and punches wait safely through
            an internet outage.
          </p>
        </div>
        <div className="f-diagram" aria-hidden="true">
          <svg viewBox="0 0 1000 300" className="f-diagram-svg">
            <defs>
              <linearGradient id="f-wire" x1="0" x2="1">
                <stop offset="0" stopColor="#92acff" stopOpacity="0.2" />
                <stop offset="1" stopColor="#f3f298" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {[60, 150, 240].map((y) => (
              <path
                key={y}
                d={`M150 ${y} C 260 ${y}, 300 150, 400 150`}
                className="f-wire"
              />
            ))}
            <path
              d="M560 150 C 640 150, 660 150, 740 150"
              className="f-wire f-wire--out"
            />
            <path d="M840 150 C 880 150, 880 70, 930 70" className="f-wire" />
            <path d="M840 150 C 880 150, 880 230, 930 230" className="f-wire" />
            {[60, 150, 240].map((y, i) => (
              <circle key={y} r="5" className="f-packet">
                <animateMotion
                  dur="2.4s"
                  begin={`${i * 0.6}s`}
                  repeatCount="indefinite"
                  path={`M150 ${y} C 260 ${y}, 300 150, 400 150`}
                />
              </circle>
            ))}
            <circle r="6" className="f-packet f-packet--out">
              <animateMotion
                dur="1.6s"
                repeatCount="indefinite"
                path="M560 150 C 640 150, 660 150, 740 150"
              />
            </circle>
          </svg>
          <div className="f-node f-node--devices">
            <strong>Face terminals</strong>
            <small>Factory LAN · port 4370</small>
          </div>
          <div className="f-node f-node--connector">
            <strong>Site connector</strong>
            <small>Outbound HTTPS only</small>
          </div>
          <div className="f-node f-node--cloud">
            <strong>Zyraa server</strong>
            <small>Cloud or on-site</small>
          </div>
          <div className="f-node f-node--apps">
            <strong>Apps</strong>
            <small>Admin · Web · Mobile</small>
          </div>
        </div>
        <div className="f-connector-facts">
          {[
            ["3", "ways in at once: pull, JSON push and ADMS cloud push"],
            ["15 s", "device status refresh, with nine diagnostic checks"],
            ["0", "existing punches changed by a data fetch"],
          ].map(([v, l]) => (
            <Reveal key={l} className="f-fact">
              <span className="figure">{v}</span>
              <p>{l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Roadmap() {
  return (
    <Section tone="sand" className="section f-roadmap">
      <div className="container f-roadmap-inner">
        <span className="kicker">What's next</span>
        <SplitWords
          as="h2"
          className="h2"
          text="Next: the ERP, on the same record."
          accent="same record."
        />
        <p className="lede">
          Production planning, merchandising, fabric, cutting, sewing, finishing
          and shipment modules are being designed as Phase 2 - built on the
          people data Zyraa already keeps.
        </p>
        <Link to="/contact" className="text-link">
          Talk to us about the roadmap <ArrowUpRight />
        </Link>
      </div>
    </Section>
  );
}

export default function Features() {
  return (
    <main className="page features">
      <Seo
        title="Features"
        path="/features"
        description="Every Zyraa module: attendance engine, biometric devices, shifts, geo on-duty, leave and approvals, gate passes, staff and production payroll, compensation, reports and the MD portal."
      />
      <FeaturesHero />
      <PillarNav />
      {site.pillars.map((p, i) => (
        <Pillar key={p.id} pillar={p} index={i} />
      ))}
      <Connector />
      <Roles />
      <ReportsTeaser />
      <Roadmap />
      <Footer />
    </main>
  );
}
