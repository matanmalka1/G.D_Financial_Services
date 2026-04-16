import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/primitives/Button";
import { getCharacterTone } from "../utils";

export const FieldEditorCard = ({
  item,
  currentValue,
  savedValue,
  originalValue,
  isDirty,
  hasSavedOverride,
  onChange,
  onSave,
  onDiscard,
  onReset,
}) => {
  const InputTag = item.inputType === "input" ? "input" : "textarea";
  const currentLength = currentValue.length;
  const isTooLong = item.maxLength ? currentLength > item.maxLength : false;

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {item.pageLabel}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.label}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{item.helpText}</p>
          <p className="mt-2 text-sm font-medium text-slate-600">{item.sectionLabel}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {isDirty ? (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              שינוי ממתין לשמירה
            </span>
          ) : hasSavedOverride ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              נשמר כטקסט מותאם
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              טקסט ברירת מחדל
            </span>
          )}

          <span
            className={`text-xs font-medium ${getCharacterTone(
              currentLength,
              item.maxLength,
            )}`}
          >
            {item.maxLength
              ? `${currentLength}/${item.maxLength} תווים מומלצים`
              : `${currentLength} תווים`}
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">טקסט חדש</label>
        <InputTag
          value={currentValue}
          onChange={(event) => onChange(item.path, event.target.value)}
          className={`w-full rounded-2xl border px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
            isTooLong
              ? "border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-rose-100"
              : "border-slate-300 bg-white focus:border-slate-500 focus:ring-slate-200"
          } ${item.inputType === "textarea" ? "min-h-32 resize-y" : ""}`}
        />
        {isTooLong ? (
          <p className="mt-2 text-sm text-rose-600">
            הטקסט ארוך מהמומלץ ועלול להיראות צפוף בחלק מהמסכים.
          </p>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-3">
        <div className="rounded-[1.5rem] bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            מה שמופיע כרגע באתר
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {savedValue}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            איך זה ייראה אחרי שמירה
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-900">
            {currentValue}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-dashed border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            נוסח מקורי של האתר
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {originalValue}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={item.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            פתח את האזור באתר
          </Link>
          <details className="text-xs text-slate-500">
            <summary className="cursor-pointer select-none font-medium">פרטים מתקדמים</summary>
            <p className="mt-2 font-mono text-[11px] text-slate-400">{item.path}</p>
          </details>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="text"
            className="rounded-xl px-0 text-slate-500 hover:text-slate-900"
            onClick={() => onDiscard(item.path)}
            disabled={!isDirty}
          >
            בטל טיוטה
          </Button>
          <Button
            variant="text"
            className="rounded-xl px-0 text-rose-600 hover:text-rose-700"
            onClick={() => onReset(item.path)}
            disabled={!hasSavedOverride && currentValue === originalValue}
          >
            חזור לברירת מחדל
          </Button>
          <Button
            className="rounded-2xl px-5"
            onClick={() => onSave(item.path)}
            disabled={!isDirty}
          >
            שמור שדה
          </Button>
        </div>
      </div>
    </article>
  );
};
