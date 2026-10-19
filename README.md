# ZYRAA HRMS - website

Marketing site for **Zyraa**, the HRMS for garment and knitwear units: biometric attendance,
shift rules, approval pipelines, staff and production payroll, gate passes, geo on-duty,
140+ reports and an MD portal - across an HR admin portal, an employee web app and a mobile
app. Designed and built by **Surya** in Tiruppur.

Every product statement on the site was checked against the three product repositories
(HR portal, employee web app, mobile app). Keep it that way: nothing goes on the site that
the product does not ship. Notably, the site does **not** claim full & final settlement,
two-factor login, Meta's WhatsApp Cloud API, Tamil/Hindi in the mobile app, or the ERP
modules (those are presented as roadmap only).

## Stack

- React 19 + Vite 8, react-router-dom 7 (every route lazy-loaded and preloaded on idle)
- framer-motion (scroll parallax, reveals, page transitions), lenis (smooth scrolling)
- No CSS framework: plain CSS, one file per page/component

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/ (hashed files in dist/static/)
npm run lint      # oxlint
```

## Structure

```
src/
  main.jsx                entry: global CSS layer + brand font loader
  App.jsx                 routes, smooth scroll, page curtain, cursor
  styles/
    tokens.css            palette, type roles, colour tones (the only design variables)
    base.css              reset and document defaults
    shared.css            layout, labels, headings, buttons, chips, marquee
  data/
    site.js               product facts: nav, stats, apps, the 5 pillars / 19 modules, roles
    reports.js            the full Report Center catalogue (148 reports, 9 categories)
    posts/index.js        journal index (title, accent, category, date, tone…)
    posts/<slug>.js       one article body per file, loaded on demand
  lib/
    brandFonts.js         loads licensed brand fonts dropped into src/assets/fonts/
    boot.js               lifts the first-paint loader once the first page has rendered
    rules/                the product's rules as pure functions (used by the demos):
                          arrival.js (staff timeline + late pool), production.js (shift
                          ladder), payroll.js (staff payslip), requests.js (pipelines +
                          request window), time.js
  demos/                  ten interactive demos, one chunk each, + registry.js + kit
  components/             Nav, Footer, Section (tones), Btn, Loader, Reveal/SplitWords, ScrollText,
                          StitchLine, Marquee, CountUp, FadingStars, SignalType,
                          ShatterType, UserCursor, mockups/ (phone + browser screens)
  pages/                  Home, Features, Apps, Demos, Demo, About, Blogs, BlogPost,
                          Contact, NotFound - each with its own stylesheet
```

## Loading

One loader covers every wait: a needle sews the Z inside a stitched hoop, then the thread
runs through the letters of ZYRAA. Its CSS is inline in `index.html`, so it needs nothing
from the network:

- **First load / refresh** - `#boot` in `index.html` paints before any JavaScript arrives and
  is lifted (`src/lib/boot.js`) once the first page has rendered.
- **Changing page** - the route `Suspense` fallback in `App.jsx` (`<Loader />`), shown only if
  the page chunk takes longer than a quarter second.
- **Inside a page** - `<Loader variant="inline" label="…" />` for a demo, an article body and
  the Contact map.

The other routes are fetched in the background only after the first page is up, so on a slow
connection they never compete with the page being waited on.

## CSS architecture

`tokens.css`, `base.css` and `shared.css` are the only global CSS (≈17 kB). Every page and
component imports its own stylesheet, so Vite splits CSS per route chunk: a visitor to Home
never downloads the demo or journal styles.

## Colour: palette and tones

The 13 brand colours are in `tokens.css`. They are combined into **tones** - full colour role
sets (`--bg`, `--fg`, `--fg-2`, `--fg-3`, `--line`, `--card`, `--accent`, `--accent-2`,
`--on-accent`), each checked for ≥ 4.5:1 body-text contrast:

