import {
  BarChart3,
  Building2,
  FileText,
  Handshake,
  Monitor,
  Presentation,
  Settings,
  Target,
  TrendingUp,
} from "lucide-react";
import { RelatedArticlesSection } from "../../components/common/sector/RelatedArticlesSection";
import { SectorHeroActions } from "../../components/common/sector/SectorHeroActions";
import {
  HeroBackground,
  HeroStatGrid,
  SectionHeader,
} from "../../components/common/sector/SectorPagePrimitives";

const heroStats = [
  ["360°", "ניהול פיננסי מלא"],
  ["8", "תחומי שירות"],
  ["100%", "מבוסס נתונים"],
];

const services = [
  {
    icon: BarChart3,
    title: "רווחיות ותמחור",
    items: [
      "תמחור נכון של מוצרים ושירותים",
      "ניתוח רווחיות לפי לקוח, מוצר וערוץ",
      "זיהוי הפסדים נסתרים בפעילות",
    ],
    result: "הבנה מלאה היכן העסק מרוויח ומה גורם לדליפת כסף",
  },
  {
    icon: Target,
    title: "ניהול ובקרה פיננסית",
    items: [
      "תקציב שנתי ורב שנתי",
      "מעקב שוטף תקציב מול ביצוע",
      "התרעות מוקדמות על חריגות",
    ],
    result: "שליטה אמיתית בכסף לא רק בדיעבד, אלא בזמן אמת",
  },
  {
    icon: Building2,
    title: "מודל עסקי ובדיקות כדאיות",
    items: [
      "בניית מודל עסקי פיננסי מלא",
      "בדיקות כדאיות לפעילויות חדשות",
      "ניתוח השפעת החלטות על הרווחיות",
    ],
    result: "קבלת החלטות עסקיות מבוססות מספרים ולא תחושות בטן",
  },
  {
    icon: TrendingUp,
    title: "מדדים ותמריצים",
    items: [
      "בניית מערכת KPI's לכל מחלקה",
      "תכניות תגמול מבוססות ביצועים",
      "מדידה ומעקב שוטף אחר יעדים",
    ],
    result: "עובדים שמכוונים להצלחה, עם מדדים ברורים וישיגים",
  },
  {
    icon: Presentation,
    title: "תחזיות ותכנון קדימה",
    items: [
      "בניית Forecast פיננסי לטווח קצר וארוך",
      "תרחישי What If לקבלת החלטות",
      "מצגות עסקיות לבעלים ולמשקיעים",
    ],
    result: "ראייה קדימה ברורה לא רק מה שהיה, אלא לאן הולכים",
  },
  {
    icon: Monitor,
    title: "דוחות ודשבורדים",
    items: [
      'דשבורד מנכ"ל עם מדדי מפתח',
      "דוחות ניהוליים חודשיים",
      "ניתוח נתונים מעמיק לפי צורך",
    ],
    result: "תמונת מצב עסקית ברורה בכל זמן, בלחיצת כפתור",
  },
  {
    icon: Handshake,
    title: "שותפות עסקית",
    items: [
      "עבודה צמודה מול ההנהלה",
      "חיבור הנתונים הכספיים לפעילות השוטפת",
      "תמיכה בתהליכי קבלת החלטות",
    ],
    result: "שותף פיננסי אמיתי שמבין את העסק ולא רק את הספרות",
  },
  {
    icon: Settings,
    title: "התייעלות ושיפור ביצועים",
    items: [
      "ניתוח הוצאות וזיהוי חיסכון פוטנציאלי",
      "בניית תכנית התייעלות מדויקת",
      "שיפור תהליכים פיננסיים פנימיים",
    ],
    result: "פחות בזבוז, יותר רווח בלי לפגוע בצמיחה",
  },
  {
    icon: FileText,
    title: "מצגות חברה",
    items: [
      "בניית מצגות עסקיות להנהלה, בעלים ומשקיעים",
      "תרגום נתונים פיננסיים לסיפור עסקי ברור",
      "הצגת KPI's, תחזיות ותובנות בצורה ממוקדת",
    ],
    result: "מצגת מקצועית שמחברת בין המספרים לבין ההחלטה העסקית",
  },
];

const processSteps = [
  {
    title: "עושים סדר במספרים",
    text: "ממפים את הנתונים הפיננסיים ומבינים את המצב האמיתי של העסק",
  },
  {
    title: "בונים תכנית פיננסית",
    text: "יוצרים תקציב, מודל עסקי ויעדים ברורים לטווח הקצר והארוך",
  },
  {
    title: "מזהים רווחיות ובעיות",
    text: "מאתרים איפה הכסף נמצא, איפה הוא נעלם, ומה צריך לשנות",
  },
  {
    title: "משפרים ביצועים",
    text: "מיישמים שינויים, עוקבים אחר תוצאות ומתכווננים לפי הנתונים",
  },
  {
    title: "מנהלים מבוסס נתונים",
    text: "שותפות שוטפת עם ההנהלה, דוחות, מדדים, תחזיות והחלטות",
  },
];

const Hero = () => (
  <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
    <HeroBackground />
    <div className="relative mx-auto w-full max-w-7xl">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white">
          <Presentation className="h-4 w-4" />
          G.D Finance
        </div>
        <h1 className="font-serif text-4xl font-black leading-tight md:text-6xl">
          מחלקה כלכלית
          <span className="block">במיקור חוץ</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-9 text-white/70">
          ניהול פיננסי אסטרטגי ומלא לעסק שלך — רווחיות, שליטה ותכנון קדימה — ללא הצורך
          לגייס CFO פנימי.
        </p>
        <SectorHeroActions className="mt-10" />
      </div>
      <HeroStatGrid stats={heroStats} cols={3} />
    </div>
  </section>
);

const ServicesSection = () => (
  <section
    id="services"
    className="scroll-mt-24 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
  >
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        compact
        label="תחומי שירות"
        title="מה אנחנו עושים בשבילך"
        text="כל שירות מתורגם לאחת שאלה אחת: איך העסק שלך מרוויח יותר, בשליטה מלאה."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <article
              key={service.title}
              className="group rounded-2xl border border-slate-200 bg-stone-50 p-6 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold text-slate-900">תוצאה:</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {service.result}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="bg-stone-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        compact
        label="איך עובדים איתנו"
        title="התהליך שלנו"
        text="חמישה שלבים מהבנת המצב הקיים ועד ניהול שוטף מבוסס נתונים."
      />
      <div className="grid gap-4 md:grid-cols-5">
        {processSteps.map((step, idx) => (
          <article
            key={step.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-serif text-lg font-black text-white">
              {idx + 1}
            </span>
            <h3 className="mt-5 text-base font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const BusinessPresentationsPage = ({ relatedArticles = [], t, isRtl }) => (
  <main className="bg-white" dir="rtl">
    <Hero />
    <ServicesSection />
    <ProcessSection />
    {relatedArticles.length ? (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <RelatedArticlesSection articles={relatedArticles} t={t} isRtl={isRtl} />
      </section>
    ) : null}
  </main>
);
