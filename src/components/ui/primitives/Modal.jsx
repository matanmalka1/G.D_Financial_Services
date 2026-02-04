import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";

export const Modal = ({
  open,
  onClose,
  title,
  children,
  isRtl = false,
  maxWidth = "max-w-2xl",
  showClose = true,
  padded = true,
}) => (
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
              className={`relative w-full ${maxWidth} overflow-hidden rounded-3xl bg-white/95 shadow-[0_20px_70px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/10 backdrop-blur-xl ${padded ? "p-6 sm:p-8" : ""} ${isRtl ? "text-right" : "text-left"}`}
              dir={isRtl ? "rtl" : "ltr"}
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-slate-900 via-amber-500 to-emerald-500" />

              {showClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  className={`absolute top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${isRtl ? "left-4" : "right-4"}`}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : null}

              {title ? (
                <DialogTitle className="text-2xl sm:text-3xl font-semibold leading-snug text-slate-900 mb-4">
                  {title}
                </DialogTitle>
              ) : null}

              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
);
