"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

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
        "flex items-center gap-3 border-b border-[var(--hairline)] bg-[var(--surface)]/80 px-4 py-3 backdrop-blur-xl lg:hidden",
        className,
      )}
    >
      {onMenuClick ? (
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-[var(--hairline)] px-3 py-1.5 text-sm text-[var(--foreground)]"
        >
          Menu
        </button>
      ) : null}
      {brand ? <div className="min-w-0 flex-1">{brand}</div> : <div className="flex-1" />}
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}