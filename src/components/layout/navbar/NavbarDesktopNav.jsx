import { NavLink } from "react-router-dom";
import { routePaths } from "../../../routes/paths";

const navLinkClass = ({ isActive }) =>
  `whitespace-nowrap text-xs font-medium transition-colors lg:text-sm ${
    isActive ? "text-slate-900" : "text-slate-700 hover:text-slate-900"
  }`;

export const NavbarDesktopNav = ({ t, sectorOptions }) => (
  <div className="hidden min-w-0 flex-1 items-center justify-evenly gap-3 px-2 md:flex lg:px-6 xl:px-10">
    {sectorOptions.map((opt) => (
      <NavLink key={opt.value} to={opt.value} className={navLinkClass}>
        {opt.label}
      </NavLink>
    ))}
    <NavLink to={routePaths.news} className={navLinkClass}>
      {t.nav.news}
    </NavLink>
  </div>
);
