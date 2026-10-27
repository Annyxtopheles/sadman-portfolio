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
import { Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
import ClickSpark from "@/components/ClickSpark";
import AmbientStarfield from "@/components/AmbientStarfield";
import { ExplorationProvider } from "@/context/ExplorationContext";
import { ExplorationHUD } from "@/components/ExplorationHUD";
import { CozyRewardModal } from "@/components/CozyRewardModal";
import { ScrollToTop } from "@/components/ScrollToTop";

const PortfolioSlugRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug}`} replace />;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={location.pathname} routeKey={location.pathname}>
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<CaseStudyDetail />} />
              <Route path="/portfolio" element={<Navigate to="/work" replace />} />
              <Route path="/portfolio/:slug" element={<PortfolioSlugRedirect />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Navigate to="/about" replace />} />
              <Route path="/contact" element={<Navigate to="/about" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
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
          <ExplorationProvider>
            <ClickSpark sparkColor="#FFFFFF" sparkCount={8} sparkRadius={20} sparkSize={10}>
              <SkipLink />
              <AmbientStarfield />
              <GrainOverlay />
              <div id="main-content" tabIndex={-1} className="outline-none">
                <AnimatedRoutes />
              </div>
              <ExplorationHUD />
              <CozyRewardModal />
            </ClickSpark>
          </ExplorationProvider>
        </AudioProvider>
      </HeroHoverProvider>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
