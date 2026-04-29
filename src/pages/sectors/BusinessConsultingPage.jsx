import {
  BarChart3,
  BriefcaseBusiness,
  Check,
  LineChart,
  TrendingUp,
} from "lucide-react";
import { RelatedArticlesSection } from "../../components/common/sector/RelatedArticlesSection";
import { SectorHeroActions } from "../../components/common/sector/SectorHeroActions";
import {
  ContactCtaSection,
  HeroBackground,
  HeroStatGrid,
  SectionHeader,
} from "../../components/common/sector/SectorPagePrimitives";

const heroStats = [
  ["5", "שלבי תהליך מובנה"],
  ["7+", "תוצרים קונקרטיים"],
  ["90", "יום לתכנית פעולה"],
];

const audience = [
  "עסקים שרוצים לצמוח אבל לא יודעים מאיפה להתחיל",
  "בעלי עסקים שמרגישים שהמחזור גדל אבל הרווח לא",
  "עסקים שרוצים לגייס מימון / להציג תכנית לבנק או משקיע",
  "עסקים שרוצים להבין אילו מוצרים, לקוחות או שירותים באמת רווחיים",
];

const processSteps = [
  {
    letter: "א",
    title: "אבחון עסקי ופיננסי",
    text: "מיפוי מלא של מצב העסק, הכנסות, עלויות, מבנה ותפעול",
  },
  {
    letter: "ב",
    title: "ניתוח הכנסות, עלויות ורווחיות",
    text: "פירוק הנתונים לפי שירות, מוצר, לקוח ומגזר",
  },
  {
    letter: "ג",
    title: "זיהוי מנועי צמיחה",
    text: "איפה ההזדמנויות? איפה צווארי הבקבוק שמונעים צמיחה?",
  },
  {
    letter: "ד",
    title: "בניית תכנית עסקית",
    text: "תכנית מסודרת עם תחזיות, יעדים וניתוח שוק",
  },
  {
    letter: "ה",
    title: "תכנית פעולה עם KPI",
    text: "יעדים ברורים, מדדים להצלחה ותכנית ביצוע לתשעים הימים",
  },
];

const deliverables = [
  "תמונת מצב פיננסית ברורה",
  "ניתוח רווחיות לפי שירות / מוצר / לקוח",
  "תחזית הכנסות ורווחיות",
  "תזרים מזומנים בסיסי",
  "המלצות לשיפור תמחור ורווחיות",
  "תכנית עסקית מסודרת לבנק / משקיע / הנהלה",
  "תכנית פעולה לתשעים הימים הקרובים",
];

const strengths = [
  {
    icon: LineChart,
    title: "מודלים פיננסיים מתקדמים",
    text: "בניית מודלי תחזית ורווחיות מבוססי נתונים אמיתיים",
  },
  {
    icon: BarChart3,
    title: "ניתוח נתונים עסקי",
    text: "קריאת המספרים בהקשר עסקי ולא רק חשבונאי",
  },
  {
    icon: BriefcaseBusiness,
    title: "ליווי מנהלים בהחלטות",
    text: "ניסיון בעבודה עם מנהלים בחברות בצמיחה",
  },
  {
    icon: TrendingUp,
    title: "אסטרטגיית צמיחה מעשית",
    text: "מהתובנה עד לתכנית פעולה ולא עצות כלליות",
  },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
    <HeroBackground />
    <div className="relative mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white">
          <BriefcaseBusiness className="h-4 w-4" />
          G.D Finance
        </div>
        <h1 className="font-serif text-4xl font-black leading-tight md:text-6xl">
          ייעוץ עסקי
          <br />
          מבוסס נתונים
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-white/70">
          עוזרים לעסקים להבין את המספרים, לזהות מנועי צמיחה ולבנות תכנית פעולה לרווחיות
          גבוהה יותר.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/60">
          G.D Finance מלווה בעלי עסקים בתהליך עומק שמחבר בין ניתוח פיננסי, הבנה עסקית
          ואסטרטגיית צמיחה עד לבניית תכנית עסקית פרקטית עם יעדים, תחזיות ותכנית ביצוע.
        </p>
        <SectorHeroActions className="mt-10" />
      </div>
      <HeroStatGrid stats={heroStats} cols={3} />
    </div>
  </section>
);

