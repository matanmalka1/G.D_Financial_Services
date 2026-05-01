import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSeo } from "../hooks/useSeo";
import { routePaths, routes } from "../routes/paths";
import { FeatureBubble } from "../components/ui/FeatureBubble";
import { OwnerSpotlight } from "../components/ui/OwnerSpotlight";
import { ClientsSection } from "../components/common/sections/ClientsSection";
import { FaqSection } from "../components/ui/FaqSection";
import { analyticsService } from "../services/analyticsService";
import { ITEMS_PER_PAGE } from "../constants.js";

export const Home = () => {
  const { t, isRtl } = useSiteContent();
  const navigate = useNavigate();
  useSeo({
    description:
      "G.D Finance - בניית תוכנית עסקית לבנק עם תחזיות פיננסיות, ניתוח סיכון, תזרים מזומנים ומסמך מקצועי שמגדיל את הסיכוי לקבל מימון.",
  });

  const bubbles = useMemo(
    () =>
      [
        {
          title: t.nav.businessPlans,
          icon: "FileText",
          path: routes.sectorDetail("business-plan"),
        },
        {
          title: t.nav.businessPresentations,
          icon: "PresentationIcon",
          path: routes.sectorDetail("business-presentations"),
        },
        {
          title: t.nav.businessConsulting,
          icon: "TrendingUp",
          path: routes.sectorDetail("business-consulting"),
        },
        {
          title: t.nav.sellSideAdvisory,
          icon: "Handshake",
          path: routes.sectorDetail("sell-side-advisory"),
        },
      ].slice(0, ITEMS_PER_PAGE.FEATURED_ARTICLES),
    [t.nav],
  );
  const handleContact = () => {
    analyticsService.trackEvent("owner_contact_click", { source: "home" });
    navigate(routePaths.contact);
  };
  const handleBubbleClick = (bubble) => {
    analyticsService.trackEvent("home_bubble_click", {
      title: bubble.title,
      destination: bubble.path,
    });
    navigate(bubble.path);
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
              className="mx-auto mb-8 max-w-2xl text-xl leading-9 text-white/70 md:text-2xl"
              dir={isRtl ? "rtl" : "ltr"}
              style={{ unicodeBidi: "plaintext" }}
            >
              {t.home.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Bubbles Section */}
      <section className="relative z-20 -mt-12 mx-auto max-w-7xl px-4 md:-mt-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bubbles.map((bubble, idx) => (
            <FeatureBubble
              key={bubble.title + idx}
              icon={bubble.icon}
              title={bubble.title}
              onClick={() => handleBubbleClick(bubble)}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-12 text-center">
          <h2
            className="font-serif text-3xl font-black leading-tight text-slate-900 md:text-5xl"
            dir={isRtl ? "rtl" : "ltr"}
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
            dir={isRtl ? "rtl" : "ltr"}
            style={{ unicodeBidi: "plaintext" }}
          >
            <p>{t.home.about.p1}</p>
            <p className="mt-4">{t.home.about.p2}</p>
            <p className="mt-4">{t.home.about.p3}</p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2" dir={isRtl ? "rtl" : "ltr"}>
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
        dir="ltr"
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
