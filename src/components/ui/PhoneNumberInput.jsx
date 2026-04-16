import { forwardRef, useMemo, useCallback } from "react";
import { Phone } from "lucide-react";
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
      inputClassName = "",
      localInputClassName = "",
      prefixClassName = "",
      inputId,
      isRtl = false,
    },
    ref,
  ) => {
    const defaultCountry = useMemo(
      () =>
        COMMON_COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY_CODE) ||
        COMMON_COUNTRIES[0],
      [],
    );

    const normalizedValue = useMemo(
      () => (value || "").replace(/\s+/g, ""),
      [value],
    );

    const localNumber = normalizedValue.replace(defaultCountry.dialCode, "");

    const handleLocalChange = useCallback(
      (nextLocalDigits) => {
        const formatter = new AsYouType(defaultCountry.code, metadata);
        formatter.input(nextLocalDigits);
        const international =
          formatter.getNumberValue() ||
          `${defaultCountry.dialCode}${nextLocalDigits}`;
        onChange?.(international);
      },
      [defaultCountry, onChange],
    );

    const computedPlaceholder = useMemo(() => {
      if (placeholder) return placeholder;
      const example = getExampleNumber(defaultCountry.code, metadata);
      if (example) return example.formatInternational();
      return `${defaultCountry.name} (${defaultCountry.dialCode})`;
    }, [defaultCountry, placeholder]);

    const displayLocal = useMemo(() => {
      if (!localNumber) return "";
      const formatter = new AsYouType(defaultCountry.code, metadata);
      formatter.input(localNumber);
      return formatter.getNationalNumber() || localNumber;
    }, [defaultCountry, localNumber]);

    return (
      <div className={`space-y-2 ${className}`}>
        {label ? (
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
        ) : null}

        <div
          className={`relative flex ${isRtl ? "flex-row-reverse" : "flex-row"} rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition focus-within:ring-2 focus-within:ring-slate-900/80 focus-within:border-slate-900/40 ${inputClassName}`}
        >
          <div
            className={`flex items-center h-12 px-4 text-sm font-medium text-slate-500 ${isRtl ? "border-l border-slate-200 rounded-r-xl" : "border-r border-slate-200 rounded-l-xl"} bg-white ${prefixClassName}`}
          >
            <span>{defaultCountry.dialCode}</span>
          </div>

          <div className="flex-1 relative">
            <Phone
              className={`w-4 h-4 text-slate-400 absolute ${isRtl ? "right-3" : "left-3"} top-3.5`}
            />
            <PhoneLocalInput
              ref={ref}
              id={inputId}
              value={displayLocal}
              onChange={handleLocalChange}
              placeholder={computedPlaceholder}
              isRtl={isRtl}
              className={localInputClassName}
            />
          </div>
        </div>

        {error ? <p className="text-red-500 text-xs">{error}</p> : null}
      </div>
    );
  },
);

PhoneNumberInput.displayName = "PhoneNumberInput";
