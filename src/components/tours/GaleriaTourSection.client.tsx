"use client";

import { useTranslation } from "react-i18next";
import SeparatorBarHorizontalVerde from "@/components/layout/SeparatorBarHorinzontalVerde";
import JisaTitleContentGris from "@/components/layout/JisaTitleContentGris";
import GalleriaTours from "@/components/tours/GalleriaTours.client";

type GalImg = { ruta: string };

export default function GaleriaTourSection({
  galleryID,
  images = [],
}: {
  galleryID: string;
  images: GalImg[];
}) {
  const { t } = useTranslation();

  if (!images.length) return null;

  return (
    <div className="w-full">
      <SeparatorBarHorizontalVerde />
      <JisaTitleContentGris contenido={t("tours_detail.galeria")} className="text-2xl" />
      <GalleriaTours id={galleryID} images={images} />
    </div>
  );
}
