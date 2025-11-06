import type { Metadata } from "next";
import "./globals-critical.css";
import { apiPost } from "@/lib/api";

import Header from "@/components/Header/HeaderServer";
import Footer from "@/components/Footer";
import Providers from "./providers";

import Script from "next/script";
import { Suspense } from "react";

import GtmClient from "./GtmClient";
import HeatmapsLoader from "./HeatmapsLoader";

// islas tardías (idle)
import FloatingContactIsland from "./islands/FloatingContactIsland";
import ScrollToTopIsland from "./islands/ScrollToTopIsland";

const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL ?? "https://jisaadventure.com";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: "Jisa Adventure",
  description: "Agencia de viajes en Cusco y Perú.",
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const dataGeneral = await apiPost<{ data: any }>(
    "/general",
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
        {GTM_ID && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://static.hotjar.com" />
            <link rel="dns-prefetch" href="https://static.hotjar.com" />
          </>
        )}

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

        {/* Consent Mode: antes de GTM y antes de interactivo (no afecta LCP) */}
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

        {/* CSS NO crítico en idle (no bloquea) */}
        <Script id="defer-css" strategy="afterInteractive">
          {`
            (function(){
              var href = "/css/deferred.css";
              if (document.querySelector('link[data-href="'+href+'"]')) return;
              function inject(){
                var l = document.createElement('link');
                l.rel = 'stylesheet';
                l.href = href;
                l.setAttribute('data-href', href);
                document.head.appendChild(l);
              }
              if ('requestIdleCallback' in window) {
                window.requestIdleCallback(inject, { timeout: 2000 });
              } else {
                setTimeout(inject, 1200);
              }
            })();
          `}
        </Script>

        {/* GTM: después de interactivo, asíncrono (no retrasa pintura) */}
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
        {/* Noscript GTM (no afecta PageSpeed métricas principales) */}
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

          {/* Empuja page_view en navegaciones del App Router */}
          <Suspense fallback={null}>
            <GtmClient />
          </Suspense>

          {/* Cargas de mapas de calor: mantenlas asíncronas */}
          <HeatmapsLoader />
        </Providers>
      </body>
    </html>
  );
}
