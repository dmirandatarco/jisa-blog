"use client";

import { useMemo, useState, useEffect } from "react";
import Script from "next/script";
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
  tipo: string;       // "texto" | "tours" | "galeria" ...
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
    .replace(/[\u0300-\u036f]/g, "")
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
  // 👇 flag para saber cuándo ya se hidrató el componente en el cliente
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // 1) Preprocesa secciones: en SSR y primer render cliente NO usamos DOMParser
  const processedSections: ProcessedSection[] = useMemo(() => {
    // Antes de hidratar: misma salida en server y cliente
    if (!hydrated) {
      return (secciones ?? []).map((section) => ({
        ...section,
        dataWithIds: section.data || "",
        headings: [],
      }));
    }

    // Ya hidratado: ahora sí usamos DOMParser y agregamos ids
    return (secciones ?? []).map((section, sectionIndex) => {
      if (section.tipo !== "texto" || !section.data) {
        return {
          ...section,
          dataWithIds: section.data || "",
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
    });
  }, [secciones, hydrated]);

  // 2) Aplana todos los headings (TOC)
  const allHeadings: Heading[] = useMemo(
    () => processedSections.flatMap((s) => s.headings),
    [processedSections]
  );

  // 3) Base absoluta de la página para URLs (#anclas)
  const pageBaseHref = useMemo(() => {
    if (!hydrated) return "";
    const { origin, pathname } = window.location;
    return origin + pathname.replace(/\/+$/, "");
  }, [hydrated]);

  // 4) JSON-LD ItemList para la TOC
  const tocLd = useMemo(() => {
    if (!pageBaseHref || !allHeadings.length) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": allHeadings.map((h, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": h.titulo,
        "url": `${pageBaseHref}#${h.id}`,
      })),
    };
  }, [pageBaseHref, allHeadings]);

  return (
    <>
      <section className="w-full max-w-7xl mx-auto mb-3 px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div
          className="text-gray-700 leading-relaxed text-[17px] mb-8"
          dangerouslySetInnerHTML={{ __html: resumen }}
        />

        {/* TABLA DE CONTENIDOS – solo después de hidratar */}
        {hydrated && allHeadings.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Tabla de contenidos
            </h2>

            {tocLd && (
              <Script
                id="toc-itemlist-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tocLd) }}
              />
            )}

            <ul className="bg-emerald-50 py-8 px-10 rounded-lg mb-12">
              {allHeadings.map((item) => {
                const indent =
                  item.level === "h2" ? "pl-0" :
                  item.level === "h3" ? "pl-8" :
                  "pl-16";

                const bullet =
                  item.level === "h2" ? "before:w-1.5 before:h-1.5" :
                  item.level === "h3" ? "before:w-1.5 before:h-1.5" :
                  "before:w-1 before:h-1";

                const textSize =
                  item.level === "h2" ? "text-[16px]" :
                  item.level === "h3" ? "text-[15px]" :
                  "text-[14px]";

                return (
                  <li
                    key={item.id}
                    className={[
                      "mb-2 last:mb-0 hover:text-emerald-700 transition",
                      indent,
                      textSize,
                      bullet,
                    ].join(" ")}
                  >
                    <a href={`#${item.id}`} className="inline-block">
                      {item.titulo}
                    </a>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* SECCIONES */}
        {processedSections.map((section) => (
          <section
            key={String(section.id)}
            id={String(section.id)}
            className="mb-12 scroll-mt-20"
          >
            {section.tipo === "texto" && (
              <div
                className="cms-content text-gray-700 leading-relaxed mb-4 last:mb-0"
                dangerouslySetInnerHTML={{ __html: section.dataWithIds }}
              />
            )}

            {section.tipo === "tours" && (
              <aside
                aria-label="Tours recomendados relacionados con este artículo"
                className="mt-8 border-t pt-6"
              >
                <span className="text-2xl font-semibold text-gray-900 mb-4">
                  Tours que te puedan interesar
                </span>

                <div className="grid md:grid-cols-3 gap-8 mt-4">
                  {(section.tours ?? []).map((tour, idx) => (
                    <ToursCard key={idx} {...tour} />
                  ))}
                </div>
              </aside>
            )}

            {section.tipo === "galeria" && (() => {
              const detalles = section.detalles ?? [];
              const total = detalles.length;

              let gridCols = "grid-cols-1";
              if (total === 2) gridCols = "md:grid-cols-2";
              if (total === 3) gridCols = "md:grid-cols-3";
              else if (total >= 4) gridCols = "md:grid-cols-4";

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
          </section>
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
