"use client";

import Image from "next/image";
import Link from "next/link";

const BASE_URL = "https://jisaadventure.com/tours/";

type TourCardProps = {
  titulo: string;
  tiempo: string;
  recojo: string;
  resumen: string;
  precio: string;
  precioAntes: string;
  foto_principal: string;
  alt_principal: string;
  slug: string;
};

export default function ToursCard({
  titulo,
  tiempo,
  recojo,
  resumen,
  precio,
  precioAntes,
  foto_principal,
  alt_principal,
  slug,
}: TourCardProps) {
  const fullUrl = `${BASE_URL}${slug}`; 
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden">
      <div className="relative h-64">
        <Image
          src={foto_principal}
          alt={alt_principal}
          fill
          className="w-full h-full object-cover bg-[#BDD06A]"
        />
        <span className="absolute top-3 left-3 bg-[#BDD06A] text-green-800 text-xs font-semibold px-3 py-1 rounded-md">
          Servicio Grupal
        </span>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1">{titulo}</h3>

        <p className="text-gray-600 mb-2">
          {tiempo} • {recojo}
        </p>

        <div className="text-sm text-gray-700 mb-3 line-clamp-4"  dangerouslySetInnerHTML={{ __html: resumen }}>
          
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {precioAntes && (
              <span className="line-through text-gray-500 text-sm font-semibold">
                $ {precioAntes}
              </span>
            )}
            <span className="text-red-600 font-bold text-base">
              Desde $ {precio}
            </span>
            <span className="text-gray-500 text-xs">
              * Precio por persona.
            </span>
          </div>

          {/* Cambia el href al slug o ruta real del tour */}
          <Link
            href={fullUrl}
            target="_blank"
            className="bg-[#1B9C9E] text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-800 transition"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}