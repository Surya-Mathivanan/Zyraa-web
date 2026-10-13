import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { scrollToTop } from "../hooks/useLenis.js";
import "./footer.css";

const YEAR = new Date().getFullYear();

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6M8 6H18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      {/* CTA band */}
      <div className="footer-cta">
        <div className="footer-cta-text">
          <span className="footer-cta-kicker">Next step</span>
          <h2 className="footer-cta-title">See Zyraa on your own attendance data.</h2>
        </div>
        <div className="footer-cta-side">
          <a className="footer-cta-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
            {site.primaryPhone.label}
          </a>
          <Link className="pill-action footer-cta-action" to="/contact" data-cursor="Demo">
            <span className="pill">Book a demo</span>
            <span className="pill-arrow">
              <Arrow />
            </span>
          </Link>
        </div>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-name">
            <span className="footer-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <path d="M19 19 H45 L23 45 H45" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {site.productName}
          </div>
          <p className="footer-tag">
            The single system that runs the people side of your company. Built and supported from{" "}
            {site.location.city}.
          </p>
          <div className="footer-badges">
            <span>Biometric attendance</span>
            <span>Staff &amp; production payroll</span>
            <span>{site.stats.reports}+ reports</span>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Explore</div>
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Modules</div>
          {site.modules.slice(0, 5).map((m) => (
            <Link key={m.id} to={`/features#${m.id}`} className="footer-product">
              <strong>{m.short}</strong>
              <small>{m.name}</small>
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <div className="footer-heading">Reach us</div>
          <a href={`tel:+${site.primaryPhone.raw}`} className="footer-phone footer-phone--primary">
            {site.primaryPhone.label}
          </a>
          <div className="footer-actions">
            <a href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
              Call
            </a>
            <a
              href={`https://wa.me/${site.primaryPhone.raw}`}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="Chat"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Location</div>
          <span className="footer-address">
            {site.location.city}
            <br />
            {site.location.state}, {site.location.country}
          </span>
          <Link to="/contact#map" className="footer-maplink" data-cursor="Map">
            View on map <Arrow />
          </Link>
          <span className="footer-team">
            Built by {site.developer.name}, {site.developer.role.toLowerCase()}
          </span>
        </div>
      </div>

      <div className="footer-mega" aria-hidden="true">
        ZYRAA
      </div>

      <div className="footer-bottom">
        <span>
          © {YEAR} {site.productName}. All rights reserved.
        </span>
        <span className="footer-made">Made in {site.location.city}.</span>
        <button type="button" className="footer-top" onClick={() => scrollToTop(false)} aria-label="Back to top" data-cursor="Top">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
