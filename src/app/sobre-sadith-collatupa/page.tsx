import type { Metadata } from "next";
import AuthorProfile from "@/components/AuthorProfile";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL ?? "https://jisaadventure.com";
const AUTHOR_NAME = "Sadith Collatupa";

export const metadata: Metadata = {
  title: `${AUTHOR_NAME} | Jisa Adventure Blog`,
  description:
    "Perfil de Sadith Collatupa: creadora de contenido y viajera peruana. Guías, historias y consejos para recorrer el Perú.",
  alternates: { canonical: `${SITE_URL}/autor` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/autor`,
    title: `${AUTHOR_NAME} | Jisa Adventure Blog`,
    description:
      "Guías, historias y consejos de viaje por Perú escritas por Sadith Collatupa.",
    siteName: "Jisa Adventure",
  },
};

export default async function Page() {
  // Si luego quieres traer artículos reales, reemplaza por un fetch al backend.
  const articles = [
    { title: "MONTAÑA 7 COLORES: GUÍA DE VIAJES 2025", updatedAt: "28 Oct. 2025", href: "/blog/montana-7-colores" },
    { title: "LA LAGUNA HUMANTAY: GUÍA DE VIAJE", updatedAt: "28 Oct. 2025", href: "/blog/laguna-humantay" },
    { title: "LAS RUTAS DE MACHU PICCHU 2025", updatedAt: "28 Oct. 2025", href: "/blog/rutas-machu-picchu" },
    { title: "VALLE SAGRADO: GUÍA COMPLETA", updatedAt: "28 Oct. 2025", href: "/blog/valle-sagrado" },
    // …agrega más
  ];

  const posts = [
    {
      href: "#",
      title: "ARTICULOS RELACIONADOS EN TU TOUR A MACHU PICCHU",
      excerpt:
        "En tu viaje a Machu Picchu disfrutarás de una aventura inolvidable mientras sigues los pasos de los incas en el famoso Santuario Histórico.",
      cover:
        "https://images.unsplash.com/photo-1520962918287-7448c2878f65?auto=format&fit=crop&w=1200&q=80",
      tagLabel: "Preguntas frecuentes",
      dateLabel: "12/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "Montaña de 7 Colores: lo que debes saber",
      excerpt:
        "Conoce la mejor temporada, altitud y recomendaciones para disfrutar de esta maravilla natural del Cusco.",
      cover:
        "https://images.unsplash.com/photo-1549887534-4b8b7f6c0c27?auto=format&fit=crop&w=800&q=80",
      tagLabel: "Preguntas frecuentes",
      dateLabel: "18/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "Valle Sagrado: historia, cultura y paisajes únicos",
      excerpt:
        "Una guía completa para recorrer los pueblos andinos, artesanías y miradores del Valle Sagrado de los Incas.",
      cover:
        "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1200&q=80",
      tagLabel: "Inspiración de viaje",
      dateLabel: "20/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "Cómo preparar tu visita al Cusco",
      excerpt:
        "Tips sobre aclimatación, altitud, transporte y los mejores tours para aprovechar tu estadía en Cusco.",
      cover:
        "https://images.unsplash.com/photo-1521252518528-4a19a81be41f?auto=format&fit=crop&w=1200&q=80",
      tagLabel: "Consejos de viaje",
      dateLabel: "25/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "Qué llevar al Camino Inca",
      excerpt:
        "Revisa nuestra lista esencial para hacer el trekking más famoso del Perú con seguridad y comodidad.",
      cover:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      tagLabel: "Guía rápida",
      dateLabel: "28/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "ARTICULOS RELACIONADOS EN TU TOUR A MACHU PICCHU",
      excerpt:
        "En tu viaje a Machu Picchu disfrutarás de una aventura inolvidable mientras sigues los pasos de los incas en el famoso Santuario Histórico.",
      cover:
        "https://images.unsplash.com/photo-1520962918287-7448c2878f65?auto=format&fit=crop&w=1200&q=80",
      tagLabel: "Preguntas frecuentes",
      dateLabel: "12/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "Montaña de 7 Colores: lo que debes saber",
      excerpt:
        "Conoce la mejor temporada, altitud y recomendaciones para disfrutar de esta maravilla natural del Cusco.",
      cover:
        "https://images.unsplash.com/photo-1549887534-4b8b7f6c0c27?auto=format&fit=crop&w=800&q=80",
      tagLabel: "Preguntas frecuentes",
      dateLabel: "18/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "Valle Sagrado: historia, cultura y paisajes únicos",
      excerpt:
        "Una guía completa para recorrer los pueblos andinos, artesanías y miradores del Valle Sagrado de los Incas.",
      cover:
        "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1200&q=80",
      tagLabel: "Inspiración de viaje",
      dateLabel: "20/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "Cómo preparar tu visita al Cusco",
      excerpt:
        "Tips sobre aclimatación, altitud, transporte y los mejores tours para aprovechar tu estadía en Cusco.",
      cover:
        "https://images.unsplash.com/photo-1521252518528-4a19a81be41f?auto=format&fit=crop&w=1200&q=80",
      tagLabel: "Consejos de viaje",
      dateLabel: "25/05/2025",
      author: "Sadith Collatupa",
    },
    {
      href: "#",
      title: "Qué llevar al Camino Inca",
      excerpt:
        "Revisa nuestra lista esencial para hacer el trekking más famoso del Perú con seguridad y comodidad.",
      cover:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      tagLabel: "Guía rápida",
      dateLabel: "28/05/2025",
      author: "Sadith Collatupa",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: `${SITE_URL}/autor`,
    affiliation: { "@type": "Organization", name: "Jisa Adventure" },
    sameAs: [
      "https://instagram.com/tuuser",
      "https://www.facebook.com/tuuser",
      "https://www.tiktok.com/@tuuser",
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="full-bleed md:mt-10">
        <AuthorProfile
            name={AUTHOR_NAME}
            breadcrumbHome={{ label: "Inicio", href: "/" }}
            avatar={{ src: "/images/authors/sadith.jpg", alt: AUTHOR_NAME }}
            socials={{
            instagram: "https://instagram.com/tuuser",
            facebook: "https://www.facebook.com/tuuser",
            tiktok: "https://www.tiktok.com/@tuuser",
            email: "hola@jisaadventure.com",
            }}
            articles={articles}
            posts={posts}
        />
      </section>
    </>
  );
}
