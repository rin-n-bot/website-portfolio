import Image from "next/image";

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com", icon: "/github_light.svg" },
  { name: "Facebook", href: "https://www.facebook.com", icon: "/facebook-icon.svg" },
  { name: "X", href: "https://x.com", icon: "/x.svg" },
  { name: "Instagram", href: "https://www.instagram.com", icon: "/instagram-icon.svg" },
];

function SocialChip({ name, href, icon }: SocialLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-transparent bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-900 transition-colors hover:border-[#FF5F1F]/40 hover:text-[#FF5F1F] dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100"
    >
      <Image src={icon} alt="" width={12} height={12} className="h-3 w-3" />
      {name}
    </a>
  );
}

export default function HeroText() {
  return (
    <div className="mt-6 font-mono text-sm font-normal tracking-tight text-zinc-900 dark:text-zinc-100">
      <p>
        I&apos;m a Software Dev & Designer in Davao, Philippines, and I like
        exploring and building things people can actually use.
      </p>

      <p className="mt-6">
        I build apps, websites, software, and automations that solve real
        problems people are actually dealing with.
      </p>

      <p className="mt-6">
        Currently learning as an Information Technology student at Holy Cross
        of Davao College. Not finished learning. Not planning to be, either.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span>You can find me on</span>
        {socialLinks.map((social) => (
          <SocialChip key={social.name} {...social} />
        ))}
      </div>
    </div>
  );
}