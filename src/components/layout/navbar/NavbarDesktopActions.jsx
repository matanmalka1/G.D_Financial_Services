import { NavLink } from "react-router-dom";
import { Phone } from "lucide-react";
import { routePaths } from "../../../routes/paths";

export const NavbarDesktopActions = ({ t }) => (
  <div className="hidden md:flex items-center gap-6">
    <NavLink
      to={routePaths.contact}
      className={({ isActive }) =>
        `inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 ${
          isActive
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-300 bg-white/70 text-slate-900 hover:bg-slate-100"
        }`
      }
    >
      <Phone className="h-4 w-4" />
      {t.nav.contact}
    </NavLink>
    <a
      href="tel:0542121928"
      className="text-sm lg:text-base font-semibold text-slate-700 hover:text-slate-900 transition-colors"
    >
      054-2121928
    </a>
  </div>
);
