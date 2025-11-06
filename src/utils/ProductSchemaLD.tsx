import Script from "next/script";

type AggregateRating = {
  ratingValue: number | string;
  reviewCount: number | string;
};

type Offer = {
  price: string | number;
  priceCurrency?: string; // por defecto USD
  availability?: string;  // https://schema.org/InStock
  url?: string;
  validFrom?: string;     // YYYY-MM-DD
};

type BrandOrg = {
  name: string;
  url?: string;
};

type ProductSchemaProps = {
  id?: string;            // id único del <script>
  productId?: string;     // @id del schema (ej: canonical + "#product")
  name: string;
  description?: string;
  image: string;          // URL absoluta
  brand?: BrandOrg;
  sku?: string;
  category?: string;
  offers?: Offer;
  aggregateRating?: AggregateRating; // Si no tienes datos reales, omítelo
  reviews?: Array<{
    author: string;
    datePublished: string;     // YYYY-MM-DD
    name: string;              // título
    reviewBody: string;
    ratingValue: number | string;
  }>;
};

export default function ProductSchemaLD({
  id = "product-schema",
  productId,
  name,
  description,
  image,
  brand = { name: "Jisa Adventures", url: "https://jisaadventure.com/" },
  sku,
  category,
  offers,
  aggregateRating,
  reviews = [],
}: ProductSchemaProps) {
  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    ...(productId ? { "@id": productId } : {}),
    name,
    ...(description ? { description } : {}),
    image,
    ...(brand ? { brand: { "@type": "Organization", ...brand } } : {}),
    ...(sku ? { sku } : {}),
    ...(category ? { category } : {}),
  };

  if (offers?.price) {
    jsonLd.offers = {
      "@type": "Offer",
      price: String(offers.price),
      priceCurrency: offers.priceCurrency || "USD",
      availability: offers.availability || "https://schema.org/InStock",
      ...(offers.url ? { url: offers.url } : {}),
      ...(offers.validFrom ? { validFrom: offers.validFrom } : {}),
    };
  }

  if (aggregateRating?.ratingValue && aggregateRating?.reviewCount) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(aggregateRating.ratingValue),
      reviewCount: String(aggregateRating.reviewCount),
    };
  }

  if (reviews.length) {
    jsonLd.review = reviews.map(r => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.datePublished,
      name: r.name,
      reviewBody: r.reviewBody,
      reviewRating: { "@type": "Rating", ratingValue: String(r.ratingValue), bestRating: "5" },
    }));
  }

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
