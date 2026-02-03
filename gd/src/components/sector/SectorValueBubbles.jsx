export const SectorValueBubbles = ({ title, bubbles = [] }) => {
  if (!bubbles.length) return null;

  return (
    <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-slate-300/50 border border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/10 pointer-events-none" />
      <div className="relative space-y-10">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {bubbles.map((bubble, idx) => (
            <div
              key={bubble.title + idx}
              className="bg-white text-slate-900 rounded-3xl p-6 shadow-lg shadow-slate-900/10 border border-slate-100/80 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl mb-4">
                {bubble.icon}
              </div>
              <h4 className="text-lg font-bold mb-2 leading-snug">{bubble.title}</h4>
              {bubble.description && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {bubble.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
