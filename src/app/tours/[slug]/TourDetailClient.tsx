"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import HeroSectionTour from "@/components/tours/HeroSectionTour";
import TourInfo from "@/components/tours/TourInfo.client";
import TourDetails from "@/components/tours/TourDetails.client";
import TabsSection from "@/components/tours/TabsSection.client";
import TestimoniosSection from "@/components/home/TestimoniosSection.client";
import ToursRelacionados from "@/components/tours/TourRelacionados";
import BlogSection from "@/components/home/BlogSection.client";
import FaqSchemaLD from "@/utils/FaqSchemaLD";
import {
  buildProductReviews,
  buildAggregateRating,
} from "@/utils/reviews";
import ProductSchemaLD from "@/utils/ProductSchemaLD";

const toAbs = (origin?: string, path = "") =>
  `${(origin ?? "").replace(/\/$/, "")}${path ? (path.startsWith("/") ? path : `/${path}`) : ""}`;

const sanitizeImage = (img?: string): string | undefined => {
  if (!img) return undefined;
  const s = String(img).trim();
  const m = s.match(/^url\((.*)\)$/i);
  return (m ? m[1] : s).replace(/^url\s+/i, "").trim().replace(/^["']|["']$/g, "");
};

function initialsForSku(name: string): string {
  if (!name) return "";
  // separa por espacios/puntuación
  const parts = name
    .trim()
    .split(/[\s\-_/.,;:()]+/)
    .filter(Boolean);

  const raw = parts.map(w => w[0] || "").join("");

  // quita acentos y deja solo A-Z0-9
  const cleaned = raw
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  return cleaned;
}

export default function TourDetailClient({ data }: { data: any }) {
  const { t } = useTranslation();
  const tour = data.tour;
  const dias   = tour?.itinerarios?.length ?? 1;
  const grupo  = tour?.max_pax;
  const recojo = tour?.recojo;
  const taxo = "tours";
  const canonical = tour?.canonical ?? `https://jisaadventure.com/${taxo}/${tour?.slug}`;

  const productName = tour?.h1 || tour?.title || "Tour";
  const productDescription = tour?.description || tour?.resumen || "";
  const price = tour?.precio != null ? String(tour.precio) : undefined;
  const category = tour?.ubicaciones?.[0]?.nombre || tour?.tipo_categoria?.nombre || undefined;

  const sku = `${initialsForSku(productName)} - 2025`;

  const imageAbs =
    tour?.foto_principal && String(tour.foto_principal).startsWith("http")
      ? sanitizeImage(tour.foto_principal)
      : toAbs("https://jisaadventure.com", sanitizeImage(tour?.foto_principal || "/agencia-de-viaje-cusco-jisaadventure.webp"));

  const aggregateRating = (data?.totalTripadvisor || data?.totalGoogle) ? {
    ratingValue: 5,
    reviewCount: (data?.totalTripadvisor ?? 0) + (data?.totalGoogle ?? 0),
  } : undefined;

  const productReviews = buildProductReviews(
    data?.tripadvisors ?? [],
    data?.googles ?? [],
    15
  );

  return (
    <>

      {imageAbs && (
        <ProductSchemaLD
          id="product-schema"
          productId={`${canonical}#product`}
          name={productName}
          description={productDescription}
          image={imageAbs}
          brand={{ name: "Jisa Adventures", url: "https://jisaadventure.com/" }}
          sku={sku ?? undefined}
          category={category}
          offers={
            price
              ? {
                  price,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: canonical,
                  validFrom: "2025-01-01",
                }
              : undefined
          }
          aggregateRating={aggregateRating}
          reviews={productReviews.map((r) => ({
            author: r.author,
            datePublished: r.datePublished || undefined, // si falta, lo omitimos (válido)
            name: r.name,
            reviewBody: r.reviewBody,
            ratingValue: r.ratingValue,
          }))}
        />
      )}

      <FaqSchemaLD id="faq-schema" faqs={tour?.faqs ?? []} />

      <section className="full-bleed">
        <HeroSectionTour
          backgroundImage={tour?.foto_banner}
          title={tour?.h1}
          description={`${t("tours_destacados.desde")} $ ${tour?.precio} / persona`}
          buttonText="Ver Tours"
          buttonLink="https://jisaadventure.com/"
        />
      </section>

      {/* CARD de info que “muerde” el hero */}
      <div className="page -mt-10 md:-mt-16 relative z-10">
        <TourInfo
          duracion={dias}
          grupo={grupo}
          tipo={tour?.tipo_categoria?.nombre}
          recojo={recojo}
        />
      </div>

      {/* Contenido con ritmo vertical uniforme */}
      <div className="page space-y-16 md:space-y-24 section-y">
        <TourDetails
          tour={tour}
          ubicaciones={tour?.ubicaciones ?? []}
          descripcion={tour?.resumen}
          imagenSecundaria={tour?.foto_principal}
        />

        <TabsSection tour={tour} dias={dias} />

        <ToursRelacionados tours={tour?.relacionados ?? []} />

        <TestimoniosSection
          id="testimonios"
          data={data?.tripadvisors ?? []}
          google={data?.googles ?? []}
          totalTripadvisor={data?.totalTripadvisor ?? 0}
          totalGoogle={data?.totalGoogle ?? 0}
        />

        <BlogSection id="blog" data={data?.blogs ?? []} />
      </div>
    </>
  );
}
