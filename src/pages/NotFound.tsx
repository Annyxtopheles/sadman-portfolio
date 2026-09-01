import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";

import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SEOHead
        title="404 — Page Not Found"
        description="That page doesn't exist. Head back to the homepage to keep exploring Sadman Zaman Khan's portfolio, poetry, and writing."
      />

      <main className="flex-1 flex flex-col justify-center max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <section className="flex-1 flex flex-col items-center justify-center pt-36 pb-20 text-center">
          <div className="text-xs uppercase font-medium tracking-wider mb-4 opacity-40">
            · 404 ·
          </div>
          <h1 className="font-scanport text-4xl sm:text-5xl md:text-6xl font-medium mb-4 tracking-tight">
            Page not found
          </h1>
          <p className="text-sm md:text-base max-w-md mx-auto opacity-60 mb-8 leading-relaxed">
            The link is broken, the page moved, or it never existed. No harm done.
          </p>
          <Link
            to="/"
            className="bg-foreground text-background px-6 py-2.5 rounded-full text-xs lowercase font-medium hover:bg-foreground/80 transition-colors inline-flex items-center gap-2"
          >
            return home →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
