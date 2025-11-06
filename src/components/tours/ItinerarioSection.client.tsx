"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import JisaTitleContentVerde from "@/components/layout/JisaTitleContentVerde";
import ParrafoContent from "@/components/layout/ParrafoContent";
import DownIcon from "@/assets/icons/DownIcon";

type Dia = {
  titulo: string;
  itinerario: string; // HTML
  imagen?: string;
  imagen2?: string;
  imagen3?: string;
  alt_imagen1?: string;
  alt_imagen2?: string;
  alt_imagen3?: string;
};

export default function ItinerarioSection({
  itinerario = [],
  dias = 1,
}: {
  itinerario: Dia[];
  dias: number;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <SeparatorBarHorizontal />
      <JisaTitleContentVerde
        contenido={t("tours_detail.itinerario")}
        className="text-2xl"
      />

      {dias === 1 ? (
        itinerario[0]?.itinerario ? (
          <ParrafoContent
            className="text-JisaGris text-base"
            contenido={itinerario[0].itinerario}
          />
        ) : null
      ) : (
        <>
          {itinerario.map((dia, index) => (
            <Disclosure
              key={index}
              as="div"
              className="px-4 py-2 text-JisaCyan border-2 rounded-md my-4"
            >
              <DisclosureButton className="group flex w-full items-center justify-between">
                <div className="flex gap-x-4 items-center">
                  <div className="flex flex-col">
                    <span className="text-xs font-light uppercase">
                      {t("tours_detail.dia")}
                    </span>
                    <span className="text-lg font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{dia.titulo}</h3>
                </div>
                <DownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
              </DisclosureButton>

              <DisclosurePanel className="mt-2 text-sm/5">
                <div className="grid grid-cols-12 gap-4">
                  <div className="md:col-span-12 col-span-12 h-auto grid grid-cols-12 md:items-start items-center justify-center gap-x-4">
                    <img
                      key="1"
                      src={dia.imagen || "/placeholder.jpg"}
                      alt={dia.alt_imagen1}
                      className="col-span-4 w-full rounded-lg h-full max-h-60 object-cover"
                    />
                    <img
                      key="2"
                      src={dia.imagen2 || "/placeholder.jpg"}
                      alt={dia.alt_imagen2}
                      className="col-span-4 w-full rounded-lg h-full max-h-60 object-cover"
                    />
                    <img
                      key="3"
                      src={dia.imagen3 || "/placeholder.jpg"}
                      alt={dia.alt_imagen3}
                      className="col-span-4 w-full rounded-lg h-full max-h-60 object-cover"
                    />
                  </div>

                  <div className="md:col-span-12 col-span-12 h-auto flex flex-col md:items-start">
                    <ParrafoContent
                      className="text-JisaGris"
                      contenido={dia.itinerario}
                    />
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </>
      )}
    </div>
  );
}