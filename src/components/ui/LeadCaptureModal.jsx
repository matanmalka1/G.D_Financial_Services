import { useMemo, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Sparkles } from "lucide-react";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { Select } from "./Select";
import { Button } from "./primitives/Button";
import { Modal } from "./primitives/Modal";
import { useLanguage } from "../../hooks/useLanguage";
import { useContactForm } from "../../hooks/useContactForm";
const TextField = ({ label, placeholder, register, name, error }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
      {label}
    </label>
    <input
      {...register(name)}
      className={`w-full h-12 rounded-xl border px-4 text-slate-900 shadow-inner shadow-slate-900/5 focus:outline-none focus:ring-2 focus:ring-slate-900/70 ${error ? "border-red-400" : "border-slate-200"}`}
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export const LeadCaptureModal = ({
  open,
  onClose = () => {},
  onSubmit,
  isRtl: isRtlProp,
  services,
}) => {
  const { t, isRtl: contextIsRtl } = useLanguage();
  const isRtl = typeof isRtlProp === "boolean" ? isRtlProp : contextIsRtl;
  const copy = t?.modalForm || {};
  const { form, handleSubmit: submitLeadForm } = useContactForm(
    t,
    async (data) => {
      await onSubmit?.(data);
    },
    { includeMessage: false },
  );

  const {
    control,
    register,
    formState: { errors },
    reset,
  } = form;

  const serviceOptions = useMemo(() => {
    if (services?.length) return services;
    if (t?.nav)
      return [
        { value: "business-plan", label: t.nav.businessPlans },
        { value: "sell-side", label: t.nav.sellSideAdvisory },
        { value: "banking", label: t.nav.ongoingAdvisory },
        { value: "presentations", label: t.nav.businessPresentations },
      ].filter((opt) => Boolean(opt.label));
    return [];
  }, [services, t]);

  const handleClose = useCallback(() => {
    reset();
    onClose?.();
  }, [onClose, reset]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      isRtl={isRtl}
      title={copy.title || ""}
      maxWidth="max-w-2xl"
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold tracking-tight shadow-md shadow-slate-900/20">
          <Sparkles className="h-4 w-4" />
          <span>{copy.badge || ""}</span>
        </div>
      </div>

      <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
        {copy.description || ""}
      </p>

      <form
        className="mt-8 space-y-6"
        onSubmit={form.handleSubmit(submitLeadForm)}
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label={copy.fullNameLabel || ""}
            placeholder={copy.fullNamePlaceholder || ""}
            register={register}
            name="fullName"
            error={errors.fullName?.message}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneNumberInput
                label={copy.phoneLabel || ""}
                value={field.value}
                onChange={field.onChange}
                error={errors.phone?.message}
                isRtl={isRtl}
                className="h-full"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label={copy.emailLabel || ""}
            placeholder={copy.emailPlaceholder || ""}
            register={register}
            name="email"
            error={errors.email?.message}
          />

          <div className="flex flex-col justify-end">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {copy.serviceLabel || ""}
            </label>
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  options={serviceOptions}
                  placeholder={copy.servicePlaceholder || ""}
                  dir={isRtl ? "rtl" : "ltr"}
                  className={`h-12 ${errors.service ? "border-red-400" : ""}`}
                />
              )}
            />
            {errors.service && (
              <p className="mt-1 text-xs text-red-500">
                {errors.service.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="solid"
          size="lg"
          className="w-full rounded-xl bg-slate-900 text-white shadow-xl shadow-slate-900/15 hover:bg-slate-800"
        >
          {copy.submit || ""}
        </Button>
      </form>
    </Modal>
  );
};
