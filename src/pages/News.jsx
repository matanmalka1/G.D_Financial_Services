import { useState, useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useContent } from "../hooks/useContent";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { SectionHeading } from "../components/ui/SectionHeading";
import { NewsCard } from "../components/ui/NewsCard";
import { SearchBar } from "../components/ui/SearchBar";
import { Pagination } from "../components/ui/Pagination";
import { EmptyState } from "../components/ui/EmptyState";
import { LoadBoundary, PageError, PageLoading } from "../components/common/LoadBoundary";
import { ITEMS_PER_PAGE } from "../constants.js";
import { filterBySearch } from "../utils/helpers/utils";

const ARTICLES_PER_PAGE = ITEMS_PER_PAGE.NEWS;

export const News = () => {
  const { t, language, isRtl } = useLanguage();
  const [search, setSearch] = useState("");
  const { articles, error, refreshContent, loading } = useContent();
  const [currentPage, setCurrentPage] = useState(1);

  const header = (
    <ParallaxHeader
      image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000"
      title={t.news.title}
    />
  );

  const filtered = useMemo(
    () =>
      filterBySearch(articles, search, (art) => [
        art.title.en,
        art.title.he,
        art.excerpt.en,
        art.excerpt.he,
        art.content?.en?.join(" "),
        art.content?.he?.join(" "),
      ]),
    [search, articles],
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const safeCurrentPage = useMemo(() => {
    const total = Math.ceil(filtered.length / ARTICLES_PER_PAGE) || 1;
    return Math.min(currentPage, total);
  }, [currentPage, filtered.length]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE) || 1;

  const paginatedArticles = useMemo(() => {
    const start = (safeCurrentPage - 1) * ARTICLES_PER_PAGE;
    return filtered.slice(start, start + ARTICLES_PER_PAGE);
  }, [filtered, safeCurrentPage]);

  const handleClearSearch = () => setSearch("");

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
          title={t.news.errorTitle || "Unable to load news"}
          message={t.news.errorMessage || error}
          actionLabel={t.news.retry || "Retry"}
          onRetry={refreshContent}
        />
      }
      loadingFallback={<PageLoading header={header} count={9} />}
    >
      <main className="min-h-screen bg-slate-50/30 pb-20">
        {header}

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl mx-auto space-y-4">
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
            subtitle={
              search
                ? t.news.showingResults.replace(
                    "{count}",
                    filtered.length.toString(),
                  )
                : `${articles.length} ${t.news.title}`
            }
            liveMessage={
              search
                ? t.news.showingResults.replace(
                    "{count}",
                    filtered.length.toString(),
                  )
                : `${articles.length} ${t.news.title}`
            }
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  language={language}
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
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={goToPage}
            isRtl={isRtl}
          />
        </section>
      </main>
    </LoadBoundary>
  );
};
