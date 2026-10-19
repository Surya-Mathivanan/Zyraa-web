import { Link } from "react-router-dom";
import { Reveal } from "./Reveal.jsx";
import { ArrowUpRight } from "./Icons.jsx";
import AccentTitle from "./AccentTitle.jsx";
import PostCover from "./PostCover.jsx";
import { categoryOf } from "../data/categories.js";
import { formatDate } from "../lib/date.js";
import "./journal-card.css";

/**
 * An article card: the article's own cover art in its category colour, then
 * date, title, excerpt and a read link. `wide` lays the cover beside the text.
 * The card carries its own light colours, so it reads on any page tone.
 */
export default function JournalCard({ post, wide = false, delay = 0, className = "" }) {
  return (
    <Reveal delay={delay} className={`jc-cell ${wide ? "jc-cell--wide" : ""} ${className}`}>
      <Link
        to={`/blogs/${post.slug}`}
        className={`jc is-hover-art ${wide ? "jc--wide" : ""}`}
        style={{ "--cat": categoryOf(post.category).ink }}
        data-cursor="Read"
      >
        <PostCover post={post} className="jc-cover" />
        <div className="jc-body">
          <span className="jc-meta">
            {formatDate(post.date)} · {post.readMins} min read
          </span>
          <h3 className="jc-title">
            <AccentTitle title={post.title} accent={post.accent} />
          </h3>
          <p>{post.excerpt}</p>
          <span className="jc-cta">
            Read article <ArrowUpRight />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
