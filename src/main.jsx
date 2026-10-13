import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* reducedMotion="user" makes every framer-motion animation honour
          prefers-reduced-motion: transform and layout values snap to their
          target while opacity and colour still animate. That covers the page
          curtain, Reveal and SplitWords without hiding any content.
          Scroll-linked parallax (useScroll/useTransform) is NOT covered by
          this and still runs — see README. */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);
