import { MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "../../../constants.js";

export const SectorHeroActions = ({ className = "" }) => (
  <div
    className={`flex flex-col items-stretch justify-center gap-3 sm:flex-row ${className}`}
    dir="rtl"
  >
    <a
      href={`tel:${CONTACT.PHONE}`}
      className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl shadow-white/20 transition hover:-translate-y-0.5 hover:bg-slate-100 sm:min-w-64"
    >
      <Phone className="h-5 w-5" />
      קבע שיחת ייעוץ
    </a>
    <a
      href={`https://wa.me/${CONTACT.WHATSAPP}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:min-w-64"
    >
      <MessageCircle className="h-5 w-5" />
      שלח הודעה בוואטסאפ
    </a>
  </div>
);
