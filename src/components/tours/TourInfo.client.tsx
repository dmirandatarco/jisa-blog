"use client";

import IconCategoria from "./IconCategoria";
import ClockIcon from "@/assets/icons/ClockIcon";
import GroupUsers from "@/assets/icons/GroupUsers";
import MountainHikIcon from "@/assets/icons/MountainHikIcon";
import BuIcon from "@/assets/icons/BuIcon";
import { useTranslation } from "react-i18next";

export default function TourInfo({
  duracion,
  grupo,
  tipo,
  recojo,
}: {
  duracion: number;
  grupo: number;
  tipo: string;
  recojo: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="relative -mt-8 md:-mt-12 z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-xl bg-white shadow-md">
          <div className="grid grid-cols-12 gap-y-4 md:gap-y-0 md:divide-x md:divide-gray-100 p-4 md:p-6">
            <div className="col-span-6 md:col-span-3">
              <IconCategoria
                icon={ClockIcon}
                title={t("tours_detail.duracion")}
                subtitle={duracion == 1 ? "full day" : `${duracion} days`}
                className="text-JisaCyan"
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <IconCategoria
                icon={GroupUsers}
                title={t("tours_detail.max_grupo")}
                subtitle={`${grupo} paxs`}
                className="text-JisaCyan"
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <IconCategoria
                icon={MountainHikIcon}
                title={t("tours_detail.tipo_tour")}
                subtitle={tipo}
                className="text-JisaCyan"
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <IconCategoria
                icon={BuIcon}
                title={t("tours_detail.recojo")}
                subtitle={recojo}
                className="text-JisaCyan"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}