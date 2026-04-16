import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "./primitives/Button";
import { useSiteContent } from "../../hooks/useSiteContent";

export const ErrorState = ({
  title,
  message,
  actionLabel,
  onAction,
}) => {
  const { t } = useSiteContent();

  return (
    <div className="w-full bg-white border border-rose-100 text-rose-900 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center gap-3 text-center">
      <AlertCircle className="w-8 h-8 text-rose-500" strokeWidth={2} />
      <div>
        <h3 className="text-xl font-bold">{title || t.errors.genericTitle}</h3>
        <p className="text-sm text-rose-700 mt-1">
          {message || t.errors.contentLoadFailed}
        </p>
      </div>
      {onAction ? (
        <Button
          onClick={onAction}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" strokeWidth={2} />
          {actionLabel || t.errors.retry}
        </Button>
      ) : null}
    </div>
  );
};
