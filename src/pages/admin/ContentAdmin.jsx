import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/primitives/Button";
import { useSiteContent } from "../../hooks/useSiteContent";
import { routePaths } from "../../routes/paths";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const PAGE_CONFIG = [
  {
    key: "home",
    label: "דף הבית",
    description: "כותרות, פתיחים, אזור לקוחות ותוכן מרכזי של עמוד הבית.",
    href: routePaths.home,
    matches: ["home."],
  },
  {
    key: "news",
    label: "מאמרים",
    description: "כותרות, כפתורים, הודעות מערכת וטקסטים סביב עמוד המאמרים באתר.",
    href: routePaths.news,
    matches: ["news."],
  },
  {
    key: "contact",
    label: "צור קשר",
    description: "כותרות, שדות טופס, הודעות הצלחה ושגיאה.",
    href: routePaths.contact,
    matches: ["contact.", "modalForm."],
  },
  {
    key: "footer",
    label: "פוטר",
    description: "פרטי קשר, תיאור המותג, קישורים ורשתות חברתיות.",
    href: routePaths.home,
    matches: ["footer."],
  },
  {
    key: "navigation",
    label: "תפריט וגלובלי",
    description: "תפריטים, טקסטי ניווט ואלמנטים כלליים באתר.",
    href: routePaths.home,
    matches: ["nav.", "global."],
  },
  {
    key: "other",
    label: "תוכן נוסף",
    description: "שדות שאינם משויכים לעמודים הראשיים.",
    href: routePaths.home,
    matches: [],
  },
];

const SECTION_LABELS = {
  "home.hero": {
    label: "אזור פתיחה",
    description: "החלק הראשון שהמבקר רואה עם הכניסה לאתר.",
  },
  "home.about": {
    label: "אודות",
    description: "תיאור העסק וההסבר על הערך שאתם נותנים.",
  },
  "home.owner": {
    label: "על הבעלים",
    description: "הצגת האדם שמוביל את השירות והמסר האישי שלו.",
  },
  "home.leadForm": {
    label: "טופס לידים",
    description: "כותרת, תיאור וכפתור של טופס ההשארת פרטים במסך הבית.",
  },
  "home.clients": {
    label: "לקוחות",
    description: "כותרות וטקסטים באזור הלקוחות והאמון.",
  },
  news: {
    label: "עמוד מאמרים",
    description: "טקסטים כלליים של עמוד המאמרים.",
  },
  contact: {
    label: "טופס יצירת קשר",
    description: "השדות וההודעות שהגולש רואה בטופס.",
  },
  modalForm: {
    label: "טופס קופץ",
    description: "טקסטים בטפסים או חלונות קופצים באתר.",
  },
  footer: {
    label: "פוטר",
    description: "האזור התחתון בכל עמוד באתר.",
  },
  nav: {
    label: "תפריט ניווט",
    description: "שמות עמודים וכפתורים בתפריט.",
  },
  global: {
    label: "טקסטים כלליים",
    description: "שדות שמשמשים בכמה מקומות באתר.",
  },
};

