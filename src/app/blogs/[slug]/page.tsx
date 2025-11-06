import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiPost } from "@/lib/api";
import BlogDetailClient from "./BlogDetailClient";

type BlogResp = {
  blog: {
    slug: string;
    titulo: string;
    imagen?: string;
    contenido?: string;          // HTML
    categoriablog?: { nombre: string };
    relacionados?: any[];
  };
  paquetes?: any[];
  tripadvisors?: any[];
  googles?: any[];
  totalTripadvisor?: number;
  totalGoogle?: number;
  // Campos SEO opcionales
  title?: string;
  description?: string;
  robots?: string;
  canonical?: string;
  keywords?: string;
};

export const dynamic = "force-dynamic"; // o usa revalidate si prefieres ISR

// SEO dinámico
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const slug = params.slug;
  const idioma_id = 1; // si manejas i18n en server, cámbialo
  const res = await apiPost<{ data?: BlogResp }>(
    "/blog-slug",
    { idioma_id, slug },
    { cacheSeconds: 60, tags: ["blogs", slug] }
  ).catch(() => undefined);

  const d = res?.data;
  if (!d?.blog) {
    return {
      title: "404 | Blog no encontrado",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: d.title ?? d.blog.titulo,
    description: d.description ?? "",
    robots: d.robots ?? "index, follow",
    keywords: d.keywords,
    alternates: { canonical: d.canonical ?? `https://jisaadventure.com/blogs/${slug}` },
    openGraph: {
      title: d.title ?? d.blog.titulo,
      description: d.description ?? "",
      url: `https://jisaadventure.com/blogs/${slug}`,
      images: d.blog.imagen ? [{ url: d.blog.imagen }] : undefined,
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const idioma_id = 1;

  const res = await apiPost<{ data?: BlogResp }>(
    "/blog-slug",
    { idioma_id, slug },
    { cacheSeconds: 60, tags: ["blogs", slug] }
  ).catch(() => undefined);

  const data = res?.data;
  if (!data?.blog) notFound();

  return <BlogDetailClient data={data} />;
}
