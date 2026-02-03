export const ParallaxHeader = ({
  image,
  mobileImage = image,
  title,
  subtitle,
  height = "h-[500px]",
  overlayOpacity = "bg-black/40",
}) => {
  return (
    <div
      className={`relative w-full ${height} parallax flex items-center justify-center overflow-hidden`}
    >
      <picture className="absolute inset-0 w-full h-full">
        <source media="(max-width: 768px)" srcSet={mobileImage} />
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          aria-hidden="true"
        />
      </picture>
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 drop-shadow-lg tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md italic">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
