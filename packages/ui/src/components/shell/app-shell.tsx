"use client";

import { useState, type ReactNode } from "react";
import { cn } from "../../lib/utils.js";
import { AppHeader, type AppHeaderProps } from "./app-header.js";
import { AppSidebar, type AppSidebarProps } from "./app-sidebar.js";

export type AppShellProps = {
  sidebar: Omit<AppSidebarProps, "onNavigate">;
  header?: Omit<AppHeaderProps, "onMenuClick">;
  children: ReactNode;
  className?: string;
  /** Main content wrapper classes. Pass `p-0` to opt out for full-bleed views. */
  contentClassName?: string;
};

export function AppShell({
  sidebar,
  header,
  children,
  className,
  contentClassName,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn("flex min-h-dvh", className)}>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-[var(--bg-deep)]/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-dvh transition-transform duration-[280ms] lg:static lg:translate-x-0",
          "[transition-timing-function:var(--ease-out-expo)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <AppSidebar {...sidebar} onNavigate={() => setMobileOpen(false)} />
      </div>

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <AppHeader {...(header ?? {})} onMenuClick={() => setMobileOpen(true)} />
        <main
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col",
            contentClassName ?? "overflow-y-auto",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
