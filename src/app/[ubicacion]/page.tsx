// src/app/[ubicacion]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { apiPost } from "@/lib/api";

import HeroSectionMidle from "@/components/secciones/HeroSectionMidle";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ToursLineSection from "@/components/secciones/ToursLineSection.client"; // client (usa Swiper)
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import HeaderTitle from "@/components/layout/HeaderTitle";
import SubHeaderTitle from "@/components/layout/SubHeaderTitle";
import Acerca from "@/components/secciones/Acerca";
import FaqSectionTwoCols from "@/components/tours/FaqSectionTwoCols";
import TestimoniosSection from "@/components/home/TestimoniosSection.client";
import GalleryCollage from "@/components/secciones/GalleryColage";
import BlogSection from "@/components/home/BlogSection.client";
import FaqSchemaLD from "@/utils/FaqSchemaLD";

type PageProps = { params: { ubicacion: string } };

// Helper para fallback de títulos
const slugToTitle = (slug: string) =>
  decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

/** SEO dinámico */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ubicacion } = params;

  // intentamos obtener meta desde la API
  const res = await apiPost<{ data?: any }>(
    "/destinos",
    { idioma_id: 1, slug: ubicacion },
    { cacheSeconds: 300, tags: ["destino", ubicacion] }
  ).catch(() => undefined);

  const destino = res?.data?.destinos;
  const canonicalReal = `https://jisaadventure.com/${ubicacion}`;

  if (!destino) {
    return {
      title: "404 | Destino no encontrado",
      description: "El destino que buscas no existe.",
      robots: { index: false, follow: false },
      alternates: { canonical: canonicalReal },
    };
  }

  return {
    title: destino.title ?? (destino.h1 || slugToTitle(ubicacion)),
    description: destino.description ?? destino.meta_description ?? "",
    robots: destino.robots ?? "index,follow",
    keywords: destino.keywords,
    alternates: { canonical: destino.canonical ?? canonicalReal },
    openGraph: {
      title: destino.og_title ?? destino.title ?? slugToTitle(ubicacion),
      description: destino.og_description ?? destino.description ?? "",
      url: destino.canonical ?? canonicalReal,
      images: destino.og_image ? [{ url: destino.og_image }] : undefined,
      type: "article",
      siteName: "Jisa Adventure",
    },
  };
}

export default async function DestinoPage({ params }: PageProps) {
  const { ubicacion } = params;

  // Data del destino
  const res = await apiPost<{ data?: any }>(
    "/destinos",
    { idioma_id: 1, slug: ubicacion },
    { cacheSeconds: 300, tags: ["destino", ubicacion] }
  ).catch(() => undefined);

  const destino = res?.data?.destinos;
  const tripadvisors = res?.data?.tripadvisors;
  const googles = res?.data?.googles;
  const totalTripadvisor = res?.data?.totalTripadvisor;
  const totalGoogle = res?.data?.totalGoogle;
  const blogs = res?.data?.blogs;
  if (!destino || !Array.isArray(destino.ubicacion_detalles) || destino.ubicacion_detalles.length === 0) {
    notFound();
  }

  const labelUbic = destino.h1 || destino.nombre || slugToTitle(ubicacion);
  const breadcrumbItems = [
    { href: "/", label: "Inicio" },
    { href: "", label: labelUbic, current: true },
  ];

  const fotosGaleria = [
    { src: destino.imagen1, alt: destino.altImagen1 },
    { src: destino.imagen2, alt: destino.altImagen2 },
    { src: destino.imagen3, alt: destino.altImagen3 },
    { src: destino.imagen4, alt: destino.altImagen4 },
    { src: destino.imagen5, alt: destino.altImagen5 },
    { src: destino.imagen6, alt: destino.altImagen6 },
  ];

  const faqsNorm = Array.isArray(destino?.faqs)
    ? destino.faqs.map((f: any) => ({
        pregunta: String(f.pregunta ?? f.question ?? ""),
        respuesta: String(f.respuesta ?? f.answer ?? ""),
      }))
    : [];

  return (
    <>
      {/* HERO full-bleed */}
      <section className="full-bleed">
        <HeroSectionMidle
          backgroundImage={destino.fotoBanner}
          alt={destino.altBanner}
          title={destino.h1}
          description={destino.descripcion}
        />
      </section>

      {/* Contenido */}
      <section className="w-full max-w-7xl mx-auto pb-24 mb-12 px-4 md:px-6">
        <div className="py-5">
          <Breadcrumbs items={breadcrumbItems} className="mb-4" />
        </div>

        {destino.ubicacion_detalles.map((bloque: any) => (
          <div key={bloque.id} className="flex flex-col items-center py-1 mb-20">
            <HeaderTitle title={bloque.titulo} etiqueta="h2" />
            {bloque.descripcion && <SubHeaderTitle title={bloque.descripcion} />}
            <SeparatorBarHorizontal />

            <div className="w-full max-w-6xl mx-auto md:px-0 px-2">
              {/* carrusel=1 para usar Swiper */}
              <ToursLineSection tours={bloque.tours ?? []} carrusel={1} />
            </div>
          </div>
        ))}

        <div className="py-5">
          <Acerca
            titulo={destino.h1}
            texto={destino.acercaDe}
            asHtml
            className="mb-4"
          />
        </div>

        <FaqSchemaLD faqs={faqsNorm} id={`faq-schema-${ubicacion}`} />

        <div className="py-5">
          <FaqSectionTwoCols
            faqs={destino.faqs}
            titulo={destino.h1}
          />
        </div>

        <BlogSection id="blog" data={blogs} />

        <div className="py-5">
          <div className="flex flex-col items-center justify-center py-10">
            <HeaderTitle title="Nuestros viajeros" etiqueta="h2" />
            <SeparatorBarHorizontal />
          </div>
          <GalleryCollage fotos={fotosGaleria} />
        </div>

        <TestimoniosSection
            id="testimonios"
            data={tripadvisors}
            google={googles}
            totalTripadvisor={totalTripadvisor}
            totalGoogle={totalGoogle}
          />
      </section>
    </>
  );
}
