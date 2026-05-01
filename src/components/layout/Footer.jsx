import { useSiteContent } from "../../hooks/useSiteContent";
import { Logo } from "../common/Logo";
import { Link } from "react-router-dom";
import { routePaths } from "../../routes/paths";
import { InstagramLogo, FacebookLogo, LinkedInLogo } from "../common/SocialLogos";

const FooterBrand = ({ t }) => (
  <div className="max-w-sm text-right">
    <div className="mb-4 flex items-center justify-start gap-3">
      <Logo size={48} />
      <h2 className="brand text-xl font-bold text-slate-900">{t.footer.brandTitle}</h2>
    </div>
    <p className="text-sm text-slate-500 leading-relaxed">
      {t.footer.brandDescription}
    </p>
  </div>
);

const FooterContact = ({ t }) => (
  <div className="text-right">
    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
      {t.footer.addressTitle}
    </h3>
    <p className="text-sm text-slate-600 mb-2">{t.footer.address}</p>
    <a
      href={`mailto:${t.footer.email}`}
      className="block text-sm text-slate-600 mb-2 hover:text-slate-900 transition-colors"
    >
      {t.footer.email}
    </a>
    <a
      href={`tel:${t.footer.phone?.replace(/[-\s]/g, "")}`}
      className="block text-sm text-slate-600 hover:text-slate-900 transition-colors"
    >
      {t.footer.phone}
    </a>
  </div>
);

const FooterLinks = ({ t }) => (
  <div className="text-right">
    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
      {t.footer.quickLinksTitle}
    </h3>
    <ul className="text-sm text-slate-600 space-y-2">
      <li>
        <Link className="hover:text-slate-900" to={routePaths.home}>
          {t.nav.home}
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

const FooterSocial = ({ t }) => (
  <div className="text-right">
    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
      {t.footer.socialTitle}
    </h3>
    <div className="flex items-center justify-start gap-4 text-slate-600">
      <a
        href="https://www.instagram.com/g.d_finance/"
        aria-label="Instagram"
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-slate-400 hover:text-slate-900 transition-colors shadow-sm"
      >
        <InstagramLogo />
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=61574465062159"
        aria-label="Facebook"
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-slate-400 hover:text-slate-900 transition-colors shadow-sm"
      >
        <FacebookLogo />
      </a>
      <a
        href="https://www.linkedin.com/company/strategic-market-advisors/?viewAsMember=true"
        aria-label="LinkedIn"
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-slate-400 hover:text-slate-900 transition-colors shadow-sm"
      >
        <LinkedInLogo />
      </a>
    </div>
  </div>
);

export const Footer = () => {
  const { t } = useSiteContent();
  return (
    <footer className="border-t border-gray-200 bg-slate-50 py-16" dir="rtl">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:grid-cols-2 lg:grid-cols-[minmax(280px,1.35fr)_minmax(180px,1fr)_minmax(160px,0.75fr)_minmax(180px,0.85fr)] lg:items-start">
        <FooterBrand t={t} />
        <FooterContact t={t} />
        <FooterLinks t={t} />
        <FooterSocial t={t} />
      </div>
      <div className="mx-auto mt-16 max-w-7xl border-t border-gray-200 px-4 pt-8 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} {t.footer.brandTitle}. {t.footer.copyright}
        <Link
          className="ms-3 underline underline-offset-4"
          to={routePaths.contentAdmin}
        >
          Admin
        </Link>
      </div>
    </footer>
  );
};
