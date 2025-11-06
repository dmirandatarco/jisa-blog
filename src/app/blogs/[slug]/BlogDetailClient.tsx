"use client";

import { useTranslation } from "react-i18next";
import HeroSectionMidle from "@/components/secciones/HeroSectionMidle";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import JisaTitleContentCyan from "@/components/layout/JisaTitleContentCyan";
import ParrafoContent from "@/components/layout/ParrafoContent";
import BlogCard from "@/components/cards/BlogCard";
import PackageSection from "@/components/home/PackageSection.client";
import PromocionSection from "@/components/home/PromocionSection";
import TestimoniosSection from "@/components/home/TestimoniosSection.client";

import SwiperLazy, { SwiperSlide } from "@/components/lazy/SwiperLazy";
import { Autoplay } from "swiper/modules";

type Data = {
  blog: {
    slug: string;
    titulo: string;
    imagen?: string;
    contenido?: string; // HTML
    categoriablog?: { nombre: string };
    relacionados?: any[];
  };
  paquetes?: any[];
  tripadvisors?: any[];
  googles?: any[];
  totalTripadvisor?: number;
  totalGoogle?: number;
};

export default function BlogDetailClient({ data }: { data: Data }) {
  const { t } = useTranslation();
  const blog = data.blog;

  return (
    <>
      <section className="full-bleed">
        <HeroSectionMidle
            backgroundImage={blog.imagen ?? "/agencia-de-viaje-cusco-jisaadventure.webp"}
            title={blog.titulo}
            blogCategoria={blog.categoriablog?.nombre}
            blogSlug={blog.slug}
        />
      </section>

      {/* Contenido principal */}
      <section className="w-full max-w-7xl mx-auto mt-12 mb-12 px-6 md:px-12">
        <div className="w-full flex flex-col items-center justify-center py-6">
          <ParrafoContent contenido={blog.contenido ?? ""} />
        </div>

        {/* Si luego vuelves a activar la galería, déjalo listo */}
        {/* 
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          navigation={false}
          className="w-full h-full mt-4"
          breakpoints={{
            320:  { slidesPerView: 4, spaceBetween: 10 },
            640:  { slidesPerView: 4, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 10 },
          }}
        >
          {blog.gallery?.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="h-48">
                <img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover rounded-lg"/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        */}
      </section>

      {/* Relacionados */}
      {blog.relacionados?.length ? (
        <section className="w-full max-w-7xl mx-auto mt-12 mb-12 px-6 md:px-12">
          <SeparatorBarHorizontal />
          <JisaTitleContentCyan
            contenido={t("blogs_detail.blogs_relacionados")}
            className="text-2xl"
          />
          <div className="w-full max-w-6xl mx-auto md:px-0 px-4 pt-12 grid grid-cols-12 md:gap-x-11 gap-x-0 gap-y-8">
            {blog.relacionados.map((b: any, i: number) => (
              <div key={`${b.slug}-${i}`} className="col-span-12 md:col-span-4">
                <BlogCard
                  title={b.categoriablog?.nombre}
                  image={b.imagen}
                  description={b.titulo}
                  context={b.resumen}
                  author="Jisa Adventure"
                  fecha={b.fecha}
                  slug={b.slug}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Paquetes (grid, no carrusel) */}
      {data.paquetes?.length ? (
        <PackageSection id="paquetes-rel" data={data.paquetes} tipo={0} />
      ) : null}

      <PromocionSection id="promo" />

      {/* Testimonios */}
      <TestimoniosSection
        id="testimonios"
        data={data.tripadvisors ?? []}
        google={data.googles ?? []}
        totalTripadvisor={data.totalTripadvisor ?? 0}
        totalGoogle={data.totalGoogle ?? 0}
      />
    </>
  );
}