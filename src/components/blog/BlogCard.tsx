"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export type BlogCardProps = {
  variant: "lg" | "sm";
  slug: string;
  titulo: string;
  resumen: string;
  imagen: string;
  fecha: string;         // ej: "12/05/2025"
  user?: { nombre?: string };            // ej: "Sadith Collatupa"
  altImage: string;            // ej: "Sadith Collatupa"
  categoriablog?: { nombre?: string };
};

export default function BlogCard({
  variant,
  slug,
  titulo,
  resumen,
  imagen,
  categoriablog,
  fecha,
  user,
  altImage,
}: BlogCardProps) {
  const tag = categoriablog?.nombre;
  const autor = user?.nombre;
  return (
    <article
      className={clsx(
        "relative col-span-12 h-[300px] rounded-xl overflow-hidden flex items-end text-white p-6",
        "bg-black" // fallback
      )}
    >
      {/* Bg image */}
      <div className="absolute inset-0">
        <Image
          src={imagen}
          alt={altImage || "Jisa Adventure"}
          fill
          sizes={variant === "lg" ? "(min-width: 768px) 800px, 100vw" : "(min-width: 768px) 400px, 100vw"}
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80" />
      </div>

      {/* Tag */}
      <span className="absolute top-5 right-5 bg-[#BDD06A] text-[#181A1A] text-[10px] font-semibold px-3 py-1 rounded">
        {tag}
      </span>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-[20px] font-semibold mb-2">{titulo}</h3>
        <p className="text-sm mb-3 text-gray-100 line-clamp-2" dangerouslySetInnerHTML={{ __html: resumen }}></p>
        <Link
          href={slug}
          className="inline-block bg-[#1B9C9E] text-white text-sm font-medium rounded px-8 py-2 hover:bg-teal-700 transition"
        >
          Leer más
        </Link>
        <div className="flex gap-4 text-xs text-gray-300 mt-4">
          <span>📅 {fecha}</span>
          <span>👤 {autor}</span>
        </div>
      </div>
    </article>
  );
}
