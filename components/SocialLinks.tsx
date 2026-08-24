import Image from "next/image";

const socials = 
[
  { name: "Facebook", href: "https://www.facebook.com", path: "/facebook-icon.svg" },
  { name: "Instagram", href: "https://www.instagram.com", path: "/instagram-icon.svg" },
];

export default function SocialLinks() 
{
  return (
    <div className="flex items-center justify-end gap-2">
      {socials.map((social) => 
      (
        <div key={social.name} className="group flex flex-col items-center">
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            className="rounded-lg bg-none p-1 transition-transform group-hover:-translate-y-0.5 group-hover:scale-110"
          >
            <Image
              src={social.path}
              alt=""
              width={28}
              height={28}
              className="h-5 w-5 object-contain grayscale"
            />
          </a>
        </div>
      ))}
    </div>
  );
}