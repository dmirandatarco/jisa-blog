// src/components/seo/FaqSchemaLD.tsx
import Script from "next/script";

export type Faq = { pregunta: string; respuesta: string };

function stripHtml(input = ""): string {
  // elimina <script>/<style> y todas las etiquetas; compacta espacios; decodifica &nbsp;
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function FaqSchemaLD({
  faqs,
  id = "faq-schema",
}: {
  faqs?: Faq[];     // [{pregunta, respuesta}] con respuesta en HTML
  id?: string;      // id único del <script> (útil si hay varias secciones)
}) {
  const items =
    (faqs || [])
      .filter(f => f?.pregunta && f?.respuesta)
      .map(f => ({
        "@type": "Question",
        name: stripHtml(f.pregunta),
        acceptedAnswer: {
          "@type": "Answer",
          text: stripHtml(f.respuesta),
        },
      }));

  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items,
  };

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}