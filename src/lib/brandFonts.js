/**
 * Loads the brand display faces from src/assets/fonts/ - but only the ones
 * whose files are actually there.
 *
 * The six faces (Whole Chomp, Young Romance, Moste, Seatren, Trufter,
 * Starplayer) are commercial or personal-use-only fonts, so their files are not
 * shipped with the repo. Drop a licensed file in that folder, named after the
 * family (e.g. `Moste.woff2`, `Trufter-Italic.otf`), and it is bundled,
 * hashed and registered automatically. Until then every role falls back to the
 * Google face set next to it in tokens.css, and no request 404s.
 */

const files = import.meta.glob("../assets/fonts/*.{woff2,woff,otf,ttf}", {
  eager: true,
  query: "?url",
  import: "default",
});

// Filename prefix (lowercase, letters only) → CSS family name used in tokens.css.
const FAMILIES = {
  wholechomp: "Whole Chomp",
  youngromance: "Young Romance",
  moste: "Moste",
  seatren: "Seatren",
  trufter: "Trufter",
  starplayer: "Starplayer",
};

const FORMATS = {
  woff2: "woff2",
  woff: "woff",
  otf: "opentype",
  ttf: "truetype",
};

export function loadBrandFonts() {
  if (typeof FontFace === "undefined") return;

  for (const [path, url] of Object.entries(files)) {
    const file = path.split("/").pop();
    const ext = file.split(".").pop().toLowerCase();
    const key = file.toLowerCase().replace(/[^a-z]/g, "");
    const match = Object.keys(FAMILIES).find((prefix) =>
      key.startsWith(prefix),
    );
    if (!match) continue;

    const face = new FontFace(
      FAMILIES[match],
      `url(${url}) format("${FORMATS[ext]}")`,
      {
        style: /italic|oblique/i.test(file) ? "italic" : "normal",
        display: "swap",
      },
    );
    face
      .load()
      .then((loaded) => document.fonts.add(loaded))
      .catch(() => {
        /* A bad file just leaves the fallback in place. */
      });
  }
}
