import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSeo } from "../hooks/useSeo";
import { useContactForm } from "../hooks/useContactForm";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { routePaths, routes } from "../routes/paths";
import { FeatureBubble } from "../components/ui/FeatureBubble";
import { OwnerSpotlight } from "../components/ui/OwnerSpotlight";
import { Button } from "../components/ui/primitives/Button";
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
    description: "G.D Financial Services - ייעוץ פיננסי מקצועי לעסקים: תוכניות עסקיות, מצגות למשקיעים, ליווי לצד המכירה וייעוץ פיננסי שוטף.",
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
          icon: "📋",
          path: routes.sectorDetail("business-plan"),
        },
        {
          title: t.nav.businessPresentations,
          icon: "🧾",
          path: routes.sectorDetail("business-presentations"),
        },
        {
          title: t.nav.businessConsulting,
          icon: "💼",
          path: routes.sectorDetail("business-consulting"),
        },
        {
          title: t.nav.sellSideAdvisory,
          icon: "🤝",
          path: routes.sectorDetail("sell-side-advisory"),
        },
        {
          title: t.nav.ongoingAdvisory,
          icon: "📈",
          path: routes.sectorDetail("ongoing-financial-advisory"),
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
    <main className="relative">
      <ParallaxHeader
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
        title={t.home.hero.title}
        subtitle={t.home.hero.subtitle}
        height="h-[75vh]"
      />

      {/* Bubbles Section */}
      <section className="relative -mt-16 md:-mt-24 z-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
      <section className="py-24 max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-slate-900 mb-6"
            dir={isRtl ? "rtl" : "ltr"}
            style={{ unicodeBidi: "plaintext" }}
          >
            {t.home.about.title}
          </h2>
          <div className="w-20 h-1 bg-slate-900 mx-auto rounded-full" />
        </div>
        <div
          className={`space-y-4 text-lg text-slate-600 leading-7 ${
            isRtl ? "text-right" : "text-left"
          }`}
          dir={isRtl ? "rtl" : "ltr"}
          style={{ unicodeBidi: "plaintext" }}
        >
          <p>{t.home.about.p1}</p>
          <p>{t.home.about.p2}</p>
          <p>{t.home.about.p3}</p>
          <ul
            className={`space-y-3 text-slate-700 ${
              isRtl ? "flex flex-col items-end" : "w-full"
            }`}
          >
            {t.home.about.highlights?.map((item) => (
              <li
                key={item}
                className={`flex items-center gap-3 ${
                  isRtl ? "flex-row text-right" : "flex-row justify-start"
                }`}
              >
                <span
                  className="text-emerald-600 font-semibold"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold text-slate-800 text-right leading-7">
            {t.home.about.summary}
          </p>
        </div>
        <div className="mt-12 text-center">
          <Button
            onClick={() => navigate(routePaths.companyProfile)}
            variant="ghost"
            className="px-8 py-3 bg-slate-100 text-slate-900 font-semibold rounded-full hover:bg-slate-200 transition-colors"
          >
            {t.home.about.moreInfo}
          </Button>
        </div>
      </section>

      <OwnerSpotlight
        title={t.home.owner.title}
        bio={t.home.owner.bio}
        buttonLabel={t.home.owner.contact}
        onContact={handleContact}
      />

      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-slate-200/80 bg-white shadow-[0_18px_48px_rgba(15,49,82,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_360px] items-stretch">
            <form
              onSubmit={form.handleSubmit(submitLead, onLeadError)}
              className="relative overflow-hidden bg-[#163b63] px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_30%)]" />
              <div className="relative">
                <div className="mb-5 text-right text-white">
                  <div className="mb-3 mr-auto h-px w-16 bg-white/25" />
                  <p className="max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                    {t.home.leadForm.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      className="block text-sm font-semibold text-white/85"
                      htmlFor={leadFieldIds.fullName}
                    >
                      {t.contact.fullName}
                    </label>
                    <input
                      id={leadFieldIds.fullName}
                      {...register("fullName")}
                      className={`h-12 w-full rounded-xl border bg-white/96 px-4 text-right text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/60 ${errors.fullName ? "border-rose-300" : "border-white/70"}`}
                      placeholder={t.contact.fullName}
                      aria-label={t.contact.fullName}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="block text-sm font-semibold text-white/85"
                      htmlFor={leadFieldIds.phone}
                    >
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
                          className="space-y-1"
                          inputClassName={`h-12 rounded-xl border bg-white/96 shadow-none hover:shadow-none focus-within:ring-2 focus-within:ring-white/60 ${errors.phone ? "border-rose-300" : "border-white/70"}`}
                          prefixClassName="border-white/60 bg-slate-50/90 text-slate-700 group-focus-within:bg-white"
                          localInputClassName="h-12 bg-transparent text-right text-base text-slate-900 placeholder:text-slate-400"
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="block text-sm font-semibold text-white/85"
                      htmlFor={leadFieldIds.email}
                    >
                      {t.contact.email}
                    </label>
                    <input
                      id={leadFieldIds.email}
                      {...register("email")}
                      className={`h-12 w-full rounded-xl border bg-white/96 px-4 text-right text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/60 ${errors.email ? "border-rose-300" : "border-white/70"}`}
                      placeholder={
                        t.contact.email === "כתובת אימייל" ? "אימייל" : t.contact.email
                      }
                      aria-label={t.contact.email}
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="h-12 w-full rounded-xl bg-slate-950 px-6 text-base font-semibold text-white transition-all hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
                    >
                      {t.home.leadForm.submit}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="bg-white px-6 py-8 text-right md:px-9 lg:px-10 lg:py-9">
              <div className="flex h-full flex-col justify-center">
                <h2 className="text-3xl font-bold text-slate-950 leading-[0.95] md:text-4xl xl:text-5xl">
                  {t.home.leadForm.title}
                </h2>
                <p className="mt-4 max-w-sm text-xl leading-relaxed text-slate-500 md:text-[1.65rem]">
                  {t.home.leadForm.description}
                </p>
                <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-l from-[#163b63] to-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            {t.home.faq.title}
          </h2>
          <div className="w-20 h-1 bg-slate-900 mx-auto rounded-full" />
        </div>
        <FaqSection items={t.home.faq.items} />
      </section>

      {/* Clients Section */}
      <ClientsSection />
    </main>
  );
};
