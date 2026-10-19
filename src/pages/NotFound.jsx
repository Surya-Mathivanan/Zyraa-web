import { Link } from "react-router-dom";
import FadingStars from "../components/FadingStars.jsx";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { ArrowUpRight } from "../components/Icons.jsx";
import { site } from "../data/site.js";
import "./not-found.css";

const destinations = [
  { to: "/", label: "Home", note: "Start from the top" },
  { to: "/features", label: "Features", note: "Every rule of the month" },
  { to: "/demos", label: "Live demos", note: "Play with the rules" },
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
      <Section tone="crimson" className="nf">
        <FadingStars
          count={60}
          speed={0.8}
          trail={1.2}
          colors={["#fcf0d6", "#f3f298", "#ffefb4"]}
        />
        <div className="container nf-inner">
          <Reveal>
            <span className="kicker">Error 404 · missing punch</span>
          </Reveal>
          <p className="nf-code display" aria-hidden="true">
            404
          </p>
          <SplitWords
            as="h1"
            className="h2"
            text="This page never punched in."
            accent="never punched in."
            delay={0.05}
          />
          <Reveal delay={0.2}>
            <p className="lede">
              The link may be out of date, or the address mistyped. No claim
              needed - everything is one of these pages away.
            </p>
          </Reveal>
          <nav className="nf-links" aria-label="Site sections">
            {destinations.map((d, i) => (
              <Reveal key={d.to} delay={0.25 + i * 0.06} y={16}>
                <Link to={d.to} className="nf-link" data-cursor={d.label}>
                  <strong>{d.label}</strong>
                  <small>{d.note}</small>
                  <ArrowUpRight />
                </Link>
              </Reveal>
            ))}
          </nav>
          <Reveal delay={0.55} className="nf-call">
            Looking for something specific?{" "}
            <a href={`tel:+${site.primaryPhone.raw}`}>
              Call {site.primaryPhone.label}
            </a>
          </Reveal>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
