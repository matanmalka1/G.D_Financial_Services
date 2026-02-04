import { Fragment, useMemo } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Sparkles } from "lucide-react";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { Select } from "./Select";
import { Button } from "./primitives/Button";
import { useLanguage } from "../../hooks/useLanguage";
import { buildLeadCaptureSchema } from "../../validation/leadCaptureSchema";

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

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(buildLeadCaptureSchema(t)),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
    },
  });

  const serviceOptions = useMemo(() => {
    if (services?.length) return services;
    if (t?.nav) {
      return [
        { value: "business-plan", label: t.nav.businessPlans },
        { value: "sell-side", label: t.nav.sellSideAdvisory },
        { value: "banking", label: t.nav.ongoingAdvisory },
        { value: "presentations", label: t.nav.businessPresentations },
      ].filter((opt) => Boolean(opt.label));
    }
    return [];
  }, [services, t]);

  const submitLeadForm = (data) => {
    onSubmit?.(data);
    reset();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white/90 p-6 sm:p-8 shadow-[0_20px_70px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/10 backdrop-blur-xl ${isRtl ? "text-right" : "text-left"}`}
                dir={isRtl ? "rtl" : "ltr"}
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-slate-900 via-amber-500 to-emerald-500" />

                <button
                  type="button"
                  onClick={onClose}
                  className={`absolute top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${isRtl ? "left-4" : "right-4"}`}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-semibold tracking-tight shadow-md shadow-slate-900/20">
                    <Sparkles className="h-4 w-4" />
                    <span>{copy.badge || ""}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <DialogTitle className="text-2xl sm:text-3xl font-semibold leading-snug text-slate-900">
                    {copy.title || ""}
                  </DialogTitle>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                    {copy.description || ""}
                  </p>
                </div>

                <form
                  className="mt-8 space-y-6"
                  onSubmit={handleSubmit(submitLeadForm)}
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        {copy.fullNameLabel || ""}
                      </label>
                      <input
                        {...register("fullName")}
                        className={`w-full rounded-xl border px-4 py-3 text-slate-900 shadow-inner shadow-slate-900/5 focus:outline-none focus:ring-2 focus:ring-slate-900/70 ${errors.fullName ? "border-red-400" : "border-slate-200"}`}
                        placeholder={
                          copy.fullNamePlaceholder || ""
                        }
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        {copy.emailLabel || ""}
                      </label>
                      <input
                        {...register("email")}
                        className={`w-full rounded-xl border px-4 py-3 text-slate-900 shadow-inner shadow-slate-900/5 focus:outline-none focus:ring-2 focus:ring-slate-900/70 ${errors.email ? "border-red-400" : "border-slate-200"}`}
                        placeholder={copy.emailPlaceholder || ""}
                        inputMode="email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            className={errors.service ? "border-red-400" : ""}
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
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
