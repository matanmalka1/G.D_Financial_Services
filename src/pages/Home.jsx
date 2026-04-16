import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { useSiteContent } from "../hooks/useSiteContent";
import { useSeo } from "../hooks/useSeo";
import { useContactForm } from "../hooks/useContactForm";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
import { routePaths } from "../routes/paths";
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
        { title: t.home.bubbles.businessPlans, icon: "📋" },
        { title: t.home.bubbles.taxCoordination, icon: "🧾" },
        { title: t.home.bubbles.businessConsulting, icon: "💼" },
        { title: t.home.bubbles.ongoingAdvisory, icon: "📈" },
      ].slice(0, ITEMS_PER_PAGE.FEATURED_ARTICLES),
    [t.home.bubbles],
  );
  const handleContact = () => {
    analyticsService.trackEvent("owner_contact_click", { source: "home" });
    navigate(routePaths.contact);
  };
  const handleBubbleClick = (title) => {
    analyticsService.trackEvent("home_bubble_click", { title });
    navigate(routePaths.contact);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bubbles.map((bubble, idx) => (
            <FeatureBubble
              key={bubble.title + idx}
              icon={bubble.icon}
              title={bubble.title}
              onClick={() => handleBubbleClick(bubble.title)}
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
          className={`space-y-6 text-lg text-slate-600 leading-relaxed ${
            isRtl ? "text-right" : "text-left"
          }`}
          dir={isRtl ? "rtl" : "ltr"}
          style={{ unicodeBidi: "plaintext" }}
        >
          <p>{t.home.about.p1}</p>
          <p>{t.home.about.p2}</p>
          <p>{t.home.about.p3}</p>
          <ul className="w-full space-y-3 text-slate-700">
            {t.home.about.highlights?.map((item) => (
              <li
                key={item}
                className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse justify-end" : "justify-start"}`}
              >
                <span className="text-emerald-600 font-semibold" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold text-slate-800 text-right">
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

      <section className="py-16 px-4">
        <div className="max-w-[1680px] mx-auto rounded-[2.75rem] overflow-hidden bg-white shadow-[0_24px_70px_rgba(15,49,82,0.12)] border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-[480px_minmax(0,1fr)] items-stretch">
            <div className="bg-white px-8 py-12 text-right flex flex-col justify-center md:px-12 lg:px-16">
              <h2 className="text-4xl md:text-6xl font-bold text-slate-950 leading-[0.95]">
                {t.home.leadForm.title}
              </h2>
              <p className="mt-6 text-xl md:text-[2rem] text-slate-500 leading-relaxed">
                {t.home.leadForm.description}
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(submitLead, onLeadError)}
              className="bg-[#163b63] px-6 py-10 md:px-10 lg:px-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
                <button
                  type="submit"
                  className="h-16 rounded-[1.35rem] bg-slate-100 px-8 text-2xl font-semibold text-[#163b63] hover:bg-white transition-colors order-4 xl:order-1"
                >
                  {t.home.leadForm.submit}
                </button>
                <input
                  {...register("fullName")}
                  className={`h-16 rounded-[1.35rem] border border-white/70 bg-white px-6 text-right text-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/70 ${errors.fullName ? "border-red-400" : ""}`}
                  placeholder={t.contact.fullName}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneNumberInput
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.phone?.message}
                      isRtl={isRtl}
                      placeholder={t.contact.phone}
                      className="space-y-0"
                      inputClassName="h-16 rounded-[1.35rem] border-white/70 bg-white shadow-none hover:shadow-none focus-within:ring-2 focus-within:ring-white/70"
                      localInputClassName="h-16 pr-10 pl-4 text-right text-xl placeholder:text-slate-400"
                    />
                  )}
                />
                <input
                  {...register("email")}
                  className={`h-16 rounded-[1.35rem] border border-white/70 bg-white px-6 text-right text-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/70 ${errors.email ? "border-red-400" : ""}`}
                  placeholder={t.contact.email === "כתובת אימייל" ? "אימייל" : t.contact.email}
                />
              </div>
            </form>
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
