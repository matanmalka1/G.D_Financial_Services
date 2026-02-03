
import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useContent } from '../hooks/useContent';
import { ParallaxHeader } from '../components/common/ParallaxHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { NewsCard } from '../components/ui/NewsCard';
import { SearchBar } from '../components/ui/SearchBar';
import { Pagination } from '../components/ui/Pagination';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingGrid } from '../components/ui/LoadingGrid';
import { translations } from '../i18n/translations';

const ARTICLES_PER_PAGE = 9;

export const News = () => {
  const { t, language, isRtl } = useLanguage();
  const [search, setSearch] = useState('');
  const { articles, error, refreshContent, loading } = useContent();
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return articles;

    return articles.filter((art) => {
      return (
        art.title.en.toLowerCase().includes(query) ||
        art.title.he.toLowerCase().includes(query) ||
        art.excerpt.en.toLowerCase().includes(query) ||
        art.excerpt.he.toLowerCase().includes(query)
      );
    });
  }, [search, articles]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filtered.slice(start, start + ARTICLES_PER_PAGE);
  }, [filtered, currentPage]);

  const handleClearSearch = () => setSearch('');

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50/30 flex items-center justify-center px-4">
        <ErrorState
          title={t.news.errorTitle || "Unable to load news"}
          message={t.news.errorMessage || error}
          actionLabel={t.news.retry || "Retry"}
          onAction={refreshContent}
        />
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50/30 pb-20">
        <ParallaxHeader 
          image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000"
          title={translations.en.news.title}
        />
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingGrid count={9} />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/30 pb-20">
      <ParallaxHeader 
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000"
        title={translations.en.news.title}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Status Controls */}
        <div className="mb-16 max-w-2xl mx-auto space-y-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={handleClearSearch}
            placeholder={t.news.searchPlaceholder}
            ariaLabel={t.news.searchPlaceholder}
            isRtl={isRtl}
          />
        </div>

        {/* Articles Grid */}
        <SectionHeading
          title={t.news.title}
          subtitle={search ? t.news.showingResults.replace('{count}', filtered.length.toString()) : `${articles.length} ${t.news.title}`}
          liveMessage={
            search
              ? t.news.showingResults.replace('{count}', filtered.length.toString())
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
              <NewsCard key={article.id} article={article} language={language} />
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
  );
};
