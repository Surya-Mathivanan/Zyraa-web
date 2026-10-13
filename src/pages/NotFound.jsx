import { Link } from "react-router-dom";
import FadingStars from "../components/FadingStars.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { site } from "../data/site.js";
import "./not-found.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6M8 6H18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const destinations = [
  { to: "/", label: "Home", note: "Start from the top" },
  { to: "/features", label: "Features", note: "What Zyraa does" },
  { to: "/about", label: "About", note: "Who builds it" },
  { to: "/contact", label: "Contact", note: "Call or message" },
];

export default function NotFound() {
  return (
    <main className="page not-found">
      <Seo
        title="Page not found"
        path="/404"
        description="That page does not exist. Browse Zyraa's features or get in touch."
        noindex
      />

      <section className="nf-hero">
        <FadingStars count={70} speed={0.9} trail={1.25} />
        <div className="nf-glow" aria-hidden="true" />
        <div className="grain" />

        <div className="container nf-inner">
          <Reveal>
            <span className="kicker">Error 404</span>
          </Reveal>

          <p className="nf-code" aria-hidden="true">
            404
          </p>

          <SplitWords as="h1" className="nf-title" text="This page doesn't exist." delay={0.05} />

          <Reveal delay={0.2}>
            <p className="nf-text">
              The link may be out of date, or the address mistyped. Everything is one of these four pages away.
            </p>
          </Reveal>

          <nav className="nf-links" aria-label="Site sections">
            {destinations.map((d, i) => (
              <Reveal key={d.to} delay={0.28 + i * 0.07} y={18}>
                <Link to={d.to} className="nf-link" data-cursor={d.label}>
                  <span className="nf-link-label">{d.label}</span>
                  <span className="nf-link-note">{d.note}</span>
                  <span className="nf-link-arrow">
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </nav>

          <Reveal delay={0.6} className="nf-fallback">
            <span>Looking for something specific?</span>
            <a href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
              Call {site.primaryPhone.label}
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
