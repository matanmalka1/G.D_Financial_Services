import { Search, X } from "lucide-react";

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder,
  isRtl = false,
  ariaLabel,
  className = "",
}) => (
  <div className={`relative group ${className}`}>
    <div
      className={`absolute inset-y-0 flex items-center pointer-events-none transition-colors duration-200 ${
        isRtl ? "right-0 pr-5" : "left-0 pl-5"
      } ${value ? "text-slate-900" : "text-slate-400"}`}
    >
      <Search className="h-5 w-5" strokeWidth={2} />
    </div>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`w-full py-5 rounded-[1.5rem] border border-slate-200 bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-300 focus:outline-none shadow-sm transition-all duration-300 text-lg text-slate-800 ${
        isRtl ? "pr-12 pl-12" : "pl-12 pr-12"
      }`}
      aria-label={ariaLabel || placeholder}
    />
    {value && (
      <button
        onClick={onClear}
        type="button"
        className={`absolute inset-y-0 flex items-center px-4 text-slate-400 hover:text-slate-600 transition-colors ${
          isRtl ? "left-0" : "right-0"
        }`}
        aria-label={ariaLabel ? `${ariaLabel} clear` : "Clear search"}
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>
    )}
  </div>
);
