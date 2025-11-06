// src/components/lazy/SwiperLazy.tsx
"use client";

import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import type { SwiperProps } from "swiper/react";

// Carga CSS en idle (no bloquea el render)
function loadSwiperCssIdle() {
  const href = "https://unpkg.com/swiper@10/swiper-bundle.min.css";
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[data-href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  l.setAttribute("data-href", href);
  document.head.appendChild(l);
}

const SwiperNoSSR = dynamic(() => import("swiper/react").then(m => m.Swiper), {
  ssr: false,
});

export { SwiperSlide } from "swiper/react";

/** Mantiene CSS y evita recreaciones del componente */
export default function SwiperLazy(props: SwiperProps) {
  useEffect(() => {
    // CSS de Swiper en idle
    ("requestIdleCallback" in window)
      ? (window as any).requestIdleCallback(loadSwiperCssIdle, { timeout: 2000 })
      : setTimeout(loadSwiperCssIdle, 1200);
  }, []);

  // Evita pasar undefined que fuerce reconciliación distinta
  const safeProps = useMemo(() => ({ ...props }), [props]);
  return <SwiperNoSSR {...safeProps} />;
}
