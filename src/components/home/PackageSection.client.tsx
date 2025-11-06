"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SwiperLazy, { SwiperSlide } from "@/components/lazy/SwiperLazy";
import { Navigation } from "swiper/modules";
import HeaderTitle from "@/components/layout/HeaderTitle";
import SubHeaderTitle from "@/components/layout/SubHeaderTitle";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";

import ToursCardSalkantay from "@/components/tours/ToursCardSalkantay";

type Tour = {
  slug: string;
  titulo: string;
  resumen?: string;
  precio?: number | string;
  tipo?: number | string;
  foto_principal?: string;
  alt_principal: string;
  itinerarios_count?: number;
  ubicaciones?: Array<{ nombre: string; slug: string }>;
  tipo_categoria?: { nombre: string };
};

export default function PackageSection({
  id,
  data = [],
  tipo,
}: {
  id?: string;
  data: Tour[];
  tipo: number; // 1 = paquetes (slider), 0 = tours (grid)
}) {
  const { t } = useTranslation();
  const tours = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const title = tipo === 1 ? t("paquetes_destacados.title") : t("tours_destacados.title");
  const subtitle = tipo === 1 ? t("paquetes_destacados.description") : t("tours_destacados.description");

  // === props ESTABLES SWIPER ===
  const modules = useMemo(() => [Navigation], []);
  const breakpoints = useMemo(
    () => ({
      640:  { slidesPerView: 1.2 },
      768:  { slidesPerView: 2.2 },
      1024: { slidesPerView: 3.2 },
    }),
    []
  );
  const swiperFlags = useMemo(
    () => ({
      observeParents: false,
      observer: false,
      resizeObserver: false,
      updateOnWindowResize: false,
      watchSlidesProgress: true,
      loop: tours.length > 1,
    }),
    [tours.length]
  );

  return (
    <section id={id} className="full-bleed" aria-labelledby={`${id}-heading`}>
      <div className="flex-col justify-center flex items-center py-10">
        <HeaderTitle title={title} etiqueta="h2"/>
        <SubHeaderTitle title={subtitle} />
        <SeparatorBarHorizontal />
      </div>

      <div className="w-full max-w-6xl mx-auto md:px-0 px-4">
        {tipo === 1 ? (
          <div className="contain-layout contain-paint">
            <SwiperLazy
              modules={modules}
              navigation
              spaceBetween={20}
              slidesPerView={1.2}
              breakpoints={breakpoints}
              className="arrows--small"
              aria-roledescription="Carrusel de paquetes destacados"
              {...swiperFlags}
            >
              {tours.map((tour) => (
                <SwiperSlide key={tour.slug /* clave estable */}>
                  <article aria-label={tour.titulo}>
                    <ToursCardSalkantay
                      title={tour.tipo_categoria?.nombre || ""}
                      image={tour.foto_principal || ""}
                      altimage={tour.alt_principal || ""}
                      location={(tour.ubicaciones || []).map((u) => u.nombre).join(", ")}
                      description={tour.titulo}
                      price={tour.precio}
                      resumen={tour.resumen || ""}
                      dias={tour.itinerarios_count || 1}
                      group="Min 4"
                      slug={tour.slug}
                      tipo={Number(tour.tipo)}
                      category={tour.ubicaciones?.[0]?.slug}
                    />
                  </article>
                </SwiperSlide>
              ))}
            </SwiperLazy>
          </div>
        ) : (
          <div className="grid grid-cols-12 md:gap-x-11 gap-x-0 gap-y-8">
            {tours.map((tour) => (
              <div key={tour.slug} className="col-span-12 md:col-span-4">
                <article aria-label={tour.titulo}>
                  <ToursCardSalkantay
                    title={tour.tipo_categoria?.nombre || ""}
                    image={tour.foto_principal || ""}
                    altimage={tour.alt_principal || ""}
                    location={(tour.ubicaciones || []).map((u) => u.nombre).join(", ")}
                    description={tour.titulo}
                    price={tour.precio}
                    resumen={tour.resumen || ""}
                    dias={tour.itinerarios_count || 1}
                    group="Min 4"
                    slug={tour.slug}
                    tipo={Number(tour.tipo)}
                    category={tour.ubicaciones?.[0]?.slug}
                  />
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
