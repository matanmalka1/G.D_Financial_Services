import { Link } from "react-router-dom";

export const SectorBenefitsCard = ({ title, benefits, ctaLabel, ctaTo }) => (
  <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl flex flex-col gap-6">
    <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
      <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white text-xs">
        02
      </span>
      {title}
    </h4>
    <ul className="space-y-4">
      {benefits?.map((benefit, idx) => (
        <li key={idx} className="flex items-start gap-4">
          <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
          <p className="text-slate-300 font-medium leading-snug">{benefit}</p>
        </li>
      ))}
    </ul>
    {ctaLabel && ctaTo && (
      <Link
        to={ctaTo}
        className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all text-center"
      >
        {ctaLabel}
      </Link>
    )}
  </div>
);
