import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export type SidebarBrandProps = {
  logo: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
};

export function SidebarBrand({ logo, title, subtitle, className }: SidebarBrandProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
        {logo}
      </div>
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-semibold tracking-tight">{title}</p>
        {subtitle ? (
          <p className="truncate text-xs text-[var(--muted-foreground)]">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
