import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = memo(({ currentPage, totalPages, onChange, isRtl = false }) => {
  if (totalPages <= 1) return null;

  const goTo = (page) => {
    if (page < 1 || page > totalPages) return;
    onChange?.(page);
  };

  return (
    <div className="mt-20 flex items-center justify-center gap-2">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-3 rounded-xl border border-slate-200 transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-900 hover:text-white'}`}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2} />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goTo(page)}
            className={`w-12 h-12 rounded-xl border font-bold transition-all ${currentPage === page ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-3 rounded-xl border border-slate-200 transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-900 hover:text-white'}`}
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
});
