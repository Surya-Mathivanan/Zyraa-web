import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import Btn from "../components/Btn.jsx";
import Loader from "../components/Loader.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { ArrowRight } from "../components/Icons.jsx";
import { demos, demoBySlug } from "../demos/registry.js";
import NotFound from "./NotFound.jsx";
import "./demos.css";
import "../demos/demo-kit.css";

export default function Demo() {
  const { slug } = useParams();
  const demo = demoBySlug[slug];
  if (!demo) return <NotFound />;

  const i = demos.indexOf(demo);
  const next = demos[(i + 1) % demos.length];
  const Lab = demo.component;

  return (
    <main className="page demo-page">
      <Seo
        title={`${demo.title} - live demo`}
        path={`/demos/${demo.slug}`}
        description={demo.blurb}
      />
      <Section tone={demo.tone} className="demo-head">
        <div className="container demo-head-inner">
          <Reveal>
            <Link to="/demos" className="back-link" data-cursor="Back">
              ← All demos
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="kicker">
              Demo {String(i + 1).padStart(2, "0")} · {demo.kicker}
            </span>
          </Reveal>
          <SplitWords
            as="h1"
            className="demo-title"
            text={demo.title}
            accent={demo.accent}
            delay={0.1}
          />
          <Reveal delay={0.3}>
            <p className="lede">{demo.blurb}</p>
          </Reveal>
          <Reveal delay={0.38} className="demo-rules">
            <span>Rules running</span>
            {demo.rules}
          </Reveal>
        </div>
      </Section>

      <Section tone={demo.tone} className="demo-lab-sec">
        <div className="container">
          <Suspense fallback={<Loader variant="inline" label="Loading the demo" />}>
            <Lab />
          </Suspense>
        </div>
      </Section>

      <Section tone={next.tone} className="section demo-next">
        <div className="container demo-next-inner">
          <span className="kicker">Next demo</span>
          <Link
            to={`/demos/${next.slug}`}
            className="demo-next-link"
            data-cursor="Next"
          >
            <span className="demo-next-title">{next.title}</span>
            <ArrowRight />
          </Link>
          <p className="lede">{next.blurb}</p>
          <Btn to="/contact" solid cursor="Demo">
            See it on your own data
          </Btn>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
