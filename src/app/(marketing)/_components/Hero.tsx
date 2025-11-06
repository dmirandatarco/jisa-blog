import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import HeroSection from "./HeroSection";

type Detalle = {
  enlace: string;           // URL de la imagen
  titulo?: string;
  descripcion?: string;
  blurDataURL?: string;     // LQIP opcional
};

type HeroProps = {
  id?: string;
  data?: { tipo?: number | string | null; detalles?: Detalle[] | string };
  dataSearch?: any[];
  heightClass?: string;
};

// Carga del slider SIN SSR para no bloquear el LCP
const LazySwiper = dynamic(() => import("./LazySwiperMount"), {
  ssr: false,
  loading: () => null,
});

export default function Hero({
  id,
  data,
  dataSearch,
  heightClass = "h-[70svh] md:h-[86vh] lg:h-[92vh] xl:h-[92vh]",
}: HeroProps) {
  const tipo = data?.tipo != null ? Number(data.tipo) : null;
  const detalles = Array.isArray(data?.detalles) ? (data!.detalles as Detalle[]) : [];
  const first = detalles?.[0];

  return (
    <section id={id} className={`relative w-full ${heightClass} overflow-hidden`}>
      {/* ====== TIPO 0: IMÁGENES ====== */}
      {tipo === 0 && Array.isArray(detalles) && (
        <>
          {/* 1) HÉROE ESTÁTICO para LCP (server-rendered, sin JS) */}
          {first ? (
            <HeroSection
              backgroundImage={first.enlace}
              title={first.titulo}
              description={first.descripcion}
              blurDataURL={first.blurDataURL}
              // Full height del contenedor
              className="absolute inset-0 z-0"
            />
          ) : (
            // Fallback mínimo si no hay datos (no bloquea)
            <div className="absolute inset-0 z-0 bg-neutral-200" />
          )}

          {/* 2) SLIDER dinámico (cliente) que toma el control después */}
          {detalles.length > 1 && (
            <div
              className="absolute inset-0 z-10"
              // Hint para el navegador: esto puede tardar; no bloquees pintura
              data-defer-interactive
            >
              <LazySwiper
                detalles={detalles}
                dataSearch={dataSearch}
                className="w-full h-full"
              />
            </div>
          )}
        </>
      )}

      {/* ====== TIPO 1: VIDEO ====== */}
      {tipo === 1 && typeof data?.detalles === "string" && (
        <div className="absolute inset-0 bg-black">
          <video
            className="w-full h-full object-cover"
            src={data.detalles}
            autoPlay
            loop
            muted
            playsInline
            // recomendaciones LCP con video: poster ligero para primer paint
            poster="/video-poster.webp"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
        </div>
      )}
    </section>
  );
}