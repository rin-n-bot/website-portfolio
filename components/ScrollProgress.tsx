"use client";

import { useEffect, useRef, useState } from "react";

const TRACK_HEIGHT = 100;
const TRACK_WIDTH = 6;
const THUMB_HEIGHT = 24;
const MAX_THUMB_HEIGHT = 50;
const STRETCH_FACTOR = 2.5;
const RESET_DELAY = 400;
const TRANSITION_DURATION = 300;
const LERP_SPEED = 0.15;
const HIDE_DELAY = 2000;

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(THUMB_HEIGHT);
  const [visible, setVisible] = useState(false);

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const resetTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Smooth lerp for heavy feel
  useEffect(() => {
    const animate = () => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.1) return progress;
        return prev + diff * LERP_SPEED;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [progress]);

  useEffect(() => {
    const onScroll = () => {
      setVisible(true);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setVisible(false), HIDE_DELAY);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const percent = scrollable > 0 ? (current / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, percent)));

      const now = performance.now();
      const dt = now - lastScrollTime.current;
      if (dt > 0) {
        const velocity = (current - lastScrollY.current) / dt;
        const stretch = Math.min(MAX_THUMB_HEIGHT, THUMB_HEIGHT + Math.abs(velocity) * STRETCH_FACTOR);
        setThumbHeight(stretch);

        if (resetTimer.current) window.clearTimeout(resetTimer.current);
        resetTimer.current = window.setTimeout(() => setThumbHeight(THUMB_HEIGHT), RESET_DELAY);
      }

      lastScrollY.current = current;
      lastScrollTime.current = now;
    };

    // Initialize so it starts hidden (visible will be set on first scroll)
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  const thumbTop = (displayProgress / 100) * (TRACK_HEIGHT - thumbHeight);

  return (
    // Hide on mobile entirely; show only on desktop (>=768px)
    <div className="hidden md:block fixed left-4 top-1/2 z-50 -translate-y-1/2">
      {/* Wrapper with full hide + slide */}
      <div
        className="transition-all duration-300 ease-out"
        style={{
          transform: visible ? "translateX(0)" : "translateX(-24px)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* Track */}
        <div
          className="relative rounded-full bg-gray-200 dark:bg-gray-800"
          style={{ height: `${TRACK_HEIGHT}px`, width: `${TRACK_WIDTH}px` }}
        >
          {/* Thumb */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gray-900 dark:bg-gray-100"
            style={{
              top: `${thumbTop}px`,
              height: `${thumbHeight}px`,
              width: `${TRACK_WIDTH}px`,
              transition: `height ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}