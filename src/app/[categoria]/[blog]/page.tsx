import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation"; // ← añadido
import Formulario from "@/components/Formulario";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { apiPost } from "@/lib/api";
import Hero from "@/components/internas/hero";
import Contenido from "@/components/internas/contenido";
import RelatedPosts from "@/components/internas/RelatedPosts";
import InstagramReel from "@/components/internas/InstagramReel";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type PageProps = { params: { categoria: string; blog: string } };

const FALLBACK = {
  siteName: "Blog | Jisa Adventure",
  canonical: "https://blog.jisaadventure.com/",
  title: "Jisa Adventure - Tours en Cusco y Perú",
  description: "Agencia de viajes en Cusco. Tours, paquetes y experiencias auténticas en Perú.",
  locale: "es_PE",
};

// ---------- METADATA ----------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, blog } = params;

  // 1) validar DINÁMICAMENTE que la categoría exista
  const categoriaRes =
    (await apiPost<any>("/categoria-blog", { idiomaId: 1, slug: categoria })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};
  const categoriaData = categoriaRes?.categoria ?? null;
  if (!categoriaData) {
    notFound();
  }

  // 2) traer el post
  const dataGeneral =
    (await apiPost<any>("/blog-slug", { idiomaId: 1, slug: blog })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};

  // si no hay post o, si tu API expone categoriaSlug y no coincide, 404
  const post = dataGeneral?.blog ?? null;
  if (!post || (post?.categoriaSlug && post.categoriaSlug !== categoria)) {
    notFound();
  }

  const title = post.title ?? FALLBACK.title;
  const description = post.description ?? FALLBACK.description;
  const canonical = post?.canonical ?? `https://blog.jisaadventure.com/${categoria}/${blog}`;
  const ogImage = "/agencia-de-viaje-cusco-jisaadventure.webp";
  const keywords = post?.keywords ?? "";

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: (post?.robots as string) ?? "index, follow",
    openGraph: {
      title: post?.ogTitle ?? title,
      description: post?.ogDescription ?? description,
      url: canonical,
      siteName: FALLBACK.siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: FALLBACK.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: post?.twitterTitle ?? title,
      description: post?.twitterDescription ?? description,
      images: [post?.twitterImage ?? ogImage],
    },
    other: dataGeneral?.extraMeta ?? {},
  };
}

// ---------- PAGE ----------
export default async function HomePage({ params }: PageProps) {
  const { categoria, blog } = params;

  // 1) validar DINÁMICAMENTE que la categoría exista
  const categoriaRes =
    (await apiPost<any>("/categoria-blog", { idiomaId: 1, slug: categoria })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};
  const categoriaData = categoriaRes?.categoria ?? null;
  if (!categoriaData) {
    notFound();
  }

  // 2) traer el post
  const dataGeneral =
    (await apiPost<any>("/blog-slug", { idiomaId: 1, slug: blog })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};

  const post = dataGeneral.blog;

  // si no hay post o, si tu API expone categoriaSlug y no coincide, 404
  if (!post || (post?.categoriaSlug && post.categoriaSlug !== categoria)) {
    notFound();
  }

  const items = [
    { href: "/", label: "Inicio" },
    { href: `/${categoria}`, label: categoria },
    { label: post?.titulo ?? blog, current: true },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE || "https://blog.jisaadventure.com";
  const canonical = dataGeneral?.blog?.canonical ?? `https://blog.jisaadventure.com/${categoria}/${blog}`;
  const authorId = `${baseUrl}/sobre-sadith-collatupa`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: categoria, item: `${baseUrl}/${categoria}` },
      { "@type": "ListItem", position: 3, name: post?.titulo ?? blog, item: `${baseUrl}/${categoria}/${blog}` },
    ],
  };

  const imageObj = post?.imagen
    ? {
        "@type": "ImageObject",
        url: post.imagen,
        ...(post?.altImage ? { caption: post.altImage } : {}),
        width: 1600,
        height: 900,
      }
    : undefined;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post?.titulo ?? blog,
    description: post?.resumen ?? "",
    ...(imageObj ? { image: imageObj } : {}),
    author: { "@id": authorId },
    publisher: {
      "@type": "Organization",
      name: "Jisa Adventure",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/imagen/LogoJisa.webp`,
      },
    },
    datePublished: post?.fechaIso ?? post?.fecha,
    dateModified: post?.updated_at ?? post?.fechaActualizacion ?? post?.fecha,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
  };

  return (
    <>
      <article className="md:mt-35">
        <section className="full-bleed">
          <section className="w-full max-w-7xl mx-auto mt-10 mb-3 px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={items} />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
            />
          </section>
          <Hero
            title={post.titulo}
            fecha={post.fecha}
            imageUrl={post.imagen}
            altImageUrl={post.altImage}
          />
        </section>

        <figure className="w-full overflow-hidden mb-12 bg-[#F3F3F3] rounded-xl">
          <img
            src={post.imagen}
            alt={post.altImage}
            className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </figure>

        <section className="full-bleed">
          <Contenido
            title={post.titulo}
            fecha={post.fecha}
            resumen={post.resumen}
            secciones={post.secciones}
            relacionados={post.blogsrelacionados}
          />
        </section>
      </article>
      <section className="">
        <Formulario id="formulario" />
      </section>
      <RelatedPosts posts={post.blogsrelacionados} />

      {/* <InstagramReel url="https://www.instagram.com/reel/DRVgyd-D-83/?igsh=MThmdWt3dXo4NnJpMw==" /> */}
    </>
  );
}
