import { Link } from "react-router-dom";
import { routePaths } from "../../../routes/paths";

export const FooterLinks = ({ t }) => (
  <div>
    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
      Quick Links
    </h3>
    <ul className="text-sm text-slate-600 space-y-2">
      <li>
        <Link className="hover:text-slate-900" to={routePaths.home}>
          {t.nav.home}
        </Link>
      </li>
      <li>
        <Link className="hover:text-slate-900" to={routePaths.companyProfile}>
          {t.nav.profile}
        </Link>
      </li>
      <li>
        <Link className="hover:text-slate-900" to={routePaths.news}>
          {t.nav.news}
        </Link>
      </li>
      <li>
        <Link className="hover:text-slate-900" to={routePaths.contact}>
          {t.nav.contact}
        </Link>
      </li>
    </ul>
  </div>
);