const AudienceSection = () => (
  <section
    id="audience"
    className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
  >
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr,1.1fr]">
      <SectionHeader
        label="קהל יעד"
        title="למי השירות מתאים?"
        text="עסקים קטנים ובינוניים שרוצים להפוך נתונים לכלי ניהולי ולא רק לדוחות."
      />
      <div className="grid gap-4">
        {audience.map((item) => (
          <article
            key={item}
            className="flex gap-5 rounded-2xl border border-slate-200 bg-stone-50 p-6 transition hover:-translate-x-1 hover:border-slate-400"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold leading-7 text-slate-900">{item}</h3>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section
    id="process"
    className="scroll-mt-24 bg-stone-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
  >
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="המתודולוגיה שלנו"
        title="מה אנחנו עושים?"
        text="תהליך מובנה של 5 שלבים שמוביל מאבחון מלא לתכנית פעולה ברורה."
      />
      <div className="grid gap-5 md:grid-cols-5">
        {processSteps.map((step) => (
          <article
            key={step.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/60"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 font-serif text-lg font-black text-white">
              {step.letter}
            </span>
            <h3 className="mt-5 text-base font-bold leading-7 text-slate-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const DeliverablesSection = () => (
  <section
    id="deliverables"
    className="scroll-mt-24 bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
  >
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        light
        label="מה תקבלו"
        title="התוצרים שתקבלו"
        text="לא מצגות, כלים עסקיים פרקטיים שתוכלו להשתמש בהם כבר מחר."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {deliverables.map((item) => (
          <article
            key={item}
            className="rounded-2xl border border-white/20 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-white/60 hover:bg-white/[0.07]"
          >
            <Check className="h-6 w-6 text-white" />
            <h3 className="mt-5 text-base font-bold leading-7 text-white">{item}</h3>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const WhyUsSection = () => (
  <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 lg:grid-cols-[0.95fr,1.05fr]">
        <SectionHeader
          label="הגישה שלנו"
          title="למה דווקא G.D Finance?"
          text="שילוב של ניסיון ב-FP&A, ניתוח נתונים, בניית מודלים פיננסיים וליווי מנהלים בקבלת החלטות. המטרה היא לא רק להציג דוחות אלא להפוך את המספרים לכלי ניהולי שמוביל לצמיחה."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {strengths.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-stone-50 p-6 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ExampleSection = () => (
  <section className="bg-stone-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="דוגמה מהשטח"
        title="דוגמה לתוצאה"
        text="איך ניתוח נכון הופך בעיה עסקית לאזור פעולה ברור."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            לפני
          </span>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            העסק גדל במחזור אך הרווחיות נשחקה, ולא הייתה תמונה ברורה אילו שירותים
            רווחיים.
          </p>
        </article>
        <article className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl shadow-slate-200/60">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
            אחרי
          </span>
          <p className="mt-4 text-lg leading-8 text-white/80">
            נבנתה מפת רווחיות, זוהו שירותים לא רווחיים, בוצע עדכון תמחור ונבנתה תכנית
            צמיחה עם יעדי מכירות ורווחיות.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export const BusinessConsultingPage = ({ relatedArticles = [], t, isRtl }) => (
  <main className="bg-white" dir="rtl">
    <Hero />
    <AudienceSection />
    <ProcessSection />
    <DeliverablesSection />
    <WhyUsSection />
    <ExampleSection />
    <ContactCtaSection
      label="מוכנים להתחיל?"
      title="רוצים להבין מה באמת קורה בעסק שלכם?"
      text="שיחת היכרות קצרה תאפשר להבין איפה העסק נמצא היום, מה האתגרים המרכזיים, ואיך אפשר לבנות תכנית צמיחה ברורה ומבוססת מספרים."
    />
    {relatedArticles.length ? (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <RelatedArticlesSection articles={relatedArticles} t={t} isRtl={isRtl} />
      </section>
    ) : null}
  </main>
);
