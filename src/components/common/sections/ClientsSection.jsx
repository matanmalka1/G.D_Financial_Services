import { useMemo } from "react";
import { useLanguage } from "../../../hooks/useLanguage";

const ICON_BY_KEY = {
  retail: "🛒",
  pharma: "💊",
  energy: "⚡️",
  realEstate: "🏢",
  highTech: "💻",
  industry: "🏭",
};

export const ClientsSection = () => {
  const { t } = useLanguage();

  const sectors = useMemo(() => t.home.clients.sectors || [], [t.home.clients.sectors]);

  return (
    <section className="py-24 bg-slate-50/70">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            {t.home.clients.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t.home.clients.body}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          {sectors.map((item) => (
            <div
              key={item.key}
              className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md shadow-slate-200/60 border border-slate-100 py-8 px-4 gap-3 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-4xl">{ICON_BY_KEY[item.key]}</span>
              <span className="text-sm font-semibold text-slate-800">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
