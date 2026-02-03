import { ErrorState } from "../ui/ErrorState";
import { LoadingGrid } from "../ui/LoadingGrid";

export const LoadBoundary = ({
  error,
  loading,
  onRetry,
  errorTitle,
  errorMessage,
  retryLabel,
  loadingHeader,
  children,
  loadingGridProps = {},
}) => {
  if (error) {
    return (
      <main className="min-h-screen bg-slate-50/30 flex items-center justify-center px-4">
        <ErrorState
          title={errorTitle}
          message={errorMessage || error}
          actionLabel={retryLabel}
          onAction={onRetry}
        />
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50/30">
        {loadingHeader}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingGrid {...loadingGridProps} />
        </section>
      </main>
    );
  }

  return children;
};
