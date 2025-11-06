import ImageGrid from "@/components/home/ImageGrid";

type MarcaImg = string | { src: string; alt?: string };

export default function MarcasSection({
  id,
  images = [
    "Ministerio_de_Comercio_Exterior_y_Turismo.webp",
    "/Tripadvisor.webp",
    "/Gercetur.webp",
  ] as MarcaImg[],
}: {
  id?: string;
  images?: MarcaImg[];
}) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto">
      <ImageGrid images={images} />
    </section>
  );
}
