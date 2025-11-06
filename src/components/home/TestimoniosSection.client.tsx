"use client";

import { useState, useMemo } from "react";
import HeaderTitle from "@/components/layout/HeaderTitle";
import SubHeaderTitle from "@/components/layout/SubHeaderTitle";
import SeparatorBarHorizontal from "@/components/layout/SeparatorBarHorizontal";
import TabButton from "@/components/tabs/TabButton";
import Testimonios from "@/components/home/Testimonios.client";
import TripAdvisorIcon from "@/assets/icons/TripAdvisorIcon"; // ajusta la ruta si difiere
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { useTranslation } from "react-i18next";

type Review = {
  nombre?: string;
  imagen?: string;
  fecha?: string;
  estrellas?: number;
  descripcion?: string;
  contribuciones?: string;
};

export default function TestimoniosSection({
  id = "testimonios",
  data = [],
  google = [],
  totalTripadvisor = 450,
  totalGoogle = 250,
}: {
  id?: string;
  data?: Review[];
  google?: Review[];
  totalTripadvisor?: number;
  totalGoogle?: number;
}) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"tripadvisor" | "google">("tripadvisor");

  const tabs = useMemo(
    () => [
      { id: "tripadvisor" as const, label: "Tripadvisor", icon: TripAdvisorIcon, activeColor: "bg-JisaCyan" },
      { id: "google" as const,      label: "Google",      icon: GoogleIcon,       activeColor: "bg-[#eb4939]" },
    ],
    []
  );

  const currentMarca = activeTab === "tripadvisor" ? "Tripadvisor" : "Google";
  const currentData  = activeTab === "tripadvisor" ? data : google;

  return (
    <section id={id} className="w-full max-w-7xl mx-auto">
      <div className="flex-col justify-center flex items-center py-10">
        <HeaderTitle title={t("trip_section.titulo")} etiqueta="h2" />
        <SubHeaderTitle title={t("trip_section.subtitulo")} />
        <SeparatorBarHorizontal />
      </div>

      <ul className="flex flex-wrap justify-center text-sm font-medium text-center text-JisaGris/50">
        {tabs.map((tab) => (
          <li key={tab.id} className="me-2">
            <TabButton
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              activeColor={tab.activeColor}
              isActive={activeTab === tab.id}
              onClick={(id) => setActiveTab(id as typeof activeTab)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Testimonios
          marca={currentMarca}
          data={currentData}
          total={totalTripadvisor}
          totalGoogle={totalGoogle}
        />
      </div>
    </section>
  );
}
