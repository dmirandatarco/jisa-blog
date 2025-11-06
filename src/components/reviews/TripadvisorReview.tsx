import Image from "next/image";
import DotIcon from "@/assets/icons/DotIcon";

export default function TripadvisorReview({ review }: { review: any }) {
  const stars = Math.max(0, Math.min(5, Number(review?.estrellas ?? 0)));

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white">
      {/* Usuario */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12">
          {review?.imagen ? (
            <Image
              src={review.imagen}
              alt={review?.nombre ?? "Usuario"}
              fill
              sizes="48px"
              className="rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200" />
          )}
        </div>

        <div>
          <span className="font-semibold text-gray-900">
            {review?.nombre}
          </span>
          {review?.contribuciones && (
            <p className="text-sm text-JisaGris">
              {review.contribuciones}
            </p>
          )}
        </div>
      </div>

      {/* Estrellas + meta */}
      <div className="mt-4">
        <div className="text-JisaCyan flex gap-0">
          {Array.from({ length: stars }).map((_, i) => (
            <DotIcon key={i} size={20} />
          ))}
        </div>
      </div>

      {/* Texto */}
      <div className="h-[12ch] mt-1">
        {review?.fecha && <p className="text-sm text-JisaGris">{review.fecha}</p>}
        {review?.descripcion && (
          <p className="mt-2 line-clamp-3 text-JisaGris">{review.descripcion}</p>
        )}
      </div>
    </div>
  );
}
