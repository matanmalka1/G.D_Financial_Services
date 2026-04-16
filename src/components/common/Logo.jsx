import logoSrc from "../../assets/logo.avif";
import { useLanguage } from "../../hooks/useLanguage";

export const Logo = ({ size = 40, className = "" }) => {
  const { t } = useLanguage();

  return (
    <img
      src={logoSrc}
      alt={t.footer.brandAlt}
      className={`rounded-full object-cover shadow-sm ${className}`.trim()}
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
};
