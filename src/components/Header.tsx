"use client";

import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useRef, useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { buildWppLink } from "@/utils/wpp";

// Íconos
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import BarsIcon from "@/assets/icons/BarsIcon";
import CartIcon from "@/assets/icons/CartIcon";

import MenuIntern from "./secciones/MenuInter";
import MenuLinea from "./secciones/MenuLinea";

type HeaderProps = { dataGeneral?: any };

export default function Header({ dataGeneral }: HeaderProps) {
  const { cartItems } = useCart();

  const header = dataGeneral?.header || {};
  const headerPromocion = dataGeneral?.promocionHeader || {};
  const menus = dataGeneral?.menu || [];

  // ✅ Estado limpio
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Funciones claras
  const toggleMenu = () => setMenuOpen((s) => !s);
  const closeMenu  = () => setMenuOpen(false);

  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // DEBUG opcional
  useEffect(() => {
    console.log("menuOpen:", menuOpen);
  }, [menuOpen]);

  return (
    <header className="top-0 md:absolute relative z-10 bg-white w-full">
      {/* PROMO */}
      {visible && headerPromocion?.text && (
        <div className="relative bg-JisaGris text-white h-6 overflow-hidden md:block hidden">
          <div className="absolute right-0 top-0 h-full w-10 z-10 flex items-center justify-center bg-JisaGris">
            <button
              onClick={() => setVisible(false)}
              className="text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
          <Marquee speed={50} className="h-6 items-center font-medium">
            <div className="pr-12 text-xs">
              <a href={headerPromocion.enlace || "#"}>
                {headerPromocion.text}
              </a>
            </div>
          </Marquee>
        </div>
      )}

      {/* LOGO + BOTONES */}
      <div className="w-full">
        <div className="md:max-w-5xl w-full mx-auto">
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center">
              <Link href="/" aria-label="Inicio">
                {header.logo ? (
                  <Image
                    src={header.logo}
                    alt="Jisa Adventure Tour y Paquetes Cusco"
                    width={180}
                    height={48}
                    className="h-8 md:h-12 w-auto object-contain"
                    priority
                  />
                ) : (
                  <span className="font-regular text-JisaCyan text-lg">
                    Jisa Adventure
                  </span>
                )}
              </Link>
            </div>

            <div className="flex items-center gap-3 py-2 pe-2">

              {/* CARRITO */}
              <Link
                href="/carrito"
                className="relative lg:inline-flex items-center p-2 text-JisaCyan hidden"
                aria-label="Ver carrito"
              >
                <CartIcon size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center
                                   w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* WHATSAPP */}
              {header?.numero && (
                <a
                  href={buildWppLink(
                    `51${String(header.numero).replace(/\s+/g, "")}`,
                    "👉 Hola 👋, estuve navegando en la web 🌎 y me gustaría recibir información ✅"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-2
                             bg-green-500 hover:bg-green-600 text-white font-semibold
                             px-4 py-2 rounded-full transition-colors"
                  aria-label="Contactar por WhatsApp"
                >
                  <WhatsappIcon size={18} />
                  Contactar
                </a>
              )}

              {/* 🍔 HAMBURGUESA */}
              <button
                onClick={toggleMenu}
                className="text-JisaCyan md:hidden flex items-center"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <BarsIcon size={36} />
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <MenuIntern dataGeneral={dataGeneral} menuOpen={menuOpen} menu={menus} />
      </div>

      {/* MOBILE 🍔 */}
      <div className="md:hidden flex">
        <MenuLinea
          menuOpen={menuOpen}
          menu={menus}
          onClose={closeMenu}   // ✅ CIERRE LIMPIO
        />
      </div>
    </header>
  );
}
