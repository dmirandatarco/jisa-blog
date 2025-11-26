import type { Metadata } from "next";
import AuthorProfile from "@/components/AuthorProfile";
import { apiPost } from "@/lib/api";

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

  const dataGeneral =
      (await apiPost<any>("/sadith", { idiomaId: 1 })
        .then((r) => r.data)
        .catch(() => undefined)) ?? {};
        
  const posts = dataGeneral.blogs;

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
            avatar={{ src: "/imagen/sadith-collatupa.jpg", alt: AUTHOR_NAME }}
            socials={{
              instagram: "https://www.instagram.com/sadithdejisa/",
              facebook: "https://www.facebook.com/sadith.collatupa.acuna",
              tiktok: "https://www.tiktok.com/@sadithdejisa",
              linkedin: "https://www.linkedin.com/in/sadithdejisa/",
            }}
            // articles={articles}
            posts={posts}
        />
      </section>
    </>
  );
}
