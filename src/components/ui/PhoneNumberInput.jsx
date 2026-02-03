import { forwardRef, useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Phone } from "lucide-react";
import { AsYouType, getExampleNumber } from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.min.json";
import { CountrySelector } from "./phone/CountrySelector";
import { CountrySearchList } from "./phone/CountrySearchList";
import { PhoneLocalInput } from "./phone/PhoneLocalInput";
import {
  COMMON_COUNTRIES,
  DEFAULT_COUNTRY_CODE,
  loadAllCountries,
} from "../../data/countries";
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
    const [countries, setCountries] = useState(COMMON_COUNTRIES);
    const [allLoaded, setAllLoaded] = useState(false);
    const containerRef = useRef(null);

    const defaultCountry = useMemo(
      () =>
        countries.find((c) => c.code === DEFAULT_COUNTRY_CODE) ||
        countries[0] ||
        COMMON_COUNTRIES[0],
      [countries],
    );

    const findCountryByValue = useCallback(
      (val) => {
        const normalized = (val || "").replace(/\s+/g, "");
        if (!normalized) return defaultCountry;
        const match = countries.find((c) => normalized.startsWith(c.dialCode));
        return match || defaultCountry;
      },
      [countries, defaultCountry],
    );

    const normalizedValue = useMemo(
      () => (value || "").replace(/\s+/g, ""),
      [value],
    );

    const selected = useMemo(
      () => findCountryByValue(normalizedValue),
      [normalizedValue, findCountryByValue],
    );

    const localNumber = normalizedValue.replace(selected.dialCode, "");

    const filteredCountries = useMemo(() => {
      if (!query.trim()) return countries;
      const q = query.toLowerCase();
      return countries.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.dialCode.includes(q),
      );
    }, [query, countries]);

    const loadAll = useCallback(async () => {
      if (allLoaded) return;
      const all = await loadAllCountries();
      setCountries(all);
      setAllLoaded(true);
    }, [allLoaded]);

    const handleCountryChange = useCallback(
      (country) => {
        const digits = localNumber.replace(/\D/g, "");
        const formatter = new AsYouType(country.code, metadata);
        formatter.input(digits);
        const updated = formatter.getNumberValue() || `${country.dialCode}${digits}`;
        onChange?.(updated);
        setOpen(false);
      },
      [localNumber, onChange],
    );

    const handleLocalChange = useCallback(
      (nextLocalDigits) => {
        const formatter = new AsYouType(selected.code, metadata);
        formatter.input(nextLocalDigits);
        const international = formatter.getNumberValue() || `${selected.dialCode}${nextLocalDigits}`;
        onChange?.(international);
      },
      [onChange, selected],
    );

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
          <CountrySelector
            selected={selected}
            isRtl={isRtl}
            onToggle={() => {
              setOpen((p) => !p);
              if (!allLoaded) loadAll();
            }}
          />

          {open && (
            <CountrySearchList
              isRtl={isRtl}
              query={query}
              onQueryChange={setQuery}
              countries={filteredCountries}
              onSelect={handleCountryChange}
            />
          )}

          <div className="flex-1 relative">
            <Phone
              className={`w-4 h-4 text-slate-400 absolute ${isRtl ? "right-3" : "left-3"} top-3.5`}
            />
            <PhoneLocalInput
              ref={ref}
              value={displayLocal}
              onChange={handleLocalChange}
              placeholder={computedPlaceholder}
              isRtl={isRtl}
            />
          </div>
        </div>

        {error ? <p className="text-red-500 text-xs">{error}</p> : null}
      </div>
    );
  },
);

PhoneNumberInput.displayName = "PhoneNumberInput";
