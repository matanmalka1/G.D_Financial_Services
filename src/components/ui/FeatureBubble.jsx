import { Button } from './primitives/Button';

export const FeatureBubble = ({ icon, title, onClick }) => (
  <Button
    onClick={onClick}
    variant="ghost"
    className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 border border-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
  >
    <span className="text-4xl mb-4">{icon}</span>
    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
  </Button>
);
