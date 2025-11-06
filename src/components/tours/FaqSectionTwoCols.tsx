"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import SeparatorBarHorizontalVerde from "@/components/layout/SeparatorBarHorinzontalVerde";
import JisaTitleContentGris from "@/components/layout/JisaTitleContentGris";
import ParrafoContent from "@/components/layout/ParrafoContent";
import HeaderTitle from "../layout/HeaderTitle";
import SeparatorBarHorizontal from "../layout/SeparatorBarHorizontal";

type Faq = { pregunta: string; respuesta: string }; // respuesta en HTML

function splitInTwo<T>(arr: T[]) {
  const left: T[] = [];
  const right: T[] = [];
  arr.forEach((item, i) => (i % 2 === 0 ? left : right).push(item));
  return [left, right] as const;
}

export default function FaqSectionTwoCols({ faqs = [], titulo = "" }: { faqs: Faq[], titulo: string }) {
  const { t } = useTranslation();
  const [colA, colB] = splitInTwo(faqs);

  return (
    <div>
      
      <div className="flex flex-col items-center justify-center py-10">
        <HeaderTitle title={`Preguntas Frecuentes sobre ${titulo}`} etiqueta="h2" />
        <SeparatorBarHorizontalVerde />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[colA, colB].map((col, colIdx) => (
          <div key={colIdx} className="space-y-4">
            {col.map((faq, index) => (
              <Disclosure
                as="div"
                key={`${colIdx}-${index}`}
                className="px-4 py-2 text-JisaCyan border-2 rounded-md"
              >
                <DisclosureButton className="group flex w-full items-center justify-between gap-3">
                  <h3 className="text-lg md:text-xl font-semibold text-left">
                    {faq.pregunta}
                  </h3>
                  <span
                    aria-hidden
                    className="shrink-0 transition-transform group-data-[open]:rotate-180"
                  >
                    ▼
                  </span>
                </DisclosureButton>

                <DisclosurePanel className="mt-2 text-sm/6">
                  <ParrafoContent className="text-JisaGris" contenido={faq.respuesta} />
                </DisclosurePanel>
              </Disclosure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
