# Zyraa assets

Every static asset the site references lives in `public/assets/`. **Replace the files,
keep the filenames** - nothing in the markup needs to change.

| File                                | Size / format              | Used by                              | Notes                                                                            |
| ----------------------------------- | -------------------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| `emblem.webp`                       | 512×512 WebP, transparent  | About hero                           | The circular Z emblem (not on Home, by choice).                                  |
| `emblem-160.webp`                   | 160×160 WebP, transparent  | - (spare, small)                     | Small emblem, kept for future use.                                               |
| `wordmark.webp`                     | 960 wide WebP, transparent | - (spare, full size)                 | The "Zyraa" wordmark. Reads best on dark tones.                                  |
| `wordmark-480.webp`                 | 480 wide WebP, transparent | Nav logo, footer, mockup sidebars    |                                                                                  |
| `favicon-48.png` / `favicon-32.png` | PNG, transparent           | `index.html`, manifest               | Browser tab icon.                                                                |
| `apple-touch-icon.png`              | 180×180 PNG                | `index.html`, manifest               | Emblem on navy.                                                                  |
| `icon-512.png`                      | 512×512 PNG                | manifest                             | Emblem on navy.                                                                  |
| `og-image.jpg`                      | **1200×630** JPEG, ~110 KB | `og:image`, `twitter:image`, JSON-LD | Link-preview card. Keep the size, and keep it under 300 KB or WhatsApp skips it. |
| `site.webmanifest`                  | JSON                       | `index.html` → `rel="manifest"`      | Name and colours for home-screen installs.                                       |

## Where these came from

The emblem and wordmark were cut out of the two supplied logo renders. Those files had a grey
checkerboard painted into the pixels (not real transparency), so the background was removed by
colour: the checkerboard is pure neutral grey and the artwork is saturated blue, yellow and
navy. If you get proper transparent PNG or SVG masters from the designer, replace these files
with them at the sizes above.

## Fonts

Brand font files are not assets here - they go in `src/assets/fonts/` (see the README there)
so Vite can hash and bundle them.

## Not files

Generated in code rather than loaded: the grain texture (data URI in `shared.css`), the
star backgrounds (`FadingStars` canvas), all product mockups (`components/mockups/`), the
stitch lines and diagrams (inline SVG), and the Contact map (a Google Maps iframe).
