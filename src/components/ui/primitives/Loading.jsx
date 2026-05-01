const DEFAULT_COLUMNS = "md:grid-cols-2 lg:grid-cols-3";

export const LoadingCard = ({ className = "" }) => (
  <div
    className={`h-48 animate-pulse rounded-2xl border border-slate-200 bg-slate-200/60 ${className}`}
    aria-hidden="true"
  />
);

export const LoadingGrid = ({
  count = 6,
  columns = DEFAULT_COLUMNS,
}) => (
  <div className={`grid grid-cols-1 ${columns} gap-10`}>
    {Array.from({ length: Math.max(0, count) }, (_, idx) => (
      <LoadingCard key={`loading-card-${idx}`} />
    ))}
  </div>
);
