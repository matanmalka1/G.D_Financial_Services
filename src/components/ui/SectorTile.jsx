import { Link } from 'react-router-dom';

export const SectorTile = ({ sector, title, subtitle, isRtl }) => (
  <Link
    to={sector.path}
    className="group relative h-[350px] overflow-hidden rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500"
  >
    <img
      src={sector.image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-10">
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <div className="flex items-center gap-3 text-white/80 font-medium group-hover:gap-5 transition-all">
        <span>{subtitle}</span>
        <svg
          className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </Link>
);
