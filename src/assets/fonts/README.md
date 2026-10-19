# Brand fonts

Drop licensed font files here. Name each file after its family and they are picked up
automatically by `src/lib/brandFonts.js` - no CSS or markup change needed:

| File name starts with | Family        | Role on the site                                                |
| --------------------- | ------------- | --------------------------------------------------------------- |
| `WholeChomp`          | Whole Chomp   | Giant display words (hero wordmarks, footer, 404)               |
| `Moste`               | Moste         | Page and section headings                                       |
| `YoungRomance`        | Young Romance | The italic accent word inside headings                          |
| `Trufter`             | Trufter       | Card titles, article titles (`Trufter-Italic.*` for the italic) |
| `Seatren`             | Seatren       | Big figures, stats, marquee text                                |
| `Starplayer`          | Starplayer    | Navigation, buttons, chips                                      |

Accepted formats: `.woff2` (preferred, smallest), `.woff`, `.otf`, `.ttf`.

Until a file is present, the matching Google fallback renders instead
(Anton, Bricolage Grotesque, Fraunces) - see the `--font-*` stacks in `src/styles/tokens.css`.

## Licensing

All six are commercial or "free for personal use" fonts. A business website needs a
commercial (web) licence for each one before its file goes in this folder. In particular,
`WholeChomp-Regular.otf` from the HR portal repo is under the 1001Fonts _Free For Personal
Use_ licence, which excludes company websites.
