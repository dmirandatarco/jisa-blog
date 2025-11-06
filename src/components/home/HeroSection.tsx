import Image from "next/image";

type Props = {
  backgroundImage?: string;
  title?: string;
  description?: string;
  dataSearch?: any[];
  heightClass?: string;
  children?: React.ReactNode;
  isFirst?: boolean;
  blurDataURL?: string;
};

export default function HeroSection({
  backgroundImage,
  title,
  description,
  dataSearch,
  heightClass = "h-full",
  children,
  isFirst = false,
  blurDataURL,
}: Props) {
  const hasImg = Boolean(backgroundImage);

  return (
    <section className={`relative w-full ${heightClass} overflow-hidden bg-[#0b0b0b]`}>
      {hasImg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={title || "Hero Jisa Adventure"}
            fill
            priority                                  // solo aquí
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 100vw"   // mejor cálculo en móvil
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            quality={55}                              // apúntale a 150–250 KB reales
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center justify-center text-center">
        {title &&
          (isFirst ? (
            <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight uppercase drop-shadow">
              {title}
            </h1>
          ) : (
            <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight uppercase drop-shadow">
              {title}
            </h2>
          ))}
        {description && (
          <p className="mt-3 text-white/90 md:text-lg max-w-3xl">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
