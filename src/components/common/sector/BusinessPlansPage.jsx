import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Banknote,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ClipboardList,
  Landmark,
  LineChart,
  MessageCircle,
  Phone,
  PieChart,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { routes } from "../../../routes/paths";
import { SectorHeroActions } from "./SectorHeroActions";

const phoneNumber = "0559691334";
const whatsappNumber = "972559691334";

const challenges = [
  {
    icon: Landmark,
    title: "הבנק או המשקיע דורשים תוכנית עסקית",
    text: "לא ברור מה בדיוק הם מחפשים, ומה ייראה להם אמין ומשכנע.",
  },
  {
    icon: ClipboardList,
    title: "לא ברור מה צריך להיות בתוכנית",
    text: "הרבה תוכן, מעט הכוונה ומסמכים שלא עומדים בציפיות.",
  },
  {
    icon: ShieldCheck,
    title: "פחד מדחייה או החלטה שגויה",
    text: "תוכנית לא מדויקת יכולה לפגוע במימון, בשותפות או בכיוון העסקי.",
  },
  {
    icon: BarChart3,
    title: "חוסר ודאות לגבי המספרים",
    text: "תחזיות שלא מבוססות על נתונים פוגעות באמינות וביכולת לקבל החלטות.",
  },
];

const proofPoints = [
  {
    icon: TrendingUp,
    title: "רווחיות פוטנציאלית",
    text: "האם העסק יכול להרוויח ולצמוח לאורך זמן.",
  },
  {
    icon: Scale,
    title: "רמת הסיכון",
    text: "עד כמה יציבה ובטוחה ההשקעה או הפעילות המתוכננת.",
  },
  {
    icon: Banknote,
    title: "הון ומשאבים",
    text: "כמה הון, זמן ויכולת נדרשים כדי להוציא את התוכנית לפועל.",
  },
  {
    icon: Target,
    title: "תחזיות מכירה",
    text: "מספרים מבוססים ואמינים על הכנסות עתידיות.",
  },
  {
    icon: LineChart,
    title: "יכולת מימון והחזר",
    text: "הוכחה ברורה שהעסק יוכל לממן את הפעילות ולעמוד בהתחייבויות.",
  },
];

const solutionPoints = [
  {
    title: "שפה פיננסית ברורה",
    text: "המסמך מנוסח בצורה מקצועית, עם הדגשים שמעניינים בנקים, משקיעים ומנהלים.",
  },
  {
    title: "ניתוח פיננסי אמיתי, לא ניחושים",
    text: "תחזיות מבוססות על נתוני שוק, תחרות ומודל עיסקי אמיתי.",
  },
  {
    title: "התאמה מלאה לעסק שלך",
    text: "אין שתי תוכניות זהות. כל תוכנית מותאמת לתחום ולמצב הספציפי.",
  },
  {
    title: "הצגת נתונים משכנעת",
    text: "גרפים, טבלאות ונרטיב פיננסי שמעביר אמינות.",
  },
];

const deliverables = [
  "תוכנית עסקית מקיפה ומקצועית",
  "ניתוח פיננסי מלא עם תחזיות",
  "מודל רווחיות וסיכון",
  "הצגה גרפית ברורה של הנתונים",
  "מסמך מותאם לבנק, למשקיע או להנהלה",
  "ליווי ותמיכה בתהליך",
];

const services = [
  {
    title: "ניתוח העסק והמודל הכלכלי",
    text: "הבנה מעמיקה של תחום הפעילות, שוק היעד, המתחרים ומנועי הצמיחה של העסק.",
    result: "מפה עסקית ברורה שמראה שאתה מבין את השוק.",
  },
  {
    title: "בניית תחזיות פיננסיות",
    text: "בניית תחזיות הכנסות, הוצאות ותזרים מזומנים לשנים הקרובות, מבוססות על נתוני שוק.",
    result: "תחזיות אמינות שעומדות בבדיקה מקצועית.",
  },
  {
    title: "חישוב רווחיות וסיכונים",
    text: "ניתוח שבו הרווחיות, נקודת האיזון והסיכונים העיקריים מוצגים בצורה שקופה ומקצועית.",
    result: "הוכחה שהעסק רווחי וניהול הסיכון מובן.",
  },
  {
    title: "בניית מסמך תוכנית עסקית",
    text: "עיצוב וניסוח המסמך הסופי בצורה מקצועית, ברורה ומותאמת להצגת העסק.",
    result: "מסמך מוכן להצגה לבנק, למשקיע או לשותפים.",
  },
  {
    title: "התאמה לקהל היעד",
    text: "בנק, משקיע או הנהלה פנימית מחפשים דברים שונים. אנחנו מתאימים את התוכנית למטרה.",
    result: "תוכנית שמדברת ישר לציפיות של מי שקורא אותה.",
  },
  {
    title: "ליווי ותמיכה בתהליך",
    text: "אנחנו זמינים לשאלות, שינויים ותמיכה לאורך הדרך, גם לאחר השלמת המסמך.",
    result: "שקט נפשי ומענה מקצועי בכל שלב.",
  },
];

