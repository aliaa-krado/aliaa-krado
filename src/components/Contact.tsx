"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Copy,
  EnvelopeSimple,
  LinkedinLogo,
  MapPin,
  PaperPlaneTilt,
  SpinnerGap,
  WarningCircle,
} from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { profile } from "@/data/portfolio";
import Button from "./ui/Button";
import Spotlight from "./ui/Spotlight";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

// Set NEXT_PUBLIC_FORMSPREE_ID to deliver messages via Formspree;
// otherwise the form opens the visitor's mail client, pre-filled.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell me your name.";
  if (!f.email.trim()) e.email = "An email address is needed so I can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email doesn’t look quite right — e.g. name@company.com";
  if (f.message.trim().length < 10) e.message = "A short message (10+ characters) helps me understand how I can help.";
  return e;
}

function Field({
  id,
  label,
  error,
  textarea,
  ...rest
}: {
  id: keyof Fields;
  label: string;
  error?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const cls = `peer min-w-0 w-full rounded-2xl border bg-bg/60 px-4 pt-6 pb-2.5 text-base text-fg outline-none transition-colors duration-300 placeholder:text-transparent focus:border-accent focus:bg-bg ${
    error ? "border-danger/70" : "border-line hover:border-line-strong"
  }`;
  const common = {
    id,
    name: id,
    placeholder: label,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
  return (
    <div className="min-w-0">
      <div className="relative">
        {textarea ? (
          <textarea {...common} {...rest} rows={5} className={`${cls} resize-none`} />
        ) : (
          <input {...common} {...rest} className={cls} />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-2 left-4 text-xs text-subtle transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <WarningCircle size={15} className="shrink-0" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-contact-word]", {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
        gsap.from("[data-contact-fade]", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });
      });
    },
    { scope: ref }
  );

  const update = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [k]: e.target.value };
    setFields(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: validate(fields)[k] }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = (Object.keys(errs) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`);
      const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setFields({ name: "", email: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const title = "Let’s make your next release bulletproof.";

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_20%,transparent_100%)]" />
        <div className="absolute bottom-[-30%] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">05 — Contact</span>
          <span aria-hidden className="h-px max-w-40 flex-1 bg-line-strong" />
        </div>
        <h2
          id="contact-title"
          className="max-w-4xl text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance"
        >
          {title.split(" ").map((w, i, arr) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
              <span data-contact-word className={`inline-block ${i >= arr.length - 1 ? "text-gradient pr-[0.05em]" : ""}`}>
                {w}&nbsp;
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
          {/* details */}
          <div data-contact-fade className="flex flex-col gap-4">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Whether you need a QA specialist on your team, a second pair of eyes before launch, or support
              with manual, API, and mobile testing, I&apos;d love to hear from you.
            </p>

            <Spotlight className="mt-4 rounded-3xl border border-line bg-surface p-2">
              <div className="flex items-center gap-2 rounded-2xl p-3 sm:gap-4 sm:p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-elev text-accent">
                  <EnvelopeSimple size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-subtle">Email</p>
                  <a href={`mailto:${profile.email}`} className="block break-all font-medium hover:text-accent">
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                  className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {copied ? <Check size={16} weight="bold" aria-hidden /> : <Copy size={16} aria-hidden />}
                </button>
                <span aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-elev/60"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-elev text-accent">
                  <LinkedinLogo size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-subtle">LinkedIn</p>
                  <p className="truncate font-medium">in/aliaa-krado</p>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </a>
              <div className="flex items-center gap-4 rounded-2xl p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-elev text-accent">
                  <MapPin size={20} aria-hidden />
                </span>
                <div>
                  <p className="text-xs text-subtle">Based in</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </div>
            </Spotlight>
          </div>

          {/* form */}
          <Spotlight data-contact-fade className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check size={30} weight="bold" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                    {FORMSPREE_ID ? "Message sent — thank you!" : "Your email is ready to send"}
                  </h3>
                  <p className="mt-2 max-w-sm text-muted">
                    {FORMSPREE_ID
                      ? "I’ll get back to you as soon as possible."
                      : "Your mail app should have opened with the message pre-filled. If not, email me directly."}
                  </p>
                  <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
                    Write another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                  onSubmit={onSubmit}
                  className="flex flex-col gap-4"
                  aria-label="Contact form"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="Your name"
                      autoComplete="name"
                      value={fields.name}
                      onChange={update("name")}
                      onBlur={blur("name")}
                      error={touched.name ? errors.name : undefined}
                    />
                    <Field
                      id="email"
                      label="Email address"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={update("email")}
                      onBlur={blur("email")}
                      error={touched.email ? errors.email : undefined}
                    />
                  </div>
                  <Field
                    id="message"
                    label="How can I help?"
                    textarea
                    value={fields.message}
                    onChange={update("message")}
                    onBlur={blur("message")}
                    error={touched.message ? errors.message : undefined}
                  />
                  {status === "error" && (
                    <p role="alert" className="flex items-center gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
                      <WarningCircle size={16} aria-hidden /> Something went wrong sending your message. Please try
                      again or email me directly.
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-subtle">All fields are required.</p>
                    <Button type="submit" disabled={status === "sending"}>
                      {status === "sending" ? (
                        <>
                          <SpinnerGap size={16} className="animate-spin" aria-hidden /> Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <PaperPlaneTilt
                            size={16}
                            aria-hidden
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
