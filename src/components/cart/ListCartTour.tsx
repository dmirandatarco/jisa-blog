"use client";

import CardCartTour from "@/components/cart/CardCartTour";

function normKey(x: any) {
  return String(x?.slug ?? x?.id ?? x?.tour_id ?? x?.codigo ?? "");
}
export default function ListCartTour({
  tours,
  onCantidadChange,
  onRemove,
}: {
  tours: any[];
  onCantidadChange: (id: number | string, cantidad: number) => void;
  onRemove: (id: number | string) => void;
}) {
  return (
    <div className="flex-col flex gap-y-8">
      {tours.map((tour) => {
        const k = normKey(tour);
        return (
          <div key={k}>
            <CardCartTour
              tour={tour}
              cantidad={tour.cantidad}
              onCantidadChange={onCantidadChange}
              onRemove={onRemove}
            />
            <div className="mt-2 w-[90%] self-center border-t border-JisaGris/20"></div>
          </div>
        );
      })}
    </div>
  );
}
