export const FilterChip = ({ active, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
      active
        ? "bg-slate-950 text-white"
        : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
    }`}
  >
    {label}
  </button>
);
