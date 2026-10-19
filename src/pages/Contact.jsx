import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import Btn from "../components/Btn.jsx";
import Loader from "../components/Loader.jsx";
import { PhoneFrame } from "../components/mockups/Frames.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { ArrowUp, ArrowUpRight, Chat, Check, Phone, Pin } from "../components/Icons.jsx";
import { site } from "../data/site.js";
import { scrollToSelector } from "../hooks/useLenis.js";
import { useParallax } from "../hooks/useParallax.js";
import "./contact.css";

const ease = [0.2, 0.8, 0.2, 1];
const phone = site.primaryPhone;
const place = site.location;

const mapSrc = "https://www.google.com/maps?q=Tiruppur,Tamil+Nadu,India&z=12&output=embed";
const mapLink = "https://www.google.com/maps/search/?api=1&query=Tiruppur%2C+Tamil+Nadu%2C+India";

const istFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const localFormat = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });

/** The current time through `format`, refreshed every 15 seconds. */
function useClock(format) {
  const [now, setNow] = useState(() => format.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(format.format(new Date())), 15000);
    return () => clearInterval(id);
  }, [format]);
  return now;
}

const jumpTo = (selector) => (e) => {
  e.preventDefault();
  scrollToSelector(selector);
};

/* ───────────── Hero ───────────── */

const CHANNELS = [
  {
    key: "call",
    n: "01",
    label: "Call",
    value: phone.label,
    sub: `Straight to ${site.developer.name}, who builds Zyraa`,
    href: `tel:+${phone.raw}`,
    cursor: "Call",
    Icon: Phone,
  },
  {
    key: "wa",
    n: "02",
    label: "WhatsApp",
    value: "Send a message",
    sub: `Chat on ${phone.label}`,
    href: `https://wa.me/${phone.raw}`,
    external: true,
    cursor: "Chat",
    Icon: Chat,
  },
  {
    key: "visit",
    n: "03",
    label: "Visit",
    value: place.city,
    sub: `${place.state}, ${place.country}`,
    href: "#map",
    onClick: jumpTo("#map"),
    cursor: "Map",
    Icon: Pin,
  },
];

function ContactHero() {
  const ref = useRef(null);
  const time = useClock(istFormat);
  const spin = useParallax(ref, [0, 70], { offset: ["start start", "end start"] });
  const drift = useParallax(ref, ["0%", "14%"], { offset: ["start start", "end start"] });

  return (
    <Section tone="cobalt" className="ct-hero">
      <div ref={ref} className="ct-hero-inner">
        {/* A stitched hoop with a Z, after the emblem, turning as you scroll. */}
        <motion.div className="ct-hoop" style={{ rotate: spin }} aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <circle className="ct-hoop-ring" cx="200" cy="200" r="158" />
            <circle className="ct-hoop-stitch" cx="200" cy="200" r="190" />
            <circle className="ct-hoop-orbit" cx="200" cy="200" r="190" />
            <path className="ct-hoop-z" d="M130 135H270L130 265H270" />
          </svg>
        </motion.div>
        <div className="grain" />

        <div className="container ct-hero-content">
          <Reveal delay={0.05} className="ct-hero-top">
            <span className="kicker">Contact · {site.productName}</span>
            <span className="ct-clock">
              <span className="ct-clock-dot" aria-hidden="true" />
              {place.city} <strong>{time}</strong> IST
            </span>
          </Reveal>

          <motion.h1 className="ct-title display" aria-label="Let's talk" style={{ y: drift }}>
            <span className="ct-title-line" aria-hidden="true">
              <motion.span
                className="ct-title-word"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.15, ease }}
              >
                LET&rsquo;S
              </motion.span>
            </span>
            <span className="ct-title-line ct-title-line--2" aria-hidden="true">
              {/* A call in progress: the handset rings, the voice line moves. */}
              <motion.span
                className="ct-pill"
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 210, damping: 15, delay: 0.6 }}
              >
                <span className="ct-pill-icon">
                  <Phone />
                </span>
                <span className="ct-wave">
                  {Array.from({ length: 7 }, (_, i) => (
                    <i key={i} style={{ "--i": i }} />
                  ))}
                </span>
              </motion.span>
              <motion.span
                className="ct-title-word"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.28, ease }}
              >
                TALK
              </motion.span>
            </span>
          </motion.h1>

          <Reveal delay={0.45} className="ct-hero-row">
            <p className="lede">
              Tell us how your unit runs attendance and payroll today. One number, and it reaches{" "}
              {site.developer.name} directly.
            </p>
            <a href="#compose" className="ct-jump" onClick={jumpTo("#compose")} data-cursor="Write">
              Prefer to write?
              <span className="ct-jump-icon">
                <ArrowUp />
              </span>
            </a>
          </Reveal>

          <ul className="ct-lines">
            {CHANNELS.map((c, i) => (
              <Reveal as="li" key={c.key} delay={0.55 + i * 0.09} y={24}>
                <a
                  className={`ct-line ct-line--${c.key}`}
                  href={c.href}
                  onClick={c.onClick}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer noopener" : undefined}
                  data-cursor={c.cursor}
                >
                  <span className="ct-line-n">{c.n}</span>
                  <span className="ct-line-icon">
                    <c.Icon />
                  </span>
                  <span className="ct-line-label">{c.label}</span>
                  <span className="ct-line-value">{c.value}</span>
                  <span className="ct-line-sub">{c.sub}</span>
                  <span className="ct-line-arrow">
                    <ArrowUpRight />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ───────────── Bring a month ───────────── */

function FaceIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M6 16V9a3 3 0 0 1 3-3h7M32 6h7a3 3 0 0 1 3 3v7M42 32v7a3 3 0 0 1-3 3h-7M16 42H9a3 3 0 0 1-3-3v-7" />
      <circle cx="24" cy="21" r="6" />
      <path d="M14 36c2-5 6-7 10-7s8 2 10 7" />
      <path className="ct-scan" d="M9 24h30" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="25" r="16" />
      <path d="M24 16v9l6 4" className="ct-hands" />
      <path d="M19 5h10M24 5v4" />
    </svg>
  );
}

function SpoolIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M12 8h24M12 40h24" />
      <path d="M15 8c0 6 3 8 3 16s-3 10-3 16M33 8c0 6-3 8-3 16s3 10 3 16" />
      <path className="ct-wind" d="M18 15h12M18 21h12M18 27h12M18 33h12" />
    </svg>
  );
}

function SheetIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M12 5h17l9 9v29H12z" />
      <path d="M29 5v9h9" />
      <path d="M17 22h16M17 28h16M17 34h10" />
      <path className="ct-tick" d="M29 34l3 3 6-7" />
    </svg>
  );
}

const BRING = [
  {
    title: "One month's biometric export",
    note: "The punches, straight from your terminals.",
    Icon: FaceIcon,
  },
  {
    title: "Your shift timings and grace",
    note: "Including the exceptions your office knows by heart.",
    Icon: ClockIcon,
  },
  {
    title: "How production is paid",
    note: "Per shift, and on which pay cycles.",
    Icon: SpoolIcon,
  },
  {
    title: "The salary sheet you made by hand",
    note: "For that same month. It is the answer key.",
    Icon: SheetIcon,
  },
];

function BringSection() {
  return (
    <Section tone="butter" className="section ct-bring">
      <div className="container">
        <div className="ct-bring-head">
          <div>
            <span className="kicker">The quickest demo</span>
            <SplitWords
              as="h2"
              className="h2"
              text="Bring a month you already know."
              accent="already know."
            />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              We run that month in Zyraa and you compare the output with the sheet you produced by
              hand. Every difference comes with the rule that caused it.
            </p>
          </Reveal>
        </div>

        <ol className="ct-tags">
          {BRING.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.08} y={36}>
              <article className={`ct-tag ct-tag--${i + 1}`}>
                <span className="ct-tag-code">
                  <span>No.0{i + 1}</span>
                  <span>Bring</span>
                </span>
                <span className="ct-tag-icon">
                  <b.Icon />
                </span>
                <h3>{b.title}</h3>
                <p>{b.note}</p>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="ct-bring-cta">
          <Btn href="#compose" solid cursor="Write" onClick={jumpTo("#compose")}>
            Start the message
          </Btn>
          <a className="text-link" href={`tel:+${phone.raw}`} data-cursor="Call">
            or call {phone.label}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────────── Compose ───────────── */

const TOPICS = ["Book a demo", "Pricing", "Biometric devices", "Payroll rules", "Something else"];

const initialForm = {
  name: "",
  company: "",
  phone: "",
  headcount: "",
  message: "",
};

/** The exact text that opens in WhatsApp; the preview shows the same. */
function composeMessage(form, topic) {
  return [
    `Hello ${site.productName},`,
    "",
    `Topic: ${topic}`,
    `Name: ${form.name}`,
    form.company ? `Company: ${form.company}` : null,
    form.phone ? `Phone: ${form.phone}` : null,
    form.headcount ? `Headcount: ${form.headcount}` : null,
    "",
    form.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

function ChatPreview({ text, empty, sent }) {
  const time = useClock(localFormat);
  return (
    <div className="ct-phone-col">
      <PhoneFrame className="ct-phone" time={time}>
        <div className="ct-chat">
          <div className="ct-chat-head">
            <img src="/assets/emblem-160.webp" alt="" width="40" height="40" />
            <span>
              <strong>{site.productName}</strong>
              <small>{phone.label}</small>
            </span>
          </div>
          <div className="ct-chat-body">
            <span className="ct-chat-day">Today</span>
            <motion.div layout className={`ct-bubble ${sent ? "is-sent" : ""}`} transition={{ duration: 0.35, ease }}>
              {empty ? (
                <span className="ct-typing">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <p>{text}</p>
              )}
              <span className="ct-bubble-meta">
                {time}
                {sent && <Check className="ct-bubble-tick" />}
              </span>
            </motion.div>
          </div>
          <div className="ct-chat-bar">
            <span className="ct-chat-input">Message</span>
            <span className="ct-chat-send">
              <ArrowUp />
            </span>
          </div>
        </div>
      </PhoneFrame>
      <p className="ct-phone-cap">
        <span className="ct-live-dot" aria-hidden="true" />
        Live preview of what opens in WhatsApp
      </p>
    </div>
  );
}

function ComposeSection() {
  const [form, setForm] = useState(initialForm);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // Any edit after a send means a new message is being composed.
    if (sent) setSent(false);
  };

  const pickTopic = (t) => {
    setTopic(t);
    if (sent) setSent(false);
  };

  const text = composeMessage(form, topic);
  const empty = !form.name && !form.company && !form.phone && !form.headcount && !form.message;

  const onSubmit = (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${phone.raw}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <Section tone="night" className="section ct-compose" id="compose">
      <div className="container ct-compose-grid">
        <div>
          <div className="ct-compose-head">
            <span className="kicker">Message</span>
            <SplitWords
              as="h2"
              className="h2"
              text="Write it here. It lands on WhatsApp."
              accent="lands on WhatsApp."
            />
            <Reveal delay={0.12}>
              <p className="lede">
                Nothing is stored on this site. The message opens in WhatsApp, addressed to{" "}
                {phone.label}, and you press send.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form className="ct-form" onSubmit={onSubmit}>
              <fieldset className="ct-topics">
                <legend>What is it about?</legend>
                <div className="ct-topic-list">
                  {TOPICS.map((t) => (
                    <label key={t} className="ct-topic">
                      <input
                        type="radio"
                        name="topic"
                        value={t}
                        checked={topic === t}
                        onChange={() => pickTopic(t)}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

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

              <div className="ct-form-foot">
                <button type="submit" className="btn btn--solid ct-submit" data-cursor="Send">
                  <span>{sent ? "Opened WhatsApp" : "Send via WhatsApp"}</span>
                  <span className="btn-icon">{sent ? <Check /> : <ArrowUpRight />}</span>
                </button>
                <p className="ct-form-note" role="status">
                  {sent
                    ? "WhatsApp should have opened in a new tab. Edit any field to compose another message."
                    : `Opens in WhatsApp to ${phone.label}. Prefer a call? Use the number above.`}
                </p>
              </div>
            </form>
          </Reveal>
        </div>

        <ChatPreview text={text} empty={empty} sent={sent} />
      </div>
    </Section>
  );
}

/* ───────────── Map ───────────── */

function MapSection() {
  const [loaded, setLoaded] = useState(false);
  const time = useClock(istFormat);
  const facts = [
    ["Coordinates", "11.11° N, 77.34° E"],
    ["Local time", `${time} IST`],
    ["Region", `${place.state}, ${place.country}`],
  ];

  return (
    <Section tone="sage" className="section ct-map" id="map">
      <div className="container ct-map-head">
        <div>
          <span className="kicker">Find us</span>
          <SplitWords as="h2" className="ct-map-title display" text="TIRUPPUR" />
          <Reveal delay={0.15}>
            <p className="lede ct-map-lede">
              Built in India's knitwear capital, close to the floors it was written for.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2} as="dl" className="ct-map-facts">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1} className="container">
        <div className={`ct-map-frame ${loaded ? "is-loaded" : ""}`}>
          <div className="ct-map-loader">
            <Loader variant="inline" label="Loading the map" delay={false} />
          </div>
          <iframe
            title={`Map of ${place.city}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
          <a className="ct-map-card" href={mapLink} target="_blank" rel="noreferrer noopener" data-cursor="Open">
            <span className="ct-map-card-pin">
              <Pin />
            </span>
            <span>
              <strong>{place.label}</strong>
              <small>Open in Google Maps</small>
            </span>
            <ArrowUpRight className="ct-map-card-arrow" />
          </a>
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
        description={`Talk to ${site.developer.name} about Zyraa HRMS. Call ${phone.label}, message on WhatsApp, or book a demo on your own attendance data.`}
      />
      <ContactHero />
      <BringSection />
      <ComposeSection />
      <MapSection />
      <Footer />
    </main>
  );
}
