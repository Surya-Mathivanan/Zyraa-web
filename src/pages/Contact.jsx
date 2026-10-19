import { useRef, useState } from "react";
import { motion } from "framer-motion";
import FadingStars from "../components/FadingStars.jsx";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { ArrowUpRight, Chat, Phone, Pin } from "../components/Icons.jsx";
import { site } from "../data/site.js";
import { scrollToSelector } from "../hooks/useLenis.js";
import { useParallax } from "../hooks/useParallax.js";
import "./contact.css";

const mapSrc =
  "https://www.google.com/maps?q=Tiruppur,Tamil+Nadu,India&z=12&output=embed";

function ContactHero() {
  const ref = useRef(null);
  // Only the heading block drifts; the action cards below stay put so they are
  // never pushed into the hero's clipped bottom edge.
  const y = useParallax(ref, ["0%", "10%"], {
    offset: ["start start", "end start"],
  });
  const opacity = useParallax(ref, [1, 0], {
    offset: ["start start", "end start"],
    input: [0, 0.85],
  });

  const actions = [
    {
      key: "call",
      label: "Call",
      title: site.primaryPhone.label,
      sub: "Straight to the developer",
      href: `tel:+${site.primaryPhone.raw}`,
      cursor: "Call",
      Icon: Phone,
    },
    {
      key: "wa",
      label: "WhatsApp",
      title: "Send a message",
      sub: `Message ${site.primaryPhone.label}`,
      href: `https://wa.me/${site.primaryPhone.raw}`,
      cursor: "Chat",
      Icon: Chat,
      external: true,
    },
    {
      key: "visit",
      label: "Where we are",
      title: site.location.city,
      sub: `${site.location.state}, ${site.location.country}`,
      href: "#map",
      cursor: "Map",
      Icon: Pin,
      onClick: (e) => {
        e.preventDefault();
        scrollToSelector("#map");
      },
    },
  ];

  return (
    <Section tone="indigo" className="ct-hero">
      <div ref={ref} className="ct-hero-inner">
        <FadingStars count={100} speed={0.9} trail={1.15} />
        <div className="grain" />
        <div className="container ct-hero-content">
          <motion.div style={{ y, opacity }}>
            <Reveal delay={0.05} className="ct-hero-top">
              <span className="kicker">Contact · {site.productName}</span>
              <span className="chip">Demo on your own data</span>
            </Reveal>
            <SplitWords
              as="h1"
              className="ct-hero-title display"
              text="LET'S TALK"
              stagger={0.1}
              delay={0.15}
            />
            <Reveal delay={0.4} className="ct-hero-row">
              <p className="lede">
                Tell us how your unit runs attendance and payroll today. One
                number, and it reaches {site.developer.name} directly.
              </p>
              <a
                href={`tel:+${site.primaryPhone.raw}`}
                className="ct-hero-phone figure"
                data-cursor="Call"
              >
                {site.primaryPhone.label}
              </a>
            </Reveal>
          </motion.div>

          <div className="ct-actions">
            {actions.map((a, i) => (
              <Reveal key={a.key} delay={0.5 + i * 0.08} y={20}>
                <a
                  className="ct-action"
                  href={a.href}
                  onClick={a.onClick}
                  target={a.external ? "_blank" : undefined}
                  rel={a.external ? "noreferrer noopener" : undefined}
                  data-cursor={a.cursor}
                >
                  <span className="ct-action-icon">
                    <a.Icon />
                  </span>
                  <span className="ct-action-label">{a.label}</span>
                  <span className="ct-action-title">{a.title}</span>
                  <span className="ct-action-sub">{a.sub}</span>
                  <ArrowUpRight className="ct-action-arrow" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

const initialForm = {
  name: "",
  company: "",
  phone: "",
  headcount: "",
  message: "",
};

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
    window.open(
      `https://wa.me/${site.primaryPhone.raw}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener",
    );
    setSent(true);
  };

  return (
    <form className="ct-form" onSubmit={onSubmit}>
      <div className="ct-form-row">
        <label className="ct-field">
          <span>Your name</span>
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Name"
            autoComplete="name"
          />
        </label>
        <label className="ct-field">
          <span>Company / unit</span>
          <input
            value={form.company}
            onChange={update("company")}
            placeholder="Company name"
            autoComplete="organization"
          />
        </label>
      </div>
      <div className="ct-form-row">
        <label className="ct-field">
          <span>Phone</span>
          <input
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91"
            inputMode="tel"
            autoComplete="tel"
          />
        </label>
        <label className="ct-field">
          <span>Headcount</span>
          <input
            value={form.headcount}
            onChange={update("headcount")}
            placeholder="e.g. 250"
            inputMode="numeric"
          />
        </label>
      </div>
      <label className="ct-field">
        <span>How do you run attendance and payroll today?</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Biometric devices, shift pattern, pay cycles, what breaks at month end."
        />
      </label>
      <button
        type="submit"
        className="btn btn--solid ct-submit"
        data-cursor="Send"
      >
        <span>{sent ? "Opened WhatsApp" : "Send via WhatsApp"}</span>
        <span className="btn-icon">
          <ArrowUpRight />
        </span>
      </button>
      <p className="ct-form-note" role="status">
        {sent
          ? "WhatsApp should have opened in a new tab. Edit any field to compose another message."
          : `The message opens in WhatsApp to ${site.primaryPhone.label}. Prefer a call? Use the number above.`}
      </p>
    </form>
  );
}

function ContactMain() {
  const bring = [
    "One month's biometric export",
    "Your shift timings and grace",
    "How production is paid - per shift, which cycles",
    "The salary sheet you made by hand for that month",
  ];
  return (
    <Section tone="night" className="section ct-main">
      <div className="container ct-main-grid">
        <div className="ct-info">
          <span className="kicker">The quickest demo</span>
          <SplitWords
            as="h2"
            className="h2"
            text="Bring a month you already know."
            accent="already know."
          />
          <p className="lede">
            We run that month in Zyraa and you compare the output with the sheet
            you produced by hand - every difference comes with the rule that
            caused it.
          </p>
          <ol className="ct-bring">
            {bring.map((b, i) => (
              <Reveal as="li" key={b} delay={i * 0.06}>
                <span className="figure">0{i + 1}</span>
                {b}
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal delay={0.1} className="ct-form-card">
          <span className="kicker">Message</span>
          <h3 className="h3">Book a demo</h3>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

function MapSection() {
  return (
    <Section tone="sage" className="section ct-map" id="map">
      <div className="container ct-map-head">
        <span className="kicker">Find us</span>
        <SplitWords as="h2" className="ct-map-title display" text="TIRUPPUR" />
        <Reveal delay={0.15}>
          <p className="lede">
            Built in India's knitwear capital, close to the floors it was
            written for.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="container">
        <div className="ct-map-frame">
          <iframe
            title={`Map of ${site.location.city}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Reveal>
    </Section>
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
