import type { ReactNode } from "react";
import { bookingHref, bookingIsExternal } from "@/config/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${onDark ? "text-[#7fa8ff]" : "text-accent"}`}
    >
      {children}
    </p>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost-light";
  href?: string;
  external?: boolean;
  className?: string;
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong shadow-sm shadow-accent/20",
  secondary: "bg-white text-ink border border-line hover:border-ink/30",
  light: "bg-white text-accent hover:bg-accent-soft",
  "ghost-light": "border border-white/40 text-white hover:bg-white/10",
};

export function Button({ children, variant = "primary", href, external, className = "" }: ButtonProps) {
  const target = href ?? bookingHref;
  const isExternal = href ? external : bookingIsExternal;
  return (
    <a
      href={target}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
