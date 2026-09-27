"use client";

import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { profile, type SocialKey } from "@/data/portfolio";

const meta: Record<SocialKey, { label: string; Icon: typeof GithubLogo }> = {
  github: { label: "GitHub", Icon: GithubLogo },
  linkedin: { label: "LinkedIn", Icon: LinkedinLogo },
  email: { label: "Email", Icon: EnvelopeSimple },
};

export default function Socials({ className = "" }: { className?: string }) {
  const entries = (Object.keys(meta) as SocialKey[]).filter((k) => profile.socials[k]);
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {entries.map((k) => {
        const { label, Icon } = meta[k];
        const href = profile.socials[k];
        const external = href.startsWith("http");
        return (
          <li key={k}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface/50 text-muted backdrop-blur transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
            >
              <Icon size={20} weight="regular" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
