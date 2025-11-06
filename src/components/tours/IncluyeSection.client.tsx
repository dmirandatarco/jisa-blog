"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SeparatorBarHorizontalVerde from "@/components/layout/SeparatorBarHorinzontalVerde";
import JisaTitleContentGris from "@/components/layout/JisaTitleContentGris";
import CheckIcon from "@/assets/icons/CheckIcon";
import TimesIcon from "@/assets/icons/TimesIcon";

function parseHtmlList(html?: string): string[] {
  if (!html) return [];
  // DOMParser sólo en cliente (este archivo es client)
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return [...doc.querySelectorAll("li")].map((li) => (li.textContent || "").trim());
}

export default function IncluyeSection({
  incluye,
  noincluye,
}: {
  incluye?: string;   // HTML <ul><li>...</li></ul>
  noincluye?: string; // HTML
}) {
  const { t } = useTranslation();

  const incluyeList = useMemo(() => parseHtmlList(incluye), [incluye]);
  const noIncluyeList = useMemo(() => parseHtmlList(noincluye), [noincluye]);

  return (
    <div className="flex flex-col gap-y-10">
      <div>
        <SeparatorBarHorizontalVerde />
        <JisaTitleContentGris
          contenido={t("tours_detail.incluye")}
          className="text-2xl"
        />
        <div className="text-JisaVerde flex flex-col gap-y-4 mt-4">
          {incluyeList.map((item, index) => (
            <div key={index} className="flex gap-x-4">
              <CheckIcon />
              <span className="text-JisaGrisTextGray font-light text-base">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SeparatorBarHorizontalVerde />
        <JisaTitleContentGris
          contenido={t("tours_detail.no_incluye")}
          className="text-2xl mb-4"
        />
        <div className="text-[#7C1B1B] flex flex-col gap-y-4 mt-4">
          {noIncluyeList.map((item, index) => (
            <div key={index} className="flex gap-x-4">
              <TimesIcon />
              <span className="text-JisaGrisTextGray font-light text-base">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
