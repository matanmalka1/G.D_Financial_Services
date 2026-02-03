import { memo } from 'react';
import { Card } from './primitives/Card';

export const NewsCard = memo(({ article, language }) => {
  const title = language === 'en' ? article.title.en : article.title.he;
  const excerpt = language === 'en' ? article.excerpt.en : article.excerpt.he;

  return (
    <Card
      as="article"
      variant="flat"
      className="p-8 shadow-sm hover:shadow-lg transition-all flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          {article.date}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{excerpt}</p>
    </Card>
  );
});
