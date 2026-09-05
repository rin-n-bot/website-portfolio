"use client";

import { useEffect, useRef, useState } from "react";

const CELL = 24;
const DOT_LIGHT = "rgba(0,0,0,0.03)";
const DOT_DARK = "rgba(255,255,255,0.03)";
const SYMBOL_LIGHT = "0,0,0";
const SYMBOL_DARK = "255,255,255";
const SYMBOL_OPACITY = 0.35;
const SYMBOL_SPACING = 18;
const MASK_RADIUS = 150;
const LAG_FACTOR = 0.12;
const INACTIVE_TIMEOUT = 1000;
const MIN_VISIBLE_MS = 400;
const MAX_VISIBLE_MS = 2200;
const MIN_HIDDEN_MS = 300;
const MAX_HIDDEN_MS = 1800;
const FADE_MS = 400;
const MAX_STAGGER_MS = 2200;
const VISIBLE_RATIO = 0.3;

function getInitialDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface SymbolState {
  visible: boolean;
  nextToggleAt: number;
  fadeStartAt: number | null;
  fadeDirection: "in" | "out" | null;
  fadeStartOpacity: number;  // opacity at the beginning of the fade
  eligible: boolean;
}

export default function CursorGrid() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<SymbolState[][]>([]);
  const [active, setActive] = useState(false);
  const wasActiveRef = useRef(false);
  const prevActiveRef = useRef(false);
  const hasHoveredOnceRef = useRef(false);
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

  const dotColor = isDark ? DOT_DARK : DOT_LIGHT;
  const symbolRgb = isDark ? SYMBOL_DARK : SYMBOL_LIGHT;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const makeSymbol = (now: number): SymbolState => {
      const eligible = Math.random() < VISIBLE_RATIO;
      return {
        visible: false,
        nextToggleAt: now + randomBetween(MIN_HIDDEN_MS, MAX_HIDDEN_MS),
        fadeStartAt: null,
        fadeDirection: null,
        fadeStartOpacity: 0,
        eligible,
      };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(window.innerWidth / SYMBOL_SPACING) + 1;
      const rows = Math.ceil(window.innerHeight / SYMBOL_SPACING) + 1;
      const now = performance.now();

      symbolsRef.current = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => makeSymbol(now))
      );
    };

    resize();
    window.addEventListener("resize", resize);

    // Helper to compute the current opacity of a symbol based on its transition
    const getCurrentOpacity = (sym: SymbolState, time: number): number => {
      if (sym.fadeDirection && sym.fadeStartAt !== null) {
        const elapsed = time - sym.fadeStartAt;
        if (elapsed < 0) {
          // The fade hasn't started yet (delayed start)
          return sym.fadeDirection === "in" ? sym.fadeStartOpacity : sym.fadeStartOpacity;
        }
        const progress = Math.min(elapsed / FADE_MS, 1);
        if (sym.fadeDirection === "in") {
          return sym.fadeStartOpacity + (SYMBOL_OPACITY - sym.fadeStartOpacity) * progress;
        } else {
          return sym.fadeStartOpacity * (1 - progress);
        }
      }
      return sym.visible ? SYMBOL_OPACITY : 0;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const isActive = wasActiveRef.current;
      const justBecameActive = isActive && !prevActiveRef.current;
      const justBecameInactive = !isActive && prevActiveRef.current;
      prevActiveRef.current = isActive;

      if (isActive) hasHoveredOnceRef.current = true;

      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";

      for (let row = 0; row < symbolsRef.current.length; row++) {
        const line = symbolsRef.current[row];
        for (let col = 0; col < line.length; col++) {
          const sym = line[col];

          if (!hasHoveredOnceRef.current) continue;

          // ----- Transition triggers -----
          if (justBecameActive) {
            if (sym.eligible) {
              // Case 1: Symbol is currently fading out → reverse to fade-in
              if (sym.visible && sym.fadeDirection === "out") {
                const currentOpacity = getCurrentOpacity(sym, time);
                sym.fadeDirection = "in";
                sym.fadeStartAt = time;
                sym.fadeStartOpacity = currentOpacity;
                // Push nextToggleAt far enough to avoid immediate toggling
                sym.nextToggleAt =
                  time + FADE_MS + randomBetween(MIN_VISIBLE_MS, MAX_VISIBLE_MS);
              }
              // Case 2: Symbol is invisible or at full visibility (not fading) → fade in from 0
              else if (!sym.visible || sym.fadeDirection === null) {
                sym.visible = true;
                sym.fadeDirection = "in";
                const entryDelay = randomBetween(0, MAX_STAGGER_MS);
                sym.fadeStartAt = time + entryDelay;
                sym.fadeStartOpacity = 0;
                sym.nextToggleAt =
                  time + entryDelay + FADE_MS + randomBetween(MIN_VISIBLE_MS, MAX_VISIBLE_MS);
              }
            }
          } else if (justBecameInactive) {
            // If the symbol is visible (or mid-fade-in), start a fade-out from its current opacity
            if (sym.visible) {
              const currentOpacity = getCurrentOpacity(sym, time);
              sym.fadeDirection = "out";
              sym.fadeStartAt = time + randomBetween(0, MAX_STAGGER_MS);
              sym.fadeStartOpacity = currentOpacity;
            }
          }

          // ----- Normal active toggling (only after the initial activation) -----
          if (isActive && !justBecameActive && sym.eligible && time >= sym.nextToggleAt) {
            sym.visible = !sym.visible;
            const duration = sym.visible
              ? randomBetween(MIN_VISIBLE_MS, MAX_VISIBLE_MS)
              : randomBetween(MIN_HIDDEN_MS, MAX_HIDDEN_MS);
            sym.nextToggleAt = time + duration;
            sym.fadeDirection = sym.visible ? "in" : "out";
            sym.fadeStartAt = time;
            sym.fadeStartOpacity = sym.visible ? 0 : SYMBOL_OPACITY;
          }

          // ----- Opacity calculation and completion cleanup -----
          let opacity = 0;
          if (sym.fadeDirection && sym.fadeStartAt !== null) {
            const elapsed = time - sym.fadeStartAt;
            if (elapsed < 0) {
              // Not started yet – keep base opacity
              opacity = sym.fadeStartOpacity;
            } else {
              const progress = Math.min(elapsed / FADE_MS, 1);
              if (sym.fadeDirection === "in") {
                opacity = sym.fadeStartOpacity + (SYMBOL_OPACITY - sym.fadeStartOpacity) * progress;
                if (progress >= 1) {
                  sym.fadeDirection = null;
                  sym.fadeStartAt = null;
                  sym.visible = true;
                  opacity = SYMBOL_OPACITY;
                }
              } else {
                opacity = sym.fadeStartOpacity * (1 - progress);
                if (progress >= 1) {
                  sym.fadeDirection = null;
                  sym.fadeStartAt = null;
                  sym.visible = false;
                  opacity = 0;
                }
              }
            }
          } else {
            opacity = sym.visible ? SYMBOL_OPACITY : 0;
          }

          if (opacity <= 0.01) continue;

          const x = col * SYMBOL_SPACING;
          const y = row * SYMBOL_SPACING;

          ctx.strokeStyle = `rgba(${symbolRgb},${opacity})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 6, y);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [symbolRgb]);

  useEffect(() => {
    wasActiveRef.current = active;
  }, [active]);

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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f8fafc] transition-colors duration-200 dark:bg-[#0a0a0a]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={
          {
            "--cursor-x": "50vw",
            "--cursor-y": "50vh",
            maskImage: `radial-gradient(circle ${MASK_RADIUS}px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${MASK_RADIUS}px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)`,
          } as React.CSSProperties
        }
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
}