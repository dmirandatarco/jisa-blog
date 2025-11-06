import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import JisaTitleContentCyan from "@/components/layout/JisaTitleContentCyan";
import ToursLineSection from "@/components/secciones/ToursLineSection.client";

type Props = {
  tours: any[];
};

export default function ToursRelacionados({ tours }: Props) {
  if (!Array.isArray(tours) || tours.length === 0) return null;

  return (
    <section className="w-full max-w-6xl mx-auto md:px-0 px-4">
      <SeparatorBarHorizontal />
      <JisaTitleContentCyan contenido="Tours relacionados" className="text-2xl" />
      <ToursLineSection tours={tours} />
    </section>
  );
}
