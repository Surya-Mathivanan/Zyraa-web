import { Link } from "react-router-dom";
import { ArrowUpRight } from "./Icons.jsx";

/**
 * The site's one button: a pill whose fill wipes up on hover, with a round
 * icon that turns. Renders a router Link for `to`, an anchor for `href`, and a
 * button otherwise.
 */
export default function Btn({ to, href, solid = false, icon = <ArrowUpRight />, cursor, className = "", children, ...rest }) {
  const cls = `btn ${solid ? "btn--solid" : ""} ${className}`;
  const body = (
    <>
      <span>{children}</span>
      <span className="btn-icon">{icon}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} data-cursor={cursor} {...rest}>
        {body}
      </Link>
    );
  }
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        data-cursor={cursor}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {body}
      </a>
    );
  }
  return (
    <button type="button" className={cls} data-cursor={cursor} {...rest}>
      {body}
    </button>
  );
}
