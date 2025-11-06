import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiPost } from "@/lib/api";
import TourDetailClient from "./TourDetailClient";

// si prefieres ISR, cambia por revalidate: 60
export const dynamic = "force-dynamic";

type TourAPI = {
  tour: any;
  blogs?: any[];
  tripadvisors?: any[];
  googles?: any[];
  totalTripadvisor?: number;
  totalGoogle?: number;
};

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const slug = params.slug;
  const idioma_id = 1; // resuélvelo en server si usas i18n
  const res = await apiPost<{ data?: TourAPI }>(
    "/tour-slug",
    { idioma_id, slug },
    { cacheSeconds: 60, tags: ["tour", slug] }
  ).catch(() => undefined);

  const d = res?.data?.tour;
  if (!d) {
    return {
      title: "404 | Tour no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const taxo =  "tours";
  const canonical = d?.canonical ?? `https://jisaadventure.com/${taxo}/${slug}`;

  return {
    title: d.title ?? d.h1,
    description: d.description ?? "",
    robots: d.robots ?? "index, follow",
    keywords: d.keywords,
    alternates: { canonical },
    openGraph: {
      title: d.title ?? d.h1,
      description: d.description ?? "",
      url: canonical,
      images: d.foto_banner ? [{ url: d.foto_banner }] : undefined,
      type: "article",
      siteName: "Jisa Adventure",
    },
  };
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const idioma_id = 1;

  const res = await apiPost<{ data?: TourAPI }>(
    "/tour-slug",
    { idioma_id, slug },
    { cacheSeconds: 60, tags: ["tour", slug] }
  ).catch(() => undefined);

  const data = res?.data;
  if (!data?.tour) notFound();

  return <TourDetailClient data={data} />;
}