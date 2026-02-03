import { Logo } from "../../common/Logo";

export const FooterBrand = () => (
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
);
