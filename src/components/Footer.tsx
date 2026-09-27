"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { navLinks, profile } from "@/data/portfolio";
import { scrollToId } from "@/lib/lenis";
import Socials from "./ui/Socials";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
            <p className="mt-1 text-muted">{profile.role}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(l.id);
                    }}
                    className="cursor-pointer text-sm text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Socials />
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-line py-8 sm:flex-row sm:items-center">
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} {profile.name}. Designed & built with Next.js, Tailwind CSS & GSAP.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-line transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:text-accent">
              <ArrowUp size={14} aria-hidden />
            </span>
          </button>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] text-center text-[20vw] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_var(--line-strong)]"
      >
        {profile.name}
      </p>
    </footer>
  );
}
