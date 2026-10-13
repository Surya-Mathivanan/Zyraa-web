import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../data/site.js";
import { getLenis } from "../hooks/useLenis.js";
import "./nav.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/about", label: "About" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

function Mark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M19 19 H45 L23 45 H45"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel whenever the route changes (adjust-state-during-render pattern).
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    if (open) setOpen(false);
  }

  // Lock scrolling behind the mobile panel. Lenis drives its own RAF loop and
  // would keep scrolling through a plain `overflow: hidden`, so stop the
  // instance when there is one. Under prefers-reduced-motion Lenis never
  // initialises, hence the body fallback for that case.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      if (lenis) lenis.stop();
      else document.body.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    }
    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "nav--scrolled" : ""}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Link className="logo" to="/" data-cursor="Home">
          <span className="logo-mark">
            <Mark />
          </span>
          <span className="logo-text">
            {site.shortName}
            <small>HRMS</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className="nav-link" data-cursor={l.label}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-action-wrap">
          <a className="nav-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
            <span className="nav-phone-dot" aria-hidden="true" />
            {site.primaryPhone.label}
          </a>
          <Link className="nav-action" to="/contact" data-cursor="Demo">
            Book a demo
          </Link>
        </div>

        <button
          className={`menu-button ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06 }}
              >
                <NavLink to={l.to} end={l.to === "/"} className="mobile-link">
                  <span className="mobile-index">0{i + 1}</span>
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <a className="mobile-phone" href={`tel:+${site.primaryPhone.raw}`}>
              <span className="mobile-phone-label">Call us</span>
              <span className="mobile-phone-number">{site.primaryPhone.label}</span>
            </a>
            <Link className="mobile-cta" to="/contact">
              Book a demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