const FIELD_METADATA = {
  "home.hero.title": {
    label: "כותרת ראשית",
    helpText: "המשפט המרכזי שמופיע בראש דף הבית.",
    type: "textarea",
    maxLength: 90,
  },
  "home.hero.subtitle": {
    label: "טקסט פתיחה",
    helpText: "הסבר קצר שמופיע מתחת לכותרת הראשית.",
    type: "textarea",
    maxLength: 220,
  },
  "home.about.title": {
    label: "כותרת אזור אודות",
    helpText: "הכותרת של אזור ההיכרות עם העסק.",
    type: "input",
    maxLength: 80,
  },
  "home.about.moreInfo": {
    label: "טקסט כפתור מידע נוסף",
    helpText: "הכיתוב על הכפתור שמוביל למידע נוסף.",
    type: "input",
    maxLength: 30,
  },
  "home.owner.title": {
    label: "שם או כותרת בעלים",
    helpText: "מופיע מעל או ליד הטקסט על הבעלים.",
    type: "input",
    maxLength: 70,
  },
  "home.owner.bio": {
    label: "טקסט על הבעלים",
    helpText: "פסקת ההיכרות שמספרת מי עומד מאחורי העסק.",
    type: "textarea",
    maxLength: 900,
  },
  "home.owner.contact": {
    label: "טקסט כפתור יצירת קשר",
    helpText: "הכיתוב על הכפתור שמניע לפנייה.",
    type: "input",
    maxLength: 35,
  },
  "home.leadForm.title": {
    label: "כותרת טופס לידים",
    helpText: "הכותרת הגדולה של אזור ההשארת פרטים במסך הבית.",
    type: "input",
    maxLength: 40,
  },
  "home.leadForm.description": {
    label: "תיאור טופס לידים",
    helpText: "משפט קצר שמופיע ליד שדות הטופס במסך הבית.",
    type: "textarea",
    maxLength: 140,
  },
  "home.leadForm.submit": {
    label: "כפתור שליחת ליד",
    helpText: "הכיתוב על כפתור השליחה בטופס הקצר במסך הבית.",
    type: "input",
    maxLength: 20,
  },
  "home.clients.title": {
    label: "כותרת אזור לקוחות",
    helpText: "כותרת קצרה שמחזקת אמון והוכחת יכולת.",
    type: "input",
    maxLength: 70,
  },
  "contact.title": {
    label: "כותרת עמוד צור קשר",
    helpText: "הכותרת הראשית של עמוד יצירת הקשר.",
    type: "input",
    maxLength: 80,
  },
  "contact.fullName": {
    label: "תווית שדה שם מלא",
    helpText: "מה שהלקוח רואה ליד שדה השם.",
    type: "input",
    maxLength: 30,
  },
  "contact.email": {
    label: "תווית שדה אימייל",
    helpText: "הכיתוב ליד שדה כתובת האימייל.",
    type: "input",
    maxLength: 30,
  },
  "contact.phone": {
    label: "תווית שדה טלפון",
    helpText: "הכיתוב ליד שדה הטלפון.",
    type: "input",
    maxLength: 30,
  },
  "contact.service": {
    label: "תווית שדה שירות",
    helpText: "הכיתוב ליד בחירת סוג השירות.",
    type: "input",
    maxLength: 30,
  },
  "contact.message": {
    label: "תווית שדה הודעה",
    helpText: "הכיתוב ליד אזור כתיבת ההודעה.",
    type: "input",
    maxLength: 30,
  },
  "contact.submit": {
    label: "טקסט כפתור שליחה",
    helpText: "הכיתוב על כפתור שליחת הטופס.",
    type: "input",
    maxLength: 24,
  },
  "contact.sending": {
    label: "הודעת שליחה",
    helpText: "מופיע בזמן שהטופס נשלח.",
    type: "input",
    maxLength: 40,
  },
  "contact.success": {
    label: "הודעת הצלחה",
    helpText: "מופיעה אחרי שליחה מוצלחת של הטופס.",
    type: "textarea",
    maxLength: 120,
  },
  "contact.error": {
    label: "הודעת שגיאה",
    helpText: "מופיעה אם הייתה תקלה בשליחת הטופס.",
    type: "textarea",
    maxLength: 120,
  },
  "contact.fullNamePlaceholder": {
    label: "טקסט עזר בשדה שם",
    helpText: "טקסט אפור שמופיע בתוך שדה השם.",
    type: "input",
    maxLength: 45,
  },
  "contact.emailPlaceholder": {
    label: "טקסט עזר בשדה אימייל",
    helpText: "טקסט אפור שמופיע בתוך שדה האימייל.",
    type: "input",
    maxLength: 45,
  },
  "contact.messagePlaceholder": {
    label: "טקסט עזר בשדה הודעה",
    helpText: "טקסט אפור שמופיע בתוך שדה ההודעה.",
    type: "textarea",
    maxLength: 80,
  },
  "news.title": {
    label: "כותרת עמוד מאמרים",
    helpText: "הכותרת שמופיעה בראש עמוד המאמרים.",
    type: "input",
    maxLength: 80,
  },
  "news.searchPlaceholder": {
    label: "טקסט חיפוש",
    helpText: "מה שמופיע בתוך תיבת החיפוש לפני שמקלידים.",
    type: "input",
    maxLength: 50,
  },
  "news.readMore": {
    label: "כפתור קרא עוד",
    helpText: "הטקסט שמופיע על כפתור המעבר למאמר.",
    type: "input",
    maxLength: 24,
  },
  "news.noResults": {
    label: "הודעת אין תוצאות",
    helpText: "מופיעה אם לא נמצאו תכנים מתאימים.",
    type: "textarea",
    maxLength: 120,
  },
  "news.showingResults": {
    label: "הודעת מספר תוצאות",
    helpText: "מופיעה מעל רשימת התוצאות. לא למחוק את {count}.",
    type: "input",
    maxLength: 70,
  },
  "news.clearSearch": {
    label: "כפתור ניקוי חיפוש",
    helpText: "הכיתוב על כפתור ניקוי החיפוש.",
    type: "input",
    maxLength: 30,
  },
  "news.relatedTitle": {
    label: "כותרת מאמרים קשורים",
    helpText: "כותרת המקטע שמופיע ליד או מתחת למאמר.",
    type: "input",
    maxLength: 50,
  },
  "news.readArticle": {
    label: "כפתור קריאת מאמר",
    helpText: "כפתור מעבר לעמוד מאמר מלא.",
    type: "input",
    maxLength: 24,
  },
  "news.backToNews": {
    label: "כפתור חזרה למאמרים",
    helpText: "כפתור חזרה מרמת המאמר לעמוד המאמרים.",
    type: "input",
    maxLength: 30,
  },
  "news.publishedOn": {
    label: "תבנית תאריך פרסום",
    helpText: "לא למחוק את {date}, הוא מוחלף אוטומטית בתאריך.",
    type: "input",
    maxLength: 60,
  },
  "news.readTime": {
    label: "תבנית זמן קריאה",
    helpText: "לא למחוק את {minutes}, הוא מוחלף אוטומטית במספר דקות.",
    type: "input",
    maxLength: 60,
  },
  "news.notFoundTitle": {
    label: "כותרת מאמר לא נמצא",
    helpText: "מופיעה כאשר קישור למאמר אינו קיים.",
    type: "input",
    maxLength: 80,
  },
  "news.notFoundMessage": {
    label: "הודעת מאמר לא נמצא",
    helpText: "הסבר קצר שמופיע כאשר המאמר לא נמצא.",
    type: "textarea",
    maxLength: 140,
  },
  "footer.brandTitle": {
    label: "שם המותג בפוטר",
    helpText: "השם שמופיע בתחתית האתר.",
    type: "input",
    maxLength: 60,
  },
  "footer.brandDescription": {
    label: "תיאור קצר בפוטר",
    helpText: "משפט שמסביר בקצרה מה העסק עושה.",
    type: "textarea",
    maxLength: 180,
  },
  "footer.addressTitle": {
    label: "כותרת כתובת",
    helpText: "כותרת אזור הכתובת או פרטי המיקום.",
    type: "input",
    maxLength: 40,
  },
  "footer.quickLinksTitle": {
    label: "כותרת קישורים מהירים",
    helpText: "כותרת אזור הקישורים בפוטר.",
    type: "input",
    maxLength: 40,
  },
  "footer.socialTitle": {
    label: "כותרת רשתות חברתיות",
    helpText: "כותרת אזור הרשתות החברתיות.",
    type: "input",
    maxLength: 40,
  },
  "footer.copyright": {
    label: "זכויות יוצרים",
    helpText: "השורה התחתונה ביותר בפוטר.",
    type: "input",
    maxLength: 90,
  },
};

