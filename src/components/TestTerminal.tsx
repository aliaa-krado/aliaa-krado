"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const tests = [
  { spec: "TC-01", name: "login with valid credentials" },
  { spec: "TC-02", name: "checkout discount calculation" },
  { spec: "TC-03", name: "API response and error handling" },
  { spec: "TC-04", name: "mobile navigation" },
  { spec: "TC-05", name: "required-field validation" },
  { spec: "TC-06", name: "search and category filters" },
];

const areas = ["manual", "API", "mobile"];

/**
 * A decorative, looping QA checklist. Purely illustrative, hidden from
 * assistive tech; under reduced motion it renders the finished state.
 */
export default function TestTerminal() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const cmd = q("[data-cmd]")[0] as HTMLElement;
        const full = cmd.dataset.text ?? "";
        const typed = { n: 0 };

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 1.2 });
        tl.set(q("[data-row]"), { opacity: 0, y: 6 })
          .set(q("[data-check]"), { opacity: 0, scale: 0.4 })
          .set(q("[data-spin]"), { opacity: 1 })
          .set(q("[data-summary]"), { opacity: 0, y: 6 })
          .set(q("[data-bar]"), { scaleX: 0 })
          .set(q("[data-meta]"), { opacity: 0 })
          .set(typed, { n: 0 })
          .to(typed, {
            n: full.length,
            duration: 1.1,
            ease: `steps(${full.length})`,
            onUpdate: () => {
              cmd.textContent = full.slice(0, Math.round(typed.n));
            },
          })
          .to(q("[data-meta]"), { opacity: 1, duration: 0.3 }, "+=0.2");

        q("[data-row]").forEach((row, i) => {
          const r = gsap.utils.selector(row);
          tl.to(row, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, i === 0 ? "+=0.2" : "-=0.05")
            .to(r("[data-spin]"), { opacity: 0, duration: 0.1 }, "+=0.35")
            .to(r("[data-check]"), { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, "<")
            .to(q("[data-bar]"), { scaleX: (i + 1) / tests.length, duration: 0.3, ease: "power2.out" }, "<");
        });
        tl.to(q("[data-summary]"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.2");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const cmd = ref.current?.querySelector<HTMLElement>("[data-cmd]");
        if (cmd) cmd.textContent = cmd.dataset.text ?? "";
        gsap.set(ref.current!.querySelectorAll("[data-spin]"), { opacity: 0 });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-[0_30px_120px_-30px_var(--glow),0_0_0_1px_var(--line)] backdrop-blur-xl"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-xs text-subtle">QA review</span>
        <span className="ml-auto flex gap-1.5">
          {areas.map((b) => (
            <span
              key={b}
              className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline"
            >
              {b}
            </span>
          ))}
        </span>
      </div>

      <div className="space-y-2 p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        <p className="text-fg">
          <span className="text-accent">❯</span>{" "}
          <span data-cmd data-text="Review release checklist">
            Review release checklist
          </span>
          <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent/80" />
        </p>
        <p data-meta className="text-subtle">
          Sample checklist / {tests.length} test cases
        </p>

        <ul className="space-y-1.5 pt-1">
          {tests.map((t) => (
            <li data-row key={t.name} className="flex items-center gap-2.5">
              <span className="relative grid size-4 shrink-0 place-items-center">
                <span
                  data-spin
                  className="absolute size-3 animate-spin rounded-full border-[1.5px] border-subtle/40 border-t-accent opacity-0"
                />
                <svg data-check viewBox="0 0 16 16" className="size-4 text-accent">
                  <path
                    d="M3.5 8.5l3 3 6-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="hidden text-subtle sm:inline">{t.spec}</span>
              <span className="truncate text-muted">
                <span className="text-subtle sm:hidden">› </span>
                {t.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="pt-3">
          <div className="h-1 overflow-hidden rounded-full bg-elev">
            <div data-bar className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-2" />
          </div>
        </div>

        <p data-summary className="flex items-center gap-2 pt-1">
          <span className="rounded bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-accent-fg">REVIEWED</span>
          <span className="text-accent">{tests.length} checks completed</span>
        </p>
      </div>
    </div>
  );
}
