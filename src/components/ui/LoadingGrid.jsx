const DEFAULT_COLUMNS = "md:grid-cols-2 lg:grid-cols-3";

export const LoadingGrid = ({
  count = 6,
  columns = DEFAULT_COLUMNS,
}) => (
  <div className={`grid grid-cols-1 ${columns} gap-10`}>
    {Array.from({ length: Math.max(0, count) }, (_, idx) => (
      <div
        key={`loading-card-${idx}`}
        className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-slate-200/60"
        aria-hidden="true"
      />
    ))}
  </div>
);
