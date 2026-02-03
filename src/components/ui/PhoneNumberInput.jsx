import { useMemo, useState, useEffect, useRef, forwardRef } from "react";
import { Search, Phone, ChevronDown } from "lucide-react";
import { AsYouType, getExampleNumber } from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.min.json";
import { COUNTRIES } from "../../data/countries";

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === "IL") || COUNTRIES[0];

const findCountryByValue = (value) => {
  const normalized = (value || "").replace(/\s+/g, "");
  if (!normalized) return DEFAULT_COUNTRY;
  const match = COUNTRIES.find((c) => normalized.startsWith(c.dialCode));
  return match || DEFAULT_COUNTRY;
};

export const PhoneNumberInput = forwardRef(
  (
    {
      value = "",
      onChange,
      error,
      label,
      placeholder,
      className = "",
      isRtl = false,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef(null);

    const normalizedValue = useMemo(() => (value || "").replace(/\s+/g, ""), [value]);
    const selected = useMemo(() => findCountryByValue(normalizedValue), [normalizedValue]);
    const localNumber = normalizedValue.replace(selected.dialCode, "");

    const filtered = useMemo(() => {
      if (!query.trim()) return COUNTRIES;
      const q = query.toLowerCase();
      return COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.dialCode.includes(q),
      );
    }, [query]);

    const handleCountryChange = (country) => {
      const digits = localNumber.replace(/\D/g, "");
      const formatter = new AsYouType(country.code, metadata);
      formatter.input(digits);
      const updated = formatter.getNumberValue() || `${country.dialCode}${digits}`;
      onChange?.(updated);
      setOpen(false);
    };

    const handleLocalChange = (e) => {
      const digits = e.target.value.replace(/\D/g, "");
      const formatter = new AsYouType(selected.code, metadata);
      formatter.input(digits);
      const international = formatter.getNumberValue() || `${selected.dialCode}${digits}`;
      onChange?.(international);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!containerRef.current) return;
        if (!containerRef.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const computedPlaceholder = useMemo(() => {
      if (placeholder) return placeholder;
      const example = getExampleNumber(selected.code, metadata);
      if (example) return example.formatInternational();
      return `${selected.name} (${selected.dialCode})`;
    }, [placeholder, selected]);

    const displayLocal = useMemo(() => {
      if (!localNumber) return "";
      const formatter = new AsYouType(selected.code, metadata);
      formatter.input(localNumber);
      return formatter.getNationalNumber() || localNumber;
    }, [localNumber, selected]);

    return (
      <div className={`space-y-2 ${className}`} ref={containerRef}>
        {label ? (
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
        ) : null}

        <div
          className={`relative flex ${isRtl ? "flex-row-reverse" : "flex-row"} rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition focus-within:ring-2 focus-within:ring-slate-900/80 focus-within:border-slate-900/40`}
        >
          <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            className={`flex items-center gap-2 px-3 py-3 min-w-[72px] ${isRtl ? "border-l border-slate-200 rounded-r-xl" : "border-r border-slate-200 rounded-l-xl"} bg-white hover:bg-slate-50 transition`}
            aria-label="Select country code"
          >
            <span className="text-xl">{selected.flag}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {open && (
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
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="max-h-80 overflow-y-auto">
                {filtered.map((country) => (
                  <button
                    key={country.code + country.dialCode}
                    type="button"
                    onClick={() => handleCountryChange(country)}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 transition"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">
                        {country.name}
                      </div>
                      <div className="text-xs text-slate-500">{country.dialCode}</div>
                    </div>
                  </button>
                ))}
                {!filtered.length && (
                  <div className="px-3 py-3 text-xs text-slate-500">No results</div>
                )}
              </div>
            </div>
          )}

          <div className="flex-1 relative">
            <Phone
              className={`w-4 h-4 text-slate-400 absolute ${isRtl ? "right-3" : "left-3"} top-3.5`}
            />
            <input
              ref={ref}
              value={displayLocal}
              onChange={handleLocalChange}
              className={`w-full ${isRtl ? "pr-9 pl-3" : "pl-9 pr-3"} py-3 border-0 rounded-2xl bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400`}
              placeholder={computedPlaceholder}
              inputMode="tel"
            />
          </div>
        </div>

        {error ? <p className="text-red-500 text-xs">{error}</p> : null}
      </div>
    );
  },
);

PhoneNumberInput.displayName = "PhoneNumberInput";
