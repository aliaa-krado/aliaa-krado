"use client";

import { useRef } from "react";
import { Briefcase, MapPin } from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { experience } from "@/data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Spotlight from "./ui/Spotlight";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // The rail fills as you scroll through the timeline.
        gsap.fromTo(
          "[data-rail-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-timeline]", start: "top 60%", end: "bottom 60%", scrub: 0.5 },
          }
        );

        gsap.utils.toArray<HTMLElement>("[data-job]").forEach((job) => {
          const dot = job.querySelector("[data-dot]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: job, start: "top 75%" } });
          tl.from(job.querySelector("[data-job-meta]"), { x: -24, opacity: 0, duration: 0.9, ease: "expo.out" })
            .from(job.querySelector("[data-job-card]"), { y: 50, opacity: 0, duration: 1.1, ease: "expo.out" }, "<0.05")
            .from(job.querySelectorAll("[data-point]"), { y: 10, opacity: 0, duration: 0.5, stagger: 0.06 }, "<0.35");
          gsap.to(dot, {
            scrollTrigger: {
              trigger: job,
              start: "top 60%",
              toggleClass: { targets: dot as Element, className: "is-active" },
            },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="experience" aria-labelledby="experience-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="experience-title"
          index="03"
          label="Experience"
          title="A career built on getting the details right."
          intro="From customer service to quality control, team leadership, and software testing, each role sharpened how I think about users and reliability."
        />

        <ol data-timeline className="relative">
          {/* rail */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[11px] w-px bg-line md:left-[calc(260px+11px)]" />
          <span
            aria-hidden
            data-rail-fill
            className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-2 md:left-[calc(260px+11px)]"
          />

          {experience.map((job) => (
            <li key={job.company} data-job className="relative grid gap-4 pb-14 last:pb-0 md:grid-cols-[260px_1fr] md:gap-0">
              {/* meta column */}
              <div data-job-meta className="pl-12 md:pt-1 md:pr-10 md:pl-0 md:text-right">
                <p className="font-mono text-sm text-accent">{job.roles[0].period}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight">{job.company}</p>
                {job.location && (
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-subtle">
                    <MapPin size={13} aria-hidden /> {job.location}
                  </p>
                )}
              </div>

              {/* dot */}
              <span
                aria-hidden
                data-dot
                className="group/dot absolute top-1 left-0 grid size-[23px] place-items-center rounded-full border border-line-strong bg-bg md:left-[260px] [&.is-active]:border-accent"
              >
                <span className="size-2 rounded-full bg-subtle transition-all duration-500 group-[.is-active]/dot:scale-125 group-[.is-active]/dot:bg-accent group-[.is-active]/dot:shadow-[0_0_16px_var(--accent)]" />
              </span>

              {/* card */}
              <div className="pl-12">
                <Spotlight
                  data-job-card
                  className="rounded-3xl border border-line bg-surface p-6 transition-colors duration-500 hover:bg-elev/60 sm:p-8"
                >
                  {job.current && (
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                      <span className="size-1.5 rounded-full bg-accent" /> Current role
                    </span>
                  )}
                  <div className="space-y-8">
                    {job.roles.map((role) => (
                      <div key={role.title}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
                            <Briefcase size={20} className="shrink-0 text-subtle" aria-hidden />
                            {role.title}
                          </h3>
                          <p className="font-mono text-xs text-subtle">
                            {job.roles.length > 1 && <span>{role.period} · </span>}
                            {role.duration}
                          </p>
                        </div>
                        <ul className="mt-5 space-y-3">
                          {role.points.map((p) => (
                            <li key={p} data-point className="flex gap-3 leading-relaxed text-muted">
                              <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6" aria-label="Focus areas">
                    {job.tags.map((t) => (
                      <li key={t} className="rounded-md bg-elev px-2.5 py-1 font-mono text-xs text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
