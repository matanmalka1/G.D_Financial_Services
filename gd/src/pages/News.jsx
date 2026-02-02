
import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useContent } from '../hooks/useContent';
import { ParallaxHeader } from '../components/common/ParallaxHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { NewsCard } from '../components/ui/NewsCard';
import { translations } from '../i18n/translations';

const ARTICLES_PER_PAGE = 9;

const News = () => {
  const { t, language, isRtl } = useLanguage();
  const [search, setSearch] = useState('');
  const { articles } = useContent();
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized filter for optimal performance across both languages simultaneously
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

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Pagination Logic
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

  return (
    <main className="min-h-screen bg-slate-50/30 pb-20">
      <ParallaxHeader 
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000"
        title={translations.en.news.title}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Status Controls */}
        <div className="mb-16 max-w-2xl mx-auto space-y-4">
          <label htmlFor="news-search" className="sr-only">
            {t.news.searchPlaceholder}
          </label>
          <div className="relative group">
            <div className={`absolute inset-y-0 flex items-center pointer-events-none transition-colors duration-200 ${isRtl ? 'right-0 pr-5' : 'left-0 pl-5'} ${search ? 'text-slate-900' : 'text-slate-400'}`}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder={t.news.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-5 rounded-[1.5rem] border border-slate-200 bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-300 focus:outline-none shadow-sm transition-all duration-300 text-lg text-slate-800 ${isRtl ? 'pr-12 pl-12' : 'pl-12 pr-12'}`}
              aria-label={t.news.searchPlaceholder}
            />
            {search && (
              <button
                onClick={handleClearSearch}
                className={`absolute inset-y-0 flex items-center px-4 text-slate-400 hover:text-slate-600 transition-colors ${isRtl ? 'left-0' : 'right-0'}`}
                aria-label={t.news.clearSearch}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
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
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-xl text-slate-500 font-medium">{t.news.noResults}</p>
              <button 
                onClick={handleClearSearch}
                className="mt-6 text-slate-900 font-bold hover:underline"
              >
                {t.news.clearSearch}
              </button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-3 rounded-xl border border-slate-200 transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-900 hover:text-white'}`}
              aria-label="Previous Page"
            >
              <svg className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-12 h-12 rounded-xl border font-bold transition-all ${currentPage === page ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-xl border border-slate-200 transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-900 hover:text-white'}`}
              aria-label="Next Page"
            >
              <svg className={`w-5 h-5 ${isRtl ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default News;
