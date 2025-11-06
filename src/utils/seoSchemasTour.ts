const toAbs = (origin?: string, path = ""): string => {
  const base = (origin ?? "").replace(/\/$/, "");
  const p = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${base}${p}`;
};

/** Limpia valores de imagen que vengan como `url(...)` o con prefijos raros */
const sanitizeImage = (img?: string): string | undefined => {
  if (!img) return undefined;
  const s = String(img).trim();
  // quita 'url(' ... ')' o prefijos tipo 'url '
  const m = s.match(/^url\((.*)\)$/i);
  return (m ? m[1] : s).replace(/^url\s+/i, "").trim().replace(/^["']|["']$/g, "");
};

/** Tipos mínimos del tour que usa el schema (ajusta si quieres más estricto) */
export type TourForSchema = {
  slug?: string;
  h1?: string;
  title?: string;
  description?: string;
  canonical?: string;
  foto_banner?: string;
  foto_principal?: string;
  keywords?: string | string[];
  precio?: number | string;
  tipo?: number | string;
  ubicaciones?: Array<
    | string
    | {
        nombre?: string;
        countryCode?: string; // e.g. "PE"
        slug?: string;
      }
  >;
  itinerarios?: Array<{ titulo?: string; name?: string }>;
};

/** Opciones de construcción del schema */
export type BuildTouristTripOpts = {
  baseUrl?: string;        // "https://jisaadventure.com"
  reservaBase?: string;    // "/tours" ó "/tour"
  defaultCurrency?: string; // "USD"
  reviews?: number;        // para reviewCount (si quieres exponerlo)
};

/**
 * Construye un objeto JSON-LD TouristTrip para inyectar en <script type="application/ld+json">
 */
export function buildTouristTripFromTour(
  tour?: TourForSchema | null,
  {
    baseUrl = "https://jisaadventure.com",
    reservaBase = "/tours",
    defaultCurrency = "USD", // por si necesitas usarlo más adelante
    reviews = 550,
  }: BuildTouristTripOpts = {}
): Record<string, any> | null {
  if (!tour) return null;

  // Imagen principal absoluta (fallback a imagen local)
  const imageAbs = tour.foto_banner && tour.foto_banner.startsWith("http")
    ? sanitizeImage(tour.foto_banner)
    : toAbs(baseUrl, sanitizeImage(tour.foto_banner || "/agencia-de-viaje-cusco-jisaadventure.webp"));

  // URL del tour
  const tourUrl = tour.canonical || toAbs(baseUrl, `/tours/${tour.slug ?? ""}`);

  // Destinos (no es obligatorio en TouristTrip, lo omitimos si no lo usas)
  // Si quisieras incluirlos, Schema.org sugiere usar "itinerary" con ItemList, o "touristType"/"areaServed".
  // Aquí dejamos sólo "itinerary" (abajo) y mantenemos esto como comentario.

  // Itinerario → como lista de items
  const itinerary =
    Array.isArray(tour.itinerarios) && tour.itinerarios.length
      ? tour.itinerarios.map((it) => ({
          "@type": "ListItem",
          name: it.titulo || it.name || "Día",
          // description opcional (recorta si es muy grande)
        }))
      : undefined;

  // Oferta / precio (si tienes)
  const price =
    tour.precio !== undefined && tour.precio !== null
      ? String(tour.precio)
      : undefined;
  const priceCurrency = "USD";
  const offerUrl = toAbs(baseUrl, `${reservaBase}/${tour.slug ?? ""}`);

  // Rating “dummy” opcional (si no tienes, mejor omitirlo)
  const ratingValue = 5;
  const reviewCount = reviews;

  // keywords opcionales
  const keywords = tour.keywords ?? undefined;

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.h1 || tour.title || "",
    description: tour.description || "",
    image: imageAbs ? [imageAbs] : undefined,
    url: tourUrl,
    ...(itinerary
      ? {
          itinerary: {
            "@type": "ItemList",
            itemListElement: itinerary,
          },
        }
      : {}),

    // Proveedor
    provider: {
      "@type": "Organization",
      name: "Jisa Adventure",
      url: baseUrl,
      logo: "https://sistema.jisaadventure.com/storage/header/logo-1.webp",
      sameAs: [
        "https://www.instagram.com/jisa_adventure/",
        "https://www.youtube.com/channel/UCsLfbdfqeKGvbxBvuTr7jVw",
        "https://www.facebook.com/Jisadventuress/",
        "https://www.tiktok.com/@jisa_adventure",
        "https://www.tripadvisor.com.pe/Attraction_Review-g294318-d17545647-Reviews-JISA_ADVENTURE_Agencia_de_viajes_para_Cusco-Machu_Picchu_Sacred_Valley_Cusco_Reg.html",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+51-976-294-449",
        contactType: "customer service",
        areaServed: "PE",
        availableLanguage: ["Spanish", "English"],
      },
    },

    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency,
            availability: "https://schema.org/InStock",
            url: offerUrl,
          },
        }
      : {}),

    // Si quieres incluir rating (solo si es real; si no, omite para evitar “rich results” engañosos)
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue,
    //   reviewCount,
    // },

    ...(keywords ? { keywords } : {}),
  };

  return schema;
}