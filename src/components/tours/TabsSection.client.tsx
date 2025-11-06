"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useTranslation } from "react-i18next";

import ItinerarioIcon from "@/assets/icons/ItinerarioIcon";
import IncludeIcon from "@/assets/icons/IncludeIcon";
import QuestionIcon from "@/assets/icons/QuestionIcon";
import GalleryIcon from "@/assets/icons/GalleryIcon";
import MochilaIcon from "@/assets/icons/MochilaIcon";

import ItinerarioSection from "@/components/tours/ItinerarioSection.client";
import IncluyeSection from "@/components/tours/IncluyeSection.client";
import QueLlevarSection from "@/components/tours/QueLlevarSection.client";
import FaqSection from "@/components/tours/FaqSection.client";
import GaleriaTourSection from "@/components/tours/GaleriaTourSection.client";
import BookNowSection from "@/components/tours/BookNowSection.client";

type Tour = {
  titulo?: string;
  itinirarios?: any[];
  itinerarios: any[];
  incluyes: string;
  no_incluyes: string;
  recomendaciones: string;
  faqs: any[];
  galerias: string[];
  // ...lo que uses BookNowSection
};

export default function TabsSection({
  tour,
  dias,
}: {
  tour: Tour;
  dias: number;
}) {
  const { t } = useTranslation();

  const tabs = [
    { label: t("tours_detail.itinerario"), icon: <ItinerarioIcon size={32} />, etq: "h2" },
    { label: t("tours_detail.incluye"),    icon: <IncludeIcon size={32} />,    etq: "h2" },
    { label: t("tours_detail.que_llevar"),    icon: <MochilaIcon size={32} />,    etq: "h2" },
    { label: t("tours_detail.faqs"),       icon: <QuestionIcon size={32} />,   etq: "h2" },
    { label: t("tours_detail.galeria"),    icon: <GalleryIcon size={32} />,    etq: "h2" },
  ] as const;

  return (
    <section className="w-full mx-auto mt-24 mb-12">
      <TabGroup className="w-full">
        <TabList className="flex w-full justify-center bg-JisaGris/5 overflow-auto">
          {tabs.map((tab, i) => {
            const Tag: any = tab.etq;
            return (
              <Tab
                key={i}
                className={({ selected }) =>
                  `flex flex-col justify-center items-center py-2 px-6 rounded-md transition-colors duration-200 ${
                    selected ? "bg-white text-JisaGris font-medium" : "text-[#98a4a8]"
                  }`
                }
              >
                <Tag className="text-lg">{tab.label}</Tag>
                <span className="py-2 px-4">{tab.icon}</span>
              </Tab>
            );
          })}
        </TabList>

        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4 my-10">
            <div className="md:col-span-8 col-span-12 h-auto flex flex-col md:items-start px-10">
              <TabPanels className="w-full">
                <TabPanel>
                  <ItinerarioSection itinerario={tour.itinerarios} dias={dias} />
                </TabPanel>
                <TabPanel>
                  <IncluyeSection incluye={tour.incluyes} noincluye={tour.no_incluyes} />
                </TabPanel>
                <TabPanel>
                  <QueLlevarSection quellevar={tour.recomendaciones} />
                </TabPanel>
                <TabPanel>
                  <FaqSection faqs={tour.faqs} />
                </TabPanel>
                <TabPanel>
                  <GaleriaTourSection galleryID="tours-gallery" images={tour.galerias} />
                </TabPanel>
              </TabPanels>
            </div>

            {/* sidebar de reserva */}
            <BookNowSection tour={tour as any} />
          </div>
        </div>
      </TabGroup>
    </section>
  );
}
