import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { useSiteContent } from "../hooks/useSiteContent";
import { useContactForm } from "../hooks/useContactForm";
import { ParallaxHeader } from "../components/common/ParallaxHeader";
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

  const { form, handleSubmit: submitContact } = useContactForm(
    t,
    async (data) => {
      const loadingToast = toast.loading(t.contact.sending);
      try {
        await submitContactForm(data, "Contact Form - G.D Financial Services");
        toast.success(t.contact.success, { id: loadingToast });
      } catch (error) {
        toast.error(t.contact.error, { id: loadingToast });
        throw error;
      }
    },
  );

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const onError = () => {
    toast.error(t.contact.error);
  };

  const serviceOptions = [
    { value: "Business Presentations", label: t.nav.businessPresentations },
    { value: "Sell-side Advisory", label: t.nav.sellSideAdvisory },
    { value: "Business Consulting", label: t.nav.businessConsulting },
    { value: "Ongoing Advisory", label: t.nav.ongoingAdvisory },
  ];

  return (
    <main>
      <ParallaxHeader
        image="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=2000"
        title={t.contact.title}
      />

      <section className="py-24 max-w-3xl mx-auto px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-50">
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
                  className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? "border-red-500" : "border-slate-200"} focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all`}
                  placeholder={t.contact.fullNamePlaceholder}
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
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-slate-200"} focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all`}
                  placeholder={t.contact.emailPlaceholder}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
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
                      inputClassName={`rounded-lg shadow-none hover:shadow-none ${errors.phone ? "border-red-500" : "border-slate-200"} focus-within:ring-2 focus-within:ring-slate-900 transition-all`}
                      localInputClassName="px-4 py-3"
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
                className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-slate-200"} focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all`}
                placeholder={t.contact.messagePlaceholder}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="solid"
              size="lg"
              className="w-full text-lg rounded-xl shadow-xl shadow-slate-200"
            >
              {t.contact.submit}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};
