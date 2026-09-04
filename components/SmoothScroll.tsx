"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Inertia scrolling: wheel input eases to a stop instead of stopping
// instantly. Skipped entirely when the user prefers reduced motion —
// the browser's native scrolling is used in that case.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}