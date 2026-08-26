"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const contact = {
  email: "main.ahroneambasan@gmail.com",
  socials: [
    { name: "X", href: "https://x.com", Icon: XIcon },
    { name: "GitHub", href: "https://github.com", Icon: GitHubIcon },
    { name: "Instagram", href: "https://www.instagram.com", Icon: InstagramIcon },
    { name: "Facebook", href: "https://www.facebook.com", Icon: FacebookIcon },
  ],
};

const gmailSubject = "Project Inquiry";
const gmailBody = "";

// Desktop web fallback — Gmail's own compose URL, opens the composer
// directly in a browser tab. If the person isn't logged in, Google's login
// flow honors these params and drops them into the composer post-login.
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contact.email
)}&su=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;

// mailto: is the OS-level mechanism mobile platforms actually route through
// a compose screen. On Android it opens Gmail directly (or a chooser that
// includes it) into a prefilled composer. On iOS it opens whichever app is
// set as the system default Mail handler — Gmail, if the person has set it
// as default under Settings > Mail > Default Mail App; Apple Mail otherwise.
// Custom app schemes like `googlegmail://` are iOS-only and unregistered on
// Android, so they fail silently there — mailto: is the one link every
// platform's mail app actually listens for.
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
    // Straight to whatever mail app the OS routes mailto: to — no scheme
    // guessing, no fallback timer needed, since this is the link mail apps
    // are actually built to handle.
    window.location.href = mailtoUrl;
    return;
  }

  // Desktop: open Gmail's web composer directly in a new tab.
  window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
}

export default function Contact() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col items-start gap-6">
        <h2 className="max-w-xl font-dm text-md font-normal tracking-tight text-gray-500 dark:text-gray-400">
          willing to learn and contribute, whether it`s a quick or long term.<br/> if you`re building something, hit me on{" "}
          <a
            href={gmailComposeUrl}
            onClick={openGmailCompose}
            className="text-gray-900 dark:text-gray-100 text-[15px] font-onest underline underline-offset-2 transition-colors hover:text-[#FF5F1F]"
          >
            {contact.email}
          </a>.
        </h2>

        {/* Socials + clock in one row */}
        <div className="flex w-full items-center justify-between gap-3 mt-5">
          <div className="flex flex-wrap items-center gap-3">
            {contact.socials.map((social) => {
              const Icon = social.Icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1 rounded-full py-2 pr-3.5 text-gray-400 transition-colors hover:text-[#FF5F1F]"
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[13px] font-normal tracking-tight text-gray-400 dark:text-gray-500">
              ph utc+8
            </span>
            <span className="font-pixel text-[13px] font-normal tracking-tight text-gray-400 dark:text-gray-500">
              {time}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}