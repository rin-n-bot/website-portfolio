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
  "Zustand",
  "Vercel",
  "Node.js",
  "Docker",
  "Vite",
  "Claude",
  "Codex",
];

export default function TechStacks() {
  return (
    <>
      <h1 className="font-dm text-md font-normal text-gray-500 dark:text-gray-400 tracking-tight mb-6 max-w-3xl text-left">
        tools and frameworks i know, but can go outside it when needed.
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">
        {techStacks.map((tech) => (
          <span
            key={tech}
            className="text-[13px] font-onest font-normal text-gray-400 dark:text-gray-500 transition-colors hover:text-[#FF5F1F]"
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );
}