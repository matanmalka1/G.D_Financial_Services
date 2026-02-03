export const LanguageToggle = ({ language, onChange, variant = "desktop" }) => {
  const isDesktop = variant === "desktop";

  if (isDesktop) {
    return (
      <div className="flex items-center border-l rtl:border-l-0 rtl:border-r border-gray-200 pl-4 rtl:pl-0 rtl:pr-4">
        <button
          onClick={() => onChange("en")}
          className={`text-xs font-bold px-2 py-1 ${language === "en" ? "text-slate-900" : "text-slate-400"}`}
        >
          EN
        </button>
        <span className="text-gray-300 text-xs">|</span>
        <button
          onClick={() => onChange("he")}
          className={`text-xs font-bold px-2 py-1 ${language === "he" ? "text-slate-900" : "text-slate-400"}`}
        >
          HE
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange("en")}
        className={`text-xs ${language === "en" ? "font-bold" : ""}`}
      >
        EN
      </button>
      <span>|</span>
      <button
        onClick={() => onChange("he")}
        className={`text-xs ${language === "he" ? "font-bold" : ""}`}
      >
        HE
      </button>
    </div>
  );
};
