import { useState, useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useContent } from "../hooks/useContent";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { translations } from "../i18n/translations";
import { SectorTile } from "../components/ui/SectorTile";
import { SectionHeading } from "../components/ui/SectionHeading";

const Sectors = () => {
  const { t, isRtl } = useLanguage();
  const [search, setSearch] = useState("");
  const { sectors } = useContent();

  const filteredSectors = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return sectors;

    return sectors.filter((sector) => {
      const titleEn = (
        translations.en.nav[sector.titleKey] || ""
      ).toLowerCase();
      const titleHe = (
        translations.he.nav[sector.titleKey] || ""
      ).toLowerCase();
      return titleEn.includes(query) || titleHe.includes(query);
    });
  }, [search, sectors]);

  return (
    <main className="min-h-screen bg-slate-50/30">
      <ParallaxHeader
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
        title={translations.en.nav.sectors}
        subtitle={translations.en.sectors.title}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input */}
        <div className="mb-16 max-w-xl mx-auto">
          <div className="relative group">
            <div
              className={`absolute inset-y-0 flex items-center pointer-events-none transition-colors duration-200 ${isRtl ? "right-0 pr-5" : "left-0 pl-5"} text-slate-400`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t.sectors.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-4 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-400 focus:outline-none shadow-sm transition-all duration-300 ${isRtl ? "pr-12" : "pl-12"}`}
            />
          </div>
        </div>

        <SectionHeading
          title={t.nav.sectors}
          subtitle={`${filteredSectors.length} ${t.sectors.title}`}
          action={
            search && (
              <button
                onClick={() => setSearch("")}
                className="text-sm font-bold text-indigo-600 hover:underline"
              >
                {t.news.clearSearch}
              </button>
            )
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredSectors.map((sector) => (
            <SectorTile
              key={sector.id}
              sector={sector}
              title={t.nav[sector.titleKey]}
              subtitle={t.sectors.viewDetails}
              isRtl={isRtl}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Sectors;
