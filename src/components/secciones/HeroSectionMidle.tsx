import Image from "next/image";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";

type Props = {
  backgroundImage: string;           // puede ser local o remota (asegúrate en next.config.mjs)
  overlayColor?: string;
  title?: string;
  description?: string;
  alt?: string;                      // NUEVO: texto alternativo
};

export default function HeroSectionMidle({
  backgroundImage,
  overlayColor = "rgba(0, 0, 0, 0.35)",
  title,
  description,
  alt = "Imagen de cabecera",
}: Props) {
  return (
    <section className="relative flex flex-col justify-end items-center text-white text-center p-4 md:py-32 py-16 md:h-[95vh] h-auto overflow-hidden">
      {/* Fondo como contenido (cuenta para LCP y tiene alt) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={alt}
          fill
          priority                // marca esta imagen como LCP
          fetchPriority="high"
          sizes="100vw"           // responsive real
          quality={70}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-0" style={{ backgroundColor: overlayColor }} />

      {/* Contenido */}
      <div className="relative bottom-0 max-w-7xl w-full flex flex-col">
        <div className="grid grid-cols-5 gap-4">
          <div className="md:col-span-5 col-span-5 flex flex-col items-center">
            {title && (
              <h1 className="md:text-5xl text-2xl text-white text-center font-bold mb-4">
                {title}
              </h1>
            )}
            <SeparatorBarHorizontal />
            {description && (
              <p className="text-xl pt-6 mb-6 w-full text-center">{description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
