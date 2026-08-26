"use client";

import { useEffect, useRef, useState } from "react";

const CELL = 24;
const DOT_LIGHT = "rgba(0,0,0,0.03)";
const DOT_DARK = "rgba(255,255,255,0.03)";

// Subtle orange in both themes
const SYMBOL_LIGHT = "rgba(255,95,31,0.35)";
const SYMBOL_DARK = "rgba(255,95,31,0.35)";

const MASK_RADIUS = 150;
const LAG_FACTOR = 0.12;
const INACTIVE_TIMEOUT = 1000;

function buildSymbolTile(isDark: boolean): string {
  const color = isDark ? SYMBOL_DARK : SYMBOL_LIGHT;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
       <path d="M6 9h6" stroke="${color}" stroke-width="1.2" stroke-linecap="round" />
     </svg>`
  )}`;
}

function getInitialDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function CursorGrid() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(getInitialDark);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const symbolTile = buildSymbolTile(isDark);
  const dotColor = isDark ? DOT_DARK : DOT_LIGHT;

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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white transition-colors duration-200 dark:bg-[#0a0a0a]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={
          {
            "--cursor-x": "50vw",
            "--cursor-y": "50vh",
            opacity: active ? 1 : 0,
            transitionDelay: active ? "150ms" : "0ms",
            backgroundImage: `url("${symbolTile}")`,
            backgroundSize: "18px 18px",
            backgroundRepeat: "repeat",
            maskImage: `radial-gradient(circle ${MASK_RADIUS}px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${MASK_RADIUS}px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}