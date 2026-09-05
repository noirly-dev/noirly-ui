import { cn } from "../../lib/utils.js";

export interface AvatarProps {
  /** Full name. Initials are derived from it and it becomes the alt text. */
  name: string;
  src?: string;
  /** Defaults to 28px, which is the header/row size. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClass = {
  sm: "h-6 w-6 text-[0.5625rem]",
  md: "h-7 w-7 text-[0.625rem]",
  lg: "h-10 w-10 text-xs",
} as const;

/** First and last initial — "Aneesh Pissay" reads better as AP than as AN. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]![0]!;
  const last = parts.length > 1 ? parts[parts.length - 1]![0]! : "";
  return (first + last).toUpperCase();
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  return (
    <span className={cn("avatar", sizeClass[size], className)} title={name}>
      {src ? <img src={src} alt={name} /> : <span aria-hidden>{initials(name)}</span>}
      {src ? null : <span className="sr-only">{name}</span>}
    </span>
  );
}

/** Keyboard hint. Pass the keys already formatted, e.g. "⌘K". */
export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return <kbd className={cn("kbd", className)}>{children}</kbd>;
}

export function Separator({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-[var(--hairline)]"
          : "h-full w-px bg-[var(--hairline)]",
        className,
      )}
    />
  );
}
