import About, { AboutProvider, AboutTabDropdown } from "@/components/About";
import Projects from "@/components/Projects";
import TechStacks from "@/components/TechStacks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import AvatarFlip from "@/components/AvatarFlip";

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
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pb-10 pt-5 text-gray-900 dark:text-gray-100">
      <main className="flex w-full max-w-lg flex-col items-center gap-6">
        
        {/* Hero – left aligned via self-start */}
        <div className="flex w-full flex-col items-start gap-0 mt-10 self-start text-left">
          {/* Avatar + name/role side by side */}
          <div className="flex w-full items-start gap-4">
            <AvatarFlip />

            <div className="flex flex-1 flex-col">
              {/* Name + socials row */}
              <div className="flex items-center justify-between gap-4 w-full">
                <h2 className="font-dm text-[15px] font-normal tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-1">
                  @ahroneambasan
                  <VerifiedBadge className="h-4 w-4 shrink-0" />
                </h2>
                <ThemeToggle />
              </div>

              {/* Role row */}
              <div className="flex items-center gap-1.5 mt-0">
                <p className="font-onest text-[13px] tracking-tight font-normal text-gray-400 dark:text-gray-500">
                  Software Developer
                </p>
              </div>
            </div>
          </div>

          {/* Description below */}
          <h1 className="font-dm text-md sm:text-md font-normal tracking-tight text-gray-700 dark:text-gray-300 mt-6 mb-0">
            building apps, websites, softwares, & automations that solves<br/>business problems.
          </h1>
        </div>

        <AboutProvider>
          <div className="mt-10 mb-0 flex w-full items-center justify-between self-start">
            <span className="font-pixel text-[13px] font-normal tracking-wide text-gray-400 dark:text-gray-500">
              /overview
            </span>
            <AboutTabDropdown />
          </div>

          {/* About – centered as a block, text centered too */}
          <section id="about" className="w-full max-w-3xl mt-0 text-center">
            <About />
          </section>
        </AboutProvider>


          <div className="mt-10 mb-0 flex w-full items-center justify-between self-start">
            <span className="font-pixel text-[13px] font-normal tracking-wide text-gray-400 dark:text-gray-500">
              /builds
            </span>

          </div>

          {/* Projects – centered */}
          <section id="projects" className="w-full">
            <Projects />
          </section>


        <span className="font-pixel text-[13px] font-normal tracking-wide text-gray-400 dark:text-gray-500 self-start mt-15 mb-0">
          /skills
        </span>

        {/* Tech Stacks – centered */}
        <section id="tech-stacks" className="w-full">
          <TechStacks />
        </section>

        <span className="font-pixel text-[13px] font-normal tracking-wide text-gray-400 dark:text-gray-500 self-start mt-15 mb-0">
          /collaborate
        </span>

        {/* Contact – centered */}
        <section id="contact" className="w-full mb-15">
          <Contact />
        </section>
        <Footer />
      </main>

    </div>
  );
}