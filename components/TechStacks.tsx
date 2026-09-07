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
  "Vercel",
  "Node.js",
  "Docker",
  "Vite",
  "n8n",
];

export default function TechStacks() {
  return (
    <>
      <h1 className="font-geist-mono text-sm font-normal text-gray-700 dark:text-gray-300 tracking-tight mb-6 max-w-3xl text-left">
       Technologies I use to build products across mobile, web, and desktop with room to adapt when the project calls for something else.
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">
        {techStacks.map((tech) => (
          <span
            key={tech}
            className="text-[13px] font-geist-mono font-medium tracking-tight text-gray-400 dark:text-gray-500 transition-colors hover:text-[#FF5F1F]"
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );
}