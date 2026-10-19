import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Section from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import Seo from "../components/Seo.jsx";
import Btn from "../components/Btn.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { posts } from "../data/posts/index.js";
import { formatDate } from "../lib/date.js";
import AccentTitle from "../components/AccentTitle.jsx";
import PostCover, { CategoryIcon } from "../components/PostCover.jsx";
import JournalCard from "../components/JournalCard.jsx";
import { categoryOf } from "../data/categories.js";
import NotFound from "./NotFound.jsx";
import "./blogs.css";

// Article bodies load on demand, one small chunk per post.
const bodies = import.meta.glob("../data/posts/*.js", { import: "default" });

/** **bold** and *italic* inside a block's text. */
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function Block({ b }) {
  switch (b.type) {
    case "h2":
      return <h2 className="ps-h2">{b.text}</h2>;
    case "list":
      return (
        <ul className="ps-list">
          {b.items.map((it) => (
            <li key={it}>
              <Rich text={it} />
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="ps-steps">
          {b.items.map((it, i) => (
            <li key={it.title}>
              <span className="figure">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{it.title}</strong>
                <p>
                  <Rich text={it.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="ps-quote">
          <p>
            <Rich text={b.text} />
          </p>
          {b.cite && <cite>{b.cite}</cite>}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="ps-callout">
          <span className="kicker">{b.title}</span>
          <p>
            <Rich text={b.text} />
          </p>
        </aside>
      );
    case "figure":
      return (
        <figure className="ps-figure">
          <span className="figure">{b.value}</span>
          <figcaption>{b.label}</figcaption>
        </figure>
      );
    default:
      return (
        <p className="ps-p">
          <Rich text={b.text} />
        </p>
      );
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const [blocks, setBlocks] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const load = post && bodies[`../data/posts/${post.slug}.js`];
    if (!load) return undefined;
    let live = true;
    load().then((b) => live && setBlocks(b));
    return () => {
      live = false;
    };
  }, [post]);

  if (!post) return <NotFound />;

  const i = posts.indexOf(post);
  const others = [posts[(i + 1) % posts.length], posts[(i + 2) % posts.length]];

  return (
    <main className="page post">
      <Seo title={post.title} path={`/blogs/${post.slug}`} description={post.excerpt} />
      <motion.div className="ps-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <Section tone={post.tone} className="ps-head">
        <div className="container ps-narrow">
          <Reveal>
            <Link to="/blogs" className="back-link" data-cursor="Back">
              ← The journal
            </Link>
          </Reveal>
          <Reveal delay={0.05} className="ps-meta">
            <span className="ps-cat" style={{ "--cat": categoryOf(post.category).ink }}>
              <CategoryIcon name={post.category} />
              {post.category}
            </span>
            <span>
              {formatDate(post.date)} · {post.readMins} min read · by Surya
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="ps-title">
              <AccentTitle title={post.title} accent={post.accent} />
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="ps-lede">{post.excerpt}</p>
          </Reveal>
          <Reveal delay={0.28} className="ps-cover-wrap is-hover-art">
            <PostCover post={post} showMeta={false} className="ps-cover" />
          </Reveal>
        </div>
      </Section>

      <Section tone={post.tone} as="article" className="ps-body">
        <div className="container ps-narrow">
          {!blocks && <p className="dm-loading">Loading the article…</p>}
          {blocks?.map((b, k) => (
            <Block key={k} b={b} />
          ))}
        </div>
      </Section>

      <Section tone="night" className="section ps-more">
        <div className="container">
          <div className="ps-more-head">
            <span className="kicker">Keep reading</span>
            <Btn to="/demos" cursor="Play">
              Or try the live demos
            </Btn>
          </div>
          <div className="ps-more-grid">
            {others.map((o, k) => (
              <JournalCard key={o.slug} post={o} delay={k * 0.08} />
            ))}
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
