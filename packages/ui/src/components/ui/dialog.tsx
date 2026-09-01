"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "../../lib/utils.js";

type DialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export function Dialog({ open, title, onClose, children, className }: DialogProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[var(--bg)]/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="noirly-dialog-title"
        className={cn(
          "surface grain relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-[var(--r-lg)] border border-[var(--hairline)] p-5 shadow-[var(--elev-2)] sm:max-w-lg",
          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id="noirly-dialog-title"
            className="font-display text-xl font-semibold tracking-tight"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Esc
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
