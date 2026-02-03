import { ChevronDown } from "lucide-react";

export const CountrySelector = ({ selected, isRtl, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-3 min-w-[72px] ${isRtl ? "border-l border-slate-200 rounded-r-xl" : "border-r border-slate-200 rounded-l-xl"} bg-white hover:bg-slate-50 transition`}
      aria-label="Select country code"
    >
      <span className="text-xl">{selected.flag}</span>
      <ChevronDown className="w-4 h-4 text-slate-500" />
    </button>
  );
};
