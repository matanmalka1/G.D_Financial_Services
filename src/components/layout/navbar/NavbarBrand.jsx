import { Link } from "react-router-dom";
import { Logo } from "../../common/Logo";

export const NavbarBrand = ({ to }) => (
  <Link
    to={to}
    className="brand flex items-center gap-3 text-2xl font-bold text-slate-900 tracking-tight"
  >
    <Logo size={40} />
    <span>
      G.D <span className="text-slate-500 font-light">Finance</span>
    </span>
  </Link>
);
