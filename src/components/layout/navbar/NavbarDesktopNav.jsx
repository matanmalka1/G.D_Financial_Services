import { NavLink } from "react-router-dom";
import { Select } from "../../ui/Select";
import { routePaths } from "../../../routes/paths";

export const NavbarDesktopNav = ({
  t,
  sectorOptions,
  onSectorChange,
  isRtl,
}) => (
  <div className="hidden md:flex items-center gap-8 lg:gap-10">
    <NavLink
      to={routePaths.companyProfile}
      className={({ isActive }) =>
        `whitespace-nowrap text-sm font-medium transition-colors ${
          isActive ? "text-slate-900" : "text-slate-700 hover:text-slate-900"
        }`
      }
    >
      {t.nav.profile}
    </NavLink>
    <Select
      placeholder={t.nav.sectors}
      options={sectorOptions}
      onValueChange={onSectorChange}
      dir={isRtl ? "rtl" : "ltr"}
      variant="ghost"
      className="w-auto min-w-32"
    />
    <NavLink
      to={routePaths.news}
      className={({ isActive }) =>
        `whitespace-nowrap text-sm font-medium transition-colors ${
          isActive ? "text-slate-900" : "text-slate-700 hover:text-slate-900"
        }`
      }
    >
      {t.nav.news}
    </NavLink>
  </div>
);
