import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useContent } from "../hooks/useContent";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { routePaths } from "../routes/paths";
import { translations } from "../i18n/translations";

const SectorDetail = () => {
  const { id } = useParams();
  const { t, isRtl } = useLanguage();
  const { getSectorById, getRelatedArticles } = useContent();

  const sector = getSectorById(id);
  const detail = t.sectorDetail.sectorDetails[id || ""];

  const relatedArticles = useMemo(() => {
    if (!id) return [];
    return getRelatedArticles(id).slice(0, 3);
  }, [id, getRelatedArticles]);

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {t.sectorDetail.notFound}
          </h2>
          <Link
            to={routePaths.sectors}
            className="text-slate-600 hover:text-slate-900 underline"
          >
            {t.sectorDetail.backToSectors}
          </Link>
        </div>
      </div>
    );
  }

  const sectorTitleEn = translations.en.nav[sector.titleKey] || "";
  const sectorTitle = t.nav[sector.titleKey];
  const mainDescription = t.sectorDetail.mainDescription.replace(
    "{sector}",
    sectorTitle,
  );
  const aboutDescription = t.sectorDetail.aboutDescription.replace(
    "{sector}",
    sectorTitle.toLowerCase(),
  );

  return (
    <main className="bg-slate-50/30 min-h-screen pb-20">
      <ParallaxHeader image={sector.image} title={sectorTitleEn} />

      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Sector Content Card */}
        <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-slate-900" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">
            {sectorTitle}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-4xl">
            {mainDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                label: t.sectorDetail.expertAnalysis,
                icon: "📊",
              },
              {
                label: t.sectorDetail.customizedStrategy,
                icon: "🎯",
              },
              {
                label: t.sectorDetail.executiveSupport,
                icon: "🤝",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-bold text-slate-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated "About [Sector]" Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-900 inline-block pb-2">
              {t.sectors.aboutSector.replace("{name}", sectorTitle)}
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              {aboutDescription}
            </p>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
              <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs">
                  01
                </span>
                {t.sectors.ourServices}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detail?.services.map((service, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-600 group"
                  >
                    <svg
                      className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl h-full flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white text-xs">
                  02
                </span>
                {t.sectors.clientBenefits}
              </h4>
              <ul className="space-y-6">
                {detail?.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-slate-300 font-medium leading-snug">
                      {benefit}
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                to={routePaths.contact}
                className="mt-12 inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all text-center"
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 whitespace-nowrap">
                  {t.news.relatedTitle}
                </h3>
                <div className="h-px bg-slate-200 w-full hidden md:block" />
              </div>
              <Link
                to={routePaths.news}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-slate-600 transition-colors group"
              >
                <span>{t.sectorDetail.viewAllNews}</span>
                <svg
                  className={`w-4 h-4 transform group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <Link
                  to={routePaths.news}
                  key={article.id}
                  className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-full uppercase tracking-widest">
                      {article.date}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors line-clamp-2 leading-tight">
                    {article.title.en}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {article.excerpt.en}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-xs font-bold text-slate-900">
                    <span className="border-b-2 border-slate-900 pb-0.5">
                      {t.news.readArticle}
                    </span>
                    <svg
                      className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default SectorDetail;
