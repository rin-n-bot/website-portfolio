import Image from "next/image";
import About, { AboutProvider, AboutTabDropdown } from "@/components/About";
import Projects from "@/components/Projects";
import TechStacks from "@/components/TechStacks";
import Contact from "@/components/Contact";
import { LayersPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pb-80 pt-12">
      <main className="flex w-full max-w-xl flex-col items-center gap-6">
        
        {/* Hero – left aligned via self-start */}
        <div className="flex w-full flex-col items-start gap-0 mt-10 self-start text-left">
          {/* Avatar + name/role side by side */}
          <div className="flex w-full items-start gap-4">
            <Image
              src="/ahrone.png"
              alt="Ahrone Ambasan"
              width={160}
              height={160}
              className="h-12 w-12 rounded-2xl object-cover grayscale mb-2"
            />

            <div className="flex flex-1 flex-col">
              {/* Name + socials row */}
              <div className="flex items-center justify-between gap-4 w-full">
                <h2 className="font-geist text-[15px] font-normal tracking-tight text-gray-900">
                  @ahroneambasan
                </h2>
                <div className="flex items-center gap-2">
                  <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="rounded-lg p-1.5 transition-transform hover:scale-110">
                    <Image src="/x.svg" alt="" width={20} height={20} className="h-3.5 w-3.5 object-contain grayscale" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg p-1.5 transition-transform hover:scale-110">
                    <Image src="/github_light.svg" alt="" width={20} height={20} className="h-4.5 w-4.5 object-contain grayscale" />
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-lg p-1.5 transition-transform hover:scale-110">
                    <Image src="/instagram-icon.svg" alt="" width={20} height={20} className="h-4.5 w-4.5 object-contain grayscale" />
                  </a>
                </div>
              </div>

              {/* Role row */}
              <div className="flex items-center gap-1.5 mt-0">
                <LayersPlus className="h-4 w-4 text-gray-500" />
                <p className="font-pixel text-[13px] tracking-wide font-normal text-gray-500">
                  Full-Stack Developer
                </p>
              </div>
            </div>
          </div>

          {/* Description below */}
          <h1 className="font-pixel text-md sm:text-md font-normal tracking-tight text-gray-600 mt-6 mb-0">
            building native products that people actually use<br/> and aims to solve people`s problems using technology.
          </h1>
        </div>

        <AboutProvider>
          <div className="mt-15 mb-0 flex w-full items-center justify-between self-start">
            <span className="font-pixel text-[13px] font-normal tracking-wide text-gray-400">
              /overview
            </span>
            <AboutTabDropdown />
          </div>

          {/* About – centered as a block, text centered too */}
          <section id="about" className="w-full max-w-3xl scroll-mt-0 mt-0 text-center">
            <About />
          </section>
        </AboutProvider>


          <div className="mt-15 mb-5 flex w-full items-center justify-between self-start">
            <span className="font-pixel text-[13px] font-normal tracking-wide text-gray-400">
              /creations
            </span>

          </div>

          {/* Projects – centered */}
          <section id="projects" className="w-full scroll-mt-40">
            <Projects />
          </section>


        <span className="font-pixel text-[13px] font-normal tracking-wide text-gray-400 self-start mt-15 mb-5">
          /skills
        </span>

        {/* Tech Stacks – centered */}
        <section id="tech-stacks" className="w-full scroll-mt-60">
          <TechStacks />
        </section>

        <span className="font-pixel text-[13px] font-normal tracking-wide text-gray-400 self-start mt-15 mb-5">
          /collaborate
        </span>

        {/* Contact – centered */}
        <section id="contact" className="w-full scroll-mt-20">
          <Contact />
        </section>
      </main>
    </div>
  );
}