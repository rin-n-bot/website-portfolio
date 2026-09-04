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
      <h1 className="font-mono text-[15px] font-normal text-gray-900 dark:text-gray-100 tracking-tight mb-6 max-w-3xl text-left">
        technologies I use to build products, with room to adapt when the<br/> project requires it.
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">
        {techStacks.map((tech) => (
          <span
            key={tech}
            className="text-[13px] font-mono font-normal tracking-tight text-gray-400 dark:text-gray-500 transition-colors hover:text-[#FF5F1F]"
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );
}