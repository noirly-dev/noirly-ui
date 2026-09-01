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
    <div className={cn("flex flex-col gap-4", className)}>
      {kicker ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          {kicker}
        </p>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h1>
          {lead ? (
            <p className="mt-2 max-w-xl text-sm text-[var(--muted-foreground)]">{lead}</p>
          ) : null}
        </div>
        {action ? (
          <div className="flex w-full shrink-0 flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
            {action}
          </div>
        ) : null}
      </div>
    </div>
  );
}
