"use client";

import Link from "next/link";
import BlogCard, { BlogCardProps } from "./BlogCard";

type Item = Omit<BlogCardProps, "variant">;

type Categoria = { id?: number | string; slug?: string; nombre: string };

const COLS = {
  xl: "col-span-12",
  md: "md:col-span-8 col-span-12",
  sm: "md:col-span-4 col-span-12",
} as const;

const CARD_VARIANT = { xl: "lg", md: "lg", sm: "sm" } as const;

export default function BlogGrid({ posts, filtro, categorias = [] }: { posts: Item[]; filtro: string; categorias : Categoria[] }) {
  type Slot = "xl" | "md" | "sm";
  const ROW_PATTERN: Slot[][] = [["xl"], ["sm", "md"], ["md", "sm"]];

  const rows: Array<Array<{ slot: Slot; data: Item }>> = [];
  let i = 0;
  let rowIndex = 0;

  while (i < posts.length) {
    const slots = ROW_PATTERN[rowIndex % ROW_PATTERN.length];
    const current: Array<{ slot: Slot; data: Item }> = [];

    for (const slot of slots) {
      if (i >= posts.length) break;
      current.push({ slot, data: posts[i++] });
    }

    rows.push(current);
    rowIndex++;
  }

  return (
    <section className="relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="w-full max-w-[1400px] mx-auto px-[60px] md:px-[40px] sm:px-[20px] flex flex-col md:flex-row gap-0 md:gap-10 mb-12">

        {filtro === "1" && (
          <>
            <aside className="hidden md:block w-1/4 bg-white rounded-xl shadow-md p-5 h-fit sticky top-5">
              <h2 className="text-lg font-semibold mb-5 text-[#D9D9D9]">Filtros</h2>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/`}
                  className="bg-teal-700 text-left text-white rounded-full px-5 py-2 font-semibold transition hover:bg-teal-800"
                >
                  Recientes
                </Link>
                {(categorias ?? []).map((cat) => (
                  <Link
                    key={cat.id ?? cat.slug ?? cat.nombre}
                    href={`/${cat.slug ?? ""}`}
                    className="bg-gray-300 text-left text-[#1B9C9E] rounded-full px-5 py-2 font-semibold transition hover:bg-teal-700 hover:text-white"
                  >
                    {cat.nombre}
                  </Link>
                ))}
              </div>
            </aside>

            <div className="md:hidden w-full mb-6">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                <Link
                  href={`/`}
                  className="shrink-0 bg-teal-700 text-white rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-teal-800"
                >
                  Recientes
                </Link>

                {(categorias ?? []).map((cat) => (
                  <Link
                    key={cat.id ?? cat.slug ?? cat.nombre}
                    href={`/${cat.slug ?? ""}`}
                    className="shrink-0 bg-gray-300 text-[#1B9C9E] rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-teal-700 hover:text-white"
                  >
                    {cat.nombre}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* GRID principal */}
        <div className={`w-full ${String(filtro) === "1" ? "md:w-3/4" : ""} flex flex-col gap-6`} data-count={posts.length}>
          {rows.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-12 gap-5">
              {row.map(({ slot, data }, cIdx) => (
                <div key={cIdx} className={COLS[slot]}>
                  <BlogCard variant={CARD_VARIANT[slot]} {...data} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
