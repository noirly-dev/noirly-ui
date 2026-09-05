import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export type StatTrend = "up" | "down" | "flat";

export interface StatProps {
  label: string;
  value: ReactNode;
  /** Change since the comparison period, e.g. "4.2%". */
  delta?: string;
  trend?: StatTrend;
  /** What the delta is measured against, e.g. "vs last month". */
  caption?: string;
  className?: string;
}

const ARROW: Record<StatTrend, string> = { up: "↑", down: "↓", flat: "→" };

/**
 * The headline number.
 *
 * `trend` is separate from the sign of `delta` on purpose: in a ledger,
 * spending going *up* is not good news, so the caller decides which direction
 * is positive rather than the component inferring it from a minus sign.
 */
export function Stat({ label, value, delta, trend = "flat", caption, className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {delta || caption ? (
        <p className="flex items-baseline gap-2">
          {delta ? (
            <span className="stat-delta" data-trend={trend}>
              <span aria-hidden>{ARROW[trend]}</span>
              {delta}
            </span>
          ) : null}
          {caption ? <span className="meta">{caption}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

/**
 * A row of stats separated by hairlines rather than boxed into cards.
 * Drop it inside a <Card> for the banded look, or use it bare on the page.
 */
export function StatGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-[var(--r-lg)] bg-[var(--hairline)]",
        "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** One cell of a <StatGroup>. The gap-px trick above draws the dividers. */
export function StatCell({ className, ...props }: StatProps & { className?: string }) {
  return <Stat {...props} className={cn("bg-[var(--surface)] p-5", className)} />;
}
