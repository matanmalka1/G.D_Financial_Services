import { NavLink } from "react-router-dom";
import { routePaths } from "../../../routes/paths";

export const NavbarMobileMenu = ({
  t,
  sectorOptions,
  onSectorChange,
  onClose,
  navigate,
}) => (
  <div
    id="mobile-nav"
    className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col space-y-4"
  >
    <NavLink
      to={routePaths.companyProfile}
      onClick={onClose}
      className={({ isActive }) =>
        `font-medium ${isActive ? "text-slate-900" : "text-slate-700"}`
      }
    >
      {t.nav.profile}
    </NavLink>
    <NavLink
      to={routePaths.sectors}
      onClick={onClose}
      className={({ isActive }) =>
        `font-medium ${isActive ? "text-slate-900" : "text-slate-700"}`
      }
    >
      {t.nav.sectors}
    </NavLink>
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
    <button
      onClick={() => {
        navigate(routePaths.news);
        onClose();
      }}
      className="block w-full border-y border-gray-50 py-4 pl-4 text-left text-slate-700 rtl:pr-4 rtl:text-right"
    >
      {t.nav.news}
    </button>
    <NavLink
      to={routePaths.contact}
      onClick={onClose}
      className={({ isActive }) =>
        `text-center py-2 rounded-md ${
          isActive ? "bg-slate-800 text-white" : "bg-slate-900 text-white"
        }`
      }
    >
      {t.nav.contact}
    </NavLink>
    <a
      href="tel:0542121928"
      className="text-center py-2 font-semibold text-slate-700"
    >
      054-2121928
    </a>
  </div>
);
