import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useContent } from "../hooks/useContent";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { SectionHeading } from "../components/ui/SectionHeading";
import {
  LoadBoundary,
  PageError,
  PageLoading,
} from "../components/common/LoadBoundary";
import { routes } from "../routes/paths";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2000&q=80&sat=-20";

export const Article = () => {
  const { id } = useParams();
  const { t, language, isRtl } = useLanguage();
  const { getArticleById, loading, error, refreshContent } = useContent();

  const article = useMemo(() => getArticleById(id), [getArticleById, id]);
  const title = language === "en" ? article?.title?.en : article?.title?.he;
  const excerpt = language === "en" ? article?.excerpt?.en : article?.excerpt?.he;
  const content = language === "en" ? article?.content?.en : article?.content?.he;

  const wordCount = useMemo(() => {
    if (!content?.length) return 0;
    return content.join(" ").split(/\s+/).filter(Boolean).length;
  }, [content]);

  const readMinutes = Math.max(2, Math.ceil(wordCount / 180));

  const header = (
    <ParallaxHeader
      image={article?.image || DEFAULT_IMAGE}
      title={title || t.news.title}
    />
  );

  const notFound = !loading && !article;

  const backLink = (
    <Link
      to={routes.news()}
      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-slate-600 transition-colors"
    >
      {isRtl ? (
        <>
          <ArrowRight className="w-4 h-4" />
          <span>{t.news.backToNews}</span>
        </>
      ) : (
        <>
          <ArrowLeft className="w-4 h-4" />
          <span>{t.news.backToNews}</span>
        </>
      )}
    </Link>
  );

  return (
    <LoadBoundary
      error={error}
      loading={loading}
      onRetry={refreshContent}
      errorFallback={
        <PageError
          title={t.news.errorTitle || "Unable to load article"}
          message={t.news.errorMessage || error}
          actionLabel={t.news.retry || "Retry"}
          onRetry={refreshContent}
        />
      }
      loadingFallback={<PageLoading header={header} count={3} columns={1} />}
    >
      {notFound ? (
        <main className="min-h-screen bg-slate-50/30">
          {header}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              {backLink}
            </div>
            <SectionHeading
              title={t.news.notFoundTitle}
              subtitle={t.news.notFoundMessage}
            />
          </section>
        </main>
      ) : (
        <main className="min-h-screen bg-slate-50/30">
          {header}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
            <div className="flex items-center justify-between gap-4">
              {backLink}
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {article?.date}
              </div>
            </div>

            <SectionHeading
              title={title}
              subtitle={[article?.date && t.news.publishedOn.replace("{date}", article.date), t.news.readTime.replace("{minutes}", readMinutes)]
                .filter(Boolean)
                .join(" · ")}
            />

            <p className="text-lg text-slate-700 leading-8">
              {excerpt}
            </p>

            <div className="space-y-6 text-lg text-slate-800 leading-8">
              {content?.map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </main>
      )}
    </LoadBoundary>
  );
};
