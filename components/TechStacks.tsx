"use client";

import { useEffect, useRef } from "react";

const techStacks = [
  "Next.js",
  "TypeScript",
  "React",
  "React Native",
  "Expo",
  "Electron",
  "Firebase",
  "Supabase",
  "Tailwind",
  "Vercel",
  "Node.js",
  "Docker",
  "Vite",
  "n8n",
];

const SCROLL_SPEED = 30; // px per second

export default function TechStacks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId = 0;
    let lastTime = performance.now();

    // Wrap the offset into [0, halfWidth) so the duplicated content loops seamlessly.
    const normalizeOffset = () => {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth <= 0) return;
      const wrapped = ((offsetRef.current % halfWidth) + halfWidth) % halfWidth;
      offsetRef.current = wrapped;
      track.style.transform = `translateX(${-wrapped}px)`;
    };

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isDraggingRef.current && !prefersReducedMotion) {
        offsetRef.current += SCROLL_SPEED * delta;
        normalizeOffset();
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    lastXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    offsetRef.current -= event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;

    const halfWidth = track.scrollWidth / 2;
    if (halfWidth > 0) {
      const wrapped = ((offsetRef.current % halfWidth) + halfWidth) % halfWidth;
      track.style.transform = `translateX(${-wrapped}px)`;
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <>
      <h1 className="font-mono text-sm font-normal text-zinc-700 dark:text-zinc-300 tracking-tight mb-6 max-w-3xl text-left">
        Technologies I use to build products across mobile, web, and desktop with room to adapt when the project calls for something else.
      </h1>

      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex w-max cursor-grab touch-pan-y select-none gap-2.5 active:cursor-grabbing"
        >
          {[...techStacks, ...techStacks].map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="shrink-0 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-[13px] font-mono font-medium tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}