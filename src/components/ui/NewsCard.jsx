import { Link, useNavigate } from "react-router-dom";
import { Card } from "./primitives/Card";
import { routes } from "../../routes/paths";

export const NewsCard = ({ article }) => {
  const navigate = useNavigate();
  const title = article.title?.he || article.title?.en || article.title;
  const excerpt = article.excerpt?.he || article.excerpt?.en || article.excerpt;
  const to = routes.newsDetail(article.id);

  const handleNavigate = (e) => {
    // Respect modifier keys / middle-click for new tab behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <Link
      to={to}
      className="block h-full group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-[1.5rem]"
      aria-label={title}
      onClick={handleNavigate}
    >
      <Card
        as="article"
        variant="flat"
        className="h-full rounded-[1.5rem] p-6 sm:p-7 shadow-sm transition-all flex flex-col gap-5 cursor-pointer group-hover:-translate-y-1 group-hover:shadow-lg"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            {article.date}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-snug text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-7 line-clamp-3">{excerpt}</p>
      </Card>
    </Link>
  );
};
