"use client";

import React from "react";
import HeaderTitle from "../layout/HeaderTitle";
import SeparatorBarHorizontal from "../layout/SeparatorBarHorizontal";
// opcional: sanitizar
// import DOMPurify from "isomorphic-dompurify";

interface AcercaProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  titulo: string;
  texto?: string;
  asHtml?: boolean;
  etiqueta?: "h1" | "h2" | "h3" | "h4";
}

export default function Acerca({
  id = "acerca-de",
  titulo,
  texto = "",
  asHtml = false,
  etiqueta = "h2",
  className = "",
  ...rest
}: AcercaProps) {
  // const safe = DOMPurify.sanitize(texto || ""); // si sanitizas
  const safe = String(texto ?? ""); // sin sanitizar

  return (
    <section id={id} className={`w-full max-w-7xl mx-auto ${className}`} {...rest}>
      <div className="flex flex-col items-center justify-center py-10">
        <HeaderTitle title={`Acerca de ${titulo}`} etiqueta={etiqueta} />
        <SeparatorBarHorizontal />
      </div>

      <div className="px-4 pb-8">
        {asHtml ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: safe }} />
        ) : (
          <p className="text-base leading-7 text-gray-700">{safe}</p>
        )}
      </div>
    </section>
  );
}
