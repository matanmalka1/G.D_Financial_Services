export const PageTile = ({ option, count, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-[1.75rem] border p-5 text-right transition ${
      active
        ? "border-slate-950 bg-slate-950 text-white shadow-xl shadow-slate-300/40"
        : "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300"
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold">{option.label}</h2>
        <p
          className={`mt-2 text-sm leading-6 ${
            active ? "text-slate-200" : "text-slate-500"
          }`}
        >
          {option.description}
        </p>
      </div>
      <div
        className={`rounded-2xl px-3 py-2 text-sm font-semibold ${
          active ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"
        }`}
      >
        {count}
      </div>
    </div>
  </button>
);
