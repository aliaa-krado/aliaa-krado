import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/** Smooth-scrolls to an element id, falling back to native scrolling. */
export function scrollToId(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(id === "top" ? 0 : el, { offset: id === "top" ? 0 : -72, duration: 1.4 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (id === "top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  history.replaceState(null, "", id === "top" ? " " : `#${id}`);
}

/** Pauses/resumes smooth scrolling (e.g. while the mobile menu is open). */
export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
}