const prettifySegment = (segment) =>
  segment
    .replace(/\.(\d+)/g, " $1")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();

const getPageConfig = (path) =>
  PAGE_CONFIG.find((page) =>
    page.matches.some((prefix) => path.startsWith(prefix)),
  ) ?? PAGE_CONFIG.at(-1);

const getSectionMeta = (path) => {
  const parts = path.split(".");
  const sectionKey =
    parts.length >= 2 ? `${parts[0]}.${parts[1]}` : parts[0] ?? "other";

  return (
    SECTION_LABELS[sectionKey] ??
    SECTION_LABELS[parts[0]] ?? {
      label: prettifySegment(parts.slice(0, -1).join(" ")) || "תוכן נוסף",
      description: "שדה תוכן כללי באתר.",
    }
  );
};

const inferFieldType = (path, value) => {
  if (path.toLowerCase().includes("placeholder")) {
    return "input";
  }

  if (typeof value === "string" && value.length <= 70 && !value.includes("\n")) {
    return "input";
  }

  return "textarea";
};

const inferMaxLength = (path, value) => {
  if (path.toLowerCase().includes("title")) return 90;
  if (path.toLowerCase().includes("placeholder")) return 45;
  if (path.toLowerCase().includes("subtitle")) return 220;
  if (typeof value === "string" && value.length <= 70) return 80;
  return 280;
};

