import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SkipLink } from "@/components/SkipLink";
import { Navbar } from "@/components/Navbar";
import { GrainOverlay } from "@/components/GrainOverlay";
import { PageTransition } from "@/components/PageTransition";
import { HeroHoverProvider } from "@/context/HeroHoverContext";
import { AudioProvider } from "@/context/AudioContext";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Work from "./pages/Work";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ClickSpark from "@/components/ClickSpark";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition routeKey={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudyDetail />} />
            <Route path="/portfolio" element={<Navigate to="/work" replace />} />
            <Route path="/portfolio/:slug" element={<CaseStudyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Navigate to="/about" replace />} />
            <Route path="/contact" element={<Navigate to="/about" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HeroHoverProvider>
        <AudioProvider>
          <ClickSpark sparkColor="#FFFFFF" sparkCount={8} sparkRadius={20} sparkSize={10}>
            <SkipLink />
            <GrainOverlay />
            <div id="main-content" tabIndex={-1} className="outline-none">
              <AnimatedRoutes />
            </div>
          </ClickSpark>
        </AudioProvider>
      </HeroHoverProvider>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
