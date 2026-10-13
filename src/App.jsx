import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/Nav.jsx";
import UserCursor from "./components/UserCursor.jsx";
import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import About from "./pages/About.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useLenis, scrollToTop, scrollToSelector } from "./hooks/useLenis.js";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = setTimeout(() => scrollToSelector(hash), 450);
      return () => clearTimeout(id);
    }
    scrollToTop(true);
    return undefined;
  }, [pathname, hash]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

const curtainVariants = {
  initial: { scaleY: 1 },
  enter: { scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }, transitionEnd: { display: "none" } },
  exit: { display: "block", scaleY: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
};

export default function App() {
  useLenis();
  const location = useLocation();

  return (
    <>
      <UserCursor name="ZYRAA" />
      <Nav />
      <ScrollManager />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="enter" exit="exit">
          <motion.div
            aria-hidden="true"
            variants={curtainVariants}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 80,
              background: "#05060a",
              transformOrigin: "top",
              pointerEvents: "none",
            }}
          />
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
