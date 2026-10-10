"use client";

import { useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  MapPin,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { scrollToId } from "@/lib/lenis";
import { profile } from "@/data/portfolio";
import Button from "./ui/Button";
import Magnetic from "./ui/Magnetic";
import Socials from "./ui/Socials";
import TestTerminal from "./TestTerminal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          delay: 0.15,
        });
        tl.to("[data-hero-word]", { y: 0, duration: 1.3, stagger: 0.08 })
          .to(
            "[data-hero-fade]",
            { opacity: 1, duration: 1, stagger: 0.08 },
            "-=0.9",
          )
          .from(
            "[data-hero-terminal]",
            { y: 60, opacity: 0, rotateX: 12, duration: 1.4 },
            "-=1.1",
          )
          .from(
            "[data-hero-aurora]",
            { opacity: 0, scale: 0.6, duration: 2.4, ease: "power2.out" },
            0,
          );

        // Scroll-away parallax
        gsap.to("[data-hero-copy]", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to("[data-hero-terminal]", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Pointer-follow spotlight
        const spot =
          ref.current!.querySelector<HTMLElement>("[data-hero-spot]")!;
        const xTo = gsap.quickTo(spot, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(spot, "y", { duration: 0.8, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const r = ref.current!.getBoundingClientRect();
          xTo(e.clientX - r.left - 300);
          yTo(e.clientY - r.top - 300);
        };
        ref.current!.addEventListener("pointermove", onMove);
        return () => ref.current?.removeEventListener("pointermove", onMove);
      });
    },
    { scope: ref },
  );

  const [first, ...rest] = profile.headline;
  const last = rest.pop();

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_100%)]" />
        <div
          data-hero-aurora
          className="absolute top-[-20%] left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
        />
        <div
          data-hero-aurora
          className="absolute top-[30%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-2)_16%,transparent),transparent)] blur-2xl"
        />
        <div
          data-hero-spot
          className="absolute top-0 left-0 hidden size-[600px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-70 lg:block"
        />
        <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div data-hero-copy>
          <div
            data-hero-fade
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-2 text-sm text-muted backdrop-blur"
          >
            <span className="relative grid size-5 place-items-center">
              <span className="pulse-ring absolute size-2 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            <span className="text-fg">{profile.role}</span>
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden /> {profile.location}
            </span>
          </div>

          <h1
            id="hero-title"
            className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] font-semibold tracking-[-0.05em]"
          >
            <span className="sr-only">
              {profile.name} — {profile.headline.join(" ")}
            </span>
            <span aria-hidden className="block">
              {[first, ...rest].map((w) => (
                <span
                  key={w}
                  className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-top"
                >
                  <span data-hero-word className="inline-block">
                    {w}
                  </span>
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-[0.1em] align-top">
                <span
                  data-hero-word
                  className="text-gradient inline-block pr-[0.05em]"
                >
                  {last}
                </span>
              </span>
            </span>
          </h1>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-14 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div data-hero-copy>
            <p
              data-hero-fade
              className=" max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl"
            >
              Hi, I&apos;m{" "}
              <span className="font-medium text-fg">{profile.firstName}</span>.{" "}
              {profile.valueProp}
            </p>

            <div
              data-hero-fade
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("projects");
                  }}
                >
                  View Projects
                  <ArrowRight
                    size={16}
                    weight="bold"
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  variant="secondary"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("contact");
                  }}
                >
                  <PaperPlaneTilt size={16} aria-hidden />
                  Contact Me
                </Button>
              </Magnetic>
            </div>

            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <Socials />
              <span aria-hidden className="h-px w-10 bg-line-strong" />
              <span className="font-mono text-xs tracking-wider text-subtle uppercase">
                {profile.yearsOfExperience}+ yrs in QA
              </span>
            </div>
          </div>

          <div data-hero-terminal className="[perspective:1200px]">
            <TestTerminal />
          </div>
        </div>
      </div>

      <button
        type="button"
        data-hero-fade
        onClick={() => scrollToId("about")}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-subtle transition-colors hover:text-fg md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <span className="grid h-10 w-6 place-items-start justify-center rounded-full border border-line-strong pt-2">
          <ArrowDown size={12} aria-hidden className="animate-bounce" />
        </span>
      </button>
    </section>
  );
}
