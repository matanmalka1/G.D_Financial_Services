const logoSrc = "/logo.avif";

export const Logo = ({ size = 40, className = "" }) => (
  <img
    src={logoSrc}
    alt="G.D Financial Services logo"
    className={`rounded-full object-cover shadow-sm ${className}`.trim()}
    style={{ width: size, height: size }}
  />
);
