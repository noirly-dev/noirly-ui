"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import { cn } from "../../lib/utils.js";
import { SHELL_GUTTER_CLASS } from "./page-container.js";

export type AppNavItem = {
  href: string;
  label: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  match?: "exact" | "prefix";
};

export type AppSidebarProps = {
  brand?: ReactNode;
  /** Extra sidebar content above primary nav (workspace lists, search, etc.). */
  children?: ReactNode;
  items: AppNavItem[];
  footer?: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

function isActive(pathname: string, href: string, match: AppNavItem["match"] = "prefix") {
  if (match === "exact") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

const sectionClass = cn(SHELL_GUTTER_CLASS, "py-4");

export function AppSidebar({
  brand,
  children,
  items,
  footer,
  className,
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-dvh min-h-dvh w-[260px] shrink-0 flex-col overflow-hidden border-r border-[var(--hairline)] bg-[var(--surface)]/80 backdrop-blur-xl",
        className,
      )}
    >
      {brand ? (
        <div className={cn("shrink-0 border-b border-[var(--hairline)]", sectionClass)}>
          {brand}
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {children ? (
          <div className={cn("shrink-0 border-b border-[var(--hairline)]", sectionClass)}>
            {children}
          </div>
        ) : null}

        <nav className={cn("flex flex-col gap-1", sectionClass, children ? "pt-0" : "")}>
          {items.map(({ href, label, icon: Icon, match }) => {
            const active = isActive(pathname, href, match);
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
                )}
              >
                {Icon ? <Icon size={16} className="shrink-0" /> : null}
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {footer ? (
        <div className={cn("mt-auto shrink-0 border-t border-[var(--hairline)]", sectionClass)}>
          {footer}
        </div>
      ) : null}
    </aside>
  );
}
