"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";


export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty("--origin-x", `${x}px`);
    document.documentElement.style.setProperty("--origin-y", `${y}px`);

    const next = !isDark;

    const commit = () => {
      document.documentElement.classList.toggle("dark", next);
      setIsDark(next);
    };

    if (document.startViewTransition) {
      document.startViewTransition(commit);
    } else {
      commit();
    }
  };


  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-6 w-6 pr-3 pt-0 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 transition-colors hover:text-[#FF5F1F]"
    >
      <span
        key={`icon-${isDark ? "sun" : "moon"}`}
        className="animate-icon-swap flex items-center justify-center"
      >
        {isDark ? <Palette className="h-4.5 w-4.5" /> : <Palette className="h-4.5 w-4.5" />}
      </span>
    </button>
  );
}