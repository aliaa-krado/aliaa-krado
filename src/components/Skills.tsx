"use client";

import { useRef } from "react";
import { Bug, Code, Cloud, UsersThree, Star } from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { marqueeTools, skillGroups, topSkills, type SkillGroup } from "@/data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Spotlight from "./ui/Spotlight";

const icons: Record<SkillGroup["icon"], typeof Bug> = {
  testing: Bug,
  automation: Code,
  tools: Cloud,
  leadership: UsersThree,
};

// Bento placement for the four groups on large screens.
const spans = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-skill-card]").forEach((card, i) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 88%" } });
          tl.from(card, { y: 60, opacity: 0, duration: 1.1, ease: "expo.out", delay: (i % 2) * 0.08 }).from(
            card.querySelectorAll("[data-chip]"),
            { y: 12, opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(2)", stagger: 0.035 },
            "-=0.7"
          );
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="skills" aria-labelledby="skills-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="skills-title"
          index="02"
          label="Skills"
          title="A strong foundation in software quality."
          intro="Thoughtful test design, clear documentation, and close collaboration with development teams."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <Spotlight
                key={g.id}
                data-skill-card
                className={`group flex flex-col rounded-3xl border border-line bg-surface p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1 sm:p-8 ${spans[i]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl border border-line bg-elev text-accent transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
                    <Icon size={24} aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-subtle">
                    {String(g.skills.length).padStart(2, "0")} skills
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight">{g.title}</h3>
                <p className="mt-2 max-w-md text-muted">{g.description}</p>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label={`${g.title} skills`}>
                  {g.skills.map((s) => {
                    const top = topSkills.includes(s);
                    return (
                      <li
                        key={s}
                        data-chip
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors duration-300 ${
                          top
                            ? "border-accent/40 bg-accent/10 text-fg"
                            : "border-line bg-bg/60 text-muted hover:border-line-strong hover:text-fg"
                        }`}
                      >
                        {top && <Star size={12} weight="fill" className="text-accent" aria-hidden />}
                        {s}
                        {top && <span className="sr-only"> (top skill)</span>}
                      </li>
                    );
                  })}
                </ul>
              </Spotlight>
            );
          })}
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-subtle">
          <Star size={12} weight="fill" className="text-accent" aria-hidden /> Top skills
        </p>
      </div>

      {/* Infinite tool marquee */}
      <div
        aria-hidden
        className="group relative mt-24 flex overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
          {[...marqueeTools, ...marqueeTools].map((t, i) => (
            <span key={i} className="flex items-center gap-12 text-2xl font-medium tracking-tight whitespace-nowrap text-subtle sm:text-3xl">
              {t}
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
