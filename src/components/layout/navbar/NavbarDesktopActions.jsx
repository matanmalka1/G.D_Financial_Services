import { NavLink } from "react-router-dom";
import { Phone } from "lucide-react";
import { routePaths } from "../../../routes/paths";

export const NavbarDesktopActions = ({ t }) => (
  <div className="hidden shrink-0 items-center gap-5 md:flex lg:gap-6">
    <NavLink
      to={routePaths.contact}
      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-base font-bold transition-all hover:-translate-y-0.5 bg-slate-900 text-white hover:bg-slate-800"
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
