import { NavLink } from "react-router-dom";
import { routePaths } from "../../../routes/paths";

export const NavbarDesktopActions = ({ t }) => (
  <div className="hidden md:flex items-center gap-6">
    <NavLink
      to={routePaths.contact}
      className={({ isActive }) =>
        `px-4 py-2 text-sm font-medium rounded-full transition-all ${
          isActive
            ? "bg-slate-800 text-white"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`
      }
    >
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
