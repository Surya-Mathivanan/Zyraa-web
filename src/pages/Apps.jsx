import { useRef } from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import Btn from "../components/Btn.jsx";
import FadingStars from "../components/FadingStars.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { PhoneFrame, BrowserFrame } from "../components/mockups/Frames.jsx";
import {
  MobileHome,
  MobileGeo,
  MobileApprovals,
  WebDashboard,
  AdminPayroll,
  MdDashboard,
} from "../components/mockups/Screens.jsx";
import { site } from "../data/site.js";
import { useParallax } from "../hooks/useParallax.js";
import "./apps.css";

const DETAILS = {
  admin: [
    [
      "Employees",
      "Staff and production records, bulk Excel upload with a dry-run check, branches with unit codes and geofences.",
    ],
    [
      "Attendance",
      "Staff and production attendance, muster-roll sheet, punch search across 100 days, report log of absentees.",
    ],
    [
      "Requests",
      "One hub for every request and who it is waiting on - auto-refreshes every 30 seconds.",
    ],
    [
      "Payroll",
      "Staff and production payroll with Records, Issues, Skipped and Rules views; salary statement and bank file.",
    ],
    [
      "Devices",
      "Device status with nine diagnostic checks, data fetch with preview, push users to terminals, site connectors.",
    ],
    [
      "Administration",
      "Custom roles, branch-scoped logins, login devices with remote sign-out and a full audit trail.",
    ],
  ],
  web: [
    [
      "Attendance heat map",
      "A month of days coloured by status, with dots for late-ins, permissions and compensation days - tap a day for its reason.",
    ],
    [
      "Punch, live",
      "Today's punches and status in the top bar; geo check-in inside the branch radius with a slide.",
    ],
    [
      "Requests",
      "Leave, three one-hour permissions, casual leave and missing punch - with the approval trail on each.",
    ],
    [
      "Money",
      "Salary slips with PDF download, advances and loans with what's repaid and what's outstanding.",
    ],
    [
      "Gate & ID",
      "An outpass that flips to a QR with a validity countdown, a permanent tea-break pass and a digital ID.",
    ],
    [
      "Manager Approvals",
      "Department heads approve their team's requests from the same app, with a pending badge.",
    ],
  ],
  mobile: [
    [
      "Geo punch",
      "One GPS fix against the branch radius: inside, the punch is written; outside, it points you to On-Duty.",
    ],
    [
      "On-duty sessions",
      "Start with a destination, then up to four photo + location punches - counted once approved.",
    ],
    [
      "Missing punch",
      "Name the exact punch - morning in, lunch out, lunch in, evening out - with a reason.",
    ],
    [
      "Approvals",
      "Per-category tabs for each department head, with an optional comment on every decision.",
    ],
    [
      "Gate",
      "Outpass QR with a 60-minute exit window, and a tea-break QR that needs no approval.",
    ],
    [
      "Payslips & ID",
      "Salary slips, holidays, documents and an ID card whose QR verifies the employee.",
    ],
  ],
};

