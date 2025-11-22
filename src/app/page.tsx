import * as React from "react";
import Script from "next/script";
import { getHomeData } from "@/lib/getHomeData";
import Hero from "@/components/home/HeroClient";

// server (sin "use client")
import AboutSection from "@/components/home/AboutSection";
import PromocionSection from "@/components/home/PromocionSection";
import MarcasSection from "@/components/home/MarcasSection";

// cliente (importa DIRECTO; Next ya los tratará como Client Components)
import PackageSection from "@/components/home/PackageSection.client";
import DestinosSection from "@/components/home/DestinosSection.client";
import BlogSection from "@/components/home/BlogSection.client";
import TestimoniosSection from "@/components/home/TestimoniosSection.client";

// barra de búsqueda montada por interacción
import SearchBarMount from "@/components/search/SearchBarMount.client";
import FaqSectionOneCols from "@/components/tours/FaqSectionOneCols";
import TravelAgencySchema from "@/utils/TravelAgencySchema";
import Formulario from "@/components/Formulario";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";

const FALLBACK = {
  siteName: "Jisa Adventure",
  canonical: "https://jisaadventure.com/",
  title: "Jisa Adventure - Tours en Cusco y Perú",
  description: "Agencia de viajes en Cusco. Tours, paquetes y experiencias auténticas en Perú.",
  locale: "es_PE",
};

export async function generateMetadata() {
  const dataGeneral = await getHomeData();
  const inicio = dataGeneral?.inicio ?? {};
  const title = inicio.title || FALLBACK.title;
  const description = inicio.description || FALLBACK.description;
  const canonical = inicio.canonical || FALLBACK.canonical;
  const ogImage = "/agencia-de-viaje-cusco-jisaadventure.webp";
  const keywords = inicio.keywords || "";

  

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: (inicio.robots as string) || "index, follow",
    openGraph: {
      title: inicio.ogTitle || title,
      description: inicio.ogDescription || description,
      url: canonical,
      siteName: FALLBACK.siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: FALLBACK.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: inicio.twitterTitle || title,
      description: inicio.twitterDescription || description,
      images: [inicio.twitterImage || ogImage],
    },
    other: inicio.extraMeta || {},
  };
}

export default async function HomePage() {
  const dataGeneral = await getHomeData();
  const posts = dataGeneral.blogs;


  return (
    <>
      {/* HERO full-bleed (bordes a bordes) */}
      <section className="full-bleed">
        <BlogHero
            title="BLOG DE VIAJERO CON JISA ADVENTURE"
            subtitle="Historias, consejos y experiencias únicas para explorar Perú como un viajero auténtico."
            imageUrl="/agencia-de-viaje-cusco-jisaadventure.webp"
            altImageUrl="Machupicchu Jisa Adventure"
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
