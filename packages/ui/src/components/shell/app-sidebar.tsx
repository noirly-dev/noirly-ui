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
  /** Trailing count — unread, overdue, pending. */
  badge?: number | string;
};

export type AppNavGroup = {
  /** Mono label above the group. Omit for an unlabelled leading group. */
  label?: string;
  items: AppNavItem[];
};

export type AppSidebarProps = {
  brand?: ReactNode;
  /** Extra content under the brand — workspace switcher, search, new-item CTA. */
  children?: ReactNode;
  /** Flat list. Ignored when `groups` is given. */
  items?: AppNavItem[];
  /** Grouped nav. Sections are separated by a mono label, not a rule. */
  groups?: AppNavGroup[];
  footer?: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

function isActive(pathname: string, href: string, match: AppNavItem["match"] = "prefix") {
  if (match === "exact") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: AppNavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const { href, label, icon: Icon, match, badge } = item;
  const active = isActive(pathname, href, match);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className="nav-item focusable"
    >
      {Icon ? <Icon size={15} className="shrink-0 opacity-90" /> : null}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {badge !== undefined && badge !== 0 ? (
        <span className="meta shrink-0 text-[0.6875rem]">{badge}</span>
      ) : null}
    </Link>
  );
}

/**
 * Primary navigation.
 *
 * The active row is marked by a 2px accent rule on its leading edge plus a
 * faint accent wash — not a solid filled pill. At 36px tall a filled pill eats
 * the whitespace the rest of the layout is built on, and it makes the accent
 * (which everything else uses as *light*) suddenly read as paint.
 *
 * `groups` is preferred over `items`; a flat list of more than about six
 * destinations stops being scannable. `items` stays for callers that have not
 * migrated, and is rendered as a single unlabelled group.
 */
export function AppSidebar({
  brand,
  children,
  items,
  groups,
  footer,
  className,
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();
  const sections: AppNavGroup[] = groups ?? (items ? [{ items }] : []);

  return (
    <aside
      className={cn(
        "flex h-dvh min-h-dvh w-[264px] shrink-0 flex-col overflow-hidden",
        "border-r border-[var(--hairline)] bg-[var(--surface)]/70 backdrop-blur-xl",
        className,
      )}
    >
      {brand ? <div className="shrink-0 px-4 pt-4 pb-3">{brand}</div> : null}

      {children ? <div className="shrink-0 px-4 pb-3">{children}</div> : null}

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-3 py-2">
        {sections.map((section, i) => (
          <nav key={section.label ?? `group-${i}`} aria-label={section.label}>
            {section.label ? <p className="nav-group-label">{section.label}</p> : null}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </nav>
        ))}
      </div>

      {footer ? (
        <div className="mt-auto shrink-0 border-t border-[var(--hairline)] p-3">{footer}</div>
      ) : null}
    </aside>
  );
}
