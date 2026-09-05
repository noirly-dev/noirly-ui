import * as React from "react";
import { cn } from "../../lib/utils.js";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  invalid?: boolean;
  wrapperClassName?: string;
}

export function Textarea({
  className,
  wrapperClassName,
  invalid,
  ...props
}: TextareaProps) {
  return (
    <div
      // items-start, not the field default of center: a growing textarea should
      // stay pinned to the top of its wrapper rather than drifting downward.
      className={cn("field items-start py-2", wrapperClassName)}
      data-invalid={invalid ? "true" : undefined}
    >
      <textarea
        aria-invalid={invalid || undefined}
        className={cn(
          "field-control min-h-[6rem] resize-y py-0.5 leading-relaxed disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}
