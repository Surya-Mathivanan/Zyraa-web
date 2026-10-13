import { Link, useParams } from "react-router-dom";
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

export default function BlogPost() {
  const { slug } = useParams();
  const posts = site.posts ?? [];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="page blogs">
        <Seo title="Article not found" path={`/blogs/${slug ?? ""}`} description="That article does not exist." noindex />
        <section className="post-missing">
          <div className="container post-missing-inner">
            <Reveal>
              <span className="kicker">Error 404</span>
            </Reveal>
            <SplitWords as="h1" className="post-missing-title" text="That article doesn't exist." delay={0.05} />
            <Reveal delay={0.2}>
              <p className="post-missing-text">The link may be out of date. Everything we have published is on the blog index.</p>
            </Reveal>
            <Reveal delay={0.28}>
              <Link className="pill-action" to="/blogs" data-cursor="Blogs">
                <span className="pill">All articles</span>
                <span className="pill-arrow">
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="page blogs">
      <Seo title={post.title} path={`/blogs/${post.slug}`} description={post.excerpt} />

      <article className="post">
        <header className="post-head">
          <div className="container post-head-inner">
            <Reveal>
              <Link className="post-back" to="/blogs" data-cursor="Back">
                ← All articles
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <span className="kicker">
                {post.category} · {formatDate(post.date)} · {post.readMins} min read
              </span>
            </Reveal>
            <SplitWords as="h1" className="post-title" text={post.title} delay={0.1} stagger={0.045} />
            <Reveal delay={0.3}>
              <p className="post-lede">{post.excerpt}</p>
            </Reveal>
          </div>
        </header>

        <div className="container post-body">
          {post.body?.map((para, i) => (
            <Reveal key={i} delay={0.05 + i * 0.05}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>

        <div className="container post-foot">
          <Reveal className="post-foot-cta">
            <div>
              <span className="kicker">Next step</span>
              <h2>Seeing this on your floor?</h2>
            </div>
            <div className="post-foot-actions">
              <a className="post-foot-phone" href={`tel:+${site.primaryPhone.raw}`} data-cursor="Call">
                {site.primaryPhone.label}
              </a>
              <Link className="pill-action" to="/contact" data-cursor="Contact">
                <span className="pill">Get in touch</span>
                <span className="pill-arrow">
                  <Arrow />
                </span>
              </Link>
            </div>
          </Reveal>

          {others.length > 0 && (
            <div className="post-more">
              <span className="kicker">Keep reading</span>
              <div className="post-more-grid">
                {others.map((o, i) => (
                  <Reveal key={o.slug} delay={i * 0.08}>
                    <Link to={`/blogs/${o.slug}`} className="post-more-card" data-cursor="Read">
                      <span className="post-more-cat">{o.category}</span>
                      <strong>{o.title}</strong>
                      <span className="post-more-link">
                        Read <Arrow />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
