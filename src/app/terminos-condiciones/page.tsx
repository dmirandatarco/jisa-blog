import type { Metadata } from "next";
import { apiPost } from "@/lib/api";
import HeroSectionMidle from "@/components/secciones/HeroSectionMidle";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Jisa Adventure",
  description:
    "Consulta los términos y condiciones de Jisa Adventure para reservas, cancelaciones, cambios y políticas generales.",
  robots: { index: true, follow: true },
};

// (opcional) ISR/SSG: revalida cada 60 min
export const revalidate = 3600;

async function getTerminos(idiomaId = 1) {
  const res = await apiPost<{ data: any }>(
    "/terminos-condiciones",
    { idioma_id: idiomaId },
    { cacheSeconds: 3600, tags: ["terminos"] } // usa la cache/tag de tu helper
  ).then(r => r.data).catch(() => undefined);

  console.log(res)
  return res?.text?.rec_cancel1 ?? "";
}

export default async function Page() {
  // Si más adelante detectas idioma por cookie/headers, pásalo aquí
  const html = await getTerminos(1);

  return (
    <>
      {/* HERO a pantalla completa (full-bleed) */}
      <section className="full-bleed">
        <HeroSectionMidle
          backgroundImage="/agencia-de-viaje-cusco-jisaadventure.webp"
          title="TÉRMINOS Y CONDICIONES"
          description=""
        />
      </section>

      {/* Contenido en el contenedor */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 my-12 md:my-16">
        {html ? (
          <div
            className="contenido-text-testimonios max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="text-center text-slate-500">
            El contenido no está disponible por el momento.
          </p>
        )}
      </section>
    </>
  );
}