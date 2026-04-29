import { useEffect, useMemo, useState } from "react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useContent } from "../hooks/useContent";
import { useDebounce } from "../hooks/useDebounce";
import { useSeo } from "../hooks/useSeo";
import { SectionHeading } from "../components/ui/SectionHeading";
import { NewsCard } from "../components/ui/NewsCard";
import { SearchBar } from "../components/ui/SearchBar";
import { Pagination } from "../components/ui/Pagination";
import { EmptyState } from "../components/ui/EmptyState";
import { LoadBoundary, PageError, PageLoading } from "../components/common/LoadBoundary";
import { ITEMS_PER_PAGE } from "../constants.js";
import { filterBySearch } from "../utils/helpers/utils";
import { getArticleSearchValues } from "../services/contentService";

const ARTICLES_PER_PAGE = ITEMS_PER_PAGE.NEWS;

const NewsHero = ({ title }) => (
  <section className="relative overflow-hidden bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_15%_80%,rgba(255,255,255,0.08),transparent_45%)]" />

    <div className="relative mx-auto max-w-7xl text-center">
      <div className="mb-8 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white">
        G.D Finance
      </div>
      <h1 className="font-serif text-4xl font-black leading-tight md:text-6xl">
        {title}
      </h1>
    </div>
  </section>
);

export const News = () => {
  const { t, isRtl } = useSiteContent();
  useSeo({
    title: t.news.title,
    description: "קראו את המאמרים האחרונים של G.D Financial Services.",
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { articles, error, refreshContent, loading } = useContent();
  const [currentPage, setCurrentPage] = useState(1);

  const header = <NewsHero title={t.news.title} />;

  const filtered = useMemo(
    () => filterBySearch(articles, debouncedSearch, getArticleSearchValues),
    [debouncedSearch, articles],
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  const paginatedArticles = useMemo(() => {
    const start = (safeCurrentPage - 1) * ARTICLES_PER_PAGE;
    return filtered.slice(start, start + ARTICLES_PER_PAGE);
  }, [filtered, safeCurrentPage]);

  const resultsSummary = useMemo(
    () =>
      debouncedSearch
        ? t.news.showingResults.replace("{count}", filtered.length.toString())
        : `${articles.length} ${t.news.title}`,
    [articles.length, debouncedSearch, filtered.length, t.news.showingResults, t.news.title],
  );

  const handleClearSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <LoadBoundary
      error={error}
      loading={loading}
      onRetry={refreshContent}
      errorFallback={
        <PageError
          title={t.news.errorTitle || "Unable to load articles"}
          message={t.news.errorMessage || error}
          actionLabel={t.news.retry || "Retry"}
          onRetry={refreshContent}
        />
      }
      loadingFallback={<PageLoading header={header} count={9} />}
    >
      <main className="min-h-screen bg-white pb-20">
        {header}

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto -mt-32 mb-16 max-w-2xl space-y-4 md:-mt-36">
            <SearchBar
              value={search}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
              placeholder={t.news.searchPlaceholder}
              ariaLabel={t.news.searchPlaceholder}
              isRtl={isRtl}
            />
          </div>

          <SectionHeading
            title={t.news.title}
            subtitle={resultsSummary}
            liveMessage={resultsSummary}
            action={
              search ? (
                <button
                  onClick={handleClearSearch}
                  className="text-sm font-bold text-indigo-600 hover:underline"
                >
                  {t.news.clearSearch}
                </button>
              ) : null
            }
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                />
              ))
            ) : (
              <EmptyState
                title={t.news.noResults}
                actionLabel={t.news.clearSearch}
                onAction={handleClearSearch}
              />
            )}
          </div>

          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onChange={goToPage}
            isRtl={isRtl}
          />
        </section>
      </main>
    </LoadBoundary>
  );
};
