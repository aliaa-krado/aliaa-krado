"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Spotlight from "./ui/Spotlight";

/** Tiny, dependency-free highlighter for the illustrative snippets. */
function highlight(code: string): ReactNode[] {
  const re =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\b(await|async|const|return|expect|test)\b|\b(\d+)\b|(\.\w+)(?=\()/gm;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const [tok] = m;
    const cls = m[1]
      ? "text-subtle italic"
      : m[2]
        ? "text-accent"
        : m[3]
          ? "text-accent-2"
          : m[4]
            ? "text-[#f0abfc]"
            : "text-fg";
    out.push(
      <span key={k++} className={cls}>
        {tok}
      </span>
    );
    last = m.index + tok.length;
  }
  out.push(code.slice(last));
  return out;
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt that follows the pointer.
  useGSAP(
    () => {
      gsap.matchMedia().add(`${MOTION_OK} and (hover: hover)`, () => {
        const el = cardRef.current!;
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 6);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: cardRef }
  );

  const links = p.links.filter((l) => l.href);

  return (
    <article data-project className="[perspective:1400px] lg:motion-safe:w-[min(560px,42vw)] lg:motion-safe:shrink-0" aria-labelledby={`project-${i}`}>
      <div ref={cardRef} className="h-full [transform-style:preserve-3d]">
        <Spotlight className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface">
          {/* code visual */}
          <div className="relative border-b border-line bg-bg/60 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs text-subtle">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                {p.kicker}
              </span>
            </div>
            <pre
              aria-hidden
              className="overflow-x-auto font-mono text-[11px] leading-[1.7] whitespace-pre text-muted [mask-image:linear-gradient(to_right,#000_88%,transparent)] [scrollbar-width:none] sm:text-[12.5px]"
            >
              <code>{highlight(p.snippet)}</code>
            </pre>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-surface/80 to-transparent" />
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <h3 id={`project-${i}`} className="text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
              {p.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{p.description}</p>

            <ul className="mt-6 space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[15px] text-muted">
                  <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
              <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-md border border-line bg-elev px-2.5 py-1 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              {links.length > 0 && (
                <div className="flex gap-2">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-medium transition-all duration-300 hover:border-accent hover:text-accent"
                    >
                      {l.label}
                      <ArrowUpRight size={14} weight="bold" aria-hidden />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Spotlight>
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin and scroll the cards horizontally.
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const pin = ref.current!.querySelector<HTMLElement>("[data-pin]")!;
        const distance = () => track.scrollWidth - pin.clientWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set("[data-proj-progress]", { scaleX: self.progress });
            },
          },
        });

        gsap.from("[data-project]", {
          opacity: 0,
          x: 120,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: pin, start: "top 80%" },
        });

        return () => tween.kill();
      });

      // Mobile / tablet: simple stacked reveal.
      mm.add(`${MOTION_OK} and (max-width: 1023px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="projects" aria-labelledby="projects-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="projects-title"
          index="04"
          label="Selected Work"
          title="Featured projects & case studies."
          intro="How I approach quality in practice — from automated end-to-end suites to API contracts, mobile coverage, and AI-assisted test authoring."
        />
      </div>

      <div data-pin className="relative lg:motion-safe:overflow-hidden">
        <div
          data-track
          className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 md:grid-cols-2 lg:motion-safe:mx-0 lg:motion-safe:flex lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:gap-6 lg:motion-safe:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>

        <div aria-hidden className="mx-auto mt-10 hidden max-w-6xl items-center gap-4 px-8 lg:motion-safe:flex">
          <span className="font-mono text-xs text-subtle">Scroll</span>
          <span className="h-px flex-1 overflow-hidden bg-line">
            <span data-proj-progress className="block h-full origin-left scale-x-0 bg-accent" />
          </span>
          <span className="font-mono text-xs text-subtle">{String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
