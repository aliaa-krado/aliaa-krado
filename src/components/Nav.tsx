"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { List, X, Sun, Moon, ArrowUpRight } from "@phosphor-icons/react";
import { navLinks, profile } from "@/data/portfolio";
import { scrollToId, setScrollLocked } from "@/lib/lenis";

const getTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const subscribeTheme = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark" as const);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 480 && !open);
  });

  // Track which section is in view.
  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-2 pl-4 transition-all duration-500 ease-out-expo ${
            scrolled
              ? "border-line bg-bg/70 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            onClick={go("top")}
            className="flex cursor-pointer items-center gap-2.5 font-mono text-sm font-medium"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="grid size-8 place-items-center rounded-full bg-fg text-[11px] font-bold tracking-tight text-bg">
              {profile.initials}
            </span>
            <span className="hidden sm:inline">{profile.name.toLowerCase().replace(" ", ".")}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.slice(0, -1).map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`relative block cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active === l.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-elev ring-1 ring-line"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid size-10 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-elev hover:text-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                  className="grid"
                >
                  {theme === "dark" ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href="#contact"
              onClick={go("contact")}
              className="hidden h-10 cursor-pointer items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-bg transition-shadow duration-300 hover:shadow-[0_0_30px_-4px_var(--accent)] sm:inline-flex"
            >
              Let&apos;s talk <ArrowUpRight size={14} weight="bold" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 cursor-pointer place-items-center rounded-full text-fg hover:bg-elev md:hidden"
            >
              {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-40 bg-bg/95 px-6 pt-28 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="flex cursor-pointer items-baseline gap-4 border-b border-line py-4 text-4xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
