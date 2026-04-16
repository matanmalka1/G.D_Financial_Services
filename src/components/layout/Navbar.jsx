import { useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSiteContent } from "../../hooks/useSiteContent";
import { routePaths, routes } from "../../routes/paths";
import { NavbarBrand } from "./navbar/NavbarBrand";
import { NavbarDesktopNav } from "./navbar/NavbarDesktopNav";
import { NavbarDesktopActions } from "./navbar/NavbarDesktopActions";
import { NavbarMobileControls } from "./navbar/NavbarMobileControls";
import { NavbarMobileMenu } from "./navbar/NavbarMobileMenu";

export const Navbar = () => {
  const { t, isRtl } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const SECTOR_KEYS = useMemo(
    () => [
      { id: "business-plan", labelKey: "businessPlans" },
      { id: "business-presentations", labelKey: "businessPresentations" },
      { id: "sell-side-advisory", labelKey: "sellSideAdvisory" },
      { id: "business-consulting", labelKey: "businessConsulting" },
      { id: "ongoing-financial-advisory", labelKey: "ongoingAdvisory" },
    ],
    [],
  );

  const sectorOptions = useMemo(
    () =>
      SECTOR_KEYS.map(({ id, labelKey }) => ({
        value: routes.sectorDetail(id),
        label: t.nav[labelKey],
      })),
    [t.nav, SECTOR_KEYS],
  );

  const handleSectorChange = (val) => {
    navigate(val);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="tel:0542121928"
          className="hidden md:block absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 text-sm lg:text-base font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          054-2121928
        </a>
        <div className="flex justify-between items-center h-20 gap-6 md:pl-36">
          <NavbarBrand to={routePaths.home} />

          <NavbarDesktopNav
            t={t}
            sectorOptions={sectorOptions}
            onSectorChange={handleSectorChange}
            isRtl={isRtl}
            navigate={navigate}
          />

          <NavbarDesktopActions t={t} />

          <NavbarMobileControls
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      {mobileMenuOpen && (
        <NavbarMobileMenu
          t={t}
          sectorOptions={sectorOptions}
          onSectorChange={handleSectorChange}
          onClose={() => setMobileMenuOpen(false)}
          navigate={navigate}
        />
      )}
    </nav>
  );
};
