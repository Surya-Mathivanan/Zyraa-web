import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import { Reveal, SplitWords } from "../components/Reveal.jsx";
import { ArrowUpRight } from "../components/Icons.jsx";
import AccentTitle from "../components/AccentTitle.jsx";
import PostCover, { CategoryIcon } from "../components/PostCover.jsx";
import JournalCard from "../components/JournalCard.jsx";
import { posts } from "../data/posts/index.js";
import { categoryOf } from "../data/categories.js";
import { formatDate } from "../lib/date.js";
import "./blogs.css";

const categories = ["All", ...new Set(posts.map((p) => p.category))];
const countOf = (c) => (c === "All" ? posts.length : posts.filter((p) => p.category === c).length);

// Wide cards in the bento grid (positions in the list under the featured
// article). With nine cards this tiles 3 columns × 4 rows with no gaps.
const WIDE = new Set([0, 6, 7]);

function Featured({ post }) {
  return (
    <Reveal>
      <Link
        to={`/blogs/${post.slug}`}
        className="bl-featured is-hover-art"
        style={{ "--cat": categoryOf(post.category).ink }}
        data-cursor="Read"
      >
        <div className="bl-featured-copy">
          <span className="bl-featured-flag">Latest article</span>
          <span className="bl-meta">
            <CategoryIcon name={post.category} />
            {post.category} · {formatDate(post.date)} · {post.readMins} min read
          </span>
          <h2 className="bl-featured-title">
            <AccentTitle title={post.title} accent={post.accent} />
          </h2>
          <p>{post.excerpt}</p>
          <span className="bl-cta">
            Read the article <ArrowUpRight />
          </span>
        </div>
        <PostCover post={post} className="bl-featured-cover" />
      </Link>
    </Reveal>
  );
}

export default function Blogs() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? posts : posts.filter((p) => p.category === active);
  const [first, ...rest] = shown;
  const bento = rest.length >= 5;

  return (
    <main className="page blogs">
      <Seo
        title="Journal"
        path="/blogs"
        description="Notes on garment-industry HR: attendance that becomes payroll, the quarter-shift rule, production pay by the shift, request windows, biometrics on factory networks and more."
      />
      <Section tone="cream" className="bl-hero">
        <div className="container bl-hero-inner">
          <Reveal>
            <span className="kicker">The journal · {posts.length} articles</span>
          </Reveal>
          <SplitWords as="h1" className="bl-hero-title" text="Notes from the floor." accent="the floor." delay={0.1} />
          <Reveal delay={0.35}>
            <p className="lede">
              What building an HRMS for garment units teaches you: where attendance breaks, why payroll disagrees with
              the register, and which rules are worth keeping.
            </p>
          </Reveal>
          <Reveal delay={0.45} className="bl-filters" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={active === c ? "is-on" : ""}
                aria-pressed={active === c}
                onClick={() => setActive(c)}
                style={c === "All" ? undefined : { "--cat": categoryOf(c).ink }}
              >
                {c !== "All" && <CategoryIcon name={c} />}
                {c}
                <span className="bl-filter-n">{countOf(c)}</span>
              </button>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="cream" className="bl-list">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {first && <Featured post={first} />}
              {rest.length > 0 && (
                <div className="bl-grid">
                  {rest.map((p, i) => (
                    <JournalCard key={p.slug} post={p} delay={(i % 3) * 0.06} wide={bento && WIDE.has(i)} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
