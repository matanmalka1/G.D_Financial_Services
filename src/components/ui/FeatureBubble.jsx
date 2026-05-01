import { FileText, TrendingUp, Handshake, PresentationIcon } from "lucide-react";
import { Button } from "./primitives/Button";

const iconsByName = {
  FileText,
  TrendingUp,
  Handshake,
  PresentationIcon,
};

export const FeatureBubble = ({ icon, title, onClick }) => {
  const Icon = iconsByName[icon];

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      aria-label={title}
      className="flex transform flex-col items-center rounded-3xl border border-slate-50 bg-white p-8 text-center shadow-xl shadow-slate-200/50 transition-transform duration-300 hover:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
      {Icon ? (
        <Icon className="h-10 w-10 text-slate-700" strokeWidth={1.5} />
      ) : null}
    </Button>
  );
};
