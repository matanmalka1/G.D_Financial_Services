import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Builds the list of page entries to render, inserting null as an ellipsis marker.
 * Always shows first/last page, and a window of `delta` pages around the current page.
 */
const buildPageRange = (currentPage, totalPages, delta = 2) => {
  const range = new Set([1, totalPages]);

  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    range.add(i);
  }

  const sorted = [...range].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push(null); // ellipsis
    }
    result.push(sorted[i]);
  }

  return result;
};

const PAGE_BTN = "w-12 h-12 rounded-xl border font-bold transition-all";
const PAGE_BTN_ACTIVE = "bg-slate-900 border-slate-900 text-white";
const PAGE_BTN_IDLE = "border-slate-200 text-slate-600 hover:border-slate-400";

export const Pagination = ({ currentPage, totalPages, onChange, isRtl = false }) => {
  if (totalPages <= 1) return null;

  const PreviousIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const goTo = (page) => {
    if (page < 1 || page > totalPages) return;
    onChange?.(page);
  };

  const pageRange = buildPageRange(currentPage, totalPages);

  return (
    <div className="mt-20 flex items-center justify-center gap-2" role="navigation" aria-label={isRtl ? "ניווט עמודים" : "Page navigation"}>
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-3 rounded-xl border border-slate-200 transition-all ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-900 hover:text-white"}`}
        aria-label={isRtl ? "העמוד הקודם" : "Previous page"}
      >
        <PreviousIcon className="w-5 h-5" strokeWidth={2} />
      </button>

      <div className="flex items-center gap-2">
        {pageRange.map((page, i) =>
          page === null ? (
            <span key={`ellipsis-${i}`} className="w-8 text-center text-slate-400 select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goTo(page)}
              aria-label={isRtl ? `עמוד ${page}` : `Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`${PAGE_BTN} ${currentPage === page ? PAGE_BTN_ACTIVE : PAGE_BTN_IDLE}`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-3 rounded-xl border border-slate-200 transition-all ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-900 hover:text-white"}`}
        aria-label={isRtl ? "העמוד הבא" : "Next page"}
      >
        <NextIcon className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
};
