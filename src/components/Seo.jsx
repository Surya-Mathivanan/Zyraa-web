import { useEffect } from "react";
import { site } from "../data/site.js";

/**
 * Per-route head tags: title, description, canonical and the og/twitter values
 * that mirror them.
 *
 * Managed imperatively rather than by rendering tags, so there is exactly one
 * of each in the head and no ordering ambiguity with the static tags in
 * index.html (browsers honour the FIRST <title> they see, which would pin every
 * route to the one baked into the HTML).
 *
 * Note: social scrapers (WhatsApp, Facebook, LinkedIn, X) do not execute JS, so
 * they always read the static homepage values from index.html. Per-route link
 * previews would need prerendering. Google executes JS and does pick these up.
 */

const ORIGIN = site.url;

function setMeta(selector, attr, value, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

export default function Seo({ title, description, path = "/", noindex = false }) {
  const fullTitle = title ? `${title} — ${site.productName}` : site.defaultTitle;

  useEffect(() => {
    document.title = fullTitle;

    const canonicalHref = `${ORIGIN}${path}`;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalHref);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    // Keep the 404 out of the index; every other route is indexable.
    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      setMeta('meta[name="robots"]', "name", "robots", "noindex, follow");
    } else if (robots) {
      robots.remove();
    }
  }, [fullTitle, description, path, noindex]);

  return null;
}
