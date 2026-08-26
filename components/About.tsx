"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { Smartphone, Globe, Laptop, ChevronDown } from "lucide-react";

type AboutTab = "services" | "experience" | "education";

const tabs: { value: AboutTab; label: string }[] = [
  { value: "services", label: "services" },
  { value: "experience", label: "experience" },
  { value: "education", label: "education" },
];

const services = [
  {
    icon: Smartphone,
    title: "Mobile Apps",
    tag: "android",
  },
  {
    icon: Globe,
    title: "Website",
    tag: "windows, mac",
  },
  {
    icon: Laptop,
    title: "Web Apps",
    tag: "cross platform",
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

// Dropdown trigger — meant to sit next to the "/about" divider label in
// page.tsx, on the same row.
export function AboutTabDropdown() {
  const { activeTab, setTab } = useAboutContext();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const active = tabs.find((t) => t.value === activeTab)!;

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg py-1 text-[13px] font-pixel font-normal tracking-wide text-gray-400 dark:text-gray-500 transition-colors hover:text-[#FF5F1F]"
      >
        {active.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-20 mt-1.5 w-30 overflow-hidden rounded-lg bg-[#f5f5f5] dark:bg-[#1a1a1a] shadow-xl animate-dropdown"
        >
          {tabs.map((tab) => {
            const isActive = tab.value === activeTab;
            return (
              <button
                key={tab.value}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setTab(tab.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-left text-[13px] font-pixel font-normal tracking-wide transition-colors ${
                  isActive
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-400 hover:text-[#FF5F1F]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
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
                    className={`flex items-center px-3 gap-6 py-4 border-b border-gray-200 dark:border-gray-800 ${
                      index === services.length - 1 ? "last:border-b-0" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <h3 className="font-dm text-[15px] font-normal dark:text-gray-100 text-gray-900">
                        {service.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[13px] font-onest font-normal text-gray-400 dark:text-gray-500">
                      {service.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="flex flex-col px-3">
              <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                <div className="flex-1 pr-16">
                  <h3 className="font-dm text-[15px] font-normal text-gray-900 dark:text-gray-100">
                    Projects
                  </h3>
                  <p className="mt-1 text-sm font-onest font-normal text-gray-500 dark:text-gray-400">
                    CrossRent , SF Credit Management System
                  </p>
                </div>
                <span className="shrink-0 rounded-full px-2 py-0.5 text-[13px] font-onest font-normal text-gray-400 dark:text-gray-500">
                  present
                </span>
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="flex flex-col px-3">
              {/* College */}
              <div className="flex items-center gap-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex-1">
                  <h3 className="font-dm text-[15px] font-normal text-gray-900 dark:text-gray-100">
                    Holy Cross of Davao College
                  </h3>
                </div>
                <span className="shrink-0 font-onest text-[13px] font-normal text-gray-400 dark:text-gray-500">
                  third year college
                </span>
              </div>

              {/* Senior High */}
              <div className="flex items-center gap-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex-1">
                  <h3 className="font-dm text-[15px] font-normal text-gray-900 dark:text-gray-100">
                    Bernardo D. Carpio National High School
                  </h3>
                </div>
                <span className="shrink-0 font-onest text-[13px] font-normal text-gray-400 dark:text-gray-500">
                  senior high
                </span>
              </div>

              {/* College */}
              <div className="flex items-center gap-6 py-4 last:border-b-0">
                <div className="flex-1">
                  <h3 className="font-dm text-[15px] font-normal text-gray-900 dark:text-gray-100">
                    Emilio Ramos National High School
                  </h3>
                </div>
                <span className="shrink-0 font-onest text-[13px] font-normal text-gray-400 dark:text-gray-500">
                  junior high
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}