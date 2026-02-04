import { forwardRef } from "react";

export const PhoneLocalInput = forwardRef(
  ({ value, onChange, placeholder, isRtl }, ref) => (
    <input
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      className={`w-full h-12 ${isRtl ? "pr-9 pl-3" : "pl-9 pr-3"} border-0 rounded-xl bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400`}
      placeholder={placeholder}
      inputMode="tel"
    />
  ),
);

PhoneLocalInput.displayName = "PhoneLocalInput";
