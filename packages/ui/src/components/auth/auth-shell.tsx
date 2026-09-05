import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export type AuthShellProps = {
  title: string;
  lead?: string;
  logo?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  align?: "center" | "top";
};

const sizeClass = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
} as const;

export function AuthShell({
  title,
  lead,
  logo,
  children,
  footer,
  className,
  size = "sm",
  align = "center",
}: AuthShellProps) {
  return (
    // <main>, not <div>: this is the page's primary content region, so it
    // earns the landmark — and it is what `effects.css` hangs the pointer
    // spotlight off, the same as <AppShell>.
    <main
      className={cn(
        "relative flex min-h-dvh flex-col px-4 py-8 sm:py-12",
        align === "center" ? "items-center justify-center" : "items-center justify-start",
        className,
      )}
    >
      <div className="aura pointer-events-none -top-24 left-1/2 h-64 w-64 -translate-x-1/2" aria-hidden />
      <div className={cn("relative z-10 w-full", sizeClass[size])}>
        <div className="mb-8 text-center">
          {/* Rendered as passed. Wrapping it in an accent tile assumed the caller
              had a bare glyph; a mark that already carries its own shape ends up
              boxed inside a second one. */}
          {logo ? (
            <div className="mx-auto mb-5 flex h-14 items-center justify-center text-[var(--accent)]">
              {logo}
            </div>
          ) : null}
          <h1 className="page-title">{title}</h1>
          {lead ? (
            <p className="mx-auto mt-3 max-w-sm text-[0.875rem] leading-relaxed text-[var(--text-secondary)]">
              {lead}
            </p>
          ) : null}
        </div>
        {/* `.surface` already draws the hairline, gradient and sheen; a Tailwind
            shadow utility would replace that whole stack. `.surface-lift` raises
            it to elev-2 without losing any of it. */}
        <div className="surface surface-lift grain rounded-[var(--r-lg)] p-6">{children}</div>
        {footer ? (
          <div className="mt-6 text-center text-[0.8125rem] text-[var(--text-secondary)]">
            {footer}
          </div>
        ) : null}
      </div>
    </main>
  );
}
