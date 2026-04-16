import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/primitives/Button";
import { useSiteContent } from "../../hooks/useSiteContent";
import { routePaths } from "../../routes/paths";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const AUTOSAVE_DELAY = 500;

const SECTION_CONFIG = [
  {
    key: "hero",
    label: "Hero",
    description: "כותרת ראשית והפתיח בדף הבית",
    match: (path) => path.startsWith("home.hero."),
    href: routePaths.home,
  },
  {
    key: "home",
    label: "דף הבית",
    description: "בועות, אודות, בעלים ולקוחות",
    match: (path) =>
      path.startsWith("home.") && !path.startsWith("home.hero."),
    href: routePaths.home,
  },
  {
    key: "footer",
    label: "Footer",
    description: "מותג, קישורים ופרטי יצירת קשר בתחתית האתר",
    match: (path) => path.startsWith("footer."),
    href: routePaths.home,
  },
  {
    key: "contact",
    label: "טופס צור קשר",
    description: "כותרות, placeholders והודעות בטופס",
    match: (path) => path.startsWith("contact."),
    href: routePaths.contact,
  },
  {
    key: "news",
    label: "News",
    description: "מאמרים, חדשות פיננסיות ותוויות כרטיסים",
    match: (path) =>
      path.startsWith("news.") ||
      path.startsWith("financialNews.") ||
      path.startsWith("newsLabels."),
    href: routePaths.news,
  },
  {
    key: "nav",
    label: "ניווט",
    description: "תפריטים וכפתורי ניווט גלובליים",
    match: (path) => path.startsWith("nav."),
    href: routePaths.home,
  },
  {
    key: "other",
    label: "שאר האתר",
    description: "שדות שאינם שייכים לקבוצות הראשיות",
    match: () => true,
    href: routePaths.home,
  },
];

const FIELD_LABELS = {
  "home.hero.title": "כותרת ראשית",
  "home.hero.subtitle": "כותרת משנה",
  "home.about.title": "כותרת אודות",
  "home.about.moreInfo": "כפתור מידע נוסף",
  "home.owner.title": "שם בעלים",
  "home.owner.bio": "ביוגרפיה בעלים",
  "home.owner.contact": "כפתור יצירת קשר עם הבעלים",
  "home.clients.title": "כותרת לקוחות",
  "footer.brandTitle": "שם המותג",
  "footer.brandDescription": "תיאור מותג",
  "footer.addressTitle": "כותרת כתובת",
  "footer.quickLinksTitle": "כותרת קישורים מהירים",
  "footer.socialTitle": "כותרת רשתות חברתיות",
  "footer.copyright": "טקסט זכויות",
  "contact.title": "כותרת עמוד צור קשר",
  "contact.fullName": "תווית שם מלא",
  "contact.email": "תווית אימייל",
  "contact.phone": "תווית טלפון",
  "contact.service": "תווית שירות",
  "contact.message": "תווית הודעה",
  "contact.submit": "כפתור שליחה",
  "contact.sending": "הודעת שליחה",
  "contact.success": "הודעת הצלחה",
  "contact.error": "הודעת שגיאה",
  "contact.fullNamePlaceholder": "Placeholder שם מלא",
  "contact.emailPlaceholder": "Placeholder אימייל",
  "contact.messagePlaceholder": "Placeholder הודעה",
  "newsLabels.readMore": "כפתור קרא עוד",
  "newsLabels.imageAlt": "Alt של תמונת כתבה",
};

const FILTERS = [
  { key: "all", label: "הכל" },
  { key: "edited", label: "רק שדות ששונו" },
  { key: "home", label: "דף הבית" },
  { key: "hero", label: "Hero" },
  { key: "contact", label: "טופס צור קשר" },
  { key: "news", label: "News" },
  { key: "footer", label: "Footer" },
];

const prettifySegment = (segment) =>
  segment
    .replace(/\.(\d+)/g, " $1")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();

const getSectionConfig = (path) =>
  SECTION_CONFIG.find((section) => section.match(path)) ?? SECTION_CONFIG.at(-1);

const getHumanLabel = (path) => {
  if (FIELD_LABELS[path]) {
    return FIELD_LABELS[path];
  }

  const parts = path.split(".");
  return prettifySegment(parts.at(-1) ?? path);
};

const getHumanDescription = (path) => {
  const parts = path.split(".");
  if (parts.length <= 1) {
    return path;
  }

  return parts.slice(0, -1).map(prettifySegment).join(" / ");
};

