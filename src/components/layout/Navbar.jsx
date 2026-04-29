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
  const { t } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const SECTOR_KEYS = useMemo(
    () => [
      { id: "business-plan", labelKey: "businessPlans" },
      { id: "business-presentations", labelKey: "businessPresentations" },
      { id: "sell-side-advisory", labelKey: "sellSideAdvisory" },
      { id: "business-consulting", labelKey: "businessConsulting" },
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
      <div className="relative w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex h-20 items-center gap-6">
          <NavbarBrand to={routePaths.home} />

          <NavbarDesktopNav
            t={t}
            sectorOptions={sectorOptions}
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
        />
      )}
    </nav>
  );
};
