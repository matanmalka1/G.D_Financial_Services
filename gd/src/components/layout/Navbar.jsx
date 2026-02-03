import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { Select } from "../ui/Select";
import { routePaths } from "../../routes/paths";
import { Logo } from "../common/Logo";

export const Navbar = () => {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const sectorOptions = [
    {
      value: "/sectors/business-presentations",
      label: t.nav.businessPresentations,
    },
    { value: "/sectors/sell-side-advisory", label: t.nav.sellSideAdvisory },
    { value: "/sectors/business-consulting", label: t.nav.businessConsulting },
    {
      value: "/sectors/ongoing-financial-advisory",
      label: t.nav.ongoingAdvisory,
    },
    { value: "/sectors/business-plan", label: t.nav.businessPlans },
  ];

  const handleSectorChange = (val) => {
    navigate(val);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-6">
          {/* Logo */}
          <Link
            to={routePaths.home}
            className="brand flex items-center gap-3 text-2xl font-bold text-slate-900 tracking-tight"
          >
            <Logo size={40} />
            <span>
              G.D <span className="text-slate-500 font-light">Finance</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center flex-1 justify-center gap-10 rtl:space-x-reverse">
            <Link
              to={routePaths.companyProfile}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              {t.nav.profile}
            </Link>
            <div className="flex items-center gap-2">
              <div className="min-w-[40px]">
                <Select
                  placeholder={t.nav.sectors}
                  options={sectorOptions}
                  onValueChange={handleSectorChange}
                  dir={isRtl ? "rtl" : "ltr"}
                  className="w-10 !p-1 border-none bg-transparent"
                />
              </div>
            </div>
            <Link
              to={routePaths.news}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              {t.nav.news}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to={routePaths.contact}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all"
            >
              {t.nav.contact}
            </Link>
            <div className="flex items-center border-l rtl:border-l-0 rtl:border-r border-gray-200 pl-4 rtl:pl-0 rtl:pr-4">
              <button
                onClick={() => setLanguage("en")}
                className={`text-xs font-bold px-2 py-1 ${language === "en" ? "text-slate-900" : "text-slate-400"}`}
              >
                EN
              </button>
              <span className="text-gray-300 text-xs">|</span>
              <button
                onClick={() => setLanguage("he")}
                className={`text-xs font-bold px-2 py-1 ${language === "he" ? "text-slate-900" : "text-slate-400"}`}
              >
                HE
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage("en")}
                className={`text-xs ${language === "en" ? "font-bold" : ""}`}
              >
                EN
              </button>
              <span>|</span>
              <button
                onClick={() => setLanguage("he")}
                className={`text-xs ${language === "he" ? "font-bold" : ""}`}
              >
                HE
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col space-y-4">
          <Link
            onClick={() => setMobileMenuOpen(false)}
            to={routePaths.companyProfile}
            className="text-slate-700 font-medium"
          >
            {t.nav.profile}
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            to={routePaths.sectors}
            className="text-slate-700 font-medium"
          >
            {t.nav.sectors}
          </Link>
          <div className="py-2 border-y border-gray-50">
            {sectorOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSectorChange(opt.value)}
                className="block w-full text-left rtl:text-right py-2 text-slate-700 pl-4 rtl:pr-4"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            to={routePaths.news}
            className="text-slate-700 font-medium"
          >
            {t.nav.news}
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            to={routePaths.contact}
            className="bg-slate-900 text-white text-center py-2 rounded-md"
          >
            {t.nav.contact}
          </Link>
        </div>
      )}
    </nav>
  );
};
