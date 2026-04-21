import { forwardRef } from "react";

export const PhoneLocalInput = forwardRef(
  ({ id, value, onChange, placeholder, isRtl, className = "" }, ref) => (
    <input
      id={id}
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      className={`h-12 w-full border-0 bg-transparent px-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none ${isRtl ? "text-right" : "text-left"} ${className}`}
      placeholder={placeholder}
      inputMode="tel"
      dir="ltr"
    />
  ),
);

PhoneLocalInput.displayName = "PhoneLocalInput";
