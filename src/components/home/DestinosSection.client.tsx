"use client";

import { useMemo, useRef, useCallback, useState, memo } from "react";
import SwiperLazy, { SwiperSlide } from "@/components/lazy/SwiperLazy";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

type Destino = {
  nombre: string;
  descripcion: string;
  imagen: string;   // fondo grande
  altImagen: string;   // fondo grande
  slug: string;
  tours_count: number;
};

function DestinosSectionBase({
  id,
  data = [],
}: { id?: string; data?: Destino[] }) {
  // Array estable
  const tours = useMemo<Destino[]>(
    () => (Array.isArray(data) ? data : []),
    [data]
  );
  if (!tours.length) return null;

  // Evitar setState redundante
  const [activeIndex, _setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const setActiveIndex = useCallback((i: number) => {
    if (i !== activeIndexRef.current) {
      activeIndexRef.current = i;
      _setActiveIndex(i);
    }
  }, []);

  // ======= PROPS ESTABLES PARA SWIPER =======
  const modules = useMemo(() => [Autoplay, Navigation], []);
  const breakpoints = useMemo(
    () => ({
      320:  { slidesPerView: 1,   spaceBetween: 12 },
      640:  { slidesPerView: 2,   spaceBetween: 18 },
      1024: { slidesPerView: 2.3, spaceBetween: 24 },
    }),
    []
  );
  const autoplay = useMemo(
    () => ({ delay: 2500, disableOnInteraction: false }),
    []
  );
  const handleSlideChange = useCallback(
    (sw: any) => setActiveIndex(sw?.realIndex ?? 0),
    [setActiveIndex]
  );

  // Flags que evitan re-inits por observers
  const swiperFlags = useMemo(
    () => ({
      observeParents: false,
      observer: false,
      resizeObserver: false,
      updateOnWindowResize: false,
      watchSlidesProgress: true,
      loop: tours.length > 1, // evita rarezas con 1 slide
    }),
    [tours.length]
  );

  const active = useMemo(
    () => tours[Math.min(activeIndex, tours.length - 1)],
    [tours, activeIndex]
  );

  return (
    <section id={id} className="full-bleed overflow-hidden">
      {/* Fondo + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        aria-hidden="true"
      >
        <Image
          src="/trekking-banner.webp"
          alt="Destinos en el Peru"
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl py-16 cv-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Texto */}
          <div className="md:col-span-4 col-span-12 px-6 md:pl-12 text-white">
            <h2 className="block font-semibold text-xl">Destinos</h2>
            <h3 className="font-bold text-5xl mt-1">{active?.nombre}</h3>
            <div className="mt-3 mb-4 h-2 w-20 bg-[#1B9C9E] rounded" />
            <p className="font-light md:text-base text-sm leading-relaxed line-clamp-10">
              {active?.descripcion}
            </p>

            <a
              href={`/${active?.slug}`}
              className="inline-flex items-center gap-2 bg-[#1B9C9E] text-white font-semibold rounded-md px-6 py-2 mt-6"
            >
              ({active?.tours_count}) Tours disponibles
            </a>
          </div>

          {/* Carrusel */}
          <div className="md:col-span-8 col-span-12">
            <div className="px-6 md:px-10">
              <SwiperLazy
                modules={modules}
                navigation
                autoplay={autoplay}
                breakpoints={breakpoints}
                onSlideChange={handleSlideChange}
                className="mySwiper"
                {...swiperFlags}
              >
                {tours.map((t) => (
                  <SwiperSlide key={t.slug /* clave estable */}>
                    <div className="w-full md:h-[440px] h-[360px] rounded-2xl overflow-hidden">
                      <img
                        src={t.imagen}
                        alt={t.altImagen}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </SwiperLazy>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Evita re-render si id/data no cambian shallowmente
export default memo(DestinosSectionBase);
