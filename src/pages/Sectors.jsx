import { useState, useMemo } from "react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useContent } from "../hooks/useContent";
import { useDebounce } from "../hooks/useDebounce";
import { useSeo } from "../hooks/useSeo";
import { ArrowLeft, ArrowRight, SearchX } from "lucide-react";
import { LoadBoundary, PageError, PageLoading } from "../components/common/LoadBoundary";
import { SectorTile } from "../components/ui/SectorTile";
import { SearchBar } from "../components/ui/SearchBar";
import { filterBySearch } from "../utils/helpers/utils";

const sectorImages = {
  "business-plan": "/sectorBusinessPlan/Bank.avif",
  "business-presentations": "/sectorBusinessPresentations/company%20presantation.avif",
  "business-consulting": "/sectorBusinessConsulting/revenue%20forecast.avif",
  "sell-side-advisory": "/sectorSellSide/company_sale_advisory.avif",
};

const sectorDescriptions = {
  "business-plan":
    "תוכניות עסקיות לבנקים, משקיעים והנהלה, עם תחזיות פיננסיות, ניתוח סיכונים ותמונה ברורה של יכולת ההחזר.",
  "business-presentations":
    "מצגות עסקיות ופיננסיות שמחברות בין המספרים, הסיפור העסקי והמסר הניהולי לקהל יעד מדויק.",
  "business-consulting":
    "ליווי פיננסי שוטף, ניתוח רווחיות, תכנון תקציב ובניית תשתית לקבלת החלטות מבוססת נתונים.",
  "sell-side-advisory":
    "הכנת חברה לתהליך מכירה, ניתוח שווי, בניית חומרי משקיעים וליווי עסקי עד שלבי המשא ומתן.",
};

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
    <section className="relative overflow-hidden bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_25%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_15%_90%,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl text-right">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-white/55">
            G.D Financial Services
          </p>
          <h1 className="font-serif text-4xl font-black leading-tight text-white md:text-6xl">
            {t.nav.sectors}
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-9 text-white/72"
            dir={isRtl ? "rtl" : "ltr"}
            style={{ unicodeBidi: "plaintext" }}
          >
            שירותים פיננסיים ועסקיים שמסייעים ליזמים, בעלי עסקים וחברות לקבל החלטות, לגייס מימון, להציג נתונים ולנהל מהלכים משמעותיים באופן מסודר.
          </p>
        </div>
      </div>
    </section>
  );
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

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
      <main className="min-h-screen bg-white">
        {header}

        <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-center">
              <div className={isRtl ? "text-right" : "text-left"}>
                <p className="text-sm font-bold text-slate-500">{t.sectors.title}</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  {filteredSectors.length} שירותים מרכזיים
                </h2>
              </div>
              <SearchBar
                value={search}
                onChange={setSearch}
                onClear={() => setSearch("")}
                placeholder={t.sectors.searchPlaceholder}
                ariaLabel={t.sectors.searchPlaceholder}
                isRtl={isRtl}
                className="w-full"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {filteredSectors.length ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {filteredSectors.map((sector) => (
                <SectorTile
                  key={sector.id}
                  sector={{
                    ...sector,
                    image: sectorImages[sector.id] || sector.image,
                  }}
                  title={t.nav[sector.titleKey]}
                  subtitle={t.sectors.viewDetails}
                  description={sectorDescriptions[sector.id] || t.sectors[sector.descriptionKey]}
                  isRtl={isRtl}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <SearchX className="mx-auto h-10 w-10 text-slate-400" strokeWidth={1.6} />
              <h2 className="mt-4 text-xl font-bold text-slate-950">
                {t.sectors.noResults}
              </h2>
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  <span>{t.news.clearSearch}</span>
                  <ArrowIcon className="h-4 w-4" strokeWidth={2} />
                </button>
              ) : null}
            </div>
          )}
        </section>
      </main>
    </LoadBoundary>
  );
};
