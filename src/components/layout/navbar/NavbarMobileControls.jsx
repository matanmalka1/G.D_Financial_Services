import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

export const NavbarMobileControls = ({
  language,
  onLanguageChange,
  isOpen,
  onToggle,
}) => (
  <div className="md:hidden flex items-center gap-4">
    <LanguageToggle
      language={language}
      onChange={onLanguageChange}
      variant="mobile"
    />
    <button
      onClick={onToggle}
      className="p-2 text-slate-700"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
    >
      {isOpen ? (
        <X className="w-6 h-6" strokeWidth={2} />
      ) : (
        <Menu className="w-6 h-6" strokeWidth={2} />
      )}
    </button>
  </div>
);
