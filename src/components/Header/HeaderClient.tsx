"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useLeadModal } from "@/components/useLeadModal";

import BarsIcon from "@/assets/icons/BarsIcon";
// import WhatsappIcon from "@/assets/icons/WhatsappIcon";
// import CartIcon from "@/assets/icons/CartIcon";

import MenuIntern from "../secciones/MenuInter";
import MenuLinea from "../secciones/MenuLinea";

type HeaderProps = { dataGeneral?: any };

export default function Header({ dataGeneral }: HeaderProps) {
  const { cartItems } = useCart();
  const { open } = useLeadModal();

  const header = dataGeneral?.header || {};
  const headerPromocion = dataGeneral?.promocionHeader || {};
  const menus = dataGeneral?.menu2 || [];

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((s) => !s);

  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <header className="top-0 md:absolute relative z-10 bg-white w-full">
      <div className="w-full">
        <div className="md:max-w-5xl w-full mx-auto">
          <div className="relative flex items-center py-2">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            </div>
            <div className="mx-auto text-center p-2">
              <Link href="/" aria-label="Inicio" className="inline-block">
                {header.logo ? (
                  <Image
                    src={header.logo}
                    alt="Jisa Adventure Tour y Paquetes Cusco"
                    width={200}
                    height={56}
                    className="h-10 md:h-12 w-auto object-contain"
                    priority
                  />
                ) : (
                  <span className="font-regular text-JisaCyan text-lg">
                    Jisa Adventure
                  </span>
                )}
              </Link>
            </div>

            {/* Lado derecho: botón menú móvil */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <button
                onClick={toggleMenu}
                className="text-JisaCyan md:hidden flex items-center"
                aria-label="Abrir menú"
              >
                <BarsIcon size={36} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú desktop */}
      <div className="hidden md:block">
        <MenuIntern dataGeneral={dataGeneral} menuOpen={menuOpen} menu={menus} />
      </div>

      {/* Menú móvil */}
      <div className="md:hidden flex">
        <MenuLinea menuOpen={menuOpen} menu={menus} />
      </div>
    </header>
  );
}
