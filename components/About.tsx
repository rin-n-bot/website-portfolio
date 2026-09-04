"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Smartphone, Globe, Laptop } from "lucide-react";

type AboutTab = "services" | "experience" | "education";

const tabs: { value: AboutTab; label: string }[] = [
  { value: "services", label: "services" },
  { value: "education", label: "education" },
];

const services = [
  {
    icon: Smartphone,
    title: "Mobile App",
    tag: "android, ios",
  },
  {
    icon: Globe,
    title: "Website",
    tag: "landing page, e-commerce, blog, etc.",
  },
  {
    icon: Laptop,
    title: "Software",
    tag: "systems, automations, tools, etc.",
  },
];

// All tab state and switching logic lives here, in About.tsx. AboutProvider
// wraps both the label row and the content section in page.tsx so they can
// share this state without page.tsx holding any of it itself.
interface AboutContextValue {
  activeTab: AboutTab;
  animationKey: number;
  setTab: (tab: AboutTab) => void;
}

const AboutContext = createContext<AboutContextValue | null>(null);

function useAboutContext() {
  const ctx = useContext(AboutContext);
  if (!ctx) throw new Error("About subcomponents must be used inside <AboutProvider>");
  return ctx;
}

export function AboutProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<AboutTab>("services");
  const [animationKey, setAnimationKey] = useState(0);

  const setTab = (tab: AboutTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <AboutContext.Provider value={{ activeTab, animationKey, setTab }}>
      {children}
    </AboutContext.Provider>
  );
}

// Tab buttons — sit at the top-left of the about container in page.tsx.
// Active tab gets a solid underline; no background/pill treatment.
export function AboutTabs() {
  const { activeTab, setTab } = useAboutContext();

  return (
    <div className="flex items-end gap-1">
      {tabs.map((tab, index) => {
        const isActive = tab.value === activeTab;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => setTab(tab.value)}
            aria-pressed={isActive}
            className={`relative z-10 rounded-t-lg px-4 py-2 text-[13px] font-dm font-medium tracking-tight transition-colors ${
              isActive
                ? `bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 -mb-px ${
                    index === 0 ? "rounded-tl-none" : ""
                  }`
                : "bg-transparent dark:bg-transparent text-zinc-300 dark:text-zinc-700 hover:text-[#FF5F1F]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// Content only — no label, no dropdown. Rendered inside the /about section
// in page.tsx, below the label row.
export default function About() {
  const { activeTab, animationKey } = useAboutContext();

  return (
    <div className="w-full text-left">
      <div key={animationKey} className="animate-fade-in-up">
        <div className="flex flex-col gap-8">
          {activeTab === "services" && (
            <div className="flex flex-col">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className={`flex items-center px-3 gap-4 py-4 border-b border-zinc-200 dark:border-zinc-800 ${
                      index === services.length - 1 ? "last:border-b-0" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zinc-400" />
                    <div className="flex-1">
                      <h3 className="font-dm text-[15px] font-normal dark:text-zinc-100 text-zinc-900">
                        {service.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full py-0.5 text-[13px] font-onest font-normal text-zinc-400 dark:text-zinc-500">
                      {service.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          )}


          {activeTab === "education" && (
            <div>
              {/* Terminal window */}
              <div className="rounded-lg bg-zinc-50 dark:bg-[#1a1a1a] overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-dm text-[11px] text-zinc-400 dark:text-zinc-500">
                    ahrone@portfolio: ~
                  </span>
                </div>

                {/* Terminal body */}
                <div className="px-4 py-4 font-mono text-[13px] leading-relaxed">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    <span className="text-[#FF5F1F] font-bold">ahrone@portfolio</span>
                    <span className="text-zinc-400 dark:text-zinc-600">:</span>
                    <span className="text-blue-400 dark:text-blue-300">~</span>
                    <span className="text-zinc-500 dark:text-zinc-400">$</span>{" "}
                    <span className="text-zinc-900 dark:text-zinc-100">cat education.txt</span>
                  </p>

                  <div className="mt-2 space-y-1 pl-4">
                    <p className="text-zinc-900 dark:text-zinc-100">Holy Cross of Davao College</p>
                    <p className="text-zinc-500 dark:text-zinc-400">BS Information Technology · 3rd Year</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">2024 — Present</p>
                  </div>

                  {/* Blinking cursor line */}
                  <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                    <span className="text-[#FF5F1F] font-bold">ahrone@portfolio</span>
                    <span className="text-zinc-400 dark:text-zinc-600">:</span>
                    <span className="text-blue-400 dark:text-blue-300">~</span>
                    <span className="text-zinc-500 dark:text-zinc-400">$</span>{" "}
                    <span className="inline-block w-1.5 h-3 bg-zinc-300 dark:bg-zinc-700 animate-blink" />
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}