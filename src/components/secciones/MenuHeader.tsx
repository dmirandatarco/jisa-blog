"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

const ChevronDown = ({ size = 14, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-transform ${className}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowRight = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const MAX_VISIBLE = 6;

type MenuHeaderProps = { menu: any[] };

// Normaliza href (acepta "path" o "/path")
const normalizeHref = (href?: string) =>
  href ? (href.startsWith("/") ? href : `/${href}`) : "/";

export default function MenuHeader({ menu = [] }: MenuHeaderProps) {
  const [selectedTour, setSelectedTour] = useState({
    imagen: menu?.[0]?.imagen || "",
    descripcion: menu?.[0]?.descripcion || "",
    titulo: menu?.[0]?.tour || "",
  });

  const [imageCache, setImageCache] = useState<Record<string, HTMLImageElement>>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [overlayTop, setOverlayTop] = useState(0);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const closeOverlay = () => {
    setOpenIndex(null);
    setActiveSlug(null);
  };

  // Pre-carga imágenes (solo cliente)
  useEffect(() => {
    const cache: Record<string, HTMLImageElement> = {};
    menu.forEach((item: any) => {
      if (item?.imagen) {
        const img = new Image();
        img.src = item.imagen;
        cache[item.imagen] = img;
      }
      (item?.toursOriginal || []).forEach((sub: any) => {
        if (sub?.foto_principal) {
          const img = new Image();
          img.src = sub.foto_principal ?? sub.imagen;
          cache[sub.foto_principal] = img;
        }
      });
    });
    setImageCache(cache);
  }, [menu]);

  const computeTopForIndex = (idx: number) => {
    const el = itemRefs.current[idx];
    if (el && typeof el.getBoundingClientRect === "function") {
      const r = el.getBoundingClientRect();
      return Math.round(r.bottom);
    }
    return 56;
  };

  // Mantén overlay pegado al item / cierra con scroll/escape
  useEffect(() => {
    const updateTop = () => {
      if (openIndex !== null) setOverlayTop(computeTopForIndex(openIndex));
    };
    const closeOnScroll = () => {
      if (openIndex !== null) closeOverlay();
    };

    updateTop();
    window.addEventListener("resize", updateTop);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    window.addEventListener("wheel", closeOnScroll, { passive: true });
    window.addEventListener("touchmove", closeOnScroll, { passive: true });

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeOverlay();
    window.addEventListener("keydown", onKey);

    const onVis = () => {
      if (document.hidden) closeOverlay();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", updateTop);
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("wheel", closeOnScroll);
      window.removeEventListener("touchmove", closeOnScroll);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [openIndex]);

  // Al abrir overlay, selecciona el primer tour
  useEffect(() => {
    if (openIndex === null) return;
    const item = menu[openIndex];
    const tours: any[] = Array.isArray(item?.toursOriginal) ? item.toursOriginal : [];
    const first = tours[0];
    if (!first) return;

    setActiveSlug(first.slug);
    setSelectedTour({
      imagen:
        imageCache[first.foto_principal]?.src ||
        first.foto_principal ||
        first?.imagen ||
        "",
      descripcion: first.resumen || first.descripcion || "",
      titulo: first.h1 || first.titulo || first?.nombre || "",
    });
  }, [openIndex, menu, imageCache]);

  // ---------- Overlay ----------
  const renderOverlay = (item: any, index: number) => {
    if (openIndex !== index) return null;

    const tours: any[] = Array.isArray(item?.toursOriginal) ? item.toursOriginal : [];
    const visibleTours = tours.slice(0, MAX_VISIBLE);

    // “Ver todos” SIEMPRE visible
    const moreHref =
      item?.url ||
      (item?.slug ? `/${item.slug}` : `/${(item?.nombre || "").toLowerCase().replace(/\s+/g, "-")}`);

    
    const baseNombre = (item?.titulo || item?.nombre || "")
      .replace(/\b(tours?|tour)\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    return createPortal(
      <>
        <div
          className="fixed left-0 right-0 bottom-0 z-[60]"
          style={{ top: overlayTop }}
          onPointerDown={closeOverlay}
          aria-hidden="true"
        />
        <div
          className="fixed left-0 right-0 z-[70]"
          style={{ top: overlayTop }}
          onMouseLeave={closeOverlay}
        >
          <div className="w-full bg-white shadow-[0_10px_30px_rgba(0,0,0,.08)] border-t border-gray-100">
            <div
              className="mx-auto w-full md:max-w-5xl px-4 py-8"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Lista */}
                <div className="md:border-r md:border-gray-300 md:pr-6">
                  <ul className="flex flex-col">
                    {visibleTours.map((sub: any, i: number) => {
                      const isActive = activeSlug === sub.slug;
                      const toHref = item.tipo == "tours" ? `/tours/${sub.slug}` : `/${sub?.slug}`;
                      return (
                        <li
                          key={`${sub?.slug || "sub"}-${i}`}
                          className={`py-2 border-b border-JisaCyan/30 ${
                            isActive ? "bg-white" : ""
                          }`}
                        >
                          <Link
                            href={toHref}
                            className="flex items-center justify-between gap-3 text-xs text-black hover:text-JisaCyan"
                            onMouseEnter={() => {
                              setActiveSlug(sub.slug);
                              setSelectedTour({
                                imagen:
                                  imageCache[sub.foto_principal]?.src ||
                                  sub.foto_principal ||
                                  sub.imagen ||
                                  "",
                                descripcion: sub.resumen || sub.descripcion ||  "",
                                titulo: sub.h1 || sub.titulo ||  sub.nombre || "",
                              });
                            }}
                            onClick={closeOverlay}
                          >
                            <span className="truncate font-medium">
                              {sub?.h1 || sub?.titulo || sub?.nombre}
                            </span>
                            {isActive && (
                              <ArrowRight className="shrink-0 text-JisaCyan" />
                            )}
                          </Link>
                        </li>
                      );
                    })}

                    {
                      item?.tipo == "tours" && (
                        <li className="pt-3">
                          <Link
                            href={normalizeHref(moreHref)}
                            className="text-xs font-semibold text-JisaCyan hover:underline"
                            onClick={closeOverlay}
                          >
                            Ver todos los {baseNombre || item?.titulo || item?.nombre}
                          </Link>
                        </li>
                      )
                    }
                    
                  </ul>
                </div>

                {/* Descripción */}
                <div className="hidden md:block">
                  {selectedTour.titulo && (
                    <h3 className="text-sm font-bold mb-2 uppercase text-JisaCyan">
                      {selectedTour.titulo}
                    </h3>
                  )}
                  <div
                    className="text-xs leading-relaxed text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: selectedTour.descripcion || "",
                    }}
                  />
                </div>

                {/* Imagen */}
                <div className="hidden md:block">
                  {selectedTour.imagen ? (
                    <img
                      src={selectedTour.imagen}
                      alt={item?.nombre || "Imagen"}
                      className="rounded-md h-72 w-full object-cover"
                    />
                  ) : (
                    <div className="h-72 w-full rounded-md bg-gray-100" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  };
  // ---------- FIN overlay ----------

  return (
    <nav
      onMouseLeave={() => {
        if (openIndex !== null) closeOverlay();
      }}
    >
      <ul className="flex md:flex-row flex-col">
        {menu.map((item: any, index: number) => {
          const hasSub = Array.isArray(item?.toursOriginal) && item.toursOriginal?.length > 0;
          const key =
            String(
              item?.nombre ?? "item"
            ) + `-${index}`;

          return (
            <li
              key={key}
              className="relative group uppercase"
              ref={(el) => (itemRefs.current[index] = el)}
              onMouseEnter={() => {
                if (hasSub) {
                  const top = computeTopForIndex(index);
                  setOverlayTop(top);
                  setOpenIndex(index);
                }
              }}
            >
              <Link
                href={normalizeHref(item.slug)}
                className={[
                  "relative block py-3 px-3 text-sm lg:text-sm font-semibold text-white hover:text-white",
                  "after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[6px]",
                  "after:h-[3px] after:bg-white after:rounded-full after:w-0",
                  "group-hover:after:w-24 after:transition-all after:duration-300",
                ].join(" ")}
                onClick={closeOverlay}
              >
                {item?.nombre}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
