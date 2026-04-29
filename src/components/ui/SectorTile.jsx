import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Handshake,
  Presentation,
} from "lucide-react";
import { Link } from "react-router-dom";

const sectorIconMap = {
  "business-plan": FileText,
  "business-presentations": Presentation,
  "business-consulting": BarChart3,
  "sell-side-advisory": Handshake,
};

export const SectorTile = ({ sector, title, subtitle, description, isRtl }) => {
  const [loaded, setLoaded] = useState(false);
  const Icon = sectorIconMap[sector.id] || BriefcaseBusiness;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <Link
      to={sector.path}
      className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/80 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]"
    >
      <div className="relative min-h-[210px] overflow-hidden bg-slate-100 md:min-h-[280px]">
        <img
          src={sector.image}
          alt={title}
          className={`h-full min-h-[210px] w-full object-cover transition duration-700 ease-out md:min-h-[280px] ${
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          } group-hover:scale-105`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/5 to-transparent" />
      </div>

      <div className={`flex min-h-[280px] flex-col p-6 sm:p-8 ${isRtl ? "text-right" : "text-left"}`}>
        <div className={`mb-6 flex ${isRtl ? "justify-end" : "justify-start"}`}>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
            <Icon className="h-6 w-6" strokeWidth={1.8} />
          </span>
        </div>

        <h3 className="text-2xl font-bold leading-tight text-slate-950">{title}</h3>
        {description ? (
          <p
            className="mt-4 text-base leading-8 text-slate-600"
            dir={isRtl ? "rtl" : "ltr"}
            style={{ unicodeBidi: "plaintext" }}
          >
            {description}
          </p>
        ) : null}

        <div
          className={`mt-auto flex items-center gap-3 pt-8 text-sm font-bold text-slate-900 transition-all group-hover:gap-4 ${
            isRtl ? "justify-start" : "justify-end"
          }`}
        >
          <span>{subtitle}</span>
          <ArrowIcon className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
};
