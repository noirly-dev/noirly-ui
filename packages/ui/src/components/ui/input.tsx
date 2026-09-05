import * as React from "react";
import { cn } from "../../lib/utils.js";

export interface InputProps extends React.ComponentProps<"input"> {
  /** Rendered inside the field, before the control. Usually a 15px icon. */
  leading?: React.ReactNode;
  /** Rendered inside the field, after the control. Shortcut hints, units, buttons. */
  trailing?: React.ReactNode;
  invalid?: boolean;
  /** Classes for the field wrapper rather than the bare control. */
  wrapperClassName?: string;
}

/**
 * The focus ring lives on the wrapper, not the control, so a field with a
 * leading icon lights up as one object instead of drawing a rectangle around
 * the text box inside it. See `.field` in styles.css.
 */
export function Input({
  className,
  wrapperClassName,
  type,
  leading,
  trailing,
  invalid,
  ...props
}: InputProps) {
  return (
    <div
      className={cn("field", wrapperClassName)}
      data-invalid={invalid ? "true" : undefined}
    >
      {leading ? <span className="field-icon">{leading}</span> : null}
      <input
        type={type}
        aria-invalid={invalid || undefined}
        className={cn("field-control disabled:cursor-not-allowed disabled:opacity-50", className)}
        {...props}
      />
      {trailing ? <span className="field-icon">{trailing}</span> : null}
    </div>
  );
}
