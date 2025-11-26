import * as React from "react";
import { Metadata } from "next";
import Formulario from "@/components/Formulario";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { apiPost } from "@/lib/api";
import Hero from "@/components/internas/hero";
import Contenido from "@/components/internas/contenido";
import RelatedPosts from "@/components/internas/RelatedPosts";
import InstagramReel from "@/components/internas/InstagramReel";

type PageProps = { params: { categoria: string; blog: string } };

const FALLBACK = {
  siteName: "Blog | Jisa Adventure",
  canonical: "https://jisaadventure.com/",
  title: "Jisa Adventure - Tours en Cusco y Perú",
  description: "Agencia de viajes en Cusco. Tours, paquetes y experiencias auténticas en Perú.",
  locale: "es_PE",
};

// ---------- METADATA ----------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, blog } = params;

  // MISMO PATRÓN que usas: .then(r => r.data) + catch
  const dataGeneral =
    (await apiPost<any>("/blog-slug", { idiomaId: 1, slug: blog })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};

  const title = dataGeneral?.blog.title ?? FALLBACK.title;
  const description = dataGeneral?.blog.description ?? FALLBACK.description;
  const canonical = dataGeneral?.blog.canonical ?? FALLBACK.canonical;
  const ogImage = "/agencia-de-viaje-cusco-jisaadventure.webp";
  const keywords = dataGeneral?.blog.keywords ?? "";

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    // Mantengo tu string para robots (misma estructura):
    robots: (dataGeneral?.blog.robots as string) ?? "index, follow",
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
  const { categoria, blog } = params;

  // MISMO PATRÓN que usas: .then(r => r.data) + catch
  const dataGeneral =
    (await apiPost<any>("/blog-slug", { idiomaId: 1, slug: blog })
      .then((r) => r.data)
      .catch(() => undefined)) ?? {};

    const post = dataGeneral.blog;

  return (
    <>
        <section className="full-bleed md:mt-25">
            <Hero title={post.titulo} fecha={post.fecha} imageUrl={post.imagen} altImageUrl={post.altImage} />
        </section>

        <div className="w-full overflow-hidden mb-12 bg-[#F3F3F3] rounded-xl">
            <img src={post.imagen} alt={post.altImage} className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-500" />
        </div>

        <section className="full-bleed">
            <Contenido  
                title={post.titulo}
                fecha={post.fecha}
                resumen={post.resumen}
                secciones={post.secciones}
                relacionados={post.blogsrelacionados}

            />
        </section>
        <section className="">
            <Formulario id="formulario" />
        </section>
        <RelatedPosts posts={post.blogsrelacionados} />
        
        {/* <InstagramReel url="https://www.instagram.com/reel/DRVgyd-D-83/?igsh=MThmdWt3dXo4NnJpMw==" /> */}
    </>
  );
}