const AdminLogin = ({ password, setPassword, onSubmit, requiresPassword }) => (
  <div className="min-h-[calc(100vh-10rem)] bg-slate-100 px-4 py-12">
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          עריכת כיתובים באתר
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {requiresPassword
            ? "הזן סיסמת אדמין כדי לנהל את כל הטקסטים באתר."
            : "לא הוגדרה סיסמת אדמין ב־env, לכן דף הניהול פתוח כרגע בסביבה המקומית."}
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        {requiresPassword ? (
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              סיסמה
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
              placeholder="הקלד סיסמה"
            />
          </label>
        ) : null}

        <Button className="w-full rounded-2xl py-3 text-base" type="submit">
          כניסה למסך אדמין
        </Button>
      </form>
    </div>
  </div>
);

const StatusPill = ({ status }) => {
  if (status === "dirty") {
    return (
      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
        יש שינויים שלא נשמרו
      </span>
    );
  }

  if (status === "saved") {
    return (
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        נשמר
      </span>
    );
  }

  return null;
};

const FilterButton = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
      active
        ? "border-slate-900 bg-slate-900 text-white"
        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
    }`}
  >
    {children}
  </button>
);

const SectionSummaryCard = ({ section, count, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-3xl border p-5 text-right transition ${
      active
        ? "border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-300/40"
        : "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300"
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
            active ? "text-slate-300" : "text-slate-400"
          }`}
        >
          Section
        </p>
        <h3 className="mt-2 text-xl font-semibold">{section.label}</h3>
        <p
          className={`mt-2 text-sm leading-6 ${
            active ? "text-slate-200" : "text-slate-500"
          }`}
        >
          {section.description}
        </p>
      </div>
      <div
        className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
          active ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"
        }`}
      >
        {count}
      </div>
    </div>
  </button>
);

const ContentEditorCard = ({
  item,
  currentValue,
  onChange,
  onFlush,
  onReset,
  isEdited,
  status,
}) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {item.sectionLabel}
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          {item.label}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{item.description}</p>
        <p className="mt-2 font-mono text-xs text-slate-400">{item.path}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        {isEdited ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            עודכן
          </span>
        ) : null}
        <StatusPill status={status} />
      </div>
    </div>

    <textarea
      value={currentValue}
      onChange={(event) => onChange(item.path, event.target.value)}
      onBlur={() => onFlush(item.path)}
      className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white focus:ring-4 focus:ring-slate-200"
    />

    <div className="mt-4 grid gap-3 md:grid-cols-2">
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          תצוגה נוכחית
        </p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">
          {currentValue}
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          ברירת מחדל
        </p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {item.value}
        </p>
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="text-xs text-slate-500">
        אזור באתר: {item.sectionLabel}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={item.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
        >
          פתח את האזור באתר
        </Link>
        <Button
          variant="text"
          className="rounded-xl px-0 text-rose-600 hover:text-rose-700"
          onClick={() => onReset(item.path)}
        >
          אפס שדה
        </Button>
      </div>
    </div>
  </article>
);

export const ContentAdmin = () => {
  const {
    adminEntries,
    adminOverrides,
    isAdminAuthenticated,
    authenticateAdmin,
    logoutAdmin,
    updateContentEntry,
    resetContentEntry,
    resetAllContent,
  } = useSiteContent();
  const [query, setQuery] = useState("");
  const [password, setPassword] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [drafts, setDrafts] = useState({});
  const [saveStates, setSaveStates] = useState({});

  const entriesWithMeta = useMemo(
    () =>
      adminEntries.map((item) => {
        const section = getSectionConfig(item.path);

        return {
          ...item,
          sectionKey: section.key,
          sectionLabel: section.label,
          href: section.href,
          label: getHumanLabel(item.path),
          description: getHumanDescription(item.path),
        };
      }),
    [adminEntries],
  );

  const currentValues = useMemo(
    () =>
      Object.fromEntries(
        entriesWithMeta.map((item) => [
          item.path,
          drafts[item.path] ?? adminOverrides[item.path] ?? item.value,
        ]),
      ),
    [adminOverrides, drafts, entriesWithMeta],
  );

  useEffect(() => {
    const dirtyEntries = entriesWithMeta.filter((item) => {
      const draftValue = drafts[item.path];
      if (draftValue === undefined) {
        return false;
      }

      const persistedValue = adminOverrides[item.path] ?? item.value;
      return draftValue !== persistedValue;
    });

    if (!dirtyEntries.length) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dirtyEntries.forEach((item) => {
        updateContentEntry(item.path, drafts[item.path]);
      });

      setSaveStates((previous) => {
        const next = { ...previous };
        dirtyEntries.forEach((item) => {
          next[item.path] = "saved";
        });
        return next;
      });
    }, AUTOSAVE_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [adminOverrides, drafts, entriesWithMeta, updateContentEntry]);

  useEffect(() => {
    const savedPaths = Object.entries(saveStates)
      .filter(([, status]) => status === "saved")
      .map(([path]) => path);

    if (!savedPaths.length) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSaveStates((previous) => {
        const next = { ...previous };
        savedPaths.forEach((path) => {
          if (next[path] === "saved") {
            delete next[path];
          }
        });
        return next;
      });
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [saveStates]);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return entriesWithMeta.filter((item) => {
      const currentValue = currentValues[item.path];
      const matchesQuery =
        !normalizedQuery ||
        `${item.path} ${item.label} ${item.description} ${currentValue}`
          .toLowerCase()
          .includes(normalizedQuery);

      if (!matchesQuery) {
        return false;
      }

      if (activeFilter === "all") {
        return true;
      }

      if (activeFilter === "edited") {
        return currentValue !== item.value;
      }

      return item.sectionKey === activeFilter;
    });
  }, [activeFilter, currentValues, entriesWithMeta, query]);

  const groupedEntries = useMemo(
    () =>
      SECTION_CONFIG.map((section) => ({
        ...section,
        entries: filteredEntries.filter((item) => item.sectionKey === section.key),
      })).filter((section) => section.entries.length > 0),
    [filteredEntries],
  );

  const sectionCounts = useMemo(
    () =>
      SECTION_CONFIG.map((section) => ({
        ...section,
        count: entriesWithMeta.filter((item) => item.sectionKey === section.key).length,
      })).filter((section) => section.count > 0),
    [entriesWithMeta],
  );

  const editedCount = Object.keys(adminOverrides).length;
  const unsavedCount = Object.values(saveStates).filter(
    (status) => status === "dirty",
  ).length;
  const requiresPassword = Boolean(ADMIN_PASSWORD);

  const handleDraftChange = (path, value) => {
    setDrafts((previous) => ({
      ...previous,
      [path]: value,
    }));
    setSaveStates((previous) => ({
      ...previous,
      [path]: "dirty",
    }));
  };

  const flushDraft = (path) => {
    const draftValue = drafts[path];
    if (draftValue === undefined) {
      return;
    }

    updateContentEntry(path, draftValue);
    setSaveStates((previous) => ({
      ...previous,
      [path]: "saved",
    }));
  };

  const handleResetContent = (path) => {
    setDrafts((previous) => {
      const next = { ...previous };
      delete next[path];
      return next;
    });
    setSaveStates((previous) => {
      const next = { ...previous };
      delete next[path];
      return next;
    });
    resetContentEntry(path);
    toast.success("השדה חזר לברירת המחדל.");
  };

  if (!isAdminAuthenticated) {
    return (
      <AdminLogin
        password={password}
        setPassword={setPassword}
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
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                Admin Panel
              </p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                ניהול כל הכיתובים באתר
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                המסך מחולק לאזורים, כולל חיפוש, preview חי, קפיצה מהירה לאתר
                וחיווי autosave ברור לכל שדה.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {editedCount} שדות עודכנו
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {unsavedCount ? `${unsavedCount} ממתינים לשמירה` : "כל השינויים נשמרו"}
              </div>
              <Button
                variant="outline"
                className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/20"
                onClick={() => {
                  setDrafts({});
                  setSaveStates({});
                  resetAllContent();
                  toast.success("כל הכיתובים הוחזרו לברירת המחדל.");
                }}
              >
                איפוס מלא
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10"
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

        <section className="grid gap-4 lg:grid-cols-3">
          {sectionCounts.map((section) => (
            <SectionSummaryCard
              key={section.key}
              section={section}
              count={section.count}
              active={activeFilter === section.key}
              onClick={() => setActiveFilter(section.key)}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  חיפוש ועריכה
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  אפשר לסנן לפי אזור, לראות רק שדות ששונו, ולחפש לפי שם ידידותי
                  או לפי מזהה טכני.
                </p>
              </div>

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200 md:max-w-md"
                placeholder="חפש כיתוב, תיאור או path"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <FilterButton
                  key={filter.key}
                  active={activeFilter === filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </FilterButton>
              ))}
            </div>
          </div>
        </section>

        {groupedEntries.length ? (
          groupedEntries.map((section) => (
            <section key={section.key} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {section.label}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {section.description}
                  </p>
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

              <div className="grid gap-4 xl:grid-cols-2">
                {section.entries.map((item) => {
                  const currentValue = currentValues[item.path];
                  const isEdited = currentValue !== item.value;

                  return (
                    <ContentEditorCard
                      key={item.path}
                      item={item}
                      currentValue={currentValue}
                      isEdited={isEdited}
                      status={saveStates[item.path]}
                      onChange={handleDraftChange}
                      onFlush={flushDraft}
                      onReset={handleResetContent}
                    />
                  );
                })}
              </div>
            </section>
          ))
        ) : (
          <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-500">
            לא נמצאו שדות שתואמים לחיפוש או לסינון שבחרת.
          </section>
        )}
      </div>
    </div>
  );
};
