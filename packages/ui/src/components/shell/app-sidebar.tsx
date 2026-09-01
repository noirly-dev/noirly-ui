"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export type AppNavItem = {
  href: string;
  label: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  match?: "exact" | "prefix";
};

export type AppSidebarProps = {
  brand?: ReactNode;
  items: AppNavItem[];
  footer?: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

function isActive(pathname: string, href: string, match: AppNavItem["match"] = "prefix") {
  if (match === "exact") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({ brand, items, footer, className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-dvh min-h-dvh w-[260px] shrink-0 flex-col border-r border-[var(--hairline)] bg-[var(--surface)]/80 backdrop-blur-xl lg:flex",
        className,
      )}
    >
      {brand ? <div className="border-b border-[var(--hairline)] p-6">{brand}</div> : null}

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {items.map(({ href, label, icon: Icon, match }) => {
          const active = isActive(pathname, href, match);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors sm:py-2.5",
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
              )}
            >
              {Icon ? <Icon size={16} /> : null}
              {label}
            </Link>
          );
        })}
      </nav>

      {footer ? <div className="mt-auto p-4">{footer}</div> : null}
    </aside>
  );
}