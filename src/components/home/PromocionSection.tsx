// src/components/home/PromocionSection.tsx
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type Props = {
  id?: string;
  imageSrc?: string;
  title?: string;
  /** Teléfono con o sin + y espacios; ejemplo: "51976294449" */
  wppPhone?: string;
  /** Texto del botón */
  ctaText?: string;
  /** Si quieres forzar un href estático en vez de WhatsApp, pásalo y tendrá prioridad */
  ctaHref?: string;
};

function toTitle(s?: string) {
  return decodeURIComponent(s || "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildWppLink(phone: string, message: string) {
  const num = phone.replace(/[^\d]/g, "");
  const txt = encodeURIComponent(message);
  // Ambos funcionan en desktop y móvil; conservamos esta lógica por compatibilidad
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isMobile
    ? `https://wa.me/${num}?text=${txt}`
    : `https://api.whatsapp.com/send?phone=${num}&text=${txt}`;
}

export default function PromocionSection({
  id,
  imageSrc = "/agencia-de-viaje-cusco-jisaadventure.webp",
  title = "¡Encuentra las mejores ofertas en tu próximo viaje!",
  wppPhone = "51976294449",
  ctaText = "Comunícate con un asesor",
  ctaHref, // si lo pasas, reemplaza al link de WhatsApp
}: Props) {
  const pathname = usePathname();

  const { originTag, isDetail } = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "tours" && parts.length >= 2) {
      return { originTag: toTitle(parts[1]), isDetail: true };
    }
    if (parts[0] === "paquetes" && parts.length >= 2) {
      return { originTag: toTitle(parts[1]), isDetail: true };
    }
    if (parts[0] === "ubicaciones" && parts.length >= 2) {
      return { originTag: toTitle(parts[1]), isDetail: true };
    }
    return { originTag: "", isDetail: false };
  }, [pathname]);

  const message = useMemo(
    () =>
      isDetail
        ? `👉 Hola 👋, estuve navegando en la web 🌎 y me gustaría recibir información personalizada de ${originTag} ✅`
        : `👉 Hola 👋, estuve navegando en la web 🌎 y me gustaría recibir información ✅`,
    [isDetail, originTag]
  );

  // Si el dev pasa ctaHref, úsalo; si no, arma WhatsApp
  const finalHref = ctaHref ?? buildWppLink(wppPhone, message);

  return (
    <section id={id} aria-label="Promociones de Jisa Adventure" className="full-bleed">
      <div className="relative h-[420px] md:h-[520px] lg:h-[560px] overflow-hidden">
        <Image
          src={imageSrc}
          alt="Ofertas de viajes a Machu Picchu de Jisa Adventure"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/70 cv-auto" />
        <div className="absolute inset-0 flex items-center justify-center py-20">
          <div className="max-w-5xl mx-auto px-8 md:px-16 text-center">
            <h2 className="text-white font-bold text-3xl md:text-5xl leading-tight">
              {title}
            </h2>

            <a
              href={finalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-12 py-3 mt-8 rounded-lg bg-JisaCyan text-white font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              id="cta-promocion-wpp"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