const getFieldMeta = (item) => {
  const configured = FIELD_METADATA[item.path];
  return {
    label: configured?.label ?? prettifySegment(item.path.split(".").at(-1) ?? item.path),
    helpText:
      configured?.helpText ??
      "זהו טקסט שמוצג למבקרים באתר. כדאי לשמור על ניסוח קצר וברור.",
    type: configured?.type ?? inferFieldType(item.path, item.value),
    maxLength: configured?.maxLength ?? inferMaxLength(item.path, item.value),
  };
};

const getCharacterTone = (valueLength, maxLength) => {
  if (!maxLength) {
    return "text-slate-400";
  }

  if (valueLength > maxLength) {
    return "text-rose-600";
  }

  if (valueLength >= maxLength * 0.85) {
    return "text-amber-600";
  }

  return "text-slate-400";
};

const AdminLogin = ({ password, setPassword, onSubmit, requiresPassword }) => (
  <div className="min-h-[calc(100vh-10rem)] bg-slate-100 px-4 py-12">
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          עריכת תוכן פשוטה
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {requiresPassword
            ? "הזן סיסמת אדמין כדי לערוך את הטקסטים באתר בלי לגעת בקוד."
            : "לא הוגדרה סיסמת אדמין ב־env, לכן מסך העריכה פתוח כרגע בסביבה המקומית."}
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
          כניסה למסך העריכה
        </Button>
      </form>
    </div>
  </div>
);

