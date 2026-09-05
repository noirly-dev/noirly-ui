import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

/** Horizontal padding shared by AppHeader and page content. */
export const SHELL_GUTTER_CLASS = "px-4 sm:px-6";

export type PageContainerProps = {
  children: ReactNode;
  className?: string;
  /** Content max width. Defaults to 6xl. */
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const sizeClass: Record<NonNullable<PageContainerProps["size"]>, string> = {
  sm: "max-w-lg",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-none",
};

export function PageContainer({
  children,
  className,
  size = "xl",
}: PageContainerProps) {
  return (
    <div
      className={cn(
        // Roomier than it was: the editorial look depends on the page having
        // air above the title and between bands.
        "mx-auto flex w-full flex-col gap-7 py-8 sm:py-10",
        SHELL_GUTTER_CLASS,
        sizeClass[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
