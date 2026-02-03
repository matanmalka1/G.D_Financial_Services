import { Button } from './primitives/Button';
import ownerPhoto from '/owner_photo.avif';

export const OwnerSpotlight = ({ title, bio, buttonLabel, onContact }) => (
  <section className="bg-slate-900 py-24 text-white">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
      <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-800 flex-shrink-0 shadow-2xl">
        <img
          src={ownerPhoto}
          alt="Owner"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 0%" }}
          loading="lazy"
        />
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
