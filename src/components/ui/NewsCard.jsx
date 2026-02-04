import { Link, useNavigate } from "react-router-dom";
import { Card } from "./primitives/Card";
import { routes } from "../../routes/paths";

export const NewsCard = ({ article, language }) => {
  const navigate = useNavigate();
  const title = language === 'en' ? article.title.en : article.title.he;
  const excerpt = language === 'en' ? article.excerpt.en : article.excerpt.he;
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
      className="block group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-[2rem]"
      aria-label={title}
      onClick={handleNavigate}
    >
      <Card
        as="article"
        variant="flat"
        className="p-8 shadow-sm transition-all flex flex-col gap-6 cursor-pointer group-hover:shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            {article.date}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{excerpt}</p>
      </Card>
    </Link>
  );
};
