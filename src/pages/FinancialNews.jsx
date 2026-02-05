import { useLanguage } from "../hooks/useLanguage";
import { useFinancialNews } from "../hooks/useFinancialNews";
import { Pagination } from "../components/ui/Pagination";
import { LoadingGrid } from "../components/ui/LoadingGrid";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { NewsItemCard } from "../components/ui/NewsItemCard";
import { SectionHeading } from "../components/ui/SectionHeading";

export const FinancialNews = () => {
  const { t, isRtl } = useLanguage();
  const {
    currentPage,
    newsItems,
    totalPages,
    isLoading,
    error,
    goToPage,
    retry,
  } = useFinancialNews();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          title={t.financialNews.title}
          subtitle={t.financialNews.subtitle}
        />

        {error && (
          <ErrorState
            title={t.financialNews.error.title}
            message={
              error === "API_KEY_MISSING"
                ? t.financialNews.error.apiKeyMissing
                : t.financialNews.error.fetchFailed
            }
            actionLabel={t.financialNews.retry || "Retry"}
            onAction={retry}
          />
        )}

        {isLoading && newsItems.length === 0 && (
          <LoadingGrid count={9} columns="md:grid-cols-2 lg:grid-cols-3" />
        )}

        {!isLoading && !error && newsItems.length === 0 && (
          <EmptyState
            title={t.financialNews.empty.title}
            message={t.financialNews.empty.description}
          />
        )}

        {!error && newsItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {newsItems.map((item) => (
                <NewsItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-16" dir="ltr">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={goToPage}
                // Force LTR layout even when the page is RTL
                isRtl={false}
              />
            </div>

            {isLoading && newsItems.length > 0 && (
              <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 flex items-center justify-center">
                <div className="bg-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                  <div className="animate-spin h-6 w-6 border-[3px] border-slate-900 border-t-transparent rounded-full" />
                  <span className="text-slate-900 font-semibold">
                    {t.financialNews.loadingMore || "Loading more articles..."}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
