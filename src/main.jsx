import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import { loadBrandFonts } from "./lib/brandFonts.js";
// Global layer only: tokens (palette, type roles, tones), the reset, and the
// shared building blocks. Every page and component imports its own CSS.
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/shared.css";

loadBrandFonts();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* reducedMotion="user" makes every framer-motion animation honour
          prefers-reduced-motion: transforms snap to their target while opacity
          still animates. Scroll-linked parallax checks the preference itself
          (see hooks/useParallax.js). */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);
