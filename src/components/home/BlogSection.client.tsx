"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@/components/layout/HeaderTitle";
import SubHeaderTitle from "@/components/layout/SubHeaderTitle";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import BlogCard from "@/components/cards/BlogCard";

type Blog = {
  slug: string;
  titulo: string;
  resumen?: string;
  imagen?: string; // URL remota (sistema.jisaadventure.com)
  fecha?: string;
  categoriablog?: { nombre?: string };
};

export default function BlogSection({
  id,
  data = [],
}: { id?: string; data?: Blog[] }) {
  const { t } = useTranslation();

  if (!Array.isArray(data) || data?.length === 0) return null;

  return (
    <section id={id} className="w-full max-w-7xl mx-auto md:my-12 my-12 pb-1 mb-2">
      <div className="flex-col justify-center flex items-center py-10">
        {/* h2 por SEO en home */}
        <HeaderTitle etiqueta="h2" title={"Guía de viajes a Perú"} />
        <SubHeaderTitle title={t("blog_section.description")} />
        <SubHeaderTitle title={t("blog_section.description2")} />
        <SeparatorBarHorizontal />
      </div>

      <div className="w-full max-w-6xl mx-auto md:px-0 px-4">
        {/* Grid 3 columnas en desktop */}
        <div className="grid grid-cols-12 md:gap-x-11 gap-x-0 gap-y-6">
          {data.map((blog, i) => (
            <div key={blog.slug ?? i} className="col-span-12 md:col-span-4">
              <BlogCard
                title={blog.categoriablog?.nombre ?? "Blog"}
                image={blog.imagen}
                author="Jisa Adventure"
                fecha={blog.fecha}
                description={blog.titulo}
                context={blog.resumen}
                slug={blog.slug}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center py-6">
          <Link href="/blogs" className="font-bold text-JisaVerde text-xl">
            {t("blog_section.ver_mas")}
          </Link>
        </div>
      </div>
    </section>
  );
}
