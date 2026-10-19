import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import Marquee from "../components/Marquee.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { ArrowUpRight, Play } from "../components/Icons.jsx";
import { demos } from "../demos/registry.js";
import "./demos.css";

/** A demo card that tilts toward the pointer. */
function DemoCard({ demo, index }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set((0.5 - (e.clientY - r.top) / r.height) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Reveal delay={(index % 3) * 0.07}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      >
        <Link to={`/demos/${demo.slug}`} className={`demo-card tone-${demo.tone}`} data-cursor="Play">
          <span className="demo-card-top">
            <span className="demo-card-n figure">{String(index + 1).padStart(2, "0")}</span>
            <span className="chip">{demo.kicker}</span>
          </span>
          <span className="demo-card-title">{demo.title}</span>
          <span className="demo-card-blurb">{demo.blurb}</span>
          <span className="demo-card-foot">
            <span className="demo-card-play">
              <Play />
            </span>
            Open demo
            <ArrowUpRight className="demo-card-arrow" />
          </span>
        </Link>
      </motion.div>
    </Reveal>
  );
}

export default function Demos() {
  return (
    <main className="page demos-page">
      <Seo
        title="Live demos"
        path="/demos"
        description="Interactive demos of Zyraa's real rules: the arrival timeline, production pay, approval pipelines, payslips, geo on-duty, gate passes, device diagnostics, reports and the MD assistant."
      />
      <Section tone="mist" className="demos-hero">
        <div className="container demos-hero-inner">
          <Reveal>
            <span className="kicker">Live demos</span>
          </Reveal>
          <SplitWords as="h1" className="demos-hero-title" text="The rules, running." accent="running." delay={0.1} />
          <Reveal delay={0.35}>
            <p className="lede">
              Ten small labs built on the rules Zyraa ships with. Nothing here is a screenshot: change an input and
              the same logic the product uses recalculates the day, the pay or the pipeline. All data is made up.
            </p>
          </Reveal>
        </div>
        <Marquee items={demos.map((d) => d.title)} speed={44} className="demos-marquee" />
      </Section>

      <Section tone="mist" className="section demos-grid-sec">
        <div className="container demos-grid">
          {demos.map((d, i) => (
            <DemoCard key={d.slug} demo={d} index={i} />
          ))}
        </div>
      </Section>
      <Footer />
    </main>
  );
}
