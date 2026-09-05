import { cn } from "../../lib/utils.js";

/**
 * Loading placeholder — a slow sweep, not a pulse.
 *
 * A pulsing opacity keeps pulling the eye back while the reader is trying to
 * look at whatever *has* loaded; a single sweep reads as progress and then
 * gets out of the way. Under `prefers-reduced-motion` the base layer stops the
 * animation and it settles as a plain block.
 */
export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden className={cn("skeleton", className)} {...props} />;
}

/** Placeholder for a run of prose. The last line is short, as real text is. */
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3.5", i === lines - 1 ? "w-2/5" : "w-full")}
        />
      ))}
    </div>
  );
}

/** Placeholder rows matching <DataTable> density. */
export function SkeletonRows({
  rows = 5,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-[var(--hairline)] px-3.5 py-3 last:border-b-0"
        >
          <Skeleton className="h-3.5 flex-1" />
          <Skeleton className="hidden h-3.5 w-24 md:block" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      ))}
    </div>
  );
}
