"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/client";
import { CartProvider } from "@/contexts/CartContext";

import { LeadModalProvider } from "@/components/useLeadModal"; // 👈 nuevo
import LeadModal from "@/components/LeadModal";               // 👈 nuevo

export default function Providers({ children }: { children: React.ReactNode }) {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    const start = () => setI18nReady(true);
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(start, { timeout: 2000 });
    } else {
      setTimeout(start, 1200);
    }
  }, []);

  return (
    <CartProvider>
      {/* 👇 LeadModalProvider SIEMPRE envuelve al árbol (con o sin i18n listo) */}
      <LeadModalProvider>
        {i18nReady ? (
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        ) : (
          children
        )}
        {/* Monta el modal UNA sola vez */}
        <LeadModal />
      </LeadModalProvider>
    </CartProvider>
  );
}
