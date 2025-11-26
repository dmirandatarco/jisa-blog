"use client";

import { useEffect, useMemo, useState } from "react";
import ToursCard from "./tourscard";
import Image from "next/image";
import Link from "next/link";
import RelatedPosts from "./RelatedPosts";

type TourCard = {
  titulo: string;
  tiempo: string;
  recojo: string;
  resumen: string;
  precio: string;
  precioAntes: string;
  foto_principal: string;
  alt_principal: string;
  slug: string;
};

type Detalles = {
  imagen: string;
  altImage: string;
};

type Seccion = {
  id?: string | number;
  titulo: string;
  data: string;
  tipo: string;
  etiqueta: string;
  tours: TourCard[];
  detalles: Detalles[];
};

type RelatedPost = {
  titulo: string;
  href: string;
  fechaTexto: string;
};

type BlogContentProps = {
  title: string;
  fecha: string;
  imageUrl?: string;
  altImageUrl?: string;
  resumen: string;
  secciones?: Seccion[];
  relacionados?: RelatedPost[];
};

type Heading = {
  id: string;
  titulo: string;
  level: "h2" | "h3" | "h4";
};

type ProcessedSection = Seccion & {
  dataWithIds: string;
  headings: Heading[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Contenido({
  title,
  fecha,
  imageUrl,
  altImageUrl,
  resumen,
  secciones = [],
  relacionados = [],
}: BlogContentProps) {
  // 1) Estado inicial: mismas secciones, sin tocar el HTML y sin headings
  const [processedSections, setProcessedSections] = useState<ProcessedSection[]>(
    () =>
      (secciones ?? []).map((s) => ({
        ...s,
        dataWithIds: s.data,
        headings: [],
      }))
  );

  // 2) Recalcular en cliente (después de montar)
  useEffect(() => {
    const next: ProcessedSection[] = (secciones ?? []).map(
      (section, sectionIndex) => {
        if (section.tipo !== "texto" || !section.data) {
          return {
            ...section,
            dataWithIds: section.data ?? "",
            headings: [],
          };
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(section.data, "text/html");
        const nodes = doc.body.querySelectorAll("h2, h3, h4");

        const headings: Heading[] = [];

        nodes.forEach((node, headingIndex) => {
          const el = node as HTMLElement;
          const level = el.tagName.toLowerCase() as "h2" | "h3" | "h4";
          const text = el.textContent?.trim() || "";
          if (!text) return;

          let id = el.id;
          if (!id) {
            id = `${slugify(text)}-${sectionIndex}-${headingIndex}`;
            el.id = id;
          }

          headings.push({ id, titulo: text, level });
        });

        return {
          ...section,
          dataWithIds: doc.body.innerHTML,
          headings,
        };
      }
    );

    setProcessedSections(next);
  }, [secciones]);

  // 3) Tabla de contenidos: a partir del estado ya procesado
  const allHeadings = useMemo(
    () => processedSections.flatMap((s) => s.headings),
    [processedSections]
  );

  return (
    <>
      {/* CONTENIDO */}
      <section className="mx-auto px-4 max-w-[1200px] text-left">
        {/* Intro */}
        <div
          className="text-gray-700 leading-relaxed text-[17px] mb-8"
          dangerouslySetInnerHTML={{ __html: resumen }}
        />

        {/* TABLA DE CONTENIDOS */}
        {allHeadings.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Tabla de contenidos
            </h2>
            <ul className="bg-emerald-50 py-8 px-10 rounded-lg mb-12">
              {allHeadings.map((item) => (
                <li
                  key={item.id}
                  className="mb-2 last:mb-0 text-[16px] hover:text-emerald-700 transition"
                >
                  <a href={`#${item.id}`}>{item.titulo}</a>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* SECCIONES */}
        {processedSections.map((section) => (
          <article
            key={String(section.id)}
            id={String(section.id)}
            className="mb-12 scroll-mt-20"
          >
            {section.tipo === "texto" && (
              <div
                className="cms-content text-gray-700 leading-relaxed mb-4 last:mb-0"
                // ahora usamos el HTML ya con ids en los h2/h3/h4
                dangerouslySetInnerHTML={{ __html: section.dataWithIds }}
              />
            )}

            {section.tipo === "tours" && (
              <>
                <span className="text-2xl font-semibold text-gray-900 mb-4">
                  Tours Recomendados
                </span>

                <div className="grid md:grid-cols-3 gap-8 mt-8">
                  {(section.tours ?? []).map((tour, idx) => (
                    <ToursCard key={idx} {...tour} />
                  ))}
                </div>
              </>
            )}

            {section.tipo === "galeria" && (() => {
              const detalles = section.detalles ?? [];
              const total = detalles.length;

              let gridCols = "grid-cols-1";
              if (total === 2) gridCols = "md:grid-cols-2";
              else if (total >= 3) gridCols = "md:grid-cols-3";

              return (
                <>
                  <span className="text-2xl font-semibold text-gray-900 mb-4">
                    Galeria de Fotos
                  </span>
                  <div className={`grid ${gridCols} gap-6 mt-8`}>
                    {detalles.map((detalle: Detalles, idx) => (
                      <div key={idx}>
                        <div className="relative w-full rounded-xl shadow-md overflow-hidden bg-[#BDD06A] h-64 md:h-72 group">
                          <Image
                            src={detalle.imagen}
                            alt={detalle.altImage}
                            fill
                            className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                            sizes="(min-width: 1024px) 33vw, 100vw"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </article>
        ))}

        <p className="text-center italic text-gray-600 mt-10 mb-16">
          Por{" "}
          <Link href="/sobre-sadith-collatupa" className="font-semibold">
            Sadith Collatupa
          </Link>
          <br />
          Locutora y viajera apasionada por la historia y la cultura del Perú.
        </p>
      </section>
    </>
  );
}
