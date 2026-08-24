// lib/projects.ts
export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
};

export const projects: Project[] = [
  {
    slug: "doubt-box",
    title: "Doubt Box",
    description:
      "Offline decision-making utility built with Expo, Reanimated, and a physics-based coin flip.",
    stack: ["Expo", "React Native", "TypeScript", "Zustand", "MMKV", "Reanimated"],
    image: "https://placehold.co/600x800/18181b/ffffff/png?text=Doubt+Box",
  },
  {
    slug: "wakely",
    title: "Wakely",
    description:
      "Proximity alarm app for bus commuters, with live map tracking and native alarm handling.",
    stack: ["Expo", "React Native", "TypeScript", "MapLibre", "NativeWind", "Zustand"],
    image: "https://placehold.co/600x800/18181b/ffffff/png?text=Wakely",
  },
  {
    slug: "sf-credit",
    title: "SF Credit Management System",
    description:
      "Desktop app replacing paper credit notebooks for a sari-sari store, with dashboards and customer tracking.",
    stack: ["Electron", "React", "TypeScript", "Tailwind", "Supabase", "PostgreSQL"],
    image: "https://placehold.co/600x800/18181b/ffffff/png?text=SF+Credit",
  },
];