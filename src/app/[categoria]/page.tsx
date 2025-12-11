import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Formulario from "@/components/Formulario";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { apiPost } from "@/lib/api";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type PageProps = { params: { categoria: string } };

const FALLBACK = {
  siteName: "Blog Jisa Adventure",
  canonical: "https://blog.jisaadventure.com/",
  title: "Jisa Adventure - Tours en Cusco y Perú",
  description: "Agencia de viajes en Cusco. Tours, paquetes y experiencias auténticas en Perú.",
  locale: "es_PE",
};

// ---------- METADATA ----------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = params;

  const dataGeneral =
    (await apiPost<any>("/categoria-blog", { idiomaId: 1, slug: categoria })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};

  // Evitamos reventar cuando categoria no existe
  const categoriaData = dataGeneral?.categoria ?? null;

  // Si no hay categoría, usamos fallback simple (o podrías devolver metadata de 404)
  if (!categoriaData) {
    return {
      title: FALLBACK.title,
      description: FALLBACK.description,
      alternates: { canonical: `https://blog.jisaadventure.com/${categoria}` },
    };
  }

  const title = categoriaData.title ?? FALLBACK.title;
  const description = categoriaData.description ?? FALLBACK.description;
  const canonical = categoriaData.canonical ?? `https://blog.jisaadventure.com/${categoria}`;
  const ogImage = "/agencia-de-viaje-cusco-jisaadventure.webp";
  const keywords = categoriaData.keywords ?? "";

  return {
    title,
    description,
    keywords,
    robots: (categoriaData.robots as string) ?? "index, follow",
    openGraph: {
      title: dataGeneral?.ogTitle ?? title,
      description: dataGeneral?.ogDescription ?? description,
      url: canonical,
      siteName: FALLBACK.siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: FALLBACK.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dataGeneral?.twitterTitle ?? title,
      description: dataGeneral?.twitterDescription ?? description,
      images: [dataGeneral?.twitterImage ?? ogImage],
    },
    other: dataGeneral?.extraMeta ?? {},
  };
}

// ---------- PAGE ----------
export default async function HomePage({ params }: PageProps) {
  const { categoria } = params;

  const dataGeneral =
    (await apiPost<any>("/categoria-blog", { idiomaId: 1, slug: categoria })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};

  const categoriaData = dataGeneral?.categoria ?? null;

  // Si no hay categoría, devolvemos 404 bonito
  if (!categoriaData) {
    notFound();
  }

  const posts = categoriaData.blogs ?? [];

  const items = [
    { href: "/", label: "Inicio" },
    { label: categoriaData.nombre ?? "Blog", current: true },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE || "https://blog.jisaadventure.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: categoriaData.nombre ?? categoria, item: `${baseUrl}/${categoria}` },
    ],
  };

  return (
    <>
      {/* HERO */}
      <section className="full-bleed">
        <BlogHero
          title={categoriaData.nombre ?? "Blog"}
          subtitle={categoriaData.nombre ?? ""}
          imageUrl={categoriaData.imagen ?? "/agencia-de-viaje-cusco-jisaadventure.webp"}
          altImageUrl={categoriaData.altImage ?? categoriaData.nombre ?? "Banner"}
        />
      </section>

      <section className="w-full max-w-7xl mx-auto mt-10 mb-3 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={items} className="mb-4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>

      <BlogGrid
        posts={posts}
        filtro="1"
        categorias={dataGeneral.categoriaBlogs ?? []}
      />

      <section>
        <Formulario id="formulario" />
      </section>
    </>
  );
}
