"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import HeaderTitle from "@/components/layout/HeaderTitle";
import JisaTitleContentVerde from "@/components/layout/JisaTitleContentVerde";
import FormContact from "@/components/FormContact";

type Props = {
  id?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function ContactSection({
  id,
  imageSrc = "https://static.vecteezy.com/system/resources/thumbnails/044/248/881/small_2x/young-tourist-with-backpack-and-map-png.png",
  imageAlt = "Joven turista con mochila y mapa",
}: Props) {
  const { t } = useTranslation();

  return (
    <section id={id} className="w-full max-w-7xl mx-auto mt-24 mb-12">
      <div className="grid grid-cols-12 gap-4">
        {/* Columna Izquierda: títulos + formulario */}
        <div className="md:col-span-7 col-span-12 h-auto flex flex-col md:items-start items-center justify-center md:px-10 px-6">
          <div className="md:ps-10 md:pe-32 px-4 flex flex-col md:items-start items-center">
            <SeparatorBarHorizontal />
            {/* SEO: H2 por defecto en home */}
            <HeaderTitle etiqueta="h2" title={t("contact_section.title")} />
            <JisaTitleContentVerde
              contenido={t(
                "contact_section.subtitle",
                "¿Listo para descubrir la belleza de Perú? Ponte en contacto con nosotros y hagamos realidad el viaje de tus sueños."
              )}
            />
          </div>

          <div className="w-full md:px-10 px-0 mt-6">
            <FormContact />
          </div>
        </div>

        {/* Columna Derecha: imagen optimizada */}
        <div className="md:col-span-5 col-span-12 h-auto flex items-center justify-center">
          <div className="relative w-full max-w-[520px] aspect-[4/5]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}