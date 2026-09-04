"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight as NextChevron } from "lucide-react";
import LaptopFrame from "./LaptopFrame";
import MobileFrame from "./MobileFrame";

type ProjectId = "sf-credit" | "crossrent";

const projects: { id: ProjectId; label: string; icon: string }[] = [
  { id: "sf-credit", label: "SF Credit Management System", icon: "/sf_icon.png" },
  { id: "crossrent", label: "CrossRent - Rental App", icon: "/cross rent icon.png" },
];

const crossRentScreens = [
  { src: "/cross rent dash.png", alt: "CrossRent dashboard" },
  { src: "/cross rent msg.png", alt: "CrossRent messages" },
  { src: "/cross rent transc.png", alt: "CrossRent transactions" },
];

// Rotating plus/minus icon
function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-zinc-400 shrink-0"
    >
      {/* Horizontal line (always visible) */}
      <path
        d="M3 8H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Vertical line – rotates 90deg to become horizontal (minus) */}
      <path
        d="M8 3V13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transition: "transform 0.3s ease",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
}

export default function Projects() {
  const [activeId, setActiveId] = useState<ProjectId>("sf-credit");
  const [isOpen, setIsOpen] = useState(false); // start collapsed
  const isCrossRent = activeId === "crossrent";

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  // CrossRent horizontal scroll logic (unchanged)
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isCrossRent) return;

    targetRef.current = el.scrollLeft;

    const step = () => {
      const current = el.scrollLeft;
      const diff = targetRef.current - current;

      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = targetRef.current;
        rafRef.current = null;
        return;
      }

      el.scrollLeft = current + diff * 0.18;
      rafRef.current = requestAnimationFrame(step);
    };

    const onWheel = (event: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const atStart = targetRef.current <= 0;
      const atEnd = targetRef.current >= maxScroll - 1;
      const scrollingDown = event.deltaY > 0;

      if ((scrollingDown && atEnd) || (!scrollingDown && atStart)) return;

      event.preventDefault();
      targetRef.current = Math.min(maxScroll, Math.max(0, targetRef.current + event.deltaY));

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isCrossRent]);

  const handleRowClick = (id: ProjectId) => {
    if (id === activeId) {
      setIsOpen((prev) => !prev); // toggle collapse
    } else {
      setActiveId(id);
      setIsOpen(true); // open new project
    }
  };

  const openLightbox = (src: string, index: number = 0, images: string[] = []) => {
    setLightboxImages(images.length > 0 ? images : [src]);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => {
    if (lightboxImages.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const nextImage = () => {
    if (lightboxImages.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {/* Project list rows */}
        <div className="flex flex-col border-b border-zinc-200 dark:border-zinc-800">
          {projects.map((project) => {
            const isActive = project.id === activeId;
            const isExpanded = isActive && isOpen;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleRowClick(project.id)}
                className="flex items-center justify-between gap-4 px-3 py-4 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={project.icon}
                    alt={`${project.label} icon`}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                  <span className="font-mono text-[15px] font-normal tracking-tight text-zinc-900 dark:text-zinc-100">
                    {project.label}
                  </span>
                </div>
                <PlusMinusIcon open={isExpanded} />
              </button>
            );
          })}
        </div>

        {/* Active project mockup (only if open) */}
        {isOpen && (
          <div key={activeId} className="animate-fade-in-up w-full">
            {isCrossRent ? (
              <div className="flex w-full max-w-3xl flex-col items-start gap-4">
                <div ref={scrollRef} data-lenis-prevent className="w-full overflow-x-auto pb-2">
                  <div className="flex w-max items-start mx-4 gap-24">
                    {crossRentScreens.map((screen, index) => (
                      <div
                        key={screen.src}
                        className="shrink-0 cursor-zoom-in"
                        style={{ width: "240px", zoom: 0.7 }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openLightbox(
                              screen.src,
                              index,
                              crossRentScreens.map((s) => s.src)
                            )
                          }
                          className="block w-full"
                          aria-label={`View ${screen.alt} full size`}
                        >
                          <MobileFrame>
                            <Image
                              src={screen.src}
                              alt={screen.alt}
                              width={600}
                              height={1300}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          </MobileFrame>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full max-w-3xl flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => openLightbox("/sf dashboard.png")}
                  className="w-full cursor-zoom-in"
                  aria-label="View SF Credit dashboard full size"
                >
                  <LaptopFrame>
                    <Image
                      src="/sf dashboard.png"
                      alt="SF CreditSystem"
                      width={1280}
                      height={800}
                      className="w-full h-auto"
                    />
                  </LaptopFrame>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal (unchanged) */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Project image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {lightboxImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Next image"
              >
                <NextChevron className="h-5 w-5" />
              </button>
            </>
          )}

          <div
            className="flex max-h-[90vh] max-w-[90vw] items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImages[lightboxIndex]}
              alt="Project screenshot"
              width={1280}
              height={800}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}