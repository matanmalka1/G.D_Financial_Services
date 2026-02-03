import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "./primitives/Button";

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  actionLabel = "Retry",
  onAction,
}) => (
  <div className="w-full bg-white border border-rose-100 text-rose-900 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center gap-3 text-center">
    <AlertCircle className="w-8 h-8 text-rose-500" strokeWidth={2} />
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-rose-700 mt-1">{message}</p>
    </div>
    {onAction ? (
      <Button
        onClick={onAction}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RefreshCcw className="w-4 h-4" strokeWidth={2} />
        {actionLabel}
      </Button>
    ) : null}
  </div>
);
