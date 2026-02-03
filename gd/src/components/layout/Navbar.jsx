import { useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { routePaths } from "../../routes/paths";
import { NavbarBrand } from "./navbar/NavbarBrand";
import { NavbarDesktopNav } from "./navbar/NavbarDesktopNav";
import { NavbarDesktopActions } from "./navbar/NavbarDesktopActions";
import { NavbarMobileControls } from "./navbar/NavbarMobileControls";
import { NavbarMobileMenu } from "./navbar/NavbarMobileMenu";

export const Navbar = () => {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sectorOptions = useMemo(
    () => [
      { value: "/sectors/business-plan", label: t.nav.businessPlans },
      {
        value: "/sectors/business-presentations",
        label: t.nav.businessPresentations,
      },
      { value: "/sectors/sell-side-advisory", label: t.nav.sellSideAdvisory },
      {
        value: "/sectors/business-consulting",
        label: t.nav.businessConsulting,
      },
      {
        value: "/sectors/ongoing-financial-advisory",
        label: t.nav.ongoingAdvisory,
      },
    ],
    [
      t.nav.businessPlans,
      t.nav.businessPresentations,
      t.nav.sellSideAdvisory,
      t.nav.businessConsulting,
      t.nav.ongoingAdvisory,
    ],
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-6">
          <NavbarBrand to={routePaths.home} />

          <NavbarDesktopNav
            t={t}
            sectorOptions={sectorOptions}
            onSectorChange={handleSectorChange}
            isRtl={isRtl}
          />

          <NavbarDesktopActions
            t={t}
            language={language}
            onLanguageChange={setLanguage}
          />

          <NavbarMobileControls
            language={language}
            onLanguageChange={setLanguage}
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
