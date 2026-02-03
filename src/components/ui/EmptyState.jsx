import { FileQuestion } from "lucide-react";

export const EmptyState = ({
  icon,
  title,
  actionLabel,
  onAction,
}) => (
  <div className="col-span-full py-20 text-center">
    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
      {icon || <FileQuestion className="w-10 h-10 text-slate-300" strokeWidth={1.75} />}
    </div>
    <p className="text-xl text-slate-500 font-medium">{title}</p>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="mt-6 text-slate-900 font-bold hover:underline"
      >
        {actionLabel}
      </button>
    )}
  </div>
);
