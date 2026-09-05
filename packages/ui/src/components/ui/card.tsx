import * as React from "react";
import { cn } from "../../lib/utils.js";

type CardVariant = "default" | "flat" | "interactive";

/**
 * The product surface.
 *
 * `.surface` already paints the whole edge treatment — an inset hairline, the
 * card gradient, the sheen and `--elev-1` — as one box-shadow stack. This used
 * to add `border` and `shadow-[var(--elev-1)]` on top, and because a Tailwind
 * `shadow-*` utility *replaces* box-shadow rather than adding to it, the inset
 * hairline and the sheen were being thrown away and redrawn as a flat hard
 * border. That is most of why cards read as generic. Neither is set here now.
 */
const variantClass: Record<CardVariant, string> = {
  default: "surface",
  flat: "surface-flat",
  interactive: "surface surface-interactive",
};

export function Card({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: CardVariant }) {
  return (
    <div
      className={cn(variantClass[variant], "grain rounded-[var(--r-lg)]", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1 p-5 pb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("section-title", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-[0.8125rem] leading-relaxed text-[var(--text-secondary)]", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}

/** Actions row. Separated by a rule rather than boxed off. */
export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-[var(--hairline)] px-5 py-3.5",
        className,
      )}
      {...props}
    />
  );
}
