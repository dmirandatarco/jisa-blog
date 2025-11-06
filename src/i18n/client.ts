"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importa tus JSON (ya los tienes)
import es from "./translations/es.json";
import en from "./translations/en.json";
import br from "./translations/br.json";

const resources = {
  es: { translation: es },
  en: { translation: en },
  br: { translation: br },
};

// Evita reinicializar en Fast Refresh
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)      // detector del navegador
    .use(initReactI18next)      // bind con react-i18next
    .init({
      resources,
      // Idioma por defecto:
      lng: "es",
      fallbackLng: "es",

      // Detección en cliente (opcional, puedes dejar solo "es" si quieres fijo)
      detection: {
        // orden de detección; quita lo que no uses
        order: ["querystring", "localStorage", "cookie", "navigator", "htmlTag"],
        // dónde cachea la elección
        caches: ["localStorage"], // o ["cookie"]
      },

      interpolation: { escapeValue: false },
      // react: { useSuspense: false }, // descomenta si no quieres Suspense
    })
    .catch(() => {});
}

export default i18n;
