import { Link } from "react-router-dom";
import { Card } from "./primitives/Card";
import { routes } from "../../routes/paths";

export const NewsCard = ({ article }) => {
  const title = article.title?.he || article.title?.en || article.title;
  const excerpt = article.excerpt?.he || article.excerpt?.en || article.excerpt;
  const to = routes.newsDetail(article.id);

  return (
    <Link
      to={to}
      className="block h-full group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-[1.5rem]"
      aria-label={title}
    >
      <Card
        as="article"
        variant="flat"
        className="flex h-full cursor-pointer flex-col rounded-2xl border-slate-200 bg-stone-50 p-6 shadow-sm transition-all group-hover:-translate-y-1 group-hover:border-slate-400 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-slate-200/60 sm:p-7"
      >
        <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 ring-1 ring-slate-200">
            {article.date}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors line-clamp-2 group-hover:text-slate-700">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-500 line-clamp-3">
          {excerpt}
        </p>
        <div className="mt-auto pt-8">
          <span className="block h-0.5 w-12 bg-slate-900 transition-all group-hover:w-20" />
        </div>
      </Card>
    </Link>
  );
};
