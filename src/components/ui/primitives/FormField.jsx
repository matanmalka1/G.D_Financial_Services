import { forwardRef } from "react";
import { joinClasses } from "./classes";

const LABEL_SPACING = {
  none: "",
  sm: "mb-1.5",
  md: "mb-2",
};

const INPUT_HEIGHT = {
  md: "h-12",
  auto: "",
};

const INPUT_VARIANTS = {
  default:
    "border-slate-200 bg-white shadow-sm shadow-slate-900/5 focus:border-slate-400 focus:ring-slate-900/20",
  inset:
    "border-slate-200 bg-white shadow-inner shadow-slate-900/5 focus:ring-slate-900/70",
};

export const FieldLabel = ({ children, className = "", spacing = "md", ...props }) => {
  if (!children) return null;

  return (
    <label
      className={joinClasses(
        "block text-sm font-semibold text-slate-700",
        LABEL_SPACING[spacing] ?? LABEL_SPACING.md,
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export const FieldError = ({ children, className = "" }) => {
  if (!children) return null;

  return (
    <p className={joinClasses("mt-1 text-xs text-red-500", className)}>{children}</p>
  );
};

export const TextInput = forwardRef(
  (
    {
      as: Component = "input",
      error,
      variant = "default",
      inputSize = "auto",
      className = "",
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={joinClasses(
        "w-full rounded-xl border px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2",
        INPUT_HEIGHT[inputSize] ?? INPUT_HEIGHT.auto,
        INPUT_VARIANTS[variant] ?? INPUT_VARIANTS.default,
        error ? "border-red-500" : "",
        className,
      )}
      {...props}
    />
  ),
);

TextInput.displayName = "TextInput";

export const TextField = forwardRef(
  (
    {
      label,
      error,
      labelClassName = "",
      errorClassName = "",
      labelSpacing = "md",
      className = "",
      ...inputProps
    },
    ref,
  ) => (
    <div className={className}>
      <FieldLabel className={labelClassName} spacing={labelSpacing}>
        {label}
      </FieldLabel>
      <TextInput ref={ref} error={error} {...inputProps} />
      <FieldError className={errorClassName}>{error}</FieldError>
    </div>
  ),
);

TextField.displayName = "TextField";
