export const LoadingGrid = ({ count = 6, columns = "md:grid-cols-2 lg:grid-cols-3" }) => (
  <div className={`grid grid-cols-1 ${columns} gap-10`}>
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="h-48 rounded-2xl bg-slate-200/60 animate-pulse border border-slate-200"
        aria-hidden="true"
      />
    ))}
  </div>
);
