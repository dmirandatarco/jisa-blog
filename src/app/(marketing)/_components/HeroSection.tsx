import Image from "next/image";

type Props = {
  backgroundImage: string;     // URL absoluta o remota permitida en next.config
  title?: string;
  description?: string;
  blurDataURL?: string;
  className?: string;          // para posicionar como "absolute inset-0"
};

export default function HeroSection({
  backgroundImage,
  title = "Vive Perú como nunca antes",
  description,
  blurDataURL,
  className = "",
}: Props) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* IMAGEN LCP: priority + fetchPriority="high" + fill + sizes */}
      <Image
        src={backgroundImage}
        alt={title}
        priority
        fetchPriority="high"
        fill
        sizes="100vw"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        style={{ objectFit: "cover" }}
      />

      {/* Capa de contenido encima, solo HTML/CSS */}
      <div className="absolute inset-0 grid place-content-center text-center px-4">
        <h1 className="text-white text-3xl md:text-6xl font-extrabold drop-shadow-lg">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl mx-auto text-white/90 text-sm md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}