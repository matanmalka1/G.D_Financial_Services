import { useState, useMemo } from "react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useContent } from "../hooks/useContent";
import { useDebounce } from "../hooks/useDebounce";
import { useSeo } from "../hooks/useSeo";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { LoadBoundary, PageError, PageLoading } from "../components/common/LoadBoundary";
import { SectorTile } from "../components/ui/SectorTile";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SearchBar } from "../components/ui/SearchBar";
import { filterBySearch } from "../utils/helpers/utils";

export const Sectors = () => {
  const { t, isRtl } = useSiteContent();
  useSeo({
    title: t.nav.sectors,
    description: "גלו את מגזרי הפעילות של G.D Financial Services: תוכניות עסקיות, מצגות, ייעוץ עסקי, ליווי לצד המכירה וייעוץ פיננסי שוטף.",
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { sectors, error, refreshContent, loading } = useContent();
  const filteredSectors = useMemo(
    () => filterBySearch(sectors, debouncedSearch, (sector) => [t.nav[sector.titleKey] || ""]),
    [sectors, debouncedSearch, t.nav],
  );

  const header = (
    <ParallaxHeader
      image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
      title={t.nav.sectors}
      subtitle={t.sectors.title}
    />
  );

  return (
    <LoadBoundary
      error={error}
      loading={loading}
      onRetry={refreshContent}
      errorFallback={
        <PageError
          title={t.sectors.errorTitle || "Unable to load sectors"}
          message={t.sectors.errorMessage || error}
          actionLabel={t.news.retry || "Retry"}
          onRetry={refreshContent}
        />
      }
      loadingFallback={
        <PageLoading header={header} count={6} columns="md:grid-cols-2" />
      }
    >
      <main className="min-h-screen bg-slate-50/30">
        {header}

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-xl mx-auto">
            <SearchBar
              value={search}
              onChange={setSearch}
              onClear={() => setSearch("")}
              placeholder={t.sectors.searchPlaceholder}
              ariaLabel={t.sectors.searchPlaceholder}
              isRtl={isRtl}
            />
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
    </LoadBoundary>
  );
};
