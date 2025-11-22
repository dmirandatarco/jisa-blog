"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  menuOpen: boolean;
  menu?: any[];
};

export default function MenuLinea({ menuOpen, menu = [] }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const items = Array.isArray(menu) ? menu : [];

  return (
    <div className={`w-full bg-JisaCyan text-white md:hidden ${menuOpen ? "block" : "hidden"}`}>
      <nav className="px-3 py-2">
        <ul className="flex flex-col gap-1">
          {items.map((item: any, i: number) => {
            const key = String(item?.id ?? item?.slug ?? item?.enlace ?? item?.nombre ?? "item") + `-${i}`;
            const hasChildren = Array.isArray(item?.toursOriginal) && item.toursOriginal.length > 0;

            return (
              <li key={key} className="border-b border-white/15">
                {/* Cabecera del item */}
                <div className="flex items-center justify-between">
                  {/* Si NO tiene hijos: es un link directo si viene enlace */}
                  {hasChildren ? (
                    <button
                      type="button"
                      className="w-full text-left py-3 font-semibold"
                      onClick={() => setOpen((prev) => (prev === i ? null : i))}
                      aria-expanded={open === i}
                      aria-controls={`submenu-${i}`}
                    >
                      {item?.titulo}
                    </button>
                  ) : (
                    <Link href={item?.slug || "#"} className="w-full py-3 font-semibold block">
                      {item?.nombre}
                    </Link>
                  )}

                  {hasChildren && (
                    <button
                      type="button"
                      className="py-3 px-2"
                      onClick={() => setOpen((prev) => (prev === i ? null : i))}
                      aria-label={open === i ? "Cerrar submenú" : "Abrir submenú"}
                    >
                      <span className={`inline-block transition-transform ${open === i ? "rotate-180" : ""}`}>▾</span>
                    </button>
                  )}
                </div>

                {/* Submenú */}
                {hasChildren && (
                  <ul
                    id={`submenu-${i}`}
                    className={`overflow-hidden transition-[max-height] duration-300 ${
                      open === i ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {(item.toursOriginal || []).map((sub: any, j: number) => {
                      const subKey = String(sub?.slug ?? sub?.id ?? "sub") + `-${j}`;
                      const href = item.tipo == "tours" ? `/tours/${sub?.slug}` : (item.tipo == "destinos" ? `/${sub?.slug}` : `/${sub?.slug}`);
                      return (
                        <li key={subKey}>
                          <Link
                            href={href}
                            className="block py-2 pl-4 pr-2 text-sm hover:bg-white/10"
                          >
                            {sub?.h1 || sub?.titulo || sub?.nombre}
                          </Link>
                        </li>
                      );
                    })}

                    {/* “Ver todos” si hay enlace a categoría */}
                    {(item?.enlace || item?.slug) && (
                      <li className="py-2 pl-4 pr-2">
                        <Link
                          href={item?.enlace || `/${item?.slug}`}
                          className="text-xs font-semibold underline"
                        >
                          Ver todos
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
