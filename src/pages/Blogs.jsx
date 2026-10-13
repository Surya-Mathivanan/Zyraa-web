import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import FadingStars from "../components/FadingStars.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { site } from "../data/site.js";
import { formatDate } from "../lib/date.js";
import "./blogs.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6M8 6H18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const posts = site.posts ?? [];
// Derived once: `posts` is static module data, so this needs no hook.
const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
const categories = ["All", ...new Set(posts.map((p) => p.category))];

function BlogsHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section className="blogs-hero" ref={ref}>
      <FadingStars count={80} speed={0.9} trail={1.2} />
      <div className="blogs-hero-glow" aria-hidden="true" />
      <div className="grain" />
      <motion.div className="container blogs-hero-inner" style={{ y, opacity }}>
        <Reveal delay={0.1}>
          <span className="kicker">Blogs · {site.productName}</span>
        </Reveal>
        <SplitWords as="h1" className="blogs-hero-title" text="Notes from the floor." delay={0.2} stagger={0.09} />
        <Reveal delay={0.5}>
          <p className="blogs-hero-text">
            What building an HRMS for manufacturing actually teaches you: where attendance breaks, why payroll
            disagrees with the register, and which rules are worth keeping.
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}

function PostCard({ post, index, featured = false }) {
  return (
    <Reveal delay={index * 0.08} className={`post-card-wrap ${featured ? "post-card-wrap--featured" : ""}`}>
      <Link to={`/blogs/${post.slug}`} className={`post-card ${featured ? "post-card--featured" : ""}`} data-cursor="Read">
        <div className="post-card-top">
          <span className="post-card-cat">{post.category}</span>
          <span className="post-card-meta">
            {formatDate(post.date)} · {post.readMins} min read
          </span>
        </div>
        <h2 className="post-card-title">{post.title}</h2>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <span className="post-card-link">
          Read article <Arrow />
        </span>
      </Link>
    </Reveal>
  );
}

function EmptyState() {
  return (
    <Reveal className="blogs-empty">
      <span className="blogs-empty-mark" aria-hidden="true">
        —
      </span>
      <h2>No articles yet.</h2>
      <p>The first few are being written. In the meantime, the fastest way to get an answer is to call.</p>
      <a className="blogs-empty-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
        {site.primaryPhone.label}
      </a>
    </Reveal>
  );
}

function PostList() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? sorted : sorted.filter((p) => p.category === active);

  if (!posts.length) {
    return (
      <section className="blogs-list">
        <div className="container">
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section className="blogs-list">
      <div className="container">
        <div className="blogs-list-head">
          <Reveal>
            <span className="kicker">
              {posts.length} article{posts.length === 1 ? "" : "s"}
            </span>
          </Reveal>
          {categories.length > 2 && (
            <Reveal delay={0.08} className="blogs-filters">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`blogs-filter ${active === c ? "is-active" : ""}`}
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                >
                  {c}
                </button>
              ))}
            </Reveal>
          )}
        </div>

        <div className="post-grid">
          {shown.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} featured={active === "All" && i === 0} />
          ))}
        </div>

        {!shown.length && (
          <Reveal className="blogs-none">
            <p>Nothing filed under “{active}” yet.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function BlogsCTA() {
  return (
    <section className="blogs-cta">
      <div className="container blogs-cta-inner">
        <Reveal>
          <span className="kicker">Next step</span>
        </Reveal>
        <SplitWords as="h2" className="blogs-cta-title" text="Got a month that never adds up?" delay={0.05} />
        <Reveal delay={0.25}>
          <p className="blogs-cta-text">
            Most of these notes started as a question from a unit in {site.location.city}. Send yours.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link className="pill-action" to="/contact" data-cursor="Talk">
            <span className="pill">Get in touch</span>
            <span className="pill-arrow">
              <Arrow />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Blogs() {
  return (
    <main className="page blogs">
      <Seo
        title="Blogs"
        path="/blogs"
        description="Notes on building an HRMS for manufacturing: attendance, payroll cycles, approval pipelines and the rules that keep a register defensible."
      />
      <BlogsHero />
      <PostList />
      <BlogsCTA />
      <Footer />
    </main>
  );
}