function AppsHero() {
  const ref = useRef(null);
  const backY = useParallax(ref, ["0%", "-12%"], {
    offset: ["start start", "end start"],
  });
  const midY = useParallax(ref, ["0%", "-26%"], {
    offset: ["start start", "end start"],
  });
  const frontY = useParallax(ref, ["0%", "-44%"], {
    offset: ["start start", "end start"],
  });
  return (
    <Section tone="indigo" className="apps-hero">
      <div ref={ref} className="apps-hero-inner">
        <FadingStars count={60} speed={0.7} trail={1.2} opacity={0.6} />
        <div className="container apps-hero-copy">
          <Reveal>
            <span className="kicker">Apps · {site.productName}</span>
          </Reveal>
          <SplitWords
            as="h1"
            className="h1"
            text="Three apps. One month."
            accent="One month."
            delay={0.1}
          />
          <Reveal delay={0.35}>
            <p className="lede">
              The same record, seen three ways: HR runs it, employees read it,
              and the phone captures what only a phone can - a location, a
              photo, a scan at the gate.
            </p>
          </Reveal>
        </div>
        <div className="apps-hero-stage" aria-hidden="true">
          <motion.div className="apps-hero-back" style={{ y: backY }}>
            <BrowserFrame url="hr.zyraa / payroll">
              <AdminPayroll />
            </BrowserFrame>
          </motion.div>
          <motion.div className="apps-hero-mid" style={{ y: midY }}>
            <BrowserFrame url="my.zyraa / attendance">
              <WebDashboard />
            </BrowserFrame>
          </motion.div>
          <motion.div className="apps-hero-front" style={{ y: frontY }}>
            <PhoneFrame>
              <MobileHome />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function AppSection({ app, children, flip }) {
  return (
    <Section
      tone={app.tone}
      className={`app-sec app-sec--${app.id}`}
      id={app.id}
    >
      <div className="container">
        <div className={`app-sec-top ${flip ? "app-sec-top--flip" : ""}`}>
          <div className="app-sec-copy">
            <span className="app-sec-code display">{app.code}</span>
            <SplitWords as="h2" className="h2" text={app.name} />
            <span className="chip">{app.who}</span>
            <Reveal delay={0.1}>
              <p className="lede">{app.blurb}</p>
            </Reveal>
          </div>
          <div className="app-sec-visual">{children}</div>
        </div>
        <div className="app-sec-grid">
          {DETAILS[app.id].map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.06} className="app-sec-item">
              <h3 className="h3">{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Extras() {
  return (
    <Section tone="cream" className="section apps-extras">
      <div className="container apps-extras-grid">
        <div className="apps-extras-copy">
          <span className="kicker">More front doors</span>
          <SplitWords
            as="h2"
            className="h2"
            text="For the MD, the gate and anyone holding an ID card."
            accent="the gate"
          />
          <div className="apps-extras-list">
            {site.extras.map((x, i) => (
              <Reveal key={x.name} delay={i * 0.07} className="apps-extra">
                <h3 className="h3">{x.name}</h3>
                <p>{x.blurb}</p>
              </Reveal>
            ))}
          </div>
          <Btn to="/demos/md-assistant" solid cursor="Play">
            Ask the MD assistant
          </Btn>
        </div>
        <Reveal delay={0.1} className="apps-extras-visual">
          <BrowserFrame url="md.zyraa / dashboard">
            <MdDashboard />
          </BrowserFrame>
        </Reveal>
      </div>
    </Section>
  );
}

function SignIn() {
  const ways = [
    [
      "Password",
      "Employee code, phone or email, with a password the employee sets on first sign-in.",
    ],
    [
      "One-time code",
      "A 6-digit code by WhatsApp or SMS - HR chooses the channel. No password to forget.",
    ],
    [
      "Guard rails",
      "Codes expire in minutes, resends wait, wrong tries are capped and daily sending has limits.",
    ],
  ];
  return (
    <Section tone="butter" className="section apps-signin">
      <div className="container">
        <div className="apps-signin-head">
          <span className="kicker">Signing in on the floor</span>
          <SplitWords
            as="h2"
            className="h2"
            text="Workers don't do passwords. So they don't have to."
            accent="don't have to."
          />
        </div>
        <div className="apps-signin-grid">
          {ways.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="apps-signin-card">
              <span className="figure">0{i + 1}</span>
              <h3 className="h3">{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function Apps() {
  const [admin, web, mobile] = site.apps;
  return (
    <main className="page apps-page">
      <Seo
        title="Apps"
        path="/apps"
        description="Zyraa's HR admin portal, employee web app and mobile app - plus the MD portal, gate scanner and public ID verification - all on one attendance record."
      />
      <AppsHero />
      <AppSection app={admin}>
        <BrowserFrame url="hr.zyraa / payroll" className="app-sec-browser">
          <AdminPayroll />
        </BrowserFrame>
      </AppSection>
      <AppSection app={web} flip>
        <BrowserFrame url="my.zyraa / attendance" className="app-sec-browser">
          <WebDashboard />
        </BrowserFrame>
      </AppSection>
      <AppSection app={mobile}>
        <div className="app-sec-phones">
          <PhoneFrame>
            <MobileGeo />
          </PhoneFrame>
          <PhoneFrame>
            <MobileHome />
          </PhoneFrame>
          <PhoneFrame>
            <MobileApprovals />
          </PhoneFrame>
        </div>
      </AppSection>
      <Extras />
      <SignIn />
      <Footer />
    </main>
  );
}
