import Link from "next/link";
import HeroSectionMidle from "@/components/secciones/HeroSectionMidle";

export default function NotFound() {
  return (
    <>
      {/* HERO full-bleed */}
      <section className="full-bleed">
        <HeroSectionMidle
          backgroundImage="/agencia-de-viaje-cusco-jisaadventure.webp"
          title="404 — Página no encontrada"
          description="La ruta que buscaste no existe o fue movida."
        />
      </section>

      {/* Contenido */}
      <section className="w-full max-w-7xl mx-auto mt-12 mb-20 px-4 md:px-6 text-center">
        <p className="text-lg text-gray-600">
          Puedes volver al inicio o explorar nuestros tours.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2 rounded-md bg-JisaCyan text-white font-semibold"
          >
            Volver al inicio
          </Link>
          <Link
            href="/tours"
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700"
          >
            Ver tours
          </Link>
        </div>
      </section>
    </>
  );
}
