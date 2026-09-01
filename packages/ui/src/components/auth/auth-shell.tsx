import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export type AuthShellProps = {
  title: string;
  lead?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AuthShell({ title, lead, children, footer, className }: AuthShellProps) {
  return (
    <div className={cn("relative flex min-h-dvh flex-col items-center justify-center px-4 py-12", className)}>
      <div className="aura pointer-events-none -top-24 left-1/2 h-64 w-64 -translate-x-1/2" aria-hidden />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
          {lead ? <p className="mt-2 text-sm text-[var(--muted-foreground)]">{lead}</p> : null}
        </div>
        <div className="surface grain relative rounded-[var(--r-lg)] border border-[var(--hairline)] p-6 shadow-[var(--elev-2)]">
          {children}
        </div>
        {footer ? <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">{footer}</div> : null}
      </div>
    </div>
  );
}