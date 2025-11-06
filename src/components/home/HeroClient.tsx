import HeroSection from "./HeroSection";
import LazySwiperMount from "./LazySwiperMount";

type HeroProps = {
  id?: string;
  data?: { tipo?: number | string | null; detalles?: any[] | string };
  dataSearch?: any[];
  heightClass?: string;
};

export default function Hero({
  id = "hero",
  data,
  dataSearch,
  heightClass = "h-[70svh] md:h-[86vh] lg:h-[92vh] xl:h-[92vh]",
}: HeroProps) {
  const tipo = data?.tipo != null ? Number(data.tipo) : null;
  const detalles = Array.isArray(data?.detalles) ? (data!.detalles as any[]) : [];
  const first = detalles?.[0];

  return (
    <section id={id} className={`relative w-full ${heightClass} overflow-hidden`}>
      {/* ====== TIPO 0: IMÁGENES ====== */}
      {tipo === 0 && Array.isArray(detalles) && (
        <>
          {/* 1) Héroe estático para LCP (server, sin JS) */}
          {first ? (
            <div className="absolute inset-0 z-0 hero-static transition-opacity duration-500">
              <HeroSection
                backgroundImage={first.enlace}
                title={first.titulo}
                description={first.descripcion}
                isFirst
                blurDataURL={first.blurDataURL}
                heightClass="h-full"
              />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 bg-neutral-200" />
          )}

          {/* 2) Slider encima (cliente), no bloquea LCP */}
          <div className="absolute inset-0 z-0">
            <LazySwiperMount
              parentId={id}
              detalles={detalles}
              dataSearch={dataSearch}
              className="w-full h-full"
            />
          </div>
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
            poster="/video-poster.webp"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
        </div>
      )}
    </section>
  );
}
