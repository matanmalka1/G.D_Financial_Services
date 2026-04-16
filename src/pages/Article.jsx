import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSeo } from "../hooks/useSeo";
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
const PAGE_SHELL_CLASS = "min-h-screen bg-slate-50/30";
const PAGE_SECTION_CLASS = "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16";
const ARTICLE_SECTION_CLASS = `${PAGE_SECTION_CLASS} space-y-10`;

const getLocalizedValue = (value) => value?.he || value?.en || value;

const normalizeParagraphs = (content) => {
  if (Array.isArray(content)) {
    return content;
  }

  if (!content) {
    return [];
  }

  return [content];
};

export const Article = () => {
  const { id } = useParams();
  const { t, isRtl } = useSiteContent();
  const { getArticleById, loading, error, refreshContent } = useContent();

  const article = getArticleById(id);
  const title = getLocalizedValue(article?.title);
  const excerpt = getLocalizedValue(article?.excerpt);
  const paragraphs = normalizeParagraphs(getLocalizedValue(article?.content));

  useSeo({
    title: title || t.news.title,
    description: excerpt || undefined,
    ogImage: article?.image || DEFAULT_IMAGE,
  });

  const wordCount = useMemo(() => {
    if (!paragraphs.length) return 0;
    return paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  }, [paragraphs]);

  const readMinutes = Math.max(2, Math.ceil(wordCount / 180));
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const articleMeta = [
    article?.date && t.news.publishedOn.replace("{date}", article.date),
    t.news.readTime.replace("{minutes}", readMinutes),
  ]
    .filter(Boolean)
    .join(" · ");

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
      <BackIcon className="w-4 h-4" />
      <span>{t.news.backToNews}</span>
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
        <main className={PAGE_SHELL_CLASS}>
          {header}
          <section className={PAGE_SECTION_CLASS}>
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
        <main className={PAGE_SHELL_CLASS}>
          {header}
          <section className={ARTICLE_SECTION_CLASS}>
            <div className="flex items-center justify-between gap-4">
              {backLink}
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {article?.date}
              </div>
            </div>

            <SectionHeading
              title={title}
              subtitle={articleMeta}
            />

            <p className="text-lg text-slate-700 leading-8">
              {excerpt}
            </p>

            <div className="space-y-6 text-lg text-slate-800 leading-8">
              {paragraphs.map((paragraph, idx) => (
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
