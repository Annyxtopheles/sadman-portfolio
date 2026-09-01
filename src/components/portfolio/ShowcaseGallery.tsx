import * as React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ArrowUpRight, Maximize2 } from "lucide-react";
import { PORTFOLIO_ITEMS, type PortfolioItem, type PortfolioItemType } from "@/data/showcaseGallery";

// --- Types ---
interface ImageData {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  category?: string;
}

interface GalleryContextType {
  selectedImage: ImageData | null;
  setSelectedImage: (image: ImageData | null) => void;
}

const GalleryContext = React.createContext<GalleryContextType | null>(null);

// --- Physics ---
const spring = {
  type: "spring",
  stiffness: 350,
  damping: 32,
  mass: 1,
};

/**
 * Root Gallery Provider with Viewport-Centered Modal via Portal
 */
export function Gallery({ children }: { children: React.ReactNode }) {
  const [selectedImage, setSelectedImage] = React.useState<ImageData | null>(null);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll cleanly
  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <GalleryContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
      <GalleryModal />
    </GalleryContext.Provider>
  );
}

/**
 * Responsive Masonry Grid
 */
export function GalleryGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "columns-1 sm:columns-2 md:columns-3 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Unified Card Component for Case Studies and Visual Shots
 */
export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const context = React.useContext(GalleryContext);
  const isCaseStudy = item.type === "case-study";

  const content = (
    <div className="relative mb-8 break-inside-avoid group">
      {/* Thumbnail Container */}
      <div
        className={cn(
          "relative rounded-lg overflow-hidden bg-muted transition-transform duration-300",
          isCaseStudy ? "cursor-pointer" : "cursor-zoom-in"
        )}
        onClick={() => {
          if (!isCaseStudy && context) {
            context.setSelectedImage({
              id: item.id,
              src: item.src,
              alt: item.title,
              title: item.title,
              category: item.category,
            });
          }
        }}
      >
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="w-full h-auto object-cover rounded-lg grayscale group-hover:grayscale-0 transition-[filter,transform] duration-300 group-hover:scale-[1.02]"
        />

        {/* Top-Right Badge: Case Study vs Quick Preview */}
        <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
          {isCaseStudy ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-foreground text-background text-xs lowercase font-medium shadow-md">
              <span>case study</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-foreground text-background text-xs lowercase font-normal shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <span>expand</span>
              <Maximize2 className="w-3 h-3 opacity-80" />
            </span>
          )}
        </div>
      </div>

      {/* Metadata Underneath Thumbnail */}
      <div className="mt-3.5 px-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-scanport text-2xl font-medium tracking-tight group-hover:opacity-60 transition-opacity">
            {item.title}
          </h2>
          {isCaseStudy && (
            <span className="text-sm opacity-40 group-hover:opacity-100 transition-opacity font-mono">↗</span>
          )}
        </div>

        {item.category && (
          <div className="text-sm opacity-50 lowercase mt-0.5 font-normal">
            {item.category}
          </div>
        )}

        {isCaseStudy && item.summary && (
          <p className="text-base opacity-75 mt-2 line-clamp-2 leading-relaxed">
            {item.summary}
          </p>
        )}
      </div>
    </div>
  );

  if (isCaseStudy && item.slug) {
    return (
      <Link to={`/portfolio/${item.slug}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Viewport-Centered Modal via React Portal
 */
function GalleryModal() {
  const context = React.useContext(GalleryContext);
  if (!context || typeof document === "undefined") return null;

  const { selectedImage, setSelectedImage } = context;

  return createPortal(
    <AnimatePresence>
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          />

          {/* Centered Image Container with Drag Dismiss */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={spring}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={(_e, info) => {
              if (
                Math.abs(info.offset.y) > 100 ||
                Math.abs(info.velocity.y) > 300
              ) {
                setSelectedImage(null);
              }
            }}
            className="relative z-[101] max-w-[95vw] max-h-[90vh] flex flex-col items-center justify-center pointer-events-auto select-none"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt || "Expanded visual"}
              draggable={false}
              className="w-auto h-auto max-w-[92vw] max-h-[82vh] rounded-lg shadow-2xl object-contain"
            />

            {(selectedImage.title || selectedImage.category) && (
              <div className="mt-4 text-center text-white/90">
                {selectedImage.title && (
                  <div className="font-scanport text-xl tracking-tight">{selectedImage.title}</div>
                )}
                {selectedImage.category && (
                  <div className="text-sm text-white/60 lowercase mt-0.5">{selectedImage.category}</div>
                )}
              </div>
            )}
          </motion.div>

          {/* Close Button */}
          <button
            type="button"
            className="fixed top-6 right-6 z-[102] p-3 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/**
 * Filter Tabs + Masonry Portfolio Component
 */
export function ShowcaseGallerySection({ items = PORTFOLIO_ITEMS }: { items?: PortfolioItem[] }) {
  const [filter, setFilter] = React.useState<"all" | "case-studies" | "visuals">("all");

  const filteredItems = React.useMemo(() => {
    if (filter === "case-studies") return items.filter((i) => i.type === "case-study");
    if (filter === "visuals") return items.filter((i) => i.type === "shot");
    return items;
  }, [items, filter]);

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-base font-normal lowercase tracking-normal mb-12">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "py-1 transition-opacity duration-200 cursor-pointer",
            filter === "all" ? "opacity-100 font-medium" : "opacity-40 hover:opacity-100"
          )}
        >
          all work
        </button>
        <button
          type="button"
          onClick={() => setFilter("case-studies")}
          className={cn(
            "py-1 transition-opacity duration-200 cursor-pointer",
            filter === "case-studies" ? "opacity-100 font-medium" : "opacity-40 hover:opacity-100"
          )}
        >
          case studies
        </button>
        <button
          type="button"
          onClick={() => setFilter("visuals")}
          className={cn(
            "py-1 transition-opacity duration-200 cursor-pointer",
            filter === "visuals" ? "opacity-100 font-medium" : "opacity-40 hover:opacity-100"
          )}
        >
          visual index
        </button>
      </div>

      {/* Masonry Grid with Both Types */}
      <Gallery>
        <GalleryGrid>
          {filteredItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </GalleryGrid>
      </Gallery>
    </div>
  );
}
