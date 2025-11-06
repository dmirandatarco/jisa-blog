import Link from "next/link";
import Image from "next/image";
import BoxCard from "@/components/common/BoxCard";

type Props = {
  title?: string;       // categoría
  image?: string;       // URL remota
  author?: string;
  fecha?: string;
  description: string;  // título del post
  context?: string;     // resumen (si lo usas luego)
  color?: string;
  slug: string;
};

export default function BlogCard({
  title,
  image,
  author = "Jisa Adventure",
  fecha,
  description,
  color,
  slug,
}: Props) {
  const href = `/blogs/${slug}`;

  return (
    <article className="group relative w-full h-[256px] rounded-xl shadow-lg overflow-hidden">
      <Link href={href} className="absolute inset-0">
        {/* Imagen de portada */}
        {image ? (
          <Image
            src={image}
            alt={description}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}

        {/* Overlay al hover */}
        <div className="absolute inset-0 bg-JisaGris/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Etiqueta de categoría */}
        <div className="absolute top-3 left-3 z-10">
          <BoxCard title={title ?? "Blog"} color={color} />
        </div>

        {/* Caja inferior con título + meta */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-b-xl">
          {/* meta (aparece al hover) */}
          <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-in-out px-4 pt-2">
            <div className="flex flex-wrap items-center gap-x-6 text-JisaGris/60 text-xs font-medium">
              {author && <span>{author}</span>}
              {fecha && <span>{fecha}</span>}
            </div>
            <div className="mt-2 w-[90%] mx-auto border-t border-JisaGris/20" />
          </div>

          {/* título */}
          <h3 className="px-4 py-2 text-left font-medium text-base text-JisaGris/80 line-clamp-2">
            {description}
          </h3>
        </div>
      </Link>
    </article>
  );
}
