import { cn } from "../../lib/utils.js";

export type BadgeTone = "neutral" | "accent" | "positive" | "negative";

export interface BadgeProps extends React.ComponentProps<"span"> {
  tone?: BadgeTone;
  /** Leading status dot. For live state (online, running, overdue). */
  dot?: boolean;
}

/**
 * Status, not tags.
 *
 * Renders `.pill`: mono, uppercase, tight. Use `.chip` from the marketing
 * layer for tag-shaped content that carries a word rather than a state.
 */
export function Badge({ className, tone = "neutral", dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn("pill", className)} data-tone={tone} {...props}>
      {dot ? (
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}
