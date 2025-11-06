"use client";

import Image from "next/image";
import React from "react";

type Foto = {
  src: string;          // URL absoluta o relativa
  alt: string;
  // opcionales (si ya tienes medidas, mejor aún para evitar CLS)
  width?: number;
  height?: number;
};

export default function GalleryCollage({ fotos }: { fotos: Foto[] }) {
  // Espera 6 fotos. Si hay más/menos, ajusta aquí o valida.
  const six = fotos.slice(0, 6);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <div
        className="
          grid gap-6
          md:grid-cols-12
        "
      >
        {/* Fila 1: 3 items (3-6-3) */}
        <FigureCard className="md:col-span-3" aspectClass="aspect-[3/4]" foto={six[0]} />
        <FigureCard className="md:col-span-6" aspectClass="aspect-[16/10]" foto={six[1]} priority={false} />
        <FigureCard className="md:col-span-3" aspectClass="aspect-[3/4]" foto={six[2]} />

        {/* Fila 2: 3 items (4-4-4) */}
        <FigureCard className="md:col-span-4" aspectClass="aspect-[4/3]" foto={six[3]} />
        <FigureCard className="md:col-span-4" aspectClass="aspect-[4/3]" foto={six[4]} />
        <FigureCard className="md:col-span-4" aspectClass="aspect-[4/3]" foto={six[5]} />
      </div>
    </section>
  );
}

function FigureCard({
  foto,
  className = "",
  aspectClass = "aspect-[4/3]",
  priority = false,
}: {
  foto?: Foto;
  className?: string;
  aspectClass?: string;  // Tailwind aspect-ratio
  priority?: boolean;    // solo usar true si esta imagen es LCP (normalmente NO)
}) {
  if (!foto) return null;

  // SIZES: ocupa el ancho del contenedor en mobile, y el span en desktop
  // Ajusta si cambias el layout
  const sizes =
    "(max-width: 768px) 100vw, " + // mobile: 100% ancho
    "(max-width: 1280px) 50vw, " + // tablets/laptops
    "800px";                       // desktop ancho típico de cada card

  return (
    <figure className={`relative overflow-hidden rounded-xl shadow-md bg-neutral-100 ${className}`}>
      <div className={`relative w-full ${aspectClass}`}>
        <Image
          src={foto.src}
          alt={foto.alt}
          // Si tienes width/height reales, pásalos; si no, usa fill
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </figure>
  );
}
