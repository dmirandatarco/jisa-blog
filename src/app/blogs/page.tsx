import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiPost } from "@/lib/api";
import BlogsClient from "./BlogsClient";
import HeroSectionMidle from "@/components/secciones/HeroSectionMidle";

// Si quieres cachear, cambia a revalidate: 60
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Jisa Adventure",
  description:
    "Consejos, guías y noticias para planificar tu viaje por Perú: Cusco, Machu Picchu, Lago Titicaca, Arequipa, Paracas e Ica.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://jisaadventure.com/blogs" },
};

type Blog = {
  slug: string;
  titulo: string;
  resumen?: string;
  imagen?: string;
  fecha?: string;
  categoriablog?: { nombre: string };
};

export default async function BlogsPage() {
  // Si tienes i18n en server, resuélvelo aquí. De momento, idiomaId fijo = 1
  const idiomaId = 1;

  const res = await apiPost<{ data?: { blog?: Blog[] } }>(
    "/blogs",
    { idioma_id: idiomaId },
    { cacheSeconds: 60, tags: ["blogs"] }
  ).catch(() => undefined);

  const blogs = res?.data?.blog ?? [];

  // 404 si backend no trae nada o lista vacía
  if (!res || !res.data || blogs.length === 0) {
    notFound();
  }

  return (
    <>
        <section className="full-bleed">
            <HeroSectionMidle
                backgroundImage="/agencia-de-viaje-cusco-jisaadventure.webp"
                title="BLOGS"
                description=""
            />
        </section>

      <BlogsClient blogs={blogs} />
    </>
  );
}
