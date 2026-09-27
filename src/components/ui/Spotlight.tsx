"use client";

import type { ComponentProps } from "react";

/** A surface whose border and fill glow track the pointer (see .spotlight in globals.css). */
export default function Spotlight({ className = "", children, ...rest }: ComponentProps<"div">) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onPointerMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </div>
  );
}
