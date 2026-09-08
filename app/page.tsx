import Projects from "@/components/Projects";
import TechStacks from "@/components/TechStacks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import HeroText from "@/components/HeroText";

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Verified">
      <path
        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
        fill="#1D9BF0"
      />
      <path
        d="M8 12l2.5 2.5L16 9"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pb-14 pt-12 text-gray-900 dark:text-gray-100">
      <main className="flex w-full max-w-lg flex-col items-center gap-3">

        {/* Hero – left aligned via self-start */}
        <div className="animate-fade-in-staggered flex w-full flex-col items-start gap-0 mt-10 mb-8 self-start text-left">
          {/* Avatar + name/role side by side */}
          <div className="flex w-full items-start gap-4">

            <div className="flex flex-1 flex-col">
              {/* Name + socials row */}
              <div className="flex items-center justify-between gap-4 mb-6 w-full">
                <h2 className="font-mono text-[15px] font-medium tracking-tight text-black dark:text-white flex items-center gap-1">
                  Ahrone Ambasan
                  <VerifiedBadge className="h-4 w-4 shrink-0" />
                </h2>
                <ThemeToggle />
              </div>

            </div>
          </div>

          {/* Description below — includes read-more toggle for education */}
          <HeroText />
        </div>


        {/* /builds label */}
        <span className="animate-fade-in-staggered fade-delay-2 font-geist-mono text-xs font-medium tracking-tight text-zinc-400 dark:text-zinc-500 self-start mt-5 mb-0">
          Builds
        </span>

        {/* Projects – centered */}
        <section id="projects" className="animate-fade-in-staggered fade-delay-2 w-full">
          <Projects />
        </section>


        <div className="mt-15">
          <h2 className="mb-4 font-geist-mono text-xs font-medium tracking-tight text-zinc-400 dark:text-zinc-500">
            Approach
          </h2>

<div className="grid gap-2 sm:grid-cols-3">
  <div className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-4 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_60%)]"
    />
    <h3 className="relative font-mono text-sm font-medium tracking-tight text-black dark:text-white">
      UX
    </h3>
    <p className="relative font-mono text-sm tracking-tight text-zinc-600 dark:text-zinc-400">
      I map out the flow first, because a product only works if people can actually use it.
    </p>
  </div>

  <div className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-4 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_60%)]"
    />
    <h3 className="relative font-mono text-sm font-medium tracking-tight text-black dark:text-white">
      UI
    </h3>
    <p className="relative font-mono text-sm tracking-tight text-zinc-600 dark:text-zinc-400">
      Keeping interface clean and simple, nothing added that doesn&apos;t need to be there.
    </p>
  </div>

  <div className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-4 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_60%)]"
    />
    <h3 className="relative font-mono text-sm font-medium tracking-tight text-black dark:text-white">
      Architecture
    </h3>
    <p className="relative font-mono text-sm tracking-tight text-zinc-600 dark:text-zinc-400">
      I aim to keep the code clean and maintainable, with room to grow as the project does.
    </p>
  </div>
</div>
        </div>


        {/* /skills label */}
        <span className="animate-fade-in-staggered fade-delay-3 font-geist-mono text-xs font-medium tracking-tight text-zinc-400 dark:text-zinc-500 self-start mt-15 mb-0">
          Skills
        </span>

        {/* Tech Stacks – centered */}
        <section id="tech-stacks" className="animate-fade-in-staggered fade-delay-3 w-full">
          <TechStacks />
        </section>

        {/* /collaborate label */}
        <span className="animate-fade-in-staggered fade-delay-4 font-geist-mono text-xs font-medium tracking-tight text-zinc-400 dark:text-zinc-500 self-start mt-15 mb-0">
          Collaborate
        </span>

        {/* Contact – centered */}
        <section id="contact" className="animate-fade-in-staggered fade-delay-4 w-full mb-5">
          <Contact />
        </section>

        {/* subtle divider */}
        <div className="animate-fade-in-staggered fade-delay-5 w-full border-t border-zinc-200 dark:border-zinc-800 mt-5" />

        <div className="animate-fade-in-staggered fade-delay-5 w-full">
          <Footer />
        </div>
      </main>
    </div>
  );
}