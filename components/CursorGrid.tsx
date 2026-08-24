"use client";

import { useEffect, useRef, useState } from "react";

const CELL = 24;
const SYMBOL_OPACITY = 0.2; // more visible but still subtle
const DOT_OPACITY = 0.05;
const MASK_RADIUS = 150;
const LAG_FACTOR = 0.12; // smooth trailing
const INACTIVE_TIMEOUT = 1000; // ms before overlay fades out

// Tile with a minus symbol at each cell (3x3 block)
const SYMBOL_TILE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL * 3}" height="${CELL * 3}">
     <g stroke="rgba(0,0,0,${SYMBOL_OPACITY})" stroke-width="1.2" stroke-linecap="round">
       <path d="M${CELL * 0.5 - 3} ${CELL * 0.5}h6" />
       <path d="M${CELL * 1.5 - 3} ${CELL * 1.5}h6" />
       <path d="M${CELL * 2.5 - 3} ${CELL * 2.5}h6" />
     </g>
   </svg>`
)}`;

export default function CursorGrid() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const apply = () => {
      currentX += (targetX - currentX) * LAG_FACTOR;
      currentY += (targetY - currentY) * LAG_FACTOR;

      el.style.setProperty("--cursor-x", `${currentX}px`);
      el.style.setProperty("--cursor-y", `${currentY}px`);

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        raf = requestAnimationFrame(apply);
      } else {
        raf = 0;
      }
    };

    const activate = () => {
      setActive(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setActive(false), INACTIVE_TIMEOUT);
    };

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
      activate();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        targetX = touch.clientX;
        targetY = touch.clientY;
        if (!raf) raf = requestAnimationFrame(apply);
        activate();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      if (raf) cancelAnimationFrame(raf);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Base dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,${DOT_OPACITY}) 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      {/* Overlay symbols – all minus, fades in with delay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={
          {
            "--cursor-x": "50vw",
            "--cursor-y": "50vh",
            opacity: active ? 1 : 0,
            transitionDelay: active ? "150ms" : "0ms",
            backgroundImage: `url("${SYMBOL_TILE}")`,
            backgroundSize: `${CELL * 3}px ${CELL * 3}px`,
            backgroundRepeat: "repeat",
            maskImage: `radial-gradient(circle ${MASK_RADIUS}px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${MASK_RADIUS}px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}