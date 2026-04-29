import { FileText, TrendingUp, Handshake, PresentationIcon } from "lucide-react";
import { Button } from "./primitives/Button";

const iconMap = {
  FileText,
  TrendingUp,
  Handshake,
  PresentationIcon,
};

export const FeatureBubble = ({ icon, title, onClick }) => {
  const Icon = iconMap[icon];
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      aria-label={title}
      className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 border border-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
      {Icon ? <Icon className="w-10 h-10 text-slate-700" strokeWidth={1.5} /> : null}
    </Button>
  );
};
