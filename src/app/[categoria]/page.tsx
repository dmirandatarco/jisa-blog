import * as React from "react";
import { Metadata } from "next";
import Formulario from "@/components/Formulario";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { apiPost } from "@/lib/api";

type PageProps = { params: { categoria: string } };

const FALLBACK = {
  siteName: "Jisa Adventure",
  canonical: "https://jisaadventure.com/",
  title: "Jisa Adventure - Tours en Cusco y Perú",
  description: "Agencia de viajes en Cusco. Tours, paquetes y experiencias auténticas en Perú.",
  locale: "es_PE",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { categoria } = params;
    const dataGeneral = await apiPost<{ data: any }>(
        "/categoria-blog",
        { idiomaId: 1, slug: categoria },
      )
        .then(r => r.data)
        .catch(() => undefined);
  const title = dataGeneral.title || FALLBACK.title;
  const description = dataGeneral.description || FALLBACK.description;
  const canonical = dataGeneral.canonical || FALLBACK.canonical;
  const ogImage = "/agencia-de-viaje-cusco-jisaadventure.webp";
  const keywords = dataGeneral.keywords || "";

  

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: (dataGeneral.robots as string) || "index, follow",
    openGraph: {
      title: dataGeneral.ogTitle || title,
      description: dataGeneral.ogDescription || description,
      url: canonical,
      siteName: FALLBACK.siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: FALLBACK.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dataGeneral.twitterTitle || title,
      description: dataGeneral.twitterDescription || description,
      images: [dataGeneral.twitterImage || ogImage],
    },
    other: dataGeneral.extraMeta || {},
  };
}

export default async function HomePage({ params }: PageProps) {
const { categoria } = params;
const dataGeneral = await apiPost<{ data: any }>(
    "/categoria-blog",
    { idiomaId: 1, slug: categoria },
    )
    .then(r => r.data)
    .catch(() => undefined)
  const posts = dataGeneral.blogs;


  return (
    <>
      {/* HERO full-bleed (bordes a bordes) */}
      <section className="full-bleed">
        <BlogHero
            title={dataGeneral.nombre}
            subtitle={dataGeneral.nombre}
            imageUrl={dataGeneral.banner}
            altImageUrl={dataGeneral.alt_banner}
          />
      </section>

      {/* Contenido bajo el pliegue (centrado + cv-auto para diferir layout/paint) */}
      
      
      <BlogGrid posts={posts} />

      <section className="">
        <Formulario id="formulario" />
      </section>
    </>
  );
}
