import { useState } from "react";

export const FaqSection = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="border border-slate-200 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between px-6 py-5 text-right bg-white hover:bg-slate-50 transition-colors"
          >
            <span className="text-lg font-semibold text-slate-900 leading-snug">
              {item.q}
            </span>
            <span
              className={`mr-4 text-slate-500 text-xl transition-transform duration-200 shrink-0 ${openIndex === idx ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-6 pt-1 bg-white text-slate-600 text-base leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
