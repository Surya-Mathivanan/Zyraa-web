# ZYRAA HRMS — website

Static marketing site for **Zyraa**, an HRMS for manufacturing units: biometric attendance,
staff and production payroll, leave and permission approvals, geo on-duty tracking and
reporting. Designed and built by **Surya** in Tiruppur.

The site covers one product only. There is no team page — Zyraa is a one-developer product.

## Stack

- React 19 + Vite
- react-router-dom (Home, Features, About, Blogs, Blog post, Contact, 404)
- framer-motion (scroll parallax, reveals, page transitions)
- lenis (smooth scrolling)
- Google Fonts: Sora (display), Inter (body), JetBrains Mono (labels and figures)

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve dist/
```

## Structure

```
src/
  App.jsx                 routes, smooth scroll, page transitions, cursor
  data/site.js            product name, url, phone, modules, roles, posts (edit content here)
  lib/date.js             shared date formatting
  components/
    Nav.jsx / Footer.jsx
    Seo.jsx               per-route title, description and canonical
    FadingStars.jsx       stars rising from beyond the frame on fading trails
    SignalType.jsx        "ZYRAA" hero wordmark: letters flicker on like a neon sign
    ShatterType.jsx       glass-shard headline on /features: hover to crack, click to shatter
    UserCursor.jsx        collaborator-style cursor with a name tag (desktop only)
    Reveal.jsx            scroll reveal helpers
    ScrollCircle.jsx      rotating "scroll to explore" button
  pages/                  Home, Features, About, Blogs, BlogPost, Contact, NotFound
                          (+ one CSS file each; Blogs and BlogPost share blogs.css)
```

All content lives in `src/data/site.js`. Changing the phone number, the module list or the
blog posts is a one-file edit.

## The Fading Stars animation

`FadingStars.jsx` is the home and background animation: stars seeded below the bottom edge
drift upward with a slight sway, each trailing a tail that fades behind it. Depth drives
size, speed, trail length and brightness together, so near stars read as near.

It is a hand-written canvas component, not the React Bits Pro component. The Pro version was
blocked three ways — no `REACTBITS_LICENSE_KEY`, no `components.json`, and the `-tw` variant
needs Tailwind, which this project does not use.

Props: `count`, `speed`, `trail`, `size`, `colors`, `opacity`. The population scales with the
canvas area, so a slim band is not as busy as a full-height hero.

Implementation notes:

- Device pixel ratio is capped at 1.75.
- The RAF loop stops while the canvas is off-screen (IntersectionObserver) or the tab is
  hidden (`visibilitychange`), and resize is debounced.
- Trails are drawn as six fading, narrowing segments rather than a gradient object per star
  per frame.
- The first frame is painted synchronously, so there is no empty-canvas flash and a surface
  where RAF is throttled to nothing still shows stars.
- Under `prefers-reduced-motion` it paints one static starfield and never starts a loop.

## Motion and `prefers-reduced-motion`

`FadingStars` and `ShatterType` check the preference themselves. `MotionConfig
reducedMotion="user"` in `main.jsx` covers every framer-motion animation: transforms snap to
their target while opacity still animates, so the page curtain, `Reveal` and `SplitWords`
settle instantly without hiding content. `SignalType` resolves to a fully lit sign with no
flicker, and its resting CSS state is lit, so a missed viewport observer costs the animation
rather than the headline.

Not yet covered: scroll-linked parallax (`useScroll` / `useTransform` in the page sections)
still runs for users who ask for reduced motion.

## SEO

- `index.html` holds the static title, description, canonical, Open Graph/Twitter tags and
  `SoftwareApplication` JSON-LD. Social scrapers do not run JS, so these homepage values are
  what every shared link preview uses.
- `Seo.jsx` sets per-route title, description and canonical for crawlers that do run JS, and
  marks the 404 and unknown post slugs `noindex, follow`.
- `public/robots.txt` and `public/sitemap.xml` list the public routes.
- **`og-image.png` is not in the repo yet.** `index.html` references `/og-image.png` at
  1200x630; drop that file into `public/` or link previews will render without an image.
- **The domain is a placeholder.** `https://zyraa.app` appears in three places: `site.url` in
  `src/data/site.js`, the absolute URLs in `index.html`, and `public/sitemap.xml` (plus
  `robots.txt`). Update all of them together once the real domain is known.

## Blog content

`site.posts` drives both `/blogs` and `/blogs/<slug>`. Each entry needs `slug`, `title`,
`category`, `date` (ISO), `readMins`, `excerpt` and a `body` array of paragraphs. Categories
become the filter chips automatically, and the newest `date` is featured at the top.

**The three posts currently in there are placeholder copy** written to show the layout —
replace their text with real articles, or empty the array and the index renders its empty
state. Update `public/sitemap.xml` when slugs change.

## Deploy

The build is fully static. Upload `dist/` to any static host (Netlify, Vercel, GitHub Pages,
cPanel). For client-side routing, configure the host to serve `index.html` for all paths —
`public/_redirects` already contains `/* /index.html 200` for Netlify.

Unknown paths render the `NotFound` page, which sets `noindex`. Because the host rewrites
every path to `index.html`, that page is still served with HTTP 200; a true 404 status would
need prerendering or host-level rules.
