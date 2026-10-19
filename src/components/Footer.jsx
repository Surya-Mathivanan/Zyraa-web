import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform } from "framer-motion";
import Section from "./Section.jsx";
import Btn from "./Btn.jsx";
import { ArrowUp, ArrowUpRight, Chat, Phone, Pin, Spark } from "./Icons.jsx";
import { site } from "../data/site.js";
import { scrollToTop } from "../hooks/useLenis.js";
import { useSectionProgress } from "../hooks/useParallax.js";
import { useReducedMotion } from "../hooks/useMedia.js";
import "./footer.css";

const YEAR = new Date().getFullYear();
const WORD = [..."ZYRAA"];

// Each letter rises from a little further down than the one before it, so the
// word assembles left to right as the footer scrolls in.
function MegaLetter({ ch, index, progress, still }) {
  const y = useTransform(progress, [0, 1], [`${34 + index * 14}%`, "0%"]);
  return <motion.span style={still ? undefined : { y }}>{ch}</motion.span>;
}

/**
 * Footer: a call to action, then brand · Explore · Product · a contact card.
 * Desktop is one row of four; tablets put the brand on its own row; phones
 * keep Explore and Product side by side in two columns, with the brand and
 * the contact card spanning the full width.
 */
export default function Footer() {
  const megaRef = useRef(null);
  const progress = useSectionProgress(megaRef, ["start end", "end end"]);
  const reduced = useReducedMotion();

  return (
    <Section tone="night" as="footer" className="footer">
      <div className="container footer-cta">
        <div>
          <span className="kicker">Next step</span>
          <h2 className="footer-cta-title">
            See Zyraa on <em className="accent-word">your own</em> month.
          </h2>
        </div>
        <div className="footer-cta-side">
          <a className="footer-cta-phone figure" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
            {site.primaryPhone.label}
          </a>
          <div className="footer-cta-actions">
            <Btn to="/contact" solid cursor="Demo">
              Book a demo
            </Btn>
            <Btn to="/demos" cursor="Play">
              Try the live demos
            </Btn>
          </div>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label={`${site.productName} home`}>
            <img src="/assets/wordmark-480.webp" alt="" width="200" height="96" loading="lazy" />
          </Link>
          <p>
            The HRMS for garment and knitwear units — built and supported from {site.location.city}, by the
            developer who answers the phone.
          </p>
          <ul className="footer-badges">
            <li>{site.stats.reports}+ reports</li>
            <li>{site.stats.apps} apps</li>
            <li>{site.stats.requestTypes} request types</li>
          </ul>
        </div>

        <nav className="footer-col footer-col--explore" aria-label="Footer">
          <span className="footer-heading">Explore</span>
          <ul>
            {site.nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="footer-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col footer-col--product">
          <span className="footer-heading">Product</span>
          <ul>
            {site.pillars.map((p) => (
              <li key={p.id}>
                <Link to={`/features#${p.id}`} className="footer-link footer-link--stacked">
                  <span>{p.name}</span>
                  <small>{p.title}</small>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-reach">
          <span className="footer-heading">Reach us</span>
          <a className="footer-reach-phone figure" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
            {site.primaryPhone.label}
          </a>
          <div className="footer-reach-actions">
            <a href={`tel:+${site.primaryPhone.raw}`} className="footer-pill" data-cursor="Call">
              <Phone />
              Call
            </a>
            <a
              href={`https://wa.me/${site.primaryPhone.raw}`}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-pill"
              data-cursor="Chat"
            >
              <Chat />
              WhatsApp
            </a>
          </div>
          <Link to="/contact#map" className="footer-place" data-cursor="Map">
            <Pin />
            <span>{site.location.label}</span>
            <ArrowUpRight className="footer-place-arrow" />
          </Link>
          <span className="footer-note">
            <span className="footer-note-dot" aria-hidden="true" />
            Built and supported by {site.developer.name}
          </span>
        </div>
      </div>

      <div className="footer-mega" ref={megaRef} aria-hidden="true">
        {WORD.map((ch, i) => (
          <MegaLetter key={i} ch={ch} index={i} progress={progress} still={reduced} />
        ))}
        <Spark className="footer-mega-spark" />
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-text">
          <span>
            © {YEAR} {site.productName}. All rights reserved.
          </span>
          <span>Made in {site.location.city}.</span>
        </div>
        <button type="button" className="footer-top" onClick={() => scrollToTop(false)} aria-label="Back to top" data-cursor="Top">
          <ArrowUp />
        </button>
      </div>
    </Section>
  );
}
