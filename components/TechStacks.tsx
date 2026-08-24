const techStacks = [
  "Next.js,",
  "TypeScript,",
  "React,",
  "React Native,",
  "Expo,",
  "Electron,",
  "Firebase,",
  "PostgreSQL,",
  "Tailwind,",
  "Zustand,",
  "Node.js,",
  "Docker,",
  "Vite,",
  "Claude,",
  "Codex",

];

export default function TechStacks() {
  return (
    <>
      <h1 className="font-pixel text-md font-normal text-gray-600 tracking-tight mb-6 max-w-3xl text-left">
        tools and frameworks i know, but can go outside it when needed.
      </h1>

      <div className="flex flex-wrap items-center gap-2">
        {techStacks.map((tech) => (
          <span
            key={tech}
            className="rounded-lg bg-white py-1 pr-2 text-[13px] font-geist-mono font-normal text-gray-400 transition-colors hover:text-gray-900"
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );
}