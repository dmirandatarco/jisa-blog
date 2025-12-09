"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";
import { Autoplay } from "swiper/modules";

// 1) Carga Swiper (React) solo en cliente, sin SSR
const Swiper = dynamic(
  () => import("swiper/react").then(m => m.Swiper),
  { ssr: false }
);
const SwiperSlide = dynamic(
  () => import("swiper/react").then(m => m.SwiperSlide),
  { ssr: false }
);

// 2) Pequeño helper para CSS ocioso (link)
function loadCss(href: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[data-href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  l.setAttribute("data-href", href);
  document.head.appendChild(l);
}

// 3) Cargar hoja de estilos Swiper en idle (CDN o propio)
function useSwiperCssIdle() {
  useEffect(() => {
    const run = () => {
      // Opción CDN (rápida de validar)
      loadCss("https://unpkg.com/swiper@10/swiper-bundle.min.css");
      // Opción local:
      // loadCss("/vendor/swiper/swiper-bundle.min.css");
    };
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(run, { timeout: 2000 });
    } else {
      setTimeout(run, 1200);
    }
  }, []);
}

type Slide = {
  id?: string | number;
  enlace?: string;
  titulo?: string;
  descripcion?: string;
  blurDataURL?: string;
};

export default function SwiperHero({
  detalles,
  dataSearch,
  onReady,
}: {
  detalles: Slide[];
  dataSearch?: any[];
  onReady?: () => void;
}) {
  // 4) CSS en idle (sin importar "swiper/css")
  useSwiperCssIdle();

  // 5) Omite el primer slide (LCP) y usa referencias estables
  const slides = useMemo<Slide[]>(() => {
    if (!Array.isArray(detalles) || detalles?.length <= 1) return [];
    return detalles.slice(1);
  }, [detalles]);

  // 6) Memoiza props de Swiper para evitar re-inits
  const modules = useMemo(() => [Autoplay], []);
  const autoplay = useMemo(() => ({ delay: 5000, disableOnInteraction: true }), []);
  const breakpoints = useMemo(
    () => ({
      320:  { slidesPerView: 1, spaceBetween: 24 },
      768:  { slidesPerView: 1, spaceBetween: 30 },
      1024: { slidesPerView: 1, spaceBetween: 30 },
    }),
    []
  );
  const flags = useMemo(
    () => ({
      observeParents: false,
      observer: false,
      resizeObserver: false,
      updateOnWindowResize: false,
      watchSlidesProgress: true,
      // Evita loop si no hay suficientes slides (reduce clones/cálculos)
      loop: slides.length > 1,
      centeredSlides: true, // si realmente lo necesitas; si no, quítalo (menos cálculo)
      roundLengths: true,
    }),
    [slides.length]
  );

  const handleAfterInit = useCallback(() => {
    // deja respirar un frame para evitar lecturas/escrituras en mismo tick
    requestAnimationFrame(() => onReady?.());
  }, [onReady]);

  if (slides.length === 0) return null;

  return (
    <div className="w-full h-full !bg-transparent !overflow-hidden">
      <Swiper
        className="w-full h-full will-change-opacity"
        spaceBetween={30}
        slidesPerView={1}
        modules={modules}
        autoplay={autoplay}
        breakpoints={breakpoints}
        initialSlide={0}
        onAfterInit={handleAfterInit}
        {...flags}
      >
        {slides.map((img, i) => (
          <SwiperSlide className="!bg-transparent" key={img?.id ?? img?.enlace ?? `s${i}`}>
            <HeroSection
              backgroundImage={img.enlace}
              title={img.titulo}
              description={img.descripcion}
              isFirst={false}
              blurDataURL={img.blurDataURL}
              heightClass="h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
