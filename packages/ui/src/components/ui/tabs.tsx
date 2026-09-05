"use client";

import Link from "next/link";
import { cn } from "../../lib/utils.js";

export interface TabItem {
  id: string;
  label: string;
  /** Renders the tab as a link. Omit for button tabs driven by `onSelect`. */
  href?: string;
  /** Trailing count, e.g. unread or matching rows. */
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onSelect?: (id: string) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * Underlined tabs, not a segmented control.
 *
 * A filled segmented control competes with the primary button for attention;
 * an underline sits behind the content and lets the accent stay scarce. The
 * marker animates via a scaleX transform on `::after`, so switching tabs costs
 * no layout.
 */
export function Tabs({ items, activeId, onSelect, className, ...rest }: TabsProps) {
  return (
    <div className={cn("tab-list", className)} role="tablist" aria-label={rest["aria-label"]}>
      {items.map((item) => {
        const selected = item.id === activeId;
        const content = (
          <>
            {item.label}
            {typeof item.count === "number" ? (
              <span className="ml-1.5 font-mono text-[0.625rem] tabular-nums opacity-60">
                {item.count}
              </span>
            ) : null}
          </>
        );

        if (item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              role="tab"
              aria-selected={selected}
              className="tab"
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect?.(item.id)}
            className="tab"
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
