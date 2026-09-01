import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export type PageHeaderProps = {
  kicker?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  className?: string;
};

export function PageHeader({ kicker, title, lead, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        {kicker ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            {kicker}
          </p>
        ) : null}
        <h1
          className={cn(
            "font-display text-2xl font-semibold tracking-tight md:text-3xl",
            kicker ? "mt-2" : undefined,
          )}
        >
          {title}
        </h1>
        {lead ? (
          <p className="mt-2 max-w-xl text-sm text-[var(--muted-foreground)]">{lead}</p>
        ) : null}
      </div>
      {action ? <div className="flex flex-wrap items-center gap-3">{action}</div> : null}
    </div>
  );
}