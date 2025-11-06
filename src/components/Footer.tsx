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
      {/* Imagen decorativa superior del footer (pon tus archivos en /public/imagen/...) */}
      <div className="w-full">
        <Image
          src="/imagen/Footer-Jisa-Adventure-Caminante.webp"
          alt=""
          width={1920}
          height={200}
          className="-mb-2 w-full h-auto"
          priority={false}
        />
      </div>

      <footer className="bg-black w-full z-40 relative">
        <div className="w-full max-w-7xl grid grid-cols-12 gap-4 mx-auto">
          {/* Columna 1 */}
          <div className="md:col-span-4 col-span-12 p-4 text-white flex flex-col px-8">
            <Image
              src="/imagen/LogoJisaSecundario.webp"
              alt="Logo Jisa Adventure"
              width={220}
              height={128}
              className="h-32 w-auto object-contain py-2 mx-auto md:mx-0"
            />
            <p className="text-sm p-4 pt-2 md:text-left text-center">
              {t("footer.text")}
            </p>

            <div className="text-white flex justify-center md:justify-start items-center gap-x-4">
              <GoogleIcon size={40} />
              <TripAdvisorIcon size={40} />
              <InstagramIcon size={30} />
              <FacebookIcon size={30} />
              <TikTokIcon size={30} />
            </div>
          </div>

          {/* Columna 2 */}
          <div className="md:col-span-4 col-span-12 p-4 text-white px-12">
            <p className="font-bold text-xl text-center">Jisa Adventure</p>
            <div className="ps-4 py-2">
              <ul className="text-base font-normal text-center space-y-1">
                <li>
                  <Link href="/politicas-privacidad">
                    {t("footer.politicas_reserva")}
                  </Link>
                </li>
                <li>
                  <Link href="/terminos-condiciones">
                    {t("footer.terminos_condiciones")}
                  </Link>
                </li>
                <li>
                  <Link href="/tours-machu-picchu">Tours Machu Picchu</Link>
                </li>
                <li>
                  <Link href="/tours-cusco">Tours Cusco</Link>
                </li>
                <li>
                  <Link href="/tours/7-dias-magicos">7 Días Mágicos</Link>
                </li>
                <li>
                  <Link href="/tours/5-dias-magicos">5 Días Mágicos</Link>
                </li>
                {/* <li>
                  <Link href="/preguntas-frecuentes">{t("footer.faq")}</Link>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Columna 3 */}
          <div className="md:col-span-4 col-span-12 p-4 text-white px-12">
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <p className="font-semibold text-base">{t("footer.asesor_venta")}</p>
                <IconText
                  icon={EnvelopeIcon}
                  text="info@jisaadventure.com"
                  enlace="mailto:info@jisaadventure.com"
                />
                <IconText
                  icon={PhoneIcon}
                  text="+51 976 294 449"
                  enlace="https://wa.me/51976294449"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <p className="font-semibold text-base">{t("footer.datos_informacion")}</p>
                <IconText icon={MapDotIcon} text="Calle Garcilaso 265, Cusco, Perú" />
                <IconText icon={ClockIcon} text="08:00 a.m. - 8:00 p.m." />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl text-center mx-auto py-3">
          <span className="text-JisaCyan">
            © {new Date().getFullYear()} Jisa Adventure – Todos los derechos reservados
          </span>
        </div>
      </footer>
    </>
  );
}
