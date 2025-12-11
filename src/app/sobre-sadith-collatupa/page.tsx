import type { Metadata } from "next";
import AuthorProfile from "@/components/AuthorProfile";
import { apiPost } from "@/lib/api";
import JsonLdPerson from "@/utils/PersonSchema";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL ?? "https://blog.jisaadventure.com";
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

    return (
    <>
      <JsonLdPerson
        id="https://blog.jisaadventures.com/sobre-sadith-collatupa"
        name="Sadith Collatupa"
        alternateName="Sadith C."
        jobTitle="Redactora especializada en viajes por Perú"
        description="Sadith Collatupa es redactora y creadora de contenido especializada en turismo y experiencias por Perú. Con más de 100 000 seguidores en Instagram, comparte guías, consejos e inspiración para viajeros que sueñan con descubrir cada rincón del país."
        url="https://blog.jisaadventures.com"
        image="/imagen/sadith-collatupa.jpg"
        affiliation={{ name: "Jisa Adventures", url: "https://www.jisaadventures.com" }}
        worksFor={{ name: "Jisa Adventures" }}
        nationality="Perú"
        gender="Female"
        knowsAbout={[
          "Turismo en Perú",
          "Machu Picchu",
          "Cusco",
          "Ica",
          "Lima",
          "Arequipa",
          "Puno",
          "Viajes sostenibles",
          "Aventura y cultura",
        ]}
        sameAs={[
          "https://www.instagram.com/sadithcollatupa",
          "https://blog.jisaadventures.com/sobre-sadith-collatupa",
          "https://www.jisaadventures.com",
        ]}
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
