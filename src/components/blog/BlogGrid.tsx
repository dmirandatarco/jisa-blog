"use client";

import BlogCard, { BlogCardProps } from "./BlogCard";

type Item = Omit<BlogCardProps, "variant">;

const COLS = {
  xl: "col-span-12",
  md: "md:col-span-8 col-span-12",
  sm: "md:col-span-4 col-span-12",
} as const;

const CARD_VARIANT = { xl: "lg", md: "lg", sm: "sm" } as const;

export default function BlogGrid({ posts }: { posts: Item[] }) {
  type Slot = "xl" | "md" | "sm";
  const ROW_PATTERN: Slot[][] = [
    ["xl"],
    ["sm", "md"],
    ["md", "sm"],
  ];

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
        <aside className="hidden md:block w-1/4 bg-white rounded-xl shadow-md p-5 h-fit sticky top-5">
          <h2 className="text-lg font-semibold mb-5 text-[#D9D9D9]">Filtros</h2>
          <div className="flex flex-col gap-3">
            <button className="bg-teal-700 text-left text-white rounded-full px-5 py-2 font-semibold transition hover:bg-teal-800">Recientes</button>
            <button className="bg-gray-300 text-left text-[#1B9C9E] rounded-full px-5 py-2 font-semibold transition hover:bg-teal-700 hover:text-white">Más leídos</button>
            <button className="bg-gray-300 text-left text-[#1B9C9E] rounded-full px-5 py-2 font-semibold transition hover:bg-teal-700 hover:text-white">Inspiración</button>
            <button className="bg-gray-300 text-left text-[#1B9C9E] rounded-full px-5 py-2 font-semibold transition hover:bg-teal-700 hover:text-white">Consejos de viaje</button>
            <button className="bg-gray-300 text-left text-[#1B9C9E] rounded-full px-5 py-2 font-semibold transition hover:bg-teal-700 hover:text-white">Guías rápidas</button>
          </div>
        </aside>

        <div className="md:hidden w-full mb-6">
          <button className="flex justify-between items-center bg-gray-300 text-teal-700 rounded-full px-5 py-2 font-semibold w-full max-w-sm mx-auto">
            <span>Recientes</span><span className="text-xl">⌄</span>
          </button>
        </div>

        {/* GRID principal */}
        <div className="w-full md:w-3/4 flex flex-col gap-6" data-count={posts.length}>
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
