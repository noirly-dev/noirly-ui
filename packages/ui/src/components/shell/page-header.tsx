import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export type PageHeaderProps = {
  /** Mono eyebrow above the title — section, count, or status. */
  eyebrow?: string;
  /** @deprecated Use `eyebrow`. Kept so existing callers keep rendering. */
  kicker?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  /** Tabs or filters, rendered under the rule so they read as page chrome. */
  toolbar?: ReactNode;
  className?: string;
};

/**
 * The top of a page.
 *
 * Eyebrow, Fraunces title, one line of lead, then a hairline. The rule is what
 * makes the band read as a header without wrapping it in a card — boxing the
 * page title inside a panel is the single most template-looking thing an app
 * layout can do.
 */
export function PageHeader({
  eyebrow,
  kicker,
  title,
  lead,
  action,
  toolbar,
  className,
}: PageHeaderProps) {
  const label = eyebrow ?? kicker;

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pb-5">
        <div className="min-w-0 flex-1">
          {label ? <p className="eyebrow mb-2.5">{label}</p> : null}
          <h1 className="page-title">{title}</h1>
          {lead ? (
            <p className="mt-2 max-w-[52ch] text-[0.875rem] leading-relaxed text-[var(--text-secondary)]">
              {lead}
            </p>
          ) : null}
        </div>
        {action ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2.5">{action}</div>
        ) : null}
      </div>

      <div className="rule-soft" />

      {toolbar ? <div className="pt-4">{toolbar}</div> : null}
    </div>
  );
}
