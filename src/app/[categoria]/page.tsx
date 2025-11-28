import * as React from "react";
import { Metadata } from "next";
import Formulario from "@/components/Formulario";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { apiPost } from "@/lib/api";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type PageProps = { params: { categoria: string } };

const FALLBACK = {
  siteName: "Jisa Adventure",
  canonical: "https://jisaadventure.com/",
  title: "Jisa Adventure - Tours en Cusco y Perú",
  description: "Agencia de viajes en Cusco. Tours, paquetes y experiencias auténticas en Perú.",
  locale: "es_PE",
};

// ---------- METADATA ----------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = params;

  // MISMO PATRÓN que usas: .then(r => r.data) + catch
  const dataGeneral =
    (await apiPost<any>("/categoria-blog", { idiomaId: 1, slug: categoria })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};

  const title = dataGeneral?.categoria.title ?? FALLBACK.title;
  const description = dataGeneral?.categoria.description ?? FALLBACK.description;
  const canonical = dataGeneral?.categoria.canonical ?? FALLBACK.canonical;
  const ogImage = "/agencia-de-viaje-cusco-jisaadventure.webp";
  const keywords = dataGeneral?.categoria.keywords ?? "";

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    // Mantengo tu string para robots (misma estructura):
    robots: (dataGeneral?.categoria.robots as string) ?? "index, follow",
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

  // MISMO PATRÓN que usas: .then(r => r.data) + catch
  const dataGeneral =
    (await apiPost<any>("/categoria-blog", { idiomaId: 1, slug: categoria })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};
  const posts = dataGeneral.categoria.blogs ?? [];

  const items = [
      { href: "/", label: "Inicio" },
      { label: dataGeneral.categoria?.nombre, current: true },
    ];

    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE || "https://blog.jisaadventure.com";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${baseUrl}/` },
        { "@type": "ListItem", position: 2, name: categoria, item: `${baseUrl}/${categoria}` },
      ],
    };

  return (
    <>
      {/* HERO full-bleed (bordes a bordes) */}
      <section className="full-bleed">
        <BlogHero
          title={dataGeneral?.categoria.nombre ?? "Blog"}
          subtitle={dataGeneral?.categoria.nombre ?? ""}
          imageUrl={dataGeneral?.categoria.imagen ?? "/agencia-de-viaje-cusco-jisaadventure.webp"}
          altImageUrl={dataGeneral?.categoria.altImage ?? dataGeneral?.categoria.nombre ?? "Banner"}
        />
      </section>

      <section className="w-full max-w-7xl mx-auto mt-10 mb-3 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={items}  className="mb-4"/>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>

      <BlogGrid posts={posts} filtro="1" categorias={dataGeneral.categoriaBlogs}/>

      <section className="">
        <Formulario id="formulario" />
      </section>
    </>
  );
}
