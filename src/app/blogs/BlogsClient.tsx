"use client";

import { useTranslation } from "react-i18next";
import BlogCard from "@/components/cards/BlogCard";
import PromocionSection from "@/components/home/PromocionSection";

type Blog = {
  slug: string;
  titulo: string;
  resumen?: string;
  imagen?: string;
  fecha?: string;
  categoriablog?: { nombre: string };
};

export default function BlogsClient({ blogs }: { blogs: Blog[] }) {
  const { t } = useTranslation();

  return (
    <>
      <section className="w-full max-w-7xl mx-auto mt-24 mb-12 px-6">
        <div className="grid grid-cols-12 gap-8">
          {blogs.map((blog, i) => (
            <div key={`${blog.slug}-${i}`} className="col-span-12 md:col-span-4">
              <BlogCard
                title={blog.categoriablog?.nombre ?? ""}
                image={blog.imagen ?? ""}
                description={blog.titulo}
                context={blog.resumen ?? ""}
                author="Jisa Adventure"
                fecha={blog.fecha ?? ""}
                slug={blog.slug}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Banner de promo reaprovechado */}
      <PromocionSection id="promo" />
    </>
  );
}
