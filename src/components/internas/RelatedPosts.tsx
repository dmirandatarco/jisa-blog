"use client";

import { useState } from "react";
import Link from "next/link";

type RelatedPost = {
  titulo: string;
  slug: string;
  fecha: string;
  categoriablog?: { nombre?: string; slug?: string };
};

type RelatedPostsProps = {
  posts: RelatedPost[];
  tituloSeccion?: string;
};

export default function RelatedPosts({
  posts = [],
  tituloSeccion = "Post relacionados",
}: RelatedPostsProps) {
  if (!posts?.length) return null;

  const [startIndex, setStartIndex] = useState(0);
  const total = posts?.length;

  // si solo hay 1 o 2, mostramos esos y listo
  const showSlider = total > 2;

  let visible: RelatedPost[];

  if (!showSlider) {
    visible = posts;
  } else {
    // siempre mostramos 2, con comportamiento circular
    const first = posts[startIndex];
    const second = posts[(startIndex + 1) % total];
    visible = [first, second];
  }

  const goPrev = () => {
    if (!showSlider) return;
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    if (!showSlider) return;
    setStartIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="mx-auto px-4 my-16 max-w-[1200px]">
      <h2 className="text-2xl font-semibold mb-8 text-gray-900">
        {tituloSeccion}
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {visible.map((post, idx) => {
          const href = post.categoriablog?.slug
            ? `/${post.categoriablog.slug}/${post.slug}`
            : `/blog/${post.slug}`;

          return (
            <article key={`${post.slug}-${idx}`}>
              <h3 className="text-lg font-bold mb-1">
                <Link href={href} className="hover:text-emerald-700 transition">
                  {post.titulo}
                </Link>
              </h3>
              <p className="text-sm text-gray-600">
                Actualizado en: {post.fecha}
              </p>
            </article>
          );
        })}
      </div>

      {/* Flechas: solo activas si hay más de 2 */}
      <div className="flex justify-between text-emerald-700 text-3xl">
        <button
          type="button"
          onClick={goPrev}
          disabled={!showSlider}
          className={`cursor-pointer hover:scale-110 transition ${
            !showSlider ? "opacity-30 cursor-default hover:scale-100" : ""
          }`}
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!showSlider}
          className={`cursor-pointer hover:scale-110 transition ${
            !showSlider ? "opacity-30 cursor-default hover:scale-100" : ""
          }`}
        >
          →
        </button>
      </div>
    </section>
  );
}
