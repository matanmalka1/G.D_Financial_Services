import { useLanguage } from "../../hooks/useLanguage";
import { FooterBrand } from "./footer/FooterBrand";
import { FooterContact } from "./footer/FooterContact";
import { FooterLinks } from "./footer/FooterLinks";
import { FooterSocial } from "./footer/FooterSocial";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-50 border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-12">
        <FooterBrand />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <FooterContact t={t} />
          <FooterLinks t={t} />
          <FooterSocial />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-200 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} G.D Financial Services. All rights
        reserved.
      </div>
    </footer>
  );
};
