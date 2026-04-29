import { NavLink } from "react-router-dom";
import { Phone } from "lucide-react";
import { routePaths } from "../../../routes/paths";

export const NavbarMobileMenu = ({ t, sectorOptions, onSectorChange, onClose }) => (
  <div
    id="mobile-nav"
    className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col space-y-4"
  >
    <div className="py-2 border-y border-gray-50">
      {sectorOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSectorChange(opt.value)}
          className="block w-full text-left rtl:text-right py-2 text-slate-700 pl-4 rtl:pr-4"
        >
          {opt.label}
        </button>
      ))}
    </div>
    <NavLink
      to={routePaths.news}
      onClick={onClose}
      className={({ isActive }) =>
        `block w-full border-y border-gray-50 py-4 pl-4 text-left rtl:pr-4 rtl:text-right font-medium ${isActive ? "text-slate-900" : "text-slate-700"}`
      }
    >
      {t.nav.news}
    </NavLink>
    <NavLink
      to={routePaths.contact}
      onClick={onClose}
      className={({ isActive }) =>
        `inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-center font-bold transition-all ${
          isActive
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
        }`
      }
    >
      <Phone className="h-4 w-4" />
      {t.nav.contact}
    </NavLink>
    <a href="tel:0542121928" className="text-center py-2 font-semibold text-slate-700">
      054-2121928
    </a>
  </div>
);
