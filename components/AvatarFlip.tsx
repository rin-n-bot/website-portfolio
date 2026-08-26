"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";

function subscribe(callback: () => void) {
  const root = document.documentElement;
  const observer = new MutationObserver(callback);
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot(): boolean {
  return false;
}

export default function AvatarFlip() {
  const [flipped, setFlipped] = useState(false);
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const iconSrc = isDark ? "/9451.png" : "/9450.png";

  return (
    <button
      type="button"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      aria-label={flipped ? "Show photo" : "Show theme icon"}
      className="relative h-12 w-12 shrink-0 mb-2 perspective-[600px]"
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out transform-3d"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front face — the photo */}
        <div className="absolute inset-0 backface-hidden">
          <Image
            src="/ahrone.png"
            alt="Ahrone Ambasan"
            width={160}
            height={160}
            className="h-12 w-12 rounded-2xl object-cover grayscale"
          />
        </div>

        {/* Back face — theme icon, pre-rotated so it reads correctly once flipped */}
        <div
        className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-900 overflow-hidden backface-hidden"
        style={{ transform: "rotateY(180deg)" }}
        >
          <Image src={iconSrc} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
        </div>
      </div>
    </button>
  );
}