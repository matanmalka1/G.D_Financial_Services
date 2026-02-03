export const SectionHeading = ({ title, subtitle, action, liveMessage }) => (
  <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
    <div>
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="text-sm text-slate-500" role="status" aria-live={liveMessage ? 'polite' : undefined}>
          {subtitle}
        </p>
      )}
      {liveMessage && (
        <p className="sr-only" aria-live="polite">
          {liveMessage}
        </p>
      )}
    </div>
    {action && <div>{action}</div>}
  </div>
);
