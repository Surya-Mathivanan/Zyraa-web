import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadingStars from "../components/FadingStars.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { site } from "../data/site.js";
import { scrollToSelector } from "../hooks/useLenis.js";
import "./contact.css";

const mapSrc = "https://www.google.com/maps?q=Tiruppur,Tamil+Nadu,India&z=12&output=embed";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6M8 6H18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3h3l1.6 4.2-2 1.3a11 11 0 0 0 6.3 6.3l1.3-2L21 14.4v3a2.6 2.6 0 0 1-2.8 2.6A16.6 16.6 0 0 1 3.9 5.8 2.6 2.6 0 0 1 6.6 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6.5-5.6 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.4 6.5 11 6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ContactHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const actions = [
    {
      key: "call",
      label: "Call",
      title: site.primaryPhone.label,
      sub: "Straight to the developer",
      href: `tel:+${site.primaryPhone.raw}`,
      cursor: "Call",
      Icon: PhoneIcon,
    },
    {
      key: "wa",
      label: "WhatsApp",
      title: "Send a message",
      sub: `Message ${site.primaryPhone.label}`,
      href: `https://wa.me/${site.primaryPhone.raw}`,
      cursor: "Chat",
      Icon: ChatIcon,
      external: true,
    },
    {
      key: "visit",
      label: "Where we are",
      title: site.location.city,
      sub: `${site.location.state}, ${site.location.country}`,
      href: "#map",
      cursor: "Map",
      Icon: PinIcon,
      onClick: (e) => {
        e.preventDefault();
        scrollToSelector("#map");
      },
    },
  ];

  return (
    <section className="contact-hero" ref={ref}>
      <FadingStars count={110} speed={0.95} trail={1.15} />
      <div className="contact-hero-glow" aria-hidden="true" />
      <div className="grain" />

      <motion.div className="container contact-hero-inner" style={{ y: titleY, opacity }}>
        <div className="contact-hero-top">
          <Reveal delay={0.1}>
            <span className="kicker">Contact · {site.productName}</span>
          </Reveal>
          <Reveal delay={0.2} className="contact-hero-tags">
            <span>HRMS for manufacturing</span>
            <span>Demo on your data</span>
            <span>{site.location.city}</span>
          </Reveal>
        </div>

        <SplitWords as="h1" className="contact-hero-title" text="LET'S TALK" delay={0.25} stagger={0.12} />

        <div className="contact-hero-row">
          <Reveal delay={0.45}>
            <p className="contact-hero-text">
              Tell us how your unit runs attendance and payroll today. One number, and it reaches{" "}
              {site.developer.name} directly.
            </p>
          </Reveal>
          <Reveal delay={0.55} className="contact-hero-phones">
            <a href={`tel:+${site.primaryPhone.raw}`} className="contact-hero-phone" data-cursor="Call">
              {site.primaryPhone.label}
            </a>
          </Reveal>
        </div>

        <div className="contact-actions">
          {actions.map((a, i) => (
            <Reveal key={a.key} delay={0.6 + i * 0.1} y={20}>
              <a
                className="contact-action"
                href={a.href}
                onClick={a.onClick}
                target={a.external ? "_blank" : undefined}
                rel={a.external ? "noreferrer noopener" : undefined}
                data-cursor={a.cursor}
              >
                <span className="contact-action-icon">
                  <a.Icon />
                </span>
                <span className="contact-action-label">{a.label}</span>
                <span className="contact-action-title">{a.title}</span>
                <span className="contact-action-sub">{a.sub}</span>
                <span className="contact-action-arrow">
                  <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

const initialForm = { name: "", company: "", phone: "", headcount: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // Any edit after a send means a new message is being composed.
    if (sent) setSent(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `Hello ${site.productName},`,
      "",
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      form.headcount ? `Headcount: ${form.headcount}` : null,
      "",
      form.message,
    ].filter((l) => l !== null);
    const url = `https://wa.me/${site.primaryPhone.raw}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    setSent(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form-row">
        <label className="field">
          <span>Your name</span>
          <input required value={form.name} onChange={update("name")} placeholder="Name" autoComplete="name" />
        </label>
        <label className="field">
          <span>Company / unit</span>
          <input value={form.company} onChange={update("company")} placeholder="Company name" autoComplete="organization" />
        </label>
      </div>
      <div className="contact-form-row">
        <label className="field">
          <span>Phone</span>
          <input value={form.phone} onChange={update("phone")} placeholder="+91" inputMode="tel" autoComplete="tel" />
        </label>
        <label className="field">
          <span>Headcount</span>
          <input
            value={form.headcount}
            onChange={update("headcount")}
            placeholder="e.g. 250"
            inputMode="numeric"
          />
        </label>
      </div>
      <label className="field">
        <span>How do you run attendance and payroll today?</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Biometric devices, shift pattern, pay cycles, what breaks at month end."
        />
      </label>
      <button type="submit" className="pill-action contact-submit" data-cursor="Send">
        <span className="pill">{sent ? "Opened WhatsApp" : "Send via WhatsApp"}</span>
        <span className="pill-arrow">
          <Arrow />
        </span>
      </button>
      <p className="contact-form-note" role="status">
        {sent
          ? "WhatsApp should have opened in a new tab. Edit any field to compose another message."
          : `The message opens in WhatsApp to ${site.primaryPhone.label}. Prefer a call? Use the number above.`}
      </p>
    </form>
  );
}

function ContactMain() {
  return (
    <section className="contact-main">
      <div className="container contact-main-grid">
        <div className="contact-info">
          <Reveal>
            <span className="kicker">Reach us</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="contact-info-title">One number. One developer.</h2>
          </Reveal>

          <div className="contact-block">
            <span className="contact-block-label">Phone</span>
            <div className="contact-phone-row">
              <a href={`tel:+${site.primaryPhone.raw}`} className="contact-phone" data-cursor="Call">
                {site.primaryPhone.label}
              </a>
              <a
                href={`https://wa.me/${site.primaryPhone.raw}`}
                target="_blank"
                rel="noreferrer noopener"
                className="contact-wa"
                data-cursor="WhatsApp"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-block">
            <span className="contact-block-label">Location</span>
            <p className="contact-location">
              {site.productName}
              <br />
              {site.location.city}, {site.location.state}
              <br />
              {site.location.country}
            </p>
          </div>

          <div className="contact-block">
            <span className="contact-block-label">What to bring</span>
            <p className="contact-company">
              The quickest demo uses one month you already know the answer to: your biometric export, your shift
              pattern and your pay cycles. We run it in Zyraa and you compare the output with the sheet you
              produced by hand.
            </p>
          </div>
        </div>

        <Reveal delay={0.15} className="contact-form-wrap">
          <div className="contact-form-card">
            <div className="contact-form-head">
              <span className="kicker">Message</span>
              <h3>Book a demo</h3>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="contact-map" id="map">
      <div className="container contact-map-head">
        <Reveal>
          <span className="kicker">Find us</span>
        </Reveal>
        <SplitWords as="h2" className="contact-map-title" text="TIRUPPUR" delay={0.05} />
        <Reveal delay={0.2}>
          <p className="contact-map-text">
            Built in the knitwear capital of India, close to the floors it was written for.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="container">
        <div className="contact-map-frame">
          <iframe
            title={`Map of ${site.location.city}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Reveal>
    </section>
  );
}

export default function Contact() {
  return (
    <main className="page contact">
      <Seo
        title="Contact"
        path="/contact"
        description={`Talk to ${site.developer.name} about Zyraa HRMS. Call ${site.primaryPhone.label}, message on WhatsApp, or book a demo on your own attendance data.`}
      />
      <ContactHero />
      <ContactMain />
      <MapSection />
      <Footer />
    </main>
  );
}
