"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const contact = {
  email: "main.ahroneambasan@gmail.com",
  socials: [
    { name: "X", href: "https://x.com" },
    { name: "GitHub", href: "https://github.com" },
    { name: "Instagram", href: "https://www.instagram.com" },
    { name: "Facebook", href: "https://www.facebook.com" },
  ],
};


const gmailSubject = "Project Inquiry";

const gmailBody = "";


const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contact.email
)}&su=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;


const mailtoUrl = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent(
  gmailSubject
)}&body=${encodeURIComponent(gmailBody)}`;


function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function openGmailCompose(e: React.MouseEvent) {
  e.preventDefault();

  if (isMobileDevice()) {
    window.location.href = mailtoUrl;
    return;
  }

  window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
}

export default function Contact() {
  return (
    <>
      <div className="flex flex-col items-start gap-6">
        <h2 className="max-w-xl font-mono text-[15px] font-normal tracking-tight text-gray-900 dark:text-gray-100">
          Willing to learn and contribute, whether it&apos;s a quick or long term.<br/> if you&apos;re building something, hit me on{" "}
          <a
            href={gmailComposeUrl}
            onClick={openGmailCompose}
            className="text-blue-500 dark:text-blue-400 text-[15px] font-mono underline underline-offset-2 transition-colors hover:text-[#FF5F1F]"
          >
            {contact.email}
          </a>.
        </h2>

        {/* Socials row — text links with an up-right arrow */}
        <div className="flex flex-wrap items-center gap-5 mt-2">
          {contact.socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1 text-[13px] font-mono font-normal tracking-tight text-zinc-400 dark:text-zinc-500 transition-colors hover:text-[#FF5F1F]"
            >
              {social.name}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}