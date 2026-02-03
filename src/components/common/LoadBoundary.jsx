import { ErrorState } from "../ui/ErrorState";
import { LoadingGrid } from "../ui/LoadingGrid";

// Simple building blocks for loading/error pages so callers can compose their own layouts.
export const PageError = ({
  title = "Something went wrong",
  message = "Unable to load content",
  actionLabel = "Retry",
  onRetry,
}) => (
  <main className="min-h-screen bg-slate-50/30 flex items-center justify-center px-4">
    <ErrorState
      title={title}
      message={message}
      actionLabel={actionLabel}
      onAction={onRetry}
    />
  </main>
);

export const PageLoading = ({
  header = null,
  count = 6,
  columns,
}) => (
  <main className="min-h-screen bg-slate-50/30">
    {header}
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <LoadingGrid count={count} columns={columns} />
    </section>
  </main>
);

export const LoadBoundary = ({
  error,
  loading,
  onRetry,
  children,
  errorFallback,
  loadingFallback,
}) => {
  if (error) {
    return errorFallback || (
      <PageError message={error} onRetry={onRetry} />
    );
  }

  if (loading) {
    return loadingFallback || <PageLoading />;
  }

  return children;
};
