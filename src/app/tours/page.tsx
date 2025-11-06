import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiPost } from "@/lib/api";

import HeroSectionMidle from "@/components/secciones/HeroSectionMidle";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeaderTitle from "@/components/layout/HeaderTitle";
import SubHeaderTitle from "@/components/layout/SubHeaderTitle";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import ToursLineSection from "@/components/secciones/ToursLineSection.client";

// SEO estático (puedes cambiar a metadata dinámica si luego viene del backend)
export const metadata: Metadata = {
  title: "Tours en Perú y Cusco, Machu Picchu, Ica",
  description:
    "Viaja por Perú con los mejores tours y paquetes turísticos: Cusco, Machu Picchu, Lago Titicaca, Arequipa, Paracas e Ica. Reserva tu viaje todo incluido.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://jisaadventure.com/tours" },
};

export default async function ToursPage() {
  // igual que tu React: idioma ES = 1 y tipo = 0
  const res = await apiPost<{ data: { tours: any[] } }>(
    "/tours-tipos",
    { idioma_id: 1, tipo: 0 },
    { cacheSeconds: 60, tags: ["tours"] }
  ).catch(() => undefined);

  const tours = res?.data?.tours;
  if (!tours) {
    // 404 de Next (usa tu not-found.tsx si lo tienes)
    notFound();
  }

  const breadcrumbItems = [
    { href: "/", label: "Inicio" },
    { href: "/tours", label: "Tours", current: true },
  ];

  return (
    <>
        <section className="full-bleed">
            <HeroSectionMidle
            backgroundImage="/agencia-de-viaje-cusco-jisaadventure.webp"
            title="Tours en Perú y Cusco"
            description="Viaja por Perú con los mejores tours y paquetes turísticos: Cusco, Machu Picchu, Lago Titicaca, Arequipa, Paracas e Ica. Reserva tu viaje todo incluido."
            />
        </section>

      <section className="w-full max-w-7xl mx-auto pb-24 mb-12">
        <div className="py-5">
          <Breadcrumbs items={breadcrumbItems} className="mb-4 max-w-7xl mx-auto px-4" />
        </div>

        <div className="flex-col justify-center flex items-center py-1">
          <HeaderTitle title="Tours destacados" />
          <SubHeaderTitle title="Explora nuestros tours seleccionados para ti." />
          <SeparatorBarHorizontal />
        </div>

        {/* Lista o carrusel; si quieres carrusel => carrusel={1} */}
        <ToursLineSection tours={tours} carrusel={0} />
      </section>
    </>
  );
}