const reasons = [
  {
    icon: PieChart,
    title: "היכרות עם צורת החשיבה של הבנק",
    text: "אנחנו בונים את התוכנית סביב השאלות שהבנק באמת בודק: יכולת החזר, סיכון, רווחיות והיגיון עסקי.",
  },
  {
    icon: Building2,
    title: "עבודה עם עסקים וחברות",
    text: "ניסיון עם עסקים ממגוון תחומים, מסטארטאפים ועד חברות מבוססות.",
  },
  {
    icon: BarChart3,
    title: "גישה מבוססת נתונים",
    text: "כל מספר בתוכנית מגיע ממחקר, לא מדמיון. קוראים מקצועיים מזהים מהר תחזיות לא אמינות.",
  },
  {
    icon: Target,
    title: "מיקוד בתוצאה עסקית",
    text: "לא כותבים סיפור יפה. בונים מסמך שנועד לקדם החלטה, מימון או מהלך עסקי.",
  },
];

const SectionLabel = ({ children, light = false }) => (
  <span
    className={`mb-4 inline-block text-xs font-bold uppercase tracking-[0.18em] ${
      light ? "text-white" : "text-slate-900"
    }`}
  >
    {children}
  </span>
);

const SectionHeader = ({ label, title, text, light = false }) => (
  <div className="mb-12 max-w-3xl">
    <SectionLabel light={light}>{label}</SectionLabel>
    <h2
      className={`font-serif text-3xl font-black leading-tight md:text-5xl ${
        light ? "text-white" : "text-slate-900"
      }`}
    >
      {title}
    </h2>
    {text ? (
      <p
        className={`mt-5 text-lg leading-8 ${
          light ? "text-white/65" : "text-slate-600"
        }`}
      >
        {text}
      </p>
    ) : null}
  </div>
);

