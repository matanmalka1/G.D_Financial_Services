import { Search } from "lucide-react";

export const CountrySearchList = ({
  isRtl,
  query,
  onQueryChange,
  countries,
  onSelect,
}) => {
  return (
    <div
      className={`absolute z-20 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden ${isRtl ? "right-0" : "left-0"}`}
    >
      <div className="sticky top-0 flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          autoFocus
          className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
          placeholder="Search country or dial code"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div className="max-h-80 overflow-y-auto">
        {countries.map((country) => (
          <button
            key={country.code + country.dialCode}
            type="button"
            onClick={() => onSelect(country)}
            className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 transition"
          >
            <span className="text-lg">{country.flag}</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900">{country.name}</div>
              <div className="text-xs text-slate-500">{country.dialCode}</div>
            </div>
          </button>
        ))}
        {!countries.length && (
          <div className="px-3 py-3 text-xs text-slate-500">No results</div>
        )}
      </div>
    </div>
  );
};
