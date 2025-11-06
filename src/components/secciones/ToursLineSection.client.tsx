"use client";

import GridNumber from "@/components/layout/GridNumber";
import RowNumber from "@/components/layout/RowNumber";
import ToursCardSalkantay from "@/components/tours/ToursCardSalkantay";

import SwiperLazy, { SwiperSlide } from "@/components/lazy/SwiperLazy";
import { Navigation } from "swiper/modules";

export default function ToursLineSection({
  tours = [],
  carrusel = 0,
}: {
  tours: any[];
  carrusel?: 0 | 1;
}) {
  if (carrusel === 1) {
    return (
      <SwiperLazy
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1.2}
        className="arrows--small"
        breakpoints={{
          640:  { slidesPerView: 1.2 },
          768:  { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
      >
        {tours.map((tour) => (
          <SwiperSlide key={tour.id}>
            <ToursCardSalkantay
              title={tour?.tipo_categoria?.nombre}
              image={tour?.foto_principal}
              altimage={tour?.alt_principal}
              location={(tour?.ubicaciones ?? []).map((u: any) => u.nombre).join(", ")}
              description={tour?.titulo}
              price={tour?.precio}
              resumen={tour?.resumen}
              dias={tour?.itinerarios_count}
              group="Min 4"
              slug={tour?.slug}
              tipo={tour?.tipo}
              category={tour?.ubicaciones?.[0]?.slug}
            />
          </SwiperSlide>
        ))}
      </SwiperLazy>
    );
  }

  // Lista sin carrusel
  return (
    <GridNumber col={12} className="md:gap-x-11 gap-x-0 pt-4">
      {tours.map((tour) => (
        <RowNumber key={tour.id}>
          <ToursCardSalkantay
            title={tour?.tipo_categoria?.nombre}
            image={tour?.foto_principal}
            altimage={tour?.alt_principal}
            location={(tour?.ubicaciones ?? []).map((u: any) => u.nombre).join(", ")}
            description={tour?.titulo}
            price={tour?.precio}
            resumen={tour?.resumen}
            dias={tour?.itinerarios_count}
            group="Min 4"
            slug={tour?.slug}
            tipo={tour?.tipo}
            category={tour?.ubicaciones?.[0]?.slug}
          />
        </RowNumber>
      ))}
    </GridNumber>
  );
}
