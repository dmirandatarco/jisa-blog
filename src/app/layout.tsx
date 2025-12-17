import type { Metadata } from "next";
import "./globals-critical.css";
import { apiPost } from "@/lib/api";

import Header from "@/components/Header/HeaderServer";
import Footer from "@/components/Footer";
import Providers from "./providers";

// islas tardías (idle)
import FloatingContactIsland from "./islands/FloatingContactIsland";
import ScrollToTopIsland from "./islands/ScrollToTopIsland";
import { Suspense } from "react";
import GtmClient from "./GtmClient";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL ?? "https://jisaadventure.com";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
        {GTM_ID && (
          <Script id="consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent','default',{
                analytics_storage: 'granted',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                ad_storage: 'denied',
                wait_for_update: 0
              });
            `}
          </Script>
        )}

        {GTM_ID && (
            <Script id="gtm" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){
                  w[l]=w[l]||[];
                  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `}
            </Script>
          )}

      </head>

      <body className="font-sans min-h-screen antialiased">
        
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
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
          {/* <Suspense fallback={null}>
            <GtmClient />
          </Suspense> */}
        </Providers>
      </body>
    </html>
  );
}
