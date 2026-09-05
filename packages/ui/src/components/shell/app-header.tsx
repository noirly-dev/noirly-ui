"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";
import { Kbd } from "../ui/avatar.js";

/**
 * Inlined rather than imported from lucide-react. `lucide-react` is an
 * *optional* peer dependency, and this component sits in the root entry — a
 * hard import here would make it required for every consumer, including ones
 * that never render an icon.
 */
function MenuIcon() {
  return (
    <svg
      aria-hidden
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export type Crumb = {
  label: string;
  href?: string;
};

export type AppHeaderProps = {
  /** Trail ending in the current page. The last entry is not a link. */
  breadcrumb?: Crumb[];
  /** Shown on mobile in place of the breadcrumb, where there is no room. */
  brand?: ReactNode;
  onMenuClick?: () => void;
  /** Opens the command palette. Renders the ⌘K affordance when provided. */
  onCommandClick?: () => void;
  actions?: ReactNode;
  className?: string;
};

/**
 * The top bar — now on desktop too.
 *
 * This used to be `lg:hidden`, which meant that on a desktop every app was a
 * sidebar and then bare content: nowhere for the current location, the command
 * palette, or the account to live. That absence is most of what made the apps
 * feel unfinished next to the marketing site.
 *
 * It stays deliberately thin. The sidebar carries navigation; this carries
 * only where-you-are and what-you-can-do-from-anywhere.
 */
export function AppHeader({
  breadcrumb,
  brand,
  onMenuClick,
  onCommandClick,
  actions,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6",
        "border-b border-[var(--hairline)] bg-[var(--bg)]/70 backdrop-blur-xl",
        className,
      )}
    >
      {onMenuClick ? (
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="focusable -ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--r-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)] lg:hidden"
        >
          <MenuIcon />
        </button>
      ) : null}

      {breadcrumb && breadcrumb.length > 0 ? (
        <nav aria-label="Breadcrumb" className="hidden min-w-0 flex-1 lg:block">
          <ol className="flex items-center gap-1.5 text-[0.8125rem]">
            {breadcrumb.map((crumb, i) => {
              const last = i === breadcrumb.length - 1;
              return (
                <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
                  {i > 0 ? (
                    <span aria-hidden className="text-[var(--text-muted)] opacity-50">
                      /
                    </span>
                  ) : null}
                  {crumb.href && !last ? (
                    <a
                      href={crumb.href}
                      className="truncate text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span
                      aria-current={last ? "page" : undefined}
                      className={cn(
                        "truncate",
                        last ? "font-medium text-[var(--text)]" : "text-[var(--text-muted)]",
                      )}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : (
        <div className="hidden flex-1 lg:block" />
      )}

      {/* Mobile keeps the app name; the breadcrumb has nowhere to go there. */}
      <div className="min-w-0 flex-1 lg:hidden">{brand}</div>

      {onCommandClick ? (
        <button
          type="button"
          onClick={onCommandClick}
          aria-label="Open command palette"
          className="focusable hidden h-8 items-center gap-2 rounded-[var(--r-sm)] px-2.5 text-[0.75rem] text-[var(--text-muted)] shadow-[inset_0_0_0_1px_var(--hairline)] transition-colors hover:text-[var(--text)] hover:shadow-[inset_0_0_0_1px_var(--hairline-strong)] sm:inline-flex"
        >
          <span>Search</span>
          <Kbd>⌘K</Kbd>
        </button>
      ) : null}

      {actions ? <div className="flex shrink-0 items-center gap-1.5">{actions}</div> : null}
    </header>
  );
}
