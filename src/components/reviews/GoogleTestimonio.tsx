import Image from "next/image";
import StarIcon from "@/assets/icons/StarIcon";

export default function GoogleTestimonio({ review }: { review: any }) {
  const stars = Math.max(0, Math.min(5, Number(review?.estrellas ?? 0)));

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white">
      {/* Usuario */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12">
          <Image
            src="/avatar.png"
            alt={review?.nombre ?? "Usuario"}
            fill
            sizes="48px"
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
        <div>
          <span className="font-semibold text-gray-900">
            {review?.nombre}
          </span>
        </div>
      </div>

      {/* Estrellas + meta */}
      <div className="mt-4">
        <div className="flex gap-x-2 items-center">
          <div className="text-JisaAmarillo flex">
            {Array.from({ length: stars }).map((_, i) => (
              <StarIcon key={i} size={15} />
            ))}
          </div>
          {review?.fecha && <p className="text-sm text-JisaGris">{review.fecha}</p>}
        </div>
      </div>

      {/* Texto */}
      <div className="h-[12ch]">
        {review?.descripcion && (
          <p className="mt-2 line-clamp-3 text-JisaGris">{review.descripcion}</p>
        )}
      </div>
    </div>
  );
}
