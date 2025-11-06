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
  const slider = dataGeneral?.slider;
  const jsonLd = dataGeneral?.inicio?.jsonLd;

  return (
    <>
      <TravelAgencySchema />

      {/* HERO full-bleed (bordes a bordes) */}
      <section className="full-bleed">
        <Hero id="hero" data={slider} />
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-3 md:bottom-8 w-[min(92vw,900px)] px-4 z-[40]">
          <SearchBarMount id="search" data={dataGeneral.tours} />
        </div>
      </section>

      {/* Contenido bajo el pliegue (centrado + cv-auto para diferir layout/paint) */}
      
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <PackageSection id="packages" data={dataGeneral?.paquetes} tipo={1} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <DestinosSection id="destinos" data={dataGeneral?.destinos} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <PackageSection id="tours" data={dataGeneral?.toursPrincipales} tipo={0} />
      </section>

      {/* <section className="mx-auto max-w-6xl px-6 py-12 md:py-16 cv-auto">
        <AboutSection id="about" data={dataGeneral?.nosotros} />
      </section> */}

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <PromocionSection id="promociones" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16 cv-auto">
        <BlogSection id="blog" data={dataGeneral?.blogs} />
      </section>

      <div className="py-5">
        <FaqSectionOneCols
          faqs={dataGeneral.inicio?.faqs}
        />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16 cv-auto">
        <TestimoniosSection
          id="testimonios"
          data={dataGeneral?.tripadvisors}
          google={dataGeneral?.googles}
          totalTripadvisor={dataGeneral?.totalTripadvisor}
          totalGoogle={dataGeneral?.totalGoogle}
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16 cv-auto">
        <MarcasSection id="marcas" />
      </section>
    </>
  );
}
