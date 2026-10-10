"use client";

import { useRef } from "react";
import { DownloadSimple, GraduationCap } from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { about, education, profile } from "@/data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Spotlight from "./ui/Spotlight";
import Button from "./ui/Button";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Words brighten as the paragraph scrolls through the viewport.
        gsap.fromTo(
          "[data-about-word]",
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: "[data-about-body]", start: "top 80%", end: "bottom 55%", scrub: 0.6 },
          }
        );

        gsap.from("[data-stat]", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-stats]", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toString();
            },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="about-title" index="01" label="About" title={about.heading} />

        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
          <p
            data-about-body
            className="text-2xl leading-[1.45] font-medium tracking-[-0.015em] text-fg sm:text-[1.9rem]"
          >
            {about.body.split(" ").map((w, i) => (
              <span key={i} data-about-word className="inline">
                {w}{" "}
              </span>
            ))}
          </p>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
            <Spotlight className="rounded-2xl border border-line bg-surface p-6">
              <GraduationCap size={28} className="text-accent" aria-hidden />
              <p className="mt-5 font-mono text-xs tracking-wider text-subtle uppercase">Education</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">{education.school}</p>
              <p className="mt-1 text-muted">{education.degree}</p>
              <p className="mt-4 font-mono text-sm text-subtle">{education.period}</p>
            </Spotlight>
            {profile.resumeUrl && (
              <Button variant="secondary" href={profile.resumeUrl} download className="w-full">
                <DownloadSimple size={18} aria-hidden /> Download CV
              </Button>
            )}
          </aside>
        </div>

        <dl data-stats className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {about.stats.map((s) => (
            <div key={s.label} data-stat className="min-w-0 bg-bg p-4 sm:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-4xl font-semibold tabular-nums sm:text-6xl">
                  <span data-count={s.noCount ? undefined : s.value}>{s.value}</span>
                  <span className="text-accent">{s.suffix}</span>
                </span>
                <span aria-hidden className="mt-3 block text-sm text-muted">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
