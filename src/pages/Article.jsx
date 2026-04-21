import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSeo } from "../hooks/useSeo";
import { useContent } from "../hooks/useContent";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
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
const ARTICLE_SECTION_CLASS = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16";
const ARTICLE_CARD_CLASS =
  "bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-[1.75rem] overflow-hidden";
const ARTICLE_INNER_CLASS = "max-w-3xl mx-auto px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12";
const ARTICLE_TEXT_CLASS = "text-[1.05rem] sm:text-lg leading-8 sm:leading-9 text-slate-700";
const PARAGRAPH_LABEL_PATTERN = /^([^:]{2,42}):\s+(.+)$/;
const NUMBERED_HEADING_PATTERN = /^(\d+)\.\s+(.+)$/;
const SHORT_HEADING_WORD_LIMIT = 10;

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

const getWordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;

const isSectionHeading = (paragraph) => {
  const trimmed = paragraph.trim();

  if (NUMBERED_HEADING_PATTERN.test(trimmed)) {
    return true;
  }

  if (trimmed.endsWith(":")) {
    return true;
  }

  if (getWordCount(trimmed) > SHORT_HEADING_WORD_LIMIT) {
    return false;
  }

  return !/[.!?]$/.test(trimmed);
};

const renderArticleBlock = (paragraph, idx) => {
  const trimmed = paragraph.trim();

  if (!trimmed) {
    return null;
  }

  const numberedHeading = trimmed.match(NUMBERED_HEADING_PATTERN);
  if (numberedHeading) {
    return (
      <h3
        key={idx}
        className="mt-12 flex items-start gap-4 text-2xl font-bold leading-tight text-slate-950 first:mt-0"
      >
        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
          {numberedHeading[1]}
        </span>
        <span>{numberedHeading[2]}</span>
      </h3>
    );
  }

  if (isSectionHeading(trimmed)) {
    return (
      <h3
        key={idx}
        className="mt-12 border-t border-slate-200 pt-8 text-2xl font-bold leading-tight text-slate-950 first:mt-0 first:border-t-0 first:pt-0"
      >
        {trimmed.replace(/:$/, "")}
      </h3>
    );
  }

  const labeledParagraph = trimmed.match(PARAGRAPH_LABEL_PATTERN);
  if (labeledParagraph) {
    return (
      <p key={idx} className={ARTICLE_TEXT_CLASS}>
        <strong className="font-bold text-slate-950">{labeledParagraph[1]}: </strong>
        <span>{labeledParagraph[2]}</span>
      </p>
    );
  }

  return (
    <p key={idx} className={`${ARTICLE_TEXT_CLASS} whitespace-pre-line`}>
      {trimmed}
    </p>
  );
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
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900">{t.news.notFoundTitle}</h2>
              <p className="text-base leading-7 text-slate-600">{t.news.notFoundMessage}</p>
            </div>
          </section>
        </main>
      ) : (
        <main className={PAGE_SHELL_CLASS}>
          {header}
          <section className={ARTICLE_SECTION_CLASS}>
            <div className={ARTICLE_CARD_CLASS}>
              <div className={ARTICLE_INNER_CLASS}>
                <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                  {backLink}
                  <div className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {article?.date}
                  </div>
                </div>

                <header className="mb-10 border-b border-slate-200 pb-10">
                  <p className="mb-4 text-sm font-bold text-slate-500">{articleMeta}</p>
                  <h2 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
                    {title}
                  </h2>
                  {excerpt && (
                    <p className="mt-6 border-s-4 border-slate-900 ps-5 text-xl leading-9 text-slate-700">
                      {excerpt}
                    </p>
                  )}
                </header>

                <div className="space-y-6">
                  {paragraphs.map(renderArticleBlock)}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </LoadBoundary>
  );
};
