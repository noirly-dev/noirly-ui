import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export type SidebarBrandProps = {
  logo: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
};

/**
 * Tightened from a 40px tile to 28px: at the top of a 264px rail the old mark
 * was competing with the page title for first read. The subtitle is mono now,
 * which is what separates the product name from the app name without needing a
 * second weight or colour.
 */
export function SidebarBrand({ logo, title, subtitle, className }: SidebarBrandProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--r-sm)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-[inset_0_0_0_1px_var(--hairline)]">
        {logo}
      </div>
      <div className="flex min-w-0 flex-col leading-tight">
        <p className="truncate font-display text-sm font-semibold tracking-tight">{title}</p>
        {subtitle ? <p className="meta truncate text-[0.625rem]">{subtitle}</p> : null}
      </div>
    </div>
  );
}
