import Script from "next/script";

export type OrganizationRef = {
  name: string;
  url?: string;
};

export type JsonLdPersonProps = {
  id?: string; // @id recomendado (URL#person)
  name: string;
  url: string; // URL canónica de la página del autor
  image?: string;
  jobTitle?: string;
  description?: string;
  affiliation?: OrganizationRef;
  worksFor?: OrganizationRef;
  nationality?: { name: string } | string; // permite pasar sólo el nombre
  gender?: string;
  alternateName?: string;
  knowsAbout?: string[];
  sameAs?: string[]; // redes / perfiles
  scriptId?: string; // id del <script>/<Script>
  strategy?: "afterInteractive" | "beforeInteractive" | "lazyOnload";
};

/**
 * JsonLdPerson — componente reutilizable para inyectar Schema.org Person
 * Uso (App Router):
 * <JsonLdPerson name="Nombre" url="https://tu-sitio.com/autor" sameAs={["https://ig..."]} />
 */
export default function JsonLdPerson({
  id,
  name,
  url,
  image,
  jobTitle,
  description,
  affiliation,
  worksFor,
  nationality,
  gender,
  alternateName,
  knowsAbout,
  sameAs,
  scriptId = "person-schema",
  strategy = "afterInteractive",
}: JsonLdPersonProps) {
  // Normaliza nationality si llega como string
  const nationalityObj =
    typeof nationality === "string"
      ? { "@type": "Country", name: nationality }
      : nationality
      ? { "@type": "Country", ...nationality }
      : undefined;

  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Person",
    ...(id ? { "@id": id } : {}),
    name,
    url,
    ...(image ? { image } : {}),
    ...(jobTitle ? { jobTitle } : {}),
    ...(alternateName ? { alternateName } : {}),
    ...(description ? { description } : {}),
    ...(affiliation
      ? {
          affiliation: {
            "@type": "Organization",
            name: affiliation.name,
            ...(affiliation.url ? { url: affiliation.url } : {}),
          },
        }
      : {}),
    ...(worksFor
      ? {
          worksFor: {
            "@type": "Organization",
            name: worksFor.name,
            ...(worksFor.url ? { url: worksFor.url } : {}),
          },
        }
      : {}),
    ...(nationalityObj ? { nationality: nationalityObj } : {}),
    ...(gender ? { gender } : {}),
    ...(Array.isArray(knowsAbout) && knowsAbout.length
      ? { knowsAbout }
      : {}),
    ...(Array.isArray(sameAs) && sameAs.length
      ? { sameAs: sameAs.filter(Boolean) }
      : {}),
  };

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      strategy={strategy}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
