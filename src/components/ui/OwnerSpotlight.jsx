import { Button } from "./primitives/Button";
import ownerPhoto from "/owner_photo.avif";

export const OwnerSpotlight = ({ title, bio, buttonLabel, onContact }) => (
  <section className="bg-slate-900 py-24 text-white">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
      {/* Photo with animated rings */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {/* outer pulse ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-white/10 animate-ping [animation-duration:2.8s]" />
        {/* static glow ring */}
        <span className="absolute w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-full border border-white/20" />
        <div
          className="
            w-64 h-64 md:w-80 md:h-80
            rounded-full overflow-hidden
            border-4 border-slate-700
            shadow-2xl shadow-black/60
            transition-transform duration-500 ease-out
            hover:scale-105 hover:border-white/40
            cursor-pointer
          "
        >
          <img
            src={ownerPhoto}
            alt="Owner"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            style={{ objectPosition: "50% 0%" }}
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-6 italic">{title}</h2>
        <p className="text-xl text-slate-300 leading-relaxed mb-10">{bio}</p>
        <Button
          onClick={onContact}
          variant="ghost"
          className="px-10 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-lg"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  </section>
);
