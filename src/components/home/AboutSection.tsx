import Image from "next/image";
import HeaderTitle from "@/components/layout/HeaderTitle";
import JisaTitleContentVerde from "@/components/layout/JisaTitleContentVerde";
import ParrafoContent from "@/components/layout/ParrafoContent";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";

type AboutData = {
  subtitulo?: string;
  titulo?: string;
  descripcion?: string; // HTML
  imagen?: string;      // URL remota
  alt?: string;
};

export default function AboutSection({ id, data }: { id?: string; data: AboutData }) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto mt-24 mb-12">
      <div className="grid grid-cols-12 gap-4">
        {/* Texto */}
        <div className="md:col-span-7 col-span-12 h-auto flex flex-col md:items-start items-center justify-center px-10">
          {data?.subtitulo && <JisaTitleContentVerde contenido={data.subtitulo} />}
          {/* Por SEO: h2 por defecto en Home */}
          {data?.titulo && <HeaderTitle title={data.titulo} etiqueta="h2" />}
          <SeparatorBarHorizontal />
          {data?.descripcion && (
            <ParrafoContent className="text-JisaGris" contenido={data.descripcion} />
          )}
        </div>

        {/* Imagen */}
        <div className="md:col-span-5 col-span-12 h-[400px] relative">
          {data?.imagen ? (
            <Image
              src={data.imagen}
              alt={data.alt || data.titulo || "About Jisa Adventure"}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover rounded-2xl"
              priority={false}
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-gray-100" />
          )}
        </div>
      </div>
    </section>
  );
}