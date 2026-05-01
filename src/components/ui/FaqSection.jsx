import { useState, useRef, useEffect } from "react";

const FaqItem = ({ item, isOpen, onToggle, idx }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-[#fbfbfa]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${idx}`}
        id={`faq-question-${idx}`}
        className="flex min-h-12 w-full items-center justify-between bg-[#fbfbfa] px-4 py-3 text-right transition-colors hover:bg-slate-50"
      >
        <span className="text-base font-semibold leading-snug text-slate-900">
          {item.q}
        </span>
        <span
          className={`ms-3 shrink-0 text-base text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      <div
        id={`faq-answer-${idx}`}
        role="region"
        aria-labelledby={`faq-question-${idx}`}
        style={{ height, overflow: "hidden", transition: "height 250ms ease" }}
      >
        <div
          ref={contentRef}
          className="bg-[#fbfbfa] px-4 pb-4 pt-0 text-sm leading-6 text-slate-600"
        >
          {item.a}
        </div>
      </div>
    </div>
  );
};

export const FaqSection = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <FaqItem
          key={idx}
          item={item}
          idx={idx}
          isOpen={openIndex === idx}
          onToggle={() => toggle(idx)}
        />
      ))}
    </div>
  );
};
