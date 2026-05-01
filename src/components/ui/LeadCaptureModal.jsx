import { useMemo, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Sparkles } from "lucide-react";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { Select } from "./Select";
import { Button } from "./primitives/Button";
import { FieldError, FieldLabel, TextField } from "./primitives/FormField";
import { Modal } from "./primitives/Modal";
import { useSiteContent } from "../../hooks/useSiteContent";
import { useContactForm } from "../../hooks/useContactForm";

export const LeadCaptureModal = ({
  open,
  onClose = () => {},
  onSubmit,
  services,
}) => {
  const { t } = useSiteContent();
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
      isRtl
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
            {...register("fullName")}
            error={errors.fullName?.message}
            variant="inset"
            inputSize="md"
            labelSpacing="sm"
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
                isRtl
                className="space-y-0"
                inputClassName={`h-12 rounded-xl shadow-inner shadow-slate-900/5 ${errors.phone ? "border-red-400" : "border-slate-200"} focus-within:ring-2 focus-within:ring-slate-900/70`}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label={copy.emailLabel || ""}
            placeholder={copy.emailPlaceholder || ""}
            {...register("email")}
            error={errors.email?.message}
            variant="inset"
            inputSize="md"
            labelSpacing="sm"
          />

          <div className="flex flex-col justify-end">
            <FieldLabel spacing="sm">{copy.serviceLabel || ""}</FieldLabel>
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  options={serviceOptions}
                  placeholder={copy.servicePlaceholder || ""}
                  className={`h-12 ${errors.service ? "border-red-400" : ""}`}
                />
              )}
            />
            <FieldError>{errors.service?.message}</FieldError>
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
