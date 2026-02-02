import { useLanguage } from '../../hooks/useLanguage';
import { Logo } from '../common/Logo';
import { InstagramLogo, FacebookLogo, LinkedInLogo } from '../common/SocialLogos';

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-50 border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <Logo size={48} />
            <h2 className="brand text-xl font-bold text-slate-900">G.D Financial Services</h2>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Professional financial advisory for startups and entrepreneurs. 
            Integrity, Reliability, and Professionalism.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
              {t.footer.addressTitle}
            </h3>
            <p className="text-sm text-slate-600 mb-2">{t.footer.address}</p>
            <p className="text-sm text-slate-600 mb-2">{t.footer.email}</p>
            <p className="text-sm text-slate-600 ">{t.footer.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>{t.nav.home}</li>
              <li>{t.nav.profile}</li>
              <li>{t.nav.news}</li>
              <li>{t.nav.contact}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
              Social Networks
            </h3>
            <div className="flex items-center gap-4 text-slate-600">
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
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-200 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} G.D Financial Services. All rights reserved.
      </div>
    </footer>
  );
};
