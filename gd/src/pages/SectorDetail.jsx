import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useContent } from "../hooks/useContent";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { routePaths } from "../routes/paths";
import { translations } from "../i18n/translations";
import { SectorServices } from "../components/sector/SectorServices";
import { SectorBenefitsCard } from "../components/sector/SectorBenefitsCard";
import { RelatedArticlesSection } from "../components/sector/RelatedArticlesSection";

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
            <SectorServices title={t.sectors.ourServices} services={detail?.services} />
          </div>

          <div className="lg:col-span-1">
            <SectorBenefitsCard
              title={t.sectors.clientBenefits}
              benefits={detail?.benefits}
              ctaLabel={t.nav.contact}
              ctaTo={routePaths.contact}
            />
          </div>
        </div>

        {/* Related Articles Section */}
        <RelatedArticlesSection
          articles={relatedArticles}
          t={t}
          isRtl={isRtl}
        />
      </section>
    </main>
  );
};

export default SectorDetail;
