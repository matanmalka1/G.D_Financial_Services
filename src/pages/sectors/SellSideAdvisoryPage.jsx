import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  Check,
  FileText,
  Handshake,
  LockKeyhole,
  MessageCircle,
  Phone,
  Presentation,
  Scale,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import { routes } from "../../routes/paths";
import { RelatedArticlesSection } from "../../components/common/sector/RelatedArticlesSection";
import { SectorHeroActions } from "../../components/common/sector/SectorHeroActions";
import { CONTACT } from "../../constants.js";

const heroStats = [
  ["5", "שלבי ליווי מלאים"],
  ["DCF", "הערכת שווי מקצועית"],
  ["100%", "דיסקרטיות בתהליך"],
  ["CIM", "חומרים למשקיעים"],
];

const valuePoints = [
  {
    icon: Target,
    title: "אסטרטגיית אקזיט ברורה",
    text: "גיבוש מסלול מכירה, הכנסת שותף, מיזוג או מכירה חלקית לפי מטרות הבעלים והחברה.",
  },
  {
    icon: FileText,
    title: "תשתית מוכנה לדיליג'נס",
    text: "סידור דוחות, חוזים, KPIs וחדר מידע שמצמצם שאלות, עיכובים ודגלים אדומים.",
  },
  {
    icon: Search,
    title: "איתור רוכשים מתאימים",
    text: "מיפוי ופנייה לרוכשים אסטרטגיים, קרנות השקעה ומשקיעים רלוונטיים תוך שמירה על סודיות.",
  },
  {
    icon: ShieldCheck,
    title: "הגנת ערך במו\"מ",
    text: "ניתוח הצעות, Term Sheet, מבנה עסקה ותיאום סגירה כדי לשמור על תנאים מיטביים.",
  },
];

const processSteps = [
  {
    icon: Scale,
    title: "הערכת שווי ואסטרטגיית אקזיט",
    text: "DCF, מכפילים, עסקאות השוואה, ניתוח רווחיות וסימולציות רגישות לצורך קביעת טווחי שווי ומסלול עסקה.",
  },
  {
    icon: FileText,
    title: "הכנת תשתית פיננסית ומשפטית",
    text: "הכנת דוחות, ניתוחי רווחיות, תחזיות, חוזים וחדר מידע מסודר לבדיקת נאותות.",
  },
  {
    icon: Search,
    title: "איתור רוכשים או משקיעים",
    text: "מיפוי גורמים אסטרטגיים ופיננסיים, ניסוח Teaser אנונימי, פנייה יזומה וסינון ראשוני.",
  },
  {
    icon: Handshake,
    title: "ליווי משא ומתן וסגירת עסקה",
    text: "ניהול הצעות, תיאום יועצים, מענה לדיליג'נס וליווי עד חתימה והעברת התמורה בפועל.",
  },
  {
    icon: Presentation,
    title: "מצגת ודוחות למשקיעים",
    text: "CIM, מצגות מותאמות, KPI, תחזיות, ניתוח שוק וחומרים שמציגים את פוטנציאל החברה.",
  },
];

const deliverables = [
  "הערכת שווי מבוססת DCF, מכפילים ועסקאות השוואה",
  "אסטרטגיית אקזיט מותאמת לבעלים ולחברה",
  "חדר מידע מסודר ומוכן לבדיקת נאותות",
  "Teaser אנונימי וחומרי פנייה לרוכשים",
  "מצגת CIM מלאה למשקיעים ורוכשים",
  "ניתוח הצעות ו-Term Sheet",
  "ליווי מקצועי עד סגירת העסקה",
];

