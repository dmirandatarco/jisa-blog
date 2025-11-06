export function loadCss(href: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[data-href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  l.setAttribute("data-href", href);
  document.head.appendChild(l);
}

export function loadSwiperCssIdle() {
  const run = () => {
    const { loadCss } = require("./loadCss");
    // Usa UNA de estas 2 opciones:
    // Opción CDN (rápido de probar)
    loadCss("https://unpkg.com/swiper@10/swiper-bundle.min.css");
    // Opción local (si prefieres servirlo tú):
    // loadCss("/vendor/swiper/swiper-bundle.min.css");
  };
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 1200);
  }
}
