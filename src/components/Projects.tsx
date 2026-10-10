"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Globe, DeviceMobile, Cube, SquaresFour, LockKey, Train } from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK, ScrollTrigger } from "@/lib/gsap";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "./ui/SectionHeading";

const filters = [
  { id: "all", label: "All projects", icon: SquaresFour },
  { id: "web", label: "Web", icon: Globe },
  { id: "mobile", label: "Mobile", icon: DeviceMobile },
  { id: "vr", label: "VR", icon: Cube },
] as const;
type Filter = (typeof filters)[number]["id"];

function matches(project: Project, filter: Filter) {
  return filter === "all" || project.category.toLowerCase().includes(filter);
}

function ProjectLinks({ project }: { project: Project }) {
  if (project.internal) {
    return <span className="inline-flex items-center gap-2 text-sm text-subtle"><LockKey size={16} aria-hidden />Internal staff app</span>;
  }
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {project.links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
          aria-label={`${project.title}: ${link.label} (opens in a new tab)`}
          className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent">
          {link.label}<ArrowUpRight size={16} aria-hidden className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
}

function ProjectVisual({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-line bg-elev ${featured ? "aspect-[16/10]" : "aspect-[16/10] w-full"}`}>
      {project.image ? (
        <Image src={project.image} alt={`${project.title} public ${project.id === "fanr" ? "app listing" : "website"} preview`}
          fill sizes={featured ? "(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 200px, 100vw"}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
      ) : (
        <div className="flex h-full flex-col justify-between bg-surface p-6 sm:p-9">
          <span className="flex items-center gap-2 text-sm text-subtle"><LockKey size={16} aria-hidden />Staff access only</span>
          <div className="flex items-center gap-4 text-fg"><Train size={48} weight="light" aria-hidden /><span className="text-3xl font-medium">Etihad Rail</span></div>
          <span className="text-sm text-muted">Internal operations application</span>
        </div>
      )}
    </div>
  );
}

function ProjectEntry({ project, index, featured }: { project: Project; index: number; featured: boolean }) {
  return (
    <article data-project aria-labelledby={`project-${project.id}`}
      className={`group grid min-w-0 gap-6 border-t border-line py-8 md:gap-10 ${featured ? "md:grid-cols-2 md:items-center md:py-12" : "md:grid-cols-[200px_minmax(0,1fr)] md:py-7"}`}>
      <div className={featured ? "md:order-2" : ""}><ProjectVisual project={project} featured={featured} /></div>
      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
          <span className="font-mono text-subtle">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-3 w-px bg-line-strong" aria-hidden />
          <span>{project.sector}</span>
          {project.engagement && <span className="rounded border border-accent/30 px-2 py-0.5 text-accent">{project.engagement}</span>}
        </div>
        <h3 id={`project-${project.id}`} className={`font-semibold leading-tight ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{project.title}</h3>
        <p className={`mt-3 max-w-[65ch] leading-relaxed text-muted ${featured ? "text-base sm:text-lg" : "text-base"}`}>{project.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-subtle" aria-label="Product scope">
          <span className="font-medium text-accent">{project.category}</span>
          {project.features.map((feature) => <span key={feature} className="inline-flex items-center gap-3"><span aria-hidden className="size-1 rounded-full bg-line-strong" />{feature}</span>)}
        </div>
        <div className="mt-5"><ProjectLinks project={project} /></div>
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const visible = projects.filter((project) => matches(project, filter));

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-project]", ref.current!).forEach((entry) => {
        gsap.from(entry, { y: 24, opacity: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: entry, start: "top 94%", once: true } });
      });
    });
    ScrollTrigger.refresh();
  }, { scope: ref, dependencies: [filter], revertOnUpdate: true });

  return (
    <section ref={ref} id="projects" aria-labelledby="projects-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="projects-title" index="04" label="Selected Projects" title="Projects I've worked on."
          intro="A selection from my QA work across digital platforms, from public websites and commerce to mobile apps and immersive experiences." />
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Filter projects by platform" className="flex max-w-full flex-wrap gap-1 rounded-lg border border-line bg-surface p-1">
            {filters.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}
                className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-3 text-sm transition-colors sm:px-4 ${filter === id ? "bg-accent text-accent-fg" : "text-muted hover:bg-elev hover:text-fg"}`}>
                <Icon size={16} aria-hidden />{label}
                <span className={`text-xs ${filter === id ? "opacity-70" : "text-subtle"}`}>{projects.filter((project) => matches(project, id)).length}</span>
              </button>
            ))}
          </div>
          <p role="status" aria-live="polite" className="text-sm text-subtle">{visible.length} selected {visible.length === 1 ? "project" : "projects"}</p>
        </div>
        <div>
          {visible.map((project) => {
            const index = projects.indexOf(project);
            return <ProjectEntry key={project.id} project={project} index={index} featured={index < 3} />;
          })}
        </div>
        <p className="border-t border-line pt-6 text-sm text-subtle">Selected work from a broader portfolio of projects.</p>
      </div>
    </section>
  );
}
