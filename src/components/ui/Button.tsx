import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-medium tracking-tight transition-[background-color,border-color,color,box-shadow] duration-300 ease-out-expo disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg shadow-[0_0_0_1px_var(--line-strong)] hover:shadow-[0_0_40px_-6px_var(--accent)]",
  secondary:
    "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:border-accent/60 hover:bg-elev",
  ghost: "text-muted hover:text-fg",
};

type Props = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & (({ href: string } & ComponentProps<"a">) | ({ href?: undefined } & ComponentProps<"button">));

export default function Button({ variant = "primary", children, className = "", ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out-expo group-hover:translate-x-full"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );
  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as ComponentProps<"a">)}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {inner}
    </button>
  );
}
