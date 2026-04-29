import { routePaths, routes } from "../../../routes/paths";

export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.trim();

export const PAGE_OPTIONS = [
  {
    key: "all",
    label: "כל התוכן הפעיל",
    description: "כל הטקסטים שמחוברים כרגע למסכים הפעילים באתר.",
  },
  {
    key: "home",
    label: "דף הבית",
    description: "כותרות, אזור אודות, בעל העסק, לקוחות ושאלות נפוצות.",
  },
  {
    key: "services",
    label: "שירותים",
    description: "עמוד השירותים ודפי השירות: תוכנית עסקית, מצגות, ייעוץ ומכירה.",
  },
  {
    key: "news",
    label: "מאמרים",
    description: "כותרות, חיפוש, כפתורים והודעות במאמרים.",
  },
  {
    key: "contact",
    label: "צור קשר וטפסים",
    description: "עמוד צור קשר והטפסים באתר.",
  },
  {
    key: "global",
    label: "תפריט, פוטר וכללי",
    description: "ניווט, פוטר וטקסטים שחוזרים בכמה מקומות באתר.",
  },
];

export const QUICK_FILTERS = [
  { key: "all", label: "הכול" },
  { key: "headlines", label: "כותרות" },
  { key: "buttons", label: "כפתורים וקישורים" },
  { key: "forms", label: "טפסים והודעות" },
  { key: "longText", label: "טקסטים ארוכים" },
  { key: "lists", label: "רשימות ושאלות" },
];

export const PAGE_META = {
  home: {
    label: "דף הבית",
    href: routePaths.home,
  },
  services: {
    label: "שירותים",
    href: routes.sectorDetail("business-plan"),
  },
  news: {
    label: "מאמרים",
    href: routePaths.news,
  },
  contact: {
    label: "צור קשר וטפסים",
    href: routePaths.contact,
  },
  global: {
    label: "תפריט, פוטר וכללי",
    href: routePaths.home,
  },
};

export const SECTION_LABELS = {
  "home.hero": {
    label: "המסך הראשון בדף הבית",
    description: "הכותרת והמשפט שהמבקר רואה מיד כשהוא נכנס לאתר.",
  },
  "home.about": {
    label: "אזור אודות בדף הבית",
    description: "ההסבר הראשי על העסק והערך שהוא נותן.",
  },
  "home.owner": {
    label: "אזור בעל העסק",
    description: "ההיכרות האישית והמסר המקצועי של בעל העסק.",
  },
  "home.leadForm": {
    label: "טופס לידים בדף הבית",
    description: "הכותרת, התיאור והכפתור של אזור השארת הפרטים.",
  },
  "home.faq": {
    label: "שאלות ותשובות",
    description: "שאלות נפוצות ותשובות שמסירות חסמים ללקוח.",
  },
  "home.clients": {
    label: "לקוחות וסקטורים",
    description: "אזור האמון והתחומים שבהם העסק פועל.",
  },
  news: {
    label: "עמוד מאמרים",
    description: "הטקסטים שסביב אזור המאמרים והחיפוש.",
  },
  contact: {
    label: "עמוד צור קשר",
    description: "שדות, כפתורים והודעות בעמוד יצירת הקשר.",
  },
  modalForm: {
    label: "טפסים קופצים",
    description: "טקסטים שמופיעים בחלונות או בטפסים קצרים באתר.",
  },
  footer: {
    label: "פוטר",
    description: "האזור התחתון של האתר עם פרטי קשר וקישורים.",
  },
  nav: {
    label: "תפריט עליון",
    description: "שמות עמודים, ניווט וכפתורים בתפריט.",
  },
  global: {
    label: "טקסטים כלליים",
    description: "כיתובים שחוזרים בכמה חלקים באתר.",
  },
};

export const SEGMENT_LABELS = {
  title: "כותרת",
  subtitle: "כותרת משנה",
  description: "תיאור",
  body: "פסקה",
  label: "שם שמוצג באתר",
  submit: "כפתור שליחה",
  contact: "כפתור יצירת קשר",
  searchPlaceholder: "טקסט עזר בשדה חיפוש",
  placeholder: "טקסט עזר",
  fullName: "תווית שם מלא",
  fullNamePlaceholder: "טקסט עזר בשדה שם",
  email: "תווית אימייל",
  emailPlaceholder: "טקסט עזר בשדה אימייל",
  phone: "תווית טלפון",
  service: "תווית בחירת שירות",
  message: "תווית הודעה",
  messagePlaceholder: "טקסט עזר בשדה הודעה",
  success: "הודעת הצלחה",
  error: "הודעת שגיאה",
  sending: "הודעת שליחה",
  noResults: "הודעת אין תוצאות",
  readArticle: "כפתור קריאת מאמר",
  backToNews: "כפתור חזרה למאמרים",
  clearSearch: "כפתור ניקוי חיפוש",
  viewDetails: "כפתור צפייה בפרטים",
  relatedTitle: "כותרת מאמרים קשורים",
  publishedOn: "נוסח תאריך פרסום",
  readTime: "נוסח זמן קריאה",
  notFoundTitle: "כותרת כאשר פריט לא נמצא",
  notFoundMessage: "הודעה כאשר פריט לא נמצא",
  missionTitle: "כותרת המשימה",
  missionStatement: "משפט המשימה",
  aboutSubtitle: "כותרת אודות",
  aboutText: "טקסט אודות",
  coreValuesTitle: "כותרת ערכי ליבה",
  storyTitle: "כותרת הסיפור",
  storyP1: "פסקה ראשונה בסיפור",
  storyP2: "פסקה שנייה בסיפור",
  p1: "פסקה ראשונה",
  p2: "פסקה שנייה",
  p3: "פסקה שלישית",
  bio: "ביוגרפיה",
  summary: "סיכום",
  selectPlaceholder: "טקסט עזר בבחירת שירות",
  showingResults: "נוסח תוצאות חיפוש",
  bubbleTitle: "כותרת הבועות",
  icon: "אייקון",
  brandTitle: "שם העסק בפוטר",
  brandDescription: "תיאור קצר בפוטר",
  addressTitle: "כותרת כתובת",
  quickLinksTitle: "כותרת קישורים מהירים",
  socialTitle: "כותרת רשתות חברתיות",
  copyright: "זכויות יוצרים",
};
