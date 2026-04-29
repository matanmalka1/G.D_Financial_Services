import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "../../../constants.js";
import { routes } from "../../../routes/paths.js";

export const SectionLabel = ({ children, light = false }) => (
  <span
    className={`mb-4 inline-block text-xs font-bold uppercase tracking-[0.18em] ${
      light ? "text-white" : "text-slate-900"
    }`}
  >
    {children}
  </span>
);

/** compact=true → smaller text + tighter spacing (used in BusinessPresentationsPage) */
export const SectionHeader = ({
  label,
  title,
  text,
  light = false,
  compact = false,
}) => (
  <div className={compact ? "mb-8 max-w-2xl" : "mb-12 max-w-3xl"}>
    <SectionLabel light={light}>{label}</SectionLabel>
    <h2
      className={`font-serif font-black leading-tight ${
        compact ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"
      } ${light ? "text-white" : "text-slate-900"}`}
    >
      {title}
    </h2>
    {text ? (
      <p
        className={`${compact ? "mt-3 text-base leading-7" : "mt-5 text-lg leading-8"} ${
          light ? "text-white/65" : "text-slate-600"
        }`}
      >
        {text}
      </p>
    ) : null}
  </div>
);

export const CtaButtons = ({ dark = false }) => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <a
      href={`tel:${CONTACT.PHONE}`}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-bold transition hover:-translate-y-0.5 ${
        dark
          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
          : "bg-white text-slate-900 shadow-xl shadow-white/20 hover:bg-slate-100"
      }`}
    >
      <Phone className="h-5 w-5" />
      קבעו שיחת היכרות
    </a>
    <a
      href={`https://wa.me/${CONTACT.WHATSAPP}`}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-bold transition hover:-translate-y-0.5 ${
        dark
          ? "border border-slate-900/20 bg-white/25 text-slate-900 hover:bg-white/40"
          : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      <MessageCircle className="h-5 w-5" />
      שלחו הודעה בוואטסאפ
    </a>
  </div>
);

export const HeroBackground = () => (
  <>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_15%_80%,rgba(255,255,255,0.08),transparent_45%)]" />
  </>
);

export const HeroStatGrid = ({ stats, cols = 3 }) => (
  <div
    className={`mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-xl shadow-slate-950/10 sm:grid-cols-${cols}`}
  >
    {stats.map(([value, label]) => (
      <div key={label} className="bg-white p-7 text-center">
        <strong className="block font-serif text-3xl font-black text-slate-900">
          {value}
        </strong>
        <span className="mt-2 block text-sm text-slate-500">{label}</span>
      </div>
    ))}
  </div>
);

export const ContactCtaSection = ({ label, title, text, bg = "bg-white" }) => (
  <section className={`${bg} px-4 py-20 sm:px-6 lg:px-8 lg:py-28`}>
    <div className="mx-auto max-w-3xl text-center">
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="font-serif text-4xl font-black leading-tight text-slate-900 md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-900/75">
        {text}
      </p>
      <div className="mt-10 flex justify-center">
        <CtaButtons dark />
      </div>
      <Link
        to={routes.contact()}
        className="mt-8 inline-flex items-center gap-2 font-bold text-slate-900 underline underline-offset-8"
      >
        מעבר לעמוד יצירת קשר
        <ArrowLeft className="h-4 w-4" />
      </Link>
    </div>
  </section>
);
