"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function SectionHeading({
  index,
  label,
  title,
  intro,
  id,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
        tl.from("[data-sh-line]", { scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.out" })
          .from("[data-sh-label]", { opacity: 0, x: -12, duration: 0.6, ease: "power3.out" }, "<0.1")
          .from("[data-sh-word]", { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.05 }, "<0.05")
          .from("[data-sh-intro]", { opacity: 0, y: 16, duration: 0.8, ease: "power3.out" }, "<0.3");
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-4">
        <span data-sh-label className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          {index} — {label}
        </span>
        <span data-sh-line aria-hidden className="h-px max-w-40 flex-1 bg-line-strong" />
      </div>
      <h2
        id={id}
        className="max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl md:text-6xl"
      >
        {title.split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
            <span data-sh-word className="inline-block">
              {w}&nbsp;
            </span>
          </span>
        ))}
      </h2>
      {intro && (
        <p data-sh-intro className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </div>
  );
}
