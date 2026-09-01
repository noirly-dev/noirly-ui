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
    <div
      className={cn(
        "relative flex min-h-dvh flex-col px-4 py-8 sm:py-12",
        align === "center" ? "items-center justify-center" : "items-center justify-start",
        className,
      )}
    >
      <div className="aura pointer-events-none -top-24 left-1/2 h-64 w-64 -translate-x-1/2" aria-hidden />
      <div className={cn("relative z-10 w-full", sizeClass[size])}>
        <div className={cn("mb-8", logo || lead ? "text-center" : "text-center")}>
          {logo ? (
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] p-1.5 text-[var(--accent)]">
              {logo}
            </div>
          ) : null}
          <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
          {lead ? <p className="mt-2 text-sm text-[var(--muted-foreground)]">{lead}</p> : null}
        </div>
        <div className="surface grain relative rounded-[var(--r-lg)] border border-[var(--hairline)] p-6 shadow-[var(--elev-2)]">
          {children}
        </div>
        {footer ? (
          <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
