"use client";
import Script from "next/script";

const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;   // ej. 1234567
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SV || "6";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID; // ej. abcdefg

export default function HeatmapsLoader() {
  return (
    <>
      {HOTJAR_ID && (
        <Script id="hotjar" strategy="lazyOnload">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${HOTJAR_ID},hjsv:${HOTJAR_SV}};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}

      {CLARITY_ID && (
        <Script id="clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}