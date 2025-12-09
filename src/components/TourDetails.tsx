"use client";

import ParrafoContent from "./layout/ParrafoContent";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function TourDetails({
  tour,
  ubicaciones = [],
  descripcion,
  brochure,
  imagenSecundaria,
}: {
  tour: any;
  ubicaciones?: Array<{ slug: string; nombre: string }>;
  descripcion?: string;
  brochure?: string;
  imagenSecundaria?: string;
}) {
  const ubic = Array.isArray(ubicaciones) && ubicaciones?.length > 0 ? ubicaciones[0] : null;
  const ubicHref = ubic?.slug ? `/${ubic.slug}` : "/";
  const tourHref = tour?.canonical ?? (tour?.slug ? `/tours/${tour.slug}` : "/tours");

  const breadcrumbItems = [
    { href: "/", label: "Inicio" },
    ...(ubic ? [{ href: ubicHref, label: ubic.nombre }] : []),
    { href: tourHref, label: tour?.h1 || tour?.title || "Detalle", current: true },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 mb-16 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbItems} className="mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Texto */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4">
          <div className="flex flex-wrap justify-center md:justify-start text-JisaVerde gap-x-2 gap-y-1">
            <h2 className="font-semibold text-sm sm:text-base">
              {(ubicaciones ?? []).map((u) => u.nombre).join(" - ")}
            </h2>
          </div>
          <ParrafoContent
            className="text-JisaGris text-sm sm:text-base leading-relaxed"
            contenido={descripcion}
          />
        </div>

        {/* Imagen */}
        <div className="flex justify-center md:justify-start">
          <img
            src={imagenSecundaria}
            alt="Jisa-Nosotros-Paquete"
            className="w-full h-auto object-cover rounded-lg shadow-md max-h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
