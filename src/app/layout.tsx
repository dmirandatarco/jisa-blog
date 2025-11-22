import type { Metadata } from "next";
import "./globals-critical.css";
import { apiPost } from "@/lib/api";

import Header from "@/components/Header/HeaderServer";
import Footer from "@/components/Footer";
import Providers from "./providers";

// islas tardías (idle)
import FloatingContactIsland from "./islands/FloatingContactIsland";
import ScrollToTopIsland from "./islands/ScrollToTopIsland";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL ?? "https://jisaadventure.com";

export const metadata: Metadata = {
  title: "Jisa Adventure",
  description: "Agencia de viajes en Cusco y Perú.",
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const dataGeneral = await apiPost<{ data: any }>(
    "/general-blog",
    { idiomaId: 1 },
    { cacheSeconds: 60, tags: ["menu"] }
  )
    .then(r => r.data)
    .catch(() => undefined);

  return (
    <html lang="es">
      <head>
        {/* Preconnects */}
        <link rel="preconnect" href="https://sistema.jisaadventure.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://sistema.jisaadventure.com" />

        {/* Preload fuentes usadas en LCP */}
        <link
          rel="preload"
          href="/fonts/LufgaRegular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/LufgaSemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

      </head>

      <body className="font-sans min-h-screen antialiased">
        

        <Providers>
          <div className="relative z-[100]">
            <Header dataGeneral={dataGeneral} />
          </div>

          <main className="min-h-screen relative mx-auto max-w-6xl p-6">
            {children}
          </main>

          <Footer />

          {/* islas tardías */}
          <ScrollToTopIsland />
          <FloatingContactIsland />

          {/* Empuja page_view en navegaciones del App Router */}
          {/* <Suspense fallback={null}>
            <GtmClient />
          </Suspense> */}

          {/* Cargas de mapas de calor: mantenlas asíncronas */}
          {/* <HeatmapsLoader /> */}
        </Providers>
      </body>
    </html>
  );
}
