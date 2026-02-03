import { Link } from "react-router-dom";
import { routePaths } from "../../routes/paths";
import { ArrowRight } from "lucide-react";

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
        {articles.map((article) => (
          <Link
            to={routePaths.news}
            key={article.id}
            className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-full uppercase tracking-widest">
                {article.date}
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors line-clamp-2 leading-tight">
              {article.title.en}
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
              {article.excerpt.en}
            </p>
            <div className="mt-auto flex items-center gap-2 text-xs font-bold text-slate-900">
              <span className="border-b-2 border-slate-900 pb-0.5">
                {t.news.readArticle}
              </span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} strokeWidth={2} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
