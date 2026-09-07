"use client";

const contact = {
  email: "main.ahroneambasan@gmail.com",
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
        <h2 className="max-w-xl font-mono text-sm font-normal tracking-tight text-zinc-700 dark:text-zinc-300">
          Willing to learn, adapt and contribute, whether it&apos;s a quick or long term. If you&apos;re building something, <br/><br/>hit me on{" "}
          <a
            href={gmailComposeUrl}
            onClick={openGmailCompose}
            className="text-blue-500 dark:text-blue-400 text-sm font-mono underline tracking-tight underline-offset-2 transition-colors hover:text-[#FF5F1F]"
          >
            {contact.email}
          </a>.
        </h2>

      </div>
    </>
  );
}