| Tone    | Background | Text    | Accent  |
| ------- | ---------- | ------- | ------- |
| night   | #0E0929    | #EBF1F5 | #F3F298 |
| ink     | #010B13    | #DFE8E7 | #92ACFF |
| indigo  | #353A96    | #FCF0D6 | #F3F298 |
| cobalt  | #285CCC    | #FFFFFF | #FFEFB4 |
| crimson | #B40023    | #FCF0D6 | #F3F298 |
| rust    | #A0430A    | #FCF0D6 | #FFEFB4 |
| cream   | #FCF0D6    | #0E0929 | #B40023 |
| sand    | #F5E4D0    | #010B13 | #A0430A |
| butter  | #FFEFB4    | #0E0929 | #B40023 |
| lemon   | #F3F298    | #0E0929 | #353A96 |
| mist    | #EBF1F5    | #0E0929 | #285CCC |
| sage    | #DFE8E7    | #010B13 | #353A96 |

Wrap a section in `<Section tone="cream">`. When it crosses the middle of the screen its tone
is written to `<html data-tone>`, and because the tone variables are registered with
`@property`, the whole page cross-fades to it - that is the smooth section-to-section colour
change. `.tone-x` pins a tone on a single element (cards, mockups). Each page has its own
sequence: Home night → cream → indigo → ink → butter → sage → mist → sand; Features ink plus a
tone per pillar; About sand/cream/rust; Journal cream; Contact cobalt → butter → night → sage; 404 crimson.

## Typography

Six brand display faces fill named roles. Their files are **not** in the repo (all six are
commercial or personal-use-only licences); drop licensed files into `src/assets/fonts/` named
after the family and they load automatically - see `src/assets/fonts/README.md`.

| Role (`tokens.css`)                               | Brand face    | Fallback shown until the file is added |
| ------------------------------------------------- | ------------- | -------------------------------------- |
| `--font-chomp` - giant display words              | Whole Chomp   | Anton                                  |
| `--font-moste` - page and section headings        | Moste         | Bricolage Grotesque                    |
| `--font-romance` - italic accent word in headings | Young Romance | Fraunces Italic                        |
| `--font-trufter` - card and article titles        | Trufter       | Bricolage Grotesque                    |
| `--font-seatren` - figures, stats, marquee        | Seatren       | Bricolage Grotesque (condensed)        |
| `--font-star` - nav, buttons, chips               | Starplayer    | Bricolage Grotesque                    |

Body text is Inter; labels are JetBrains Mono. Mark an accent word in a heading with
`<SplitWords text="…" accent="phrase" />` or `<em className="accent-word">`.

## Live demos

`/demos` lists ten demos; each runs the product's real defaults from `src/lib/rules/`:
arrival timeline, production day, approval pipeline, payslip builder, geo punch & on-duty,
gate pass & tea break, employee month, device board, Report Center and the MD assistant
(scripted, sample data). Add one by writing a component in `src/demos/` and an entry in
`registry.js`.

## Journal

`src/data/posts/index.js` lists the articles; each body is `src/data/posts/<slug>.js`, an
array of blocks: `p`, `h2`, `list`, `steps`, `quote`, `callout`, `figure` (`**bold**` and
`*italic*` allowed in text). Add the slug to `public/sitemap.xml`.

## Motion and `prefers-reduced-motion`

`MotionConfig reducedMotion="user"` covers framer-motion animations. Scroll-linked parallax
goes through `useParallax()`, which returns a still value under reduced motion; the stitch
lines, scroll text, star canvas, neon wordmark, shattered headline and colour fades all honour
the preference too.

## Assets, SEO, deploy

- Every static asset lives in `public/assets/` - see `ASSETS.md`.
- `index.html` holds the static title, Open Graph tags and JSON-LD (social scrapers don't run
  JS). `Seo.jsx` sets per-route tags. **The domain `https://zyraa.app` is a placeholder** in
  `site.js`, `index.html`, `public/sitemap.xml` and `robots.txt`.
- The build is static: upload `dist/`, and serve `index.html` for every path
  (`public/_redirects` does this on Netlify). Hashed bundles in `dist/static/` can be cached
  forever; files in `dist/assets/` are swap-in-place and should not be.
