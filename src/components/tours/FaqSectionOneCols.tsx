"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import SeparatorBarHorizontalVerde from "@/components/layout/SeparatorBarHorinzontalVerde";
import HeaderTitle from "../layout/HeaderTitle";
import ParrafoContent from "@/components/layout/ParrafoContent";

type Faq = { pregunta: string; respuesta: string }; // respuesta en HTML

export default function FaqSectionOneCol({ faqs = [] }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-10">
        <HeaderTitle title="Preguntas Frecuentes" etiqueta="h2" />
        <SeparatorBarHorizontalVerde />
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <Disclosure as="div" key={idx} className="px-4 py-3 border-2 rounded-md">
            <DisclosureButton className="group flex w-full items-center justify-between gap-3 text-left">
              <h3 className="text-lg md:text-xl font-semibold">{faq.pregunta}</h3>
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
    </div>
  );
}
