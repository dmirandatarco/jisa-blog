import type { Metadata } from "next";
import HeroSectionMidle from "@/components/secciones/HeroSectionMidle";

export const metadata: Metadata = {
  title: "Muchas gracias recibimos sus datos | Jisa Adventure",
  description: "Sus datos se registraron correctamente. Pronto nos pondremos en contacto.",
  robots: { index: false, follow: false }, // opcional: suele no indexarse
};

export default function GraciasPage() {
  return (
    <>
      {/* HERO full-bleed */}
      <section className="full-bleed">
        <HeroSectionMidle
          backgroundImage="/agencia-de-viaje-cusco-jisaadventure.webp"
          title="GRACIAS RECIBIMOS SUS DATOS"
          description=""
        />
      </section>

      {/* Contenido */}
      <section className="w-full max-w-7xl mx-auto mt-16 mb-20 px-4 md:px-6">
        <article className="prose prose-sm md:prose lg:prose-lg max-w-none text-center">
          <h2>¡Jisa Adventure!</h2>
          <p>
            Hemos recibido sus datos correctamente. Un asesor se comunicará contigo.
            Mientras tanto, puedes seguir explorando nuestros{" "}
            <a href="/tours">tours</a>.
          </p>
        </article>
      </section>
    </>
  );
}