"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SeparatorBarHorizontalVerde from "../layout/SeparatorBarHorinzontalVerde";
import DateRangePicker from "./CalendarRangoPicker";
import CartIcon from "./../../assets/icons/CartIcon";
import DinnersIcon from "./../../assets/icons/DinnersIcon";
import MasterCardIcon from "./../../assets/icons/MasterCardIcon";
import VisaIcon from "./../../assets/icons/VisaIcon";
import PaypalIcon from "./../../assets/icons/PaypalIcon";
import AmericanIcon from "./../../assets/icons/AmericanIcon";
import { useTranslation } from "react-i18next";
import { useCart } from "@/contexts/CartContext";

export default function BookNowSection({ tour }: { tour: any }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { addToCart } = useCart();

  const [cantidad, setCantidad] = useState(1);
  const [fecha, setFecha] = useState<{ start: string; end: string }>({ start: "", end: "" });

  const isAvailable = Number(tour?.disponibilidad ?? 1) > 0;
  const precioUnit = useMemo(() => Number(tour?.precio ?? 0), [tour?.precio]);
  const total = useMemo(() => (precioUnit * cantidad).toFixed(2), [precioUnit, cantidad]);
  const duracionDias = Math.max(1, tour?.itinerarios?.length ?? 1);

  const onCantidadChange = (n: number) => setCantidad(Math.max(1, Math.min(20, n)));
  const onCantidadInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    onCantidadChange(Number((e.target.value || "").replace(/\D/g, "")) || 1);

  const dec = () => onCantidadChange(cantidad - 1);
  const inc = () => onCantidadChange(cantidad + 1);

  const handleAddToCart = () => {
    if (!fecha.start) return;
    addToCart(tour, cantidad, fecha.start, fecha.end);
    router.push("/carrito"); // 👈 Next Router
  };

  const msg = `Hola, estoy interesad@ en el tour "${tour?.titulo || tour?.title}". ¿Podrían ayudarme con la disponibilidad?`;
  const waHref = `https://wa.me/51976294449?text=${encodeURIComponent(msg)}`;

  return (
    <div className="md:col-span-4 col-span-12 h-auto flex flex-col md:items-start items-center justify-center align-middle ">
      <div id="form-reserva-carrito" className="w-full">
        <div className="bg-JisaGris px-6 pt-4 w-full flex-col text-center flex justify-center items-center text-white rounded-t-md">
          <p className="font-bold text-3xl">{t("tours_detail.reservas_ahora")}</p>
          <SeparatorBarHorizontalVerde />
          <span className="font-semibold text-base">{tour?.titulo}</span>
          <span className="font-bold text-2xl text-JisaVerde">USD $ {total}</span>
        </div>

        <div className="border-2 border-JisaGrisTextGray/10 bg-white rounded-b-md flex flex-col pb-2">
          {isAvailable ? (
            <>
              <DateRangePicker fixedDays={duracionDias} value={fecha} onChange={setFecha} />
              <span className="font-semibold text-lg text-JisaCyan text-center">
                {t("tours_detail.cantidad_pasajeros")}
              </span>
              <div className="flex p-2 justify-center">
                <button onClick={dec} className=" font-bold text-JisaGris text-3xl px-4">
                  -
                </button>
                <input
                  type="text"
                  className="text-JisaGrisTextGray text-xl w-36 rounded-sm text-center border-2 border-JisaGrisTextGray/5 bg-white"
                  placeholder="1"
                  value={cantidad}
                  onChange={onCantidadInput}
                />
                <button onClick={inc} className=" font-bold text-JisaGris text-3xl px-4">
                  +
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAddToCart}
                  disabled={!fecha.start}
                  className={`flex rounded-md px-10 gap-x-2 py-2 justify-center w-fit ${
                    !fecha.start ? "bg-gray-300 cursor-not-allowed" : "bg-JisaCyan text-white"
                  }`}
                >
                  <CartIcon />
                  <span className="font-semibold text-lg">{t("tours_detail.añadir_carrito")}</span>
                </button>
              </div>

              <div className="flex gap-2 py-4 justify-center">
                <div className="w-12">
                  <DinnersIcon />
                </div>
                <div className="w-12">
                  <MasterCardIcon />
                </div>
                <div className="w-12">
                  <VisaIcon />
                </div>
                <div className="w-12">
                  <PaypalIcon />
                </div>
                <div className="w-12">
                  <AmericanIcon />
                </div>
              </div>

              <div>
                <span className="text-JisaVerde text-xs text-left px-4">
                  * {t("tours_detail.servicios_fuera_de_impuestos")}
                </span>
              </div>
            </>
          ) : (
            <div className="px-6 py-6 flex flex-col items-center gap-4">
              <p className="text-center text-JisaGrisTextGray">{t("tours_detail.no_disponible")}</p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 bg-JisaCyan text-white font-semibold hover:opacity-90 transition"
                aria-label="Comunícate con un asesor"
              >
                💬 {t("tours_detail.comunicate_asesor")}
              </a>
              <p className="text-xs text-gray-400">{t("tours_detail.ayuda_disponibilidad")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}