import { NavLink } from "react-router-dom";
import { routePaths } from "../../../routes/paths";
import { LanguageToggle } from "./LanguageToggle";

export const NavbarDesktopActions = ({ t, language, onLanguageChange }) => (
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
    <LanguageToggle
      language={language}
      onChange={onLanguageChange}
      variant="desktop"
    />
  </div>
);
