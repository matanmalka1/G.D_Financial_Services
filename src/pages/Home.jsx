import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSeo } from "../hooks/useSeo";
import { useContactForm } from "../hooks/useContactForm";
import { routePaths, routes } from "../routes/paths";
import { FeatureBubble } from "../components/ui/FeatureBubble";
import { OwnerSpotlight } from "../components/ui/OwnerSpotlight";
import { PhoneNumberInput } from "../components/ui/PhoneNumberInput";
import { ClientsSection } from "../components/common/sections/ClientsSection";
import { FaqSection } from "../components/ui/FaqSection";
import { analyticsService } from "../services/analyticsService";
import { submitContactForm } from "../services/contactService";
import { ITEMS_PER_PAGE } from "../constants.js";

export const Home = () => {
  const { t, isRtl } = useSiteContent();
  const navigate = useNavigate();
  const leadFieldIds = {
    fullName: "home-lead-full-name",
    phone: "home-lead-phone",
    email: "home-lead-email",
  };
  useSeo({
    description:
      "G.D Finance - בניית תוכנית עסקית לבנק עם תחזיות פיננסיות, ניתוח סיכון, תזרים מזומנים ומסמך מקצועי שמגדיל את הסיכוי לקבל מימון.",
  });
  const { form, handleSubmit: submitLead } = useContactForm(
    t,
    async (data) => {
      const loadingToast = toast.loading(t.contact.sending);
      try {
        await submitContactForm(
          { ...data, service: "Homepage lead form" },
          "Homepage Lead Form - G.D Financial Services",
        );
        toast.success(t.contact.success, { id: loadingToast });
      } catch (error) {
        toast.error(t.contact.error, { id: loadingToast });
        throw error;
      }
    },
    { includeMessage: false, includeService: false },
  );

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
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const onLeadError = () => {
    toast.error(t.contact.error);
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
              className="mx-auto mb-8 max-w-2xl text-lg leading-9 text-white/70"
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
            <ul
              className="mt-8 grid gap-4 md:grid-cols-2"
              dir={isRtl ? "rtl" : "ltr"}
            >
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

      <section className="px-4 py-10">
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-lg shadow-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] items-stretch">
            <form
              onSubmit={form.handleSubmit(submitLead, onLeadError)}
              className="relative overflow-hidden bg-slate-900 px-6 py-6 lg:px-8 lg:py-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_40%)]" />
              <div className="relative">
                <p className="mb-4 text-sm leading-6 text-white/70 text-right">
                  {t.home.leadForm.description}
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-white/75" htmlFor={leadFieldIds.fullName}>
                      {t.contact.fullName}
                    </label>
                    <input
                      id={leadFieldIds.fullName}
                      {...register("fullName")}
                      className={`h-10 w-full rounded-lg border bg-white/96 px-3 text-right text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.fullName ? "border-rose-300" : "border-white/60"}`}
                      placeholder={t.contact.fullName}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-white/75" htmlFor={leadFieldIds.phone}>
                      {t.contact.phone}
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <PhoneNumberInput
                          inputId={leadFieldIds.phone}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.phone?.message}
                          isRtl={isRtl}
                          placeholder={t.contact.phone}
                          className="space-y-0"
                          inputClassName={`h-10 rounded-lg border bg-white/96 shadow-none hover:shadow-none focus-within:ring-2 focus-within:ring-white/50 ${errors.phone ? "border-rose-300" : "border-white/60"}`}
                          prefixClassName="border-white/50 bg-slate-50/90 text-slate-700 text-sm"
                          localInputClassName="h-10 bg-transparent text-right text-sm text-slate-900 placeholder:text-slate-400"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-white/75" htmlFor={leadFieldIds.email}>
                      {t.contact.email}
                    </label>
                    <input
                      id={leadFieldIds.email}
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
                      {t.home.leadForm.submit}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="bg-white px-6 py-6 text-right lg:px-8 lg:py-7">
              <div className="flex h-full flex-col justify-center">
                <h2 className="font-serif text-2xl font-black leading-tight text-slate-900 md:text-3xl">
                  {t.home.leadForm.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {t.home.leadForm.description}
                </p>
                <div className="mt-4 h-px w-12 bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-[0.85fr,1.15fr] lg:items-start">
        <div className="text-center lg:sticky lg:top-28 lg:order-2 lg:text-right">
          <h2 className="font-serif text-4xl font-black leading-tight text-slate-900 md:text-6xl">
            {t.home.faq.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600 lg:mx-0">
            {t.home.faq.description}
          </p>
        </div>
        <div className="lg:order-1">
          <FaqSection items={t.home.faq.items} />
        </div>
      </section>

      {/* Clients Section */}
      <ClientsSection />
    </main>
  );
};
