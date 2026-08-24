import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const contact = {
  email: "main.ahroneambasan@gmail.com",
  socials: [
    { name: "X", href: "https://x.com" },
    { name: "GitHub", href: "https://github.com" },
    { name: "Instagram", href: "https://www.instagram.com" },
    { name: "Facebook", href: "https://www.facebook.com" },
  ],
};

// Build a Gmail compose link
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contact.email
)}&su=${encodeURIComponent("Project Inquiry")}&body=${encodeURIComponent(
  "Hi Ahrone, I'd like to discuss a project..."
)}`;

export default function Contact() {
  return (
    <>
      <div className="flex flex-col items-start gap-6">
        <h2 className="max-w-xl font-pixel text-md font-normal tracking-tight text-gray-600">
          willing to learn and contribute, whether it`s a quick or long term. if you`re building something, hit me{" "}
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-gray-900 font-geist underline underline-offset-2 transition-colors hover:text-[#FF5F1F]"
          >
            {contact.email}
          </a>.
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {contact.socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1 rounded-full bg-transparent px-3 py-1 text-[13px] font-geist font-normal text-gray-400 transition-colors hover:text-[#FF5F1F]"
            >
              {social.name}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}