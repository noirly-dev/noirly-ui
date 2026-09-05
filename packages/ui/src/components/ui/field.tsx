import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Label } from "./label.js";

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  /** Shown under the control while valid. */
  hint?: string;
  /** Replaces the hint when present, and colours the control. */
  error?: string;
  /** Adds the marker to the label. Absence of it is how optional reads. */
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Label, control, and one line of help underneath.
 *
 * Every form in every app was assembling this by hand, which is why the gaps
 * and the error placement drifted between them. `error` deliberately replaces
 * `hint` rather than stacking below it — two lines of help under one input
 * pushes the next field out of rhythm the moment validation fires.
 */
export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const help = error ?? hint;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-[var(--accent)]">
            *
          </span>
        ) : null}
      </Label>
      {children}
      {help ? (
        <p className={error ? "field-error" : "field-hint"} role={error ? "alert" : undefined}>
          {help}
        </p>
      ) : null}
    </div>
  );
}
