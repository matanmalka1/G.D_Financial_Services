import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSeo } from "../hooks/useSeo";
import { routePaths } from "../routes/paths";
import { OwnerSpotlight } from "../components/ui/OwnerSpotlight";
import { ClientsSection } from "../components/common/sections/ClientsSection";
import { FaqSection } from "../components/ui/FaqSection";
import { analyticsService } from "../services/analyticsService";

export const Home = () => {
  const { t, isRtl } = useSiteContent();
  const navigate = useNavigate();
  useSeo({
    description:
      "G.D Finance - בניית תוכנית עסקית לבנק עם תחזיות פיננסיות, ניתוח סיכון, תזרים מזומנים ומסמך מקצועי שמגדיל את הסיכוי לקבל מימון.",
  });

  const handleContact = () => {
    analyticsService.trackEvent("owner_contact_click", { source: "home" });
    navigate(routePaths.contact);
  };
  return (
    <main className="relative bg-white">
      <section className="relative overflow-hidden bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_15%_80%,rgba(255,255,255,0.08),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 font-serif text-5xl font-black leading-none text-white md:text-7xl">
              {t.home.hero.title}
            </div>
            <p
              className="mx-auto mb-10 max-w-2xl text-xl leading-9 text-white/70 md:text-2xl"
              dir="rtl"
              style={{ unicodeBidi: "plaintext" }}
            >
              {t.home.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleContact}
                className="rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-white/90"
              >
                {t.home.owner.contact}
              </button>
              <button
                onClick={() => navigate(routePaths.news)}
                className="rounded-full border border-white/40 bg-white/10 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/20"
              >
                קרא מאמרים
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-12 text-center">
          <h2
            className="font-serif text-3xl font-black leading-tight text-slate-900 md:text-5xl"
            dir="rtl"
            style={{ unicodeBidi: "plaintext" }}
          >
            {t.home.about.title}
          </h2>
        </div>

        <div className="mx-auto max-w-5xl">
          <div
            className={`rounded-3xl border border-slate-200 bg-stone-50 p-8 text-lg leading-8 text-slate-600 md:p-10 ${
              isRtl ? "text-right" : "text-left"
            }`}
            dir="rtl"
            style={{ unicodeBidi: "plaintext" }}
          >
            <p>{t.home.about.p1}</p>
            <p className="mt-4">{t.home.about.p2}</p>
            <p className="mt-4">{t.home.about.p3}</p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2" dir="rtl">
              {t.home.about.highlights?.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-sm"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white"
                    aria-hidden="true"
                  >
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
            <p
              className={`mt-6 font-semibold text-slate-900 ${isRtl ? "text-right" : "text-left"}`}
            >
              {t.home.about.summary}
            </p>
          </div>
        </div>
      </section>

      <OwnerSpotlight
        title={t.home.owner.title}
        bio={t.home.owner.bio}
        buttonLabel={t.home.owner.contact}
        onContact={handleContact}
      />

      {/* FAQ Section */}
      <section
        className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 lg:flex-row lg:items-start"
        dir="rtl"
      >
        <div
          className="text-center lg:sticky lg:top-24 lg:w-[34%] lg:shrink-0 lg:text-right"
          dir="rtl"
        >
          <h2 className="font-serif text-3xl font-black leading-tight text-slate-900 md:text-5xl">
            {t.home.faq.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600 lg:mx-0">
            {t.home.faq.description}
          </p>
        </div>
        <div className="w-full min-w-0 lg:max-w-2xl lg:flex-1" dir="rtl">
          <FaqSection items={t.home.faq.items} />
        </div>
      </section>

      {/* Clients Section */}
      <ClientsSection />
    </main>
  );
};