const PageTab = ({ page, active, count, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-3xl border p-5 text-right transition ${
      active
        ? "border-slate-950 bg-slate-950 text-white shadow-xl shadow-slate-300/40"
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
          עמוד
        </p>
        <h2 className="mt-2 text-xl font-semibold">{page.label}</h2>
        <p
          className={`mt-2 text-sm leading-6 ${
            active ? "text-slate-200" : "text-slate-500"
          }`}
        >
          {page.description}
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

const EmptyState = () => (
  <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-500">
    לא נמצאו שדות שתואמים לחיפוש או למסנן שנבחר.
  </section>
);

const FieldEditorCard = ({
  item,
  currentValue,
  savedValue,
  isDirty,
  onChange,
  onSave,
  onDiscard,
  onReset,
}) => {
  const { type, maxLength, helpText } = item.fieldMeta;
  const InputTag = type === "input" ? "input" : "textarea";
  const currentLength = currentValue.length;
  const isTooLong = maxLength ? currentLength > maxLength : false;

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {item.sectionLabel}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            {item.label}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{helpText}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {isDirty ? (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              יש שינוי שלא נשמר
            </span>
          ) : (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              נשמר
            </span>
          )}
          <span
            className={`text-xs font-medium ${getCharacterTone(
              currentLength,
              maxLength,
            )}`}
          >
            {maxLength
              ? `${currentLength}/${maxLength} תווים מומלצים`
              : `${currentLength} תווים`}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          טקסט חדש
        </label>
        <InputTag
          value={currentValue}
          onChange={(event) => onChange(item.path, event.target.value)}
          className={`w-full rounded-2xl border px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
            isTooLong
              ? "border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-rose-100"
              : "border-slate-300 bg-white focus:border-slate-500 focus:ring-slate-200"
          } ${type === "textarea" ? "min-h-36 resize-y" : ""}`}
        />
        {isTooLong ? (
          <p className="mt-2 text-sm text-rose-600">
            הטקסט ארוך מהמומלץ ועלול לשבור את העיצוב בחלק מהמסכים.
          </p>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            מה שמופיע כרגע באתר
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {savedValue}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            תצוגה אחרי השמירה
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-900">
            {currentValue}
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
            צפה בעמוד
          </Link>
          <details className="text-xs text-slate-500">
            <summary className="cursor-pointer select-none font-medium">
              פרטים מתקדמים
            </summary>
            <p className="mt-2 font-mono text-[11px] text-slate-400">
              {item.path}
            </p>
          </details>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="text"
            className="rounded-xl px-0 text-slate-500 hover:text-slate-900"
            onClick={() => onDiscard(item.path)}
            disabled={!isDirty}
          >
            בטל שינוי
          </Button>
          <Button
            variant="text"
            className="rounded-xl px-0 text-rose-600 hover:text-rose-700"
            onClick={() => onReset(item.path)}
          >
            החזר לברירת מחדל
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
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [showChangedOnly, setShowChangedOnly] = useState(false);
  const [drafts, setDrafts] = useState({});

  const entriesWithMeta = useMemo(
    () =>
      adminEntries.map((item) => {
        const page = getPageConfig(item.path);
        const section = getSectionMeta(item.path);
        const fieldMeta = getFieldMeta(item);

        return {
          ...item,
          pageKey: page.key,
          pageLabel: page.label,
          href: page.href,
          sectionLabel: section.label,
          sectionDescription: section.description,
          label: fieldMeta.label,
          fieldMeta,
        };
      }),
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

        if (!normalizedQuery) {
          return true;
        }

        return [
          item.pageLabel,
          item.sectionLabel,
          item.label,
          item.fieldMeta.helpText,
          currentValues[item.path],
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      }),
    [
      activePage,
      currentValues,
      entriesWithMeta,
      normalizedQuery,
      savedValues,
      showChangedOnly,
    ],
  );

  const groupedEntries = useMemo(
    () =>
      filteredEntries.reduce((groups, item) => {
        if (!groups[item.sectionLabel]) {
          groups[item.sectionLabel] = {
            key: item.sectionLabel,
            label: item.sectionLabel,
            description: item.sectionDescription,
            entries: [],
          };
        }

        groups[item.sectionLabel].entries.push(item);
        return groups;
      }, {}),
    [filteredEntries],
  );

  const groupedSections = useMemo(
    () => Object.values(groupedEntries),
    [groupedEntries],
  );

  const pageCounts = useMemo(
    () =>
      PAGE_CONFIG.map((page) => ({
        ...page,
        count: entriesWithMeta.filter((item) => item.pageKey === page.key).length,
      })),
    [entriesWithMeta],
  );

  const requiresPassword = Boolean(ADMIN_PASSWORD);

  const updateDraft = (path, value) => {
    setDrafts((previous) => ({
      ...previous,
      [path]: value,
    }));
  };

  const discardDraft = (path) => {
    setDrafts((previous) => {
      const next = { ...previous };
      delete next[path];
      return next;
    });
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
                עריכת תוכן בלי קוד
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                בוחרים עמוד, משנים טקסט בשפה פשוטה, רואים איך הוא ייראה ושומרים
                רק כשמוכנים.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {dirtyPaths.length
                  ? `${dirtyPaths.length} שינויים ממתינים לשמירה`
                  : "כל השינויים נשמרו"}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {Object.keys(adminOverrides).length} שדות כבר עודכנו באתר הזה
              </div>
              <Button
                className="rounded-2xl bg-white px-5 text-slate-950 hover:bg-slate-100"
                onClick={saveAllDrafts}
                disabled={!dirtyPaths.length}
              >
                שמור הכל
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/20"
                onClick={() => {
                  setDrafts({});
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
          {pageCounts.map((page) => (
            <PageTab
              key={page.key}
              page={page}
              count={page.count}
              active={activePage === page.key}
              onClick={() => setActivePage(page.key)}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                חיפוש ועריכה
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                חפש לפי עמוד, אזור או שם שדה. המזהים הטכניים הוסתרו כדי שהעריכה
                תהיה פשוטה יותר.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:flex-row lg:max-w-2xl">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
                placeholder="חפש למשל: כותרת, טופס, פוטר, מאמרים"
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
        </section>

        {groupedSections.length ? (
          groupedSections.map((section) => (
            <section key={section.key} className="space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {section.label}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {section.description}
                  </p>
                </div>

                <Link
                  to={filteredEntries.find((item) => item.sectionLabel === section.label)?.href ?? routePaths.home}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                >
                  צפה באזור באתר
                </Link>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {section.entries.map((item) => (
                  <FieldEditorCard
                    key={item.path}
                    item={item}
                    currentValue={currentValues[item.path]}
                    savedValue={savedValues[item.path]}
                    isDirty={currentValues[item.path] !== savedValues[item.path]}
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
