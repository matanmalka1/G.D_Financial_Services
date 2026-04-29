import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { CheckCircle2, Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";
import { useContactForm } from "../hooks/useContactForm";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/primitives/Button";
import { PhoneNumberInput } from "../components/ui/PhoneNumberInput";
import { submitContactForm } from "../services/contactService";
import { useSeo } from "../hooks/useSeo";

export const Contact = () => {
  const { t, isRtl } = useSiteContent();
  useSeo({
    title: t.contact.title,
    description: "צרו קשר עם G.D Financial Services לקבלת ייעוץ פיננסי מקצועי.",
  });

  const { form, handleSubmit: submitContact } = useContactForm(t, async (data) => {
    const loadingToast = toast.loading(t.contact.sending);
    try {
      await submitContactForm(data, "Contact Form - G.D Financial Services");
      toast.success(t.contact.success, { id: loadingToast });
    } catch (error) {
      toast.error(t.contact.submitError, { id: loadingToast });
      throw error;
    }
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const onError = () => {
    toast.error(t.contact.error);
  };

  const serviceOptions = [
    { value: "Business Plan", label: t.nav.businessPlans },
    { value: "Business Presentations", label: t.nav.businessPresentations },
    { value: "Sell-side Advisory", label: t.nav.sellSideAdvisory },
    { value: "Business Consulting", label: t.nav.businessConsulting },
  ];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_25%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_15%_90%,rgba(255,255,255,0.08),transparent_45%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div className={isRtl ? "text-right" : "text-left"}>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-white/55">
              G.D Financial Services
            </p>
            <h1 className="font-serif text-4xl font-black leading-tight text-white md:text-6xl">
              {t.contact.title}
            </h1>
            <p
              className="mt-6 max-w-2xl text-lg leading-9 text-white/72"
              dir={isRtl ? "rtl" : "ltr"}
              style={{ unicodeBidi: "plaintext" }}
            >
              {t.contact.heroDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur">
            <p className="text-sm font-bold text-white/60">
              {t.contact.contactDetailsTitle}
            </p>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/82">
              <a
                href={`tel:${t.footer.phone}`}
                className="flex items-center gap-3 transition hover:text-white"
                dir="ltr"
              >
                <Phone className="h-5 w-5 text-white/55" strokeWidth={1.8} />
                <span>{t.footer.phone}</span>
              </a>
              <a
                href={`mailto:${t.footer.email}`}
                className="flex items-center gap-3 transition hover:text-white"
                dir="ltr"
              >
                <Mail className="h-5 w-5 text-white/55" strokeWidth={1.8} />
                <span>{t.footer.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-white/55" strokeWidth={1.8} />
                <span>{t.footer.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="order-2 rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:order-1">
            <h2 className="text-xl font-bold text-slate-950">
              {t.contact.nextStepsTitle}
            </h2>
            <div className="mt-6 space-y-5">
              {t.contact.nextSteps.map((item) => (
                <div key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-slate-900"
                    strokeWidth={1.8}
                  />
                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3 text-slate-950">
                <Clock3 className="h-5 w-5" strokeWidth={1.8} />
                <span className="font-bold">{t.contact.responseTitle}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {t.contact.responseDescription}
              </p>
            </div>
          </aside>

          <div className="order-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-8 lg:order-2">
            <div className={`mb-8 ${isRtl ? "text-right" : "text-left"}`}>
              <p className="text-sm font-bold text-slate-500">
                {t.contact.formEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                {t.contact.formTitle}
              </h2>
            </div>
            <form
              onSubmit={form.handleSubmit(submitContact, onError)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.contact.fullName}*
                  </label>
                  <input
                    {...register("fullName")}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm shadow-slate-900/5 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${errors.fullName ? "border-red-500" : "border-slate-200 focus:border-slate-400"}`}
                    placeholder={t.contact.fullNamePlaceholder}
                    dir={isRtl ? "rtl" : "ltr"}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.contact.email}*
                  </label>
                  <input
                    {...register("email")}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm shadow-slate-900/5 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${errors.email ? "border-red-500" : "border-slate-200 focus:border-slate-400"}`}
                    placeholder={t.contact.emailPlaceholder}
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneNumberInput
                        label={`${t.contact.phone}*`}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.phone?.message}
                        isRtl={isRtl}
                        className="space-y-0"
                        inputClassName={`rounded-xl shadow-sm shadow-slate-900/5 hover:shadow-none ${errors.phone ? "border-red-500" : "border-slate-200"} focus-within:ring-2 focus-within:ring-slate-900/20 transition-all`}
                        localInputClassName="py-3"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.contact.service}*
                  </label>
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        options={serviceOptions}
                        placeholder={t.contact.selectPlaceholder}
                        dir={isRtl ? "rtl" : "ltr"}
                        className={errors.service ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.service.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.contact.message}*
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm shadow-slate-900/5 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 ${errors.message ? "border-red-500" : "border-slate-200 focus:border-slate-400"}`}
                  placeholder={t.contact.messagePlaceholder}
                  dir={isRtl ? "rtl" : "ltr"}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="solid"
                size="lg"
                className="w-full gap-2 rounded-xl text-lg shadow-xl shadow-slate-200"
              >
                <span>{t.contact.submit}</span>
                <Send className="h-5 w-5" strokeWidth={1.8} />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
