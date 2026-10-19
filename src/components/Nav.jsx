import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { site } from "../data/site.js";
import { getLenis } from "../hooks/useLenis.js";
import { createHeaderScroll } from "../lib/headerScroll.js";
import { ArrowUpRight, Phone } from "./Icons.jsx";
import "./nav.css";

const isActive = (to, path) => (to === "/" ? path === "/" : path === to || path.startsWith(`${to}/`));

/**
 * A floating glass capsule. A single highlight pill slides between links —
 * it follows the pointer and rests on the current page — and a thin line
 * along the capsule's bottom edge shows how far down the page you are.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });

  // Tightens once the page moves; hides on a downward scroll and comes back on
  // the way up, so it never sits over content someone is reading.
  useEffect(() => {
    // See lib/headerScroll.js: the tiny steps at the tail of a smooth scroll
    // must not pop the header back in.
    const update = createHeaderScroll(window.scrollY);
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(update(y));
    };
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
  // would keep scrolling through a plain `overflow: hidden`, so stop it too.
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

  // Publish whether the header is showing, so sticky bars elsewhere (the
  // Features pillar index) can sit just below it, or take its place when it
  // hides. See --header-clear in tokens.css.
  const headerShown = !(hidden && !open);
  useEffect(() => {
    document.documentElement.dataset.nav = headerShown ? "shown" : "hidden";
  }, [headerShown]);

  const current = site.nav.find((l) => isActive(l.to, location.pathname))?.to;
  const pillOn = hovered ?? current;

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "nav--scrolled" : ""} ${hidden && !open ? "nav--hidden" : ""} ${open ? "nav--open" : ""}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="nav-shell">
          <Link className="logo" to="/" data-cursor="Home" aria-label={`${site.productName} home`}>
            <img className="logo-wordmark" src="/assets/wordmark-480.webp" alt="" width="104" height="50" />
            <span className="logo-tag">HRMS</span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation" onMouseLeave={() => setHovered(null)}>
            {site.nav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={`nav-link ${current === l.to ? "is-current" : ""}`}
                onMouseEnter={() => setHovered(l.to)}
                onFocus={() => setHovered(l.to)}
                onBlur={() => setHovered(null)}
                data-cursor={l.label}
              >
                {pillOn === l.to && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`nav-pill ${hovered && hovered !== current ? "nav-pill--hover" : ""}`}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="nav-link-text">{l.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <a className="nav-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call" aria-label={`Call ${site.primaryPhone.label}`}>
              <Phone />
              <span className="nav-phone-ping" aria-hidden="true" />
            </a>
            <Link className="nav-cta" to="/contact" data-cursor="Demo">
              <span>Book a demo</span>
              <span className="nav-cta-icon">
                <ArrowUpRight />
              </span>
            </Link>
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
          </div>

          <motion.span className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-panel tone-night"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="mobile-links" aria-label="Mobile navigation">
              {site.nav.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <NavLink to={l.to} end={l.to === "/"} className="mobile-link">
                    <span className="mobile-index">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-foot">
              <a href={`tel:+${site.primaryPhone.raw}`}>
                <span>Call the developer</span>
                <strong>{site.primaryPhone.label}</strong>
              </a>
              <Link className="btn btn--solid" to="/contact">
                <span>Book a demo</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
