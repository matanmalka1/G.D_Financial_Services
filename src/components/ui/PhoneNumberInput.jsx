import { Fragment, forwardRef, useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Phone, ChevronDown, Search } from "lucide-react";
import { Listbox, Transition, Portal } from "@headlessui/react";
import { AsYouType, getExampleNumber } from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.min.json";
import { PhoneLocalInput } from "./phone/PhoneLocalInput";
import { COMMON_COUNTRIES, DEFAULT_COUNTRY_CODE } from "../../data/countries";
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
    const [countries] = useState(COMMON_COUNTRIES);
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
        if (!open) return;
        const inContainer =
          containerRef.current && containerRef.current.contains(event.target);
        const inOptions =
          optionsRef.current && optionsRef.current.contains(event.target);
        if (!inContainer && !inOptions) setOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    useEffect(() => {
      if (!open) return;
      const onKey = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open]);

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

    const [buttonRect, setButtonRect] = useState(null);
    const buttonRef = useRef(null);
    const optionsRef = useRef(null);

    useEffect(() => {
      if (!open || !buttonRef.current) return;
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }, [open, selected]);

    return (
      <div className={`space-y-2 ${className}`} ref={containerRef}>
        {label ? (
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
        ) : null}

        <div
          className={`relative flex ${isRtl ? "flex-row-reverse" : "flex-row"} rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition focus-within:ring-2 focus-within:ring-slate-900/80 focus-within:border-slate-900/40`}
        >
          <Listbox
            value={selected}
            onChange={(country) => handleCountryChange(country)}
            as="div"
          >
            <Listbox.Button
              ref={buttonRef}
              className={`flex items-center gap-2 h-12 px-3 min-w-[72px] ${isRtl ? "border-l border-slate-200 rounded-r-xl" : "border-r border-slate-200 rounded-l-xl"} bg-white hover:bg-slate-50 transition`}
              onClick={() => setOpen((p) => !p)}
            >
              <span className="text-xl">{selected.flag}</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Portal keeps options out of the modal stacking/overflow context */}
              <Portal>
                {buttonRect ? (
                  <Listbox.Options
                    ref={optionsRef}
                    static
                    className="absolute z-[80] mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                      position: "fixed",
                      top: buttonRect.bottom + 8,
                      left: isRtl
                        ? buttonRect.right - 320
                        : buttonRect.left,
                      width: 320,
                    }}
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
                      {filteredCountries.map((country) => (
                        <Listbox.Option
                          key={country.code + country.dialCode}
                          value={country}
                          className="cursor-pointer"
                        >
                          {({ active }) => (
                            <div
                              className={`w-full text-left px-3 py-2 flex items-center gap-2 ${active ? "bg-slate-50" : ""}`}
                            >
                              <span className="text-lg">{country.flag}</span>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-900">
                                  {country.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {country.dialCode}
                                </div>
                              </div>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                      {!filteredCountries.length && (
                        <div className="px-3 py-3 text-xs text-slate-500">
                          No results
                        </div>
                      )}
                    </div>
                  </Listbox.Options>
                ) : null}
              </Portal>
            </Transition>
          </Listbox>

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
