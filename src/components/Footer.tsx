"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// Íconos (tal como los tienes en src/assets/icons)
import GoogleIcon from "@/assets/icons/GoogleIcon";
import TripAdvisorIcon from "@/assets/icons/TripAdvisorIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import TikTokIcon from "@/assets/icons/TikTokIcon";
import EnvelopeIcon from "@/assets/icons/EnvelopeIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import MapDotIcon from "@/assets/icons/MapDotIcon";
import ClockIcon from "@/assets/icons/ClockIcon";

function IconText({
  icon: Icon,
  text,
  enlace,
}: {
  icon: (p: { size?: number; className?: string }) => JSX.Element;
  text: string;
  enlace?: string;
}) {
  const content = (
    <div className="flex items-center gap-2 text-sm">
      <Icon size={16} />
      <span>{text}</span>
    </div>
  );
  return enlace ? (
    <Link href={enlace} className="hover:opacity-90">
      {content}
    </Link>
  ) : (
    content
  );
}

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      

      <footer className="w-full bg-[#15797A] text-white px-6 md:px-12 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

          <div>
            <h4 className="uppercase text-[15px] font-semibold mb-3 tracking-wide">Destinos Perú</h4>
            <ul className="list-disc ml-5 space-y-1.5 text-[14px] text-gray-200">
              <li>
                <Link href="https://jisaadventure.com/paquetes-turisticos-peru" target="_blank" className="hover:text-white transition">
                  Tours Machu Picchu
                </Link>
              </li>
              <li>
                <Link href="https://jisaadventure.com/tours-cusco" target="_blank" className="hover:text-white transition">
                  Tours Cusco
                </Link>
              </li>
              <li>
                <Link href="https://jisaadventure.com/paquetes-turisticos-peru" target="_blank" className="hover:text-white transition">
                  Paquetes Perú
                </Link>
              </li>
              <li>
                <Link href="https://jisaadventure.com/peru-trekking" target="_blank" className="hover:text-white transition">
                  Trekking Perú
                </Link>
              </li>
            </ul>
          </div>

          <hr className="block md:hidden border-t border-white/30 my-5" />

          <div>
            <h4 className="uppercase text-[15px] font-semibold mb-3 tracking-wide">Artículos que te pueden interesar</h4>
            <ul className="list-disc ml-5 space-y-1.5 text-[14px] text-gray-200">
              <li className="hover:text-white transition">Lugares turísticos en Cusco</li>
              <li className="hover:text-white transition">Valle Sagrado de los incas</li>
              <li className="hover:text-white transition">Moray cusco</li>
              <li className="hover:text-white transition">Montaña de 7 colores cusco</li>
              <li className="hover:text-white transition">Laguna humantay</li>
            </ul>
          </div>

          <hr className="block md:hidden border-t border-white/30 my-5" />

          <div>
            <h4 className="uppercase text-[15px] font-semibold mb-3 tracking-wide">Tips viajeros</h4>
            <ul className="list-disc ml-5 space-y-1.5 text-[14px] text-gray-200">
              <li className="hover:text-white transition">Requisitos para ingresar al Perú</li>
              <li className="hover:text-white transition">Seguro de viaje para Cusco y Machu Picchu</li>
              <li className="hover:text-white transition">Consejos para viajar seguro en Cusco</li>
              <li className="hover:text-white transition">Outfits para viajar al Perú</li>
            </ul>
          </div>

        </div>
        <div className="max-w-[1400px] mx-auto border-t border-white/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-5">
          <p className="text-[14px] text-gray-200">
            Síguenos en nuestras redes sociales
          </p>
          <div className="flex justify-center md:justify-end gap-6 text-[22px]">
              <GoogleIcon size={40} />
              <TripAdvisorIcon size={40} />
              <InstagramIcon size={30} />
              <FacebookIcon size={30} />
              <TikTokIcon size={30} />
          </div>
        </div>
      </footer>
      
    </>
  );
}
