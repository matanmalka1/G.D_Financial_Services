import { Check } from "lucide-react";

export const SectorServices = ({ title, services }) => (
  <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl flex flex-col gap-6">
    <h4 className="text-2xl font-bold mb-2 flex items-center gap-3">
      <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white text-xs">
        01
      </span>
      {title}
    </h4>
    <ul className="grid grid-cols-1 gap-3">
      {services?.map((service, idx) => (
        <li
          key={idx}
          className="flex items-start gap-3 text-slate-200 group"
        >
          <Check
            className="w-5 h-5 text-white/70 group-hover:text-white transition-colors mt-0.5"
            strokeWidth={2.5}
          />
          <span className="leading-snug">{service}</span>
        </li>
      ))}
    </ul>
  </div>
);
