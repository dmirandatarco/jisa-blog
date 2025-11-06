"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SeparatorBarHorizontalVerde from "@/components/layout/SeparatorBarHorinzontalVerde";
import JisaTitleContentGris from "@/components/layout/JisaTitleContentGris";
import DotIcon from "@/assets/icons/DotIcon";

function parseHtmlList(html?: string): string[] {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return [...doc.querySelectorAll("li")].map((li) => (li.textContent || "").trim());
}

export default function QueLlevarSection({ quellevar }: { quellevar?: string }) {
  const { t } = useTranslation();
  const list = useMemo(() => parseHtmlList(quellevar), [quellevar]);

  return (
    <div className="flex flex-col">
      <SeparatorBarHorizontalVerde />
      <JisaTitleContentGris
        contenido={t("tours_detail.qué_llevar_a_tu_viaje")}
        className="text-2xl"
      />
      <div className="text-JisaCyan flex flex-col gap-y-4 mt-4">
        {list.map((item, index) => (
          <div key={index} className="flex gap-x-4 items-center">
            <DotIcon size={28} />
            <span className="text-JisaGrisTextGray font-light text-base">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
