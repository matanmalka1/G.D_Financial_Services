import { Link } from "react-router-dom";
import { routePaths, routes } from "../../../routes/paths";
import { ArrowRight } from "lucide-react";

const getLocalizedValue = (value) => value?.he || value?.en || value;
const formatDisplayDate = (value) => (value || "").replaceAll("-", ".");

export const RelatedArticlesSection = ({ articles = [], t, isRtl }) => {
  if (!articles.length) return null;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-grow">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 whitespace-nowrap">
            {t.news.relatedTitle}
          </h3>
          <div className="h-px bg-slate-200 w-full hidden md:block" />
        </div>
        <Link
          to={routePaths.news}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-slate-600 transition-colors group"
        >
          <span>{t.sectorDetail.viewAllNews}</span>
          <ArrowRight
            className={`w-4 h-4 transform group-hover:translate-x-1 ${
              isRtl ? "rotate-180 group-hover:-translate-x-1" : ""
            }`}
            strokeWidth={2}
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => {
          const title = getLocalizedValue(article.title);
          const excerpt = getLocalizedValue(article.excerpt);

          return (
            <Link
              to={routes.newsDetail(article.id)}
              key={article.id}
              className="group flex h-full flex-col rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
            >
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {formatDisplayDate(article.date)}
                </span>
              </div>
              <h4 className="mb-4 text-xl font-bold leading-snug text-slate-900 transition-colors line-clamp-2 group-hover:text-slate-700">
                {title}
              </h4>
              <p className="mb-8 text-sm leading-7 text-slate-500 line-clamp-3">
                {excerpt}
              </p>
              <div className="mt-auto flex items-center gap-2 text-xs font-bold text-slate-900">
                <span className="border-b-2 border-slate-900 pb-0.5">
                  {t.news.readArticle}
                </span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} strokeWidth={2} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
