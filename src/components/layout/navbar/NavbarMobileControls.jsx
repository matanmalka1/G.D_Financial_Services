import { Menu, X } from "lucide-react";

export const NavbarMobileControls = ({ isOpen, onToggle }) => (
  <div className="md:hidden flex items-center gap-4">
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
