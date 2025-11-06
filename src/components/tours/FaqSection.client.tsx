"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import SeparatorBarHorizontalVerde from "@/components/layout/SeparatorBarHorinzontalVerde";
import JisaTitleContentGris from "@/components/layout/JisaTitleContentGris";
import ParrafoContent from "@/components/layout/ParrafoContent";

type Faq = { pregunta: string; respuesta: string }; // respuesta en HTML

export default function FaqSection({ faqs = [] }: { faqs: Faq[] }) {
  const { t } = useTranslation();

  return (
    <div>
      <SeparatorBarHorizontalVerde />
      <JisaTitleContentGris
        contenido={t("tours_detail.preguntas_antes_de_viajar")}
        className="text-2xl"
      />
      {faqs.map((faq, index) => (
        <Disclosure
          as="div"
          key={index}
          className="px-4 py-2 text-JisaCyan border-2 rounded-md my-4"
        >
          <DisclosureButton className="group flex w-full items-center justify-center">
            <div className="flex gap-x-4 items-center">
              <span className="text-2xl font-semibold">{faq.pregunta}</span>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5">
            <ParrafoContent className="text-JisaGris" contenido={faq.respuesta} />
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  );
}
