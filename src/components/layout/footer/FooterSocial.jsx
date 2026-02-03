import { InstagramLogo, FacebookLogo, LinkedInLogo } from "../../common/SocialLogos";

export const FooterSocial = () => (
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
);
