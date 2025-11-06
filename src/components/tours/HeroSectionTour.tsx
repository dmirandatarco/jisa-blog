import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import Image from "next/image";

type Props = {
  backgroundImage: string;
  overlayColor?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

/** Hero con imagen optimizada (Next/Image) y overlay */
export default function HeroSectionTour({
  backgroundImage,
  overlayColor = "rgba(0, 0, 0, 0.35)",
  title,
  description,
}: Props) {
  return (
    <section className="md:h-[90vh] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-auto bg-cover bg-center relative flex flex-col justify-end items-center text-white text-center p-4">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title || "Fondo"}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
          aria-hidden
        />
      </div>

      {/* Contenido */}
      <div className="relative max-w-7xl w-full mx-auto h-full flex items-end p-4">
        <div className="w-full grid grid-cols-12 gap-4 md:h-[75%]">
          <div className="md:col-span-6 col-span-12 flex flex-col md:items-start items-center justify-center">
            <h1 className="md:text-6xl text-xl w-full md:text-left text-center font-black">
              {title}
            </h1>
            {description && (
              <p className="md:text-xl text-sm w-full md:text-left text-center md:pe-72">
                {description}
              </p>
            )}
            <SeparatorBarHorizontal />
          </div>
          <div className="md:col-span-6 col-span-12" />
        </div>
      </div>
    </section>
  );
}