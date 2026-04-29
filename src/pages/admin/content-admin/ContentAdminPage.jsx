import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/ui/primitives/Button";
import { useSiteContent } from "../../../hooks/useSiteContent";
import { ADMIN_PASSWORD, PAGE_OPTIONS, QUICK_FILTERS } from "./config";
import { buildAdminEntry } from "./utils";
import { AdminLogin } from "./components/AdminLogin";
import { EmptyState } from "./components/EmptyState";
import { FieldEditorCard } from "./components/FieldEditorCard";
import { FilterChip } from "./components/FilterChip";
import { OverviewCard } from "./components/OverviewCard";
import { PageTile } from "./components/PageTile";

export const ContentAdmin = () => {
  const {
    adminEntries,
    adminOverrides,
    isAdminEnabled,
    isAdminAuthenticated,
    authenticateAdmin,
    logoutAdmin,
    updateContentEntry,
    resetContentEntry,
    resetAllContent,
  } = useSiteContent();

  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState("all");
  const [activeQuickFilter, setActiveQuickFilter] = useState("all");
  const [showChangedOnly, setShowChangedOnly] = useState(false);
  const [drafts, setDrafts] = useState({});

  const entriesWithMeta = useMemo(
    () => adminEntries.map((item) => buildAdminEntry(item)),
    [adminEntries],
  );

  const savedValues = useMemo(
    () =>
      Object.fromEntries(
        entriesWithMeta.map((item) => [
          item.path,
          adminOverrides[item.path] ?? item.value,
        ]),
      ),
    [adminOverrides, entriesWithMeta],
  );

  const currentValues = useMemo(
    () =>
      Object.fromEntries(
        entriesWithMeta.map((item) => [
          item.path,
          drafts[item.path] ?? savedValues[item.path],
        ]),
      ),
    [drafts, entriesWithMeta, savedValues],
  );

  const dirtyPaths = useMemo(
    () =>
      entriesWithMeta
        .filter((item) => currentValues[item.path] !== savedValues[item.path])
        .map((item) => item.path),
    [currentValues, entriesWithMeta, savedValues],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredEntries = useMemo(
    () =>
      entriesWithMeta.filter((item) => {
        if (activePage !== "all" && item.pageKey !== activePage) {
          return false;
        }

        if (showChangedOnly && currentValues[item.path] === savedValues[item.path]) {
          return false;
        }

        if (activeQuickFilter !== "all" && item.focusArea !== activeQuickFilter) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        return [
          item.pageLabel,
          item.sectionLabel,
          item.label,
          item.helpText,
          currentValues[item.path],
          item.value,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      }),
    [
      activePage,
      activeQuickFilter,
      currentValues,
      entriesWithMeta,
      normalizedQuery,
      savedValues,
      showChangedOnly,
    ],
  );

  const groupedSections = useMemo(() => {
    const groups = filteredEntries.reduce((collection, item) => {
      if (!collection[item.sectionKey]) {
        collection[item.sectionKey] = {
          key: item.sectionKey,
          label: item.sectionLabel,
          description: item.sectionDescription,
          href: item.href,
          entries: [],
        };
      }

      collection[item.sectionKey].entries.push(item);
      return collection;
    }, {});

    return Object.values(groups);
  }, [filteredEntries]);

  const pageCounts = useMemo(
    () =>
      PAGE_OPTIONS.map((option) => ({
        ...option,
        count:
          option.key === "all"
            ? entriesWithMeta.length
            : entriesWithMeta.filter((item) => item.pageKey === option.key).length,
      })),
    [entriesWithMeta],
  );

  const visibleOverridePaths = new Set(entriesWithMeta.map((item) => item.path));
  const customizedCount = Object.keys(adminOverrides).filter((path) =>
    visibleOverridePaths.has(path),
  ).length;
  const visibleCount = filteredEntries.length;
  const requiresPassword = Boolean(ADMIN_PASSWORD);

  const updateDraft = (path, value) => {
    setDrafts((previous) => ({
      ...previous,
      [path]: value,
    }));
  };

  const discardDraft = (path) => {
    setDrafts((previous) => {
      if (!(path in previous)) return previous;
      const next = { ...previous };
      delete next[path];
      return next;
    });
  };

  const discardAllDrafts = () => {
    if (!dirtyPaths.length) {
      toast.message("אין טיוטות פתוחות לביטול.");
      return;
    }

    setDrafts({});
    toast.success("כל הטיוטות שלא נשמרו בוטלו.");
  };

  const saveDraft = (path) => {
    const nextValue = currentValues[path];
    const currentSavedValue = savedValues[path];

    if (nextValue === currentSavedValue) {
      return;
    }

    updateContentEntry(path, nextValue);
    discardDraft(path);
    toast.success("השינוי נשמר.");
  };

  const saveAllDrafts = () => {
    if (!dirtyPaths.length) {
      toast.message("אין שינויים שממתינים לשמירה.");
      return;
    }

    dirtyPaths.forEach((path) => {
      updateContentEntry(path, currentValues[path]);
    });
    setDrafts({});
    toast.success("כל השינויים נשמרו.");
  };

  const resetField = (path) => {
    discardDraft(path);
    resetContentEntry(path);
    toast.success("השדה חזר לנוסח המקורי.");
  };

  if (!isAdminAuthenticated) {
    return (
      <AdminLogin
        password={password}
        setPassword={setPassword}
        isAdminEnabled={isAdminEnabled}
        requiresPassword={requiresPassword}
        onSubmit={(event) => {
          event.preventDefault();
          const didLogin = authenticateAdmin(password);

          if (!didLogin) {
            toast.error("הסיסמה שגויה.");
            return;
          }

          setPassword("");
          toast.success("כניסה בוצעה בהצלחה.");
        }}
      />
    );
  }

  return (
    <div className="bg-slate-100 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-300/70 md:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                Admin Panel
              </p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                ניהול תוכן האתר הנוכחי
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                בוחרים אזור פעיל באתר, משנים טקסט, רואים איך זה ייראה ושומרים רק
                כשמוכנים. תוכן ישן שלא מחובר למסכים הנוכחיים מרוכז בנפרד.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                1. בחר אזור באתר
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                2. שנה את הטקסט
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                3. שמור ובדוק באתר
              </div>
              <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                העריכה נשמרת כרגע בדפדפן הזה בלבד.
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <OverviewCard value={entriesWithMeta.length} label="סה״כ שדות שאפשר לערוך" />
          <OverviewCard
            value={customizedCount}
            label="שדות שכבר נשמרו כמותאמים"
            tone={customizedCount ? "emerald" : "slate"}
          />
          <OverviewCard
            value={dirtyPaths.length}
            label="שינויים שממתינים לשמירה"
            tone={dirtyPaths.length ? "amber" : "slate"}
          />
          <OverviewCard value={visibleCount} label="שדות שמוצגים עכשיו במסך" />
        </section>

        {dirtyPaths.length ? (
          <section className="sticky top-4 z-10 rounded-[1.75rem] border border-amber-200 bg-white/95 p-4 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-medium text-slate-700">
                יש {dirtyPaths.length} שינויים שעדיין לא נשמרו.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-2xl"
                  onClick={discardAllDrafts}
                >
                  בטל את כל הטיוטות
                </Button>
                <Button className="rounded-2xl" onClick={saveAllDrafts}>
                  שמור את כל השינויים
                </Button>
              </div>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 lg:grid-cols-3">
          {pageCounts.map((option) => (
            <PageTile
              key={option.key}
              option={option}
              count={option.count}
              active={activePage === option.key}
              onClick={() => setActivePage(option.key)}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  איתור מהיר של מה שרוצים לשנות
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  אפשר לחפש לפי אזור, לבחור סוג תוכן, להציג רק שדות ששונו או לעבור לתוכן
                  לא פעיל.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 md:flex-row xl:max-w-3xl">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
                  placeholder="חפש למשל: כותרת, פוטר, שאלה, טופס, ליווי פיננסי"
                />
                <label className="inline-flex min-w-fit items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={showChangedOnly}
                    onChange={(event) => setShowChangedOnly(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  הצג רק שדות ששונו
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {QUICK_FILTERS.map((filter) => (
                <FilterChip
                  key={filter.key}
                  label={filter.label}
                  active={activeQuickFilter === filter.key}
                  onClick={() => setActiveQuickFilter(filter.key)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">פעולות כלליות</h2>
              <p className="mt-1 text-sm text-slate-500">
                פעולות רחבות שמשפיעות על כל מסך הניהול.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                className="rounded-2xl"
                onClick={saveAllDrafts}
                disabled={!dirtyPaths.length}
              >
                שמור הכול
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => {
                  const shouldReset = window.confirm(
                    "לאפס את כל הטקסטים המותאמים באתר ולחזור לנוסח המקורי?",
                  );

                  if (!shouldReset) return;

                  setDrafts({});
                  resetAllContent();
                  toast.success("כל הכיתובים הוחזרו לברירת המחדל.");
                }}
              >
                איפוס מלא
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => {
                  logoutAdmin();
                  toast.success("התנתקת ממסך האדמין.");
                }}
              >
                התנתקות
              </Button>
            </div>
          </div>
        </section>

        {groupedSections.length ? (
          groupedSections.map((section) => (
            <section key={section.key} className="space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {section.label}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{section.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
                    {section.entries.length} שדות
                  </div>
                  <Link
                    to={section.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                  >
                    פתח את האזור באתר
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {section.entries.map((item) => (
                  <FieldEditorCard
                    key={item.path}
                    item={item}
                    currentValue={currentValues[item.path]}
                    savedValue={savedValues[item.path]}
                    originalValue={item.value}
                    isDirty={currentValues[item.path] !== savedValues[item.path]}
                    hasSavedOverride={Object.hasOwn(adminOverrides, item.path)}
                    onChange={updateDraft}
                    onSave={saveDraft}
                    onDiscard={discardDraft}
                    onReset={resetField}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};
