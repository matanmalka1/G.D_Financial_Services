import { Calendar, ExternalLink } from "lucide-react";

export const NewsItemCard = ({ item, language }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === "he" ? "he-IL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {item.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <time dateTime={item.publishedAt}>
              {formatDate(item.publishedAt)}
            </time>
          </div>
          {item.source && (
            <span className="text-slate-600 font-medium">{item.source}</span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-3 mb-4">
          {item.description}
        </p>

        <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
          <span>Read more</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};
