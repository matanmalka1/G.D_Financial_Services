import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { routePaths } from "../../../routes/paths";

const navLinkClass = ({ isActive }) =>
  `whitespace-nowrap text-base font-medium transition-colors ${
    isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
  }`;

export const NavbarDesktopNav = ({ t, sectorOptions }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="hidden min-w-0 flex-1 items-center justify-end gap-6 px-6 md:flex" dir="rtl">
      <NavLink to={routePaths.home} className={navLinkClass}>
        {t.nav.home ?? "דף הבית"}
      </NavLink>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 whitespace-nowrap text-base font-medium transition-colors text-slate-600 hover:text-slate-900"
        >
          {t.nav.services}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5">
            {sectorOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { navigate(opt.value); setOpen(false); }}
                className="block w-full px-4 py-2.5 text-right text-base text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <NavLink to={routePaths.news} className={navLinkClass}>
        {t.nav.news}
      </NavLink>
    </div>
  );
};
