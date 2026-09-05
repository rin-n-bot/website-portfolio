"use client";

import { useState } from "react";

export default function HeroText() {
  const [showMore, setShowMore] = useState(false);

  return (
    <h1 className="font-mono text-[15px] sm:text-[15px] tracking-tight font-normal text-zinc-900 dark:text-zinc-100 mt-6 mb-0">
      <span className="block">
        I&apos;m a Software Dev & Designer in Davao, Philippines. I build apps, websites, softwares, &
        automations that solves real problems.{" "}
        {!showMore && (
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="underline text-zinc-400 dark:text-zinc-600 underline-offset-2 hover:text-[#FF5F1F] dark:hover:text-[#FF5F1F] transition-colors"
          >
            read more
          </button>
        )}
      </span>

      {showMore && (
        <>
          <span className="block mt-4">
            Currently learning at{" "}
            <span className="text-zinc-900 dark:text-zinc-100">
              Holy Cross of Davao College
            </span>{" "}
            as a BS <br />Information Technology student.
          </span>

          <span className="block mt-4">
            Looks good is a bonus. Works right, every time,<br/> is the actual
            job.{" "}
            <button
              type="button"
              onClick={() => setShowMore(false)}
              className="underline text-zinc-400 dark:text-zinc-600 underline-offset-2 hover:text-[#FF5F1F] dark:hover:text-[#FF5F1F] transition-colors"
            >
              show less
            </button>
          </span>
        </>
      )}
    </h1>
  );
}