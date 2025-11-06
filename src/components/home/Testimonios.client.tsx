"use client";

import { useMemo, useCallback } from "react";
import SwiperLazy, { SwiperSlide } from "@/components/lazy/SwiperLazy";
import { Autoplay, Pagination } from "swiper/modules";
import TripadvisorReview from "@/components/reviews/TripadvisorReview";
import GoogleTestimonio from "@/components/reviews/GoogleTestimonio";

type Review = {
  nombre?: string;
  imagen?: string;
  fecha?: string;
  estrellas?: number;
  descripcion?: string;
  contribuciones?: string;
};

export default function Testimonios({
  marca,
  data = [],
  total,
  totalGoogle,
}: {
  marca: "Tripadvisor" | "Google";
  data?: Review[];
  total?: number;
  totalGoogle?: number;
}) {
  const testimonios = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  if (testimonios.length === 0) return null;

  const modules = useMemo(() => [Pagination, Autoplay], []);
  const breakpoints = useMemo(
    () => ({
      320:  { slidesPerView: 1,   spaceBetween: 10 },
      480:  { slidesPerView: 1.5, spaceBetween: 15 },
      640:  { slidesPerView: 2,   spaceBetween: 20 },
      768:  { slidesPerView: 2.3, spaceBetween: 25 },
      1024: { slidesPerView: 3,   spaceBetween: 30 },
      1280: { slidesPerView: 3,   spaceBetween: 30 },
    }),
    []
  );
  const autoplay = useMemo(() => ({ delay: 2500, disableOnInteraction: false }), []);
  const pagination = useMemo(() => ({ clickable: true }), []);
  const swiperFlags = useMemo(
    () => ({
      observeParents: false,
      observer: false,
      resizeObserver: false,
      updateOnWindowResize: false,
      watchSlidesProgress: true,
      loop: testimonios.length > 1,
    }),
    [testimonios.length]
  );
  const keyOf = useCallback(
    (r: Review, i: number) => `${r.nombre ?? "anon"}-${r.fecha ?? i}-${i}`,
    []
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-12 items-center px-6">
        <div className="md:col-span-9 col-span-12">
          <div className="contain-layout contain-paint">
            <SwiperLazy
              modules={modules}
              breakpoints={breakpoints}
              pagination={pagination}
              autoplay={autoplay}
              className="mySwiperTestimonio"
              {...swiperFlags}
            >
              {testimonios.map((comentario, i) => (
                <SwiperSlide key={keyOf(comentario, i)}>
                  {marca === "Tripadvisor" ? (
                    <TripadvisorReview review={comentario} />
                  ) : (
                    <GoogleTestimonio review={comentario} />
                  )}
                </SwiperSlide>
              ))}
            </SwiperLazy>
          </div>

          <div className="flex justify-center py-4">
            {marca === "Tripadvisor" ? (
              <p className="text-center">
                La evaluación general en <span className="text-JisaCyan font-bold">Tripadvisor</span> es{" "}
                <span className="text-JisaCyan font-bold">5.0</span> de 5, en base a
                <span className="text-JisaCyan font-bold"> {total} reseñas</span>
              </p>
            ) : (
              <p className="text-center">
                La evaluación general en <span className="text-[#eb4939] font-bold">Google</span> es{" "}
                <span className="text-[#eb4939] font-bold">5.0</span> de 5, en base a
                <span className="text-[#eb4939] font-bold"> {totalGoogle} reseñas</span>
              </p>
            )}
          </div>
        </div>

        {/* Ilustración (oculta en mobile) */}
        <div className="md:col-span-3 col-span-12 justify-center md:flex hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/044/248/881/small_2x/young-tourist-with-backpack-and-map-png.png"
            alt="Jisa-Nosotros-Paquete"
            className="w-44"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
