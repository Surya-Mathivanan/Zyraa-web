import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/Nav.jsx";
import UserCursor from "./components/UserCursor.jsx";
import { useLenis, scrollToTop, scrollToSelector } from "./hooks/useLenis.js";

// One chunk per route. The loaders are kept so every route can be fetched in
// the background once the first page is up, which keeps later navigations
// instant rather than waiting on the network behind the curtain.
const loaders = {
  home: () => import("./pages/Home.jsx"),
  features: () => import("./pages/Features.jsx"),
  apps: () => import("./pages/Apps.jsx"),
  demos: () => import("./pages/Demos.jsx"),
  demo: () => import("./pages/Demo.jsx"),
  about: () => import("./pages/About.jsx"),
  blogs: () => import("./pages/Blogs.jsx"),
  blogPost: () => import("./pages/BlogPost.jsx"),
  contact: () => import("./pages/Contact.jsx"),
  notFound: () => import("./pages/NotFound.jsx"),
};

const Home = lazy(loaders.home);
const Features = lazy(loaders.features);
const Apps = lazy(loaders.apps);
const Demos = lazy(loaders.demos);
const Demo = lazy(loaders.demo);
const About = lazy(loaders.about);
const Blogs = lazy(loaders.blogs);
const BlogPost = lazy(loaders.blogPost);
const Contact = lazy(loaders.contact);
const NotFound = lazy(loaders.notFound);

function usePreloadRoutes() {
  useEffect(() => {
    const preload = () => Object.values(loaders).forEach((load) => load().catch(() => {}));
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(preload, 1500);
    return () => clearTimeout(id);
  }, []);
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // The target lives in a lazily loaded page, so it may not be in the DOM
      // yet on a cold load. Wait out the page transition, then retry briefly.
      let tries = 0;
      let id = 0;
      const attempt = () => {
        if (document.querySelector(hash) || tries >= 25) {
          scrollToSelector(hash);
          return;
        }
        tries += 1;
        id = setTimeout(attempt, 100);
      };
      id = setTimeout(attempt, 450);
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
  usePreloadRoutes();
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
              background: "var(--bg)",
              transformOrigin: "top",
              pointerEvents: "none",
            }}
          />
          {/* Holds the page height while a route chunk loads, so the layout does
              not collapse to nothing under the curtain. */}
          <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/demos" element={<Demos />} />
              <Route path="/demos/:slug" element={<Demo />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
