"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
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
    <footer className="w-full pt-0 pb-5">
      {/* Mobile layout (below sm breakpoint) */}
      <div className="flex justify-between sm:hidden">
        <div className="flex flex-col">
          <span className="font-mono text-[13px] font-normal tracking-tight text-gray-400 dark:text-gray-500">
            {time}
          </span>
          <span className="font-mono text-[13px] font-normal tracking-tight text-gray-400 dark:text-gray-500">
            in Davao, Philippines
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-[13px] font-normal tracking-tight text-gray-400 dark:text-gray-500">
            © {year}
          </span>
          <span className="font-mono text-[13px] font-normal tracking-tight text-gray-400 dark:text-gray-500">
            Third Year
          </span>
        </div>
      </div>

      {/* Desktop layout (sm and up) */}
      <div className="hidden sm:flex items-center justify-between">
        <span className="font-mono text-[13px] font-normal tracking-tight text-gray-400 dark:text-gray-500 whitespace-nowrap">
          {time} in Davao, Philippines
        </span>
        <span className="font-mono text-[13px] font-normal tracking-wide text-gray-400 dark:text-gray-500 whitespace-nowrap">
          © {year} Third Year
        </span>
      </div>
    </footer>
  );
}