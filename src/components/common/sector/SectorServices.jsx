import { Check } from "lucide-react";

export const SectorServices = ({ title, services }) => (
  <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
    <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
      <span className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs">
        01
      </span>
      {title}
    </h4>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {services?.map((service, idx) => (
        <li
          key={idx}
          className="flex items-start gap-3 text-slate-600 group"
        >
          <Check className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors mt-0.5" strokeWidth={2.5} />
          <span>{service}</span>
        </li>
      ))}
    </ul>
  </div>
);
