"use client";

import Link from "next/link";

type Props = {
  menuOpen: boolean;
  menu?: any[];
  onClose: () => void;
};

export default function MenuLinea({ menuOpen, menu = [], onClose }: Props) {

  if (!menuOpen) return null;

  const handleClick = () => {
    onClose(); // ✅ cierre correcto
  };

  return (
    <div className="fixed inset-x-0 top-14 z-50 bg-JisaCyan text-white md:hidden">
      <ul className="flex flex-col">
        {menu.map((item, i) => {
          const href = "/" + (item.slug || item.enlace || "");

          return (
            <li key={i} className="border-b border-white/15">
              <Link
                href={href}
                onClick={handleClick}
                className="block py-4 px-4 font-semibold"
              >
                {item.nombre || item.titulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
