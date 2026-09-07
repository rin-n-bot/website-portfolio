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
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pb-12 pt-14 text-gray-900 dark:text-gray-100">
      <main className="flex w-full max-w-lg flex-col items-center gap-3">

        {/* Hero – left aligned via self-start */}
        <div className="flex w-full flex-col items-start gap-0 mt-10 mb-8 self-start text-left">
          {/* Avatar + name/role side by side */}
          <div className="flex w-full items-start gap-4">

            <div className="flex flex-1 flex-col">
              {/* Name + socials row */}
              <div className="flex items-center justify-between gap-4 mb-6 w-full">
                <h2 className="font-mono text-[15px] font-medium tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
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
        <span className="font-geist-mono text-xs font-medium tracking-tight text-gray-400 dark:text-gray-500 self-start mt-5 mb-0">
          Build
        </span>

        {/* Projects – centered */}
        <section id="projects" className="w-full">
          <Projects />
        </section>

        {/* /skills label */}
        <span className="font-geist-mono text-xs font-medium tracking-tight text-gray-400 dark:text-gray-500 self-start mt-15 mb-0">
          Skills
        </span>

        {/* Tech Stacks – centered */}
        <section id="tech-stacks" className="w-full">
          <TechStacks />
        </section>

        {/* /collaborate label */}
        <span className="font-geist-mono text-xs font-medium tracking-tight text-gray-400 dark:text-gray-500 self-start mt-15 mb-0">
          Collaborate
        </span>

        {/* Contact – centered */}
        <section id="contact" className="w-full mb-5">
          <Contact />
        </section>

        {/* subtle divider */}
        <div className="w-full border-t border-zinc-200 dark:border-zinc-800 mt-5" />
        
        <Footer />
      </main>
    </div>
  );
}