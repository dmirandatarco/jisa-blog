import Script from "next/script";

export default function TravelAgencySchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://jisaadventure.com/",
    "name": "Jisa Adventure",
    "url": "https://jisaadventure.com/",
    "image": "https://sistema.jisaadventure.com/storage/header/logo-1.webp",
    "telephone": "+51 976 294 449",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Garcilaso, 265",
      "addressLocality": "Cusco",
      "postalCode": "00800",
      "addressCountry": "PE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -13.5178216,
      "longitude": -71.983217
    }
  };

  return (
    <Script
      id="schema-travel-agency"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