const advantages = [
  {
    icon: LockKeyhole,
    title: "דיסקרטיות מלאה",
    text: "התהליך מנוהל בשלבים, עם חשיפת מידע מדורגת ושמירה על זהות העסק בתחילת הדרך.",
  },
  {
    icon: BarChart3,
    title: "שפה פיננסית חזקה",
    text: "המספרים מוצגים בצורה שמחזקת אמון מול רוכשים, משקיעים ויועצים מקצועיים.",
  },
  {
    icon: BriefcaseBusiness,
    title: "ניהול תהליך מקצה לקצה",
    text: "מהערכת השווי ועד הסגירה, עם תיאום בין רואי חשבון, עורכי דין, יועצי מס ובנקים.",
  },
  {
    icon: Handshake,
    title: "מיקוד בתוצאה העסקית",
    text: "לא רק שווי גבוה על הנייר, אלא עסקה שניתן לקדם, לסגור ולממש בפועל.",
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
      href={`tel:${CONTACT.PHONE}`}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-bold transition hover:-translate-y-0.5 ${
        dark
          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
          : "bg-white text-slate-900 shadow-xl shadow-white/20 hover:bg-slate-100"
      }`}
    >
      <Phone className="h-5 w-5" />
      קבעו שיחת היכרות
    </a>
    <a
      href={`https://wa.me/${CONTACT.WHATSAPP}`}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-bold transition hover:-translate-y-0.5 ${
        dark
          ? "border border-slate-900/20 bg-white/25 text-slate-900 hover:bg-white/40"
          : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      <MessageCircle className="h-5 w-5" />
      שלחו הודעה בוואטסאפ
    </a>
  </div>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_15%_80%,rgba(255,255,255,0.08),transparent_45%)]" />

    <div className="relative mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white">
          <Handshake className="h-4 w-4" />
          G.D Finance
        </div>
        <h1 className="font-serif text-4xl font-black leading-tight md:text-6xl">
          ליווי חברות למכירה
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-white/70">
          תהליך מכירה מקצועי ודיסקרטי שמחבר בין הערכת שווי, הכנת החברה,
          איתור רוכשים, ניהול מו"מ וסגירת עסקה בתנאים מיטביים.
        </p>
        <SectorHeroActions className="mt-10" />
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-xl shadow-slate-950/10 sm:grid-cols-2 lg:grid-cols-4">
        {heroStats.map(([value, label]) => (
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

const ValueSection = () => (
  <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="מה התהליך נותן"
        title="מכירת חברה היא מהלך אסטרטגי, לא רק עסקה"
        text={
          'תהליך מכירה מוצלח דורש הסתכלות רחבה: שווי, מסמכים, שוק, רוכשים, מו"מ וסגירה. המטרה היא להעביר ערך בצורה שמגנה על הבעלים ומקדמת עסקה אמיתית.'
        }
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {valuePoints.map(({ icon: Icon, title, text }) => (
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
  </section>
);

const ProcessSection = () => (
  <section className="bg-stone-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="תוכנית הליווי"
        title="חמישה שלבים עד עסקה מוכנה לסגירה"
        text="כל שלב נבנה כדי להעלות ודאות, לצמצם סיכונים ולחזק את עמדת החברה מול רוכשים ומשקיעים."
      />

      <div className="grid gap-5 lg:grid-cols-5">
        {processSteps.map(({ icon: Icon, title, text }, idx) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/60"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white">
              <Icon className="h-5 w-5" />
            </span>
            <span className="mt-5 block font-serif text-4xl font-black text-slate-300">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-base font-bold leading-7 text-slate-900">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const DeliverablesSection = () => (
  <section className="bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr,1.1fr]">
      <SectionHeader
        light
        label="תוצרים"
        title="מה מקבלים לאורך התהליך"
        text="החומרים והניתוחים בנויים כדי להציג את החברה בצורה מקצועית, אמינה ומשכנעת מול רוכשים ומשקיעים."
      />

      <div className="grid gap-4">
        {deliverables.map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-white/85"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/40 bg-white/10">
              <Check className="h-4 w-4" />
            </span>
            <span className="font-semibold leading-7">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AdvantagesSection = () => (
  <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="למה G.D Finance"
        title="ליווי שמחבר פיננסים, אסטרטגיה וסגירת עסקה"
        text="אנחנו פועלים בדיסקרטיות מלאה, עם חשיבה עסקית כוללת והבנה של מה רוכשים ומשקיעים בודקים לפני החלטה."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {advantages.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-stone-50 p-7 transition hover:border-slate-400 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
          >
            <Icon className="h-8 w-8 text-slate-900" />
            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const FinalCtaSection = () => (
  <section className="bg-stone-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-3xl text-center">
      <SectionLabel>שיחת היכרות</SectionLabel>
      <h2 className="font-serif text-4xl font-black leading-tight text-slate-900 md:text-5xl">
        שוקלים מכירה או הכנסת משקיע?
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-900/75">
        בשיחה קצרה נבין את מצב החברה, מטרות הבעלים, רמת המוכנות לעסקה והצעדים
        הנכונים לקראת תהליך מכירה מקצועי.
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

export const SellSideAdvisoryPage = ({
  relatedArticles = [],
  t,
  isRtl,
}) => (
  <main className="bg-white" dir="rtl">
    <Hero />
    <ValueSection />
    <ProcessSection />
    <DeliverablesSection />
    <AdvantagesSection />
    <FinalCtaSection />
    {relatedArticles.length ? (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <RelatedArticlesSection articles={relatedArticles} t={t} isRtl={isRtl} />
      </section>
    ) : null}
  </main>
);
