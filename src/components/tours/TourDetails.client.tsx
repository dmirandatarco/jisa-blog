"use client";

import { useTranslation } from "react-i18next";
import ParrafoContent from "@/components/layout/ParrafoContent";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Ubic = { nombre: string; slug: string };
type Tour  = { h1?: string; title?: string; canonical?: string; slug?: string };

export default function TourDetails({
  tour,
  ubicaciones = [],
  descripcion = "",
  imagenSecundaria = "",
}: {
  tour: Tour;
  ubicaciones?: Ubic[];
  descripcion?: string; // HTML
  imagenSecundaria?: string;
}) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const ubic = Array.isArray(ubicaciones) && ubicaciones.length > 0 ? ubicaciones[0] : null;
  const ubicHref = ubic?.slug ? `/${ubic.slug}` : "/";

  // fallback seguro en cliente (sin window)
  const tourHref =
    tour?.canonical ||
    (tour?.slug ? `/tours/${tour.slug}` : pathname || "/tours");

  const breadcrumbItems = [
    { href: "/", label: "Inicio" },
    ...(ubic ? [{ href: ubicHref, label: ubic.nombre }] : []),
    { href: tourHref, label: tour.h1 || tour.title || "Detalle", current: true },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto mt-10 mb-16 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbItems} className="mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Texto y ubicaciones */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4">
          <div className="flex flex-wrap justify-center md:justify-start text-JisaVerde gap-x-2 gap-y-1">
            <h2 className="font-semibold text-sm sm:text-base">
              {ubicaciones.map((u) => u.nombre).join(" - ")}
            </h2>
          </div>

          <ParrafoContent
            className="text-JisaGris text-sm sm:text-base leading-relaxed"
            contenido={descripcion}
          />
        </div>

        {/* Imagen optimizada */}
        <div className="flex justify-center md:justify-start">
          {imagenSecundaria ? (
            <div className="relative w-full max-h-[400px]">
              <Image
                src={imagenSecundaria}
                alt={tour?.h1 || tour?.title || "Imagen del tour"}
                width={1000}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}