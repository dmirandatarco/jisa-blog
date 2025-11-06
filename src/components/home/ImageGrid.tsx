"use client";

import Image from "next/image";

type MarcaImg = string | { src: string; alt?: string };

export default function ImageGrid({ images }: { images: MarcaImg[] }) {
  // Normaliza: permite string o {src, alt}, y asegura que empiece con "/"
  const items = (images ?? []).map((it, i) => {
    const obj = typeof it === "string" ? { src: it, alt: `marca-${i}` } : it;
    const src = obj.src?.startsWith("/") ? obj.src : `/${obj.src}`;
    return { src, alt: obj.alt || `marca-${i}` };
  });

  return (
    <div className="grid grid-cols-3 gap-10 px-6">
      {items.map(({ src, alt }, i) => (
        <div key={`${src}-${i}`} className="col-span-1">
          {/* Wrapper fijo para evitar CLS; el logo se ajusta dentro */}
          <div className="relative h-24 w-full">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 33vw, 33vw"
              className="object-contain rounded-lg opacity-25 hover:opacity-100 transition-opacity duration-300"
              // Logos no necesitan prioridad; se cargan diferidos por defecto.
              decoding="async"
              fetchPriority="low"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
