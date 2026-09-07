"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full pt-2 pb-5">
      {/* Mobile layout (below sm breakpoint) */}
      <div className="flex justify-between sm:hidden">
        <a
          href="/cv.pdf"
          download
          className="font-mono text-[13px] font-medium tracking-tight underline text-zinc-400 dark:text-zinc-500 transition-colors hover:text-[#FF5F1F]"
        >
          Download CV
        </a>
        <div className="flex flex-col text-right">
          <span className="font-mono text-[13px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500">
            {time}
          </span>
          <span className="font-mono text-[13px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500">
            in Davao, Philippines
          </span>
        </div>
      </div>

      {/* Desktop layout (sm and up) */}
      <div className="hidden sm:flex items-center justify-between">
        <a
          href="/cv.pdf"
          download
          className="font-mono text-[13px] font-medium tracking-tight underline text-zinc-400 dark:text-zinc-500 whitespace-nowrap transition-colors hover:text-[#FF5F1F]"
        >
          Download CV
        </a>
        <span className="font-mono text-[13px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
          {time} in Davao, Philippines
        </span>
      </div>
    </footer>
  );
}