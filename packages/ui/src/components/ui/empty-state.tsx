import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export interface EmptyStateProps {
  /** A 20px icon. Sits in an accent-tinted mark. */
  icon?: ReactNode;
  title: string;
  /** One sentence on what would fill this space, or why it is empty. */
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("empty-state", className)}>
      {icon ? <div className="empty-state-mark">{icon}</div> : null}
      <div className="flex flex-col gap-1.5">
        <p className="section-title">{title}</p>
        {description ? (
          <p className="mx-auto max-w-sm text-[0.8125rem] leading-relaxed text-[var(--text-secondary)]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
