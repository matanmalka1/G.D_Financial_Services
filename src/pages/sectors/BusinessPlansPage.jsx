import { Controller } from "react-hook-form";
import { toast } from "sonner";
import {
  Banknote,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ClipboardList,
  Landmark,
  LineChart,
  PieChart,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { RelatedArticlesSection } from "../../components/common/sector/RelatedArticlesSection";
import { SectorHeroActions } from "../../components/common/sector/SectorHeroActions";
import {
  ContactCtaSection,
  HeroBackground,
  HeroStatGrid,
  SectionHeader,
  SectionLabel,
} from "../../components/common/sector/SectorPagePrimitives";
import { PhoneNumberInput } from "../../components/ui/PhoneNumberInput";
import { useContactForm } from "../../hooks/useContactForm";
import { submitContactForm } from "../../services/contactService";

const heroStats = [
  ["בנק", "מסמך שמדבר בשפה של הבנק"],
  ["100%", "התאמה למטרות העסק"],
  ["מהיר", "ביצוע בזמן קצר"],
  ["מדויק", "מיקוד בתוצאה: החלטה נכונה"],
];

const challenges = [
  {
    icon: Landmark,
    title: "בקשת הלוואה לעסק",
    text: "כאשר אתם מגישים בקשה להלוואה, הבנק רוצה להבין מה מטרת המימון, איך הכסף ישמש את העסק, ומהי יכולת ההחזר הצפויה שלכם.",
  },
  {
    icon: ClipboardList,
    title: "הגדלת מסגרת אשראי",
    text: "כדי לבקש הגדלת מסגרת אשראי, חשוב להציג לבנק תמונה פיננסית ברורה: הכנסות, הוצאות, תזרים מזומנים וצרכי הפעילות השוטפת.",
  },
  {
    icon: ShieldCheck,
    title: "פתיחת חשבון בנק לעסק",
    text: "במקרים רבים, במיוחד בעסק חדש או במקרים מורכבים יותר, הבנק מבקש להבין את מהות הפעילות, מקורות ההכנסה, אופן ההתנהלות והצפי העסקי.",
  },
  {
    icon: BarChart3,
    title: "הצגת העסק בצורה מקצועית מול הבנק",
    text: "תכנית עסקית טובה לא נועדה רק \"לעמוד בדרישה\" - היא מציגה את העסק בצורה ברורה, מסודרת ומשכנעת, ומסייעת לחזק את האמון מול הבנק.",
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

const businessPlanLeadFormContent = {
  title: "בואו נעשה סדר במספרים של העסק",
  description:
    "השאירו פרטים ונחזור אליכם לשיחה קצרה, שבה נבין את מצב העסק ונזהה הזדמנויות לשיפור!",
  submit: "שליחה",
};

const Hero = () => (
  <section className="relative overflow-hidden bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
    <HeroBackground />
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
          לא סתם מסמך אלא תוכנית אסטרטגית מבוססת נתונים, שמדברת בשפה של הבנק ומגדילה
          משמעותית את הסיכוי שלך לקבל את המימון.
        </p>
        <SectorHeroActions className="mt-10" />
      </div>
      <HeroStatGrid stats={heroStats} cols={4} />
    </div>
  </section>
);

const ChallengeSection = () => (
  <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr,1.05fr] lg:items-start">
      <SectionHeader
        title="צריכים תכנית עסקית לבנק לצורך הלוואה, הגדלת מסגרת אשראי או פתיחת חשבון עסקי?"
        text="בנק לא מסתפק רק ברעיון טוב, הוא רוצה להבין את הפעילות, לראות מספרים ברורים, לזהות יכולת החזר ולהרגיש שיש מאחורי העסק תכנון פיננסי מסודר. אנחנו בונים תכנית עסקית מקצועית ומבוססת נתונים, שמציגה את העסק בצורה ברורה ומשכנעת: מטרת המימון, תחזית הכנסות והוצאות, תזרים מזומנים, רווחיות, צרכי אשראי, סיכונים ודרך התמודדות, כדי שתגיעו לבנק מוכנים, מסודרים ובשלים יותר לקבלת החלטה חיובית."
        compact
      />
      <div className="grid gap-3">
        {challenges.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="flex gap-4 rounded-xl border border-slate-200 bg-stone-50 p-4 transition hover:-translate-x-1 hover:border-slate-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm ring-1 ring-slate-200">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
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
                <p className="mt-1 text-sm leading-6 text-slate-600">{point.text}</p>
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
            <h3 className="mt-4 text-lg font-bold text-slate-900">{service.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
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

const BusinessPlanLeadForm = ({ t, isRtl }) => {
  const fieldIds = {
    fullName: "business-plan-lead-full-name",
    phone: "business-plan-lead-phone",
    email: "business-plan-lead-email",
  };
  const { form, handleSubmit: submitLead } = useContactForm(
    t,
    async (data) => {
      const loadingToast = toast.loading(t.contact.sending);
      try {
        await submitContactForm(
          { ...data, service: "Business plan lead form" },
          "Business Plan Lead Form - G.D Financial Services",
        );
        toast.success(t.contact.success, { id: loadingToast });
      } catch (error) {
        toast.error(t.contact.error, { id: loadingToast });
        throw error;
      }
    },
    { includeMessage: false, includeService: false },
  );
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const onLeadError = () => {
    toast.error(t.contact.error);
  };

  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/60">
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1fr_300px]">
          <form
            onSubmit={form.handleSubmit(submitLead, onLeadError)}
            className="relative overflow-hidden bg-slate-900 px-6 py-6 lg:px-8 lg:py-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_40%)]" />
            <div className="relative">
              <p className="mb-4 text-right text-sm leading-6 text-white/70">
                {businessPlanLeadFormContent.description}
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-1 block text-xs font-semibold text-white/75"
                    htmlFor={fieldIds.fullName}
                  >
                    {t.contact.fullName}
                  </label>
                  <input
                    id={fieldIds.fullName}
                    {...register("fullName")}
                    className={`h-10 w-full rounded-lg border bg-white/96 px-3 text-right text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.fullName ? "border-rose-300" : "border-white/60"}`}
                    placeholder={t.contact.fullName}
                  />
                </div>

                <div>
                  <label
                    className="mb-1 block text-xs font-semibold text-white/75"
                    htmlFor={fieldIds.phone}
                  >
                    {t.contact.phone}
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneNumberInput
                        inputId={fieldIds.phone}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.phone?.message}
                        isRtl={isRtl}
                        placeholder={t.contact.phone}
                        className="space-y-0"
                        inputClassName={`h-10 rounded-lg border bg-white/96 shadow-none hover:shadow-none focus-within:ring-2 focus-within:ring-white/50 ${errors.phone ? "border-rose-300" : "border-white/60"}`}
                        prefixClassName="border-white/50 bg-slate-50/90 text-sm text-slate-700"
                        localInputClassName="h-10 bg-transparent text-right text-sm text-slate-900 placeholder:text-slate-400"
                      />
                    )}
                  />
                </div>

                <div>
                  <label
                    className="mb-1 block text-xs font-semibold text-white/75"
                    htmlFor={fieldIds.email}
                  >
                    {t.contact.email}
                  </label>
                  <input
                    id={fieldIds.email}
                    {...register("email")}
                    className={`h-10 w-full rounded-lg border bg-white/96 px-3 text-right text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.email ? "border-rose-300" : "border-white/60"}`}
                    placeholder={t.contact.email}
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="h-10 w-full rounded-lg bg-white px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    {businessPlanLeadFormContent.submit}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="bg-white px-6 py-6 text-right lg:px-8 lg:py-7">
            <div className="flex h-full flex-col justify-center">
              <h2 className="font-serif text-2xl font-black leading-tight text-slate-900 md:text-3xl">
                {businessPlanLeadFormContent.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {businessPlanLeadFormContent.description}
              </p>
              <div className="mt-4 h-px w-12 bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const BusinessPlansPage = ({ relatedArticles = [], t, isRtl }) => (
  <main className="bg-white" dir="rtl">
    <Hero />
    <ChallengeSection />
    <ProofSection />
    <SolutionSection />
    <ServicesSection />
    <WhyUsSection />
    <BusinessPlanLeadForm t={t} isRtl={isRtl} />
    <ContactCtaSection
      title="צריך תוכנית עסקית מקצועית?"
      text="שיחת ייעוץ ראשונית ללא עלות. נבין את המטרה שלך ונסביר כיצד נוכל לבנות עבורך תוכנית מדויקת."
    />
    {relatedArticles.length ? (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <RelatedArticlesSection articles={relatedArticles} t={t} isRtl={isRtl} />
      </section>
    ) : null}
  </main>
);
