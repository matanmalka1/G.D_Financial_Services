import { NavLink } from "react-router-dom";
import { Select } from "../../ui/Select";
import { routePaths } from "../../../routes/paths";






export const NavbarDesktopNav = ({
  t,
  sectorOptions,
  onSectorChange,
  isRtl,
  navigate,
}) => (
  <div className="hidden md:flex items-center flex-1 justify-center gap-10 rtl:space-x-reverse">
    <NavLink
      to={routePaths.companyProfile}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors ${
          isActive ? "text-slate-900" : "text-slate-700 hover:text-slate-900"
        }`
      }
    >
      {t.nav.profile}
    </NavLink>
    <div className="flex items-center gap-2">
      <div className="min-w-[40px]">
        <Select
          placeholder={t.nav.sectors}
          options={sectorOptions}
          onValueChange={onSectorChange}
          dir={isRtl ? "rtl" : "ltr"}
          className="w-10 !p-1 border-none bg-transparent"
        />
      </div>
    </div>
    <div className="min-w-[160px]">
      <Select
        placeholder={t.nav.news}
        options={[
          { value: routePaths.financialNews, label: t.nav.financialNews },
          { value: routePaths.news, label: t.nav.articles },
        ]}
        onValueChange={(path) => navigate(path)}
        dir={isRtl ? "rtl" : "ltr"}
        className="border-none bg-transparent"
      />
    </div>
  </div>
);
