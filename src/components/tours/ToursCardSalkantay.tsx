"use client";

import Link from "next/link";
import Image from "next/image";
import GroupUsers from "@/assets/icons/GroupUsers";
import ClockIcon from "@/assets/icons/ClockIcon";
import MountainHikIcon from "@/assets/icons/MountainHikIcon";
import StarIcon from "@/assets/icons/StarIcon";

type Props = {
  title: string;
  image: string;
  altimage?: string;
  location: string;
  description: string;
  price?: number | string;
  dias: number | string;
  group: string;
  slug: string;
  resumen: string; // HTML
  category?: string;
  tipo: number; // 1=paquetes, otro=tours
};

export default function ToursCardSalkantay(props: Props) {
  const {
    title,
    image,
    altimage,
    location,
    description,
    price,
    dias,
    group,
    slug,
    resumen,
  } = props;

  const tipoFinal = "tours";
  const href = `/${tipoFinal}/${slug}`;

  const computedAlt =
    (altimage && altimage.trim()) ||
    (description
      ? `${description}${location ? ` – ${location}` : ""}`
      : title || "Imagen del tour");

  return (
    <article
      className="
        group w-full max-w-[420px] mx-auto
        flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white
        shadow-sm transition-all duration-300
        hover:shadow-md
      "
    >
      {/* Imagen con aspecto fijo para evitar CLS */}
      <div className="relative w-full aspect-[16/9] md:aspect-[4/3]">
        {image ? (
          <Image
            src={image}
            alt={computedAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}

        {/* Overlay solo en hover de desktop (no molesta en móvil) */}
        <div className="pointer-events-none absolute inset-0 bg-JisaGris/65 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Contenido */}
      <div className="w-full p-4">
        {/* Metas superiores */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-JisaGris">
          <div className="flex items-center gap-2">
            <ClockIcon size={16} className="shrink-0 text-JisaCyan" />
            <span className="text-[12px] font-medium">{dias} Días</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <MountainHikIcon size={16} className="shrink-0 text-JisaCyan" />
            <span className="text-[12px] font-medium line-clamp-1">{title}</span>
          </div>
        </div>

        <hr className="my-3 border-gray-100" />

        {/* Título y ubicación */}
        <h3 className="text-[16px] md:text-[18px] leading-tight font-semibold text-gray-900">
          {description}
        </h3>
        {location && (
          <span className="mt-1 block text-[11px] uppercase tracking-wide text-JisaGrisTextGray">
            {location}
          </span>
        )}

        {/* Resumen (clamp para móvil) */}
        <div
          className="mt-2 text-[13px] leading-[1.35rem] text-gray-700 line-clamp-3 md:line-clamp-4"
          dangerouslySetInnerHTML={{ __html: resumen }}
        />

        {/* Meta + Precio + CTA */}
        <div className="mt-4 space-y-3">
          {/* Meta en grid 2x2 en móvil */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[12px] text-JisaGris/80">
            <div className="flex items-center gap-2">
              <GroupUsers size={14} className="shrink-0" />
              <span>Min {group} personas</span>
            </div>
            <div className="flex items-center gap-2">
              <MountainHikIcon size={14} className="shrink-0" />
              <span>4564 m / 4554 ft</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon size={14} className="shrink-0" />
              <span>{dias} días</span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon size={14} className="shrink-0" />
              <span>
                4.9 <span className="text-gray-500">(48,486 reviews)</span>
              </span>
            </div>
          </div>

          {/* Precio + CTA: en móvil el botón es full width; en desktop se alinea a la derecha */}
          <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            {price != null ? (
              <div className="mt-1 sm:mt-0">
                <p className="text-[11px] text-gray-500">Desde</p>
                <p className="text-[15px] font-semibold text-gray-900">
                  ${price}{" "}
                  <span className="text-[11px] font-normal text-gray-500">
                    por persona
                  </span>
                </p>
              </div>
            ) : (
              <div />
            )}

            <Link
              href={href}
              aria-label={`Ver itinerario de ${description}`}
              className="
                inline-flex w-full sm:w-auto items-center justify-center
                px-5 py-3 rounded-xl bg-JisaCyan text-white
                text-[14px] md:text-[15px] font-semibold shadow-sm
                active:scale-[0.98] transition
              "
            >
              Ver Itinerario
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
