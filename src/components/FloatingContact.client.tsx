"use client";

import { useMemo, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import WhatsappColorIcon from "@/assets/icons/WhatsappColorIcon";

// --- Helpers ---
declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

function pushWhatsappEvent(variant: "floating_main" | "floating_direct", params: Record<string, any>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    link_variant: variant,
    event_source: "ui",
    ...params,
  });
}

function buildWppLink(phone: string, message: string) {
  const num = phone.replace(/[^\d]/g, "");
  const txt = encodeURIComponent(message);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isMobile
    ? `https://wa.me/${num}?text=${txt}`
    : `https://api.whatsapp.com/send?phone=${num}&text=${txt}`;
}

function toTitle(s?: string) {
  return decodeURIComponent(s || "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function FloatingContact() {
  const [isOpen] = useState(false); // si luego lo activas, ya emite el mismo evento
  const pathname = usePathname();

  const { originTag, isDetail } = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "tours" && parts.length >= 2) {
      return { originTag: toTitle(parts[1]), isDetail: true };
    }
    if (parts[0] === "paquetes" && parts.length >= 2) {
      return { originTag: toTitle(parts[1]), isDetail: true };
    }
    return { originTag: "", isDetail: false };
  }, [pathname]);

  const message = isDetail
    ? `👉 Hola 👋, estuve navegando en la web 🌎 y me gustaría recibir información personalizada de ${originTag} ✅`
    : `👉 Hola 👋, estuve navegando en la web 🌎 y me gustaría recibir información ✅`;

  const wppLink = buildWppLink("51976294449", message);

  // WhatsApp principal (flotante)
  const onClickWhatsappMain = useCallback(() => {
    pushWhatsappEvent("floating_main", {
      page_path: pathname,
      is_detail: isDetail,
      origin_tag: originTag || "(none)",
      destination: wppLink,
    });
  }, [pathname, isDetail, originTag, wppLink]);

  // WhatsApp directo (si habilitas el panel extra)
  const onClickWhatsappDirect = useCallback(() => {
    const direct = "https://wa.me/51976294449";
    pushWhatsappEvent("floating_direct", {
      page_path: pathname,
      is_detail: isDetail,
      origin_tag: originTag || "(none)",
      destination: direct,
    });
  }, [pathname, isDetail, originTag]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href={wppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 rounded-full bg-[#0DC152] text-gray-700 flex items-center justify-center shadow-md"
        id="btnWhatsapp"
        aria-label="Contactar por WhatsApp"
        data-gtm="whatsapp_floating_main"
        onClick={onClickWhatsappMain}
      >
        <WhatsappColorIcon size={35} />
      </a>

      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col space-y-3">
          <a
            href="https://wa.me/51976294449"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-[#0DC152] text-gray-700 flex items-center justify-center shadow-md"
            aria-label="WhatsApp directo"
            data-gtm="whatsapp_floating_direct"
            onClick={onClickWhatsappDirect}
          >
            <WhatsappColorIcon size={35} />
          </a>
        </div>
      )}
    </div>
  );
}