const CtaButtons = ({ dark = false }) => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <a
      href={`tel:${phoneNumber}`}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-bold transition hover:-translate-y-0.5 ${
        dark
          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
          : "bg-white text-slate-900 shadow-xl shadow-white/20 hover:bg-slate-100"
      }`}
    >
      <Phone className="h-5 w-5" />
      קבע שיחת ייעוץ
    </a>
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-bold transition hover:-translate-y-0.5 ${
        dark
          ? "border border-slate-900/20 bg-white/25 text-slate-900 hover:bg-white/40"
          : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      <MessageCircle className="h-5 w-5" />
      שלח הודעה בוואטסאפ
    </a>
  </div>
);

const BusinessPlansHero = () => (
  <section className="relative overflow-hidden bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_15%_80%,rgba(255,255,255,0.08),transparent_45%)]" />

    <div className="relative mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white">
          <BriefcaseBusiness className="h-4 w-4" />
          תוכנית עסקית לבנק
        </div>
        <h1 className="font-serif text-4xl font-black leading-tight md:text-6xl">
          תוכנית עסקית
          <br />
          שמביאה אישור מהבנק
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-white/70">
          לא סתם מסמך אלא תוכנית אסטרטגית מבוססת נתונים, שמדברת בשפה של הבנק
          ומגדילה משמעותית את הסיכוי שלך לקבל את המימון.
        </p>
        <SectorHeroActions className="mt-10" />
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-xl shadow-slate-950/10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["בנק", "מסמך שמדבר בשפה של הבנק"],
          ["100%", "התאמה למטרות העסק"],
          ["מהיר", "ביצוע בזמן קצר"],
          ["מדויק", "מיקוד בתוצאה: החלטה נכונה"],
        ].map(([value, label]) => (
          <div key={label} className="bg-white p-7 text-center">
            <strong className="block font-serif text-3xl font-black text-slate-900">
              {value}
            </strong>
            <span className="mt-2 block text-sm text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ChallengeSection = () => (
  <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr,1.1fr]">
      <SectionHeader
        label="אתגר מוכר?"
        title="הבנק מבקש תוכנית עסקית ולא ברור מאיפה מתחילים?"
        text="בעלי עסקים רבים צריכים תוכנית עסקית לבנק, למשקיעים, להקמת פעילות חדשה או לקבלת החלטות פנימיות, ולא יודעים מה לכלול ואיך לבנות את המספרים."
      />

      <div className="grid gap-4">
        {challenges.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="flex gap-5 rounded-2xl border border-slate-200 bg-stone-50 p-6 transition hover:-translate-x-1 hover:border-slate-400"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ProofSection = () => (
  <section className="bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        light
        label="מה בודקים בתוכנית"
        title="5 הדברים שכל תוכנית עסקית חייבת להוכיח"
        text="תוכנית טובה לא מסתפקת בסיפור. היא מציגה נתונים שמסבירים למה העסק יכול לעבוד."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {proofPoints.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-white/20 bg-white/[0.04] p-6 text-center transition hover:-translate-y-1 hover:border-white/60 hover:bg-white/[0.07]"
          >
            <Icon className="mx-auto h-8 w-8 text-white" />
            <h3 className="mt-5 font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/55">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const SolutionSection = () => (
  <section className="bg-stone-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <div>
        <SectionHeader
          label="הגישה שלנו"
          title="אנחנו בונים תוכנית עסקית שאפשר לעבוד איתה"
          text="לא מסמך גנרי. תוכנית מותאמת לעסק שלך, שמדברת בשפה פיננסית ברורה ומתורגמת לפעולות."
        />

        <div className="space-y-6">
          {solutionPoints.map((point, idx) => (
            <article key={point.title} className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-black text-slate-900 shadow-sm ring-1 ring-slate-200">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{point.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {point.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white md:p-10">
        <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <SectionLabel light>מה מקבלים בסוף</SectionLabel>
        <ul className="relative mt-2 grid gap-4">
          {deliverables.map((item) => (
            <li key={item} className="flex items-center gap-3 text-white/85">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white bg-white/10 text-white">
                <Check className="h-4 w-4" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="תהליך העבודה"
        title="מה כולל השירות"
        text="כל שלב בנוי כדי להפוך רעיון, צורך או יעד עסקי לתוכנית ברורה ומגובה במספרים."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, idx) => (
          <article
            key={service.title}
            className="group rounded-3xl border border-slate-200 bg-stone-50 p-7 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
          >
            <span className="font-serif text-5xl font-black text-slate-400/40">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {service.text}
            </p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800">
              <strong className="mb-1 block text-xs uppercase tracking-[0.14em] text-slate-900">
                מה מקבלים
              </strong>
              {service.result}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const WhyUsSection = () => (
  <section className="relative overflow-hidden bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
    <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
    <div className="relative mx-auto max-w-7xl">
      <SectionHeader
        light
        label="למה G.D Finance"
        title="מה מייחד אותנו"
        text="לא כל מי שכותב תוכניות עסקיות יודע לחבר בין אסטרטגיה, פיננסים וקבלת החלטות."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {reasons.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-white/20 bg-white/[0.04] p-7 transition hover:border-white/60 hover:bg-white/[0.07]"
          >
            <Icon className="h-8 w-8 text-white" />
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-white/60">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const FinalCtaSection = () => (
  <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-serif text-4xl font-black leading-tight text-slate-900 md:text-5xl">
        צריך תוכנית עסקית מקצועית?
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-900/75">
        שיחת ייעוץ ראשונית ללא עלות. נבין את המטרה שלך ונסביר כיצד נוכל לבנות
        עבורך תוכנית מדויקת.
      </p>
      <div className="mt-10 flex justify-center">
        <CtaButtons dark />
      </div>
      <Link
        to={routes.contact()}
        className="mt-8 inline-flex items-center gap-2 font-bold text-slate-900 underline underline-offset-8"
      >
        מעבר לעמוד יצירת קשר
        <ArrowLeft className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

export const BusinessPlansPage = () => (
  <main className="bg-white" dir="rtl">
    <BusinessPlansHero />
    <ChallengeSection />
    <ProofSection />
    <SolutionSection />
    <ServicesSection />
    <WhyUsSection />
    <FinalCtaSection />
  </main>
);
