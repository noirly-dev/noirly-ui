"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";
import { SHELL_GUTTER_CLASS } from "./page-container.js";

export type AppHeaderProps = {
  brand?: ReactNode;
  onMenuClick?: () => void;
  actions?: ReactNode;
  className?: string;
};

export function AppHeader({ brand, onMenuClick, actions, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex shrink-0 items-center gap-3 border-b border-[var(--hairline)] bg-[var(--bg)]/80 py-3 backdrop-blur-xl lg:hidden",
        SHELL_GUTTER_CLASS,
        className,
      )}
    >
      {onMenuClick ? (
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--hairline)] text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--surface-2)]"
        >
          Menu
        </button>
      ) : null}
      {brand ? <div className="min-w-0 flex-1">{brand}</div> : <div className="flex-1" />}
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}
